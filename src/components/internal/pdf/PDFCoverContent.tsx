import { Page, View, Text, Image } from '@react-pdf/renderer';
import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';
import logoTmv from '@/assets/logo-tmv.png';
import logoVrt from '@/assets/logo-vrt.png';
import logoFehac from '@/assets/logo-fehac.png';
import { PageFooter } from './shared/PageFooter';

interface PDFCoverContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: any;
  totalPages?: number;
}

const PDFCoverContent = ({ report, totalPages = 1 }: PDFCoverContentProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (timeString: string | null) => {
    if (!timeString) return null;
    return timeString.slice(0, 5) + ' uur';
  };

  const capitalizeFirst = (str: string | null) => {
    if (!str) return null;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const customerName = [report.customer_title, report.customer_initials, report.customer_last_name]
    .filter(Boolean)
    .join(' ') || null;
  const customerAddress = report.customer_street || null;
  const customerCity = [report.customer_postcode, report.customer_city].filter(Boolean).join(' ') || null;
  const vehicleDisplay = report.vehicle_title || 
    [report.rdw_merk, report.rdw_handelsbenaming].filter(Boolean).join(' ') || null;
  const coverPhoto = report.vehicle_photos && report.vehicle_photos.length > 0 ? report.vehicle_photos[0] : null;
  const inspectionDate = report.inspection_date ? formatDate(report.inspection_date) : null;
  const startTime = report.inspection_start_time ? formatTime(report.inspection_start_time) : null;
  const endTime = report.inspection_end_time ? formatTime(report.inspection_end_time) : null;
  const inspectionLocation = capitalizeFirst(report.inspection_location);

  const blockSpacing = 25;

  return (
    <Page size="A4" style={{
      fontFamily: 'Helvetica',
      fontSize: 10,
      color: '#000000',
      lineHeight: 1.5,
      position: 'relative',
    }}>
      <View style={{
        position: 'absolute',
        top: 56,
        left: 71,
        right: 56,
        bottom: 56,
      }}>
        {/* HEADER: FEDERATION LOGOS */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 28 }}>
          <Image src={logoVrt} style={{ height: 45, width: 'auto' }} />
          <Image src={logoTmv} style={{ height: 45, width: 'auto' }} />
          <Image src={logoFehac} style={{ height: 45, width: 'auto' }} />
        </View>

        {/* TITLE */}
        <View style={{ marginBottom: 34 }}>
          <Text style={{ fontSize: 24, fontFamily: 'Helvetica-Bold', color: '#000000', letterSpacing: 0.3, textTransform: 'uppercase' }}>
            Taxatierapport
          </Text>
          <Text style={{ fontSize: 10, color: '#000000', marginTop: 6 }}>
            Volgens artikel 7:960 BW
          </Text>
        </View>

        {/* TWO-COLUMN CONTENT */}
        <View style={{ flexDirection: 'row', gap: 34, flex: 1 }}>
          {/* LEFT COLUMN */}
          <View style={{ flex: 1 }}>
            {/* Rapportgegevens */}
            <View style={{ marginBottom: blockSpacing }}>
              <View style={{ marginBottom: 11 }}>
                <Text style={{ fontSize: 8, color: '#000000', textTransform: 'uppercase', letterSpacing: 0.5 }}>Inzake</Text>
                <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#000000', marginTop: 3 }}>
                  {vehicleDisplay || 'nog niet ingevuld'}
                </Text>
              </View>
              <View style={{ marginBottom: 11 }}>
                <Text style={{ fontSize: 8, color: '#000000', textTransform: 'uppercase', letterSpacing: 0.5 }}>Kenteken</Text>
                <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#000000', marginTop: 3 }}>
                  {report.license_plate || 'nog niet ingevuld'}
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 8, color: '#000000', textTransform: 'uppercase', letterSpacing: 0.5 }}>Documentkenmerk</Text>
                <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#000000', marginTop: 3 }}>
                  {report.document_reference || 'nog niet ingevuld'}
                </Text>
              </View>
            </View>

            {/* Opdrachtgever */}
            <View style={{ marginBottom: blockSpacing }}>
              <Text style={{ fontSize: 8, color: '#000000', textTransform: 'uppercase', letterSpacing: 0.5 }}>In opdracht van</Text>
              <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#000000', marginTop: 3 }}>
                {customerName || 'nog niet ingevuld'}
              </Text>
              {customerAddress && <Text style={{ fontSize: 10, color: '#000000', marginTop: 1.5 }}>{customerAddress}</Text>}
              {customerCity && <Text style={{ fontSize: 10, color: '#000000', marginTop: 1.5 }}>{customerCity}</Text>}
            </View>

            {/* Inspectiegegevens */}
            <View style={{ marginBottom: blockSpacing }}>
              <View style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 8, color: '#000000', textTransform: 'uppercase', letterSpacing: 0.5 }}>Opnamedatum</Text>
                <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#000000', marginTop: 3 }}>
                  {inspectionDate || 'nog niet ingevuld'}
                </Text>
              </View>
              <View style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 8, color: '#000000', textTransform: 'uppercase', letterSpacing: 0.5 }}>Aanvangstijd</Text>
                <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#000000', marginTop: 3 }}>
                  {startTime || 'nog niet ingevuld'}
                </Text>
              </View>
              <View style={{ marginBottom: 8 }}>
                <Text style={{ fontSize: 8, color: '#000000', textTransform: 'uppercase', letterSpacing: 0.5 }}>Eindtijd</Text>
                <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#000000', marginTop: 3 }}>
                  {endTime || 'nog niet ingevuld'}
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 8, color: '#000000', textTransform: 'uppercase', letterSpacing: 0.5 }}>Plaats van opname</Text>
                <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#000000', marginTop: 3 }}>
                  {inspectionLocation || 'nog niet ingevuld'}
                </Text>
              </View>
            </View>

            {/* Uitgevoerd door */}
            <View>
              <Text style={{ fontSize: 8, color: '#000000', textTransform: 'uppercase', letterSpacing: 0.5 }}>Uitgevoerd door</Text>
              <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#000000', marginTop: 3 }}>Erik Elderson</Text>
              <Text style={{ fontSize: 10, color: '#000000', marginTop: 1.5 }}>TMV Register-Taxateur</Text>
              <Text style={{ fontSize: 10, color: '#000000', marginTop: 1.5 }}>Register-Taxateur VRT</Text>
            </View>
          </View>

          {/* RIGHT COLUMN: Vehicle photo */}
          <View style={{ width: 200 }}>
            {coverPhoto ? (
              <Image
                src={coverPhoto}
                style={{
                  width: '100%',
                  height: 150,
                  objectFit: 'cover',
                }}
              />
            ) : (
              <View style={{ width: '100%', height: 150, backgroundColor: '#f5f5f5' }} />
            )}
          </View>
        </View>
      </View>

      {/* FOOTER */}
      <View style={{
        position: 'absolute',
        bottom: 56,
        left: 71,
        right: 56,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <View>
            <Image src={logoAutomobiel} style={{ height: 28, width: 'auto', marginBottom: 8 }} />
            <Text style={{ fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: '#000000' }}>Automobiel Taxaties</Text>
            <Text style={{ fontSize: 8.5, color: '#000000', marginTop: 1.5 }}>Leigraaf 160, 6651 GJ Druten</Text>
            <Text style={{ fontSize: 8.5, color: '#000000', marginTop: 1.5 }}>KvK: 95549269 · BTW: NL003366178B93</Text>
            <Text style={{ fontSize: 8.5, color: '#000000', marginTop: 1.5 }}>TMV: 33106 · VRT: 22-523-M</Text>
            <Text style={{ fontSize: 8.5, color: '#000000', marginTop: 1.5 }}>Bank: NL80 RABO 0387 9156 80</Text>
          </View>
          <Text style={{ fontSize: 8.5, color: '#000000' }}>Pagina 1 van {totalPages}</Text>
        </View>
      </View>
    </Page>
  );
};

export default PDFCoverContent;
