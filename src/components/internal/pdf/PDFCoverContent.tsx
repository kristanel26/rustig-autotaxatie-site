import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';

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

  // Get meldcode (last 4 chars of VIN)
  const getMeldcode = (vin: string | null): string | null => {
    if (!vin || vin.length < 4) return null;
    return vin.slice(-4).toUpperCase();
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

  const meldcode = getMeldcode(report.vin);

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
        padding: '25mm',
        boxSizing: 'border-box',
        fontSize: '10.5pt',
        color: '#1a1a1a',
        lineHeight: 1.4,
      }}
    >
      {/* ===== HEADER: LOGO & TITLE (CENTERED) ===== */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '12mm',
      }}>
        {/* Logo */}
        <img 
          crossOrigin="anonymous"
          src={logoAutomobiel} 
          alt="Automobiel Taxaties" 
          style={{ 
            maxWidth: '60mm', 
            height: 'auto',
            marginBottom: '6mm',
          }}
        />
        
        {/* Title */}
        <h1 style={{ 
          fontSize: '18pt', 
          fontWeight: 600, 
          color: '#000000', 
          margin: '0 0 2mm 0',
          letterSpacing: '0',
        }}>
          Taxatierapport
        </h1>
        
        {/* Subtitle */}
        <p style={{ 
          fontSize: '9.5pt', 
          color: '#555555', 
          margin: 0,
          fontWeight: 400,
        }}>
          Volgens artikel 7:960 BW
        </p>
      </div>

      {/* ===== VEHICLE PHOTO FRAME (CENTERED) ===== */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        marginBottom: '10mm',
      }}>
        <div style={{
          width: '60mm',
          height: '40mm',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #d0d0d0',
          backgroundColor: '#ffffff',
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
          ) : null}
        </div>
      </div>

      {/* ===== REPORT INFORMATION BLOCK (LEFT-ALIGNED) ===== */}
      <div style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '6mm',
        fontSize: '10.5pt',
        lineHeight: 1.4,
      }}>
        
        {/* Inzake (Object) */}
        <div>
          <p style={{ 
            fontSize: '10.5pt', 
            fontWeight: 600, 
            color: '#1a1a1a', 
            margin: '0 0 0.5mm 0',
          }}>
            Inzake:
          </p>
          <p style={{ 
            fontSize: '10.5pt', 
            fontWeight: 400, 
            color: '#1a1a1a', 
            margin: 0,
          }}>
            {vehicleDisplay}
          </p>
        </div>

        {/* Kenteken */}
         <div>
            <p style={{ 
              fontSize: '10.5pt', 
              fontWeight: 600, 
              color: '#1a1a1a', 
              margin: '0 0 0.5mm 0',
            }}>
              Kenteken:
            </p>
            <p style={{ 
              fontSize: '10.5pt', 
              fontWeight: 400, 
              color: '#1a1a1a', 
              margin: 0,
            }}>
              {report.license_plate || '–'}
            </p>
          </div>

        {/* Rapportnummer */}
        <div>
          <p style={{ 
            fontSize: '10.5pt', 
            fontWeight: 600, 
            color: '#1a1a1a', 
            margin: '0 0 0.5mm 0',
          }}>
            Rapportnummer:
          </p>
          <p style={{ 
            fontSize: '10.5pt', 
            fontWeight: 400, 
            color: '#1a1a1a', 
            margin: 0,
          }}>
            {extractSequentialNumber(report.report_number)}
          </p>
        </div>

         {/* Documentkenmerk */}
         <div>
            <p style={{ 
              fontSize: '10.5pt', 
              fontWeight: 600, 
              color: '#1a1a1a', 
              margin: '0 0 0.5mm 0',
            }}>
              Documentkenmerk:
            </p>
            <p style={{ 
              fontSize: '10.5pt', 
              fontWeight: 400, 
              color: '#1a1a1a', 
              margin: 0,
            }}>
              {report.document_reference || '–'}
            </p>
          </div>

         {/* In opdracht van (Customer) */}
         <div>
           <p style={{ 
             fontSize: '10.5pt', 
             fontWeight: 600, 
             color: '#1a1a1a', 
             margin: '0 0 0.5mm 0',
           }}>
             In opdracht van:
           </p>
           <p style={{ 
             fontSize: '10.5pt', 
             fontWeight: 400, 
             color: '#1a1a1a', 
             margin: '0 0 0.5mm 0',
           }}>
             {customerName}
           </p>
           <p style={{ 
             fontSize: '10.5pt', 
             fontWeight: 400, 
             color: '#1a1a1a', 
             margin: '0 0 0.5mm 0',
           }}>
             {report.customer_street || '–'}
           </p>
           <p style={{ 
             fontSize: '10.5pt', 
             fontWeight: 400, 
             color: '#1a1a1a', 
             margin: 0,
           }}>
             {[report.customer_postcode, report.customer_city].filter(Boolean).join(' ') || '–'}
           </p>
         </div>

        {/* Inspection Data (Mandatory block) */}
        <div style={{ marginTop: '2mm' }}>
          <div style={{ marginBottom: '0.5mm' }}>
            <p style={{ 
              fontSize: '10.5pt', 
              fontWeight: 600, 
              color: '#1a1a1a', 
              margin: '0 0 0.5mm 0',
            }}>
              Opnamedatum:
            </p>
            <p style={{ 
              fontSize: '10.5pt', 
              fontWeight: 400, 
              color: '#1a1a1a', 
              margin: 0,
            }}>
              {inspectionDate}
            </p>
          </div>

          <div style={{ marginBottom: '0.5mm' }}>
            <p style={{ 
              fontSize: '10.5pt', 
              fontWeight: 600, 
              color: '#1a1a1a', 
              margin: '0 0 0.5mm 0',
            }}>
              Aanvangstijd:
            </p>
            <p style={{ 
              fontSize: '10.5pt', 
              fontWeight: 400, 
              color: '#1a1a1a', 
              margin: 0,
            }}>
              {startTime}
            </p>
          </div>

          <div style={{ marginBottom: '0.5mm' }}>
            <p style={{ 
              fontSize: '10.5pt', 
              fontWeight: 600, 
              color: '#1a1a1a', 
              margin: '0 0 0.5mm 0',
            }}>
              Eindtijd:
            </p>
            <p style={{ 
              fontSize: '10.5pt', 
              fontWeight: 400, 
              color: '#1a1a1a', 
              margin: 0,
            }}>
              {endTime}
            </p>
          </div>

          <div>
            <p style={{ 
              fontSize: '10.5pt', 
              fontWeight: 600, 
              color: '#1a1a1a', 
              margin: '0 0 0.5mm 0',
            }}>
              Plaats:
            </p>
            <p style={{ 
              fontSize: '10.5pt', 
              fontWeight: 400, 
              color: '#1a1a1a', 
              margin: 0,
            }}>
              {inspectionLocation}
            </p>
          </div>
        </div>

         {/* Executed by / Taxateur block */}
         <div style={{ marginTop: '3mm', borderTop: '1px solid #d0d0d0', paddingTop: '3mm' }}>
           <p style={{ 
             fontSize: '10.5pt', 
             fontWeight: 600, 
             color: '#1a1a1a', 
             margin: '0 0 1mm 0',
           }}>
             Rapport uitgevoerd door:
           </p>
           <p style={{ 
             fontSize: '10.5pt', 
             fontWeight: 400, 
             color: '#1a1a1a', 
             margin: '0 0 0.5mm 0',
           }}>
             Erik Elderson
           </p>
           <p style={{ 
             fontSize: '9.5pt', 
             fontWeight: 400, 
             color: '#1a1a1a', 
             margin: '0 0 0.5mm 0',
           }}>
             TMV Register-Taxateur
           </p>
           <p style={{ 
             fontSize: '9.5pt', 
             fontWeight: 400, 
             color: '#1a1a1a', 
             margin: 0,
           }}>
             Register-Taxateur VRT
           </p>
         </div>
      </div>

       {/* ===== FOOTER (FIXED AT BOTTOM) ===== */}
       <div style={{ 
         borderTop: '1px solid #d0d0d0', 
         paddingTop: '5mm',
         marginTop: 'auto',
       }}>
         <div style={{ textAlign: 'center', fontSize: '8.5pt', color: '#1a1a1a', marginBottom: '3mm' }}>
           <p style={{ margin: '0 0 0.5mm 0', fontWeight: 600 }}>
             Automobiel Taxaties
           </p>
           <p style={{ margin: '0 0 0.5mm 0' }}>
             Leigraaf 160 | 6651 GJ Druten
           </p>
         </div>

         <div style={{ textAlign: 'center', fontSize: '7.5pt', color: '#1a1a1a', marginBottom: '2mm' }}>
           <p style={{ margin: '0 0 0.5mm 0' }}>
             KvK: 95549269
           </p>
           <p style={{ margin: '0 0 0.5mm 0' }}>
             BTW: NL003366178B93
           </p>
           <p style={{ margin: 0 }}>
             IBAN: NL80RABO 0387915680
           </p>
         </div>

         <div style={{ textAlign: 'center', fontSize: '7.5pt', color: '#1a1a1a' }}>
           <p style={{ margin: '0 0 0.5mm 0' }}>
             TMV: 33106 | VRT: 22-523-M
           </p>
           <p style={{ margin: 0, color: '#555555' }}>
             Pagina 1 van {totalPages}
           </p>
         </div>
       </div>
    </div>
  );
};

export default PDFCoverContent;
