import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Logos
import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';

interface Report {
  id: string;
  document_reference: string | null;
  
  // Technische staat
  condition_engine: string | null;
  condition_engine_notes: string | null;
  condition_transmission: string | null;
  condition_transmission_notes: string | null;
  condition_brakes: string | null;
  condition_brakes_notes: string | null;
  condition_suspension: string | null;
  condition_suspension_notes: string | null;
  condition_steering: string | null;
  condition_steering_notes: string | null;
  condition_electrical: string | null;
  condition_electrical_notes: string | null;
  
  // Banden
  tire_front_left_brand: string | null;
  tire_front_left_dot: string | null;
  tire_front_left_season: string | null;
  tire_front_right_brand: string | null;
  tire_front_right_dot: string | null;
  tire_front_right_season: string | null;
  tire_rear_left_brand: string | null;
  tire_rear_left_dot: string | null;
  tire_rear_left_season: string | null;
  tire_rear_right_brand: string | null;
  tire_rear_right_dot: string | null;
  tire_rear_right_season: string | null;
  rim_type: string | null;
  
  // Exterieur
  exterior_body: string | null;
  exterior_body_notes: string | null;
  exterior_paint: string | null;
  exterior_paint_notes: string | null;
  exterior_rubbers: string | null;
  exterior_rubbers_notes: string | null;
  exterior_windows: string | null;
  exterior_windows_notes: string | null;
  exterior_sealant: string | null;
  exterior_sealant_notes: string | null;
  
  // Interieur
  interior_upholstery: string | null;
  interior_upholstery_notes: string | null;
  interior_dashboard: string | null;
  interior_dashboard_notes: string | null;
  interior_floor: string | null;
  interior_floor_notes: string | null;
  interior_roof: string | null;
  interior_roof_notes: string | null;
  interior_kitchen: string | null;
  interior_kitchen_notes: string | null;
  interior_sanitary: string | null;
  interior_sanitary_notes: string | null;
  
  // General
  general_remarks: string | null;
}

const PDFAppraisalFindings = () => {
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

  const formatCondition = (value: string | null) => {
    if (!value) return '-';
    const labels: Record<string, string> = {
      goed: 'Goed',
      voldoende: 'Voldoende',
      matig: 'Matig',
      slecht: 'Slecht',
    };
    return labels[value] || value;
  };

  const formatSeason = (value: string | null) => {
    if (!value) return '-';
    const labels: Record<string, string> = {
      zomer: 'Zomer',
      winter: 'Winter',
      allseason: 'All-season',
    };
    return labels[value] || value;
  };

  const formatRimType = (value: string | null) => {
    if (!value) return '-';
    const labels: Record<string, string> = {
      staal: 'Staalvelgen',
      lichtmetaal: 'Lichtmetalen velgen',
      gemengd: 'Gemengd',
    };
    return labels[value] || value;
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

  const ConditionRow = ({ label, condition, notes }: { label: string; condition: string | null; notes: string | null }) => (
    <div style={{ display: 'flex', padding: '4px 0', borderBottom: '1px solid #e2e8f0' }}>
      <span style={{ width: '35%', color: '#64748b', fontSize: '9px', fontWeight: 500 }}>{label}</span>
      <span style={{ width: '20%', color: '#1e293b', fontSize: '9px', fontWeight: 600 }}>{formatCondition(condition)}</span>
      <span style={{ width: '45%', color: '#475569', fontSize: '9px' }}>{notes || '-'}</span>
    </div>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <div style={{ 
      marginBottom: '6px',
      paddingBottom: '4px',
      borderBottom: '2px solid #1e293b'
    }}>
      <h3 style={{ fontSize: '11px', fontWeight: 600, color: '#1e293b', margin: 0, textTransform: 'uppercase' }}>
        {title}
      </h3>
    </div>
  );

  const TireRow = ({ position, brand, dot, season }: { position: string; brand: string | null; dot: string | null; season: string | null }) => (
    <div style={{ display: 'flex', padding: '4px 0', borderBottom: '1px solid #e2e8f0' }}>
      <span style={{ width: '30%', color: '#64748b', fontSize: '9px', fontWeight: 500 }}>{position}</span>
      <span style={{ width: '25%', color: '#1e293b', fontSize: '9px' }}>{brand || '-'}</span>
      <span style={{ width: '20%', color: '#1e293b', fontSize: '9px' }}>{dot || '-'}</span>
      <span style={{ width: '25%', color: '#1e293b', fontSize: '9px' }}>{formatSeason(season)}</span>
    </div>
  );

  return (
    <div 
      className="bg-white font-sans"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '16px 20px',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div>
          <h1 style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b', margin: 0, textTransform: 'uppercase' }}>TAXATEURBEVINDINGEN</h1>
          <p style={{ fontSize: '9px', color: '#64748b', margin: '2px 0 0 0' }}>
            Documentkenmerk: {report.document_reference || '-'}
          </p>
        </div>
        <img src={logoAutomobiel} alt="Automobiel Taxaties" style={{ height: '32px', width: 'auto' }} />
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'flex', gap: '16px' }}>
        {/* Left Column */}
        <div style={{ width: '50%' }}>
          {/* Technische staat */}
          <div style={{ marginBottom: '14px' }}>
            <SectionHeader title="Technische staat voertuig" />
            <div style={{ display: 'flex', padding: '4px 0', borderBottom: '1px solid #cbd5e1', backgroundColor: '#f8fafc' }}>
              <span style={{ width: '35%', color: '#475569', fontSize: '8px', fontWeight: 600 }}>ONDERDEEL</span>
              <span style={{ width: '20%', color: '#475569', fontSize: '8px', fontWeight: 600 }}>CONDITIE</span>
              <span style={{ width: '45%', color: '#475569', fontSize: '8px', fontWeight: 600 }}>OPMERKINGEN</span>
            </div>
            <ConditionRow label="Motor en aandrijving" condition={report.condition_engine} notes={report.condition_engine_notes} />
            <ConditionRow label="Transmissie" condition={report.condition_transmission} notes={report.condition_transmission_notes} />
            <ConditionRow label="Remmen" condition={report.condition_brakes} notes={report.condition_brakes_notes} />
            <ConditionRow label="Ophanging" condition={report.condition_suspension} notes={report.condition_suspension_notes} />
            <ConditionRow label="Besturing" condition={report.condition_steering} notes={report.condition_steering_notes} />
            <ConditionRow label="Elektrische installatie" condition={report.condition_electrical} notes={report.condition_electrical_notes} />
          </div>

          {/* Banden en wielen */}
          <div style={{ marginBottom: '14px' }}>
            <SectionHeader title="Banden en wielen" />
            <div style={{ display: 'flex', padding: '4px 0', borderBottom: '1px solid #cbd5e1', backgroundColor: '#f8fafc' }}>
              <span style={{ width: '30%', color: '#475569', fontSize: '8px', fontWeight: 600 }}>POSITIE</span>
              <span style={{ width: '25%', color: '#475569', fontSize: '8px', fontWeight: 600 }}>MERK</span>
              <span style={{ width: '20%', color: '#475569', fontSize: '8px', fontWeight: 600 }}>DOT</span>
              <span style={{ width: '25%', color: '#475569', fontSize: '8px', fontWeight: 600 }}>SEIZOEN</span>
            </div>
            <TireRow position="Linker voorband" brand={report.tire_front_left_brand} dot={report.tire_front_left_dot} season={report.tire_front_left_season} />
            <TireRow position="Rechter voorband" brand={report.tire_front_right_brand} dot={report.tire_front_right_dot} season={report.tire_front_right_season} />
            <TireRow position="Linker achterband" brand={report.tire_rear_left_brand} dot={report.tire_rear_left_dot} season={report.tire_rear_left_season} />
            <TireRow position="Rechter achterband" brand={report.tire_rear_right_brand} dot={report.tire_rear_right_dot} season={report.tire_rear_right_season} />
            <div style={{ display: 'flex', padding: '6px 0' }}>
              <span style={{ color: '#64748b', fontSize: '9px', fontWeight: 500 }}>Type velg:</span>
              <span style={{ marginLeft: '8px', color: '#1e293b', fontSize: '9px', fontWeight: 600 }}>{formatRimType(report.rim_type)}</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div style={{ width: '50%' }}>
          {/* Exterieur */}
          <div style={{ marginBottom: '14px' }}>
            <SectionHeader title="Exterieur" />
            <div style={{ display: 'flex', padding: '4px 0', borderBottom: '1px solid #cbd5e1', backgroundColor: '#f8fafc' }}>
              <span style={{ width: '35%', color: '#475569', fontSize: '8px', fontWeight: 600 }}>ONDERDEEL</span>
              <span style={{ width: '20%', color: '#475569', fontSize: '8px', fontWeight: 600 }}>CONDITIE</span>
              <span style={{ width: '45%', color: '#475569', fontSize: '8px', fontWeight: 600 }}>OPMERKINGEN</span>
            </div>
            <ConditionRow label="Carrosserie" condition={report.exterior_body} notes={report.exterior_body_notes} />
            <ConditionRow label="Lakwerk" condition={report.exterior_paint} notes={report.exterior_paint_notes} />
            <ConditionRow label="Rubbers" condition={report.exterior_rubbers} notes={report.exterior_rubbers_notes} />
            <ConditionRow label="Ruiten" condition={report.exterior_windows} notes={report.exterior_windows_notes} />
            <ConditionRow label="Kitnaden" condition={report.exterior_sealant} notes={report.exterior_sealant_notes} />
          </div>

          {/* Interieur */}
          <div style={{ marginBottom: '14px' }}>
            <SectionHeader title="Interieur" />
            <div style={{ display: 'flex', padding: '4px 0', borderBottom: '1px solid #cbd5e1', backgroundColor: '#f8fafc' }}>
              <span style={{ width: '35%', color: '#475569', fontSize: '8px', fontWeight: 600 }}>ONDERDEEL</span>
              <span style={{ width: '20%', color: '#475569', fontSize: '8px', fontWeight: 600 }}>CONDITIE</span>
              <span style={{ width: '45%', color: '#475569', fontSize: '8px', fontWeight: 600 }}>OPMERKINGEN</span>
            </div>
            <ConditionRow label="Bekleding" condition={report.interior_upholstery} notes={report.interior_upholstery_notes} />
            <ConditionRow label="Dashboard" condition={report.interior_dashboard} notes={report.interior_dashboard_notes} />
            <ConditionRow label="Vloer" condition={report.interior_floor} notes={report.interior_floor_notes} />
            <ConditionRow label="Dak" condition={report.interior_roof} notes={report.interior_roof_notes} />
            <ConditionRow label="Keuken" condition={report.interior_kitchen} notes={report.interior_kitchen_notes} />
            <ConditionRow label="Sanitair" condition={report.interior_sanitary} notes={report.interior_sanitary_notes} />
          </div>

          {/* Bijzonderheden */}
          {report.general_remarks && (
            <div style={{ marginBottom: '14px' }}>
              <SectionHeader title="Bijzonderheden / afwijkingen" />
              <p style={{ fontSize: '9px', color: '#1e293b', lineHeight: 1.5, margin: 0 }}>
                {report.general_remarks}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        position: 'absolute', 
        bottom: '16px', 
        left: '20px', 
        right: '20px',
        borderTop: '1px solid #cbd5e1', 
        paddingTop: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '8px', color: '#64748b' }}>
          <span style={{ fontWeight: 600, color: '#1e293b' }}>Automobiel Taxaties</span>
          <span style={{ margin: '0 4px' }}>|</span>
          Leigraaf 160, 6651 GJ Druten
          <span style={{ margin: '0 4px' }}>|</span>
          KVK: 95549269
        </div>
        <div style={{ fontSize: '8px', color: '#64748b' }}>
          Pagina 3
        </div>
      </div>
    </div>
  );
};

export default PDFAppraisalFindings;
