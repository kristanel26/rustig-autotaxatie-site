import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';
import signatureErik from '@/assets/signature-erik-elderson.svg';
import { qualityClasses } from '@/lib/qualityClasses';

interface PDFKlassiekerValuationContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: any;
  pageNumber: number;
  totalPages: number;
}

// Fixed legal text for klassieker insurance valuation - DO NOT modify
const LEGAL_TEXT = `Dit rapport dient uitsluitend ter bepaling van de waarde voor verzekeringsdoeleinden van het visueel getaxeerde motorvoertuig. De geldigheid van deze taxatie is afhankelijk van uw polisvoorwaarden. Het rapport is beslist géén technische keuring en kan daarom nooit als zodanig worden geïnterpreteerd.`;

const VALUE_INTRO = `De vervangingswaarde van het hier omschreven voertuig, inclusief accessoires, bedraagt:`;

const SIGNING_TEXT = `Ondergetekende,

Erik Elderson
Register Taxateur motorvoertuigen
Gecertificeerd door Stichting Hobéon SKO Certificatie
TMV 33106 en VRT 22-523-M

Vestigingsadres:
Leigraaf 160
6651 GY Druten`;

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
  
  const qualityClass = qualityClasses.find(qc => qc.value === report.quality_class);

  return (
    <div 
      className="bg-white pdf-page"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '28px 32px',
        boxSizing: 'border-box',
        position: 'relative',
        pageBreakAfter: 'always',
        fontFamily: 'Helvetica, Arial, sans-serif',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#000000', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          WAARDEVASTSTELLING
        </h1>
        <img crossOrigin="anonymous" src={logoAutomobiel} alt="Automobiel Taxaties" style={{ height: '44px', width: 'auto' }} />
      </div>

      {/* Legal Text */}
      <p style={{ 
        fontSize: '11px', 
        color: '#000000', 
        lineHeight: 1.7, 
        marginBottom: '28px',
        textAlign: 'justify',
      }}>
        {LEGAL_TEXT}
      </p>

      {/* Quality Class if present */}
      {qualityClass && (
        <div style={{ marginBottom: '28px' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#000000', marginBottom: '6px' }}>
            Kwaliteitsklasse: {qualityClass.label}
          </p>
          <p style={{ fontSize: '11px', color: '#000000', lineHeight: 1.6 }}>
            {qualityClass.description}
          </p>
        </div>
      )}

      {/* Value Introduction */}
      <p style={{ 
        fontSize: '11px', 
        color: '#000000', 
        lineHeight: 1.7, 
        marginBottom: '16px',
      }}>
        {VALUE_INTRO}
      </p>

      {/* Value - bold, prominent */}
      <p style={{ 
        fontSize: '16px', 
        fontWeight: 700, 
        color: '#000000', 
        marginBottom: '10px',
      }}>
        {formattedValue} (inclusief BTW)
      </p>
      
      {valueInWords && (
        <p style={{ 
          fontSize: '11px', 
          color: '#000000', 
          marginBottom: '32px',
        }}>
          zegge: {valueInWords}
        </p>
      )}

      {/* Signing Section */}
      <div style={{ marginTop: '40px', whiteSpace: 'pre-line' }}>
        <p style={{ 
          fontSize: '11px', 
          color: '#000000', 
          lineHeight: 1.8,
          marginBottom: '24px',
        }}>
          {SIGNING_TEXT}
        </p>
      </div>

      {/* Date and location */}
      <p style={{ 
        fontSize: '11px', 
        color: '#000000', 
        marginBottom: '28px',
      }}>
        Aldus opgemaakt te Druten, {formatDateLong(report.inspection_date)}
      </p>

      {/* Signature */}
      <div style={{ marginBottom: '20px' }}>
        <img 
          crossOrigin="anonymous"
          src={signatureErik} 
          alt="Handtekening Erik Elderson" 
          style={{ 
            height: '30mm',
            width: 'auto',
            maxWidth: '75mm',
          }} 
        />
      </div>

      {/* Footer with page number and paraaf */}
      <div style={{ 
        position: 'absolute', 
        bottom: '28px', 
        left: '32px', 
        right: '32px',
        borderTop: '1px solid #e2e8f0', 
        paddingTop: '14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '10px', color: '#000000' }}>
          Pagina {pageNumber} van {totalPages}
        </div>
        <div style={{ fontSize: '10px', color: '#000000' }}>
          Paraaf: ________________
        </div>
      </div>
    </div>
  );
};

export default PDFKlassiekerValuationContent;
