import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import InternalLayout from '@/components/internal/InternalLayout';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';

interface ReportRow {
  id: string;
  report_type: string | null;
  created_at: string;
  user_id: string;
  status: string | null;
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];

const TYPE_COLORS: Record<string, string> = {
  klassieker: 'hsl(var(--gold))',
  camper: 'hsl(210, 70%, 55%)',
  wev: 'hsl(150, 60%, 45%)',
};

const BILLABLE_STATUSES = ['gereed', 'verzonden'];

function getYearRange(): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let y = currentYear; y >= currentYear - 5; y--) years.push(y);
  return years;
}

function monthKey(year: number, month: number) {
  return `${year}-${String(month + 1).padStart(2, '0')}`;
}

export default function Rapportage() {
  const navigate = useNavigate();
  const [reports, setReports] = useState<ReportRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [userEmails, setUserEmails] = useState<Record<string, string>>({});
  const [onlyBillable, setOnlyBillable] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      // Fetch reports and user emails in parallel
      const [reportsRes, emailsRes] = await Promise.all([
        supabase
          .from('reports')
          .select('id, report_type, created_at, user_id, status')
          .order('created_at', { ascending: false }),
        supabase.rpc('get_user_emails'),
      ]);

      setReports(reportsRes.data ?? []);

      // Build user_id → email map
      if (emailsRes.data && Array.isArray(emailsRes.data)) {
        const emailMap: Record<string, string> = {};
        (emailsRes.data as { user_id: string; email: string }[]).forEach((row) => {
          emailMap[row.user_id] = row.email;
        });
        setUserEmails(emailMap);
      }

      setLoading(false);
    })();
  }, []);

  // Filter reports by billable status when toggle is on
  const filteredReports = useMemo(() => {
    if (!onlyBillable) return reports;
    return reports.filter((r) => BILLABLE_STATUSES.includes(r.status ?? ''));
  }, [reports, onlyBillable]);

  // ── Compute chart data for the selected year ──
  const chartData = useMemo(() => {
    const months = Array.from({ length: 12 }, (_, i) => {
      const key = monthKey(selectedYear, i);
      return { month: MONTH_LABELS[i], key, klassieker: 0, camper: 0, wev: 0 };
    });

    filteredReports.forEach((r) => {
      const d = new Date(r.created_at);
      if (d.getFullYear() !== selectedYear) return;
      const type = r.report_type || 'camper';
      const mi = d.getMonth();
      if (type in months[mi]) {
        (months[mi] as any)[type] += 1;
      }
    });

    return months;
  }, [filteredReports, selectedYear]);

  // ── Monthly table data ──
  const monthlyTable = useMemo(() => {
    return chartData.map((m) => ({
      ...m,
      totaal: m.klassieker + m.camper + m.wev,
    }));
  }, [chartData]);

  // ── User overview ──
  const userOverview = useMemo(() => {
    const map: Record<string, Record<string, { klassieker: number; camper: number; wev: number }>> = {};

    filteredReports.forEach((r) => {
      const d = new Date(r.created_at);
      if (d.getFullYear() !== selectedYear) return;
      const uid = r.user_id;
      const mk = monthKey(selectedYear, d.getMonth());
      if (!map[uid]) map[uid] = {};
      if (!map[uid][mk]) map[uid][mk] = { klassieker: 0, camper: 0, wev: 0 };
      const type = r.report_type || 'camper';
      if (type in map[uid][mk]) {
        (map[uid][mk] as any)[type] += 1;
      }
    });

    const rows: { userId: string; email: string; month: string; monthLabel: string; klassieker: number; camper: number; wev: number; totaal: number }[] = [];
    Object.entries(map).forEach(([uid, months]) => {
      Object.entries(months).forEach(([mk, counts]) => {
        const [y, m] = mk.split('-');
        rows.push({
          userId: uid,
          email: userEmails[uid] || uid.substring(0, 8) + '…',
          month: mk,
          monthLabel: `${MONTH_LABELS[parseInt(m) - 1]} ${y}`,
          ...counts,
          totaal: counts.klassieker + counts.camper + counts.wev,
        });
      });
    });

    rows.sort((a, b) => a.month.localeCompare(b.month));
    return rows;
  }, [filteredReports, selectedYear, userEmails]);

  // ── Export to Excel ──
  const handleExport = () => {
    const wsData = monthlyTable.map((r) => ({
      Maand: r.month,
      KLS: r.klassieker,
      CAM: r.camper,
      WEV: r.wev,
      Totaal: r.totaal,
    }));

    const ws = XLSX.utils.json_to_sheet(wsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Maandoverzicht');

    // Add user overview sheet
    if (userOverview.length > 0) {
      const userWsData = userOverview.map((r) => ({
        Gebruiker: r.email,
        Maand: r.monthLabel,
        KLS: r.klassieker,
        CAM: r.camper,
        WEV: r.wev,
        Totaal: r.totaal,
      }));
      const ws2 = XLSX.utils.json_to_sheet(userWsData);
      XLSX.utils.book_append_sheet(wb, ws2, 'Per Gebruiker');
    }

    XLSX.writeFile(wb, `Rapportage_${selectedYear}.xlsx`);
  };

  // Navigate to reports filtered by month
  const handleMonthClick = (monthKey: string) => {
    const [y, m] = monthKey.split('-');
    navigate(`/intern/rapporten?maand=${y}-${m}`);
  };

  const displayLabel = (uid: string) => userEmails[uid] || uid.substring(0, 8) + '…';

  return (
    <InternalLayout title="Rapportage">
      {/* Controls */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Jaar:</span>
            <Select value={String(selectedYear)} onValueChange={(v) => setSelectedYear(Number(v))}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {getYearRange().map((y) => (
                  <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Switch
              id="billable-filter"
              checked={onlyBillable}
              onCheckedChange={setOnlyBillable}
            />
            <Label htmlFor="billable-filter" className="text-sm text-muted-foreground cursor-pointer">
              Alleen gereed &amp; verzonden
            </Label>
          </div>
        </div>
        <Button variant="outline" onClick={handleExport} className="gap-2">
          <Download className="w-4 h-4" />
          Exporteer naar Excel
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground text-sm">Laden…</p>
      ) : (
        <>
          {/* ── Bar Chart ── */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">
                Maandoverzicht {selectedYear}
                {onlyBillable && (
                  <span className="ml-2 text-xs font-normal text-muted-foreground">(alleen gereed &amp; verzonden)</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--s800))" />
                    <XAxis dataKey="month" tick={{ fill: 'hsl(var(--s400))', fontSize: 12 }} />
                    <YAxis allowDecimals={false} tick={{ fill: 'hsl(var(--s400))', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--s900))',
                        border: '1px solid hsl(var(--s700))',
                        borderRadius: '8px',
                        color: 'white',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="klassieker" name="KLS" fill={TYPE_COLORS.klassieker} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="camper" name="CAM" fill={TYPE_COLORS.camper} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="wev" name="WEV" fill={TYPE_COLORS.wev} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* ── Tables ── */}
          <Tabs defaultValue="maand" className="space-y-4">
            <TabsList>
              <TabsTrigger value="maand">Maandtabel</TabsTrigger>
              <TabsTrigger value="gebruiker">Per Gebruiker</TabsTrigger>
            </TabsList>

            <TabsContent value="maand">
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Maand</TableHead>
                        <TableHead className="text-right">KLS</TableHead>
                        <TableHead className="text-right">CAM</TableHead>
                        <TableHead className="text-right">WEV</TableHead>
                        <TableHead className="text-right font-semibold">Totaal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {monthlyTable.map((row) => (
                        <TableRow
                          key={row.key}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => handleMonthClick(row.key)}
                        >
                          <TableCell className="font-medium">{row.month}</TableCell>
                          <TableCell className="text-right">{row.klassieker || '–'}</TableCell>
                          <TableCell className="text-right">{row.camper || '–'}</TableCell>
                          <TableCell className="text-right">{row.wev || '–'}</TableCell>
                          <TableCell className="text-right font-semibold">{row.totaal || '–'}</TableCell>
                        </TableRow>
                      ))}
                      {/* Totaal row */}
                      <TableRow className="border-t-2 border-primary/20 font-bold">
                        <TableCell>Totaal {selectedYear}</TableCell>
                        <TableCell className="text-right">{monthlyTable.reduce((s, r) => s + r.klassieker, 0)}</TableCell>
                        <TableCell className="text-right">{monthlyTable.reduce((s, r) => s + r.camper, 0)}</TableCell>
                        <TableCell className="text-right">{monthlyTable.reduce((s, r) => s + r.wev, 0)}</TableCell>
                        <TableCell className="text-right">{monthlyTable.reduce((s, r) => s + r.totaal, 0)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="gebruiker">
              <Card>
                <CardContent className="pt-6">
                  {userOverview.length === 0 ? (
                    <p className="text-muted-foreground text-sm py-4">Geen data gevonden voor {selectedYear}.</p>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Gebruiker</TableHead>
                          <TableHead>Maand</TableHead>
                          <TableHead className="text-right">KLS</TableHead>
                          <TableHead className="text-right">CAM</TableHead>
                          <TableHead className="text-right">WEV</TableHead>
                          <TableHead className="text-right font-semibold">Totaal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userOverview.map((row, i) => (
                          <TableRow key={`${row.userId}-${row.month}-${i}`}>
                            <TableCell className="text-sm">{row.email}</TableCell>
                            <TableCell>{row.monthLabel}</TableCell>
                            <TableCell className="text-right">{row.klassieker || '–'}</TableCell>
                            <TableCell className="text-right">{row.camper || '–'}</TableCell>
                            <TableCell className="text-right">{row.wev || '–'}</TableCell>
                            <TableCell className="text-right font-semibold">{row.totaal}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </InternalLayout>
  );
}
