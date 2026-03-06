import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InternalLayout from '@/components/internal/InternalLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { FileText, FilePlus, Calendar } from 'lucide-react';
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
}

interface RecentReport {
  id: string;
  report_number: string;
  license_plate: string | null;
  client_name: string;
  inspection_date: string | null;
  status: string | null;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalReports: 0,
    reportsThisMonth: 0,
  });
  const [recentReports, setRecentReports] = useState<RecentReport[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

        // Fetch total reports
        const { count: totalCount } = await supabase
          .from('reports')
          .select('*', { count: 'exact', head: true });

        // Fetch reports this month based on inspection_date
        const { count: monthCount } = await supabase
          .from('reports')
          .select('*', { count: 'exact', head: true })
          .gte('inspection_date', startOfMonth)
          .lt('inspection_date', endOfMonth);

        // Fetch 5 most recent reports
        const { data: latestReports } = await supabase
          .from('reports')
          .select('id, report_number, license_plate, client_name, inspection_date, status')
          .order('created_at', { ascending: false })
          .limit(5);

        setStats({
          totalReports: totalCount || 0,
          reportsThisMonth: monthCount || 0,
        });
        setRecentReports((latestReports as RecentReport[]) || []);
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

  return (
    <InternalLayout title="Dashboard">
      <div className="space-y-6">
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
              Bekijk Rapporten
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Totaal Rapporten
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : stats.totalReports}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Deze Maand
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : stats.reportsThisMonth}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Op basis van inspectiedatum
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Laatste Rapporten</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : recentReports.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Nog geen rapporten
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Rapportnr.</TableHead>
                    <TableHead>Kenteken</TableHead>
                    <TableHead>Klantnaam</TableHead>
                    <TableHead className="w-[100px]">Status</TableHead>
                    <TableHead className="w-[140px]">Inspectiedatum</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentReports.map((report) => (
                    <TableRow
                      key={report.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => navigate(`/intern/rapport/${report.id}`)}
                    >
                      <TableCell className="font-medium">
                        {report.report_number}
                      </TableCell>
                      <TableCell>{report.license_plate || '-'}</TableCell>
                      <TableCell>{report.client_name}</TableCell>
                      <TableCell>
                        {(() => { const s = getStatusBadgeProps(report.status); return <Badge variant="outline" className={`text-xs ${s.className}`}>{s.label}</Badge>; })()}
                      </TableCell>
                      <TableCell>{formatDate(report.inspection_date)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </InternalLayout>
  );
};

export default Dashboard;
