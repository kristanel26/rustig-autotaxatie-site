import { Page, View, Text, Image } from '@react-pdf/renderer';
import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';

const signatureErik = '/signature-erik-elderson.png';
import { getQualityClassByValue } from '@/lib/qualityClasses';

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
    return new Date(dateString).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
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

  const DataRow = ({ label, value }: { label: string; value: string }) => {
    const displayValue = (!value || value === '-' || value === '') ? '–' : value;
    if (!isKlassiekerReport && displayValue === '–') return null;
    return (
      <View style={{ flexDirection: 'row', paddingVertical: 4, borderBottomWidth: 1, borderBottomColor: '#e2e8f0' }}>
        <Text style={{ width: '50%', color: '#000000', fontSize: 9, fontFamily: 'Helvetica' }}>{label}</Text>
        <Text style={{ width: '50%', color: '#000000', fontSize: 9, fontFamily: 'Helvetica-Bold' }}>{displayValue}</Text>
      </View>
    );
  };

  const SectionHeader = ({ number, title }: { number: string; title: string }) => (
    <View style={{ marginBottom: 8, paddingBottom: 5, borderBottomWidth: 2, borderBottomColor: '#000000' }}>
      <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#000000' }}>
        {number}. {title}
      </Text>
    </View>
  );

  const qualityClass = getQualityClassByValue(report.quality_class);

  return (
    <Page size="A4" style={{ padding: '24 28', fontFamily: 'Helvetica', position: 'relative' }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
        <View />
        <Image src={logoAutomobiel} style={{ height: 36, width: 'auto' }} />
      </View>
      <Text style={{ fontSize: 8, color: '#888888', marginBottom: 4 }}>
        Automobiel taxatie{report.document_reference ? ` · Documentkenmerk: ${report.document_reference}` : ''}
      </Text>
      <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#cccccc', marginBottom: 14 }} />
      <Text style={{ fontSize: 16, fontFamily: 'Helvetica-Bold', color: '#000000', textTransform: 'uppercase', marginBottom: 16 }}>
        VOERTUIGGEGEVENS
      </Text>

      {/* Two-column layout */}
      <View style={{ flexDirection: 'row', gap: 20 }}>
        {/* Left Column */}
        <View style={{ width: '50%' }}>
          <View style={{ marginBottom: 16 }}>
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
          </View>

          <View style={{ marginBottom: 16 }}>
            <SectionHeader number="2" title="Technische hoofdgegevens" />
            <DataRow label="Brandstof" value={report.rdw_brandstof || ''} />
            <DataRow label="Transmissie" value={report.transmissie === 'handgeschakeld' ? 'Handgeschakeld' : report.transmissie === 'automaat' ? 'Automaat' : ''} />
            <DataRow label="Aantal cilinders" value={formatNumber(report.rdw_aantal_cilinders)} />
            <DataRow label="Cilinderinhoud (cc)" value={formatNumber(report.rdw_cilinderinhoud, 'cc')} />
            <DataRow label="Vermogen (kW)" value={formatNumber(report.rdw_vermogen_kw, 'kW')} />
            <DataRow label="Aantal deuren" value={formatNumber(report.rdw_aantal_deuren)} />
            <DataRow label="Wielbasis" value={formatNumber(report.rdw_wielbasis, 'mm')} />
          </View>

          <View style={{ marginBottom: 16 }}>
            <SectionHeader number="3" title="Massa en gewichten" />
            <DataRow label="Ledig gewicht" value={formatNumber(report.rdw_ledig_gewicht, 'kg')} />
            <DataRow label="Massa rijklaar" value={formatNumber(report.rdw_massa_rijklaar, 'kg')} />
            <DataRow label="Toegestane max. massa" value={formatNumber(report.rdw_max_massa, 'kg')} />
          </View>
        </View>

        {/* Right Column */}
        <View style={{ width: '50%' }}>
          <View style={{ marginBottom: 16 }}>
            <SectionHeader number="4" title="Keuring en status" />
            <DataRow label="APK gekeurd" value={formatBoolean(report.rdw_apk_gekeurd)} />
            <DataRow label="APK vervaldatum" value={formatDate(report.rdw_apk_vervaldatum)} />
            <DataRow label="Importvoertuig" value={formatBoolean(report.rdw_importvoertuig)} />
          </View>

          <View style={{ marginBottom: 16 }}>
            <SectionHeader number="5" title="Tellerstand" />
            <DataRow label="Tellerstand" value={report.tellerstand ? `${report.tellerstand.toLocaleString('nl-NL')}` : ''} />
            <DataRow label="Tellerstand type" value={report.tellerstand_type === 'km' ? 'Kilometer (km)' : report.tellerstand_type === 'miles' ? 'Miles' : ''} />
          </View>

          {!isKlassiekerReport && (
            <View style={{ marginBottom: 16 }}>
              <SectionHeader number="6" title="Opbouw en constructie" />
              <DataRow label="Soort bouw" value={report.soort_bouw || ''} />
              <DataRow label="Opbouw merk" value={report.opbouw_merk || ''} />
              <DataRow label="Opbouw type" value={report.opbouw_type || ''} />
              <DataRow label="Constructievorm" value={report.constructievorm || ''} />
            </View>
          )}

          {!isKlassiekerReport && (
            <View style={{ marginBottom: 16 }}>
              <SectionHeader number="7" title="Gebruik en stalling" />
              <DataRow label="Gebruik" value={report.gebruik || ''} />
              <DataRow label="Stalling" value={report.stalling || ''} />
              <DataRow label="Staat bij opname" value={report.staat_bij_opname || ''} />
            </View>
          )}

          {report.quality_class && qualityClass && (
            <View style={{ marginBottom: 16 }}>
              <SectionHeader number={isKlassiekerReport ? "6" : "8"} title="Kwaliteitsklasse" />
              <View style={{ paddingVertical: 8 }}>
                <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#000000', marginBottom: 4 }}>
                  {report.quality_class}
                </Text>
                <Text style={{ fontSize: 9, color: '#000000', lineHeight: 1.6 }}>
                  {qualityClass.description || '–'}
                </Text>
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Footer */}
      <View style={{
        position: 'absolute',
        bottom: 24,
        left: 28,
        right: 28,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#000000' }}>Automobiel Taxaties</Text>
          <Text style={{ fontSize: 8, color: '#000000', marginHorizontal: 4 }}>|</Text>
          <Text style={{ fontSize: 8, color: '#000000' }}>Leigraaf 160, 6651 GJ Druten</Text>
          <Text style={{ fontSize: 8, color: '#000000', marginHorizontal: 4 }}>|</Text>
          <Text style={{ fontSize: 8, color: '#000000' }}>KVK: 95549269</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={{ fontSize: 8, color: '#000000' }}>Paraaf</Text>
          <Image src={signatureErik} style={{ height: 57, width: 'auto' }} />
          <Text style={{ fontSize: 8, color: '#000000', marginLeft: 8 }}>
            Pagina {pageNumber} van {totalPages}
          </Text>
        </View>
      </View>
    </Page>
  );
};

export default PDFVehicleDataContent;
