import { Page, View, Text, Image } from '@react-pdf/renderer';
import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';
import signatureErik from '@/assets/signature-erik-elderson.png';
import paraafErik from '@/assets/paraaf-erik-elderson.png';

interface PDFKlassiekerValuationContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: any;
  pageNumber: number;
  totalPages: number;
}

// LOCKED TEXT - DO NOT MODIFY
const LEGAL_TEXT_BLOCK_1 = `Dit rapport dient uitsluitend ter bepaling van de waarde voor verzekeringsdoeleinden van het visueel getaxeerde motorvoertuig. De geldigheidsduur van deze taxatie is afhankelijk van uw polisvoorwaarden. Het rapport is beslist géén technische keuring en kan daarom nooit als zodanig worden geïnterpreteerd. Het rapport is niet overdraagbaar en is toepasbaar bij polisvoorwaarden volgens artikel 7:960 B.W. De door ons verrichte taxatie houdt geen enkele garantie in tot het realiseren van de vastgestelde waarde bij inruil of verkoop. Onder vervangingswaarde wordt verstaan het bedrag dat nodig is voor het verkrijgen van naar soort, kwaliteit, staat en ouderdom vergelijkbare zaak. Dat op deze taxatie van toepassing zijn de algemene voorwaarden voor Register Makelaars en Register Taxateurs in roerende zaken, leden van de Federatie van Taxateurs, Makelaars en Veilinghouders in roerende zaken, welke voorwaarden zijn gedeponeerd bij de Kamer van Koophandel en Fabrieken voor Amsterdam op 30-06-2005 onder nummer 40530226.`;

const VALUE_INTRO = `Uitgaande van de marktsituatie op het moment van de taxatie stelden wij de vervangingswaarde van het hier omschreven voertuig, inclusief accessoires, op`;

const EXPERT_DECLARATION = `Ondergetekende, Erik Elderson, Register Taxateur voor motorvoertuigen te Druten, als zodanig erkend en opgenomen in het Register van Makelaars en Taxateurs TMV onder nummer 33106, Register-Taxateur VRT onder nummer 22-523-M, verklaart te zijn benoemd als deskundige.`;

const PDFKlassiekerValuationContent = ({ report, pageNumber, totalPages }: PDFKlassiekerValuationContentProps) => {
  const formatCurrency = (value: number | null) => {
    if (value === null || value === undefined || value <= 0) return null;
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDateLong = (dateString: string | null) => {
    if (!dateString) {
      return new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    return new Date(dateString).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const hasValue = report.appraised_value && report.appraised_value > 0;
  const formattedValue = hasValue ? formatCurrency(report.appraised_value) : '€ ___________';
  const valueInWords = hasValue ? (report.appraised_value_text || '') : '___________';

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
        WAARDEVASTSTELLING
      </Text>

      {/* Legal Text */}
      <Text style={{ fontSize: 10, color: '#000000', lineHeight: 1.6, textAlign: 'justify', marginBottom: 16 }}>
        {LEGAL_TEXT_BLOCK_1}
      </Text>

      {/* Value Introduction */}
      <Text style={{ fontSize: 10, color: '#000000', lineHeight: 1.6, marginBottom: 16 }}>
        {VALUE_INTRO}
      </Text>

      {/* Value Block */}
      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontSize: 13, fontFamily: 'Helvetica-Bold', color: '#000000', marginBottom: 4 }}>
          {formattedValue} (inclusief BTW)
        </Text>
        {valueInWords ? (
          <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#000000' }}>
            zegge: {valueInWords} 00/Euro
          </Text>
        ) : null}
      </View>

      {/* Expert Declaration */}
      <Text style={{ fontSize: 10, color: '#000000', lineHeight: 1.6, textAlign: 'justify', marginBottom: 16 }}>
        {EXPERT_DECLARATION}
      </Text>

      {/* Closing */}
      <Text style={{ fontSize: 10, color: '#000000', lineHeight: 1.6, marginBottom: 20 }}>
        Aldus, naar beste weten en kunnen opgemaakt te Druten, {formatDateLong(null)}.
      </Text>

      <View>
        <Text style={{ fontSize: 10, color: '#000000', marginBottom: 6 }}>Hoogachtend,</Text>
        <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#000000', marginBottom: 2 }}>Automobiel Taxaties</Text>
        <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#000000' }}>Erik Elderson</Text>
        {/* Signature - directly under name */}
        <Image src={signatureErik} style={{ width: 212, height: 'auto', marginTop: -8 }} />
      </View>

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

export default PDFKlassiekerValuationContent;
