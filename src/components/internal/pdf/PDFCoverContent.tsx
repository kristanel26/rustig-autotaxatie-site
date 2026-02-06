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
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (timeString: string | null) => {
    if (!timeString) return null;
    return timeString.slice(0, 5) + ' uur';
  };

  const capitalizeFirst = (str: string | null) => {
    if (!str) return null;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Build customer name
  const customerName = [report.customer_title, report.customer_initials, report.customer_last_name]
    .filter(Boolean)
    .join(' ') || null;

  // Customer address
  const customerAddress = report.customer_street || null;
  const customerCity = [report.customer_postcode, report.customer_city].filter(Boolean).join(' ') || null;

  // Vehicle display title
  const vehicleDisplay = report.vehicle_title || 
    [report.rdw_merk, report.rdw_handelsbenaming].filter(Boolean).join(' ') || 
    null;

  // Cover photo
  const coverPhoto = report.vehicle_photos && report.vehicle_photos.length > 0 
    ? report.vehicle_photos[0] 
    : null;
  
  const coverRotation = coverPhoto && report.vehicle_photo_rotations 
    ? report.vehicle_photo_rotations[coverPhoto] || 0 
    : 0;

  // Extract inspection data
  const inspectionDate = report.inspection_date ? formatDate(report.inspection_date) : null;
  const startTime = report.inspection_start_time ? formatTime(report.inspection_start_time) : null;
  const endTime = report.inspection_end_time ? formatTime(report.inspection_end_time) : null;
  const inspectionLocation = capitalizeFirst(report.inspection_location);

  // Typography styles
  const labelStyle: React.CSSProperties = {
    margin: 0,
    fontWeight: 500,
    color: '#000000',
    fontSize: '8pt',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  const valueStyle: React.CSSProperties = {
    margin: '1mm 0 0 0',
    fontWeight: 600,
    color: '#000000',
    fontSize: '11pt',
  };

  const valueSmallerStyle: React.CSSProperties = {
    margin: '0.5mm 0 0 0',
    fontWeight: 500,
    color: '#000000',
    fontSize: '10pt',
  };

  const blockSpacing = '9mm';

  return (
    <div 
      className="bg-white pdf-page"
      style={{
        width: '210mm',
        height: '297mm',
        position: 'relative',
        overflow: 'hidden',
        pageBreakAfter: 'always',
        fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
        boxSizing: 'border-box',
        fontSize: '10pt',
        color: '#1a1a1a',
        lineHeight: 1.5,
      }}
    >
      {/* Main content area with fixed margins */}
      <div
        style={{
          position: 'absolute',
          top: '20mm',
          left: '25mm',
          right: '20mm',
          bottom: '20mm',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ===== HEADER: FEDERATION LOGOS ===== */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: '5mm',
          marginBottom: '10mm',
        }}>
          <img 
            crossOrigin="anonymous"
            src={logoVrt} 
            alt="VRT" 
            style={{ height: '16mm', width: 'auto' }}
          />
          <img 
            crossOrigin="anonymous"
            src={logoHobeon} 
            alt="Hobéon" 
            style={{ height: '16mm', width: 'auto' }}
          />
          <img 
            crossOrigin="anonymous"
            src={logoTmv} 
            alt="TMV" 
            style={{ height: '16mm', width: 'auto' }}
          />
          <img 
            crossOrigin="anonymous"
            src={logoFehac} 
            alt="FEHAC" 
            style={{ height: '16mm', width: 'auto' }}
          />
        </div>

        {/* ===== TITLE BLOCK ===== */}
        <div style={{ marginBottom: '12mm' }}>
          <h1 style={{ 
            fontSize: '24pt', 
            fontWeight: 700, 
            color: '#000000', 
            margin: 0,
            letterSpacing: '0.3px',
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

        {/* ===== TWO-COLUMN CONTENT AREA ===== */}
        <div style={{ 
          display: 'flex',
          gap: '12mm',
          flex: 1,
          alignItems: 'flex-start',
        }}>
          {/* LEFT COLUMN: Data blocks */}
          <div style={{ 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Block 1: Rapportgegevens */}
            <div style={{ marginBottom: blockSpacing }}>
              <div style={{ marginBottom: '4mm' }}>
                <p style={labelStyle}>Inzake</p>
                <p style={valueStyle}>
                  {vehicleDisplay || 'nog niet ingevuld'}
                </p>
              </div>

              <div style={{ marginBottom: '4mm' }}>
                <p style={labelStyle}>Kenteken</p>
                <p style={valueStyle}>
                  {report.license_plate || 'nog niet ingevuld'}
                </p>
              </div>

              <div>
                <p style={labelStyle}>Documentkenmerk</p>
                <p style={valueStyle}>
                  {report.document_reference || 'nog niet ingevuld'}
                </p>
              </div>
            </div>

            {/* Block 2: Opdrachtgever */}
            <div style={{ marginBottom: blockSpacing }}>
              <p style={labelStyle}>In opdracht van</p>
              <p style={valueStyle}>
                {customerName || 'nog niet ingevuld'}
              </p>
              {customerAddress && (
                <p style={valueSmallerStyle}>{customerAddress}</p>
              )}
              {customerCity && (
                <p style={valueSmallerStyle}>{customerCity}</p>
              )}
            </div>

            {/* Block 3: Inspectiegegevens */}
            <div style={{ marginBottom: blockSpacing }}>
              <div style={{ marginBottom: '3mm' }}>
                <p style={labelStyle}>Opnamedatum</p>
                <p style={{ ...valueStyle, fontSize: '10pt' }}>
                  {inspectionDate || 'nog niet ingevuld'}
                </p>
              </div>

              <div style={{ marginBottom: '3mm' }}>
                <p style={labelStyle}>Aanvangstijd</p>
                <p style={{ ...valueStyle, fontSize: '10pt' }}>
                  {startTime || 'nog niet ingevuld'}
                </p>
              </div>

              <div style={{ marginBottom: '3mm' }}>
                <p style={labelStyle}>Eindtijd</p>
                <p style={{ ...valueStyle, fontSize: '10pt' }}>
                  {endTime || 'nog niet ingevuld'}
                </p>
              </div>

              <div>
                <p style={labelStyle}>Plaats van opname</p>
                <p style={{ ...valueStyle, fontSize: '10pt' }}>
                  {inspectionLocation || 'nog niet ingevuld'}
                </p>
              </div>
            </div>

            {/* Block 4: Uitgevoerd door */}
            <div>
              <p style={labelStyle}>Uitgevoerd door</p>
              <p style={valueStyle}>Erik Elderson</p>
              <p style={valueSmallerStyle}>TMV Register-Taxateur</p>
              <p style={valueSmallerStyle}>Register-Taxateur VRT</p>
            </div>
          </div>

          {/* RIGHT COLUMN: Vehicle photo */}
          <div style={{ 
            width: '280px',
            display: 'flex',
            alignItems: 'flex-start',
          }}>
            <div style={{
              width: '100%',
              aspectRatio: '4 / 3',
              overflow: 'hidden',
            }}>
              {coverPhoto ? (
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
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#f5f5f5',
                }} />
              )}
            </div>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <div style={{ 
          marginTop: 'auto',
          paddingTop: '10mm',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
            {/* Left: Logo + Company Details */}
            <div>
              <img 
                crossOrigin="anonymous"
                src={logoAutomobiel} 
                alt="Automobiel Taxaties" 
                style={{ 
                  height: '10mm',
                  width: 'auto',
                  marginBottom: '3mm',
                  display: 'block',
                }}
              />
              <div style={{ 
                fontSize: '8.5pt', 
                color: '#000000',
                lineHeight: 1.4,
                fontWeight: 500,
              }}>
                <p style={{ margin: 0, fontWeight: 500 }}>
                  Automobiel Taxaties
                </p>
                <p style={{ margin: '0.5mm 0 0 0' }}>
                  Leigraaf 160, 6651 GJ Druten
                </p>
                <p style={{ margin: '0.5mm 0 0 0' }}>
                  KvK: 95549269 · BTW: NL003366178B93
                </p>
                <p style={{ margin: '0.5mm 0 0 0' }}>
                  TMV: 33106 · VRT: 22-523-M
                </p>
                <p style={{ margin: '0.5mm 0 0 0' }}>
                  Bank: NL80 RABO 0387 9156 80
                </p>
              </div>
            </div>

            {/* Right: Page Number */}
            <p style={{ 
              fontSize: '8.5pt', 
              color: '#1a1a1a',
              margin: 0,
            }}>
              Pagina 1 van {totalPages}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFCoverContent;
