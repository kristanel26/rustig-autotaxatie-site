import { Page, View, Text, Image } from '@react-pdf/renderer';
import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';
import paraafErik from '@/assets/paraaf-erik-elderson.png';

interface PDFWevMarketDataContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: any;
  pageNumber: number;
  totalPages: number;
}

const DataRow = ({ label, value }: { label: string; value: string | null }) => (
  <View style={{ flexDirection: 'row', marginBottom: 4, paddingVertical: 3, borderBottomWidth: 0.5, borderBottomColor: '#f0f0f0' }}>
    <Text style={{ fontSize: 10, color: '#555555', width: 200 }}>{label}</Text>
    <Text style={{ fontSize: 10, color: '#000000', flex: 1 }}>{value || '-'}</Text>
  </View>
);

const formatCurrency = (value: number | null) => {
  if (value === null || value === undefined || value <= 0) return '-';
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
};

const PDFWevMarketDataContent = ({ report, pageNumber, totalPages }: PDFWevMarketDataContentProps) => {
  return (
    <Page size="A4" wrap={false} style={{ padding: '24 28', fontFamily: 'Helvetica', position: 'relative' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <View />
        <Image src={logoAutomobiel} style={{ height: 36, width: 'auto' }} />
      </View>
      <Text style={{ fontSize: 8, color: '#888888', marginBottom: 4 }}>
        Automobiel taxatie{report.document_reference ? ` · Documentkenmerk: ${report.document_reference}` : ''}
      </Text>
      <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#cccccc', marginBottom: 14 }} />
      <Text style={{ fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#000000', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 16 }}>
        MARKTGEGEVENS
      </Text>

      {/* Autotelex data */}
      <Text style={{ fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#000000', marginBottom: 10 }}>
        Brongegevens
      </Text>
      <DataRow label="Verkoopwaarde (Autotelex)" value={formatCurrency(report.wev_verkoopwaarde_autotelex)} />
      <DataRow label="Handelsinkoopwaarde (Autotelex)" value={formatCurrency(report.wev_handelsinkoopwaarde_autotelex)} />
      <DataRow label="BTW / Marge" value={report.wev_btw_of_marge || '-'} />
      <DataRow label="Bron" value={report.wev_bron_waardes || '-'} />

      {report.wev_manual_source_note ? (
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#000000', marginBottom: 4 }}>Toelichting brongegevens</Text>
          <Text style={{ fontSize: 10, color: '#000000', lineHeight: 1.6 }}>{report.wev_manual_source_note}</Text>
        </View>
      ) : null}

      {/* Correcties */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#000000', marginBottom: 10 }}>
          Correcties
        </Text>
        <DataRow label="Kilometerstand" value={report.wev_km_stand_correctie || 'Geen'} />
        <DataRow label="Staat/onderhoud" value={report.wev_staat_correctie || 'Geen'} />
        <DataRow label="Schade" value={report.wev_schade_correctie || 'Geen'} />
        <DataRow label="Originaliteit" value={report.wev_originaliteit_correctie || 'Geen'} />
      </View>

      {report.wev_correcties_motivatie ? (
        <View style={{ marginTop: 12 }}>
          <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#000000', marginBottom: 4 }}>Motivatie correcties</Text>
          <Text style={{ fontSize: 10, color: '#000000', lineHeight: 1.6 }}>{report.wev_correcties_motivatie}</Text>
        </View>
      ) : null}

      {/* Footer */}
      <View style={{
        position: 'absolute',
        bottom: 24,
        left: 28,
        right: 28,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#000000' }}>Automobiel Taxaties</Text>
          <Text style={{ fontSize: 9, color: '#000000', marginHorizontal: 4 }}>|</Text>
          <Text style={{ fontSize: 9, color: '#000000' }}>Van Heemstraweg 123, 6651 KH Druten</Text>
          <Text style={{ fontSize: 9, color: '#000000', marginHorizontal: 4 }}>|</Text>
          <Text style={{ fontSize: 9, color: '#000000' }}>KVK: 95549269</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text style={{ fontSize: 5.5, color: '#888888' }}>Paraaf</Text>
          <Image src={paraafErik} style={{ height: 18, width: 'auto', opacity: 0.85 }} />
          <Text style={{ fontSize: 7, color: '#888888', marginLeft: 6 }}>
            Pagina {pageNumber} van {totalPages}
          </Text>
        </View>
      </View>
    </Page>
  );
};

export default PDFWevMarketDataContent;
