import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InternalLayout from '@/components/internal/InternalLayout';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FileText, Search, User, Loader2, Car, Truck, Scale } from 'lucide-react';
import { useAppraisers } from '@/hooks/useAppraisers';

type ReportType = 'klassieker' | 'camper' | 'wev';

interface ReportRow {
  id: string;
  report_number: string;
  license_plate: string | null;
  rdw_merk: string | null;
  rdw_handelsbenaming: string | null;
  vehicle_brand: string | null;
  vehicle_model: string | null;
  updated_at: string;
  report_type: string | null;
  assigned_to?: string | null;
}

interface SearchResult {
  type: 'report' | 'customer';
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
}

const STATUS_CONFIG = [
  { key: 'concept', label: 'Concept', color: 'bg-zinc-500', border: 'border-zinc-500/30', headerBg: 'bg-zinc-500/10', text: 'text-zinc-400' },
  { key: 'in_behandeling', label: 'In behandeling', color: 'bg-blue-500', border: 'border-blue-500/30', headerBg: 'bg-blue-500/10', text: 'text-blue-400' },
  { key: 'gereed', label: 'Gereed', color: 'bg-emerald-500', border: 'border-emerald-500/30', headerBg: 'bg-emerald-500/10', text: 'text-emerald-400' },
  { key: 'verzonden', label: 'Verzonden', color: 'bg-amber-500', border: 'border-amber-500/30', headerBg: 'bg-amber-500/10', text: 'text-amber-400' },
] as const;

const REPORT_TYPES: { type: ReportType; label: string; sub: string; icon: typeof Car }[] = [
  { type: 'klassieker', label: 'KLS', sub: 'Klassiek', icon: Car },
  { type: 'camper', label: 'CAM', sub: 'Camper', icon: Truck },
  { type: 'wev', label: 'WEV', sub: 'Waarde Economisch Verkeer', icon: Scale },
];

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState<ReportType | null>(null);
  const { appraisers, getAppraiserById } = useAppraisers();
  const [assignedFilter, setAssignedFilter] = useState<string>('all'); // 'all', 'mine', or a user_id

  const [reportsByStatus, setReportsByStatus] = useState<Record<string, ReportRow[]>>({
    concept: [], in_behandeling: [], gereed: [], verzonden: [],
  });
  const [loading, setLoading] = useState(true);

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (searchQuery.length < 2) { setSearchResults([]); setSearchOpen(false); return; }
    const timer = setTimeout(async () => {
      setSearching(true);
      const q = `%${searchQuery}%`;
      const [reportsRes, customersRes] = await Promise.all([
        supabase.from('reports')
          .select('id, report_number, license_plate, customer_last_name, rdw_merk, rdw_handelsbenaming, status, report_type')
          .or(`report_number.ilike.${q},license_plate.ilike.${q},customer_last_name.ilike.${q},vin.ilike.${q}`)
          .order('updated_at', { ascending: false }).limit(6),
        supabase.from('customers')
          .select('id, salutation, initials, first_name, last_name, company_name, city, customer_type')
          .or(`last_name.ilike.${q},first_name.ilike.${q},company_name.ilike.${q}`)
          .order('last_name').limit(4),
      ]);
      const results: SearchResult[] = [];
      if (reportsRes.data) {
        for (const r of reportsRes.data) {
          const vehicle = [r.rdw_merk, r.rdw_handelsbenaming].filter(Boolean).join(' ');
          results.push({ type: 'report', id: r.id, title: r.report_number, subtitle: [r.license_plate, vehicle, r.customer_last_name].filter(Boolean).join(' · ') || 'Geen details', badge: r.report_type || undefined });
        }
      }
      if (customersRes.data) {
        for (const c of customersRes.data) {
          results.push({ type: 'customer', id: c.id, title: [c.salutation, c.initials, c.last_name].filter(Boolean).join(' '), subtitle: [c.company_name, c.city].filter(Boolean).join(' · ') || c.customer_type });
        }
      }
      setSearchResults(results);
      setSearchOpen(results.length > 0 || searchQuery.length >= 2);
      setSearching(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSelect = (result: SearchResult) => {
    setSearchOpen(false); setSearchQuery('');
    navigate(result.type === 'report' ? `/intern/rapport/${result.id}` : `/intern/klanten/${result.id}`);
  };

  // Fetch all reports grouped by status
  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase.from('reports')
        .select('id, report_number, license_plate, rdw_merk, rdw_handelsbenaming, vehicle_brand, vehicle_model, updated_at, report_type, status, assigned_to')
        .in('status', ['concept', 'in_behandeling', 'gereed', 'verzonden'])
        .order('updated_at', { ascending: false });

      if (!error && data) {
        const grouped: Record<string, ReportRow[]> = { concept: [], in_behandeling: [], gereed: [], verzonden: [] };
        data.forEach(r => {
          const s = (r as any).status || 'concept';
          if (grouped[s]) grouped[s].push(r);
        });
        setReportsByStatus(grouped);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  // Create report
  const handleCreate = async (reportType: ReportType) => {
    if (!user) return;
    setIsCreating(reportType);
    try {
      const { data, error } = await supabase.from('reports')
        .insert({ user_id: user.id, report_type: reportType, report_number: `DRAFT-${Date.now()}`, status: 'concept', tellerstand_type: 'km' })
        .select('id').single();
      if (error) throw error;
      navigate(`/intern/rapport/${data.id}/bewerken`);
    } catch {
      toast({ title: 'Fout bij aanmaken', description: 'Probeer het opnieuw.', variant: 'destructive' });
    } finally {
      setIsCreating(null);
    }
  };

  const vehicleLabel = (r: ReportRow) => {
    return [r.rdw_merk || r.vehicle_brand, r.rdw_handelsbenaming || r.vehicle_model].filter(Boolean).join(' ') || '-';
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' });

  // Filter reports by assigned_to
  const filterReports = (reports: ReportRow[]) => {
    if (assignedFilter === 'all') return reports;
    if (assignedFilter === 'mine') return reports.filter(r => r.assigned_to === user?.id);
    return reports.filter(r => r.assigned_to === assignedFilter);
  };

  const selectedAppraiser = assignedFilter !== 'all' && assignedFilter !== 'mine' 
    ? getAppraiserById(assignedFilter) 
    : null;

  return (
    <InternalLayout title="Dashboard">
      <div className="space-y-6">
        {/* Quick Search + Filter */}
        <div className="flex gap-3 items-start">
          <div ref={searchRef} className="relative flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Zoek op kenteken, klantnaam of rapportnummer..." className="pl-9" />
            </div>
            {searchOpen && (
              <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-lg shadow-lg max-h-[350px] overflow-y-auto">
                {searching ? (
                  <div className="p-3 text-sm text-muted-foreground text-center">Zoeken...</div>
                ) : searchResults.length === 0 ? (
                  <div className="p-3 text-sm text-muted-foreground text-center">Geen resultaten gevonden</div>
                ) : (
                  <>
                    {searchResults.filter(r => r.type === 'report').map((r) => (
                      <button key={`r-${r.id}`} onClick={() => handleSearchSelect(r)} className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-muted/50 transition-colors border-b border-border/30 last:border-b-0">
                        <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium font-mono truncate">{r.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{r.subtitle}</p>
                        </div>
                        {r.badge && <Badge variant="secondary" className="text-[10px] shrink-0">{r.badge.toUpperCase()}</Badge>}
                      </button>
                    ))}
                    {searchResults.filter(r => r.type === 'customer').map((r) => (
                      <button key={`c-${r.id}`} onClick={() => handleSearchSelect(r)} className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-muted/50 transition-colors border-b border-border/30 last:border-b-0">
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
          <Select value={assignedFilter} onValueChange={setAssignedFilter}>
            <SelectTrigger className="w-[180px] shrink-0">
              <SelectValue placeholder="Alle taxateurs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle taxateurs</SelectItem>
              <SelectItem value="mine">Mijn rapporten</SelectItem>
              {appraisers.map((a) => (
                <SelectItem key={a.user_id} value={a.user_id}>
                  {a.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* New Report Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {REPORT_TYPES.map(({ type, label, sub, icon: Icon }) => (
            <button
              key={type}
              onClick={() => handleCreate(type)}
              disabled={isCreating !== null}
              className="group relative flex items-center gap-4 p-5 rounded-xl border-2 border-[#253047] bg-[#111827] hover:border-[#c9a84c] transition-all duration-200 text-left disabled:opacity-50"
            >
              {isCreating === type ? (
                <Loader2 className="h-8 w-8 animate-spin text-[#c9a84c]" />
              ) : (
                <Icon className="h-8 w-8 text-[#c9a84c] shrink-0" />
              )}
              <div>
                <p className="text-lg font-bold text-[#c9a84c] tracking-wide">{label}</p>
                <p className="text-sm text-muted-foreground">{sub}</p>
              </div>
              <span className="absolute top-3 right-4 text-[10px] text-muted-foreground uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">+ Nieuw</span>
            </button>
          ))}
        </div>

        {/* Kanban Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {STATUS_CONFIG.map((col) => {
            const reports = filterReports(reportsByStatus[col.key] || []);
            return (
              <div key={col.key} className={`rounded-xl border ${col.border} bg-[#111827]/60 flex flex-col min-h-[400px]`}>
                {/* Column Header */}
                <div className={`flex items-center justify-between px-4 py-3 rounded-t-xl ${col.headerBg}`}>
                  <div className="flex items-center gap-2">
                    <div className={`h-2.5 w-2.5 rounded-full ${col.color}`} />
                    <h3 className={`font-semibold text-sm ${col.text}`}>{col.label}</h3>
                  </div>
                  <span className={`text-xl font-bold ${col.text}`}>
                    {loading ? '…' : reports.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="flex-1 overflow-y-auto px-2 py-2 space-y-2 max-h-[60vh]">
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary" />
                    </div>
                  ) : reports.length === 0 ? (
                    <p className="text-center text-xs text-muted-foreground py-8">Geen rapporten</p>
                  ) : (
                    reports.map((r) => {
                      const appraiser = getAppraiserById(r.assigned_to);
                      return (
                        <button
                          key={r.id}
                          onClick={() => navigate(`/intern/rapport/${r.id}`)}
                          className="w-full text-left p-3 rounded-lg bg-[#0a0d14] border border-[#253047] hover:border-[#c9a84c]/50 hover:bg-[#0f1320] transition-all duration-150 group"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-mono font-medium text-muted-foreground">{r.report_number}</span>
                            {r.report_type && (
                              <Badge variant="secondary" className="text-[9px] px-1.5 py-0">{r.report_type.toUpperCase()}</Badge>
                            )}
                          </div>
                          <p className="text-sm font-medium text-foreground truncate">{vehicleLabel(r)}</p>
                          <div className="flex items-end justify-between mt-1.5">
                            <div className="flex flex-col gap-0.5">
                              <span className="text-xs font-mono text-muted-foreground">{r.license_plate || '-'}</span>
                              <span className="text-[10px] text-muted-foreground">{formatDate(r.updated_at)}</span>
                            </div>
                            {appraiser ? (
                              <Avatar className="h-6 w-6 shrink-0">
                                <AvatarFallback className="text-[10px] font-semibold bg-primary/20 text-primary">
                                  {appraiser.initials}
                                </AvatarFallback>
                              </Avatar>
                            ) : (
                              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted/50 border border-border shrink-0">
                                <span className="text-xs font-medium text-muted-foreground">+</span>
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </InternalLayout>
  );
};

export default Dashboard;
