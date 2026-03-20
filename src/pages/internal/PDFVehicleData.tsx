import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { getQualityClassByValue } from '@/lib/qualityClasses';

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
  
  // Model display name (taxateur override)
  model_display_name: string | null;
  rdw_bouwjaar: number | null;
  rdw_datum_eerste_toelating: string | null;
  rdw_datum_eerste_tenaamstelling: string | null;
  rdw_datum_laatste_tenaamstelling: string | null;
  rdw_kleur: string | null;
  
  // RDW Sectie 2: Technische hoofdgegevens
  rdw_brandstof: string | null;
  
  // Taxateur: Transmissie
  transmissie: string | null;
  
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
  rdw_apk_gekeurd: boolean | null;
  rdw_apk_vervaldatum: string | null;
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
  stalling_toelichting: string | null;
  staat_bij_opname: string | null;
  
  // Kwaliteitsklasse
  quality_class: string | null;
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

  const DataRow = ({ label, value, source }: { label: string; value: string; source?: string }) => (
    <div style={{ display: 'flex', padding: '5px 0', borderBottom: '1px solid #e2e8f0' }}>
      <span style={{ width: '45%', color: '#000000', fontSize: '10px', fontWeight: 500 }}>{label}</span>
      <span style={{ width: '40%', color: '#000000', fontSize: '10px', fontWeight: 600 }}>{value}</span>
      {source && (
        <span style={{ width: '15%', color: '#000000', fontSize: '9px', fontWeight: 400, textAlign: 'right', opacity: 0.7 }}>{source}</span>
      )}
    </div>
  );

  const SectionHeader = ({ number, title }: { number: string; title: string }) => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px',
      marginBottom: '8px',
      paddingBottom: '6px',
      borderBottom: '2px solid #000000'
    }}>
      <h3 style={{ fontSize: '12px', fontWeight: 600, color: '#000000', margin: 0 }}>
        {number}. {title}
      </h3>
    </div>
  );

  return (
    <div 
      className="bg-white font-sans"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '20px 24px',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '18px', fontWeight: 600, color: '#000000', margin: 0, textTransform: 'uppercase' }}>VOERTUIGGEGEVENS</h1>
          <p style={{ fontSize: '10px', color: '#000000', margin: '2px 0 0 0' }}>
            Documentkenmerk: {report.document_reference || '-'}
          </p>
        </div>
        <img src={logoAutomobiel} alt="Automobiel Taxaties" style={{ height: '36px', width: 'auto' }} />
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'flex', gap: '20px' }}>
        {/* Left Column */}
        <div style={{ width: '50%' }}>
          {/* Sectie 1: Identificatie (RDW) */}
          <div style={{ marginBottom: '16px' }}>
            <SectionHeader number="1" title="Identificatie (RDW)" />
            <DataRow label="Kenteken" value={report.license_plate || '-'} source="RDW" />
            <DataRow label="Merk" value={report.rdw_merk || '-'} source="RDW" />
            <DataRow label="Handelsbenaming (RDW)" value={report.rdw_handelsbenaming || '-'} source="RDW" />
            {report.model_display_name && (
              <DataRow label="Model (vastgesteld)" value={report.model_display_name} source="Taxateur" />
            )}
            <DataRow label="Voertuigsoort" value={report.rdw_voertuigsoort || '-'} source="RDW" />
            <DataRow label="Carrosserievorm" value={report.rdw_carrosserievorm || '-'} source="RDW" />
            <DataRow label="Chassisnummer (VIN)" value={report.vin || '-'} source="RDW" />
            <DataRow label="Meldcode" value={getMeldcode(report.vin)} source="" />
            <DataRow label="Bouwjaar" value={report.rdw_bouwjaar?.toString() || '-'} source="RDW" />
            <DataRow label="Datum eerste toelating" value={formatDate(report.rdw_datum_eerste_toelating)} source="RDW" />
            <DataRow label="Datum eerste tenaamstelling" value={formatDate(report.rdw_datum_eerste_tenaamstelling)} source="RDW" />
            <DataRow label="Datum laatste tenaamstelling" value={formatDate(report.rdw_datum_laatste_tenaamstelling)} source="RDW" />
            <DataRow label="Kleur" value={report.rdw_kleur || '-'} source="RDW" />
          </div>

          {/* Sectie 2: Technische hoofdgegevens (RDW) */}
          <div style={{ marginBottom: '16px' }}>
            <SectionHeader number="2" title="Technische hoofdgegevens (RDW)" />
            <DataRow label="Brandstof" value={report.rdw_brandstof || '-'} source="RDW" />
            {report.transmissie && (
              <DataRow 
                label="Transmissie" 
                value={report.transmissie === 'handgeschakeld' ? 'Handgeschakeld' : report.transmissie === 'automaat' ? 'Automaat' : '-'} 
                source="Taxateur" 
              />
            )}
            <DataRow label="Aantal cilinders" value={formatNumber(report.rdw_aantal_cilinders)} source="RDW" />
            <DataRow label="Cilinderinhoud (cc)" value={formatNumber(report.rdw_cilinderinhoud, 'cc')} source="RDW" />
            <DataRow label="Vermogen (kW)" value={formatNumber(report.rdw_vermogen_kw, 'kW')} source="RDW" />
            <DataRow label="Aantal deuren" value={formatNumber(report.rdw_aantal_deuren)} source="RDW" />
            <DataRow label="Wielbasis" value={formatNumber(report.rdw_wielbasis, 'mm')} source="RDW" />
          </div>

          {/* Sectie 3: Massa en gewichten (RDW) */}
          <div style={{ marginBottom: '16px' }}>
            <SectionHeader number="3" title="Massa en gewichten (RDW)" />
            <DataRow label="Ledig gewicht" value={formatNumber(report.rdw_ledig_gewicht, 'kg')} source="RDW" />
            <DataRow label="Massa rijklaar" value={formatNumber(report.rdw_massa_rijklaar, 'kg')} source="RDW" />
            <DataRow label="Toegestane max. massa" value={formatNumber(report.rdw_max_massa, 'kg')} source="RDW" />
          </div>
        </div>

        {/* Right Column */}
        <div style={{ width: '50%' }}>
          {/* Sectie 4: Keuring en status (RDW) */}
          <div style={{ marginBottom: '16px' }}>
            <SectionHeader number="4" title="Keuring en status (RDW)" />
            <DataRow label="APK gekeurd" value={formatBoolean(report.rdw_apk_gekeurd)} source="RDW" />
            <DataRow label="APK vervaldatum" value={formatDate(report.rdw_apk_vervaldatum)} source="RDW" />
            <DataRow label="Importvoertuig" value={formatBoolean(report.rdw_importvoertuig)} source="RDW" />
          </div>

          {/* Sectie 5: Tellerstand (Taxateur) */}
          <div style={{ marginBottom: '16px' }}>
            <SectionHeader number="5" title="Tellerstand (Taxateur)" />
            <DataRow 
              label="Tellerstand" 
              value={report.tellerstand ? `${report.tellerstand.toLocaleString('nl-NL')}` : '-'} 
              source="Taxateur"
            />
            <DataRow 
              label="Tellerstand type" 
              value={report.tellerstand_type === 'km' ? 'Kilometer (km)' : report.tellerstand_type === 'miles' ? 'Miles' : '-'} 
              source="Taxateur"
            />
          </div>

          {/* Sectie 6: Opbouw en constructie (Taxateur) */}
          <div style={{ marginBottom: '16px' }}>
            <SectionHeader number="6" title="Opbouw en constructie (Taxateur)" />
            <DataRow label="Soort bouw" value={report.soort_bouw || '-'} source="Taxateur" />
            <DataRow label="Opbouw merk" value={report.opbouw_merk || '-'} source="Taxateur" />
            <DataRow label="Opbouw type" value={report.opbouw_type || '-'} source="Taxateur" />
            <DataRow label="Constructievorm" value={report.constructievorm || '-'} source="Taxateur" />
          </div>

          {/* Sectie 7: Gebruik en stalling (Taxateur) */}
          <div style={{ marginBottom: '16px' }}>
            <SectionHeader number="7" title="Gebruik en stalling (Taxateur)" />
            <DataRow label="Gebruik" value={report.gebruik || '-'} source="Taxateur" />
            <DataRow label="Stalling" value={
              report.stalling 
                ? `${report.stalling === 'binnen' ? 'Binnen' : report.stalling === 'buiten' ? 'Buiten' : report.stalling === 'onbekend' ? 'Onbekend' : report.stalling}${report.stalling_toelichting ? `, ${report.stalling_toelichting}` : ''}`
                : '-'
            } source="Taxateur" />
            <DataRow label="Staat bij opname" value={report.staat_bij_opname || '-'} source="Taxateur" />
          </div>

          {/* Sectie 8: Kwaliteitsklasse (Taxateur) */}
          {report.quality_class && (
            <div style={{ marginBottom: '16px' }}>
              <SectionHeader number="8" title="Kwaliteitsklasse (Taxateur)" />
              <div style={{ padding: '8px 0' }}>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#000000', marginBottom: '4px' }}>
                  {report.quality_class}
                </div>
                <p style={{ fontSize: '10px', color: '#000000', lineHeight: 1.5, margin: 0 }}>
                  {getQualityClassByValue(report.quality_class)?.description || ''}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        position: 'absolute', 
        bottom: '20px', 
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
        <div style={{ fontSize: '9px', color: '#000000' }}>
          Pagina 2
        </div>
      </div>
    </div>
  );
};

export default PDFVehicleData;
