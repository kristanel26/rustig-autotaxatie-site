import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';

interface PhotoRotations {
  [url: string]: number;
}

interface PDFCoverContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: any;
  totalPages?: number;
}

// Helper to extract sequential number from report_number
const extractSequentialNumber = (reportNumber: string | null): string => {
  if (!reportNumber) return '–';
  if (reportNumber.startsWith('DRAFT')) return reportNumber;
  const match = reportNumber.match(/(\d+)$/);
  if (match) return match[1];
  return reportNumber;
};

// Helper to get meldcode (last 4 chars of VIN)
const getMeldcode = (vin: string | null): string | null => {
  if (!vin || vin.length < 4) return null;
  return vin.slice(-4).toUpperCase();
};

const PDFCoverContent = ({ report, totalPages = 1 }: PDFCoverContentProps) => {
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

  // Build customer name - format: "Dhr. J.P. Janssen"
  const customerName = [report.customer_title, report.customer_initials, report.customer_last_name]
    .filter(Boolean)
    .join(' ') || '–';

  // Cover photo is first image from vehicle_photos array
  const coverPhoto = report.vehicle_photos && report.vehicle_photos.length > 0 
    ? report.vehicle_photos[0] 
    : null;
  
  // Get rotation for cover photo
  const coverRotation = coverPhoto && report.vehicle_photo_rotations 
    ? report.vehicle_photo_rotations[coverPhoto] || 0 
    : 0;

  // Get meldcode from VIN
  const meldcode = getMeldcode(report.vin);

  // Build vehicle display from RDW data or vehicle_title
  const vehicleDisplay = report.vehicle_title || 
    [report.rdw_merk, report.rdw_handelsbenaming].filter(Boolean).join(' ') || 
    '–';

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
        fontFamily: '"Source Sans Pro", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
        padding: '25mm',
        boxSizing: 'border-box',
      }}
    >
      {/* Header Section - Logo & Title (centered) */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '15mm',
      }}>
        {/* Company Logo */}
        <img 
          crossOrigin="anonymous"
          src={logoAutomobiel} 
          alt="Automobiel Taxaties" 
          style={{ 
            maxWidth: '60mm', 
            height: 'auto',
            marginBottom: '8mm',
          }}
        />
        
        {/* Main Title */}
        <h1 style={{ 
          fontSize: '24pt', 
          fontWeight: 600, 
          color: '#1a1a1a', 
          margin: '0 0 2mm 0',
          letterSpacing: '-0.02em',
        }}>
          Taxatierapport
        </h1>
        
        {/* Subtitle - legal reference */}
        <p style={{ 
          fontSize: '10pt', 
          color: '#666666', 
          margin: 0,
          fontWeight: 400,
        }}>
          Volgens artikel 7:960 BW
        </p>
      </div>

      {/* Vehicle Photo Section (centered, fixed frame) */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '12mm',
      }}>
        <div style={{
          width: '60mm',
          height: '40mm',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #e0e0e0',
          backgroundColor: '#ffffff',
          overflow: 'hidden',
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
          ) : null}
        </div>
      </div>

      {/* Report Information Block (left-aligned, two-column style) */}
      <div style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '6mm',
      }}>
        {/* Object */}
        <div>
          <p style={{ 
            fontSize: '9.5pt', 
            fontWeight: 600, 
            color: '#555555', 
            margin: '0 0 1mm 0',
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
          }}>
            Object
          </p>
          <p style={{ 
            fontSize: '11pt', 
            fontWeight: 500, 
            color: '#1a1a1a', 
            margin: 0,
            lineHeight: 1.4,
          }}>
            {vehicleDisplay}
          </p>
          {report.license_plate && (
            <p style={{ 
              fontSize: '10pt', 
              fontWeight: 400, 
              color: '#333333', 
              margin: '1mm 0 0 0',
            }}>
              Kenteken: {report.license_plate}
            </p>
          )}
          {meldcode && (
            <p style={{ 
              fontSize: '10pt', 
              fontWeight: 400, 
              color: '#333333', 
              margin: '1mm 0 0 0',
            }}>
              Meldcode: {meldcode}
            </p>
          )}
        </div>

        {/* Opdrachtgever */}
        <div>
          <p style={{ 
            fontSize: '9.5pt', 
            fontWeight: 600, 
            color: '#555555', 
            margin: '0 0 1mm 0',
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
          }}>
            Opdrachtgever
          </p>
          <p style={{ 
            fontSize: '11pt', 
            fontWeight: 500, 
            color: '#1a1a1a', 
            margin: 0,
          }}>
            {customerName}
          </p>
          {report.customer_street && (
            <p style={{ 
              fontSize: '10pt', 
              fontWeight: 400, 
              color: '#333333', 
              margin: '1mm 0 0 0',
            }}>
              {report.customer_street}
            </p>
          )}
          {(report.customer_postcode || report.customer_city) && (
            <p style={{ 
              fontSize: '10pt', 
              fontWeight: 400, 
              color: '#333333', 
              margin: '1mm 0 0 0',
            }}>
              {[report.customer_postcode, report.customer_city].filter(Boolean).join(' ')}
            </p>
          )}
        </div>

        {/* Rapportnummer & Documentkenmerk */}
        <div style={{ display: 'flex', gap: '15mm' }}>
          <div>
            <p style={{ 
              fontSize: '9.5pt', 
              fontWeight: 600, 
              color: '#555555', 
              margin: '0 0 1mm 0',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
            }}>
              Rapportnummer
            </p>
            <p style={{ 
              fontSize: '11pt', 
              fontWeight: 500, 
              color: '#1a1a1a', 
              margin: 0,
            }}>
              {extractSequentialNumber(report.report_number)}
            </p>
          </div>
          {report.document_reference && (
            <div>
              <p style={{ 
                fontSize: '9.5pt', 
                fontWeight: 600, 
                color: '#555555', 
                margin: '0 0 1mm 0',
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
              }}>
                Documentkenmerk
              </p>
              <p style={{ 
                fontSize: '11pt', 
                fontWeight: 500, 
                color: '#1a1a1a', 
                margin: 0,
              }}>
                {report.document_reference}
              </p>
            </div>
          )}
        </div>

        {/* Inspection Details */}
        <div>
          <p style={{ 
            fontSize: '9.5pt', 
            fontWeight: 600, 
            color: '#555555', 
            margin: '0 0 2mm 0',
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
          }}>
            Opname
          </p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'auto 1fr', 
            gap: '1mm 8mm',
            fontSize: '10pt',
            lineHeight: 1.6,
          }}>
            <span style={{ color: '#555555' }}>Datum:</span>
            <span style={{ color: '#1a1a1a', fontWeight: 500 }}>{formatDate(report.inspection_date)}</span>
            
            <span style={{ color: '#555555' }}>Aanvang:</span>
            <span style={{ color: '#1a1a1a', fontWeight: 500 }}>{formatTime(report.inspection_start_time)}</span>
            
            <span style={{ color: '#555555' }}>Eindtijd:</span>
            <span style={{ color: '#1a1a1a', fontWeight: 500 }}>{formatTime(report.inspection_end_time)}</span>
            
            <span style={{ color: '#555555' }}>Plaats:</span>
            <span style={{ color: '#1a1a1a', fontWeight: 500 }}>Druten</span>
          </div>
        </div>

        {/* Taxateur */}
        <div style={{ marginTop: '4mm' }}>
          <p style={{ 
            fontSize: '9.5pt', 
            fontWeight: 600, 
            color: '#555555', 
            margin: '0 0 1mm 0',
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
          }}>
            Taxateur
          </p>
          <p style={{ 
            fontSize: '11pt', 
            fontWeight: 600, 
            color: '#1a1a1a', 
            margin: 0,
          }}>
            Erik Elderson
          </p>
          <p style={{ 
            fontSize: '10pt', 
            color: '#555555', 
            fontWeight: 400, 
            margin: '1mm 0 0 0',
          }}>
            Register-taxateur VRT / TMV
          </p>
        </div>
      </div>

      {/* Footer - Company Details & Page Number */}
      <div style={{ 
        borderTop: '1px solid #e5e5e5', 
        paddingTop: '5mm',
        marginTop: 'auto',
        textAlign: 'center',
      }}>
        <p style={{ 
          fontSize: '10pt', 
          fontWeight: 600, 
          color: '#1a1a1a', 
          margin: '0 0 1mm 0',
        }}>
          Automobiel Taxaties
        </p>
        <p style={{ 
          fontSize: '9pt', 
          color: '#555555', 
          margin: '0 0 1mm 0',
          lineHeight: 1.5,
        }}>
          Leigraaf 160, 6651 GJ Druten
        </p>
        <p style={{ 
          fontSize: '8.5pt', 
          color: '#666666', 
          margin: '0 0 3mm 0',
        }}>
          KvK: 95549269 &nbsp;|&nbsp; IBAN: NL80RABO0387915680 &nbsp;|&nbsp; BTW: NL003366178B93
        </p>
        <p style={{ 
          fontSize: '9pt', 
          color: '#888888', 
          margin: 0,
        }}>
          Pagina 1 van {totalPages}
        </p>
      </div>
    </div>
  );
};

export default PDFCoverContent;
