import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InternalLayout from '@/components/internal/InternalLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { FileText, FilePlus, Calendar, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalReports: number;
  reportsThisMonth: number;
  reportsThisWeek: number;
  latestReportDate: string | null;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalReports: 0,
    reportsThisMonth: 0,
    reportsThisWeek: 0,
    latestReportDate: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())).toISOString();

        // Fetch total reports
        const { count: totalCount } = await supabase
          .from('reports')
          .select('*', { count: 'exact', head: true });

        // Fetch reports this month
        const { count: monthCount } = await supabase
          .from('reports')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', startOfMonth);

        // Fetch reports this week
        const { count: weekCount } = await supabase
          .from('reports')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', startOfWeek);

        // Fetch latest report
        const { data: latestReport } = await supabase
          .from('reports')
          .select('created_at')
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        setStats({
          totalReports: totalCount || 0,
          reportsThisMonth: monthCount || 0,
          reportsThisWeek: weekCount || 0,
          latestReportDate: latestReport?.created_at || null,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Geen rapporten';
    return new Date(dateString).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : stats.reportsThisMonth}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Deze Week
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : stats.reportsThisWeek}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Laatste Rapport
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-semibold">
                {loading ? '...' : formatDate(stats.latestReportDate)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Welcome Message */}
        <Card>
          <CardHeader>
            <CardTitle>Welkom</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Dit is het interne rapportagesysteem van Automobiel Taxaties. 
              Gebruik de navigatie hierboven om rapporten te bekijken, 
              nieuwe rapporten aan te maken of bestaande rapporten in te zien.
            </p>
          </CardContent>
        </Card>
      </div>
    </InternalLayout>
  );
};

export default Dashboard;
