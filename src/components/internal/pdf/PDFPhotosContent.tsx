import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';
import signatureErik from '@/assets/signature-erik-elderson.svg';

interface PhotoRotations {
  [url: string]: number;
}

interface Report {
  id: string;
  document_reference: string | null;
  vehicle_photos: string[] | null;
  vehicle_photo_rotations: PhotoRotations | null;
  report_type: string | null;
}

interface PDFPhotosContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: any;
  startPageNumber?: number;
  totalPages?: number;
}

const PDFPhotosContent = ({ report, startPageNumber = 4, totalPages = 10 }: PDFPhotosContentProps) => {
  // Get all photos including cover photo, filter out empty/blank URLs
  const detailPhotos = (report?.vehicle_photos || []).filter((url: string) => url && url.trim() !== '');
  const rotations = report?.vehicle_photo_rotations || {};

  // Helper to get rotation for a photo
  const getRotation = (url: string): number => rotations[url] || 0;

  // Don't render if no detail photos
  if (detailPhotos.length === 0) {
    return null;
  }

  // Split photos into pages (6 photos per page for a 2x3 grid)
  const photosPerPage = 6;
  const pages: string[][] = [];
  for (let i = 0; i < detailPhotos.length; i += photosPerPage) {
    pages.push(detailPhotos.slice(i, i + photosPerPage));
  }

  return (
    <>
      {pages.map((pagePhotos, pageIndex) => (
        <div 
          key={pageIndex}
          className="bg-white pdf-page"
          style={{
            width: '210mm',
            minHeight: '297mm',
            padding: '22px 24px',
            boxSizing: 'border-box',
            position: 'relative',
            pageBreakAfter: pageIndex < pages.length - 1 ? 'always' : undefined,
            fontFamily: 'Helvetica, Arial, sans-serif',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: 600, color: '#000000', margin: 0, textTransform: 'uppercase' }}>
                FOTOBIJLAGE
              </h1>
              <p style={{ fontSize: '10px', color: '#000000', margin: '4px 0 0 0' }}>
                Documentkenmerk: {report.document_reference || '–'}
              </p>
            </div>
            <img crossOrigin="anonymous" src={logoAutomobiel} alt="Automobiel Taxaties" style={{ height: '36px', width: 'auto' }} />
          </div>

          {/* Photo Grid - 2 columns x 3 rows */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '14px',
            marginBottom: '24px',
          }}>
            {pagePhotos.map((photo, photoIndex) => {
              const rotation = getRotation(photo);
              
              return (
                <div 
                  key={photoIndex}
                  style={{
                    aspectRatio: '4/3',
                    overflow: 'hidden',
                    borderRadius: '6px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#f8fafc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    crossOrigin="anonymous"
                    src={photo}
                    alt={`Voertuigfoto ${(pageIndex * photosPerPage) + photoIndex + 2}`}
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain', // Never stretch, preserve aspect ratio
                      transform: rotation ? `rotate(${rotation}deg)` : undefined,
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Footer with paraaf */}
          <div style={{ 
            position: 'absolute', 
            bottom: '18px', 
            left: '24px', 
            right: '24px',
            borderTop: '1px solid #e2e8f0', 
            paddingTop: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '9px', color: '#000000' }}>
              <span style={{ fontWeight: 600 }}>Automobiel Taxaties</span>
              <span style={{ margin: '0 4px' }}>|</span>
              Leigraaf 160, 6651 GJ Druten
              <span style={{ margin: '0 4px' }}>|</span>
              KVK: 95549269
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
              <div style={{ fontSize: '9px', color: '#000000', fontWeight: 500 }}>
                Fotobijlage {pageIndex + 1}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '8px', fontWeight: 500, color: '#000000' }}>Paraaf</span>
                <img crossOrigin="anonymous" src={signatureErik} alt="Paraaf" style={{ height: '14mm', width: 'auto' }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PDFPhotosContent;
