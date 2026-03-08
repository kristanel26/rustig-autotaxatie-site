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

// 1mm = 2.8346pt
const mm = (v: number) => v * 2.8346;

const C = {
  text: '#1a1a1a',
  labels: '#888888',
  lines: '#e0e0e0',
  accent: '#1a3a6b',
  subtitle: '#444444',
  description: '#666666',
};

const getTitleConfig = (reportType: string | null) => {
  if (reportType?.toLowerCase() === 'wev') {
    return {
      subtitle: 'Ter bepaling van de Waarde in het Economisch Verkeer',
      description: 'Dit taxatierapport is opgesteld ter bepaling van de waarde in het economisch verkeer van het voertuig.',
    };
  }
  return {
    subtitle: 'Volgens artikel 7:960 BW',
    description: 'Dit taxatierapport is opgesteld ten behoeve van de vaststelling van de vervangingswaarde van het voertuig.',
  };
};

const PDFCoverContent = ({ report, totalPages = 1 }: PDFCoverContentProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'nog niet ingevuld';
    return new Date(dateString).toLocaleDateString('nl-NL', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  };

  const formatTime = (timeString: string | null) => {
    if (!timeString) return 'nog niet ingevuld';
    return timeString.slice(0, 5) + ' uur';
  };

  const capitalizeFirst = (str: string | null) => {
    if (!str) return 'nog niet ingevuld';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const { subtitle, description } = getTitleConfig(report.report_type);

  const companyName = report.opdrachtgever || null;
  const customerName = [report.customer_title, report.customer_initials, report.customer_last_name]
    .filter(Boolean).join(' ') || 'nog niet ingevuld';
  const customerAddress = report.customer_street || null;
  const customerCity = [report.customer_postcode, report.customer_city].filter(Boolean).join(' ') || null;
  const vehicleDisplay = (report.vehicle_title ||
    [report.rdw_merk, report.rdw_handelsbenaming].filter(Boolean).join(' ') || 'nog niet ingevuld').toUpperCase();
  const coverPhoto = report.vehicle_photos && report.vehicle_photos.length > 0 ? report.vehicle_photos[0] : null;

  // Layout: A4 with 20mm margins all around
  const M = mm(20);

  // Label style
  const labelStyle = {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold' as const,
    letterSpacing: 0.6,
    color: C.labels,
    textTransform: 'uppercase' as const,
  };

  // Value style
  const valueStyle = {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold' as const,
    color: C.text,
    marginTop: mm(1),
  };

  // Address style
  const addressStyle = {
    fontSize: 10,
    color: C.text,
    marginTop: mm(0.5),
  };

  return (
    <Page size="A4" style={{
      fontFamily: 'Helvetica',
      fontSize: 10,
      color: C.text,
      lineHeight: 1.4,
      position: 'relative',
    }}>
      {/* Main content area */}
      <View style={{
        position: 'absolute',
        top: M,
        left: M,
        right: M,
        bottom: mm(28), // clearance for footer
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* === 1. HEADER === */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: mm(4),
          borderBottomWidth: 0.5,
          borderBottomColor: C.lines,
          marginBottom: mm(6),
        }}>
          <Image src={logoAutomobiel} style={{ height: mm(18), width: 'auto' }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: mm(3) }}>
            <Image src={logoVrt} style={{ height: mm(9), width: 'auto' }} />
            <Image src={logoHobeon} style={{ height: mm(9), width: 'auto' }} />
            <Image src={logoTmv} style={{ height: mm(9), width: 'auto' }} />
            <Image src={logoFehac} style={{ height: mm(9), width: 'auto' }} />
          </View>
        </View>

        {/* === 2. TITLE SECTION === */}
        <View style={{ marginBottom: mm(8) }}>
          <Text style={{
            fontSize: 28,
            fontFamily: 'Helvetica-Bold',
            color: C.text,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          }}>
            Taxatierapport
          </Text>
          <Text style={{ fontSize: 10, color: C.subtitle, marginTop: mm(2) }}>
            {subtitle}
          </Text>
          <Text style={{ fontSize: 9, color: C.description, marginTop: mm(1.5), fontStyle: 'italic' }}>
            {description}
          </Text>
        </View>

        {/* === 3. VEHICLE + PHOTO (two columns) === */}
        <View style={{ flexDirection: 'row', marginBottom: mm(6) }}>
          {/* Left column: vehicle data (40%) */}
          <View style={{ width: '40%', paddingRight: mm(4) }}>
            {/* VOERTUIG */}
            <Text style={labelStyle}>VOERTUIG</Text>
            <Text style={{ ...valueStyle, fontSize: 13 }}>{vehicleDisplay}</Text>

            {/* KENTEKEN */}
            <Text style={{ ...labelStyle, marginTop: mm(5) }}>KENTEKEN</Text>
            <Text style={valueStyle}>{report.license_plate || 'nog niet ingevuld'}</Text>

            {/* DOCUMENTNUMMER */}
            <Text style={{ ...labelStyle, marginTop: mm(5) }}>DOCUMENTNUMMER</Text>
            <Text style={valueStyle}>{report.document_reference || report.report_number || 'nog niet ingevuld'}</Text>
          </View>

          {/* Right column: photo (60%) */}
          <View style={{ width: '60%' }}>
            {coverPhoto ? (
              <View style={{
                width: '100%',
                height: mm(60),
                overflow: 'hidden',
                borderRadius: 4,
                borderWidth: 0.5,
                borderColor: C.lines,
              }}>
                <Image
                  src={coverPhoto}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </View>
            ) : (
              <View style={{
                width: '100%',
                height: mm(60),
                backgroundColor: '#f5f5f5',
                borderRadius: 4,
                borderWidth: 0.5,
                borderColor: C.lines,
              }} />
            )}
          </View>
        </View>

        {/* === 4. CLIENT + INSPECTION === */}
        <View style={{ marginBottom: mm(4) }}>
          {/* IN OPDRACHT VAN */}
          <Text style={labelStyle}>IN OPDRACHT VAN</Text>
          {companyName && (
            <Text style={{ ...valueStyle, marginTop: mm(1) }}>{companyName}</Text>
          )}
          <Text style={{
            ...valueStyle,
            fontFamily: companyName ? 'Helvetica' : 'Helvetica-Bold',
            marginTop: mm(companyName ? 0.5 : 1),
          }}>
            {customerName}
          </Text>
          {customerAddress && <Text style={addressStyle}>{customerAddress}</Text>}
          {customerCity && <Text style={addressStyle}>{customerCity}</Text>}
        </View>

        {/* Inspection details */}
        <View style={{ marginBottom: mm(2) }}>
          <Text style={{ ...labelStyle, marginTop: mm(3) }}>OPNAMEDATUM</Text>
          <Text style={valueStyle}>{formatDate(report.inspection_date)}</Text>

          <Text style={{ ...labelStyle, marginTop: mm(3) }}>TIJDSTIP OPNAME</Text>
          <Text style={valueStyle}>{formatTime(report.inspection_start_time)}</Text>

          <Text style={{ ...labelStyle, marginTop: mm(3) }}>TIJDSTIP EINDE OPNAME</Text>
          <Text style={valueStyle}>{formatTime(report.inspection_end_time)}</Text>

          <Text style={{ ...labelStyle, marginTop: mm(3) }}>LOCATIE OPNAME</Text>
          <Text style={valueStyle}>{capitalizeFirst(report.inspection_location)}</Text>
        </View>

        {/* Spacer pushes appraiser to bottom */}
        <View style={{ flex: 1 }} />

        {/* === 5. APPRAISER SECTION === */}
        <View>
          <Text style={labelStyle}>TAXATIE UITGEVOERD DOOR</Text>
          <Text style={{ fontSize: 12, fontFamily: 'Helvetica-Bold', color: C.text, marginTop: mm(1.5) }}>
            Erik Elderson
          </Text>
          <Text style={{ fontSize: 9, color: C.subtitle, marginTop: mm(2) }}>
            TMV Register Taxateur nr. 33106
          </Text>
          <Text style={{ fontSize: 9, color: C.subtitle, marginTop: mm(1) }}>
            Register Taxateur VRT nr. 22-523-M
          </Text>
        </View>
      </View>

      {/* === 6. FOOTER (fixed at bottom) === */}
      <View style={{
        position: 'absolute',
        bottom: mm(8),
        left: M,
        right: M,
      }}>
        {/* Separator */}
        <View style={{ borderTopWidth: 0.5, borderTopColor: C.lines, marginBottom: mm(2) }} />

        {/* AT logo small */}
        <Image src={logoAutomobiel} style={{ height: mm(7), width: 'auto', marginBottom: mm(2) }} />

        {/* Company details + page number */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 5.5, color: C.labels }}>
            Leigraaf 160, 6651 GJ Druten   |   KvK: 95549269   |   BTW: NL003366178B93   |   TMV: 33106   |   VRT: 22-523-M   |   Bank: NL80 RABO 0387 9156 80
          </Text>
          <Text style={{ fontSize: 7, color: C.labels }}>
            Pagina 1 van {totalPages}
          </Text>
        </View>
      </View>
    </Page>
  );
};

export default PDFCoverContent;
