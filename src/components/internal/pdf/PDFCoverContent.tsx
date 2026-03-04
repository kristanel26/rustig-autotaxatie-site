import { Page, View, Text, Image } from '@react-pdf/renderer';
import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';
import logoTmv from '@/assets/logo-tmv.png';
import logoVrt from '@/assets/logo-vrt.png';
import logoFehac from '@/assets/logo-fehac.png';
import logoHobeon from '@/assets/logo-hobeon.webp';

interface PDFCoverContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: any;
  totalPages?: number;
}

const COLORS = {
  title: '#1B2A4A',
  values: '#000000',
  labels: '#555555',
  subtitle: '#666666',
  lightText: '#999999',
  lines: '#CCCCCC',
};

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

  return (
    <Page size="A4" style={{
      fontFamily: 'Helvetica',
      fontSize: 10,
      color: COLORS.values,
      lineHeight: 1.5,
      position: 'relative',
    }}>
      {/* Main content area with A4 margins */}
      <View style={{
        position: 'absolute',
        top: 30,
        left: 50,
        right: 50,
        bottom: 55,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* ZONE 1 — Header: AT logo left, register logos right */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 44 }}>
          <Image src={logoAutomobiel} style={{ height: 80, width: 'auto' }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Image src={logoVrt} style={{ height: 40, width: 'auto' }} />
            <Image src={logoHobeon} style={{ height: 40, width: 'auto' }} />
            <Image src={logoTmv} style={{ height: 40, width: 'auto' }} />
            <Image src={logoFehac} style={{ height: 40, width: 'auto' }} />
          </View>
        </View>

        {/* ZONE 2 — Title block */}
        <View style={{ marginBottom: 8 }}>
          <Text style={{ fontSize: 32, fontFamily: 'Helvetica-Bold', color: COLORS.title, letterSpacing: 0.5, textTransform: 'uppercase' }}>
            Taxatierapport
          </Text>
          <Text style={{ fontSize: 12, color: COLORS.subtitle, marginTop: 6 }}>
            Volgens artikel 7:960 BW
          </Text>
          <Text style={{ fontSize: 9, color: COLORS.lightText, marginTop: 8 }}>
            Dit taxatierapport is opgesteld ten behoeve van de vaststelling van de vervangingswaarde van het voertuig.
          </Text>
        </View>

        {/* Separator line */}
        <View style={{ borderBottomWidth: 1, borderBottomColor: COLORS.lines, marginBottom: 32 }} />

        {/* ZONE 3 — Vehicle info + Photo (two columns) */}
        <View style={{ flexDirection: 'row', gap: 30, marginBottom: 24 }}>
          {/* Left: vehicle data */}
          <View style={{ flex: 1 }}>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 9, color: COLORS.labels, textTransform: 'uppercase', letterSpacing: 0.5 }}>VOERTUIG</Text>
              <Text style={{ fontSize: 15, fontFamily: 'Helvetica-Bold', color: COLORS.values, marginTop: 3, textTransform: 'uppercase' }}>
                {vehicleDisplay || 'nog niet ingevuld'}
              </Text>
            </View>
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontSize: 9, color: COLORS.labels, textTransform: 'uppercase', letterSpacing: 0.5 }}>KENTEKEN</Text>
              <Text style={{ fontSize: 15, fontFamily: 'Helvetica-Bold', color: COLORS.values, marginTop: 3 }}>
                {report.license_plate || 'nog niet ingevuld'}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 9, color: COLORS.labels, textTransform: 'uppercase', letterSpacing: 0.5 }}>DOCUMENTNUMMER</Text>
              <Text style={{ fontSize: 15, fontFamily: 'Helvetica-Bold', color: COLORS.values, marginTop: 3 }}>
                {report.document_reference || 'nog niet ingevuld'}
              </Text>
            </View>
          </View>

          {/* Right: vehicle photo */}
          <View style={{ width: 230 }}>
            {coverPhoto ? (
              <View style={{ width: 230, height: 185, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.lines }}>
                <Image
                  src={coverPhoto}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </View>
            ) : (
              <View style={{ width: 230, height: 185, backgroundColor: '#f5f5f5', borderWidth: 1, borderColor: COLORS.lines }} />
            )}
          </View>
        </View>

        {/* ZONE 4 — Client info */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 9, color: COLORS.labels, textTransform: 'uppercase', letterSpacing: 0.5 }}>IN OPDRACHT VAN</Text>
          <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: COLORS.values, marginTop: 3 }}>
            {customerName || 'nog niet ingevuld'}
          </Text>
          {customerAddress && <Text style={{ fontSize: 10, color: COLORS.values, marginTop: 1 }}>{customerAddress}</Text>}
          {customerCity && <Text style={{ fontSize: 10, color: COLORS.values, marginTop: 1 }}>{customerCity}</Text>}
        </View>

        {/* ZONE 5 — Inspection details */}
        <View style={{ marginBottom: 8 }}>
          <View style={{ marginBottom: 6 }}>
            <Text style={{ fontSize: 9, color: COLORS.labels, textTransform: 'uppercase', letterSpacing: 0.5 }}>OPNAMEDATUM</Text>
            <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: COLORS.values, marginTop: 2 }}>
              {inspectionDate || 'nog niet ingevuld'}
            </Text>
          </View>
          <View style={{ marginBottom: 6 }}>
            <Text style={{ fontSize: 9, color: COLORS.labels, textTransform: 'uppercase', letterSpacing: 0.5 }}>TIJDSTIP OPNAME</Text>
            <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: COLORS.values, marginTop: 2 }}>
              {startTime || 'nog niet ingevuld'}
            </Text>
          </View>
          <View style={{ marginBottom: 6 }}>
            <Text style={{ fontSize: 9, color: COLORS.labels, textTransform: 'uppercase', letterSpacing: 0.5 }}>TIJDSTIP EINDE OPNAME</Text>
            <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: COLORS.values, marginTop: 2 }}>
              {endTime || 'nog niet ingevuld'}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 9, color: COLORS.labels, textTransform: 'uppercase', letterSpacing: 0.5 }}>LOCATIE OPNAME</Text>
            <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: COLORS.values, marginTop: 2 }}>
              {inspectionLocation || 'nog niet ingevuld'}
            </Text>
          </View>
        </View>

        {/* Spacer pushes appraiser to bottom */}
        <View style={{ flex: 1 }} />

        {/* ZONE 6 — Appraiser */}
        <View>
          <Text style={{ fontSize: 9, color: COLORS.labels, textTransform: 'uppercase', letterSpacing: 0.5 }}>TAXATIE UITGEVOERD DOOR</Text>
          <Text style={{ fontSize: 12, fontFamily: 'Helvetica-Bold', color: COLORS.values, marginTop: 3 }}>Erik Elderson</Text>
          <Text style={{ fontSize: 10, color: COLORS.subtitle, marginTop: 2 }}>TMV Register Taxateur nr. 33106</Text>
          <Text style={{ fontSize: 10, color: COLORS.subtitle, marginTop: 1 }}>Register Taxateur VRT nr. 22-523-M</Text>
        </View>
      </View>

      {/* ZONE 7 — Footer (absolute bottom) */}
      <View style={{
        position: 'absolute',
        bottom: 22,
        left: 50,
        right: 50,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 6 }}>
          <Image src={logoAutomobiel} style={{ height: 28, width: 'auto' }} />
          <Text style={{ fontSize: 9, color: COLORS.lightText }}>Pagina 1 van {totalPages}</Text>
        </View>
        <Text style={{ fontSize: 7.5, color: COLORS.subtitle }}>
          Leigraaf 160, 6651 GJ Druten   |   KvK: 95549269   |   BTW: NL003366178B93   |   TMV: 33106   |   VRT: 22-523-M   |   Bank: NL80 RABO 0387 9156 80
        </Text>
      </View>
    </Page>
  );
};

export default PDFCoverContent;
