import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Logos
import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';

interface PhotoRotations {
  [url: string]: number;
}

interface Report {
  id: string;
  document_reference: string | null;
  vehicle_photos: string[] | null;
  vehicle_photo_rotations: PhotoRotations | null;
}

const PDFPhotos = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('reports')
          .select('id, document_reference, vehicle_photos, vehicle_photo_rotations')
          .eq('id', id)
          .maybeSingle();

        if (error) throw error;
        setReport(data as Report);
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Get all photos except cover photo (index 0)
  const detailPhotos = report?.vehicle_photos?.slice(1) || [];
  const rotations = report?.vehicle_photo_rotations || {};

  // Helper to get rotation for a photo
  const getRotation = (url: string): number => rotations[url] || 0;

  // Don't render if no detail photos
  if (!report || detailPhotos.length === 0) {
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
          className="bg-white font-sans"
          style={{
            width: '210mm',
            minHeight: '297mm',
            padding: '18px 20px',
            boxSizing: 'border-box',
            position: 'relative',
            pageBreakAfter: pageIndex < pages.length - 1 ? 'always' : 'auto',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h1 style={{ fontSize: '16px', fontWeight: 600, color: '#000000', margin: 0, textTransform: 'uppercase' }}>
                FOTOBIJLAGE
              </h1>
              <p style={{ fontSize: '9px', color: '#000000', margin: '2px 0 0 0' }}>
                Documentkenmerk: {report.document_reference || '-'}
              </p>
            </div>
            <img src={logoAutomobiel} alt="Automobiel Taxaties" style={{ height: '32px', width: 'auto' }} />
          </div>

          {/* Photo Grid - 2 columns x 3 rows */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)', 
            gap: '12px',
            marginBottom: '20px',
          }}>
            {pagePhotos.map((photo, photoIndex) => (
              <div 
                key={photoIndex}
                style={{
                  aspectRatio: '4/3',
                  overflow: 'hidden',
                  borderRadius: '4px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: '#f8fafc',
                }}
              >
                <img
                  src={photo}
                  alt={`Voertuigfoto ${(pageIndex * photosPerPage) + photoIndex + 2}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: getRotation(photo) ? `rotate(${getRotation(photo)}deg)` : undefined,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ 
            position: 'absolute', 
            bottom: '14px', 
            left: '20px', 
            right: '20px',
            borderTop: '1px solid #e2e8f0', 
            paddingTop: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '8px', color: '#000000' }}>
              <span style={{ fontWeight: 600 }}>Automobiel Taxaties</span>
              <span style={{ margin: '0 4px' }}>|</span>
              Leigraaf 160, 6651 GJ Druten
              <span style={{ margin: '0 4px' }}>|</span>
              KVK: 95549269
            </div>
            <div style={{ fontSize: '8px', color: '#000000' }}>
              Fotobijlage {pageIndex + 1}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PDFPhotos;
