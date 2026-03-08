import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InternalLayout from '@/components/internal/InternalLayout';
import { supabase } from '@/integrations/supabase/client';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, FilePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { getStatusBadgeProps } from '@/components/internal/ReportStatusBar';
import {
  Select as SelectUI, SelectContent as SelectContentUI, SelectItem as SelectItemUI,
  SelectTrigger as SelectTriggerUI, SelectValue as SelectValueUI,
} from '@/components/ui/select';

interface Report {
  id: string;
  report_number: string;
  report_type: string | null;
  license_plate: string | null;
  customer_title: string | null;
  customer_initials: string | null;
  customer_last_name: string | null;
  client_name: string | null;
  opdrachtgever: string | null;
  rdw_merk: string | null;
  rdw_handelsbenaming: string | null;
  inspection_date: string | null;
  status: string | null;
  created_at: string;
}

const TYPE_LABELS: Record<string, string> = {
  klassieker: 'KLS',
  camper: 'CAM',
  wev: 'WEV',
};

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams] = useSearchParams();
  const [statusFilter, setStatusFilter] = useState<string>(searchParams.get('status') || 'all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data, error } = await supabase
          .from('reports')
          .select('id, report_number, report_type, license_plate, customer_title, customer_initials, customer_last_name, client_name, opdrachtgever, rdw_merk, rdw_handelsbenaming, inspection_date, status, created_at')
          .order('created_at', { ascending: false });
        if (error) throw error;
        setReports(data || []);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const getCustomerDisplay = (r: Report) => {
    // Prefer opdrachtgever, then customer name parts, then client_name
    const nameParts = [r.customer_title, r.customer_initials, r.customer_last_name].filter(Boolean).join(' ');
    return r.opdrachtgever || nameParts || r.client_name || '-';
  };

  const getVehicleDisplay = (r: Report) => {
    const parts = [r.rdw_merk, r.rdw_handelsbenaming].filter(Boolean);
    return parts.length > 0 ? parts.join(' ') : '-';
  };

  const formatLicensePlate = (plate: string | null) => {
    if (!plate) return '-';
    // Simple formatting to add dashes if missing
    const cleaned = plate.replace(/[^A-Z0-9]/gi, '').toUpperCase();
    if (cleaned.length === 6) {
      return `${cleaned.slice(0, 2)}-${cleaned.slice(2, 4)}-${cleaned.slice(4, 6)}`;
    }
    return plate;
  };

  const filteredReports = reports.filter((report) => {
    if (statusFilter !== 'all' && (report.status || 'concept') !== statusFilter) return false;
    if (typeFilter !== 'all' && (report.report_type || '') !== typeFilter) return false;

    const search = searchTerm.toLowerCase();
    if (!search) return true;
    const customerName = getCustomerDisplay(report).toLowerCase();
    const vehicle = [report.rdw_merk, report.rdw_handelsbenaming].filter(Boolean).join(' ').toLowerCase();
    return (
      report.report_number.toLowerCase().includes(search) ||
      (report.license_plate?.toLowerCase().includes(search) ?? false) ||
      customerName.includes(search) ||
      vehicle.includes(search)
    );
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('nl-NL', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <InternalLayout title="Rapporten">
      <div className="space-y-4">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="flex flex-1 gap-3 items-center flex-wrap">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Zoek op rapportnummer, kenteken, klant of voertuig..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
            </div>
            <SelectUI value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTriggerUI className="w-[170px]">
                <SelectValueUI placeholder="Alle statussen" />
              </SelectTriggerUI>
              <SelectContentUI>
                <SelectItemUI value="all">Alle statussen</SelectItemUI>
                <SelectItemUI value="concept">Concept</SelectItemUI>
                <SelectItemUI value="in_behandeling">In behandeling</SelectItemUI>
                <SelectItemUI value="gereed">Gereed</SelectItemUI>
                <SelectItemUI value="verzonden">Verzonden</SelectItemUI>
              </SelectContentUI>
            </SelectUI>
            <SelectUI value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTriggerUI className="w-[140px]">
                <SelectValueUI placeholder="Alle types" />
              </SelectTriggerUI>
              <SelectContentUI>
                <SelectItemUI value="all">Alle types</SelectItemUI>
                <SelectItemUI value="klassieker">KLS — Klassiek</SelectItemUI>
                <SelectItemUI value="camper">CAM — Camper</SelectItemUI>
                <SelectItemUI value="wev">WEV</SelectItemUI>
              </SelectContentUI>
            </SelectUI>
          </div>
          <Button asChild>
            <Link to="/intern/nieuw-rapport">
              <FilePlus className="h-4 w-4 mr-2" />
              Nieuw Rapport
            </Link>
          </Button>
        </div>

        {/* Reports Table */}
        <div className="bg-background rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Rapportnr.</TableHead>
                <TableHead className="w-[60px]">Type</TableHead>
                <TableHead className="w-[100px]">Kenteken</TableHead>
                <TableHead>Voertuig</TableHead>
                <TableHead>Klant</TableHead>
                <TableHead className="w-[130px]">Status</TableHead>
                <TableHead className="w-[140px]">Inspectiedatum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredReports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' ? 'Geen rapporten gevonden' : 'Nog geen rapporten'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredReports.map((report) => (
                  <TableRow key={report.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigate(`/intern/rapport/${report.id}`)}>
                    <TableCell className="font-medium font-mono text-xs">{report.report_number}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                        {TYPE_LABELS[report.report_type || ''] || (report.report_type?.toUpperCase() || '-')}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{formatLicensePlate(report.license_plate)}</TableCell>
                    <TableCell className="text-sm truncate max-w-[200px]">{getVehicleDisplay(report)}</TableCell>
                    <TableCell className="text-sm truncate max-w-[200px]">{getCustomerDisplay(report)}</TableCell>
                    <TableCell>
                      {(() => { const s = getStatusBadgeProps(report.status); return <Badge variant="outline" className={`text-xs ${s.className}`}>{s.label}</Badge>; })()}
                    </TableCell>
                    <TableCell className="text-xs">{formatDate(report.inspection_date)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {!loading && (
          <p className="text-sm text-muted-foreground">
            {filteredReports.length} rapport{filteredReports.length !== 1 ? 'en' : ''} gevonden
          </p>
        )}
      </div>
    </InternalLayout>
  );
};

export default Reports;
