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

const mm = (v: number) => v * 2.8346;

const C = {
  navy: '#1B2A4A',
  black: '#000000',
  darkGrey: '#555555',
  midGrey: '#666666',
  lightGrey: '#999999',
  lines: '#CCCCCC',
};

const ML = mm(25);
const MR = mm(20);

const getTitleConfig = (reportType: string | null) => {
  if (reportType?.toLowerCase() === 'wev') {
    return {
      subtitle: 'Ter bepaling van de Waarde in het Economisch Verkeer',
      description: 'Dit taxatierapport is opgesteld ten behoeve van de vaststelling van de waarde in het economisch verkeer van het voertuig.',
    };
  }
  return {
    subtitle: 'Volgens artikel 7:960 BW',
    description: 'Dit taxatierapport is opgesteld ten behoeve van de vaststelling van de vervangingswaarde van het voertuig.',
  };
};

const labelStyle = {
  fontSize: 7.5,
  fontFamily: 'Helvetica' as const,
  color: C.darkGrey,
  textTransform: 'uppercase' as const,
};

const detailLabelStyle = {
  fontSize: 7.5,
  fontFamily: 'Helvetica' as const,
  color: C.darkGrey,
  textTransform: 'uppercase' as const,
};

const detailValueStyle = {
  fontSize: 10,
  fontFamily: 'Helvetica-Bold' as const,
  color: C.black,
  marginTop: mm(1.2),
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

  return (
    <Page size="A4" style={{
      fontFamily: 'Helvetica',
      fontSize: 10,
      color: C.black,
      lineHeight: 1.4,
      paddingTop: mm(12),
      paddingLeft: ML,
      paddingRight: MR,
      paddingBottom: mm(30),
    }}>

      {/* === ZONE 1: HEADER === */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Image src={logoAutomobiel} style={{ height: mm(22), maxWidth: mm(70) }} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: mm(3) }}>
          <Image src={logoVrt} style={{ height: mm(9), maxWidth: mm(20) }} />
          <Image src={logoHobeon} style={{ height: mm(9), maxWidth: mm(20) }} />
          <Image src={logoTmv} style={{ height: mm(9), maxWidth: mm(20) }} />
          <Image src={logoFehac} style={{ height: mm(9), maxWidth: mm(20) }} />
        </View>
      </View>

      {/* 28mm gap */}
      <View style={{ height: mm(28) }} />

      {/* === ZONE 2: TITEL === */}
      <View>
        <Text style={{
          fontSize: 26,
          fontFamily: 'Helvetica-Bold',
          color: C.navy,
          textTransform: 'uppercase',
        }}>
          Taxatierapport
        </Text>
        <Text style={{ fontSize: 10, color: C.midGrey, marginTop: mm(2.5) }}>
          {subtitle}
        </Text>
        <Text style={{ fontSize: 7.5, color: C.lightGrey, marginTop: mm(1.5) }}>
          {description}
        </Text>
        <View style={{ borderTopWidth: 0.2, borderTopColor: C.lines, marginTop: mm(3) }} />
      </View>

      {/* 24mm gap */}
      <View style={{ height: mm(24) }} />

      {/* === ZONE 3: VOERTUIG + FOTO === */}
      <View style={{ flexDirection: 'row' }}>
        {/* Left column: vehicle data */}
        <View style={{ width: mm(65), paddingRight: mm(4) }}>
          <Text style={labelStyle}>VOERTUIG</Text>
          <Text style={{
            fontSize: 13,
            fontFamily: 'Helvetica-Bold',
            color: C.black,
            marginTop: mm(1.5),
          }}>{vehicleDisplay}</Text>

          <Text style={{ ...labelStyle, marginTop: mm(6) }}>KENTEKEN</Text>
          <Text style={{
            fontSize: 13,
            fontFamily: 'Helvetica-Bold',
            color: C.black,
            marginTop: mm(1.5),
          }}>{report.license_plate || 'nog niet ingevuld'}</Text>

          <Text style={{ ...labelStyle, marginTop: mm(6) }}>DOCUMENTNUMMER</Text>
          <Text style={{
            fontSize: 13,
            fontFamily: 'Helvetica-Bold',
            color: C.black,
            marginTop: mm(1.5),
          }}>{report.document_reference || report.report_number || 'nog niet ingevuld'}</Text>
        </View>

        {/* Right column: photo 98x74mm */}
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          {coverPhoto ? (
            <View style={{
              width: mm(98),
              height: mm(74),
              overflow: 'hidden',
              borderWidth: 0.2,
              borderColor: C.lines,
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
              borderWidth: 0.2,
              borderColor: C.lines,
            }} />
          )}
        </View>
      </View>

      {/* 18mm gap */}
      <View style={{ height: mm(18) }} />

      {/* === ZONE 4: OPDRACHTGEVER + OPNAME === */}
      <View>
        <Text style={detailLabelStyle}>IN OPDRACHT VAN</Text>
        {companyName && (
          <Text style={detailValueStyle}>{companyName}</Text>
        )}
        <Text style={{
          fontSize: 10,
          fontFamily: companyName ? 'Helvetica' as const : 'Helvetica-Bold' as const,
          color: C.black,
          marginTop: mm(companyName ? 0.5 : 1.2),
        }}>
          {customerName}
        </Text>
        {customerAddress && <Text style={{ fontSize: 10, color: C.black, marginTop: mm(0.5) }}>{customerAddress}</Text>}
        {customerCity && <Text style={{ fontSize: 10, color: C.black, marginTop: mm(0.5) }}>{customerCity}</Text>}

        <Text style={{ ...detailLabelStyle, marginTop: mm(4) }}>OPNAMEDATUM</Text>
        <Text style={detailValueStyle}>{formatDate(report.inspection_date)}</Text>

        <Text style={{ ...detailLabelStyle, marginTop: mm(2) }}>TIJDSTIP OPNAME</Text>
        <Text style={detailValueStyle}>{formatTime(report.inspection_start_time)}</Text>

        <Text style={{ ...detailLabelStyle, marginTop: mm(2) }}>TIJDSTIP EINDE OPNAME</Text>
        <Text style={detailValueStyle}>{formatTime(report.inspection_end_time)}</Text>

        <Text style={{ ...detailLabelStyle, marginTop: mm(2) }}>LOCATIE OPNAME</Text>
        <Text style={detailValueStyle}>{capitalizeFirst(report.inspection_location)}</Text>
      </View>

      {/* Spacer pushes taxateur to bottom */}
      <View style={{ flex: 1 }} />

      {/* === TAXATEUR === */}
      <View>
        <Text style={detailLabelStyle}>TAXATIE UITGEVOERD DOOR</Text>
        <Text style={{
          fontSize: 11,
          fontFamily: 'Helvetica-Bold',
          color: C.black,
          marginTop: mm(1.5),
        }}>
          Erik Elderson
        </Text>
        <Text style={{ fontSize: 9, color: C.midGrey, marginTop: mm(2) }}>
          TMV Register Taxateur nr. 33106
        </Text>
        <Text style={{ fontSize: 9, color: C.midGrey, marginTop: mm(1) }}>
          Register Taxateur VRT nr. 22-523-M
        </Text>
      </View>

      {/* === ZONE 5: FOOTER (fixed at bottom) === */}
      <View style={{
        position: 'absolute',
        bottom: mm(8),
        left: ML,
        right: MR,
      }}>
        <View style={{ borderTopWidth: 0.2, borderTopColor: C.lines, marginBottom: mm(1) }} />
        <Image src={logoAutomobiel} style={{ height: mm(8), maxWidth: mm(50), marginBottom: mm(3) }} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 5.5, color: C.midGrey }}>
            Leigraaf 160, 6651 GJ Druten   |   KvK: 95549269   |   BTW: NL003366178B93   |   TMV: 33106   |   VRT: 22-523-M   |   Bank: NL80 RABO 0387 9156 80
          </Text>
          <Text style={{ fontSize: 7, color: C.lightGrey }}>
            Pagina 1 van {totalPages}
          </Text>
        </View>
      </View>
    </Page>
  );
};

export default PDFCoverContent;
