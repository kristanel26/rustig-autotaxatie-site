import { Page, View, Text, Image } from '@react-pdf/renderer';
import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';

const signatureErik = '/signature-erik-elderson.png';
const paraafErik = '/paraaf-erik-elderson.png';

interface PDFPhotosContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: any;
  startPageNumber?: number;
  totalPages?: number;
}

const PDFPhotosContent = ({ report, startPageNumber = 4, totalPages = 10 }: PDFPhotosContentProps) => {
  const detailPhotos = (report?.vehicle_photos || []).filter((url: string) => url && url.trim() !== '');

  if (detailPhotos.length === 0) {
    return null;
  }

  const photosPerPage = 6;
  const pages: string[][] = [];
  for (let i = 0; i < detailPhotos.length; i += photosPerPage) {
    pages.push(detailPhotos.slice(i, i + photosPerPage));
  }

  return (
    <>
      {pages.map((pagePhotos, pageIndex) => (
        <Page key={pageIndex} size="A4" style={{ padding: '22 24', fontFamily: 'Helvetica', position: 'relative' }}>
          {/* Header */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
            <View />
            <Image src={logoAutomobiel} style={{ height: 36, width: 'auto' }} />
          </View>
          <Text style={{ fontSize: 8, color: '#888888', marginBottom: 4 }}>
            Automobiel taxatie{report.document_reference ? ` · Documentkenmerk: ${report.document_reference}` : ''}
          </Text>
          <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#cccccc', marginBottom: 14 }} />
          <Text style={{ fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#000000', textTransform: 'uppercase', marginBottom: 12 }}>
            FOTOBIJLAGE
          </Text>

          {/* Photo Grid - 2 columns x 3 rows using flexbox */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
            {pagePhotos.map((photo: string, photoIndex: number) => (
              <View
                key={photoIndex}
                style={{
                  width: '48%',
                  height: 200,
                  borderWidth: 1,
                  borderColor: '#e2e8f0',
                  backgroundColor: '#f8fafc',
                  overflow: 'hidden',
                  borderRadius: 4,
                }}
              >
                <Image
                  src={photo}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                />
              </View>
            ))}
          </View>

          {/* Footer */}
          <View style={{
            position: 'absolute',
            bottom: 18,
            left: 24,
            right: 24,
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
              <Text style={{ fontSize: 7, color: '#000000' }}>Paraaf</Text>
              <Image src={paraafErik} style={{ width: 43, height: 'auto' }} />
              <Text style={{ fontSize: 9, color: '#000000', marginLeft: 8 }}>
                Fotobijlage {pageIndex + 1}
              </Text>
            </View>
          </View>
        </Page>
      ))}
    </>
  );
};

export default PDFPhotosContent;
