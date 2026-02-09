import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';
import signatureErik from '@/assets/signature-erik-elderson.svg';
import { getQualityClassByValue } from '@/lib/qualityClasses';

interface Report {
  id: string;
  document_reference: string | null;
  tellerstand: number | null;
  tellerstand_type: string | null;
  gebruik: string | null;
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
  tire_bandenmaat: string | null;
  tire_front_left_brand: string | null;
  tire_front_left_model: string | null;
  tire_front_left_profiel: string | null;
  tire_front_left_dot: string | null;
  tire_front_right_brand: string | null;
  tire_front_right_model: string | null;
  tire_front_right_profiel: string | null;
  tire_front_right_dot: string | null;
  tire_rear_left_brand: string | null;
  tire_rear_left_model: string | null;
  tire_rear_left_profiel: string | null;
  tire_rear_left_dot: string | null;
  tire_rear_right_brand: string | null;
  tire_rear_right_model: string | null;
  tire_rear_right_profiel: string | null;
  tire_rear_right_dot: string | null;
  rim_type: string | null;
  tire_advice: string | null;
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
  installation_electrical: string | null;
  installation_water: string | null;
  installation_gas: string | null;
  leakage_electrical: string | null;
  lpg_underbody: boolean | null;
  loose_gas_tanks: boolean | null;
  gas_hose_production_date: string | null;
  pressure_regulator_production_date: string | null;
  voltage: string | null;
  earth_leakage_switch: boolean | null;
  fused: boolean | null;
  onboard_battery: boolean | null;
  starter_battery: boolean | null;
  security_present: boolean | null;
  security_type: string | null;
  mechanical_security: string | null;
  vehicle_tracking: boolean | null;
  tracking_brand: string | null;
  moisture_measurement_performed: boolean | null;
  moisture_advice: string | null;
  fire_extinguisher: boolean | null;
  gas_detection: boolean | null;
  smoke_detector: boolean | null;
  impression_suspension: string | null;
  impression_wheels_tires: string | null;
  impression_steering: string | null;
  impression_brakes: string | null;
  impression_engine: string | null;
  impression_transmission: string | null;
  impression_electrical: string | null;
  impression_body: string | null;
  impression_interior: string | null;
  impression_general: string | null;
  impression_extras: string | null;
  general_remarks: string | null;
  quality_class: string | null;
}

interface PDFAppraisalFindingsContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: any;
  pageNumber?: number;
}

const PDFAppraisalFindingsContent = ({ report, pageNumber = 3 }: PDFAppraisalFindingsContentProps) => {
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

  const formatRimType = (value: string | null) => {
    if (!value) return '-';
    const labels: Record<string, string> = {
      staal: 'Staalvelgen',
      lichtmetaal: 'Lichtmetalen velgen',
    };
    return labels[value] || value;
  };

  const formatBoolean = (value: boolean | null) => {
    if (value === null || value === undefined) return '-';
    return value ? 'Ja' : 'Nee';
  };

  const formatLeakage = (value: string | null) => {
    if (!value) return '-';
    const labels: Record<string, string> = {
      geen_meting: 'Geen meting verricht',
      geen_lekkage: 'Geen lekkage waargenomen',
      wel_lekkage: 'Lekkage waargenomen',
    };
    return labels[value] || value;
  };

  const formatMechanicalSecurity = (value: string | null) => {
    if (!value) return '-';
    const labels: Record<string, string> = {
      bearlock: 'Bearlock',
      construct: 'Construct',
      anders: 'Anders',
    };
    return labels[value] || value;
  };

  // ConditionRow - hide empty notes, never show dashes
  const ConditionRow = ({ label, condition, notes }: { label: string; condition: string | null; notes: string | null }) => {
    // If no condition set, don't show row at all
    if (!condition) return null;
    return (
      <div style={{ display: 'flex', padding: '3px 0', borderBottom: '1px solid #e2e8f0' }}>
        <span style={{ width: '35%', color: '#000000', fontSize: '8px', fontWeight: 500 }}>{label}</span>
        <span style={{ width: '18%', color: '#000000', fontSize: '8px', fontWeight: 600 }}>{formatCondition(condition)}</span>
        <span style={{ width: '47%', color: '#000000', fontSize: '8px' }}>{notes || ''}</span>
      </div>
    );
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <div style={{ 
      marginBottom: '4px',
      paddingBottom: '3px',
      borderBottom: '2px solid #000000'
    }}>
      <h3 style={{ fontSize: '9px', fontWeight: 600, color: '#000000', margin: 0, textTransform: 'uppercase' }}>
        {title}
      </h3>
    </div>
  );

  const TireRow = ({ position, brand, model, profiel, dot }: { position: string; brand: string | null; model: string | null; profiel: string | null; dot: string | null }) => (
    <div style={{ display: 'flex', padding: '3px 0', borderBottom: '1px solid #e2e8f0' }}>
      <span style={{ width: '22%', color: '#000000', fontSize: '8px', fontWeight: 500 }}>{position}</span>
      <span style={{ width: '22%', color: '#000000', fontSize: '8px' }}>{brand || '-'}</span>
      <span style={{ width: '22%', color: '#000000', fontSize: '8px' }}>{model || '-'}</span>
      <span style={{ width: '17%', color: '#000000', fontSize: '8px' }}>{profiel ? `${profiel} mm` : '-'}</span>
      <span style={{ width: '17%', color: '#000000', fontSize: '8px' }}>{dot || '-'}</span>
    </div>
  );

  // DataRow - hide if empty, never show dashes
  const DataRow = ({ label, value }: { label: string; value: string }) => {
    if (!value || value === '-') return null;
    return (
      <div style={{ display: 'flex', padding: '3px 0', borderBottom: '1px solid #e2e8f0' }}>
        <span style={{ width: '50%', color: '#000000', fontSize: '8px', fontWeight: 500 }}>{label}</span>
        <span style={{ width: '50%', color: '#000000', fontSize: '8px', fontWeight: 600 }}>{value}</span>
      </div>
    );
  };

  const qualityClass = getQualityClassByValue(report.quality_class);

  // Check if camper tech sections have any data
  const hasCamperTechData = report.lpg_underbody || report.loose_gas_tanks || 
    report.gas_hose_production_date || report.pressure_regulator_production_date ||
    report.voltage || report.earth_leakage_switch || report.fused || 
    report.onboard_battery || report.starter_battery;

  const hasInstallationsData = report.installation_electrical || 
    report.installation_water || report.installation_gas || report.leakage_electrical;

  const hasSecurityData = report.security_present || report.security_type || 
    report.mechanical_security || report.vehicle_tracking || report.tracking_brand;

  const hasMoistureData = report.moisture_measurement_performed || report.moisture_advice;

  const hasFireSafetyData = report.fire_extinguisher || report.gas_detection || report.smoke_detector;

  const hasImpressionData = report.impression_suspension || report.impression_wheels_tires ||
    report.impression_steering || report.impression_brakes || report.impression_engine ||
    report.impression_transmission || report.impression_electrical || report.impression_body ||
    report.impression_interior || report.impression_general || report.impression_extras;

  return (
    <div 
      className="bg-white font-sans pdf-page"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '14px 18px',
        boxSizing: 'border-box',
        position: 'relative',
        pageBreakAfter: 'always',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div>
          <h1 style={{ fontSize: '14px', fontWeight: 600, color: '#000000', margin: 0, textTransform: 'uppercase' }}>TAXATEURBEVINDINGEN</h1>
          {report.document_reference && (
            <p style={{ fontSize: '8px', color: '#000000', margin: '2px 0 0 0' }}>
              Documentkenmerk: {report.document_reference}
            </p>
          )}
        </div>
        <img crossOrigin="anonymous" src={logoAutomobiel} alt="Automobiel Taxaties" style={{ height: '28px', width: 'auto' }} />
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'flex', gap: '14px' }}>
        {/* Left Column */}
        <div style={{ width: '50%' }}>
          {/* Tellerstand en gebruik */}
          <div style={{ marginBottom: '10px' }}>
            <SectionHeader title="Tellerstand en gebruik" />
            <DataRow 
              label="Tellerstand" 
              value={report.tellerstand 
                ? `${report.tellerstand.toLocaleString('nl-NL')} ${report.tellerstand_type === 'km' ? 'km' : report.tellerstand_type === 'miles' ? 'miles' : ''}` 
                : '-'
              } 
            />
            <DataRow label="Gebruik" value={report.gebruik || '-'} />
          </div>

          {/* Technische staat */}
          <div style={{ marginBottom: '10px' }}>
            <SectionHeader title="Technische staat voertuig" />
            <div style={{ display: 'flex', padding: '3px 0', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
              <span style={{ width: '35%', color: '#000000', fontSize: '7px', fontWeight: 600 }}>ONDERDEEL</span>
              <span style={{ width: '18%', color: '#000000', fontSize: '7px', fontWeight: 600 }}>CONDITIE</span>
              <span style={{ width: '47%', color: '#000000', fontSize: '7px', fontWeight: 600 }}>OPMERKINGEN</span>
            </div>
            <ConditionRow label="Motor en aandrijving" condition={report.condition_engine} notes={report.condition_engine_notes} />
            <ConditionRow label="Transmissie" condition={report.condition_transmission} notes={report.condition_transmission_notes} />
            <ConditionRow label="Remmen" condition={report.condition_brakes} notes={report.condition_brakes_notes} />
            <ConditionRow label="Ophanging" condition={report.condition_suspension} notes={report.condition_suspension_notes} />
            <ConditionRow label="Besturing" condition={report.condition_steering} notes={report.condition_steering_notes} />
            <ConditionRow label="Elektrische installatie" condition={report.condition_electrical} notes={report.condition_electrical_notes} />
          </div>

          {/* Banden en wielen */}
          <div style={{ marginBottom: '10px' }}>
            <SectionHeader title="Inspectie van de banden" />
            <DataRow label="Bandenmaat" value={report.tire_bandenmaat || '-'} />
            <div style={{ display: 'flex', padding: '3px 0', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc', marginTop: '4px' }}>
              <span style={{ width: '22%', color: '#000000', fontSize: '7px', fontWeight: 600 }}>POSITIE</span>
              <span style={{ width: '22%', color: '#000000', fontSize: '7px', fontWeight: 600 }}>MERK</span>
              <span style={{ width: '22%', color: '#000000', fontSize: '7px', fontWeight: 600 }}>TYPE</span>
              <span style={{ width: '17%', color: '#000000', fontSize: '7px', fontWeight: 600 }}>PROFIEL</span>
              <span style={{ width: '17%', color: '#000000', fontSize: '7px', fontWeight: 600 }}>DOT</span>
            </div>
            <TireRow position="LV" brand={report.tire_front_left_brand} model={report.tire_front_left_model} profiel={report.tire_front_left_profiel} dot={report.tire_front_left_dot} />
            <TireRow position="RV" brand={report.tire_front_right_brand} model={report.tire_front_right_model} profiel={report.tire_front_right_profiel} dot={report.tire_front_right_dot} />
            <TireRow position="LA" brand={report.tire_rear_left_brand} model={report.tire_rear_left_model} profiel={report.tire_rear_left_profiel} dot={report.tire_rear_left_dot} />
            <TireRow position="RA" brand={report.tire_rear_right_brand} model={report.tire_rear_right_model} profiel={report.tire_rear_right_profiel} dot={report.tire_rear_right_dot} />
            <div style={{ marginTop: '4px' }}>
              <DataRow label="Type velg" value={formatRimType(report.rim_type)} />
            </div>
            {report.tire_advice && (
              <div style={{ marginTop: '4px', padding: '4px', backgroundColor: '#f8fafc', borderRadius: '2px' }}>
                <span style={{ color: '#000000', fontSize: '7px', fontWeight: 500 }}>Advies: </span>
                <span style={{ color: '#000000', fontSize: '8px' }}>{report.tire_advice}</span>
              </div>
            )}
          </div>

          {/* Extra's / LPG */}
          {hasCamperTechData && (
            <div style={{ marginBottom: '10px' }}>
              <SectionHeader title="Extra's / LPG" />
              <DataRow label="LPG onderbouw" value={formatBoolean(report.lpg_underbody)} />
              <DataRow label="Losse gastank(s)" value={formatBoolean(report.loose_gas_tanks)} />
              {report.gas_hose_production_date && <DataRow label="Gasslang productiedatum" value={report.gas_hose_production_date} />}
              {report.pressure_regulator_production_date && <DataRow label="Drukregelaar productiedatum" value={report.pressure_regulator_production_date} />}
              <DataRow label="Voltage" value={report.voltage || '12V-230V'} />
              <DataRow label="Aardlekschakelaar" value={formatBoolean(report.earth_leakage_switch)} />
              <DataRow label="Gezekerd" value={formatBoolean(report.fused)} />
              <DataRow label="Boordaccu" value={formatBoolean(report.onboard_battery)} />
              <DataRow label="Startaccu" value={formatBoolean(report.starter_battery)} />
            </div>
          )}

          {/* Leidingen & Installaties */}
          {hasInstallationsData && (
            <div style={{ marginBottom: '10px' }}>
              <SectionHeader title="Leidingen en installaties" />
              <DataRow label="Montage elektra" value={formatCondition(report.installation_electrical)} />
              <DataRow label="Montage water" value={formatCondition(report.installation_water)} />
              <DataRow label="Montage gas" value={formatCondition(report.installation_gas)} />
              <DataRow label="Lekkage elektra" value={formatLeakage(report.leakage_electrical)} />
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ width: '50%' }}>
          {/* Beschrijving van het object */}
          <div style={{ marginBottom: '10px' }}>
            <SectionHeader title="Beschrijving van het object" />
            <div style={{ display: 'flex', padding: '3px 0', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
              <span style={{ width: '35%', color: '#000000', fontSize: '7px', fontWeight: 600 }}>ONDERDEEL</span>
              <span style={{ width: '18%', color: '#000000', fontSize: '7px', fontWeight: 600 }}>CONDITIE</span>
              <span style={{ width: '47%', color: '#000000', fontSize: '7px', fontWeight: 600 }}>OPMERKINGEN</span>
            </div>
            <ConditionRow label="Optische staat plaatwerk" condition={report.exterior_body} notes={report.exterior_body_notes} />
            <ConditionRow label="Optische staat lakwerk" condition={report.exterior_paint} notes={report.exterior_paint_notes} />
            <ConditionRow label="Optische staat chassis" condition={report.exterior_rubbers} notes={report.exterior_rubbers_notes} />
            <ConditionRow label="Optische staat voorruit" condition={report.exterior_windows} notes={report.exterior_windows_notes} />
            <ConditionRow label="Staat verlichting" condition={report.exterior_sealant} notes={report.exterior_sealant_notes} />
          </div>

          {/* Overige condities (Interieur) */}
          <div style={{ marginBottom: '10px' }}>
            <SectionHeader title="Overige condities" />
            <div style={{ display: 'flex', padding: '3px 0', borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
              <span style={{ width: '35%', color: '#000000', fontSize: '7px', fontWeight: 600 }}>ONDERDEEL</span>
              <span style={{ width: '18%', color: '#000000', fontSize: '7px', fontWeight: 600 }}>CONDITIE</span>
              <span style={{ width: '47%', color: '#000000', fontSize: '7px', fontWeight: 600 }}>OPMERKINGEN</span>
            </div>
            <ConditionRow label="Bekleding" condition={report.interior_upholstery} notes={report.interior_upholstery_notes} />
            <ConditionRow label="Rubbers en lijsten" condition={report.interior_dashboard} notes={report.interior_dashboard_notes} />
            <ConditionRow label="Hang- en sluitwerk" condition={report.interior_floor} notes={report.interior_floor_notes} />
            <ConditionRow label="Vloer en vloerbedekking" condition={report.interior_roof} notes={report.interior_roof_notes} />
            <ConditionRow label="Ramen en kozijnen" condition={report.interior_kitchen} notes={report.interior_kitchen_notes} />
            <ConditionRow label="Deuren" condition={report.interior_sanitary} notes={report.interior_sanitary_notes} />
          </div>

          {/* Beveiliging */}
          {hasSecurityData && (
            <div style={{ marginBottom: '10px' }}>
              <SectionHeader title="Beveiliging" />
              <DataRow label="Beveiliging aanwezig" value={formatBoolean(report.security_present)} />
              {report.security_type && <DataRow label="Beveiliging soort" value={report.security_type} />}
              {report.mechanical_security && <DataRow label="Mechanische beveiliging" value={formatMechanicalSecurity(report.mechanical_security)} />}
              <DataRow label="Voertuigvolgsysteem" value={formatBoolean(report.vehicle_tracking)} />
              {report.tracking_brand && <DataRow label="Merk volgsysteem" value={report.tracking_brand} />}
            </div>
          )}

          {/* Vocht */}
          {hasMoistureData && (
            <div style={{ marginBottom: '10px' }}>
              <SectionHeader title="Vocht" />
              <DataRow label="Vochtmeting verricht" value={formatBoolean(report.moisture_measurement_performed)} />
              {report.moisture_advice && <DataRow label="Advies vochtinwerking" value={report.moisture_advice} />}
            </div>
          )}

          {/* Brand- en gasveiligheid */}
          {hasFireSafetyData && (
            <div style={{ marginBottom: '10px' }}>
              <SectionHeader title="Brand- en gasveiligheid" />
              <DataRow label="Brandblusapparaat" value={formatBoolean(report.fire_extinguisher)} />
              <DataRow label="Gasdetectie" value={formatBoolean(report.gas_detection)} />
              <DataRow label="Rookmelder" value={formatBoolean(report.smoke_detector)} />
            </div>
          )}

          {/* Kwaliteitsklasse */}
          {qualityClass && (
            <div style={{ marginBottom: '10px' }}>
              <SectionHeader title="Kwaliteitsklasse" />
              <div style={{ padding: '6px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                <p style={{ fontSize: '10px', fontWeight: 600, color: '#000000', margin: '0 0 4px 0' }}>
                  {qualityClass.label}
                </p>
                <p style={{ fontSize: '8px', color: '#000000', margin: 0, lineHeight: 1.4 }}>
                  {qualityClass.description}
                </p>
              </div>
            </div>
          )}

          {/* Algemene Indruk */}
          {hasImpressionData && (
            <div style={{ marginBottom: '10px' }}>
              <SectionHeader title="Algemene indruk" />
              <div style={{ fontSize: '8px', color: '#000000', lineHeight: 1.5 }}>
                {report.impression_suspension && <p style={{ margin: '2px 0' }}>{report.impression_suspension}</p>}
                {report.impression_wheels_tires && <p style={{ margin: '2px 0' }}>{report.impression_wheels_tires}</p>}
                {report.impression_steering && <p style={{ margin: '2px 0' }}>{report.impression_steering}</p>}
                {report.impression_brakes && <p style={{ margin: '2px 0' }}>{report.impression_brakes}</p>}
                {report.impression_engine && <p style={{ margin: '2px 0' }}>{report.impression_engine}</p>}
                {report.impression_transmission && <p style={{ margin: '2px 0' }}>{report.impression_transmission}</p>}
                {report.impression_electrical && <p style={{ margin: '2px 0' }}>{report.impression_electrical}</p>}
                {report.impression_body && <p style={{ margin: '2px 0' }}>{report.impression_body}</p>}
                {report.impression_interior && <p style={{ margin: '2px 0' }}>{report.impression_interior}</p>}
                {report.impression_general && <p style={{ margin: '2px 0' }}><strong>{report.impression_general}</strong></p>}
                {report.impression_extras && report.impression_extras !== 'N.v.t.' && (
                  <p style={{ margin: '2px 0' }}><strong>Extra's:</strong> {report.impression_extras}</p>
                )}
              </div>
            </div>
          )}

          {/* Bijzonderheden */}
          {report.general_remarks && (
            <div style={{ marginBottom: '10px' }}>
              <SectionHeader title="Bijzonderheden / afwijkingen" />
              <p style={{ fontSize: '8px', color: '#000000', lineHeight: 1.5, margin: 0 }}>
                {report.general_remarks}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        position: 'absolute', 
        bottom: '14px', 
        left: '18px', 
        right: '18px',
        borderTop: '1px solid #e2e8f0', 
        paddingTop: '6px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '7px', color: '#000000' }}>
          <span style={{ fontWeight: 600 }}>Automobiel Taxaties</span>
          <span style={{ margin: '0 4px' }}>|</span>
          Leigraaf 160, 6651 GJ Druten
          <span style={{ margin: '0 4px' }}>|</span>
          KVK: 95549269
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4mm' }}>
          <span style={{ fontSize: '8px', fontWeight: 500, color: '#000000' }}>Paraaf</span>
          <img crossOrigin="anonymous" src={signatureErik} alt="Paraaf" style={{ height: '20mm', width: 'auto' }} />
          <span style={{ fontSize: '7px', color: '#000000', fontWeight: 500, marginLeft: '4mm' }}>
            Pagina {pageNumber}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PDFAppraisalFindingsContent;
