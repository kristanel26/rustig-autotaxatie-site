import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Logos
import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';

interface Report {
  id: string;
  report_number: string;
  document_reference: string | null;
  license_plate: string | null;
  vin: string | null;
  
  // RDW Sectie 1: Voertuigidentificatie
  rdw_merk: string | null;
  rdw_handelsbenaming: string | null;
  rdw_voertuigsoort: string | null;
  rdw_carrosserievorm: string | null;
  rdw_bouwjaar: number | null;
  rdw_datum_eerste_toelating: string | null;
  rdw_datum_eerste_tenaamstelling: string | null;
  rdw_datum_laatste_tenaamstelling: string | null;
  rdw_apk_gekeurd: boolean | null;
  rdw_apk_vervaldatum: string | null;
  
  // RDW Sectie 2: Technische hoofdgegevens
  rdw_brandstof: string | null;
  rdw_transmissie: string | null;
  rdw_aantal_cilinders: number | null;
  rdw_cilinderinhoud: number | null;
  rdw_vermogen_kw: number | null;
  rdw_aantal_deuren: number | null;
  rdw_wielbasis: number | null;
  
  // RDW Sectie 3: Massa en gewichten
  rdw_ledig_gewicht: number | null;
  rdw_massa_rijklaar: number | null;
  rdw_max_massa: number | null;
  
  // RDW Sectie 4: Keuring en status
  rdw_importvoertuig: boolean | null;
  
  // Taxateur Sectie 5: Tellerstand
  tellerstand: number | null;
  tellerstand_type: string | null;
  
  // Taxateur Sectie 6: Opbouw en constructie
  soort_bouw: string | null;
  opbouw_merk: string | null;
  opbouw_type: string | null;
  constructievorm: string | null;
  
  // Taxateur Sectie 7: Gebruik en stalling
  gebruik: string | null;
  stalling: string | null;
  staat_bij_opname: string | null;
}

const PDFVehicleData = () => {
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

  const formatBoolean = (value: boolean | null) => {
    if (value === null || value === undefined) return '-';
    return value ? 'Ja' : 'Nee';
  };

  const formatNumber = (value: number | null, suffix?: string) => {
    if (value === null || value === undefined) return '-';
    return suffix ? `${value.toLocaleString('nl-NL')} ${suffix}` : value.toLocaleString('nl-NL');
  };

  const getMeldcode = (vin: string | null) => {
    if (!vin || vin.length < 4) return '-';
    return vin.slice(-4).toUpperCase();
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

  const DataRow = ({ label, value }: { label: string; value: string }) => (
    <div style={{ display: 'flex', padding: '6px 0', borderBottom: '1px solid #e2e8f0' }}>
      <span style={{ width: '50%', color: '#64748b', fontSize: '11px', fontWeight: 500 }}>{label}</span>
      <span style={{ width: '50%', color: '#1e293b', fontSize: '11px', fontWeight: 600 }}>{value}</span>
    </div>
  );

  const SectionHeader = ({ title, badge }: { title: string; badge?: string }) => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px',
      marginBottom: '12px',
      paddingBottom: '8px',
      borderBottom: '2px solid #1e293b'
    }}>
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b', margin: 0 }}>{title}</h3>
      {badge && (
        <span style={{ 
          fontSize: '9px', 
          fontWeight: 500, 
          color: '#64748b', 
          backgroundColor: '#f1f5f9',
          padding: '2px 6px',
          borderRadius: '4px'
        }}>
          {badge}
        </span>
      )}
    </div>
  );

  return (
    <div 
      className="bg-white font-sans"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '24px',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#1e293b', margin: 0 }}>VOERTUIGGEGEVENS</h1>
          <p style={{ fontSize: '11px', color: '#64748b', margin: '4px 0 0 0' }}>
            Documentkenmerk: {report.document_reference || '-'}
          </p>
        </div>
        <img src={logoAutomobiel} alt="Automobiel Taxaties" style={{ height: '40px', width: 'auto' }} />
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Left Column */}
        <div style={{ width: '50%' }}>
          {/* Sectie 1: Voertuigidentificatie (RDW) */}
          <div style={{ marginBottom: '20px' }}>
            <SectionHeader title="1. Voertuigidentificatie" badge="RDW" />
            <DataRow label="Kenteken" value={report.license_plate || '-'} />
            <DataRow label="Merk" value={report.rdw_merk || '-'} />
            <DataRow label="Handelsbenaming / Model" value={report.rdw_handelsbenaming || '-'} />
            <DataRow label="Voertuigsoort" value={report.rdw_voertuigsoort || '-'} />
            <DataRow label="Carrosserievorm" value={report.rdw_carrosserievorm || '-'} />
            <DataRow label="Chassisnummer (VIN)" value={report.vin || '-'} />
            <DataRow label="Meldcode" value={getMeldcode(report.vin)} />
            <DataRow label="Bouwjaar" value={report.rdw_bouwjaar?.toString() || '-'} />
            <DataRow label="Datum eerste toelating" value={formatDate(report.rdw_datum_eerste_toelating)} />
            <DataRow label="Datum eerste tenaamstelling" value={formatDate(report.rdw_datum_eerste_tenaamstelling)} />
            <DataRow label="Datum laatste tenaamstelling" value={formatDate(report.rdw_datum_laatste_tenaamstelling)} />
            <DataRow label="APK gekeurd" value={formatBoolean(report.rdw_apk_gekeurd)} />
            <DataRow label="APK vervaldatum" value={formatDate(report.rdw_apk_vervaldatum)} />
            <p style={{ fontSize: '9px', color: '#94a3b8', fontStyle: 'italic', marginTop: '8px' }}>
              Gegevens afkomstig uit RDW OVI.
            </p>
          </div>

          {/* Sectie 2: Technische hoofdgegevens (RDW) */}
          <div style={{ marginBottom: '20px' }}>
            <SectionHeader title="2. Technische hoofdgegevens" badge="RDW" />
            <DataRow label="Brandstof" value={report.rdw_brandstof || '-'} />
            <DataRow label="Transmissie" value={report.rdw_transmissie || '-'} />
            <DataRow label="Aantal cilinders" value={formatNumber(report.rdw_aantal_cilinders)} />
            <DataRow label="Cilinderinhoud" value={formatNumber(report.rdw_cilinderinhoud, 'cc')} />
            <DataRow label="Vermogen" value={formatNumber(report.rdw_vermogen_kw, 'kW')} />
            <DataRow label="Aantal deuren" value={formatNumber(report.rdw_aantal_deuren)} />
            <DataRow label="Wielbasis" value={formatNumber(report.rdw_wielbasis, 'mm')} />
          </div>

          {/* Sectie 3: Massa en gewichten (RDW) */}
          <div style={{ marginBottom: '20px' }}>
            <SectionHeader title="3. Massa en gewichten" badge="RDW" />
            <DataRow label="Ledig gewicht" value={formatNumber(report.rdw_ledig_gewicht, 'kg')} />
            <DataRow label="Massa rijklaar" value={formatNumber(report.rdw_massa_rijklaar, 'kg')} />
            <DataRow label="Toegestane maximale massa" value={formatNumber(report.rdw_max_massa, 'kg')} />
          </div>
        </div>

        {/* Right Column */}
        <div style={{ width: '50%' }}>
          {/* Sectie 4: Keuring en status (RDW) */}
          <div style={{ marginBottom: '20px' }}>
            <SectionHeader title="4. Keuring en status" badge="RDW" />
            <DataRow label="APK-status" value={formatBoolean(report.rdw_apk_gekeurd)} />
            <DataRow label="Importvoertuig" value={formatBoolean(report.rdw_importvoertuig)} />
          </div>

          {/* Sectie 5: Tellerstand en gebruik (Taxateur) */}
          <div style={{ marginBottom: '20px' }}>
            <SectionHeader title="5. Tellerstand en gebruik" badge="Taxateur" />
            <DataRow 
              label="Tellerstand" 
              value={report.tellerstand ? `${report.tellerstand.toLocaleString('nl-NL')} ${report.tellerstand_type || 'km'}` : '-'} 
            />
            <p style={{ fontSize: '9px', color: '#94a3b8', fontStyle: 'italic', marginTop: '8px' }}>
              Tellerstand vastgesteld bij fysieke opname.
            </p>
          </div>

          {/* Sectie 6: Opbouw en constructie (Taxateur) */}
          <div style={{ marginBottom: '20px' }}>
            <SectionHeader title="6. Opbouw en constructie" badge="Taxateur" />
            <DataRow label="Soort bouw" value={report.soort_bouw || '-'} />
            <DataRow label="Opbouw merk" value={report.opbouw_merk || '-'} />
            <DataRow label="Opbouw type" value={report.opbouw_type || '-'} />
            <DataRow label="Constructievorm" value={report.constructievorm || '-'} />
          </div>

          {/* Sectie 7: Gebruik en stalling (Taxateur) */}
          <div style={{ marginBottom: '20px' }}>
            <SectionHeader title="7. Gebruik en stalling" badge="Taxateur" />
            <DataRow label="Gebruik" value={report.gebruik || '-'} />
            <DataRow label="Stalling" value={report.stalling || '-'} />
            <DataRow label="Staat bij opname" value={report.staat_bij_opname || '-'} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        position: 'absolute', 
        bottom: '24px', 
        left: '24px', 
        right: '24px',
        borderTop: '1px solid #cbd5e1', 
        paddingTop: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '10px', color: '#64748b' }}>
          <span style={{ fontWeight: 600, color: '#1e293b' }}>Automobiel Taxaties</span>
          <span style={{ margin: '0 4px' }}>|</span>
          Leigraaf 160, 6651 GJ Druten
        </div>
        <div style={{ fontSize: '10px', color: '#64748b' }}>
          Pagina 2
        </div>
      </div>
    </div>
  );
};

export default PDFVehicleData;
