import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InternalLayout from '@/components/internal/InternalLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { FileText, FilePlus, Clock, Send, AlertCircle, RefreshCw, Search, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getStatusBadgeProps } from '@/components/internal/ReportStatusBar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface DashboardStats {
  totalReports: number;
  reportsThisMonth: number;
  conceptCount: number;
  inBehandelingCount: number;
}

interface ReportRow {
  id: string;
  report_number: string;
  license_plate: string | null;
  client_name: string | null;
  vehicle_brand: string | null;
  vehicle_model: string | null;
  inspection_date: string | null;
  status: string | null;
  sent_at: string | null;
  reminder_due_date: string | null;
  updated_at: string;
  report_type: string | null;
}

interface SearchResult {
  type: 'report' | 'customer';
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalReports: 0,
    reportsThisMonth: 0,
    conceptCount: 0,
    inBehandelingCount: 0,
  });
  const [conceptReports, setConceptReports] = useState<ReportRow[]>([]);
  const [sentReports, setSentReports] = useState<ReportRow[]>([]);
  
  const [hertaxatieReports, setHertaxatieReports] = useState<ReportRow[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Quick search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Search debounce
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      setSearchOpen(false);
      return;
    }
    const timer = setTimeout(async () => {
      setSearching(true);
      const q = `%${searchQuery}%`;
      const [reportsRes, customersRes] = await Promise.all([
        supabase.from('reports')
          .select('id, report_number, license_plate, customer_last_name, rdw_merk, rdw_handelsbenaming, status, report_type')
          .or(`report_number.ilike.${q},license_plate.ilike.${q},customer_last_name.ilike.${q},vin.ilike.${q}`)
          .order('updated_at', { ascending: false })
          .limit(6),
        supabase.from('customers')
          .select('id, salutation, initials, first_name, last_name, company_name, city, customer_type')
          .or(`last_name.ilike.${q},first_name.ilike.${q},company_name.ilike.${q}`)
          .order('last_name')
          .limit(4),
      ]);

      const results: SearchResult[] = [];

      if (reportsRes.data) {
        for (const r of reportsRes.data) {
          const vehicle = [r.rdw_merk, r.rdw_handelsbenaming].filter(Boolean).join(' ');
          results.push({
            type: 'report',
            id: r.id,
            title: r.report_number,
            subtitle: [r.license_plate, vehicle, r.customer_last_name].filter(Boolean).join(' · ') || 'Geen details',
            badge: r.report_type || undefined,
          });
        }
      }
      if (customersRes.data) {
        for (const c of customersRes.data) {
          const name = [c.salutation, c.initials, c.last_name].filter(Boolean).join(' ');
          results.push({
            type: 'customer',
            id: c.id,
            title: name,
            subtitle: [c.company_name, c.city].filter(Boolean).join(' · ') || c.customer_type,
          });
        }
      }

      setSearchResults(results);
      setSearchOpen(results.length > 0 || searchQuery.length >= 2);
      setSearching(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSelect = (result: SearchResult) => {
    setSearchOpen(false);
    setSearchQuery('');
    if (result.type === 'report') {
      navigate(`/intern/rapport/${result.id}`);
    } else {
      navigate(`/intern/klanten/${result.id}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;
        const startOfMonth = `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;
        const endOfMonth = currentMonth === 12
          ? `${currentYear + 1}-01-01`
          : `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-01`;


        // Hertaxatie: reports where inspection_date is between 2y10m and 3y3m ago (expiring soon)
        const hertaxatieStart = new Date(now);
        hertaxatieStart.setMonth(hertaxatieStart.getMonth() - 39); // 3y3m ago
        const hertaxatieEnd = new Date(now);
        hertaxatieEnd.setMonth(hertaxatieEnd.getMonth() - 34); // 2y10m ago
        const hertaxatieStartStr = hertaxatieStart.toISOString().split('T')[0];
        const hertaxatieEndStr = hertaxatieEnd.toISOString().split('T')[0];

        const [
          { count: totalCount },
          { count: monthCount },
          { count: conceptCount },
          { count: inBehandelingCount },
          { data: concepts },
          { data: sent },
          { data: hertaxatie },
        ] = await Promise.all([
          supabase.from('reports').select('*', { count: 'exact', head: true }),
          supabase.from('reports').select('*', { count: 'exact', head: true })
            .gte('inspection_date', startOfMonth).lt('inspection_date', endOfMonth),
          supabase.from('reports').select('*', { count: 'exact', head: true })
            .eq('status', 'concept'),
          supabase.from('reports').select('*', { count: 'exact', head: true })
            .eq('status', 'in_behandeling'),
          // Openstaande concepten & in behandeling
          supabase.from('reports')
            .select('id, report_number, license_plate, client_name, vehicle_brand, vehicle_model, inspection_date, status, sent_at, reminder_due_date, updated_at, report_type')
            .in('status', ['concept', 'in_behandeling'])
            .order('updated_at', { ascending: false })
            .limit(5),
          // Recent verzonden
          supabase.from('reports')
            .select('id, report_number, license_plate, client_name, vehicle_brand, vehicle_model, inspection_date, status, sent_at, reminder_due_date, updated_at, report_type')
            .not('sent_at', 'is', null)
            .order('sent_at', { ascending: false })
            .limit(5),
          // Hertaxatie: rapporten met inspection_date 2j10m–3j3m geleden (verlopen binnenkort)
          supabase.from('reports')
            .select('id, report_number, license_plate, client_name, vehicle_brand, vehicle_model, inspection_date, status, sent_at, reminder_due_date, updated_at, report_type')
            .not('inspection_date', 'is', null)
            .gte('inspection_date', hertaxatieStartStr)
            .lte('inspection_date', hertaxatieEndStr)
            .in('report_type', ['camper', 'klassieker'])
            .order('inspection_date', { ascending: true })
            .limit(10),
        ]);

        setStats({
          totalReports: totalCount || 0,
          reportsThisMonth: monthCount || 0,
          conceptCount: conceptCount || 0,
          inBehandelingCount: inBehandelingCount || 0,
        });
        setConceptReports((concepts as ReportRow[]) || []);
        setSentReports((sent as ReportRow[]) || []);
        
        setHertaxatieReports((hertaxatie as ReportRow[]) || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const vehicleLabel = (r: ReportRow) => {
    const parts = [r.vehicle_brand, r.vehicle_model].filter(Boolean);
    return parts.length > 0 ? parts.join(' ') : '-';
  };

  const ReportMiniTable = ({ reports, emptyText, showDate, dateField = 'inspection_date', dateLabel = 'Datum' }: {
    reports: ReportRow[];
    emptyText: string;
    showDate?: boolean;
    dateField?: 'inspection_date' | 'sent_at' | 'reminder_due_date';
    dateLabel?: string;
  }) => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
        </div>
      );
    }
    if (reports.length === 0) {
      return <p className="text-muted-foreground text-center py-6 text-sm">{emptyText}</p>;
    }
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nr.</TableHead>
            <TableHead>Kenteken</TableHead>
            <TableHead className="hidden sm:table-cell">Voertuig</TableHead>
            <TableHead className="w-[90px]">Status</TableHead>
            {showDate && <TableHead className="w-[120px]">{dateLabel}</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.map((r) => (
            <TableRow
              key={r.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={() => navigate(`/intern/rapport/${r.id}`)}
            >
              <TableCell className="font-medium font-mono text-xs">{r.report_number}</TableCell>
              <TableCell className="font-mono text-xs">{r.license_plate || '-'}</TableCell>
              <TableCell className="hidden sm:table-cell text-xs">{vehicleLabel(r)}</TableCell>
              <TableCell>
                {(() => { const s = getStatusBadgeProps(r.status); return <Badge variant="outline" className={`text-xs ${s.className}`}>{s.label}</Badge>; })()}
              </TableCell>
              {showDate && <TableCell className="text-xs">{formatDate(r[dateField])}</TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <InternalLayout title="Dashboard">
      <div className="space-y-6">
        {/* Quick Search */}
        <div ref={searchRef} className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Zoek op kenteken, klantnaam of rapportnummer..."
              className="pl-9"
            />
          </div>
          {searchOpen && (
            <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-[350px] overflow-y-auto">
              {searching ? (
                <div className="p-3 text-sm text-muted-foreground text-center">Zoeken...</div>
              ) : searchResults.length === 0 ? (
                <div className="p-3 text-sm text-muted-foreground text-center">Geen resultaten gevonden</div>
              ) : (
                <>
                  {searchResults.some(r => r.type === 'report') && (
                    <div className="px-3 pt-2 pb-1">
                      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Rapporten</p>
                    </div>
                  )}
                  {searchResults.filter(r => r.type === 'report').map((r) => (
                    <button
                      key={`r-${r.id}`}
                      onClick={() => handleSearchSelect(r)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-muted/50 transition-colors border-b border-border/30 last:border-b-0"
                    >
                      <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium font-mono truncate">{r.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{r.subtitle}</p>
                      </div>
                      {r.badge && (
                        <Badge variant="secondary" className="text-[10px] shrink-0">{r.badge.toUpperCase()}</Badge>
                      )}
                    </button>
                  ))}
                  {searchResults.some(r => r.type === 'customer') && (
                    <div className="px-3 pt-2 pb-1 border-t border-border/50">
                      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Klanten</p>
                    </div>
                  )}
                  {searchResults.filter(r => r.type === 'customer').map((r) => (
                    <button
                      key={`c-${r.id}`}
                      onClick={() => handleSearchSelect(r)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-muted/50 transition-colors border-b border-border/30 last:border-b-0"
                    >
                      <User className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{r.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{r.subtitle}</p>
                      </div>
                    </button>
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/intern/nieuw-rapport">
              <FilePlus className="h-4 w-4 mr-2" />
              Nieuw Rapport
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/intern/rapporten">
              <FileText className="h-4 w-4 mr-2" />
              Alle Rapporten
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Totaal</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '…' : stats.totalReports}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Deze maand</CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '…' : stats.reportsThisMonth}</div>
              <p className="text-xs text-muted-foreground mt-1">inspectiedatum</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => navigate('/intern/rapporten?status=concept')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Concept</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '…' : stats.conceptCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Bekijk alle →</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => navigate('/intern/rapporten?status=in_behandeling')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">In behandeling</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '…' : stats.inBehandelingCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Bekijk alle →</p>
            </CardContent>
          </Card>
        </div>

        {/* Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Openstaande rapporten */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                Openstaand
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReportMiniTable
                reports={conceptReports}
                emptyText="Geen openstaande rapporten"
                showDate
                dateLabel="Inspectie"
              />
            </CardContent>
          </Card>

          {/* Recent verzonden */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Send className="h-5 w-5 text-green-500" />
                Recent Verzonden
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReportMiniTable
                reports={sentReports}
                emptyText="Nog geen rapporten verzonden"
                showDate
                dateField="sent_at"
                dateLabel="Verzonden"
              />
            </CardContent>
          </Card>


          {/* Hertaxatie — rapporten die binnenkort verlopen */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-orange-500" />
                Hertaxatie Nodig
                {!loading && hertaxatieReports.length > 0 && (
                  <Badge variant="secondary" className="ml-2 text-xs">{hertaxatieReports.length}</Badge>
                )}
              </CardTitle>
              <p className="text-xs text-muted-foreground">Rapporten waarvan de 3-jarige geldigheid binnenkort verloopt</p>
            </CardHeader>
            <CardContent>
              <ReportMiniTable
                reports={hertaxatieReports}
                emptyText="Geen rapporten die binnenkort verlopen"
                showDate
                dateField="inspection_date"
                dateLabel="Inspectiedatum"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </InternalLayout>
  );
};

export default Dashboard;
