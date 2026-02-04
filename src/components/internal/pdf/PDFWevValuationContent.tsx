import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';
import signatureErik from '@/assets/signature-erik-elderson.svg';
import { numberToDutchWords } from '@/lib/normalizers';

interface PDFWevValuationContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: any;
  pageNumber: number;
  totalPages: number;
}

// Fixed legal constants for WEV reports - DO NOT modify
const TAXATEUR_NAAM = 'Erik Elderson';
const TAXATEUR_REGISTRATIE = 'TMV 33106 en VRT 22-523-M';
const KVK_NUMMER = '94aborgen623';
const VESTIGINGSADRES = 'Maasdijk 25, 6651 KM te Druten';
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
      return new Date().toLocaleDateString('nl-NL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }
    return new Date(dateString).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Don't render if no WEV data - use wev_eindwaarde as primary, wev_definitief as fallback
  const eindwaarde = report.wev_eindwaarde || report.wev_definitief;
  if (!eindwaarde || eindwaarde <= 0) {
    return null;
  }

  const eindwaardeFormatted = formatCurrency(eindwaarde);
  const eindwaardeTekst = numberToDutchWords(eindwaarde);
  const datumOpname = formatDateLong(report.inspection_date);
  const plaatsOpname = report.inspection_location || VESTIGINGSPLAATS;
  const datumRapportGereed = formatDateLong(report.wev_finalized_at || new Date().toISOString());

  return (
    <div 
      className="bg-white font-sans pdf-page"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '24px 28px',
        boxSizing: 'border-box',
        position: 'relative',
        pageBreakAfter: 'always',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '18px', fontWeight: 700, color: '#000000', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          WAARDEBEPALING WEV
        </h1>
        <img crossOrigin="anonymous" src={logoAutomobiel} alt="Automobiel Taxaties" style={{ height: '40px', width: 'auto' }} />
      </div>

      {/* Taxateur declaration */}
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '10px', color: '#000000', lineHeight: 1.8, margin: '0 0 8px 0' }}>
          Ondergetekende,
        </p>
        <p style={{ fontSize: '10px', color: '#000000', lineHeight: 1.8, margin: '0 0 4px 0', fontWeight: 600 }}>
          {TAXATEUR_NAAM}
        </p>
        <p style={{ fontSize: '10px', color: '#000000', lineHeight: 1.8, margin: '0 0 8px 0' }}>
          Register Taxateur
        </p>
        <p style={{ fontSize: '10px', color: '#000000', lineHeight: 1.8, margin: '0 0 16px 0', textAlign: 'justify' }}>
          Gecertificeerd door Stichting Hobéon SKO Certificatie, conform de Regeling SRZ, onder nummers {TAXATEUR_REGISTRATIE}.
          Ingeschreven als registertaxateur motorvoertuigen, gevestigd aan {VESTIGINGSADRES}, en ingeschreven in het handelsregister van de Kamer van Koophandel onder nummer {KVK_NUMMER}.
        </p>
      </div>

      {/* In aanmerking nemende */}
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '10px', color: '#000000', lineHeight: 1.8, margin: '0 0 8px 0', fontWeight: 600 }}>
          In aanmerking nemende:
        </p>
        <p style={{ fontSize: '10px', color: '#000000', lineHeight: 1.8, margin: '0 0 16px 0', textAlign: 'justify' }}>
          Dat ondergetekende van de opdrachtgever opdracht heeft ontvangen om het bovenvermelde motorvoertuig op te nemen en te waarderen naar Waarde in het Economisch Verkeer en dat hij aan dit voertuig de navolgende waarde toekent.
        </p>
      </div>

      {/* Waarde block */}
      <div style={{ 
        marginBottom: '20px',
        padding: '12px 16px',
        backgroundColor: '#f8f9fa',
        borderLeft: '3px solid #000000',
      }}>
        <p style={{ fontSize: '12px', color: '#000000', margin: '0 0 4px 0', fontWeight: 600 }}>
          Waarde in het Economisch Verkeer: {eindwaardeFormatted}
        </p>
        <p style={{ fontSize: '10px', color: '#000000', margin: 0, fontStyle: 'italic' }}>
          Zegge: {eindwaardeTekst}
        </p>
      </div>

      {/* Signing declaration */}
      <p style={{ fontSize: '10px', color: '#000000', lineHeight: 1.8, margin: '0 0 16px 0' }}>
        Aldus gedaan naar beste kennis en wetenschap en getekend te {VESTIGINGSPLAATS}, op {datumRapportGereed}.
      </p>

      {/* Legal terms */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '9px', color: '#000000', lineHeight: 1.8, margin: '0 0 8px 0', textAlign: 'justify' }}>
          Op deze taxatie zijn van toepassing de algemene voorwaarden voor Register Makelaars en Register Taxateurs in roerende zaken, leden van de Federatie van Taxateurs, Makelaars en Veilinghouders in roerende zaken. Deze voorwaarden zijn gedeponeerd bij de Kamer van Koophandel en Fabrieken voor Amsterdam op 30 juni 2005 onder nummer 40530226.
        </p>
        <p style={{ fontSize: '9px', color: '#000000', lineHeight: 1.8, margin: '0 0 8px 0', textAlign: 'justify' }}>
          Deze taxatie en de bijbehorende rapportage vormen nadrukkelijk geen technische keuring en kunnen nooit als zodanig worden geïnterpreteerd.
        </p>
        <p style={{ fontSize: '9px', color: '#000000', lineHeight: 1.8, margin: '0 0 8px 0', textAlign: 'justify' }}>
          Dit rapport dient uitsluitend ter bepaling van de Waarde in het Economisch Verkeer.
        </p>
        <p style={{ fontSize: '9px', color: '#000000', lineHeight: 1.8, margin: '0 0 8px 0', textAlign: 'justify' }}>
          De taxateur heeft het voertuig op {datumOpname}, zijnde de waardepeildatum, opgenomen en getaxeerd na onderzoek te {plaatsOpname}.
        </p>
        <p style={{ fontSize: '9px', color: '#000000', lineHeight: 1.8, margin: '0 0 8px 0', textAlign: 'justify' }}>
          Deze taxatie houdt geen enkele garantie in met betrekking tot het realiseren van de vastgestelde waarde bij inruil of verkoop.
        </p>
        <p style={{ fontSize: '9px', color: '#000000', lineHeight: 1.8, margin: 0, textAlign: 'justify' }}>
          Onder Waarde in het Economisch Verkeer wordt verstaan het bedrag dat, bij aanbieding ten verkoop op de voor de zaak meest geschikte wijze en na de beste voorbereiding, door de meest biedende gegadigde zou zijn besteed dan wel door de verkoper zou zijn ontvangen.
        </p>
      </div>

      {/* Signature block */}
      <div style={{ marginTop: '24px' }}>
        <p style={{ fontSize: '10px', color: '#000000', margin: '0 0 8px 0' }}>
          Hoogachtend,
        </p>
        <p style={{ fontSize: '10px', color: '#000000', fontWeight: 600, margin: '0 0 2px 0' }}>
          Automobiel Taxaties
        </p>
        <p style={{ fontSize: '10px', color: '#000000', fontWeight: 600, margin: '0 0 12px 0' }}>
          {TAXATEUR_NAAM}
        </p>
        <img 
          crossOrigin="anonymous"
          src={signatureErik} 
          alt="Handtekening Erik Elderson" 
          style={{ 
            height: '25mm',
            width: 'auto',
            maxWidth: '70mm',
          }} 
        />
      </div>

      {/* Footer with page number and paraaf space */}
      <div style={{ 
        position: 'absolute', 
        bottom: '24px', 
        left: '28px', 
        right: '28px',
        borderTop: '1px solid #e2e8f0', 
        paddingTop: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '9px', color: '#000000' }}>
          Pagina {pageNumber} van {totalPages}
        </div>
        <div style={{ fontSize: '9px', color: '#000000' }}>
          Paraaf: ________________
        </div>
      </div>
    </div>
  );
};

export default PDFWevValuationContent;
