import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';
import logoVrt from '@/assets/logo-vrt.png';
import logoHobeon from '@/assets/logo-hobeon.webp';
import logoTmv from '@/assets/logo-tmv.png';
import logoFehac from '@/assets/logo-fehac.png';
import signatureErik from '@/assets/signature-erik-elderson.svg';

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

const PDFCoverContent = ({ report }: PDFCoverContentProps) => {
  const isKlassiekerReport = report.report_type === 'klassieker';
  
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

  const capitalizeFirst = (str: string | null) => {
    if (!str) return '–';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Build customer name - format: "DHR. J.P. JANSSEN"
  const customerName = [report.customer_title, report.customer_initials, report.customer_last_name]
    .filter(Boolean)
    .join(' ')
    .toUpperCase() || '–';

  // Use vehicle_title (taxateur vrij veld) for the main vehicle name
  const vehicleDisplay = report.vehicle_title?.toUpperCase() || '–';

  // Build opbouw display: [Opbouw merk] [Opbouw type]
  const opbouwDisplay = [report.opbouw_merk, report.opbouw_type]
    .filter(Boolean)
    .join(' ') || null;

  // Cover photo is first image from vehicle_photos array - only show if explicitly set
  const coverPhoto = report.vehicle_photos && report.vehicle_photos.length > 0 
    ? report.vehicle_photos[0] 
    : null;
  
  // Get rotation for cover photo
  const coverRotation = coverPhoto && report.vehicle_photo_rotations 
    ? report.vehicle_photo_rotations[coverPhoto] || 0 
    : 0;

  // For klassieker: use contain instead of cover to prevent distortion
  const photoObjectFit = isKlassiekerReport ? 'contain' : 'cover';

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
        fontFamily: 'Helvetica, Arial, sans-serif',
      }}
    >
      {/* Left Column - 45% */}
      <div 
        style={{
          width: '45%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '28px',
          boxSizing: 'border-box',
          backgroundColor: 'white',
        }}
      >
        {/* Content wrapper */}
        <div>
          {/* Register Logos - horizontal row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '36px' }}>
            <img crossOrigin="anonymous" src={logoVrt} alt="VRT" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
            <img crossOrigin="anonymous" src={logoHobeon} alt="Hobeon SKO" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
            <img crossOrigin="anonymous" src={logoTmv} alt="TMV" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
            <img crossOrigin="anonymous" src={logoFehac} alt="FEHAC" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
          </div>

          {/* Title Block */}
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{ fontSize: '30px', fontWeight: 600, letterSpacing: '-0.02em', color: '#000000', textTransform: 'uppercase', lineHeight: 1.1, margin: 0 }}>
              TAXATIERAPPORT
            </h1>
            <p style={{ fontSize: '14px', color: '#000000', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.5, margin: '6px 0 0 0' }}>
              Volgens artikel 7:960 BW
            </p>
          </div>

          {/* Inzake (Vehicle Title) - only show if we have data */}
          {report.vehicle_title && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '12px', color: '#000000', fontWeight: 500, lineHeight: 1.4, margin: 0 }}>
                Inzake:
              </p>
              <p style={{ fontSize: '20px', fontWeight: 600, textTransform: 'uppercase', color: '#000000', lineHeight: 1.3, margin: '4px 0 0 0' }}>
                {report.vehicle_title.toUpperCase()}
              </p>
            </div>
          )}

          {/* Kenteken - only show if we have data */}
          {report.license_plate && (
            <div style={{ marginBottom: '14px' }}>
              <p style={{ fontSize: '12px', color: '#000000', fontWeight: 500, lineHeight: 1.4, margin: 0 }}>
                Kenteken:
              </p>
              <p style={{ fontSize: '17px', fontWeight: 600, color: '#000000', lineHeight: 1.3, margin: '2px 0 0 0' }}>
                {report.license_plate}
              </p>
            </div>
          )}

          {/* Rapportnummer - show sequential number only */}
          {report.report_number && (
            <div style={{ marginBottom: '14px' }}>
              <p style={{ fontSize: '12px', color: '#000000', fontWeight: 500, lineHeight: 1.4, margin: 0 }}>
                Rapportnummer:
              </p>
              <p style={{ fontSize: '17px', fontWeight: 600, color: '#000000', lineHeight: 1.3, margin: '2px 0 0 0' }}>
                {extractSequentialNumber(report.report_number)}
              </p>
            </div>
          )}

          {/* Documentkenmerk - only show if we have data */}
          {report.document_reference && (
            <div style={{ marginBottom: '18px' }}>
              <p style={{ fontSize: '12px', color: '#000000', fontWeight: 500, lineHeight: 1.4, margin: 0 }}>
                Documentkenmerk:
              </p>
              <p style={{ fontSize: '17px', fontWeight: 600, color: '#000000', lineHeight: 1.3, margin: '2px 0 0 0' }}>
                {report.document_reference}
              </p>
            </div>
          )}

          {/* Opbouw merk + type (if available) */}
          {opbouwDisplay && (
            <div style={{ marginBottom: '22px' }}>
              <p style={{ fontSize: '15px', fontWeight: 600, color: '#000000', lineHeight: 1.4, margin: 0 }}>
                {opbouwDisplay}
              </p>
            </div>
          )}

          {/* In opdracht van */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '12px', color: '#000000', fontWeight: 500, lineHeight: 1.4, margin: '0 0 6px 0' }}>
              In opdracht van:
            </p>
            <p style={{ fontSize: '15px', fontWeight: 600, color: '#000000', lineHeight: 1.4, margin: 0 }}>
              {customerName}
            </p>
            {report.customer_street && (
              <p style={{ fontSize: '15px', fontWeight: 600, color: '#000000', lineHeight: 1.4, margin: 0 }}>
                {report.customer_street.toUpperCase()}
              </p>
            )}
            {(report.customer_postcode || report.customer_city) && (
              <p style={{ fontSize: '15px', fontWeight: 600, color: '#000000', lineHeight: 1.4, margin: 0 }}>
                {[report.customer_postcode, report.customer_city?.toUpperCase()].filter(Boolean).join(' ')}
              </p>
            )}
          </div>

          {/* Inspection Details */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '12px', lineHeight: 1.7, margin: '3px 0', color: '#000000' }}>
              <span style={{ fontWeight: 500 }}>Opnamedatum:</span>{' '}
              <span style={{ fontWeight: 600 }}>{formatDate(report.inspection_date)}</span>
            </p>
            <p style={{ fontSize: '12px', lineHeight: 1.7, margin: '3px 0', color: '#000000' }}>
              <span style={{ fontWeight: 500 }}>Aanvangstijd opname:</span>{' '}
              <span style={{ fontWeight: 600 }}>{formatTime(report.inspection_start_time)}</span>
            </p>
            <p style={{ fontSize: '12px', lineHeight: 1.7, margin: '3px 0', color: '#000000' }}>
              <span style={{ fontWeight: 500 }}>Eindtijd opname:</span>{' '}
              <span style={{ fontWeight: 600 }}>{formatTime(report.inspection_end_time)}</span>
            </p>
            <p style={{ fontSize: '12px', lineHeight: 1.7, margin: '3px 0', color: '#000000' }}>
              <span style={{ fontWeight: 500 }}>Plaats:</span>{' '}
              <span style={{ fontWeight: 600 }}>{capitalizeFirst(report.inspection_location)}</span>
            </p>
          </div>

          {/* Uitgevoerd door - Taxateur info */}
          <div>
            <p style={{ fontSize: '15px', fontWeight: 600, color: '#000000', lineHeight: 1.5, margin: 0 }}>
              Erik Elderson
            </p>
            <p style={{ fontSize: '12px', color: '#000000', fontWeight: 500, lineHeight: 1.5, margin: '3px 0' }}>
              Register-Taxateur VRT / TMV
            </p>
          </div>
        </div>

        {/* Footer with Company Details */}
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img 
              crossOrigin="anonymous"
              src={logoAutomobiel} 
              alt="Automobiel Taxaties" 
              style={{ height: '48px', width: 'auto', flexShrink: 0 }}
            />
            <div style={{ fontSize: '11px', color: '#000000', lineHeight: 1.6 }}>
              <span style={{ fontWeight: 600 }}>Automobiel Taxaties</span>
              <span style={{ margin: '0 4px' }}>|</span>
              <span>Leigraaf 160, 6651 GJ Druten</span>
              <span style={{ margin: '0 4px' }}>|</span>
              <span>KVK: 95549269</span>
              <span style={{ margin: '0 4px' }}>|</span>
              <span>BTW: NL003366178B93</span>
              <br />
              <span>TMV 33106</span>
              <span style={{ margin: '0 4px' }}>|</span>
              <span>VRT 22-523-M</span>
              <span style={{ margin: '0 4px' }}>|</span>
              <span>Bank: NL80RABO 0387915680</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - 55% - Vehicle Photo */}
      <div 
        style={{
          width: '55%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8fafc',
        }}
      >
        {coverPhoto ? (
          <img
            crossOrigin="anonymous"
            src={coverPhoto}
            alt="Voertuig"
            style={{
              width: '100%',
              height: '100%',
              objectFit: photoObjectFit as 'contain' | 'cover',
              transform: coverRotation ? `rotate(${coverRotation}deg)` : undefined,
            }}
          />
        ) : (
          /* Als geen voorbladfoto is geselecteerd: géén foto tonen - toon lege grijze ruimte */
          <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#f8fafc',
          }} />
        )}
      </div>
    </div>
  );
};

export default PDFCoverContent;
