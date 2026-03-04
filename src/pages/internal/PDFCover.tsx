import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Logos
import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';
import logoVrt from '@/assets/logo-vrt.png';
import logoHobeon from '@/assets/logo-hobeon.webp';
import logoTmv from '@/assets/logo-tmv.png';
import logoFehac from '@/assets/logo-fehac.png';

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
  rdw_merk: string | null;
  rdw_handelsbenaming: string | null;
  opbouw_merk: string | null;
  opbouw_type: string | null;
  inspection_location: string | null;
  inspection_date: string | null;
  inspection_start_time: string | null;
  inspection_end_time: string | null;
  vehicle_photos: string[] | null;
  vehicle_photo_rotations: PhotoRotations | null;
}

const C = {
  title: '#1B2A4A',
  values: '#000000',
  labels: '#555555',
  subtitle: '#666666',
  light: '#999999',
  lines: '#CCCCCC',
};

const PDFCover = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) { setLoading(false); return; }
      try {
        const { data, error } = await supabase
          .from('reports')
          .select('*')
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatTime = (timeString: string | null) => {
    if (!timeString) return '-';
    return timeString.slice(0, 5) + ' uur';
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

  const customerName = [report.customer_title, report.customer_initials, report.customer_last_name]
    .filter(Boolean).join(' ') || '-';
  const vehicleDisplay = (report.vehicle_title || 
    [report.rdw_merk, report.rdw_handelsbenaming].filter(Boolean).join(' ') || '-').toUpperCase();
  const coverPhoto = report.vehicle_photos && report.vehicle_photos.length > 0 ? report.vehicle_photos[0] : null;
  const coverRotation = coverPhoto && report.vehicle_photo_rotations
    ? report.vehicle_photo_rotations[coverPhoto] || 0 : 0;

  return (
    <div
      className="bg-white font-sans"
      style={{
        width: '210mm',
        height: '297mm',
        position: 'relative',
        overflow: 'hidden',
        padding: '30px 50px 55px 50px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ZONE 1 — Header: AT logo left, register logos right */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '44px' }}>
        <img src={logoAutomobiel} alt="Automobiel Taxaties" style={{ height: '80px', width: 'auto' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src={logoVrt} alt="VRT" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
          <img src={logoHobeon} alt="Hobeon SKO" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
          <img src={logoTmv} alt="TMV" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
          <img src={logoFehac} alt="FEHAC" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
        </div>
      </div>

      {/* ZONE 2 — Title block */}
      <div style={{ marginBottom: '8px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '0.5px', color: C.title, textTransform: 'uppercase', lineHeight: 1.1, margin: 0 }}>
          TAXATIERAPPORT
        </h1>
        <p style={{ fontSize: '12px', color: C.subtitle, margin: '6px 0 0 0' }}>
          Volgens artikel 7:960 BW
        </p>
        <p style={{ fontSize: '9px', color: C.light, margin: '8px 0 0 0' }}>
          Dit taxatierapport is opgesteld ten behoeve van de vaststelling van de vervangingswaarde van het voertuig.
        </p>
      </div>

      {/* Separator line */}
      <div style={{ borderBottom: `1px solid ${C.lines}`, marginBottom: '32px' }} />

      {/* ZONE 3 — Vehicle info + Photo */}
      <div style={{ display: 'flex', gap: '30px', marginBottom: '24px' }}>
        {/* Left: vehicle data */}
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '9px', color: C.labels, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>VOERTUIG</p>
            <p style={{ fontSize: '15px', fontWeight: 700, color: C.values, margin: '3px 0 0 0', textTransform: 'uppercase' }}>
              {vehicleDisplay}
            </p>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <p style={{ fontSize: '9px', color: C.labels, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>KENTEKEN</p>
            <p style={{ fontSize: '15px', fontWeight: 700, color: C.values, margin: '3px 0 0 0' }}>
              {report.license_plate || '-'}
            </p>
          </div>
          <div>
            <p style={{ fontSize: '9px', color: C.labels, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>DOCUMENTNUMMER</p>
            <p style={{ fontSize: '15px', fontWeight: 700, color: C.values, margin: '3px 0 0 0' }}>
              {report.document_reference || '-'}
            </p>
          </div>
        </div>

        {/* Right: vehicle photo */}
        <div style={{ width: '230px', height: '185px', overflow: 'hidden', border: `1px solid ${C.lines}`, flexShrink: 0 }}>
          {coverPhoto ? (
            <img
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
            <div style={{ width: '100%', height: '100%', backgroundColor: '#f5f5f5' }} />
          )}
        </div>
      </div>

      {/* ZONE 4 — Client */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '9px', color: C.labels, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>IN OPDRACHT VAN</p>
        <p style={{ fontSize: '11px', fontWeight: 700, color: C.values, margin: '3px 0 0 0' }}>{customerName}</p>
        {report.customer_street && <p style={{ fontSize: '10px', color: C.values, margin: '1px 0 0 0' }}>{report.customer_street}</p>}
        {(report.customer_postcode || report.customer_city) && (
          <p style={{ fontSize: '10px', color: C.values, margin: '1px 0 0 0' }}>
            {[report.customer_postcode, report.customer_city].filter(Boolean).join(' ')}
          </p>
        )}
      </div>

      {/* ZONE 5 — Inspection details */}
      <div style={{ marginBottom: '8px' }}>
        <div style={{ marginBottom: '6px' }}>
          <p style={{ fontSize: '9px', color: C.labels, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>OPNAMEDATUM</p>
          <p style={{ fontSize: '11px', fontWeight: 700, color: C.values, margin: '2px 0 0 0' }}>{formatDate(report.inspection_date)}</p>
        </div>
        <div style={{ marginBottom: '6px' }}>
          <p style={{ fontSize: '9px', color: C.labels, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>TIJDSTIP OPNAME</p>
          <p style={{ fontSize: '11px', fontWeight: 700, color: C.values, margin: '2px 0 0 0' }}>{formatTime(report.inspection_start_time)}</p>
        </div>
        <div style={{ marginBottom: '6px' }}>
          <p style={{ fontSize: '9px', color: C.labels, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>TIJDSTIP EINDE OPNAME</p>
          <p style={{ fontSize: '11px', fontWeight: 700, color: C.values, margin: '2px 0 0 0' }}>{formatTime(report.inspection_end_time)}</p>
        </div>
        <div>
          <p style={{ fontSize: '9px', color: C.labels, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>LOCATIE OPNAME</p>
          <p style={{ fontSize: '11px', fontWeight: 700, color: C.values, margin: '2px 0 0 0' }}>{capitalizeFirst(report.inspection_location)}</p>
        </div>
      </div>

      {/* Spacer — pushes appraiser to bottom */}
      <div style={{ flex: 1 }} />

      {/* ZONE 6 — Appraiser */}
      <div style={{ marginBottom: '24px' }}>
        <p style={{ fontSize: '9px', color: C.labels, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>TAXATIE UITGEVOERD DOOR</p>
        <p style={{ fontSize: '12px', fontWeight: 700, color: C.values, margin: '3px 0 0 0' }}>Erik Elderson</p>
        <p style={{ fontSize: '10px', color: C.subtitle, margin: '2px 0 0 0' }}>TMV Register Taxateur nr. 33106</p>
        <p style={{ fontSize: '10px', color: C.subtitle, margin: '1px 0 0 0' }}>Register Taxateur VRT nr. 22-523-M</p>
      </div>

      {/* ZONE 7 — Footer (absolute bottom) */}
      <div style={{ position: 'absolute', bottom: '22px', left: '50px', right: '50px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6px' }}>
          <img src={logoAutomobiel} alt="Automobiel Taxaties" style={{ height: '28px', width: 'auto' }} />
          <span style={{ fontSize: '9px', color: C.light }}>Pagina 1 van 8</span>
        </div>
        <p style={{ fontSize: '7.5px', color: C.subtitle, margin: 0 }}>
          Leigraaf 160, 6651 GJ Druten &nbsp;|&nbsp; KvK: 95549269 &nbsp;|&nbsp; BTW: NL003366178B93 &nbsp;|&nbsp; TMV: 33106 &nbsp;|&nbsp; VRT: 22-523-M &nbsp;|&nbsp; Bank: NL80 RABO 0387 9156 80
        </p>
      </div>
    </div>
  );
};

export default PDFCover;
