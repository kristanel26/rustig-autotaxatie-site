import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import InternalLayout from '@/components/internal/InternalLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { ArrowLeft, Plus, Building2, User, FileText, Pencil, Loader2 } from 'lucide-react';
import { ReportType } from '@/components/internal/ReportTypeSelector';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Customer {
  id: string;
  customer_type: string;
  company_name: string | null;
  kvk_nummer: string | null;
  salutation: string | null;
  initials: string | null;
  first_name: string | null;
  last_name: string;
  street: string | null;
  house_number: string | null;
  postal_code: string | null;
  city: string | null;
  email: string | null;
  phone: string | null;
  notes: string | null;
  created_at: string;
}

interface Report {
  id: string;
  report_number: string;
  report_type: string | null;
  status: string | null;
  license_plate: string | null;
  vehicle_brand: string | null;
  rdw_merk: string | null;
  rdw_handelsbenaming: string | null;
  created_at: string;
  appraised_value: number | null;
}

const reportTypeLabels: Record<string, { label: string; code: string }> = {
  camper: { label: 'Campertaxatie', code: 'CAM' },
  wev: { label: 'WEV-taxatie', code: 'WEV' },
  klassieker: { label: 'Klassiekertaxatie', code: 'KLS' },
};

const statusLabels: Record<string, string> = {
  concept: 'Concept',
  klaar: 'Klaar',
  verzonden: 'Verzonden',
};

const CustomerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeDialogOpen, setTypeDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const [custRes, repRes] = await Promise.all([
        supabase.from('customers').select('*').eq('id', id).single(),
        supabase.from('reports').select('id, report_number, report_type, status, license_plate, vehicle_brand, rdw_merk, rdw_handelsbenaming, created_at, appraised_value, customer_id').eq('customer_id', id).order('created_at', { ascending: false }),
      ]);
      if (custRes.data) setCustomer(custRes.data as Customer);
      if (repRes.data) setReports(repRes.data as unknown as Report[]);
      setLoading(false);
    };
    fetch();
  }, [id]);

  const handleCreateReport = async (reportType: ReportType) => {
    if (!user || !customer) return;
    setIsCreating(true);
    try {
      const timestamp = Date.now();
      const { data, error } = await supabase
        .from('reports')
        .insert({
          user_id: user.id,
          report_type: reportType,
          report_number: `DRAFT-${timestamp}`,
          status: 'concept',
          tellerstand_type: 'km',
          customer_id: id,
          // Pre-fill customer data
          opdrachtgever: customer.company_name || null,
          customer_title: customer.salutation || null,
          customer_initials: customer.initials || null,
          customer_last_name: customer.last_name,
          customer_street: [customer.street, customer.house_number].filter(Boolean).join(' ') || null,
          customer_postcode: customer.postal_code || null,
          customer_city: customer.city || null,
          customer_email: customer.email || null,
          customer_phone: customer.phone || null,
        })
        .select('id')
        .single();

      if (error) throw error;

      // Generate proper report number
      const year = new Date().getFullYear();
      const suffix = data.id.replace(/-/g, '').slice(-4).toUpperCase();
      const prefixMap: Record<ReportType, string> = { camper: 'CAM', wev: 'WEV', klassieker: 'KLS' };
      const reportNumber = `${prefixMap[reportType]}-${year}-${suffix}`;

      await supabase.from('reports').update({ report_number: reportNumber }).eq('id', data.id);

      toast.success('Rapport aangemaakt');
      navigate(`/intern/rapport/${data.id}/bewerken`);
    } catch (err) {
      console.error(err);
      toast.error('Fout bij aanmaken rapport');
    } finally {
      setIsCreating(false);
      setTypeDialogOpen(false);
    }
  };

  const displayName = () => {
    if (!customer) return '';
    return [customer.initials, customer.first_name, customer.last_name].filter(Boolean).join(' ');
  };

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString('nl-NL', { day: '2-digit', month: '2-digit', year: 'numeric' }); }
    catch { return d; }
  };

  const formatCurrency = (v: number | null) => {
    if (v == null) return '-';
    return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(v);
  };

  if (loading) {
    return (
      <InternalLayout title="Klantdetail">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </InternalLayout>
    );
  }

  if (!customer) {
    return (
      <InternalLayout title="Klant niet gevonden">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Deze klant bestaat niet of is verwijderd.</p>
          <Button variant="outline" onClick={() => navigate('/intern/klanten')}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Terug naar klanten
          </Button>
        </div>
      </InternalLayout>
    );
  }

  return (
    <InternalLayout title="Klantdetail">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/intern/klanten')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-foreground">{displayName()}</h1>
              <div className="flex items-center gap-2 mt-0.5">
                {customer.customer_type === 'zakelijk' ? (
                  <Badge variant="outline" className="text-xs gap-1"><Building2 className="h-3 w-3" /> Zakelijk</Badge>
                ) : (
                  <Badge variant="outline" className="text-xs gap-1"><User className="h-3 w-3" /> Particulier</Badge>
                )}
                {customer.company_name && <span className="text-sm text-muted-foreground">{customer.company_name}</span>}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/intern/klanten', { state: { editId: customer.id } })}>
              <Pencil className="h-4 w-4 mr-1" /> Bewerken
            </Button>
            <Button size="sm" onClick={() => setTypeDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-1" /> Nieuwe taxatie
            </Button>
          </div>
        </div>

        {/* Contact details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Contactgegevens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {customer.salutation && <p>{customer.salutation} {displayName()}</p>}
              {customer.email && <p className="text-muted-foreground">{customer.email}</p>}
              {customer.phone && <p className="text-muted-foreground font-mono">{customer.phone}</p>}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Adres</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              {(customer.street || customer.house_number) && (
                <p>{[customer.street, customer.house_number].filter(Boolean).join(' ')}</p>
              )}
              {(customer.postal_code || customer.city) && (
                <p>{[customer.postal_code, customer.city].filter(Boolean).join(' ')}</p>
              )}
              {customer.kvk_nummer && <p className="text-muted-foreground">KVK: {customer.kvk_nummer}</p>}
            </CardContent>
          </Card>
        </div>

        {/* Notes */}
        {customer.notes && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Notities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm whitespace-pre-wrap">{customer.notes}</p>
            </CardContent>
          </Card>
        )}

        {/* Reports */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base">Taxaties ({reports.length})</CardTitle>
            <Button size="sm" variant="outline" onClick={() => setTypeDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-1" /> Nieuwe taxatie
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {reports.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">Nog geen taxaties voor deze klant.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rapportnr.</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="hidden sm:table-cell">Voertuig</TableHead>
                    <TableHead className="hidden md:table-cell">Kenteken</TableHead>
                    <TableHead className="hidden md:table-cell">Waarde</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Datum</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((r) => (
                    <TableRow
                      key={r.id}
                      className="cursor-pointer"
                      onClick={() => navigate(`/intern/rapport/${r.id}`)}
                    >
                      <TableCell className="font-mono text-xs">{r.report_number}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {reportTypeLabels[r.report_type || '']?.code || r.report_type}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">
                        {[r.rdw_merk, r.rdw_handelsbenaming].filter(Boolean).join(' ') || '-'}
                      </TableCell>
                      <TableCell className="hidden md:table-cell font-mono text-xs">{r.license_plate || '-'}</TableCell>
                      <TableCell className="hidden md:table-cell text-sm">{formatCurrency(r.appraised_value)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {statusLabels[r.status || ''] || r.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-xs text-muted-foreground">{formatDate(r.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Report Type Selection Dialog */}
      <Dialog open={typeDialogOpen} onOpenChange={setTypeDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Kies rapporttype</DialogTitle>
          </DialogHeader>
          <div className="grid gap-3 pt-2">
            {isCreating ? (
              <div className="flex flex-col items-center py-6 gap-3">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Rapport wordt aangemaakt...</p>
              </div>
            ) : (
              <>
                {(['camper', 'wev', 'klassieker'] as ReportType[]).map((type) => {
                  const info = reportTypeLabels[type];
                  return (
                    <button
                      key={type}
                      onClick={() => handleCreateReport(type)}
                      className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/30 transition-all text-left"
                    >
                      <Badge variant="secondary" className="text-xs font-mono shrink-0">{info.code}</Badge>
                      <span className="font-medium text-sm">{info.label}</span>
                    </button>
                  );
                })}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </InternalLayout>
  );
};

export default CustomerDetail;
