import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';

interface PhotoRotations {
  [url: string]: number;
}

interface Report {
  id: string;
  report_number: string;
  document_reference: string | null;
  customer_title: string | null;
  customer_initials: string | null;
  customer_last_name: string | null;
  customer_street: string | null;
  customer_postcode: string | null;
  customer_city: string | null;
  license_plate: string | null;
  vehicle_title: string | null;
  opbouw_merk: string | null;
  opbouw_type: string | null;
  inspection_location: string | null;
  inspection_date: string | null;
  inspection_start_time: string | null;
  inspection_end_time: string | null;
  vehicle_photos: string[] | null;
  vehicle_photo_rotations: PhotoRotations | null;
  report_type: string | null;
  rdw_merk: string | null;
  rdw_handelsbenaming: string | null;
  vin: string | null;
}

interface PDFCoverContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: any;
}

// Helper to extract sequential number from report_number
const extractSequentialNumber = (reportNumber: string | null): string => {
  if (!reportNumber) return '–';
  // If it's a DRAFT number, show as-is
  if (reportNumber.startsWith('DRAFT')) return reportNumber;
  // Extract the last numeric part (e.g., "KLS-2026-001" -> "001", or just "3722" -> "3722")
  const match = reportNumber.match(/(\d+)$/);
  if (match) return match[1];
  return reportNumber;
};

// Helper to get meldcode (last 4 chars of VIN)
const getMeldcode = (vin: string | null): string | null => {
  if (!vin || vin.length < 4) return null;
  return vin.slice(-4).toUpperCase();
};

const PDFCoverContent = ({ report }: PDFCoverContentProps) => {
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
        position: 'relative',
        overflow: 'hidden',
        pageBreakAfter: 'always',
        fontFamily: '"Source Sans Pro", "Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      {/* Left Column - 50% text content */}
      <div 
        style={{
          width: '50%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '25mm 20mm 20mm 25mm',
          boxSizing: 'border-box',
          backgroundColor: 'white',
        }}
      >
        {/* Main Content */}
        <div>
          {/* Header - Company name */}
          <div style={{ marginBottom: '8mm' }}>
            <h2 style={{ 
              fontSize: '18pt', 
              fontWeight: 600, 
              color: '#1a1a1a', 
              margin: 0,
              letterSpacing: '-0.01em',
            }}>
              Automobiel Taxaties
            </h2>
            <p style={{ 
              fontSize: '10pt', 
              color: '#666666', 
              margin: '2mm 0 0 0',
              fontWeight: 400,
            }}>
              Automobiel taxaties
            </p>
          </div>

          {/* Title Block */}
          <div style={{ marginBottom: '10mm' }}>
            <h1 style={{ 
              fontSize: '22pt', 
              fontWeight: 600, 
              color: '#000000', 
              margin: 0,
              letterSpacing: '-0.02em',
            }}>
              Taxatierapport
            </h1>
          </div>

          {/* Information Blocks */}
          <div style={{ marginBottom: '8mm' }}>
            <p style={{ fontSize: '11pt', color: '#666666', fontWeight: 500, margin: '0 0 1mm 0' }}>
              Object
            </p>
            <p style={{ fontSize: '12pt', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>
              {vehicleDisplay}
            </p>
          </div>

          {report.rdw_merk && (
            <div style={{ marginBottom: '6mm' }}>
              <p style={{ fontSize: '11pt', color: '#666666', fontWeight: 500, margin: '0 0 1mm 0' }}>
                Merk
              </p>
              <p style={{ fontSize: '12pt', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>
                {report.rdw_merk}
              </p>
            </div>
          )}

          {report.rdw_handelsbenaming && (
            <div style={{ marginBottom: '6mm' }}>
              <p style={{ fontSize: '11pt', color: '#666666', fontWeight: 500, margin: '0 0 1mm 0' }}>
                Model
              </p>
              <p style={{ fontSize: '12pt', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>
                {report.rdw_handelsbenaming}
              </p>
            </div>
          )}

          {meldcode && (
            <div style={{ marginBottom: '6mm' }}>
              <p style={{ fontSize: '11pt', color: '#666666', fontWeight: 500, margin: '0 0 1mm 0' }}>
                Meldcode
              </p>
              <p style={{ fontSize: '12pt', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>
                {meldcode}
              </p>
            </div>
          )}

          {/* Opdrachtgever */}
          <div style={{ marginBottom: '8mm', marginTop: '4mm' }}>
            <p style={{ fontSize: '11pt', color: '#666666', fontWeight: 500, margin: '0 0 1mm 0' }}>
              Opdrachtgever
            </p>
            <p style={{ fontSize: '12pt', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>
              {customerName}
            </p>
            {report.customer_street && (
              <p style={{ fontSize: '11pt', fontWeight: 500, color: '#1a1a1a', margin: '1mm 0 0 0' }}>
                {report.customer_street}
              </p>
            )}
            {(report.customer_postcode || report.customer_city) && (
              <p style={{ fontSize: '11pt', fontWeight: 500, color: '#1a1a1a', margin: '1mm 0 0 0' }}>
                {[report.customer_postcode, report.customer_city].filter(Boolean).join(' ')}
              </p>
            )}
          </div>

          {/* Rapportnummer */}
          <div style={{ marginBottom: '8mm' }}>
            <p style={{ fontSize: '11pt', color: '#666666', fontWeight: 500, margin: '0 0 1mm 0' }}>
              Rapportnummer
            </p>
            <p style={{ fontSize: '12pt', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>
              {extractSequentialNumber(report.report_number)}
            </p>
          </div>

          {/* Inspection Details */}
          <div style={{ marginTop: '6mm' }}>
            <p style={{ fontSize: '10.5pt', lineHeight: 1.7, margin: '2mm 0', color: '#1a1a1a' }}>
              <span style={{ fontWeight: 500, color: '#666666' }}>Opnamedatum:</span>{' '}
              <span style={{ fontWeight: 600 }}>{formatDate(report.inspection_date)}</span>
            </p>
            <p style={{ fontSize: '10.5pt', lineHeight: 1.7, margin: '2mm 0', color: '#1a1a1a' }}>
              <span style={{ fontWeight: 500, color: '#666666' }}>Aanvang opname:</span>{' '}
              <span style={{ fontWeight: 600 }}>{formatTime(report.inspection_start_time)}</span>
            </p>
            <p style={{ fontSize: '10.5pt', lineHeight: 1.7, margin: '2mm 0', color: '#1a1a1a' }}>
              <span style={{ fontWeight: 500, color: '#666666' }}>Eindtijd opname:</span>{' '}
              <span style={{ fontWeight: 600 }}>{formatTime(report.inspection_end_time)}</span>
            </p>
            <p style={{ fontSize: '10.5pt', lineHeight: 1.7, margin: '2mm 0', color: '#1a1a1a' }}>
              <span style={{ fontWeight: 500, color: '#666666' }}>Plaats:</span>{' '}
              <span style={{ fontWeight: 600 }}>Druten</span>
            </p>
          </div>

          {/* Taxateur Signature */}
          <div style={{ marginTop: '10mm' }}>
            <p style={{ fontSize: '12pt', fontWeight: 600, color: '#1a1a1a', margin: 0 }}>
              Erik Elderson
            </p>
            <p style={{ fontSize: '10.5pt', color: '#666666', fontWeight: 500, margin: '2mm 0 0 0' }}>
              Register-taxateur VRT / TMV
            </p>
          </div>
        </div>

        {/* Footer - Company Details */}
        <div style={{ 
          borderTop: '1px solid #e5e5e5', 
          paddingTop: '4mm',
          marginTop: 'auto',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '4mm' }}>
            <img 
              crossOrigin="anonymous"
              src={logoAutomobiel} 
              alt="Automobiel Taxaties" 
              style={{ height: '12mm', width: 'auto', flexShrink: 0 }}
            />
            <div style={{ fontSize: '8.5pt', color: '#666666', lineHeight: 1.6 }}>
              <p style={{ margin: 0 }}>
                <span style={{ fontWeight: 600, color: '#1a1a1a' }}>Automobiel Taxaties</span>
              </p>
              <p style={{ margin: '1mm 0 0 0' }}>
                Leigraaf 160, 6651 GJ Druten
              </p>
              <p style={{ margin: '1mm 0 0 0' }}>
                KvK: 95549269 | IBAN: NL80RABO0387915680 | BTW: NL003366178B93
              </p>
            </div>
          </div>
          <p style={{ 
            fontSize: '9pt', 
            color: '#999999', 
            margin: '4mm 0 0 0',
            textAlign: 'left',
          }}>
            Pagina 1 van X
          </p>
        </div>
      </div>

      {/* Right Column - 50% - Vehicle Photo */}
      <div 
        style={{
          width: '50%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '25mm 20mm 20mm 10mm',
          boxSizing: 'border-box',
          backgroundColor: 'white',
        }}
      >
        {/* Fixed photo frame: approx 90x60mm, centered */}
        <div style={{
          width: '90mm',
          height: '60mm',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: coverPhoto ? 'none' : '1px solid #e5e5e5',
          backgroundColor: '#fafafa',
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
    </div>
  );
};

export default PDFCoverContent;
