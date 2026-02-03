import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';
import signatureErik from '@/assets/signature-erik-elderson.svg';

interface Report {
  id: string;
  document_reference: string | null;
  appraised_value: number | null;
  appraised_value_text: string | null;
  inspection_date: string | null;
}

interface PDFValuationContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: any;
  pageNumber: number;
}

// Fixed legal text - never changes
const LEGAL_TEXT = `Dit rapport dient uitsluitend ter bepaling van de waarde voor verzekeringsdoeleinden van het visueel getaxeerde motorvoertuig. De geldigheidsduur van deze taxatie is afhankelijk van uw polisvoorwaarden. Het rapport is beslist géén technische keuring en kan daarom nooit als zodanig worden geïnterpreteerd. Het rapport is niet overdraagbaar en is toepasbaar bij polisvoorwaarden volgens artikel 7:960 BW. De door ons verrichte taxatie houdt geen enkele garantie in tot het realiseren van de vastgestelde waarde bij inruil of verkoop. Onder vervangingswaarde wordt verstaan het bedrag dat nodig is voor het verkrijgen van naar soort, kwaliteit, staat en ouderdom vergelijkbare zaak. Dat op deze taxatie van toepassing zijn de algemene voorwaarden voor Register Makelaars en Register Taxateurs in roerende zaken, leden van de Federatie van Taxateurs, Makelaars en Veilinghouders in roerende zaken, welke voorwaarden zijn gedeponeerd bij de Kamer van Koophandel en Fabrieken voor Amsterdam op 30-06-2005 onder nummer 40530226.`;

const VALUATION_INTRO = `Uitgaande van de marktsituatie op het moment van de taxatie stelden wij de vervangingswaarde van het hier omschreven voertuig, inclusief accessoires, op:`;

const SIGNING_TEXT = `Ondergetekende, Erik Elderson, Register Taxateur voor motorvoertuigen te Druten, als zodanig erkend en opgenomen in het Register van Makelaars en Taxateurs TMV onder nummer 33106, Register-Taxateur VRT onder nummer 22-523-M, verklaart te zijn benoemd als deskundige.`;

const PDFValuationContent = ({ report, pageNumber }: PDFValuationContentProps) => {
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
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: 600, color: '#000000', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            GETAXEERDE WAARDE
          </h1>
          {report.document_reference && (
            <p style={{ fontSize: '10px', color: '#000000', margin: '4px 0 0 0' }}>
              Documentkenmerk: {report.document_reference}
            </p>
          )}
        </div>
        <img crossOrigin="anonymous" src={logoAutomobiel} alt="Automobiel Taxaties" style={{ height: '40px', width: 'auto' }} />
      </div>

      {/* Legal Text Block */}
      <div style={{ 
        marginBottom: '28px',
        padding: '16px',
        backgroundColor: '#f8fafc',
        borderLeft: '3px solid #e2e8f0',
        borderRadius: '0 4px 4px 0',
      }}>
        <p style={{ 
          fontSize: '9px', 
          color: '#000000', 
          lineHeight: 1.7, 
          margin: 0,
          textAlign: 'justify',
        }}>
          {LEGAL_TEXT}
        </p>
      </div>

      {/* Valuation Section */}
      <div style={{ marginBottom: '32px' }}>
        <p style={{ 
          fontSize: '11px', 
          color: '#000000', 
          lineHeight: 1.6, 
          marginBottom: '16px',
        }}>
          {VALUATION_INTRO}
        </p>

        {/* Value Block - Blue highlight */}
        <div style={{ 
          backgroundColor: '#1e40af',
          padding: '20px 24px',
          borderRadius: '6px',
          marginBottom: '8px',
        }}>
          <p style={{ 
            fontSize: '24px', 
            fontWeight: 700, 
            color: '#ffffff', 
            margin: 0,
            textAlign: 'center',
          }}>
            {formattedValue} <span style={{ fontSize: '14px', fontWeight: 500 }}>(inclusief BTW)</span>
          </p>
        </div>

        {valueInWords && (
          <p style={{ 
            fontSize: '12px', 
            color: '#000000', 
            fontStyle: 'italic',
            textAlign: 'center',
            margin: '8px 0 0 0',
          }}>
            zegge: {valueInWords}
          </p>
        )}

        {/* Valuation basis summary */}
        <div style={{ 
          marginTop: '24px',
          padding: '16px 20px',
          backgroundColor: '#f8fafc',
          borderRadius: '4px',
        }}>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#000000', margin: '0 0 10px 0' }}>
            De waardebepaling is gebaseerd op:
          </p>
          <ul style={{ margin: 0, padding: '0 0 0 20px', fontSize: '10px', color: '#000000', lineHeight: 2.0 }}>
            <li>Visuele inspectie van het voertuig</li>
            <li>Algemene staat en conditie</li>
            <li>Kilometerstand op het moment van opname</li>
            <li>Uitvoering, opbouw en accessoires</li>
            <li>Vergelijking met actuele marktprijzen</li>
          </ul>
          <p style={{ fontSize: '11px', fontWeight: 600, color: '#000000', margin: '16px 0 0 0' }}>
            Waardepeildatum: {formatDateLong(report.inspection_date)}
          </p>
        </div>
      </div>

      {/* Signing Section */}
      <div style={{ marginTop: '40px' }}>
        <p style={{ 
          fontSize: '10px', 
          color: '#000000', 
          lineHeight: 1.7, 
          marginBottom: '24px',
          textAlign: 'justify',
        }}>
          {SIGNING_TEXT}
        </p>

        <p style={{ 
          fontSize: '11px', 
          color: '#000000', 
          marginBottom: '28px',
        }}>
          Aldus, naar beste weten en kunnen opgemaakt te Druten, {formatDateLong(report.inspection_date)}
        </p>

        <div style={{ marginBottom: '16px' }}>
          <p style={{ fontSize: '11px', color: '#000000', margin: '0 0 4px 0' }}>
            Hoogachtend,
          </p>
          <p style={{ fontSize: '11px', color: '#000000', fontWeight: 600, margin: '0 0 2px 0' }}>
            Automobiel Taxaties
          </p>
          <p style={{ fontSize: '11px', color: '#000000', fontWeight: 600, margin: 0 }}>
            Erik Elderson
          </p>
        </div>

        <div style={{ marginTop: '12px' }}>
          <img 
            crossOrigin="anonymous"
            src={signatureErik} 
            alt="Handtekening Erik Elderson" 
            style={{ 
              height: '30mm', // Fixed mm size for consistent print output
              width: 'auto',
              maxWidth: '80mm',
            }} 
          />
        </div>
      </div>

      {/* Footer */}
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
          <span style={{ fontWeight: 600 }}>Automobiel Taxaties</span>
          <span style={{ margin: '0 4px' }}>|</span>
          Leigraaf 160, 6651 GJ Druten
          <span style={{ margin: '0 4px' }}>|</span>
          KVK: 95549269
        </div>
        <div style={{ fontSize: '9px', color: '#000000' }}>
          Pagina {pageNumber}
        </div>
      </div>
    </div>
  );
};

export default PDFValuationContent;
