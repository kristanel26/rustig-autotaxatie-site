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
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        boxSizing: 'border-box',
        fontSize: '10pt',
        color: '#1a1a1a',
        lineHeight: 1.55,
      }}
    >
      {/* ===== NO BACKGROUND - Clean white ===== */}

      {/* ===== MAIN CONTENT AREA ===== */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '20mm 22mm 18mm 28mm',
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
          marginBottom: '18mm',
        }}>
          <img 
            crossOrigin="anonymous"
            src={logoVrt} 
            alt="VRT" 
            style={{ height: '9.8mm', width: 'auto' }}
          />
          <img 
            crossOrigin="anonymous"
            src={logoHobeon} 
            alt="Hobéon" 
            style={{ height: '9.8mm', width: 'auto' }}
          />
          <img 
            crossOrigin="anonymous"
            src={logoTmv} 
            alt="TMV" 
            style={{ height: '9.8mm', width: 'auto' }}
          />
          <img 
            crossOrigin="anonymous"
            src={logoFehac} 
            alt="FEHAC" 
            style={{ height: '9.8mm', width: 'auto' }}
          />
        </div>

        {/* ===== MAIN TITLE ===== */}
        <div style={{ marginBottom: '16mm' }}>
          <h1 style={{ 
            fontSize: '26pt', 
            fontWeight: 700, 
            color: '#000000', 
            margin: 0,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}>
            Taxatierapport
          </h1>
          <p style={{ 
            fontSize: '10pt', 
            color: '#444444', 
            margin: '2mm 0 0 0',
            fontWeight: 400,
          }}>
            Volgens artikel 7:960 BW
          </p>
        </div>

        {/* ===== TWO COLUMN LAYOUT ===== */}
        <div style={{ 
          display: 'flex',
          flex: 1,
          gap: '12mm',
        }}>
          {/* ===== LEFT INFORMATION COLUMN ===== */}
          <div style={{ 
            flex: 1,
            maxWidth: '95mm',
            fontSize: '10pt',
            lineHeight: 1.6,
          }}>
            {/* Inzake */}
            <div style={{ marginBottom: '5mm' }}>
              <p style={{ 
                margin: 0, 
                fontWeight: 500, 
                color: '#333333',
                fontSize: '9pt',
                textTransform: 'uppercase',
                letterSpacing: '0.3px',
              }}>
                Inzake
              </p>
              <p style={{ 
                margin: '1mm 0 0 0', 
                fontWeight: 600,
                color: '#000000',
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
                color: '#333333',
                fontSize: '9pt',
                textTransform: 'uppercase',
                letterSpacing: '0.3px',
              }}>
                Kenteken
              </p>
              <p style={{ 
                margin: '1mm 0 0 0', 
                fontWeight: 600,
                color: '#000000',
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
                color: '#333333',
                fontSize: '9pt',
                textTransform: 'uppercase',
                letterSpacing: '0.3px',
              }}>
                Documentkenmerk
              </p>
              <p style={{ 
                margin: '1mm 0 0 0', 
                fontWeight: 600,
                color: '#000000',
                fontSize: '11pt',
              }}>
                {report.report_number || '–'}
              </p>
            </div>

            {/* In opdracht van */}
            <div style={{ marginBottom: '7mm' }}>
              <p style={{ 
                margin: 0, 
                fontWeight: 500, 
                color: '#333333',
                fontSize: '9pt',
                textTransform: 'uppercase',
                letterSpacing: '0.3px',
              }}>
                In opdracht van
              </p>
              <p style={{ 
                margin: '1mm 0 0 0', 
                fontWeight: 600,
                color: '#000000',
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

            {/* Separator */}
            <div style={{ 
              borderTop: '1px solid #d0d0d0', 
              margin: '7mm 0',
              width: '70mm',
            }} />

            {/* Opnamedatum */}
            <div style={{ marginBottom: '3.5mm' }}>
              <p style={{ 
                margin: 0, 
                fontWeight: 500, 
                color: '#333333',
                fontSize: '9pt',
                textTransform: 'uppercase',
                letterSpacing: '0.3px',
              }}>
                Opnamedatum
              </p>
              <p style={{ 
                margin: '1mm 0 0 0', 
                fontWeight: 600,
                color: '#000000',
                fontSize: '10pt',
              }}>
                {inspectionDate}
              </p>
            </div>

            {/* Tijden op één regel */}
            <div style={{ 
              display: 'flex', 
              gap: '10mm',
              marginBottom: '3.5mm',
            }}>
              <div>
                <p style={{ 
                  margin: 0, 
                  fontWeight: 500, 
                  color: '#333333',
                  fontSize: '9pt',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px',
                }}>
                  Aanvang
                </p>
                <p style={{ 
                  margin: '1mm 0 0 0', 
                  fontWeight: 600,
                  color: '#000000',
                  fontSize: '10pt',
                }}>
                  {startTime}
                </p>
              </div>
              <div>
                <p style={{ 
                  margin: 0, 
                  fontWeight: 500, 
                  color: '#333333',
                  fontSize: '9pt',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px',
                }}>
                  Einde
                </p>
                <p style={{ 
                  margin: '1mm 0 0 0', 
                  fontWeight: 600,
                  color: '#000000',
                  fontSize: '10pt',
                }}>
                  {endTime}
                </p>
              </div>
            </div>

            {/* Plaats */}
            <div style={{ marginBottom: '7mm' }}>
              <p style={{ 
                margin: 0, 
                fontWeight: 500, 
                color: '#333333',
                fontSize: '9pt',
                textTransform: 'uppercase',
                letterSpacing: '0.3px',
              }}>
                Plaats van opname
              </p>
              <p style={{ 
                margin: '1mm 0 0 0', 
                fontWeight: 600,
                color: '#000000',
                fontSize: '10pt',
              }}>
                {inspectionLocation}
              </p>
            </div>

            {/* Separator */}
            <div style={{ 
              borderTop: '1px solid #d0d0d0', 
              margin: '7mm 0',
              width: '70mm',
            }} />

             {/* Uitgevoerd door */}
             <div style={{ marginTop: '2mm' }}>
               <p style={{ 
                 margin: 0, 
                 fontWeight: 500, 
                 color: '#333333',
                 fontSize: '9pt',
                 textTransform: 'uppercase',
                 letterSpacing: '0.3px',
               }}>
                 Uitgevoerd door
               </p>
               <p style={{ 
                 margin: '2mm 0 0 0', 
                 fontWeight: 600,
                 color: '#000000',
                 fontSize: '11pt',
               }}>
                 Erik Elderson
               </p>
               <p style={{ 
                 margin: '2mm 0 0 0', 
                 color: '#1a1a1a',
                 fontSize: '9pt',
               }}>
                 TMV Register-Taxateur (nr. 33106)
               </p>
               <p style={{ 
                 margin: '1mm 0 0 0', 
                 color: '#1a1a1a',
                 fontSize: '9pt',
               }}>
                 Register-Taxateur VRT (nr. 22-523-M)
               </p>
               {/* Horizontal line AFTER text with 8-12mm whitespace */}
               <div style={{ 
                 borderTop: '1px solid #d0d0d0', 
                 margin: '10mm 0 0 0',
                 width: '70mm',
               }} />
             </div>
          </div>

          {/* ===== RIGHT: HORIZONTAL PHOTO FRAME (4:3) ===== */}
          <div style={{ 
            width: '62mm',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingTop: '0mm',
          }}>
            {coverPhoto ? (
              <div style={{
                width: '60mm',
                height: '45mm', // 4:3 landscape
                overflow: 'hidden',
                flexShrink: 0,
              }}>
                <img
                  crossOrigin="anonymous"
                  src={coverPhoto}
                  alt="Voertuig"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: coverRotation ? `rotate(${coverRotation}deg)` : undefined,
                  }}
                />
              </div>
            ) : (
              <div style={{
                width: '60mm',
                height: '45mm',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ 
                  color: '#888888', 
                  fontSize: '9pt',
                  fontStyle: 'italic',
                }}>
                  Geen foto
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <div style={{ 
          borderTop: '1px solid #d0d0d0', 
          paddingTop: '8mm',
          marginTop: 'auto',
          paddingBottom: '18mm',
        }}>
          {/* Company Logo - left aligned with main text margin */}
          <img 
            crossOrigin="anonymous"
            src={logoAutomobiel} 
            alt="Automobiel Taxaties" 
            style={{ 
              maxWidth: '35mm', 
              height: 'auto',
              marginBottom: '3mm',
              display: 'block',
            }}
          />

          {/* Company Details - left aligned */}
          <div style={{ 
            fontSize: '7.5pt', 
            color: '#333333',
            lineHeight: 1.5,
          }}>
            <p style={{ margin: 0 }}>
              <span style={{ fontWeight: 600 }}>Automobiel Taxaties</span>
              <span style={{ margin: '0 2mm' }}>·</span>
              Leigraaf 160, 6651 GJ Druten
            </p>
            <p style={{ margin: '1mm 0 0 0' }}>
              KvK: 95549269
              <span style={{ margin: '0 2mm' }}>·</span>
              BTW: NL003366178B93
              <span style={{ margin: '0 2mm' }}>·</span>
              TMV: 33106
              <span style={{ margin: '0 2mm' }}>·</span>
              VRT: 22-523-M
            </p>
            <p style={{ margin: '1mm 0 0 0' }}>
              Bank: NL80 RABO 0387 9156 80
            </p>
          </div>

          {/* Page Number */}
          <div style={{ 
            marginTop: '5mm',
            fontSize: '8pt', 
            color: '#555555',
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
