import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';
import logoTmv from '@/assets/logo-tmv.png';
import logoVrt from '@/assets/logo-vrt.png';
import logoFehac from '@/assets/logo-fehac.png';

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
    return timeString.slice(0, 5) + ' u';
  };

  // Extract sequential number from report_number
  const extractSequentialNumber = (reportNumber: string | null): string => {
    if (!reportNumber) return '–';
    if (reportNumber.startsWith('DRAFT')) return reportNumber;
    const match = reportNumber.match(/(\d+)$/);
    if (match) return match[1];
    return reportNumber;
  };

  // Build customer name
  const customerName = [report.customer_title, report.customer_initials, report.customer_last_name]
    .filter(Boolean)
    .join(' ') || '–';

  // Vehicle display title
  const vehicleDisplay = report.vehicle_title || 
    [report.rdw_merk, report.rdw_handelsbenaming].filter(Boolean).join(' ') || 
    '–';

  // Cover photo
  const coverPhoto = report.vehicle_photos && report.vehicle_photos.length > 0 
    ? report.vehicle_photos[0] 
    : null;
  
  const coverRotation = coverPhoto && report.vehicle_photo_rotations 
    ? report.vehicle_photo_rotations[coverPhoto] || 0 
    : 0;

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
        fontFamily: '"Inter", "Source Sans Pro", -apple-system, BlinkMacSystemFont, sans-serif',
        padding: '20mm 25mm',
        boxSizing: 'border-box',
        fontSize: '10.5pt',
        color: '#1a1a1a',
        lineHeight: 1.5,
      }}
    >
      {/* ===== HEADER: LOGO & TITLE ===== */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '8mm',
      }}>
        {/* Logo */}
        <img 
          crossOrigin="anonymous"
          src={logoAutomobiel} 
          alt="Automobiel Taxaties" 
          style={{ 
            maxWidth: '55mm', 
            height: 'auto',
            marginBottom: '5mm',
          }}
        />
        
        {/* Title */}
        <h1 style={{ 
          fontSize: '20pt', 
          fontWeight: 600, 
          color: '#000000', 
          margin: '0 0 2mm 0',
          letterSpacing: '0.5px',
        }}>
          Taxatierapport
        </h1>
        
        {/* Report Type */}
        <p style={{ 
          fontSize: '11pt', 
          fontWeight: 500,
          color: '#333333', 
          margin: '0 0 1mm 0',
        }}>
          Klassieke taxatie (verzekering)
        </p>
        
        {/* Legal Reference */}
        <p style={{ 
          fontSize: '9pt', 
          color: '#666666', 
          margin: 0,
          fontWeight: 400,
        }}>
          Volgens artikel 7:960 BW
        </p>
      </div>

      {/* ===== VEHICLE PHOTO FRAME ===== */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '8mm',
      }}>
        <div style={{
          width: '70mm',
          height: '45mm',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #cccccc',
          backgroundColor: '#fafafa',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          {coverPhoto ? (
            <img
              crossOrigin="anonymous"
              src={coverPhoto}
              alt="Voertuig"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                transform: coverRotation ? `rotate(${coverRotation}deg)` : undefined,
              }}
            />
          ) : (
            <span style={{ color: '#999999', fontSize: '9pt' }}>Geen foto</span>
          )}
        </div>
      </div>

      {/* ===== REPORT INFORMATION BLOCKS ===== */}
      <div style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '4mm',
        fontSize: '10.5pt',
        lineHeight: 1.5,
      }}>
        
        {/* Rapportkop Section */}
        <div style={{ 
          borderBottom: '1px solid #e0e0e0', 
          paddingBottom: '4mm',
          marginBottom: '2mm',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ width: '35%', fontWeight: 600, paddingBottom: '2mm', verticalAlign: 'top' }}>Rapportnummer:</td>
                <td style={{ paddingBottom: '2mm', verticalAlign: 'top' }}>{extractSequentialNumber(report.report_number)}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, paddingBottom: '2mm', verticalAlign: 'top' }}>Voertuig:</td>
                <td style={{ paddingBottom: '2mm', verticalAlign: 'top' }}>{vehicleDisplay}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, paddingBottom: '2mm', verticalAlign: 'top' }}>Kenteken:</td>
                <td style={{ paddingBottom: '2mm', verticalAlign: 'top' }}>{report.license_plate || '–'}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600, verticalAlign: 'top' }}>Documentkenmerk:</td>
                <td style={{ verticalAlign: 'top' }}>{report.document_reference || '–'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Opdrachtgever Section */}
        <div style={{ 
          borderBottom: '1px solid #e0e0e0', 
          paddingBottom: '4mm',
          marginBottom: '2mm',
        }}>
          <p style={{ 
            fontSize: '10.5pt', 
            fontWeight: 600, 
            color: '#1a1a1a', 
            margin: '0 0 2mm 0',
          }}>
            Opdrachtgever:
          </p>
          <p style={{ margin: '0 0 1mm 0' }}>{customerName}</p>
          <p style={{ margin: '0 0 1mm 0' }}>{report.customer_street || '–'}</p>
          <p style={{ margin: 0 }}>
            {[report.customer_postcode, report.customer_city].filter(Boolean).join(' ') || '–'}
          </p>
        </div>

        {/* Inspectiegegevens Section */}
        <div style={{ 
          borderBottom: '1px solid #e0e0e0', 
          paddingBottom: '4mm',
          marginBottom: '2mm',
        }}>
          <p style={{ 
            fontSize: '10.5pt', 
            fontWeight: 600, 
            color: '#1a1a1a', 
            margin: '0 0 2mm 0',
          }}>
            Inspectiegegevens:
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              <tr>
                <td style={{ width: '35%', paddingBottom: '1mm', verticalAlign: 'top' }}>Opnamedatum:</td>
                <td style={{ paddingBottom: '1mm', verticalAlign: 'top' }}>{inspectionDate}</td>
              </tr>
              <tr>
                <td style={{ paddingBottom: '1mm', verticalAlign: 'top' }}>Aanvangstijd:</td>
                <td style={{ paddingBottom: '1mm', verticalAlign: 'top' }}>{startTime}</td>
              </tr>
              <tr>
                <td style={{ paddingBottom: '1mm', verticalAlign: 'top' }}>Eindtijd:</td>
                <td style={{ paddingBottom: '1mm', verticalAlign: 'top' }}>{endTime}</td>
              </tr>
              <tr>
                <td style={{ verticalAlign: 'top' }}>Plaats van opname:</td>
                <td style={{ verticalAlign: 'top' }}>{inspectionLocation}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Uitvoering Section */}
        <div style={{ marginBottom: '4mm' }}>
          <p style={{ 
            fontSize: '10.5pt', 
            fontWeight: 600, 
            color: '#1a1a1a', 
            margin: '0 0 2mm 0',
          }}>
            Rapport uitgevoerd door:
          </p>
          <p style={{ margin: '0 0 1mm 0', fontWeight: 500 }}>Erik Elderson</p>
          <p style={{ margin: '0 0 0.5mm 0', fontSize: '9.5pt', color: '#444444' }}>
            TMV Register-Taxateur (nr. 33106)
          </p>
          <p style={{ margin: 0, fontSize: '9.5pt', color: '#444444' }}>
            Register-Taxateur VRT (nr. 22-523-M)
          </p>
        </div>
      </div>

      {/* ===== FOOTER WITH LOGOS & COMPANY DETAILS ===== */}
      <div style={{ 
        borderTop: '1px solid #cccccc', 
        paddingTop: '5mm',
        marginTop: 'auto',
      }}>
        {/* Federation Logos */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          gap: '8mm',
          marginBottom: '4mm',
        }}>
          <img 
            crossOrigin="anonymous"
            src={logoTmv} 
            alt="TMV" 
            style={{ height: '12mm', width: 'auto' }}
          />
          <img 
            crossOrigin="anonymous"
            src={logoVrt} 
            alt="VRT" 
            style={{ height: '12mm', width: 'auto' }}
          />
          <img 
            crossOrigin="anonymous"
            src={logoFehac} 
            alt="FEHAC" 
            style={{ height: '12mm', width: 'auto' }}
          />
        </div>

        {/* Company Details */}
        <div style={{ textAlign: 'center', fontSize: '8.5pt', color: '#1a1a1a' }}>
          <p style={{ margin: '0 0 1mm 0', fontWeight: 600 }}>
            Automobiel Taxaties
          </p>
          <p style={{ margin: '0 0 0.5mm 0' }}>
            Leigraaf 160
          </p>
          <p style={{ margin: '0 0 2mm 0' }}>
            6651 GJ Druten
          </p>
          <p style={{ margin: '0 0 0.5mm 0' }}>
            KvK: 95549269
          </p>
          <p style={{ margin: '0 0 0.5mm 0' }}>
            IBAN: NL80RABO 0387915680
          </p>
          <p style={{ margin: '0 0 2mm 0' }}>
            BTW: NL003366178B93
          </p>
        </div>

        {/* Page Number */}
        <div style={{ textAlign: 'center', fontSize: '8pt', color: '#666666' }}>
          <p style={{ margin: 0 }}>
            Pagina 1 van {totalPages}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PDFCoverContent;
