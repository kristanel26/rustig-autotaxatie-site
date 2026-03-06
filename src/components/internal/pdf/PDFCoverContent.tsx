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

// 1mm = 2.8346pt (react-pdf uses points)
const mm = (v: number) => v * 2.8346;

const COLORS = {
  title: '#1B2A4A',
  values: '#000000',
  labels: '#555555',
  subtitle: '#666666',
  light: '#999999',
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

  // Determine report type for variant text
  const reportType = report.report_type?.toLowerCase() || '';
  const isWev = reportType === 'wev';
  const subtitle = isWev
    ? 'Ter bepaling van de Waarde in het Economisch Verkeer'
    : 'Volgens artikel 7:960 BW';
  const description = isWev
    ? 'Dit taxatierapport is opgesteld ten behoeve van de vaststelling van de waarde in het economisch verkeer van het voertuig.'
    : 'Dit taxatierapport is opgesteld ten behoeve van de vaststelling van de vervangingswaarde van het voertuig.';

  const companyName = report.opdrachtgever || null;
  const customerName = [report.customer_title, report.customer_initials, report.customer_last_name]
    .filter(Boolean)
    .join(' ') || null;
  const customerAddress = report.customer_street || null;
  const customerCity = [report.customer_postcode, report.customer_city].filter(Boolean).join(' ') || null;
  const vehicleDisplay = (report.vehicle_title ||
    [report.rdw_merk, report.rdw_handelsbenaming].filter(Boolean).join(' ') || 'nog niet ingevuld').toUpperCase();
  const coverPhoto = report.vehicle_photos && report.vehicle_photos.length > 0 ? report.vehicle_photos[0] : null;
  const inspectionDate = report.inspection_date ? formatDate(report.inspection_date) : null;
  const startTime = report.inspection_start_time ? formatTime(report.inspection_start_time) : null;
  const endTime = report.inspection_end_time ? formatTime(report.inspection_end_time) : null;
  const inspectionLocation = capitalizeFirst(report.inspection_location);

  // Layout constants (mm converted to pt)
  const ML = mm(25);    // margin left
  const MR = mm(20);    // margin right
  const MT = mm(12);    // margin top
  const PAGE_W = mm(210);
  const PAGE_H = mm(297);
  const CONTENT_W = PAGE_W - ML - MR;

  return (
    <Page size="A4" style={{
      fontFamily: 'Helvetica',
      fontSize: 10,
      color: COLORS.values,
      lineHeight: 1.5,
      position: 'relative',
    }}>
      {/* Main content area */}
      <View style={{
        position: 'absolute',
        top: MT,
        left: ML,
        right: MR,
        bottom: mm(24),
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* ============================================ */}
        {/* ZONE 1 — HEADER: AT logo left, register logos right */}
        {/* ============================================ */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center', // register logos vertically centered with AT logo
          marginBottom: mm(28), // 28mm gap to title
        }}>
          <Image src={logoAutomobiel} style={{ height: mm(22), width: 'auto' }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: mm(3) }}>
            <Image src={logoVrt} style={{ height: mm(9), width: 'auto' }} />
            <Image src={logoHobeon} style={{ height: mm(9), width: 'auto' }} />
            <Image src={logoTmv} style={{ height: mm(9), width: 'auto' }} />
            <Image src={logoFehac} style={{ height: mm(9), width: 'auto' }} />
          </View>
        </View>

        {/* ============================================ */}
        {/* ZONE 2 — TITLE */}
        {/* ============================================ */}
        <View>
          <Text style={{
            fontSize: 26,
            fontFamily: 'Helvetica-Bold',
            color: COLORS.title,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          }}>
            Taxatierapport
          </Text>
          <Text style={{ fontSize: 10, color: COLORS.subtitle, marginTop: mm(3.5) }}>
            {subtitle}
          </Text>
          <Text style={{ fontSize: 7.5, color: COLORS.light, marginTop: mm(2.5) }}>
            {description}
          </Text>
        </View>

        {/* Separator line */}
        <View style={{
          borderBottomWidth: 0.5,
          borderBottomColor: COLORS.lines,
          marginTop: mm(3),
          marginBottom: mm(24), // 24mm gap to content
        }} />

        {/* ============================================ */}
        {/* ZONE 3 — VEHICLE + PHOTO */}
        {/* ============================================ */}
        <View style={{ flexDirection: 'row', marginBottom: mm(18) }}>
          {/* Left: vehicle data */}
          <View style={{ flex: 1 }}>
            {/* VOERTUIG */}
            <Text style={{ fontSize: 7.5, color: COLORS.labels, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              VOERTUIG
            </Text>
            <Text style={{
              fontSize: 13,
              fontFamily: 'Helvetica-Bold',
              color: COLORS.values,
              marginTop: mm(1.5),
              textTransform: 'uppercase',
            }}>
              {vehicleDisplay}
            </Text>

            {/* KENTEKEN */}
            <Text style={{
              fontSize: 7.5,
              color: COLORS.labels,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginTop: mm(4),
            }}>
              KENTEKEN
            </Text>
            <Text style={{
              fontSize: 13,
              fontFamily: 'Helvetica-Bold',
              color: COLORS.values,
              marginTop: mm(1.5),
            }}>
              {report.license_plate || 'nog niet ingevuld'}
            </Text>

            {/* DOCUMENTNUMMER */}
            <Text style={{
              fontSize: 7.5,
              color: COLORS.labels,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginTop: mm(4),
            }}>
              DOCUMENTNUMMER
            </Text>
            <Text style={{
              fontSize: 13,
              fontFamily: 'Helvetica-Bold',
              color: COLORS.values,
              marginTop: mm(1.5),
            }}>
              {report.document_reference || 'nog niet ingevuld'}
            </Text>
          </View>

          {/* Right: vehicle photo — 98x74mm */}
          <View style={{ width: mm(98) }}>
            {coverPhoto ? (
              <View style={{
                width: mm(98),
                height: mm(74),
                overflow: 'hidden',
                borderWidth: 0.5,
                borderColor: COLORS.lines,
              }}>
                <Image
                  src={coverPhoto}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </View>
            ) : (
              <View style={{
                width: mm(98),
                height: mm(74),
                backgroundColor: '#f5f5f5',
                borderWidth: 0.5,
                borderColor: COLORS.lines,
              }} />
            )}
          </View>
        </View>

        {/* ============================================ */}
        {/* ZONE 4 — CLIENT + INSPECTION + APPRAISER */}
        {/* ============================================ */}

        {/* --- Client --- */}
        <Text style={{ fontSize: 7.5, color: COLORS.labels, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          IN OPDRACHT VAN
        </Text>
        {companyName && (
          <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: COLORS.values, marginTop: mm(1.5) }}>
            {companyName}
          </Text>
        )}
        <Text style={{ fontSize: 10, fontFamily: companyName ? 'Helvetica' : 'Helvetica-Bold', color: COLORS.values, marginTop: mm(companyName ? 0.5 : 1.5) }}>
          {customerName || 'nog niet ingevuld'}
        </Text>
        {customerAddress && (
          <Text style={{ fontSize: 10, color: COLORS.values, marginTop: mm(0.5) }}>
            {customerAddress}
          </Text>
        )}
        {customerCity && (
          <Text style={{ fontSize: 10, color: COLORS.values, marginTop: mm(0.5) }}>
            {customerCity}
          </Text>
        )}

        {/* 2mm gap then inspection details */}
        <View style={{ marginTop: mm(2) }}>
          {/* OPNAMEDATUM */}
          <Text style={{ fontSize: 7.5, color: COLORS.labels, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            OPNAMEDATUM
          </Text>
          <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: COLORS.values, marginTop: mm(1) }}>
            {inspectionDate || 'nog niet ingevuld'}
          </Text>

          {/* TIJDSTIP OPNAME */}
          <Text style={{
            fontSize: 7.5, color: COLORS.labels, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: mm(2),
          }}>
            TIJDSTIP OPNAME
          </Text>
          <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: COLORS.values, marginTop: mm(1) }}>
            {startTime || 'nog niet ingevuld'}
          </Text>

          {/* TIJDSTIP EINDE OPNAME */}
          <Text style={{
            fontSize: 7.5, color: COLORS.labels, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: mm(2),
          }}>
            TIJDSTIP EINDE OPNAME
          </Text>
          <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: COLORS.values, marginTop: mm(1) }}>
            {endTime || 'nog niet ingevuld'}
          </Text>

          {/* LOCATIE OPNAME */}
          <Text style={{
            fontSize: 7.5, color: COLORS.labels, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: mm(2),
          }}>
            LOCATIE OPNAME
          </Text>
          <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: COLORS.values, marginTop: mm(1) }}>
            {inspectionLocation || 'nog niet ingevuld'}
          </Text>
        </View>

        {/* Spacer pushes appraiser to bottom */}
        <View style={{ flex: 1 }} />

        {/* --- Appraiser --- (22mm above footer) */}
        <View>
          <Text style={{ fontSize: 7.5, color: COLORS.labels, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            TAXATIE UITGEVOERD DOOR
          </Text>
          <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: COLORS.values, marginTop: mm(1.5) }}>
            Erik Elderson
          </Text>
          <Text style={{ fontSize: 9, color: COLORS.subtitle, marginTop: mm(2) }}>
            TMV Register Taxateur nr. 33106
          </Text>
          <Text style={{ fontSize: 9, color: COLORS.subtitle, marginTop: mm(1) }}>
            Register Taxateur VRT nr. 22-523-M
          </Text>
        </View>
      </View>

      {/* ============================================ */}
      {/* ZONE 5 — FOOTER (fixed position at bottom) */}
      {/* ============================================ */}
      <View style={{
        position: 'absolute',
        bottom: mm(8),
        left: ML,
        right: MR,
      }}>
        {/* Separator line */}
        <View style={{ borderTopWidth: 0.5, borderTopColor: COLORS.lines, marginBottom: mm(1) }} />

        {/* AT logo small */}
        <Image src={logoAutomobiel} style={{ height: mm(8), width: 'auto', marginBottom: mm(3) }} />

        {/* Company details + page number */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 5.5, color: COLORS.subtitle }}>
            Leigraaf 160, 6651 GJ Druten   |   KvK: 95549269   |   BTW: NL003366178B93   |   TMV: 33106   |   VRT: 22-523-M   |   Bank: NL80 RABO 0387 9156 80
          </Text>
          <Text style={{ fontSize: 7, color: COLORS.light }}>
            Pagina 1 van {totalPages}
          </Text>
        </View>
      </View>
    </Page>
  );
};

export default PDFCoverContent;
