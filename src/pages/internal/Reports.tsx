import { useEffect, useState } from 'react';
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
import { Search, FilePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface Report {
  id: string;
  report_number: string;
  license_plate: string | null;
  customer_title: string | null;
  customer_initials: string | null;
  customer_last_name: string | null;
  inspection_date: string | null;
  herinnering_status: string | null;
  herinnering_verzonden_op: string | null;
}

const getStatusBadge = (status: string | null, verzondenOp: string | null) => {
  switch (status) {
    case 'verzonden':
      return (
        <div className="flex flex-col gap-0.5">
          <Badge className="bg-emerald-500/15 text-emerald-700 border-emerald-500/20 hover:bg-emerald-500/15 text-xs">
            Verzonden
          </Badge>
          {verzondenOp && (
            <span className="text-xs text-muted-foreground">
              {new Date(verzondenOp).toLocaleDateString('nl-NL', {
                day: 'numeric',
                month: 'short',
              })}
            </span>
          )}
        </div>
      );
    case 'mislukt':
      return <Badge variant="destructive" className="text-xs">Mislukt</Badge>;
    case 'niet_meer_van_toepassing':
      return <Badge variant="secondary" className="text-xs">N.v.t.</Badge>;
    case 'gepland':
    default:
      return <Badge variant="outline" className="text-xs">Gepland</Badge>;
  }
};

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const { data, error } = await supabase
          .from('reports')
          .select('id, report_number, license_plate, customer_title, customer_initials, customer_last_name, inspection_date, herinnering_status, herinnering_verzonden_op')
          .order('report_number', { ascending: false });

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

  const filteredReports = reports.filter((report) => {
    const search = searchTerm.toLowerCase();
    const customerName = [report.customer_title, report.customer_initials, report.customer_last_name]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return (
      report.report_number.toString().includes(search) ||
      (report.license_plate?.toLowerCase().includes(search) ?? false) ||
      customerName.includes(search)
    );
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <InternalLayout title="Rapporten">
      <div className="space-y-4">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Zoek op rapportnummer, kenteken of klantnaam..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
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
                <TableHead>Kenteken</TableHead>
                <TableHead>Klant</TableHead>
                <TableHead className="w-[140px]">Inspectiedatum</TableHead>
                <TableHead className="w-[120px]">Herinnering</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredReports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    {searchTerm ? 'Geen rapporten gevonden' : 'Nog geen rapporten'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredReports.map((report) => (
                  <TableRow
                    key={report.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => navigate(`/intern/rapport/${report.id}`)}
                  >
                    <TableCell className="font-medium">
                      {report.report_number}
                    </TableCell>
                    <TableCell>{report.license_plate || '-'}</TableCell>
                    <TableCell>
                      {[report.customer_title, report.customer_initials, report.customer_last_name]
                        .filter(Boolean)
                        .join(' ') || '-'}
                    </TableCell>
                    <TableCell>{formatDate(report.inspection_date)}</TableCell>
                    <TableCell>{getStatusBadge(report.herinnering_status, report.herinnering_verzonden_op)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Results Count */}
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
