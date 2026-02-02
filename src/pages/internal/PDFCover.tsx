import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Logos
import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';
import logoVrt from '@/assets/logo-vrt.png';
import logoHobeon from '@/assets/logo-hobeon.webp';
import logoTmv from '@/assets/logo-tmv.png';
import logoFehac from '@/assets/logo-fehac.png';

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
  vehicle_brand: string | null;
  vehicle_model: string | null;
  inspection_location: string | null;
  inspection_date: string | null;
  inspection_start_time: string | null;
  inspection_end_time: string | null;
  vehicle_photos: string[] | null;
}

const PDFCover = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) {
        console.error('No report ID provided');
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('reports')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (error) throw error;
        setReport(data);
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (timeString: string | null) => {
    if (!timeString) return '-';
    return timeString.slice(0, 5) + ' u';
  };

  const capitalizeFirst = (str: string | null) => {
    if (!str) return '-';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-muted-foreground">Rapport niet gevonden.</p>
      </div>
    );
  }

  // Build customer name - format: "MW. M. HART"
  const customerName = [report.customer_title, report.customer_initials, report.customer_last_name]
    .filter(Boolean)
    .join(' ')
    .toUpperCase() || '-';

  // Build vehicle display
  const vehicleDisplay = [report.vehicle_brand, report.vehicle_model]
    .filter(Boolean)
    .join(' ')
    .toUpperCase() || '-';

  // Cover photo is first image from vehicle_photos array
  const coverPhoto = report.vehicle_photos && report.vehicle_photos.length > 0 
    ? report.vehicle_photos[0] 
    : null;

  return (
    <div 
      className="bg-white font-sans"
      style={{
        width: '210mm',
        height: '297mm',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
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
          padding: '24px',
          boxSizing: 'border-box',
          backgroundColor: 'white',
        }}
      >
        {/* Content wrapper */}
        <div>
          {/* Register Logos - horizontal row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <img src={logoVrt} alt="VRT" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
            <img src={logoHobeon} alt="Hobeon SKO" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
            <img src={logoTmv} alt="TMV" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
            <img src={logoFehac} alt="FEHAC" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
          </div>

          {/* Title Block */}
          <div style={{ marginBottom: '24px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: 600, letterSpacing: '-0.025em', color: '#1e293b', textTransform: 'uppercase', lineHeight: 1.1, margin: 0 }}>
              TAXATIERAPPORT
            </h1>
            <p style={{ fontSize: '14px', color: '#64748b', fontWeight: 400, lineHeight: 1.4, margin: '4px 0 0 0' }}>
              Volgens artikel 7:960 BW
            </p>
          </div>

          {/* Inzake (Vehicle) */}
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, lineHeight: 1.2, margin: 0 }}>
              Inzake
            </p>
            <p style={{ fontSize: '18px', fontWeight: 600, textTransform: 'uppercase', color: '#1e293b', lineHeight: 1.2, margin: '2px 0 0 0' }}>
              {vehicleDisplay}
            </p>
          </div>

          {/* Kenteken */}
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, lineHeight: 1.2, margin: 0 }}>
              Kenteken
            </p>
            <p style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', lineHeight: 1.2, margin: '2px 0 0 0' }}>
              {report.license_plate || '-'}
            </p>
          </div>

          {/* Documentkenmerk */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, lineHeight: 1.2, margin: 0 }}>
              Documentkenmerk
            </p>
            <p style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', lineHeight: 1.2, margin: '2px 0 0 0' }}>
              {report.document_reference || '-'}
            </p>
          </div>

          {/* In opdracht van */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, lineHeight: 1.2, margin: '0 0 4px 0' }}>
              In opdracht van
            </p>
            <p style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', lineHeight: 1.3, margin: 0 }}>
              {customerName}
            </p>
            {report.customer_street && (
              <p style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', lineHeight: 1.3, margin: 0 }}>
                {report.customer_street.toUpperCase()}
              </p>
            )}
            {(report.customer_postcode || report.customer_city) && (
              <p style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', lineHeight: 1.3, margin: 0 }}>
                {[report.customer_postcode, report.customer_city?.toUpperCase()].filter(Boolean).join(' ')}
              </p>
            )}
          </div>

          {/* Inspection Details */}
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '12px', lineHeight: 1.4, margin: '2px 0' }}>
              <span style={{ color: '#64748b', fontWeight: 500 }}>Opnamedatum:</span>{' '}
              <span style={{ fontWeight: 600, color: '#1e293b' }}>{formatDate(report.inspection_date)}</span>
            </p>
            <p style={{ fontSize: '12px', lineHeight: 1.4, margin: '2px 0' }}>
              <span style={{ color: '#64748b', fontWeight: 500 }}>Aanvangstijd opname:</span>{' '}
              <span style={{ fontWeight: 600, color: '#1e293b' }}>{formatTime(report.inspection_start_time)}</span>
            </p>
            <p style={{ fontSize: '12px', lineHeight: 1.4, margin: '2px 0' }}>
              <span style={{ color: '#64748b', fontWeight: 500 }}>Eindtijd opname:</span>{' '}
              <span style={{ fontWeight: 600, color: '#1e293b' }}>{formatTime(report.inspection_end_time)}</span>
            </p>
            <p style={{ fontSize: '12px', lineHeight: 1.4, margin: '2px 0' }}>
              <span style={{ color: '#64748b', fontWeight: 500 }}>Plaats:</span>{' '}
              <span style={{ fontWeight: 600, color: '#1e293b' }}>{capitalizeFirst(report.inspection_location)}</span>
            </p>
          </div>

          {/* Uitgevoerd door */}
          <div>
            <p style={{ fontSize: '12px', lineHeight: 1.4, margin: '2px 0' }}>
              <span style={{ color: '#64748b', fontWeight: 500 }}>Uitgevoerd door:</span>{' '}
              <span style={{ fontWeight: 600, color: '#1e293b' }}>Erik Elderson</span>
            </p>
            <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, lineHeight: 1.4, margin: '2px 0' }}>TMV Register-Taxateur</p>
            <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, lineHeight: 1.4, margin: '2px 0' }}>Register-Taxateur VRT</p>
          </div>
        </div>

        {/* Footer with Company Details */}
        <div style={{ borderTop: '1px solid #cbd5e1', paddingTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img 
              src={logoAutomobiel} 
              alt="Automobiel Taxaties" 
              style={{ height: '48px', width: 'auto', flexShrink: 0 }}
            />
            <div style={{ fontSize: '11px', color: '#475569', lineHeight: 1.5 }}>
              <span style={{ fontWeight: 600, color: '#1e293b' }}>Automobiel Taxaties</span>
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
        }}
      >
        {coverPhoto ? (
          <img
            src={coverPhoto}
            alt="Voertuig"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f3f4f6',
          }}>
            <div style={{ textAlign: 'center', color: '#9ca3af' }}>
              <svg
                style={{ margin: '0 auto', height: '96px', width: '96px', opacity: 0.5 }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p style={{ fontSize: '14px', marginTop: '16px' }}>Geen voertuigfoto beschikbaar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFCover;
