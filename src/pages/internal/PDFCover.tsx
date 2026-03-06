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

  const isWev = report.report_type?.toLowerCase() === 'wev';
  const subtitle = isWev
    ? 'Ter bepaling van de Waarde in het Economisch Verkeer'
    : 'Volgens artikel 7:960 BW';
  const description = isWev
    ? 'Dit taxatierapport is opgesteld ten behoeve van de vaststelling van de waarde in het economisch verkeer van het voertuig.'
    : 'Dit taxatierapport is opgesteld ten behoeve van de vaststelling van de vervangingswaarde van het voertuig.';

  const customerName = [report.customer_title, report.customer_initials, report.customer_last_name]
    .filter(Boolean).join(' ') || 'nog niet ingevuld';
  const vehicleDisplay = (report.vehicle_title ||
    [report.rdw_merk, report.rdw_handelsbenaming].filter(Boolean).join(' ') || 'nog niet ingevuld').toUpperCase();
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
        /* Margins: top=12mm, right=20mm, bottom=24mm (room for footer), left=25mm */
        padding: '12mm 20mm 24mm 25mm',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* ZONE 1 — Header: AT logo left, register logos right */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28mm' }}>
        <img src={logoAutomobiel} alt="Automobiel Taxaties" style={{ height: '22mm', width: 'auto' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '3mm' }}>
          <img src={logoVrt} alt="VRT" style={{ height: '9mm', width: 'auto', objectFit: 'contain' }} />
          <img src={logoHobeon} alt="Hobeon SKO" style={{ height: '9mm', width: 'auto', objectFit: 'contain' }} />
          <img src={logoTmv} alt="TMV" style={{ height: '9mm', width: 'auto', objectFit: 'contain' }} />
          <img src={logoFehac} alt="FEHAC" style={{ height: '9mm', width: 'auto', objectFit: 'contain' }} />
        </div>
      </div>

      {/* ZONE 2 — Title block */}
      <div>
        <h1 style={{ fontSize: '26pt', fontWeight: 700, letterSpacing: '0.5px', color: C.title, textTransform: 'uppercase', lineHeight: 1.1, margin: 0 }}>
          TAXATIERAPPORT
        </h1>
        <p style={{ fontSize: '10pt', color: C.subtitle, margin: '3.5mm 0 0 0' }}>
          {subtitle}
        </p>
        <p style={{ fontSize: '7.5pt', color: C.light, margin: '2.5mm 0 0 0' }}>
          {description}
        </p>
      </div>

      {/* Separator line */}
      <div style={{ borderBottom: `0.5px solid ${C.lines}`, margin: '3mm 0 24mm 0' }} />

      {/* ZONE 3 — Vehicle info + Photo (98x74mm) */}
      <div style={{ display: 'flex', marginBottom: '18mm' }}>
        {/* Left: vehicle data */}
        <div style={{ flex: 1 }}>
          {/* VOERTUIG */}
          <p style={{ fontSize: '7.5pt', color: C.labels, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>VOERTUIG</p>
          <p style={{ fontSize: '13pt', fontWeight: 700, color: C.values, margin: '1.5mm 0 0 0', textTransform: 'uppercase' }}>
            {vehicleDisplay}
          </p>

          {/* KENTEKEN */}
          <p style={{ fontSize: '7.5pt', color: C.labels, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '4mm 0 0 0' }}>KENTEKEN</p>
          <p style={{ fontSize: '13pt', fontWeight: 700, color: C.values, margin: '1.5mm 0 0 0' }}>
            {report.license_plate || 'nog niet ingevuld'}
          </p>

          {/* DOCUMENTNUMMER */}
          <p style={{ fontSize: '7.5pt', color: C.labels, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '4mm 0 0 0' }}>DOCUMENTNUMMER</p>
          <p style={{ fontSize: '13pt', fontWeight: 700, color: C.values, margin: '1.5mm 0 0 0' }}>
            {report.document_reference || 'nog niet ingevuld'}
          </p>
        </div>

        {/* Right: vehicle photo — 98x74mm */}
        <div style={{ width: '98mm', height: '74mm', overflow: 'hidden', border: `0.5px solid ${C.lines}`, flexShrink: 0 }}>
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
      <p style={{ fontSize: '7.5pt', color: C.labels, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>IN OPDRACHT VAN</p>
      <p style={{ fontSize: '10pt', fontWeight: 700, color: C.values, margin: '1.5mm 0 0 0' }}>{customerName}</p>
      {report.customer_street && <p style={{ fontSize: '10pt', color: C.values, margin: '0.5mm 0 0 0' }}>{report.customer_street}</p>}
      {(report.customer_postcode || report.customer_city) && (
        <p style={{ fontSize: '10pt', color: C.values, margin: '0.5mm 0 0 0' }}>
          {[report.customer_postcode, report.customer_city].filter(Boolean).join(' ')}
        </p>
      )}

      {/* Inspection details — 2mm gap */}
      <div style={{ marginTop: '2mm' }}>
        <p style={{ fontSize: '7.5pt', color: C.labels, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>OPNAMEDATUM</p>
        <p style={{ fontSize: '10pt', fontWeight: 700, color: C.values, margin: '1mm 0 0 0' }}>{formatDate(report.inspection_date)}</p>

        <p style={{ fontSize: '7.5pt', color: C.labels, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '2mm 0 0 0' }}>TIJDSTIP OPNAME</p>
        <p style={{ fontSize: '10pt', fontWeight: 700, color: C.values, margin: '1mm 0 0 0' }}>{formatTime(report.inspection_start_time)}</p>

        <p style={{ fontSize: '7.5pt', color: C.labels, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '2mm 0 0 0' }}>TIJDSTIP EINDE OPNAME</p>
        <p style={{ fontSize: '10pt', fontWeight: 700, color: C.values, margin: '1mm 0 0 0' }}>{formatTime(report.inspection_end_time)}</p>

        <p style={{ fontSize: '7.5pt', color: C.labels, textTransform: 'uppercase', letterSpacing: '0.5px', margin: '2mm 0 0 0' }}>LOCATIE OPNAME</p>
        <p style={{ fontSize: '10pt', fontWeight: 700, color: C.values, margin: '1mm 0 0 0' }}>{capitalizeFirst(report.inspection_location)}</p>
      </div>

      {/* Spacer — pushes appraiser to bottom */}
      <div style={{ flex: 1 }} />

      {/* Appraiser */}
      <div>
        <p style={{ fontSize: '7.5pt', color: C.labels, textTransform: 'uppercase', letterSpacing: '0.5px', margin: 0 }}>TAXATIE UITGEVOERD DOOR</p>
        <p style={{ fontSize: '11pt', fontWeight: 700, color: C.values, margin: '1.5mm 0 0 0' }}>Erik Elderson</p>
        <p style={{ fontSize: '9pt', color: C.subtitle, margin: '2mm 0 0 0' }}>TMV Register Taxateur nr. 33106</p>
        <p style={{ fontSize: '9pt', color: C.subtitle, margin: '1mm 0 0 0' }}>Register Taxateur VRT nr. 22-523-M</p>
      </div>

      {/* ZONE 5 — Footer (fixed position at bottom) */}
      <div style={{
        position: 'absolute',
        bottom: '8mm',
        left: '25mm',
        right: '20mm',
      }}>
        {/* Separator line */}
        <div style={{ borderTop: `0.5px solid ${C.lines}`, marginBottom: '1mm' }} />

        {/* AT logo small */}
        <img src={logoAutomobiel} alt="Automobiel Taxaties" style={{ height: '8mm', width: 'auto', display: 'block', marginBottom: '3mm' }} />

        {/* Company details + page number */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <span style={{ fontSize: '5.5pt', color: C.subtitle }}>
            Leigraaf 160, 6651 GJ Druten &nbsp;|&nbsp; KvK: 95549269 &nbsp;|&nbsp; BTW: NL003366178B93 &nbsp;|&nbsp; TMV: 33106 &nbsp;|&nbsp; VRT: 22-523-M &nbsp;|&nbsp; Bank: NL80 RABO 0387 9156 80
          </span>
          <span style={{ fontSize: '7pt', color: C.light, whiteSpace: 'nowrap' }}>Pagina 1 van 8</span>
        </div>
      </div>
    </div>
  );
};

export default PDFCover;
