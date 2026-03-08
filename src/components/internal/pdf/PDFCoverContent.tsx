import { Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';

// Kleuren
const NAVY = '#1B2A4A';
const GREY_LABEL = '#888888';
const GREY_SUB = '#555555';
const GREY_BODY = '#999999';
const LINE_COLOR = '#CCCCCC';

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    paddingTop: '10mm',
    paddingLeft: '25mm',
    paddingRight: '20mm',
    paddingBottom: '15mm',
    display: 'flex',
    flexDirection: 'column',
  },

  // --- HEADER ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  logoAt: { height: '22mm', width: 'auto' },
  keurmerken: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  keurmerkLogo: { height: '9mm', width: 'auto' },
  headerLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: LINE_COLOR,
    marginTop: '6mm',
    marginBottom: 0,
  },

  // --- TITELSECTIE ---
  titleSection: { marginTop: '13mm' },
  mainTitle: { fontSize: 26, fontFamily: 'Helvetica-Bold', color: NAVY, marginBottom: 4 },
  subtitle: { fontSize: 10, color: GREY_SUB, marginBottom: 3 },
  bodyText: { fontSize: 7.5, color: GREY_BODY },

  // --- VOERTUIG + FOTO ROW ---
  vehicleRow: {
    flexDirection: 'row',
    marginTop: '14mm',
    alignItems: 'flex-start',
  },
  leftCol: { flex: 1 },
  photoContainer: {
    width: '98mm',
    height: '74mm',
    borderWidth: 0.4,
    borderColor: '#CCCCCC',
    overflow: 'hidden',
  },
  photo: { width: '100%', height: '100%', objectFit: 'cover' as const },

  // --- DATA BLOKKEN ---
  dataBlock: { marginBottom: '9.5mm' },
  dataLabel: {
    fontSize: 6.5,
    color: GREY_LABEL,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase' as const,
    letterSpacing: 0.5,
    marginBottom: 1.5,
  },
  dataValue: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: NAVY },
  dataValueNormal: { fontSize: 9, color: '#333333' },

  // --- TAXATEUR ---
  taxateurSection: { marginTop: 'auto', paddingTop: '8mm' },

  // --- FOOTER ---
  footer: {
    marginTop: 'auto',
  },
  footerLine: {
    borderTopWidth: 0.4,
    borderTopColor: LINE_COLOR,
    marginBottom: '2mm',
  },
  footerRow: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: '1mm',
  },
  footerLogoAt: { height: '6mm', width: 'auto' },
  footerPageNum: { fontSize: 7, color: GREY_LABEL },
  footerAddress: { fontSize: 5.5, color: GREY_LABEL, textAlign: 'center' as const },
});

// Tekstvarianten per rapporttype
const getTitelConfig = (rapporttype: string) => {
  if (rapporttype === 'WEV' || rapporttype === 'wev') {
    return {
      subtitel: 'Ter bepaling van de Waarde in het Economisch Verkeer',
      beschrijving: 'Dit taxatierapport is opgesteld ter bepaling van de waarde in het economisch verkeer van het voertuig.',
    };
  }
  // KLS, kls, klassieker, CAM, cam, camper — allemaal artikel 7:960 BW
  return {
    subtitel: 'Volgens artikel 7:960 BW',
    beschrijving: 'Dit taxatierapport is opgesteld ten behoeve van de vaststelling van de vervangingswaarde van het voertuig.',
  };
};

// Logo's uit public/logos/
const LOGO_AT = '/logos/logo_at.png';
const LOGO_VRT = '/logos/logo_vrt.png';
const LOGO_HOBEON = '/logos/logo_hobeon.png';
const LOGO_TMV = '/logos/logo_tmv.png';
const LOGO_FEHAC = '/logos/logo_fehac.png';

interface PDFCoverContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: Record<string, any>;
  totalPages?: number;
}

const PDFCoverContent = ({ report, totalPages = 1 }: PDFCoverContentProps) => {
  const rapporttype = report.report_type || 'KLS';
  const { subtitel, beschrijving } = getTitelConfig(rapporttype);

  const vehicleName = [
    report.rdw_merk || report.vehicle_brand,
    report.rdw_handelsbenaming || report.vehicle_model,
  ].filter(Boolean).join(' ').toUpperCase() || '-';

  const customerLine1 = [
    report.customer_title,
    report.customer_initials,
    report.customer_last_name,
  ].filter(Boolean).join(' ') || '-';

  const customerLine2 = report.customer_street || '';
  const customerLine3 = [report.customer_postcode, report.customer_city].filter(Boolean).join(' ');

  const opnamedatum = report.inspection_date
    ? new Date(report.inspection_date).toLocaleDateString('nl-NL', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : '-';

  const tijdstipOpname = report.inspection_start_time
    ? report.inspection_start_time.slice(0, 5) + ' uur'
    : '-';
  const tijdstipEinde = report.inspection_end_time
    ? report.inspection_end_time.slice(0, 5) + ' uur'
    : '-';

  const hoofdfoto = report.vehicle_photos?.[0] || null;

  return (
    <Page size="A4" style={styles.page}>

      {/* HEADER */}
      <View style={styles.header}>
        <Image src={LOGO_AT} style={styles.logoAt} />
        <View style={styles.keurmerken}>
          <Image src={LOGO_VRT} style={styles.keurmerkLogo} />
          <Image src={LOGO_HOBEON} style={styles.keurmerkLogo} />
          <Image src={LOGO_TMV} style={styles.keurmerkLogo} />
          <Image src={LOGO_FEHAC} style={styles.keurmerkLogo} />
        </View>
      </View>
      <View style={styles.headerLine} />

      {/* TITELSECTIE */}
      <View style={styles.titleSection}>
        <Text style={styles.mainTitle}>TAXATIERAPPORT</Text>
        <Text style={styles.subtitle}>{subtitel}</Text>
        <Text style={styles.bodyText}>{beschrijving}</Text>
      </View>

      {/* VOERTUIG + FOTO */}
      <View style={styles.vehicleRow}>
        <View style={styles.leftCol}>
          <View style={styles.dataBlock}>
            <Text style={styles.dataLabel}>Voertuig</Text>
            <Text style={styles.dataValue}>{vehicleName}</Text>
          </View>
          <View style={styles.dataBlock}>
            <Text style={styles.dataLabel}>Kenteken</Text>
            <Text style={styles.dataValue}>{report.license_plate || '-'}</Text>
          </View>
          <View style={styles.dataBlock}>
            <Text style={styles.dataLabel}>Documentnummer</Text>
            <Text style={styles.dataValue}>{report.document_reference || report.report_number}</Text>
          </View>
        </View>
        {hoofdfoto && (
          <View style={styles.photoContainer}>
            <Image src={hoofdfoto} style={styles.photo} />
          </View>
        )}
      </View>

      {/* IN OPDRACHT VAN */}
      <View style={styles.dataBlock}>
        <Text style={styles.dataLabel}>In opdracht van</Text>
        {report.opdrachtgever && (
          <Text style={styles.dataValue}>{report.opdrachtgever}</Text>
        )}
        <Text style={report.opdrachtgever ? styles.dataValueNormal : styles.dataValue}>
          {customerLine1}
        </Text>
        {customerLine2 ? <Text style={styles.dataValueNormal}>{customerLine2}</Text> : null}
        {customerLine3 ? <Text style={styles.dataValueNormal}>{customerLine3}</Text> : null}
      </View>

      {/* INSPECTIEGEGEVENS */}
      <View style={styles.dataBlock}>
        <Text style={styles.dataLabel}>Opnamedatum</Text>
        <Text style={styles.dataValue}>{opnamedatum}</Text>
      </View>
      <View style={styles.dataBlock}>
        <Text style={styles.dataLabel}>Tijdstip opname</Text>
        <Text style={styles.dataValue}>{tijdstipOpname}</Text>
      </View>
      <View style={styles.dataBlock}>
        <Text style={styles.dataLabel}>Tijdstip einde opname</Text>
        <Text style={styles.dataValue}>{tijdstipEinde}</Text>
      </View>
      <View style={styles.dataBlock}>
        <Text style={styles.dataLabel}>Locatie opname</Text>
        <Text style={styles.dataValue}>{report.inspection_location || '-'}</Text>
      </View>

      {/* TAXATEUR */}
      <View style={styles.taxateurSection}>
        <View style={styles.dataBlock}>
          <Text style={styles.dataLabel}>Taxatie uitgevoerd door</Text>
          <Text style={styles.dataValue}>Erik Elderson</Text>
          <Text style={styles.dataValueNormal}>TMV Register Taxateur nr. 33106</Text>
          <Text style={styles.dataValueNormal}>Register Taxateur VRT nr. 22-523-M</Text>
        </View>
      </View>

      {/* FOOTER */}
      <View style={styles.footer}>
        <View style={styles.footerLine} />
        <View style={styles.footerRow}>
          <Image src={LOGO_AT} style={styles.footerLogoAt} />
          <Text style={styles.footerPageNum}>Pagina 1 van {totalPages}</Text>
        </View>
        <Text style={styles.footerAddress}>
          Leigraaf 160, 6651 GJ Druten | KvK: 95549269 | BTW: NL003366178B93 | TMV: 33106 | VRT: 22-523-M | Bank: NL80 RABO 0387 9156 80
        </Text>
      </View>

    </Page>
  );
};

export default PDFCoverContent;
