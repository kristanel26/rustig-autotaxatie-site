import { Page, View, Text, Image } from '@react-pdf/renderer';
import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';

const signatureErik = '/signature-erik-elderson.png';
const paraafErik = '/paraaf-erik-elderson.png';
import { getQualityClassByValue } from '@/lib/qualityClasses';

interface PDFAppraisalFindingsContentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report: any;
  pageNumber?: number;
  totalPages?: number;
}

const PDFAppraisalFindingsContent = ({ report, pageNumber = 3, totalPages = 10 }: PDFAppraisalFindingsContentProps) => {
  const formatCondition = (value: string | null) => {
    if (!value) return '-';
    const labels: Record<string, string> = { goed: 'Goed', voldoende: 'Voldoende', matig: 'Matig', slecht: 'Slecht' };
    return labels[value] || value;
  };

  const formatRimType = (value: string | null) => {
    if (!value) return '-';
    const labels: Record<string, string> = { staal: 'Staalvelgen', lichtmetaal: 'Lichtmetalen velgen' };
    return labels[value] || value;
  };

  const formatBoolean = (value: boolean | null) => {
    if (value === null || value === undefined) return '-';
    return value ? 'Ja' : 'Nee';
  };

  const formatLeakage = (value: string | null) => {
    if (!value) return '-';
    const labels: Record<string, string> = { geen_meting: 'Geen meting verricht', geen_lekkage: 'Geen lekkage waargenomen', wel_lekkage: 'Lekkage waargenomen' };
    return labels[value] || value;
  };

  const formatMechanicalSecurity = (value: string | null) => {
    if (!value) return '-';
    const labels: Record<string, string> = { bearlock: 'Bearlock', construct: 'Construct', anders: 'Anders' };
    return labels[value] || value;
  };

  const ConditionRow = ({ label, condition, notes }: { label: string; condition: string | null; notes: string | null }) => {
    if (!condition) return null;
    return (
      <View style={{ flexDirection: 'row', paddingVertical: 3, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' }}>
        <Text style={{ width: '35%', color: '#000000', fontSize: 8 }}>{label}</Text>
        <Text style={{ width: '18%', color: '#000000', fontSize: 8, fontFamily: 'Helvetica-Bold' }}>{formatCondition(condition)}</Text>
        <Text style={{ width: '47%', color: '#000000', fontSize: 8 }}>{notes || ''}</Text>
      </View>
    );
  };

  const SectionHeader = ({ title }: { title: string }) => (
    <View style={{ marginBottom: 4, paddingBottom: 3, borderBottomWidth: 2, borderBottomColor: '#000000' }}>
      <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#000000', textTransform: 'uppercase' }}>{title}</Text>
    </View>
  );

  const TireRow = ({ position, brand, model, profiel, dot }: { position: string; brand: string | null; model: string | null; profiel: string | null; dot: string | null }) => (
    <View style={{ flexDirection: 'row', paddingVertical: 3, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' }}>
      <Text style={{ width: '22%', color: '#000000', fontSize: 8 }}>{position}</Text>
      <Text style={{ width: '22%', color: '#000000', fontSize: 8 }}>{brand || '-'}</Text>
      <Text style={{ width: '22%', color: '#000000', fontSize: 8 }}>{model || '-'}</Text>
      <Text style={{ width: '17%', color: '#000000', fontSize: 8 }}>{profiel ? `${profiel} mm` : '-'}</Text>
      <Text style={{ width: '17%', color: '#000000', fontSize: 8 }}>{dot || '-'}</Text>
    </View>
  );

  const DataRow = ({ label, value }: { label: string; value: string }) => {
    if (!value || value === '-') return null;
    return (
      <View style={{ flexDirection: 'row', paddingVertical: 3, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' }}>
        <Text style={{ width: '50%', color: '#000000', fontSize: 8 }}>{label}</Text>
        <Text style={{ width: '50%', color: '#000000', fontSize: 8, fontFamily: 'Helvetica-Bold' }}>{value}</Text>
      </View>
    );
  };

  const qualityClass = getQualityClassByValue(report.quality_class);

  const hasCamperTechData = report.lpg_underbody || report.loose_gas_tanks || report.gas_hose_production_date || report.pressure_regulator_production_date || report.voltage || report.earth_leakage_switch || report.fused || report.onboard_battery || report.starter_battery;
  const hasInstallationsData = report.installation_electrical || report.installation_water || report.installation_gas || report.leakage_electrical;
  const hasSecurityData = report.security_present || report.security_type || report.mechanical_security || report.vehicle_tracking || report.tracking_brand;
  const hasMoistureData = report.moisture_measurement_performed || report.moisture_advice;
  const hasFireSafetyData = report.fire_extinguisher || report.gas_detection || report.smoke_detector;
  const hasImpressionData = report.impression_suspension || report.impression_wheels_tires || report.impression_steering || report.impression_brakes || report.impression_engine || report.impression_transmission || report.impression_electrical || report.impression_body || report.impression_interior || report.impression_general || report.impression_extras;

  return (
    <Page size="A4" style={{ padding: '14 18', fontFamily: 'Helvetica', position: 'relative' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <View />
        <Image src={logoAutomobiel} style={{ height: 28, width: 'auto' }} />
      </View>
      <Text style={{ fontSize: 7, color: '#888888', marginBottom: 3 }}>
        Automobiel taxatie{report.document_reference ? ` · Documentkenmerk: ${report.document_reference}` : ''}
      </Text>
      <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#cccccc', marginBottom: 10 }} />
      <Text style={{ fontSize: 14, fontFamily: 'Helvetica-Bold', color: '#000000', textTransform: 'uppercase', marginBottom: 10 }}>
        TAXATEURBEVINDINGEN
      </Text>

      {/* Two-column layout */}
      <View style={{ flexDirection: 'row', gap: 14 }}>
        {/* Left Column */}
        <View style={{ width: '50%' }}>
          <View style={{ marginBottom: 10 }}>
            <SectionHeader title="Tellerstand en gebruik" />
            <DataRow label="Tellerstand" value={report.tellerstand ? `${report.tellerstand.toLocaleString('nl-NL')} ${report.tellerstand_type === 'km' ? 'km' : report.tellerstand_type === 'miles' ? 'miles' : ''}` : '-'} />
            <DataRow label="Gebruik" value={report.gebruik || '-'} />
          </View>

          <View style={{ marginBottom: 10 }}>
            <SectionHeader title="Technische staat voertuig" />
            <View style={{ flexDirection: 'row', paddingVertical: 3, borderBottomWidth: 1, borderBottomColor: '#e2e8f0', backgroundColor: '#f8fafc' }}>
              <Text style={{ width: '35%', color: '#000000', fontSize: 7, fontFamily: 'Helvetica-Bold' }}>ONDERDEEL</Text>
              <Text style={{ width: '18%', color: '#000000', fontSize: 7, fontFamily: 'Helvetica-Bold' }}>CONDITIE</Text>
              <Text style={{ width: '47%', color: '#000000', fontSize: 7, fontFamily: 'Helvetica-Bold' }}>OPMERKINGEN</Text>
            </View>
            <ConditionRow label="Motor en aandrijving" condition={report.condition_engine} notes={report.condition_engine_notes} />
            <ConditionRow label="Transmissie" condition={report.condition_transmission} notes={report.condition_transmission_notes} />
            <ConditionRow label="Remmen" condition={report.condition_brakes} notes={report.condition_brakes_notes} />
            <ConditionRow label="Ophanging" condition={report.condition_suspension} notes={report.condition_suspension_notes} />
            <ConditionRow label="Besturing" condition={report.condition_steering} notes={report.condition_steering_notes} />
            <ConditionRow label="Elektrische installatie" condition={report.condition_electrical} notes={report.condition_electrical_notes} />
          </View>

          <View style={{ marginBottom: 10 }}>
            <SectionHeader title="Inspectie van de banden" />
            <DataRow label="Bandenmaat" value={report.tire_bandenmaat || '-'} />
            <View style={{ flexDirection: 'row', paddingVertical: 3, borderBottomWidth: 1, borderBottomColor: '#e2e8f0', backgroundColor: '#f8fafc', marginTop: 4 }}>
              <Text style={{ width: '22%', color: '#000000', fontSize: 7, fontFamily: 'Helvetica-Bold' }}>POSITIE</Text>
              <Text style={{ width: '22%', color: '#000000', fontSize: 7, fontFamily: 'Helvetica-Bold' }}>MERK</Text>
              <Text style={{ width: '22%', color: '#000000', fontSize: 7, fontFamily: 'Helvetica-Bold' }}>TYPE</Text>
              <Text style={{ width: '17%', color: '#000000', fontSize: 7, fontFamily: 'Helvetica-Bold' }}>PROFIEL</Text>
              <Text style={{ width: '17%', color: '#000000', fontSize: 7, fontFamily: 'Helvetica-Bold' }}>DOT</Text>
            </View>
            <TireRow position="LV" brand={report.tire_front_left_brand} model={report.tire_front_left_model} profiel={report.tire_front_left_profiel} dot={report.tire_front_left_dot} />
            <TireRow position="RV" brand={report.tire_front_right_brand} model={report.tire_front_right_model} profiel={report.tire_front_right_profiel} dot={report.tire_front_right_dot} />
            <TireRow position="LA" brand={report.tire_rear_left_brand} model={report.tire_rear_left_model} profiel={report.tire_rear_left_profiel} dot={report.tire_rear_left_dot} />
            <TireRow position="RA" brand={report.tire_rear_right_brand} model={report.tire_rear_right_model} profiel={report.tire_rear_right_profiel} dot={report.tire_rear_right_dot} />
            <View style={{ marginTop: 4 }}>
              <DataRow label="Type velg" value={formatRimType(report.rim_type)} />
            </View>
            {report.tire_advice && (
              <View style={{ marginTop: 4, padding: 4, backgroundColor: '#f8fafc' }}>
                <Text style={{ color: '#000000', fontSize: 7 }}>Advies: {report.tire_advice}</Text>
              </View>
            )}
          </View>

          {hasCamperTechData && (
            <View style={{ marginBottom: 10 }}>
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
            </View>
          )}

          {hasInstallationsData && (
            <View style={{ marginBottom: 10 }}>
              <SectionHeader title="Leidingen en installaties" />
              <DataRow label="Montage elektra" value={formatCondition(report.installation_electrical)} />
              <DataRow label="Montage water" value={formatCondition(report.installation_water)} />
              <DataRow label="Montage gas" value={formatCondition(report.installation_gas)} />
              <DataRow label="Lekkage elektra" value={formatLeakage(report.leakage_electrical)} />
            </View>
          )}
        </View>

        {/* Right Column */}
        <View style={{ width: '50%' }}>
          <View style={{ marginBottom: 10 }}>
            <SectionHeader title="Beschrijving van het object" />
            <View style={{ flexDirection: 'row', paddingVertical: 3, borderBottomWidth: 1, borderBottomColor: '#e2e8f0', backgroundColor: '#f8fafc' }}>
              <Text style={{ width: '35%', color: '#000000', fontSize: 7, fontFamily: 'Helvetica-Bold' }}>ONDERDEEL</Text>
              <Text style={{ width: '18%', color: '#000000', fontSize: 7, fontFamily: 'Helvetica-Bold' }}>CONDITIE</Text>
              <Text style={{ width: '47%', color: '#000000', fontSize: 7, fontFamily: 'Helvetica-Bold' }}>OPMERKINGEN</Text>
            </View>
            <ConditionRow label="Optische staat plaatwerk" condition={report.exterior_body} notes={report.exterior_body_notes} />
            <ConditionRow label="Optische staat lakwerk" condition={report.exterior_paint} notes={report.exterior_paint_notes} />
            <ConditionRow label="Optische staat chassis" condition={report.exterior_rubbers} notes={report.exterior_rubbers_notes} />
            <ConditionRow label="Optische staat voorruit" condition={report.exterior_windows} notes={report.exterior_windows_notes} />
            <ConditionRow label="Staat verlichting" condition={report.exterior_sealant} notes={report.exterior_sealant_notes} />
          </View>

          <View style={{ marginBottom: 10 }}>
            <SectionHeader title="Overige condities" />
            <View style={{ flexDirection: 'row', paddingVertical: 3, borderBottomWidth: 1, borderBottomColor: '#e2e8f0', backgroundColor: '#f8fafc' }}>
              <Text style={{ width: '35%', color: '#000000', fontSize: 7, fontFamily: 'Helvetica-Bold' }}>ONDERDEEL</Text>
              <Text style={{ width: '18%', color: '#000000', fontSize: 7, fontFamily: 'Helvetica-Bold' }}>CONDITIE</Text>
              <Text style={{ width: '47%', color: '#000000', fontSize: 7, fontFamily: 'Helvetica-Bold' }}>OPMERKINGEN</Text>
            </View>
            <ConditionRow label="Bekleding" condition={report.interior_upholstery} notes={report.interior_upholstery_notes} />
            <ConditionRow label="Rubbers en lijsten" condition={report.interior_dashboard} notes={report.interior_dashboard_notes} />
            <ConditionRow label="Hang- en sluitwerk" condition={report.interior_floor} notes={report.interior_floor_notes} />
            <ConditionRow label="Vloer en vloerbedekking" condition={report.interior_roof} notes={report.interior_roof_notes} />
            <ConditionRow label="Ramen en kozijnen" condition={report.interior_kitchen} notes={report.interior_kitchen_notes} />
            <ConditionRow label="Deuren" condition={report.interior_sanitary} notes={report.interior_sanitary_notes} />
          </View>

          {hasSecurityData && (
            <View style={{ marginBottom: 10 }}>
              <SectionHeader title="Beveiliging" />
              <DataRow label="Beveiliging aanwezig" value={formatBoolean(report.security_present)} />
              {report.security_type && <DataRow label="Beveiliging soort" value={report.security_type} />}
              {report.mechanical_security && <DataRow label="Mechanische beveiliging" value={formatMechanicalSecurity(report.mechanical_security)} />}
              <DataRow label="Voertuigvolgsysteem" value={formatBoolean(report.vehicle_tracking)} />
              {report.tracking_brand && <DataRow label="Merk volgsysteem" value={report.tracking_brand} />}
            </View>
          )}

          {hasMoistureData && (
            <View style={{ marginBottom: 10 }}>
              <SectionHeader title="Vocht" />
              <DataRow label="Vochtmeting verricht" value={formatBoolean(report.moisture_measurement_performed)} />
              {report.moisture_advice && <DataRow label="Advies vochtinwerking" value={report.moisture_advice} />}
            </View>
          )}

          {hasFireSafetyData && (
            <View style={{ marginBottom: 10 }}>
              <SectionHeader title="Brand- en gasveiligheid" />
              <DataRow label="Brandblusapparaat" value={formatBoolean(report.fire_extinguisher)} />
              <DataRow label="Gasdetectie" value={formatBoolean(report.gas_detection)} />
              <DataRow label="Rookmelder" value={formatBoolean(report.smoke_detector)} />
            </View>
          )}

          {qualityClass && (
            <View style={{ marginBottom: 10 }}>
              <SectionHeader title="Kwaliteitsklasse" />
              <View style={{ padding: 6, backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#e2e8f0' }}>
                <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#000000', marginBottom: 4 }}>{qualityClass.label}</Text>
                <Text style={{ fontSize: 8, color: '#000000', lineHeight: 1.4 }}>{qualityClass.description}</Text>
              </View>
            </View>
          )}

          {hasImpressionData && (
            <View style={{ marginBottom: 10 }}>
              <SectionHeader title="Algemene indruk" />
              <View style={{ fontSize: 8, color: '#000000', lineHeight: 1.5 }}>
                {report.impression_suspension && <Text style={{ fontSize: 8, color: '#000000', marginBottom: 2 }}>{report.impression_suspension}</Text>}
                {report.impression_wheels_tires && <Text style={{ fontSize: 8, color: '#000000', marginBottom: 2 }}>{report.impression_wheels_tires}</Text>}
                {report.impression_steering && <Text style={{ fontSize: 8, color: '#000000', marginBottom: 2 }}>{report.impression_steering}</Text>}
                {report.impression_brakes && <Text style={{ fontSize: 8, color: '#000000', marginBottom: 2 }}>{report.impression_brakes}</Text>}
                {report.impression_engine && <Text style={{ fontSize: 8, color: '#000000', marginBottom: 2 }}>{report.impression_engine}</Text>}
                {report.impression_transmission && <Text style={{ fontSize: 8, color: '#000000', marginBottom: 2 }}>{report.impression_transmission}</Text>}
                {report.impression_electrical && <Text style={{ fontSize: 8, color: '#000000', marginBottom: 2 }}>{report.impression_electrical}</Text>}
                {report.impression_body && <Text style={{ fontSize: 8, color: '#000000', marginBottom: 2 }}>{report.impression_body}</Text>}
                {report.impression_interior && <Text style={{ fontSize: 8, color: '#000000', marginBottom: 2 }}>{report.impression_interior}</Text>}
                {report.impression_general && <Text style={{ fontSize: 8, color: '#000000', fontFamily: 'Helvetica-Bold', marginBottom: 2 }}>{report.impression_general}</Text>}
                {report.impression_extras && report.impression_extras !== 'N.v.t.' && (
                  <Text style={{ fontSize: 8, color: '#000000', marginBottom: 2 }}>Extra's: {report.impression_extras}</Text>
                )}
              </View>
            </View>
          )}

          {report.general_remarks && (
            <View style={{ marginBottom: 10 }}>
              <SectionHeader title="Bijzonderheden / afwijkingen" />
              <Text style={{ fontSize: 8, color: '#000000', lineHeight: 1.5 }}>{report.general_remarks}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Footer */}
      <View style={{
        position: 'absolute',
        bottom: 14,
        left: 18,
        right: 18,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#000000' }}>Automobiel Taxaties</Text>
          <Text style={{ fontSize: 7, color: '#000000', marginHorizontal: 4 }}>|</Text>
          <Text style={{ fontSize: 7, color: '#000000' }}>Leigraaf 160, 6651 GJ Druten</Text>
          <Text style={{ fontSize: 7, color: '#000000', marginHorizontal: 4 }}>|</Text>
          <Text style={{ fontSize: 7, color: '#000000' }}>KVK: 95549269</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text style={{ fontSize: 7, color: '#000000' }}>Paraaf</Text>
          <Image src={paraafErik} style={{ width: 43, height: 'auto' }} />
          <Text style={{ fontSize: 7, color: '#000000', marginLeft: 8 }}>Pagina {pageNumber}</Text>
        </View>
      </View>
    </Page>
  );
};

export default PDFAppraisalFindingsContent;
