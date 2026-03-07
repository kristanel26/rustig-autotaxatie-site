import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import InternalLayout from '@/components/internal/InternalLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Search, Plus, Building2, User, Pencil, Trash2 } from 'lucide-react';
import { PostcodeField } from '@/components/internal/PostcodeField';
import { normalizeInitials, capitalizeFirst, normalizePostcode } from '@/lib/normalizers';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface Customer {
  id: string;
  customer_type: string;
  company_name: string | null;
  kvk_nummer: string | null;
  rsin: string | null;
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

const emptyForm = {
  customer_type: 'particulier',
  company_name: '',
  kvk_nummer: '',
  rsin: '',
  salutation: '',
  initials: '',
  first_name: '',
  last_name: '',
  street: '',
  house_number: '',
  postal_code: '',
  city: '',
  email: '',
  phone: '',
  notes: '',
};

const Customers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [returnToReport, setReturnToReport] = useState<string | null>(null);

  const fetchCustomers = async () => {
    const { data } = await supabase
      .from('customers')
      .select('*')
      .order('last_name', { ascending: true });
    setCustomers((data as Customer[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Support opening edit dialog from CustomerDetail page
  useEffect(() => {
    const state = location.state as { editId?: string } | null;
    if (state?.editId && customers.length > 0) {
      const c = customers.find(c => c.id === state.editId);
      if (c) openEdit(c);
      // Clear state
      window.history.replaceState({}, document.title);
    }
  }, [customers, location.state]);

  // Support opening new customer dialog via query param (e.g. from EditReport)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('nieuw') === '1') {
      openNew();
      // Remove query param from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const filtered = customers.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.last_name.toLowerCase().includes(q) ||
      (c.first_name?.toLowerCase().includes(q)) ||
      (c.company_name?.toLowerCase().includes(q)) ||
      (c.email?.toLowerCase().includes(q)) ||
      (c.city?.toLowerCase().includes(q)) ||
      (c.phone?.includes(q))
    );
  });

  const openNew = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (c: Customer) => {
    setEditingId(c.id);
    setForm({
      customer_type: c.customer_type,
      company_name: c.company_name || '',
      kvk_nummer: c.kvk_nummer || '',
      rsin: c.rsin || '',
      salutation: c.salutation || '',
      initials: c.initials || '',
      first_name: c.first_name || '',
      last_name: c.last_name,
      street: c.street || '',
      house_number: c.house_number || '',
      postal_code: c.postal_code || '',
      city: c.city || '',
      email: c.email || '',
      phone: c.phone || '',
      notes: c.notes || '',
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.last_name.trim()) {
      toast.error('Achternaam is verplicht');
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      company_name: form.company_name || null,
      kvk_nummer: form.kvk_nummer || null,
      rsin: form.rsin || null,
      salutation: form.salutation || null,
      initials: form.initials ? normalizeInitials(form.initials) : null,
      first_name: form.first_name ? capitalizeFirst(form.first_name) : null,
      last_name: capitalizeFirst(form.last_name),
      street: form.street ? capitalizeFirst(form.street) : null,
      house_number: form.house_number || null,
      postal_code: form.postal_code ? normalizePostcode(form.postal_code) : null,
      city: form.city ? capitalizeFirst(form.city) : null,
      email: form.email || null,
      phone: form.phone || null,
      notes: form.notes || null,
    };

    if (editingId) {
      const { error } = await supabase
        .from('customers')
        .update(payload)
        .eq('id', editingId);
      if (error) {
        toast.error('Opslaan mislukt');
      } else {
        toast.success('Klant bijgewerkt');
        // Sync to linked concept reports
        await syncCustomerToConceptReports(editingId, payload);
      }
    } else {
      const { error } = await supabase
        .from('customers')
        .insert({ ...payload, user_id: user!.id });
      if (error) {
        toast.error('Opslaan mislukt');
      } else {
        toast.success('Klant aangemaakt');
      }
    }
    setSaving(false);
    setDialogOpen(false);
    fetchCustomers();
  };

  const syncCustomerToConceptReports = async (customerId: string, payload: Record<string, any>) => {
    try {
      // Find all concept reports linked to this customer
      const { data: linkedReports } = await supabase
        .from('reports')
        .select('id')
        .eq('customer_id', customerId)
        .eq('status', 'concept');

      if (!linkedReports || linkedReports.length === 0) return;

      const reportUpdate = {
        opdrachtgever: payload.company_name || null,
        customer_title: payload.salutation || null,
        customer_initials: payload.initials || null,
        customer_last_name: payload.last_name || null,
        customer_street: [payload.street, payload.house_number].filter(Boolean).join(' ') || null,
        customer_postcode: payload.postal_code || null,
        customer_city: payload.city || null,
        customer_email: payload.email || null,
        customer_phone: payload.phone || null,
      };

      const { error } = await supabase
        .from('reports')
        .update(reportUpdate)
        .eq('customer_id', customerId)
        .eq('status', 'concept');

      if (!error) {
        toast.info(`${linkedReports.length} concept-rapport${linkedReports.length > 1 ? 'en' : ''} bijgewerkt`);
      }
    } catch (err) {
      console.error('Sync to reports failed:', err);
    }
  };


  const handleDelete = async (id: string) => {
    if (!confirm('Weet je zeker dat je deze klant wilt verwijderen?')) return;
    const { error } = await supabase.from('customers').delete().eq('id', id);
    if (error) {
      toast.error('Verwijderen mislukt');
    } else {
      toast.success('Klant verwijderd');
      fetchCustomers();
    }
  };

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const displayName = (c: Customer) => {
    const parts = [c.salutation, c.initials, c.last_name].filter(Boolean);
    return parts.join(' ');
  };

  return (
    <InternalLayout title="Klanten">
      <div className="space-y-4">
        {/* Action bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Zoek op naam, bedrijf, e-mail, plaats..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={openNew}>
            <Plus className="h-4 w-4 mr-2" />
            Nieuwe Klant
          </Button>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : filtered.length === 0 ? (
              <p className="text-muted-foreground text-center py-12 text-sm">
                {search ? 'Geen klanten gevonden' : 'Nog geen klanten'}
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Naam</TableHead>
                    <TableHead className="hidden sm:table-cell">Bedrijf</TableHead>
                    <TableHead className="hidden md:table-cell">Plaats</TableHead>
                    <TableHead className="hidden lg:table-cell">E-mail</TableHead>
                    <TableHead className="hidden lg:table-cell">Telefoon</TableHead>
                    <TableHead className="w-[60px]">Type</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((c) => (
                    <TableRow key={c.id} className="cursor-pointer" onClick={() => navigate(`/intern/klanten/${c.id}`)}>
                      <TableCell className="font-medium">{displayName(c)}</TableCell>
                      <TableCell className="hidden sm:table-cell text-sm">
                        {c.company_name || '-'}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm">{c.city || '-'}</TableCell>
                      <TableCell className="hidden lg:table-cell text-sm">{c.email || '-'}</TableCell>
                      <TableCell className="hidden lg:table-cell text-sm font-mono">{c.phone || '-'}</TableCell>
                      <TableCell>
                        {c.customer_type === 'zakelijk' ? (
                          <Badge variant="outline" className="text-xs gap-1">
                            <Building2 className="h-3 w-3" /> Zakelijk
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs gap-1">
                            <User className="h-3 w-3" /> Particulier
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => openEdit(c)}
                            className="p-1.5 rounded hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(c.id)}
                            className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Customer Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Klant Bewerken' : 'Nieuwe Klant'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label>Type klant</Label>
              <Select value={form.customer_type} onValueChange={(v) => updateField('customer_type', v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="particulier">Particulier</SelectItem>
                  <SelectItem value="zakelijk">Zakelijk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {form.customer_type === 'zakelijk' && (
              <>
                <div>
                  <Label>Bedrijfsnaam</Label>
                  <Input value={form.company_name} onChange={(e) => updateField('company_name', e.target.value)} />
                </div>
                <div>
                  <Label>KVK-nummer</Label>
                  <Input value={form.kvk_nummer} onChange={(e) => updateField('kvk_nummer', e.target.value)} placeholder="12345678" />
                </div>
                <div>
                  <Label>RSIN</Label>
                  <Input value={form.rsin} onChange={(e) => updateField('rsin', e.target.value)} placeholder="123456789" />
                </div>
              </>
            )}

            {form.customer_type === 'particulier' && (
              <div>
                <Label>BSN / RSIN (optioneel)</Label>
                <Input value={form.rsin} onChange={(e) => updateField('rsin', e.target.value)} placeholder="123456789" />
              </div>
            )}

            <div className="grid grid-cols-3 gap-3">
              <div>
                <Label>Aanhef</Label>
                <Select value={form.salutation} onValueChange={(v) => updateField('salutation', v)}>
                  <SelectTrigger><SelectValue placeholder="—" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dhr.">Dhr.</SelectItem>
                    <SelectItem value="Mevr.">Mevr.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Voorletters</Label>
                <Input
                  value={form.initials}
                  onChange={(e) => updateField('initials', e.target.value)}
                  onBlur={(e) => updateField('initials', normalizeInitials(e.target.value))}
                  placeholder="A.B."
                />
              </div>
              <div>
                <Label>Voornaam</Label>
                <Input
                  value={form.first_name}
                  onChange={(e) => updateField('first_name', e.target.value)}
                  onBlur={(e) => updateField('first_name', capitalizeFirst(e.target.value))}
                />
              </div>
            </div>

            <div>
              <Label>Achternaam *</Label>
              <Input
                value={form.last_name}
                onChange={(e) => updateField('last_name', e.target.value)}
                onBlur={(e) => updateField('last_name', capitalizeFirst(e.target.value))}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <Label>Straat</Label>
                <Input
                  value={form.street}
                  onChange={(e) => updateField('street', e.target.value)}
                  onBlur={(e) => updateField('street', capitalizeFirst(e.target.value))}
                />
              </div>
              <div>
                <Label>Huisnr.</Label>
                <Input value={form.house_number} onChange={(e) => updateField('house_number', e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <PostcodeField
                postcode={form.postal_code}
                city={form.city}
                street={form.street}
                onPostcodeChange={(v) => updateField('postal_code', v)}
                onCityChange={(v) => updateField('city', v)}
                onStreetChange={(v) => updateField('street', v)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>E-mail</Label>
                <Input type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} />
              </div>
              <div>
                <Label>Telefoon</Label>
                <Input value={form.phone} onChange={(e) => updateField('phone', e.target.value)} />
              </div>
            </div>

            <div>
              <Label>Notities</Label>
              <Textarea
                value={form.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                placeholder="Vrij tekstveld voor opmerkingen over deze klant..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Annuleren</Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? 'Opslaan...' : editingId ? 'Bijwerken' : 'Aanmaken'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </InternalLayout>
  );
};

export default Customers;
