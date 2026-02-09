import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';
import signatureErik from '@/assets/signature-erik-elderson.svg';

interface PDFValuationContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: any;
  pageNumber: number;
  totalPages: number;
}

// Fixed legal text - never changes - DO NOT modify, summarize or rewrite this text
const LEGAL_TEXT = `Dit rapport dient uitsluitend ter bepaling van de waarde voor verzekeringsdoeleinden van het visueel getaxeerde motorvoertuig. De geldigheidsduur van deze taxatie is afhankelijk van uw polisvoorwaarden. Het rapport is beslist géén technische keuring en kan daarom nooit als zodanig worden geïnterpreteerd. Het rapport is niet overdraagbaar en is toepasbaar bij polisvoorwaarden volgens artikel 7:960 B.W. De door ons verrichte taxatie houdt geen enkele garantie in tot het realiseren van de vastgesteld waarde bij inruil of verkoop. Onder vervangingswaarde wordt verstaan het bedrag dat nodig is voor het verkrijgen van naar soort, kwaliteit, staat en ouderdom vergelijkbare zaak. Dat op deze taxatie van toepassing zijn de algemene voorwaarden voor Register Makelaars en Register Taxateurs in roerende zaken, leden van de Federatie van Taxateurs, Makelaars en Veilinghouders in roerende zaken, welke voorwaarden zijn gedeponeerd bij de Kamer van Koophandel en Fabrieken voor Amsterdam op 30-06-2005 onder nummer 40530226.`;

const VALUATION_INTRO = `Uitgaande van de marktsituatie op het moment van de taxatie stelden wij de vervangingswaarde van het hier omschreven voertuig, inclusief accessoires, op`;

const SIGNING_TEXT = `Ondergetekende, Erik Elderson, Register Taxateur voor motorvoertuigen te Druten, als zodanig erkend en opgenomen in het Register van Makelaars en Taxateurs TMV onder nummer 33106, Register-Taxateur VRT onder nummer 22-523-M, verklaart te zijn benoemd als deskundige.`;

const PDFValuationContent = ({ report, pageNumber, totalPages }: PDFValuationContentProps) => {
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

  const capitalizeFirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Don't render if no value
  if (!report.appraised_value || report.appraised_value <= 0) {
    return null;
  }

  const formattedValue = formatCurrency(report.appraised_value);
  const valueInWords = report.appraised_value_text 
    ? capitalizeFirst(report.appraised_value_text)
    : '';

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
          GETAXEERDE WAARDE
        </h1>
        <img crossOrigin="anonymous" src={logoAutomobiel} alt="Automobiel Taxaties" style={{ height: '40px', width: 'auto' }} />
      </div>

      {/* Legal Text - plain paragraph, no background */}
      <p style={{ 
        fontSize: '11pt', 
        color: '#000000', 
        fontWeight: 500,
        lineHeight: 1.7, 
        marginBottom: '20px',
        textAlign: 'justify',
      }}>
        {LEGAL_TEXT}
      </p>

      {/* Valuation Introduction + Value on same flow */}
      <p style={{ 
        fontSize: '11pt', 
        color: '#000000', 
        fontWeight: 500,
        lineHeight: 1.7, 
        marginBottom: '20px',
      }}>
        {VALUATION_INTRO}
      </p>

      {/* Value - simple bold text, no colored block */}
      <p style={{ 
        fontSize: '14pt', 
        fontWeight: 700, 
        color: '#000000', 
        marginBottom: '20px',
      }}>
        {formattedValue} (inclusief BTW) {valueInWords && <>zegge: {valueInWords}</>}
      </p>

      {/* Signing Text */}
      <p style={{ 
        fontSize: '11pt', 
        color: '#000000', 
        fontWeight: 500,
        lineHeight: 1.7, 
        marginBottom: '20px',
        textAlign: 'justify',
      }}>
        {SIGNING_TEXT}
      </p>

      {/* Date line */}
      <p style={{ 
        fontSize: '11pt', 
        color: '#000000', 
        fontWeight: 500,
        marginBottom: '24px',
      }}>
        Aldus, naar beste weten en kunnen opgemaakt te Druten, {formatDateLong(report.inspection_date)}
      </p>

      {/* Signature block */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '11pt', color: '#000000', fontWeight: 500, margin: '0 0 8px 0' }}>
          Hoogachtend,
        </p>
        <p style={{ fontSize: '11pt', color: '#000000', fontWeight: 600, margin: '0 0 2px 0' }}>
          Automobiel Taxaties
        </p>
        <p style={{ fontSize: '11pt', color: '#000000', fontWeight: 700, margin: '0 0 4mm 0' }}>
          Erik Elderson
        </p>
        <img 
          crossOrigin="anonymous"
          src={signatureErik} 
          alt="Handtekening Erik Elderson" 
          style={{ 
            height: '45mm',
            width: 'auto',
            maxWidth: '90mm',
          }} 
        />
      </div>

      {/* Footer with page number and paraaf */}
      <div style={{ 
        position: 'absolute', 
        bottom: '20mm', 
        left: '25mm', 
        right: '20mm',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
      }}>
        <div style={{ fontSize: '9pt', fontWeight: 500, color: '#000000' }}>
          Pagina {pageNumber} van {totalPages}
        </div>
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '1mm',
        }}>
          <img 
            crossOrigin="anonymous"
            src={signatureErik} 
            alt="Paraaf" 
            style={{ 
              height: '12mm',
              width: 'auto',
            }} 
          />
          <span style={{ 
            fontSize: '8pt', 
            fontWeight: 500,
            color: '#000000' 
          }}>
            Paraaf
          </span>
        </div>
      </div>
    </div>
  );
};

export default PDFValuationContent;
