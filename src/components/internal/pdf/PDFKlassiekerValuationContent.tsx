import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';
import signatureErik from '@/assets/signature-erik-elderson.svg';

interface PDFKlassiekerValuationContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: any;
  pageNumber: number;
  totalPages: number;
}

// LOCKED TEXT - DO NOT MODIFY
// These texts are exact copies from the original report and must remain unchanged
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
      return new Date().toLocaleDateString('nl-NL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }
    return new Date(dateString).toLocaleDateString('nl-NL',
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
  };

  // ALWAYS render this page - it contains fixed legal text
  // If no value yet, show placeholder

  const hasValue = report.appraised_value && report.appraised_value > 0;
  const formattedValue = hasValue ? formatCurrency(report.appraised_value) : '€ ___________';
  const valueInWords = hasValue ? (report.appraised_value_text || '') : '___________';

  // Typography styles matching page 1
  const bodyTextStyle: React.CSSProperties = {
    fontSize: '11pt',
    fontWeight: 600,
    color: '#000000',
    lineHeight: 1.7,
    textAlign: 'justify',
    WebkitFontSmoothing: 'none' as unknown as string,
    MozOsxFontSmoothing: 'unset' as unknown as string,
  };

  return (
    <div 
      className="bg-white pdf-page"
      style={{
        width: '210mm',
        minHeight: '297mm',
        height: '297mm',
        padding: '20mm 20mm 20mm 25mm',
        pageBreakBefore: 'always',
        boxSizing: 'border-box',
        position: 'relative',
        pageBreakAfter: 'always',
        fontFamily: 'Helvetica, Arial, sans-serif',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10mm' }}>
        <h1 style={{ 
          fontSize: '16pt', 
          fontWeight: 700, 
          color: '#000000', 
          margin: 0, 
          textTransform: 'uppercase', 
          letterSpacing: '0.04em' 
        }}>
          WAARDEVASTSTELLING
        </h1>
        <img 
          crossOrigin="anonymous" 
          src={logoAutomobiel} 
          alt="Automobiel Taxaties" 
          style={{ height: '14mm', width: 'auto' }} 
        />
      </div>

      {/* Legal Text Block 1 */}
      <p style={{ 
        ...bodyTextStyle,
        marginBottom: '8mm',
      }}>
        {LEGAL_TEXT_BLOCK_1}
      </p>

      {/* Value Introduction */}
      <p style={{ 
        ...bodyTextStyle,
        marginBottom: '6mm',
      }}>
        {VALUE_INTRO}
      </p>

      {/* Value Block */}
      <div style={{ marginBottom: '8mm' }}>
        <p style={{ 
          fontSize: '14pt', 
          fontWeight: 800, 
          color: '#000000', 
          margin: '0 0 2mm 0',
        }}>
          {formattedValue} (inclusief BTW)
        </p>
        {valueInWords && (
          <p style={{ 
            fontSize: '10pt',
            fontWeight: 600,
            color: '#000000',
            margin: 0,
          }}>
            zegge: {valueInWords} 00/Euro
          </p>
        )}
      </div>

      {/* Expert Declaration */}
      <p style={{ 
        ...bodyTextStyle,
        marginBottom: '10mm',
      }}>
        {EXPERT_DECLARATION}
      </p>

      {/* Closing */}
      <div style={{ marginBottom: '6mm' }}>
        <p style={{ 
          ...bodyTextStyle,
          marginBottom: '6mm',
        }}>
          Aldus, naar beste weten en kunnen opgemaakt te Druten, {formatDateLong(report.inspection_date)}.
        </p>
        
        <p style={{ 
          fontSize: '10pt',
          fontWeight: 600,
          color: '#000000',
          margin: '0 0 4mm 0',
        }}>
          Hoogachtend,
        </p>
        
        <p style={{ 
          fontSize: '10pt',
          fontWeight: 600,
          color: '#000000',
          margin: '0 0 2mm 0',
        }}>
          Automobiel Taxaties
        </p>
        
        <p style={{ 
          fontSize: '11pt',
          fontWeight: 800,
          color: '#000000',
          margin: 0,
        }}>
          Erik Elderson
        </p>
      </div>

      {/* Signature - directly under Erik Elderson name */}
      <div style={{ marginTop: '2mm' }}>
        <img 
          crossOrigin="anonymous"
          src={signatureErik} 
          alt="Handtekening Erik Elderson" 
          style={{ 
            height: '55mm',
            width: 'auto',
            maxWidth: '100mm',
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
        <div style={{ 
          fontSize: '9pt', 
          fontWeight: 600,
          color: '#000000' 
        }}>
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
              height: '18mm',
              width: 'auto',
            }} 
          />
          <span style={{ 
            fontSize: '8pt', 
            fontWeight: 600,
            color: '#000000' 
          }}>
            Paraaf
          </span>
        </div>
      </div>
    </div>
  );
};

export default PDFKlassiekerValuationContent;

