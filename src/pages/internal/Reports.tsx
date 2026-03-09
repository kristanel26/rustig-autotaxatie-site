import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import InternalLayout from '@/components/internal/InternalLayout';
import { supabase } from '@/integrations/supabase/client';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, FilePlus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getStatusBadgeProps } from '@/components/internal/ReportStatusBar';
import {
  Select as SelectUI, SelectContent as SelectContentUI, SelectItem as SelectItemUI,
  SelectTrigger as SelectTriggerUI, SelectValue as SelectValueUI,
} from '@/components/ui/select';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAppraisers } from '@/hooks/useAppraisers';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

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
  assigned_to: string | null;
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
  const [deleteTarget, setDeleteTarget] = useState<Report | null>(null);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const { getAppraiserById } = useAppraisers();
  const { hasRole } = useAuth();
  const isAdmin = hasRole('admin');

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('id, report_number, report_type, license_plate, customer_title, customer_initials, customer_last_name, client_name, opdrachtgever, rdw_merk, rdw_handelsbenaming, inspection_date, status, created_at, assigned_to')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const { error } = await supabase.from('reports').delete().eq('id', deleteTarget.id);
      if (error) throw error;
      setReports(prev => prev.filter(r => r.id !== deleteTarget.id));
      toast.success(`Rapport ${deleteTarget.report_number} verwijderd`);
      setDeleteTarget(null);
    } catch (err) {
      toast.error('Verwijderen mislukt');
    } finally {
      setDeleting(false);
    }
  };

  const getCustomerDisplay = (r: Report) => {
    const nameParts = [r.customer_title, r.customer_initials, r.customer_last_name].filter(Boolean).join(' ');
    return r.opdrachtgever || nameParts || r.client_name || '-';
  };

  const getVehicleDisplay = (r: Report) => {
    const parts = [r.rdw_merk, r.rdw_handelsbenaming].filter(Boolean);
    return parts.length > 0 ? parts.join(' ') : '-';
  };

  const formatLicensePlate = (plate: string | null) => {
    if (!plate) return '-';
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

  const colSpan = isAdmin ? 9 : 8;

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
                <TableHead className="w-[120px] text-white font-bold">Rapportnr.</TableHead>
                <TableHead className="w-[60px] text-white font-bold">Type</TableHead>
                <TableHead className="w-[100px] text-white font-bold">Kenteken</TableHead>
                <TableHead className="text-white font-bold">Voertuig</TableHead>
                <TableHead className="text-white font-bold">Klant</TableHead>
                <TableHead className="w-[130px] text-white font-bold">Status</TableHead>
                {hasAnyAssigned && <TableHead className="w-[100px] text-white font-bold">Toegewezen</TableHead>}
                <TableHead className="w-[140px] text-white font-bold">Inspectiedatum</TableHead>
                {isAdmin && <TableHead className="w-[60px]"></TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={colSpan} className="text-center py-8">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredReports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={colSpan} className="text-center py-8 text-muted-foreground">
                    {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' ? 'Geen rapporten gevonden' : 'Nog geen rapporten'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredReports.map((report) => {
                  const appraiser = getAppraiserById(report.assigned_to);
                  return (
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
                      <TableCell>
                        {appraiser ? (
                          <div className="flex items-center gap-1.5">
                            <Avatar className="h-5 w-5">
                              <AvatarFallback className="text-[9px] font-semibold bg-primary/20 text-primary">{appraiser.initials}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-muted-foreground">{appraiser.displayName}</span>
                          </div>
                        ) : <span className="text-xs text-muted-foreground">—</span>}
                      </TableCell>
                      <TableCell className="text-xs">{formatDate(report.inspection_date)}</TableCell>
                      {isAdmin && (
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => setDeleteTarget(report)}
                            className="p-1.5 rounded hover:bg-destructive/15 text-muted-foreground hover:text-destructive transition-colors"
                            title="Rapport verwijderen"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rapport verwijderen?</AlertDialogTitle>
            <AlertDialogDescription>
              Weet je zeker dat je rapport <strong className="text-foreground">{deleteTarget?.report_number}</strong> wilt verwijderen? Dit kan niet ongedaan worden gemaakt.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuleren</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? 'Verwijderen...' : 'Definitief verwijderen'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </InternalLayout>
  );
};

export default Reports;
