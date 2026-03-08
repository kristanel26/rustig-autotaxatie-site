import { Page, View, Text, Image } from '@react-pdf/renderer';
import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';
import paraafErik from '@/assets/paraaf-erik-elderson.png';

interface PDFWevDocumentsContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: any;
  pageNumber: number;
  totalPages: number;
}

const PDFWevDocumentsContent = ({ report, pageNumber, totalPages }: PDFWevDocumentsContentProps) => {
  const documents: Array<{ file_name: string; document_type: string }> = report._wev_documents || [];

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
        TAXATIEBESTANDEN
      </Text>

      <Text style={{ fontSize: 10, color: '#000000', lineHeight: 1.6, marginBottom: 16 }}>
        De volgende documenten zijn gebruikt als onderbouwing bij deze taxatie:
      </Text>

      {documents.length > 0 ? (
        documents.map((doc, idx) => (
          <View key={idx} style={{ flexDirection: 'row', marginBottom: 6, paddingBottom: 6, borderBottomWidth: idx < documents.length - 1 ? 0.5 : 0, borderBottomColor: '#e2e8f0' }}>
            <Text style={{ fontSize: 10, color: '#000000', width: 20 }}>{idx + 1}.</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#000000' }}>{doc.file_name}</Text>
              <Text style={{ fontSize: 9, color: '#666666' }}>{doc.document_type}</Text>
            </View>
          </View>
        ))
      ) : (
        <Text style={{ fontSize: 10, color: '#888888', fontStyle: 'italic' }}>
          Geen documenten bijgevoegd.
        </Text>
      )}

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
          <Text style={{ fontSize: 9, color: '#000000' }}>Leigraaf 160, 6651 GJ Druten</Text>
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

export default PDFWevDocumentsContent;
