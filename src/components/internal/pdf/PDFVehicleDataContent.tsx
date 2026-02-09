import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';
import signatureErik from '@/assets/signature-erik-elderson.svg';
import { getQualityClassByValue } from '@/lib/qualityClasses';

interface Report {
  id: string;
  report_number: string;
  document_reference: string | null;
  license_plate: string | null;
  vin: string | null;
  rdw_merk: string | null;
  rdw_handelsbenaming: string | null;
  rdw_voertuigsoort: string | null;
  rdw_carrosserievorm: string | null;
  model_display_name: string | null;
  rdw_bouwjaar: number | null;
  rdw_datum_eerste_toelating: string | null;
  rdw_datum_eerste_tenaamstelling: string | null;
  rdw_datum_laatste_tenaamstelling: string | null;
  rdw_kleur: string | null;
  rdw_brandstof: string | null;
  transmissie: string | null;
  rdw_aantal_cilinders: number | null;
  rdw_cilinderinhoud: number | null;
  rdw_vermogen_kw: number | null;
  rdw_aantal_deuren: number | null;
  rdw_wielbasis: number | null;
  rdw_ledig_gewicht: number | null;
  rdw_massa_rijklaar: number | null;
  rdw_max_massa: number | null;
  rdw_apk_gekeurd: boolean | null;
  rdw_apk_vervaldatum: string | null;
  rdw_importvoertuig: boolean | null;
  tellerstand: number | null;
  tellerstand_type: string | null;
  soort_bouw: string | null;
  opbouw_merk: string | null;
  opbouw_type: string | null;
  constructievorm: string | null;
  gebruik: string | null;
  stalling: string | null;
  staat_bij_opname: string | null;
  quality_class: string | null;
  report_type: string | null;
}

interface PDFVehicleDataContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: any;
  pageNumber?: number;
  totalPages?: number;
}

const PDFVehicleDataContent = ({ report, pageNumber = 2, totalPages = 10 }: PDFVehicleDataContentProps) => {
  const isKlassiekerReport = report.report_type === 'klassieker';
  
  const formatDate = (dateString: string | null) => {
    if (!dateString) return '–';
    return new Date(dateString).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatBoolean = (value: boolean | null) => {
    if (value === null || value === undefined) return '–';
    return value ? 'Ja' : 'Nee';
  };

  const formatNumber = (value: number | null, suffix?: string) => {
    if (value === null || value === undefined) return '–';
    return suffix ? `${value.toLocaleString('nl-NL')} ${suffix}` : value.toLocaleString('nl-NL');
  };

  const getMeldcode = (vin: string | null) => {
    if (!vin || vin.length < 4) return '–';
    return vin.slice(-4).toUpperCase();
  };

  // DataRow - show dash for empty values (klassieker requirement)
  const DataRow = ({ label, value }: { label: string; value: string }) => {
    const displayValue = (!value || value === '-' || value === '') ? '–' : value;
    // For non-klassieker: hide empty rows (original behavior)
    if (!isKlassiekerReport && displayValue === '–') return null;
    return (
      <div style={{ display: 'flex', padding: '6px 0', borderBottom: '1px solid #e2e8f0' }}>
        <span style={{ width: '50%', color: '#000000', fontSize: '11px', fontWeight: 500 }}>{label}</span>
        <span style={{ width: '50%', color: '#000000', fontSize: '11px', fontWeight: 600 }}>{displayValue}</span>
      </div>
    );
  };

  const SectionHeader = ({ number, title }: { number: string; title: string }) => (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '8px',
      marginBottom: '10px',
      paddingBottom: '8px',
      borderBottom: '2px solid #000000'
    }}>
      <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#000000', margin: 0 }}>
        {number}. {title}
      </h3>
    </div>
  );

  return (
    <div 
      className="bg-white pdf-page"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '24px 28px',
        boxSizing: 'border-box',
        position: 'relative',
        pageBreakAfter: 'always',
        fontFamily: 'Helvetica, Arial, sans-serif',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#000000', margin: 0, textTransform: 'uppercase' }}>VOERTUIGGEGEVENS</h1>
          {report.document_reference && (
            <p style={{ fontSize: '11px', color: '#000000', margin: '4px 0 0 0' }}>
              Documentkenmerk: {report.document_reference}
            </p>
          )}
        </div>
        <img crossOrigin="anonymous" src={logoAutomobiel} alt="Automobiel Taxaties" style={{ height: '40px', width: 'auto' }} />
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Left Column */}
        <div style={{ width: '50%' }}>
          {/* Sectie 1: Identificatie */}
          <div style={{ marginBottom: '22px' }}>
            <SectionHeader number="1" title="Identificatie" />
            <DataRow label="Kenteken" value={report.license_plate || ''} />
            <DataRow label="Merk" value={report.rdw_merk || ''} />
            <DataRow label="Handelsbenaming" value={report.rdw_handelsbenaming || ''} />
            <DataRow label="Model (vastgesteld)" value={report.model_display_name || ''} />
            <DataRow label="Voertuigsoort" value={report.rdw_voertuigsoort || ''} />
            <DataRow label="Carrosserievorm" value={report.rdw_carrosserievorm || ''} />
            <DataRow label="Chassisnummer (VIN)" value={report.vin || ''} />
            <DataRow label="Meldcode" value={getMeldcode(report.vin)} />
            <DataRow label="Bouwjaar" value={report.rdw_bouwjaar?.toString() || ''} />
            <DataRow label="Datum eerste toelating" value={formatDate(report.rdw_datum_eerste_toelating)} />
            <DataRow label="Datum eerste tenaamstelling" value={formatDate(report.rdw_datum_eerste_tenaamstelling)} />
            <DataRow label="Datum laatste tenaamstelling" value={formatDate(report.rdw_datum_laatste_tenaamstelling)} />
            <DataRow label="Kleur" value={report.rdw_kleur || ''} />
          </div>

          {/* Sectie 2: Technische hoofdgegevens */}
          <div style={{ marginBottom: '22px' }}>
            <SectionHeader number="2" title="Technische hoofdgegevens" />
            <DataRow label="Brandstof" value={report.rdw_brandstof || ''} />
            <DataRow 
              label="Transmissie" 
              value={report.transmissie === 'handgeschakeld' ? 'Handgeschakeld' : report.transmissie === 'automaat' ? 'Automaat' : ''} 
            />
            <DataRow label="Aantal cilinders" value={formatNumber(report.rdw_aantal_cilinders)} />
            <DataRow label="Cilinderinhoud (cc)" value={formatNumber(report.rdw_cilinderinhoud, 'cc')} />
            <DataRow label="Vermogen (kW)" value={formatNumber(report.rdw_vermogen_kw, 'kW')} />
            <DataRow label="Aantal deuren" value={formatNumber(report.rdw_aantal_deuren)} />
            <DataRow label="Wielbasis" value={formatNumber(report.rdw_wielbasis, 'mm')} />
          </div>

          {/* Sectie 3: Massa en gewichten */}
          <div style={{ marginBottom: '22px' }}>
            <SectionHeader number="3" title="Massa en gewichten" />
            <DataRow label="Ledig gewicht" value={formatNumber(report.rdw_ledig_gewicht, 'kg')} />
            <DataRow label="Massa rijklaar" value={formatNumber(report.rdw_massa_rijklaar, 'kg')} />
            <DataRow label="Toegestane max. massa" value={formatNumber(report.rdw_max_massa, 'kg')} />
          </div>
        </div>

        {/* Right Column */}
        <div style={{ width: '50%' }}>
          {/* Sectie 4: Keuring en status */}
          <div style={{ marginBottom: '22px' }}>
            <SectionHeader number="4" title="Keuring en status" />
            <DataRow label="APK gekeurd" value={formatBoolean(report.rdw_apk_gekeurd)} />
            <DataRow label="APK vervaldatum" value={formatDate(report.rdw_apk_vervaldatum)} />
            <DataRow label="Importvoertuig" value={formatBoolean(report.rdw_importvoertuig)} />
          </div>

          {/* Sectie 5: Tellerstand */}
          <div style={{ marginBottom: '22px' }}>
            <SectionHeader number="5" title="Tellerstand" />
            <DataRow 
              label="Tellerstand" 
              value={report.tellerstand ? `${report.tellerstand.toLocaleString('nl-NL')}` : ''} 
            />
            <DataRow 
              label="Tellerstand type" 
              value={report.tellerstand_type === 'km' ? 'Kilometer (km)' : report.tellerstand_type === 'miles' ? 'Miles' : ''} 
            />
          </div>

          {/* Sectie 6: Opbouw en constructie (not for klassieker) */}
          {!isKlassiekerReport && (
            <div style={{ marginBottom: '22px' }}>
              <SectionHeader number="6" title="Opbouw en constructie" />
              <DataRow label="Soort bouw" value={report.soort_bouw || ''} />
              <DataRow label="Opbouw merk" value={report.opbouw_merk || ''} />
              <DataRow label="Opbouw type" value={report.opbouw_type || ''} />
              <DataRow label="Constructievorm" value={report.constructievorm || ''} />
            </div>
          )}

          {/* Sectie 7: Gebruik en stalling (not for klassieker) */}
          {!isKlassiekerReport && (
            <div style={{ marginBottom: '22px' }}>
              <SectionHeader number={isKlassiekerReport ? "6" : "7"} title="Gebruik en stalling" />
              <DataRow label="Gebruik" value={report.gebruik || ''} />
              <DataRow label="Stalling" value={report.stalling || ''} />
              <DataRow label="Staat bij opname" value={report.staat_bij_opname || ''} />
            </div>
          )}

          {/* Sectie 8 (or 6 for klassieker): Kwaliteitsklasse */}
          {report.quality_class && (
            <div style={{ marginBottom: '22px' }}>
              <SectionHeader number={isKlassiekerReport ? "6" : "8"} title="Kwaliteitsklasse" />
              <div style={{ padding: '10px 0' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#000000', marginBottom: '6px' }}>
                  {report.quality_class}
                </div>
                <p style={{ fontSize: '11px', color: '#000000', lineHeight: 1.6, margin: 0 }}>
                  {getQualityClassByValue(report.quality_class)?.description || '–'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer with paraaf */}
      <div style={{ 
        position: 'absolute', 
        bottom: '24px', 
        left: '28px', 
        right: '28px',
        borderTop: '1px solid #e2e8f0', 
        paddingTop: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '10px', color: '#000000' }}>
          <span style={{ fontWeight: 600 }}>Automobiel Taxaties</span>
          <span style={{ margin: '0 4px' }}>|</span>
          Leigraaf 160, 6651 GJ Druten
          <span style={{ margin: '0 4px' }}>|</span>
          KVK: 95549269
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
          <div style={{ fontSize: '10px', color: '#000000' }}>
            Pagina {pageNumber} van {totalPages}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0mm' }}>
            <span style={{ fontSize: '9px', fontWeight: 600, color: '#000000', marginBottom: '1mm' }}>Paraaf</span>
            <img crossOrigin="anonymous" src={signatureErik} alt="Paraaf" style={{ height: '18mm', width: 'auto' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFVehicleDataContent;
