import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';
import signatureErik from '@/assets/signature-erik-elderson.svg';

interface PDFWevValuationContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: any;
  pageNumber: number;
  totalPages: number;
}

// Fixed legal text for WEV - DO NOT modify
const LEGAL_TEXT = `Dit rapport dient uitsluitend ter bepaling van de Waarde in het Economisch Verkeer (WEV) van het visueel getaxeerde motorvoertuig. De vastgestelde waarde betreft een momentopname op de datum van taxatie en kan dienen als onderbouwing bij fiscale verantwoording. Het rapport is beslist géén technische keuring en kan daarom nooit als zodanig worden geïnterpreteerd. Het rapport is niet overdraagbaar. De door ons verrichte taxatie houdt geen enkele garantie in tot het realiseren van de vastgestelde waarde bij inruil of verkoop. Dat op deze taxatie van toepassing zijn de algemene voorwaarden voor Register Makelaars en Register Taxateurs in roerende zaken, leden van de Federatie van Taxateurs, Makelaars en Veilinghouders in roerende zaken, welke voorwaarden zijn gedeponeerd bij de Kamer van Koophandel en Fabrieken voor Amsterdam op 30-06-2005 onder nummer 40530226.`;

const SIGNING_TEXT = `Ondergetekende, Erik Elderson, Register Taxateur voor motorvoertuigen te Druten, als zodanig erkend en opgenomen in het Register van Makelaars en Taxateurs TMV onder nummer 33106, Register-Taxateur VRT onder nummer 22-523-M, verklaart te zijn benoemd als deskundige.`;

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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
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

  // Don't render if no WEV data
  if (!report.wev_definitief || report.wev_definitief <= 0) {
    return null;
  }

  const handelsinkoopwaarde = formatCurrency(report.wev_handelsinkoopwaarde_autotelex);
  const verkoopwaarde = formatCurrency(report.wev_verkoopwaarde_autotelex);
  const wevBerekend = formatCurrency(report.wev_berekend);
  const wevDefinitief = formatCurrency(report.wev_definitief);
  const peildatum = formatDate(report.wev_peildatum);
  const bron = report.wev_bron_waardes || 'Autotelex';

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

      {/* Legal Text */}
      <p style={{ 
        fontSize: '10px', 
        color: '#000000', 
        lineHeight: 1.8, 
        marginBottom: '20px',
        textAlign: 'justify',
      }}>
        {LEGAL_TEXT}
      </p>

      {/* Valuation Introduction */}
      <p style={{ 
        fontSize: '10px', 
        color: '#000000', 
        lineHeight: 1.8, 
        marginBottom: '16px',
      }}>
        De Waarde in het Economisch Verkeer is vastgesteld als het rekenkundig gemiddelde van de handelsinkoopwaarde en de verkoopwaarde, gebaseerd op marktgegevens uit {bron}{peildatum && <>, peildatum {peildatum}</>}.
      </p>

      {/* Value breakdown table */}
      <table style={{ 
        width: '100%', 
        borderCollapse: 'collapse', 
        marginBottom: '20px',
        fontSize: '10px',
      }}>
        <tbody>
          {handelsinkoopwaarde && (
            <tr>
              <td style={{ padding: '6px 0', color: '#000000' }}>Handelsinkoopwaarde:</td>
              <td style={{ padding: '6px 0', color: '#000000', textAlign: 'right', fontWeight: 500 }}>{handelsinkoopwaarde}</td>
            </tr>
          )}
          {verkoopwaarde && (
            <tr>
              <td style={{ padding: '6px 0', color: '#000000' }}>Verkoopwaarde:</td>
              <td style={{ padding: '6px 0', color: '#000000', textAlign: 'right', fontWeight: 500 }}>{verkoopwaarde}</td>
            </tr>
          )}
          {wevBerekend && (
            <tr>
              <td style={{ padding: '6px 0', color: '#000000' }}>WEV berekend:</td>
              <td style={{ padding: '6px 0', color: '#000000', textAlign: 'right', fontWeight: 500 }}>{wevBerekend}</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Final WEV Value */}
      <p style={{ 
        fontSize: '14px', 
        fontWeight: 700, 
        color: '#000000', 
        marginBottom: '16px',
      }}>
        WEV definitief: {wevDefinitief}
      </p>

      {/* Override reasoning if present */}
      {report.wev_override_actief && report.wev_override_redenering && (
        <div style={{ marginBottom: '20px' }}>
          <p style={{ 
            fontSize: '10px', 
            color: '#000000', 
            lineHeight: 1.8,
            fontStyle: 'italic',
          }}>
            Afwijking van de berekende waarde: {report.wev_override_redenering}
          </p>
        </div>
      )}

      {/* Signing Text */}
      <p style={{ 
        fontSize: '10px', 
        color: '#000000', 
        lineHeight: 1.8, 
        marginBottom: '20px',
        marginTop: '24px',
        textAlign: 'justify',
      }}>
        {SIGNING_TEXT}
      </p>

      {/* Date line */}
      <p style={{ 
        fontSize: '10px', 
        color: '#000000', 
        marginBottom: '24px',
      }}>
        Aldus, naar beste weten en kunnen opgemaakt te Druten, {formatDateLong(report.inspection_date)}
      </p>

      {/* Signature block */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '10px', color: '#000000', margin: '0 0 8px 0' }}>
          Hoogachtend,
        </p>
        <p style={{ fontSize: '10px', color: '#000000', fontWeight: 600, margin: '0 0 2px 0' }}>
          Automobiel Taxaties
        </p>
        <p style={{ fontSize: '10px', color: '#000000', fontWeight: 600, margin: '0 0 12px 0' }}>
          Erik Elderson
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
