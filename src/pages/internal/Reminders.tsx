import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import InternalLayout from '@/components/internal/InternalLayout';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Download, RefreshCw, Play } from 'lucide-react';
import { toast } from 'sonner';

interface ReminderReport {
  id: string;
  report_number: string;
  license_plate: string | null;
  customer_title: string | null;
  customer_initials: string | null;
  customer_last_name: string | null;
  customer_email: string | null;
  rdw_merk: string | null;
  rdw_handelsbenaming: string | null;
  vehicle_brand: string | null;
  model_display_name: string | null;
  inspection_date: string | null;
  herinnering_status: string | null;
  herinnering_verzonden_op: string | null;
  herinnering_verzonden_aan_email: string | null;
  herinnering_laatste_fout: string | null;
}

const STATUS_OPTIONS = [
  { value: 'all', label: 'Alle statussen' },
  { value: 'gepland', label: 'Gepland' },
  { value: 'verzonden', label: 'Verzonden' },
  { value: 'mislukt', label: 'Mislukt' },
  { value: 'niet_meer_van_toepassing', label: 'Niet meer van toepassing' },
];

const getStatusBadge = (status: string | null) => {
  switch (status) {
    case 'verzonden':
      return <Badge className="bg-emerald-500/15 text-emerald-700 border-emerald-500/20 hover:bg-emerald-500/15">Verzonden</Badge>;
    case 'mislukt':
      return <Badge variant="destructive">Mislukt</Badge>;
    case 'niet_meer_van_toepassing':
      return <Badge variant="secondary">N.v.t.</Badge>;
    case 'gepland':
    default:
      return <Badge variant="outline">Gepland</Badge>;
  }
};

const Reminders = () => {
  const [reports, setReports] = useState<ReminderReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const navigate = useNavigate();

  const fetchReports = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('reports')
        .select(`
          id,
          report_number,
          license_plate,
          customer_title,
          customer_initials,
          customer_last_name,
          customer_email,
          rdw_merk,
          rdw_handelsbenaming,
          vehicle_brand,
          model_display_name,
          inspection_date,
          herinnering_status,
          herinnering_verzonden_op,
          herinnering_verzonden_aan_email,
          herinnering_laatste_fout
        `)
        .not('inspection_date', 'is', null)
        .order('inspection_date', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast.error('Fout bij ophalen van herinneringen');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Calculate "geldig tot" date (inspection_date + 3 years)
  const calculateValidUntil = (inspectionDate: string | null): string => {
    if (!inspectionDate) return '-';
    const date = new Date(inspectionDate);
    date.setFullYear(date.getFullYear() + 3);
    return date.toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      // Search filter
      const search = searchTerm.toLowerCase();
      const customerName = [report.customer_title, report.customer_initials, report.customer_last_name]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      const vehicle = [
        report.rdw_merk || report.vehicle_brand,
        report.rdw_handelsbenaming || report.model_display_name,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      const matchesSearch =
        !searchTerm ||
        report.report_number.toLowerCase().includes(search) ||
        (report.license_plate?.toLowerCase().includes(search) ?? false) ||
        customerName.includes(search) ||
        vehicle.includes(search) ||
        (report.customer_email?.toLowerCase().includes(search) ?? false);

      // Status filter
      const matchesStatus =
        statusFilter === 'all' ||
        report.herinnering_status === statusFilter ||
        (statusFilter === 'gepland' && !report.herinnering_status);

      // Date filter on inspection_date
      let matchesDateRange = true;
      if (dateFrom && report.inspection_date) {
        matchesDateRange = matchesDateRange && report.inspection_date >= dateFrom;
      }
      if (dateTo && report.inspection_date) {
        matchesDateRange = matchesDateRange && report.inspection_date <= dateTo;
      }

      return matchesSearch && matchesStatus && matchesDateRange;
    });
  }, [reports, searchTerm, statusFilter, dateFrom, dateTo]);

  const exportToCSV = () => {
    const headers = [
      'Rapportnummer',
      'Kenteken',
      'Klant',
      'E-mail',
      'Voertuig',
      'Inspectiedatum',
      'Geldig tot',
      'Status',
      'Verzonden op',
      'Verzonden aan',
      'Laatste fout',
    ];

    const rows = filteredReports.map((report) => [
      report.report_number,
      report.license_plate || '',
      [report.customer_title, report.customer_initials, report.customer_last_name]
        .filter(Boolean)
        .join(' '),
      report.customer_email || '',
      [
        report.rdw_merk || report.vehicle_brand,
        report.rdw_handelsbenaming || report.model_display_name,
      ]
        .filter(Boolean)
        .join(' '),
      report.inspection_date || '',
      calculateValidUntil(report.inspection_date),
      report.herinnering_status || 'gepland',
      report.herinnering_verzonden_op || '',
      report.herinnering_verzonden_aan_email || '',
      report.herinnering_laatste_fout || '',
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      )
      .join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `herinneringen-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast.success('CSV geëxporteerd');
  };

  const runReminders = async () => {
    setProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('process-reminders');

      if (error) throw error;

      toast.success(
        `Herinneringen verwerkt: ${data.sent} verzonden, ${data.failed} mislukt, ${data.skipped} overgeslagen`
      );

      // Refresh the list
      await fetchReports();
    } catch (error) {
      console.error('Error running reminders:', error);
      toast.error('Fout bij verwerken van herinneringen');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <InternalLayout title="Herinneringen">
      <div className="space-y-4">
        {/* Filters Bar */}
        <div className="flex flex-col lg:flex-row gap-3 justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Zoek op klant, kenteken, e-mail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Date Range */}
            <div className="flex gap-2 items-center">
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-[140px]"
                placeholder="Van"
              />
              <span className="text-muted-foreground">t/m</span>
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-[140px]"
                placeholder="Tot"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchReports} disabled={loading} className="text-white">
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Vernieuwen
            </Button>
            <Button variant="outline" onClick={exportToCSV} disabled={filteredReports.length === 0} className="text-white">
              <Download className="h-4 w-4 mr-2" />
              CSV Export
            </Button>
            <Button onClick={runReminders} disabled={processing} className="text-white">
              <Play className={`h-4 w-4 mr-2 ${processing ? 'animate-pulse' : ''}`} />
              Verwerk nu
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-background rounded-lg border border-border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-white font-bold">Rapportnr.</TableHead>
                <TableHead className="text-white font-bold">Klant</TableHead>
                <TableHead className="text-white font-bold">Voertuig</TableHead>
                <TableHead className="w-[100px] text-white font-bold">Inspectie</TableHead>
                <TableHead className="w-[100px] text-white font-bold">Geldig tot</TableHead>
                <TableHead className="w-[100px] text-white font-bold">Status</TableHead>
                <TableHead className="w-[100px] text-white font-bold">Verzonden</TableHead>
                <TableHead className="text-white font-bold">Verzonden aan</TableHead>
                <TableHead className="text-white font-bold">Fout</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredReports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    Geen herinneringen gevonden
                  </TableCell>
                </TableRow>
              ) : (
                filteredReports.map((report) => (
                  <TableRow
                    key={report.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => navigate(`/intern/rapport/${report.id}`)}
                  >
                    <TableCell className="font-medium text-[#c9a84c]">{report.report_number}</TableCell>
                    <TableCell className="text-white">
                      {[report.customer_title, report.customer_initials, report.customer_last_name]
                        .filter(Boolean)
                        .join(' ') || <span className="text-[#9CA3AF]">-</span>}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-white">
                          {[
                            report.rdw_merk || report.vehicle_brand,
                            report.rdw_handelsbenaming || report.model_display_name,
                          ]
                            .filter(Boolean)
                            .join(' ') || '-'}
                        </span>
                        {report.license_plate && (
                          <span className="text-xs text-[#9CA3AF]">
                            {report.license_plate}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-[#9CA3AF]">{formatDate(report.inspection_date)}</TableCell>
                    <TableCell className="text-[#9CA3AF]">{calculateValidUntil(report.inspection_date)}</TableCell>
                    <TableCell>{getStatusBadge(report.herinnering_status)}</TableCell>
                    <TableCell className="text-[#9CA3AF]">{formatDate(report.herinnering_verzonden_op)}</TableCell>
                    <TableCell className="text-xs text-[#9CA3AF]">{report.herinnering_verzonden_aan_email || '-'}</TableCell>
                    <TableCell className="text-xs text-destructive max-w-[150px] truncate">
                      {report.herinnering_laatste_fout || <span className="text-[#9CA3AF]">-</span>}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Results Count */}
        {!loading && (
          <p className="text-sm text-muted-foreground">
            {filteredReports.length} herinnering{filteredReports.length !== 1 ? 'en' : ''} gevonden
          </p>
        )}
      </div>
    </InternalLayout>
  );
};

export default Reminders;
