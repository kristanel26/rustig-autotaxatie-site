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

const PDFCoverContent = ({ report, totalPages = 1 }: PDFCoverContentProps) => {
  // Helpers
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '–';
    return new Date(dateString).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (timeString: string | null) => {
    if (!timeString) return '–';
    return timeString.slice(0, 5) + ' uur';
  };

  // Build customer name
  const customerName = [report.customer_title, report.customer_initials, report.customer_last_name]
    .filter(Boolean)
    .join(' ') || '–';

  // Customer address
  const customerAddress = report.customer_street || '–';
  const customerCity = [report.customer_postcode, report.customer_city].filter(Boolean).join(' ') || '–';

  // Vehicle display title
  const vehicleDisplay = report.vehicle_title || 
    [report.rdw_merk, report.rdw_handelsbenaming].filter(Boolean).join(' ') || 
    '–';

  // Extract inspection data
  const inspectionDate = report.inspection_date ? formatDate(report.inspection_date) : '–';
  const startTime = report.inspection_start_time ? formatTime(report.inspection_start_time) : '–';
  const endTime = report.inspection_end_time ? formatTime(report.inspection_end_time) : '–';
  const inspectionLocation = report.inspection_location || '–';

  return (
    <div 
      className="bg-white pdf-page"
      style={{
        width: '210mm',
        height: '297mm',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        pageBreakAfter: 'always',
        fontFamily: '"Source Sans Pro", "Helvetica Neue", Helvetica, Arial, sans-serif',
        boxSizing: 'border-box',
        fontSize: '10pt',
        color: '#1a1a1a',
        lineHeight: 1.5,
      }}
    >
      {/* ===== DECORATIVE RIGHT PANEL ===== */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '75mm',
          height: '100%',
          background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)',
          zIndex: 0,
        }}
      >
        {/* Subtle decorative pattern */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            right: '15mm',
            width: '45mm',
            height: '45mm',
            borderRadius: '50%',
            border: '1px solid rgba(0,0,0,0.05)',
            opacity: 0.6,
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '35%',
            right: '25mm',
            width: '35mm',
            height: '35mm',
            borderRadius: '50%',
            border: '1px solid rgba(0,0,0,0.03)',
            opacity: 0.4,
          }}
        />
      </div>

      {/* ===== MAIN CONTENT AREA ===== */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '18mm 20mm 15mm 25mm',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* ===== TOP: FEDERATION LOGOS ===== */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '6mm',
          marginBottom: '12mm',
        }}>
          <img 
            crossOrigin="anonymous"
            src={logoVrt} 
            alt="VRT" 
            style={{ height: '11mm', width: 'auto' }}
          />
          <img 
            crossOrigin="anonymous"
            src={logoHobeon} 
            alt="Hobéon" 
            style={{ height: '11mm', width: 'auto' }}
          />
          <img 
            crossOrigin="anonymous"
            src={logoTmv} 
            alt="TMV" 
            style={{ height: '11mm', width: 'auto' }}
          />
          <img 
            crossOrigin="anonymous"
            src={logoFehac} 
            alt="FEHAC" 
            style={{ height: '11mm', width: 'auto' }}
          />
        </div>

        {/* ===== MAIN TITLE ===== */}
        <div style={{ marginBottom: '14mm' }}>
          <h1 style={{ 
            fontSize: '28pt', 
            fontWeight: 600, 
            color: '#000000', 
            margin: 0,
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            Taxatierapport
          </h1>
          <p style={{ 
            fontSize: '11pt', 
            color: '#555555', 
            margin: '3mm 0 0 0',
            fontWeight: 400,
          }}>
            Volgens artikel 7:960 BW
          </p>
        </div>

        {/* ===== LEFT INFORMATION COLUMN ===== */}
        <div style={{ 
          flex: 1,
          maxWidth: '110mm',
          fontSize: '10pt',
          lineHeight: 1.6,
        }}>
          {/* Inzake */}
          <div style={{ marginBottom: '5mm' }}>
            <p style={{ 
              margin: 0, 
              fontWeight: 500, 
              color: '#444444',
              fontSize: '9pt',
            }}>
              Inzake:
            </p>
            <p style={{ 
              margin: '1mm 0 0 0', 
              fontWeight: 600,
              color: '#1a1a1a',
              fontSize: '11pt',
            }}>
              {vehicleDisplay}
            </p>
          </div>

          {/* Kenteken */}
          <div style={{ marginBottom: '5mm' }}>
            <p style={{ 
              margin: 0, 
              fontWeight: 500, 
              color: '#444444',
              fontSize: '9pt',
            }}>
              Kenteken:
            </p>
            <p style={{ 
              margin: '1mm 0 0 0', 
              fontWeight: 600,
              color: '#1a1a1a',
              fontSize: '11pt',
            }}>
              {report.license_plate || '–'}
            </p>
          </div>

          {/* Documentkenmerk */}
          <div style={{ marginBottom: '5mm' }}>
            <p style={{ 
              margin: 0, 
              fontWeight: 500, 
              color: '#444444',
              fontSize: '9pt',
            }}>
              Documentkenmerk:
            </p>
            <p style={{ 
              margin: '1mm 0 0 0', 
              fontWeight: 600,
              color: '#1a1a1a',
              fontSize: '11pt',
            }}>
              {report.report_number || '–'}
            </p>
          </div>

          {/* In opdracht van */}
          <div style={{ marginBottom: '8mm' }}>
            <p style={{ 
              margin: 0, 
              fontWeight: 500, 
              color: '#444444',
              fontSize: '9pt',
            }}>
              In opdracht van:
            </p>
            <p style={{ 
              margin: '1mm 0 0 0', 
              fontWeight: 600,
              color: '#1a1a1a',
              fontSize: '11pt',
            }}>
              {customerName}
            </p>
            <p style={{ 
              margin: '0.5mm 0 0 0', 
              color: '#1a1a1a',
              fontSize: '10pt',
            }}>
              {customerAddress}
            </p>
            <p style={{ 
              margin: '0.5mm 0 0 0', 
              color: '#1a1a1a',
              fontSize: '10pt',
            }}>
              {customerCity}
            </p>
          </div>

          {/* Separator line */}
          <div style={{ 
            borderTop: '1px solid #e0e0e0', 
            margin: '6mm 0',
            width: '80mm',
          }} />

          {/* Opnamedatum */}
          <div style={{ marginBottom: '4mm' }}>
            <p style={{ 
              margin: 0, 
              fontWeight: 500, 
              color: '#444444',
              fontSize: '9pt',
            }}>
              Opnamedatum:
            </p>
            <p style={{ 
              margin: '1mm 0 0 0', 
              fontWeight: 600,
              color: '#1a1a1a',
              fontSize: '10pt',
            }}>
              {inspectionDate}
            </p>
          </div>

          {/* Aanvangstijd */}
          <div style={{ marginBottom: '4mm' }}>
            <p style={{ 
              margin: 0, 
              fontWeight: 500, 
              color: '#444444',
              fontSize: '9pt',
            }}>
              Aanvangstijd:
            </p>
            <p style={{ 
              margin: '1mm 0 0 0', 
              fontWeight: 600,
              color: '#1a1a1a',
              fontSize: '10pt',
            }}>
              {startTime}
            </p>
          </div>

          {/* Eindtijd */}
          <div style={{ marginBottom: '4mm' }}>
            <p style={{ 
              margin: 0, 
              fontWeight: 500, 
              color: '#444444',
              fontSize: '9pt',
            }}>
              Eindtijd:
            </p>
            <p style={{ 
              margin: '1mm 0 0 0', 
              fontWeight: 600,
              color: '#1a1a1a',
              fontSize: '10pt',
            }}>
              {endTime}
            </p>
          </div>

          {/* Plaats */}
          <div style={{ marginBottom: '8mm' }}>
            <p style={{ 
              margin: 0, 
              fontWeight: 500, 
              color: '#444444',
              fontSize: '9pt',
            }}>
              Plaats:
            </p>
            <p style={{ 
              margin: '1mm 0 0 0', 
              fontWeight: 600,
              color: '#1a1a1a',
              fontSize: '10pt',
            }}>
              {inspectionLocation}
            </p>
          </div>

          {/* Separator line */}
          <div style={{ 
            borderTop: '1px solid #e0e0e0', 
            margin: '6mm 0',
            width: '80mm',
          }} />

          {/* Uitgevoerd door */}
          <div>
            <p style={{ 
              margin: 0, 
              fontWeight: 500, 
              color: '#444444',
              fontSize: '9pt',
            }}>
              Uitgevoerd door:
            </p>
            <p style={{ 
              margin: '2mm 0 0 0', 
              fontWeight: 600,
              color: '#1a1a1a',
              fontSize: '11pt',
            }}>
              Erik Elderson
            </p>
            <p style={{ 
              margin: '1mm 0 0 0', 
              color: '#444444',
              fontSize: '9pt',
            }}>
              TMV Register-Taxateur
            </p>
            <p style={{ 
              margin: '0.5mm 0 0 0', 
              color: '#444444',
              fontSize: '9pt',
            }}>
              Register-Taxateur VRT
            </p>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <div style={{ 
          borderTop: '1px solid #cccccc', 
          paddingTop: '6mm',
          marginTop: 'auto',
          maxWidth: '110mm',
        }}>
          {/* Company Logo */}
          <img 
            crossOrigin="anonymous"
            src={logoAutomobiel} 
            alt="Automobiel Taxaties" 
            style={{ 
              maxWidth: '45mm', 
              height: 'auto',
              marginBottom: '4mm',
            }}
          />

          {/* Company Details */}
          <div style={{ 
            fontSize: '8pt', 
            color: '#333333',
            lineHeight: 1.5,
          }}>
            <p style={{ margin: 0, fontWeight: 600 }}>
              Automobiel Taxaties
            </p>
            <p style={{ margin: '1mm 0 0 0' }}>
              Leigraaf 160
            </p>
            <p style={{ margin: '0.5mm 0 0 0' }}>
              6651 GJ Druten
            </p>
            <p style={{ margin: '2mm 0 0 0' }}>
              KvK: 95549269
            </p>
            <p style={{ margin: '0.5mm 0 0 0' }}>
              BTW: NL003366178B93
            </p>
            <p style={{ margin: '0.5mm 0 0 0' }}>
              TMV: 33106
            </p>
            <p style={{ margin: '0.5mm 0 0 0' }}>
              VRT: 22-523-M
            </p>
            <p style={{ margin: '0.5mm 0 0 0' }}>
              Bankrekening: NL80RABO0387915680
            </p>
          </div>

          {/* Page Number */}
          <div style={{ 
            marginTop: '5mm',
            fontSize: '8pt', 
            color: '#666666',
          }}>
            <p style={{ margin: 0 }}>
              Pagina 1 van {totalPages}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFCoverContent;
