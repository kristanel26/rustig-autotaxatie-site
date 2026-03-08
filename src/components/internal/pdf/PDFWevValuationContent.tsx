import { Page, View, Text, Image } from '@react-pdf/renderer';
import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';

const signatureErik = '/signature-erik-elderson.png';
import { numberToDutchWords } from '@/lib/normalizers';

interface PDFWevValuationContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: any;
  pageNumber: number;
  totalPages: number;
}

const TAXATEUR_NAAM = 'Erik Elderson';
const TAXATEUR_REGISTRATIE = 'TMV 33106 en VRT 22-523-M';
const KVK_NUMMER = '95549269';
const VESTIGINGSADRES = 'Leigraaf 160, 6651 GJ te Druten';
const VESTIGINGSPLAATS = 'Druten';

const PDFWevValuationContent = ({ report, pageNumber, totalPages }: PDFWevValuationContentProps) => {
  const formatCurrency = (value: number | null) => {
    if (value === null || value === undefined || value <= 0) return null;
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDateLong = (dateString: string | null) => {
    if (!dateString) {
      return new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    return new Date(dateString).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const eindwaarde = report.wev_eindwaarde || report.wev_definitief;
  const hasValue = eindwaarde && eindwaarde > 0;
  const eindwaardeFormatted = hasValue ? formatCurrency(eindwaarde) : '€ ___________';
  const eindwaardeTekst = hasValue ? numberToDutchWords(eindwaarde) : '___________';
  const datumOpname = formatDateLong(report.inspection_date);
  const plaatsOpname = report.inspection_location || VESTIGINGSPLAATS;
  const datumRapportGereed = formatDateLong(report.wev_finalized_at || new Date().toISOString());

  return (
    <Page size="A4" style={{ padding: '24 28', fontFamily: 'Helvetica', position: 'relative' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <View />
        <Image src={logoAutomobiel} style={{ height: 36, width: 'auto' }} />
      </View>
      <Text style={{ fontSize: 8, color: '#888888', marginBottom: 4 }}>
        Automobiel taxatie{report.document_reference ? ` · Documentkenmerk: ${report.document_reference}` : ''}
      </Text>
      <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#cccccc', marginBottom: 14 }} />
      <Text style={{ fontSize: 18, fontFamily: 'Helvetica-Bold', color: '#000000', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 16 }}>
        WAARDEBEPALING WEV
      </Text>

      {/* Taxateur declaration */}
      <View style={{ marginBottom: 14 }}>
        <Text style={{ fontSize: 10, color: '#000000', lineHeight: 1.6, marginBottom: 6 }}>Ondergetekende,</Text>
        <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#000000', lineHeight: 1.6, marginBottom: 3 }}>{TAXATEUR_NAAM}</Text>
        <Text style={{ fontSize: 10, color: '#000000', lineHeight: 1.6, marginBottom: 6 }}>Register Taxateur</Text>
        <Text style={{ fontSize: 10, color: '#000000', lineHeight: 1.6, textAlign: 'justify' }}>
          Gecertificeerd door Stichting Hobéon SKO Certificatie, conform de Regeling SRZ, onder nummers {TAXATEUR_REGISTRATIE}. Ingeschreven als registertaxateur motorvoertuigen, gevestigd aan {VESTIGINGSADRES}, en ingeschreven in het handelsregister van de Kamer van Koophandel onder nummer {KVK_NUMMER}.
        </Text>
      </View>

      {/* In aanmerking nemende */}
      <View style={{ marginBottom: 14 }}>
        <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#000000', lineHeight: 1.6, marginBottom: 6 }}>
          In aanmerking nemende:
        </Text>
        <Text style={{ fontSize: 10, color: '#000000', lineHeight: 1.6, textAlign: 'justify' }}>
          Dat ondergetekende van de opdrachtgever opdracht heeft ontvangen om het bovenvermelde motorvoertuig op te nemen en te waarderen naar Waarde in het Economisch Verkeer en dat hij aan dit voertuig de navolgende waarde toekent.
        </Text>
      </View>

      {/* Waarde block */}
      <View style={{ marginBottom: 14, padding: '10 14', backgroundColor: '#f8f9fa', borderLeftWidth: 3, borderLeftColor: '#000000' }}>
        <Text style={{ fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#000000', marginBottom: 3 }}>
          Waarde in het Economisch Verkeer: {eindwaardeFormatted}
        </Text>
        <Text style={{ fontSize: 10, color: '#000000', fontStyle: 'italic' }}>
          Zegge: {eindwaardeTekst}
        </Text>
      </View>

      {/* Signing */}
      <Text style={{ fontSize: 10, color: '#000000', lineHeight: 1.6, marginBottom: 12 }}>
        Aldus gedaan naar beste kennis en wetenschap en getekend te {VESTIGINGSPLAATS}, op {datumRapportGereed}.
      </Text>

      {/* Legal terms */}
      <View style={{ marginBottom: 12 }}>
        <Text style={{ fontSize: 8.5, color: '#000000', lineHeight: 1.6, marginBottom: 5, textAlign: 'justify' }}>
          Op deze taxatie zijn van toepassing de algemene voorwaarden voor Register Makelaars en Register Taxateurs in roerende zaken, leden van de Federatie van Taxateurs, Makelaars en Veilinghouders in roerende zaken. Deze voorwaarden zijn gedeponeerd bij de Kamer van Koophandel en Fabrieken voor Amsterdam op 30 juni 2005 onder nummer 40530226.
        </Text>
        <Text style={{ fontSize: 8.5, color: '#000000', lineHeight: 1.6, marginBottom: 5, textAlign: 'justify' }}>
          Deze taxatie en de bijbehorende rapportage vormen nadrukkelijk geen technische keuring en kunnen nooit als zodanig worden geïnterpreteerd.
        </Text>
        <Text style={{ fontSize: 8.5, color: '#000000', lineHeight: 1.6, marginBottom: 5, textAlign: 'justify' }}>
          Dit rapport dient uitsluitend ter bepaling van de Waarde in het Economisch Verkeer.
        </Text>
        <Text style={{ fontSize: 8.5, color: '#000000', lineHeight: 1.6, marginBottom: 5, textAlign: 'justify' }}>
          De taxateur heeft het voertuig op {datumOpname}, zijnde de waardepeildatum, opgenomen en getaxeerd na onderzoek te {plaatsOpname}.
        </Text>
        <Text style={{ fontSize: 8.5, color: '#000000', lineHeight: 1.6, marginBottom: 5, textAlign: 'justify' }}>
          Deze taxatie houdt geen enkele garantie in met betrekking tot het realiseren van de vastgestelde waarde bij inruil of verkoop.
        </Text>
        <Text style={{ fontSize: 8.5, color: '#000000', lineHeight: 1.6, textAlign: 'justify' }}>
          Onder Waarde in het Economisch Verkeer wordt verstaan het bedrag dat, bij aanbieding ten verkoop op de voor de zaak meest geschikte wijze en na de beste voorbereiding, door de meest biedende gegadigde zou zijn besteed dan wel door de verkoper zou zijn ontvangen.
        </Text>
      </View>

      {/* Signature block */}
      <View>
        <Text style={{ fontSize: 10, color: '#000000', marginBottom: 6 }}>Hoogachtend,</Text>
        <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#000000', marginBottom: 2 }}>Automobiel Taxaties</Text>
        <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#000000' }}>{TAXATEUR_NAAM}</Text>
        <Image src={signatureErik} style={{ width: 156, height: 'auto', marginTop: -6 }} />
      </View>

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
        <Text style={{ fontSize: 9, color: '#000000' }}>Pagina {pageNumber} van {totalPages}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={{ fontSize: 8, color: '#000000' }}>Paraaf</Text>
          <Image src={signatureErik} style={{ width: 57, height: 'auto' }} />
        </View>
      </View>
    </Page>
  );
};

export default PDFWevValuationContent;
