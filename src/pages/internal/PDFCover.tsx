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
  report_type: string | null;
  document_reference: string | null;
  opdrachtgever: string | null;
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
  inspection_location: string | null;
  inspection_date: string | null;
  inspection_start_time: string | null;
  inspection_end_time: string | null;
  vehicle_photos: string[] | null;
  vehicle_photo_rotations: PhotoRotations | null;
}

const C = {
  text: '#1a1a1a',
  labels: '#888888',
  lines: '#e0e0e0',
  subtitle: '#444444',
  description: '#666666',
};

const getTitleConfig = (reportType: string | null) => {
  if (reportType?.toLowerCase() === 'wev') {
    return {
      subtitle: 'Ter bepaling van de Waarde in het Economisch Verkeer',
      description: 'Dit taxatierapport is opgesteld ter bepaling van de waarde in het economisch verkeer van het voertuig.',
    };
  }
  return {
    subtitle: 'Volgens artikel 7:960 BW',
    description: 'Dit taxatierapport is opgesteld ten behoeve van de vaststelling van de vervangingswaarde van het voertuig.',
  };
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
    if (!dateString) return 'nog niet ingevuld';
    return new Date(dateString).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatTime = (timeString: string | null) => {
    if (!timeString) return 'nog niet ingevuld';
    return timeString.slice(0, 5) + ' uur';
  };

  const capitalizeFirst = (str: string | null) => {
    if (!str) return 'nog niet ingevuld';
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

  const { subtitle, description } = getTitleConfig(report.report_type);

  const companyName = report.opdrachtgever || null;
  const customerName = [report.customer_title, report.customer_initials, report.customer_last_name]
    .filter(Boolean).join(' ') || 'nog niet ingevuld';
  const customerAddress = report.customer_street || null;
  const customerCity = [report.customer_postcode, report.customer_city].filter(Boolean).join(' ') || null;
  const vehicleDisplay = (report.vehicle_title ||
    [report.rdw_merk, report.rdw_handelsbenaming].filter(Boolean).join(' ') || 'nog niet ingevuld').toUpperCase();
  const coverPhoto = report.vehicle_photos && report.vehicle_photos.length > 0 ? report.vehicle_photos[0] : null;
  const coverRotation = coverPhoto && report.vehicle_photo_rotations
    ? report.vehicle_photo_rotations[coverPhoto] || 0 : 0;

  // Shared label/value styles
  const labelCls = "text-[0.65rem] font-semibold tracking-wider uppercase";
  const valueCls = "text-base font-bold";

  return (
    <div
      className="bg-white font-sans"
      style={{
        width: '210mm',
        height: '297mm',
        position: 'relative',
        overflow: 'hidden',
        padding: '20mm',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* === 1. HEADER === */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '4mm',
        borderBottom: `0.5px solid ${C.lines}`,
        marginBottom: '6mm',
      }}>
        <img src={logoAutomobiel} alt="Automobiel Taxaties" style={{ height: '18mm', width: 'auto' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '3mm' }}>
          <img src={logoVrt} alt="VRT" style={{ height: '9mm', width: 'auto', objectFit: 'contain' }} />
          <img src={logoHobeon} alt="Hobeon SKO" style={{ height: '9mm', width: 'auto', objectFit: 'contain' }} />
          <img src={logoTmv} alt="TMV" style={{ height: '9mm', width: 'auto', objectFit: 'contain' }} />
          <img src={logoFehac} alt="FEHAC" style={{ height: '9mm', width: 'auto', objectFit: 'contain' }} />
        </div>
      </div>

      {/* === 2. TITLE === */}
      <div style={{ marginBottom: '8mm' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 700, color: C.text, textTransform: 'uppercase', lineHeight: 1.1, margin: 0 }}>
          TAXATIERAPPORT
        </h1>
        <p style={{ fontSize: '0.9rem', color: C.subtitle, margin: '2mm 0 0 0' }}>
          {subtitle}
        </p>
        <p style={{ fontSize: '0.8rem', color: C.description, fontStyle: 'italic', margin: '1.5mm 0 0 0' }}>
          {description}
        </p>
      </div>

      {/* === 3. VEHICLE + PHOTO === */}
      <div style={{ display: 'flex', marginBottom: '6mm' }}>
        {/* Left: vehicle data (40%) */}
        <div style={{ width: '40%', paddingRight: '4mm' }}>
          <p className={labelCls} style={{ color: C.labels, margin: 0 }}>VOERTUIG</p>
          <p style={{ fontSize: '1.1rem', fontWeight: 700, color: C.text, margin: '1mm 0 0 0', textTransform: 'uppercase' }}>
            {vehicleDisplay}
          </p>

          <p className={labelCls} style={{ color: C.labels, margin: '5mm 0 0 0' }}>KENTEKEN</p>
          <p className={valueCls} style={{ color: C.text, margin: '1mm 0 0 0' }}>
            {report.license_plate || 'nog niet ingevuld'}
          </p>

          <p className={labelCls} style={{ color: C.labels, margin: '5mm 0 0 0' }}>DOCUMENTNUMMER</p>
          <p className={valueCls} style={{ color: C.text, margin: '1mm 0 0 0' }}>
            {report.document_reference || report.report_number || 'nog niet ingevuld'}
          </p>
        </div>

        {/* Right: photo (60%) */}
        <div style={{ width: '60%', height: '60mm', overflow: 'hidden', borderRadius: '4px', border: `0.5px solid ${C.lines}` }}>
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

      {/* === 4. CLIENT + INSPECTION === */}
      <div style={{ marginBottom: '4mm' }}>
        <p className={labelCls} style={{ color: C.labels, margin: 0 }}>IN OPDRACHT VAN</p>
        {companyName && (
          <p className={valueCls} style={{ color: C.text, margin: '1mm 0 0 0' }}>{companyName}</p>
        )}
        <p style={{ fontSize: '1rem', fontWeight: companyName ? 400 : 700, color: C.text, margin: `${companyName ? '0.5mm' : '1mm'} 0 0 0` }}>
          {customerName}
        </p>
        {customerAddress && <p style={{ fontSize: '0.9rem', color: C.text, margin: '0.5mm 0 0 0' }}>{customerAddress}</p>}
        {customerCity && <p style={{ fontSize: '0.9rem', color: C.text, margin: '0.5mm 0 0 0' }}>{customerCity}</p>}
      </div>

      {/* Inspection details */}
      <div>
        <p className={labelCls} style={{ color: C.labels, margin: '3mm 0 0 0' }}>OPNAMEDATUM</p>
        <p className={valueCls} style={{ color: C.text, margin: '1mm 0 0 0' }}>{formatDate(report.inspection_date)}</p>

        <p className={labelCls} style={{ color: C.labels, margin: '3mm 0 0 0' }}>TIJDSTIP OPNAME</p>
        <p className={valueCls} style={{ color: C.text, margin: '1mm 0 0 0' }}>{formatTime(report.inspection_start_time)}</p>

        <p className={labelCls} style={{ color: C.labels, margin: '3mm 0 0 0' }}>TIJDSTIP EINDE OPNAME</p>
        <p className={valueCls} style={{ color: C.text, margin: '1mm 0 0 0' }}>{formatTime(report.inspection_end_time)}</p>

        <p className={labelCls} style={{ color: C.labels, margin: '3mm 0 0 0' }}>LOCATIE OPNAME</p>
        <p className={valueCls} style={{ color: C.text, margin: '1mm 0 0 0' }}>{capitalizeFirst(report.inspection_location)}</p>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* === 5. APPRAISER === */}
      <div style={{ marginBottom: '28mm' }}>
        <p className={labelCls} style={{ color: C.labels, margin: 0 }}>TAXATIE UITGEVOERD DOOR</p>
        <p style={{ fontSize: '1.05rem', fontWeight: 700, color: C.text, margin: '1.5mm 0 0 0' }}>Erik Elderson</p>
        <p style={{ fontSize: '0.85rem', color: C.subtitle, margin: '2mm 0 0 0' }}>TMV Register Taxateur nr. 33106</p>
        <p style={{ fontSize: '0.85rem', color: C.subtitle, margin: '1mm 0 0 0' }}>Register Taxateur VRT nr. 22-523-M</p>
      </div>

      {/* === 6. FOOTER === */}
      <div style={{
        position: 'absolute',
        bottom: '8mm',
        left: '20mm',
        right: '20mm',
      }}>
        <div style={{ borderTop: `0.5px solid ${C.lines}`, marginBottom: '2mm' }} />
        <img src={logoAutomobiel} alt="Automobiel Taxaties" style={{ height: '7mm', width: 'auto', display: 'block', marginBottom: '2mm' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <span style={{ fontSize: '0.65rem', color: C.labels }}>
            Leigraaf 160, 6651 GJ Druten &nbsp;|&nbsp; KvK: 95549269 &nbsp;|&nbsp; BTW: NL003366178B93 &nbsp;|&nbsp; TMV: 33106 &nbsp;|&nbsp; VRT: 22-523-M
          </span>
          <span style={{ fontSize: '0.7rem', color: C.labels, whiteSpace: 'nowrap' }}>Pagina 1 van 8</span>
        </div>
      </div>
    </div>
  );
};

export default PDFCover;
