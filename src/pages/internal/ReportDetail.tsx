import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InternalLayout from '@/components/internal/InternalLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, MapPin, Car, Euro, FileDown, Loader2, Lock, Gauge, Wrench, Home, Eye } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { createRoot } from 'react-dom/client';

// PDF Content Components
import PDFCoverContent from '@/components/internal/pdf/PDFCoverContent';
import PDFVehicleDataContent from '@/components/internal/pdf/PDFVehicleDataContent';
import PDFAppraisalFindingsContent from '@/components/internal/pdf/PDFAppraisalFindingsContent';
import PDFValuationContent from '@/components/internal/pdf/PDFValuationContent';
import PDFPhotosContent from '@/components/internal/pdf/PDFPhotosContent';

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
  vin: string | null;
  vehicle_brand: string | null;
  vehicle_model: string | null;
  inspection_location: string | null;
  inspection_date: string | null;
  inspection_start_time: string | null;
  inspection_end_time: string | null;
  appraised_value: number | null;
  appraised_value_text: string | null;
  quality_class: string | null;
  general_remarks: string | null;
  created_at: string;
  // Vehicle photos for PDF export
  vehicle_photos: string[] | null;
  // RDW fields
  rdw_merk: string | null;
  rdw_handelsbenaming: string | null;
  rdw_voertuigsoort: string | null;
  rdw_carrosserievorm: string | null;
  rdw_bouwjaar: number | null;
  rdw_datum_eerste_toelating: string | null;
  rdw_datum_eerste_tenaamstelling: string | null;
  rdw_datum_laatste_tenaamstelling: string | null;
  rdw_brandstof: string | null;
  rdw_transmissie: string | null;
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
  rdw_data_locked: boolean | null;
  // Taxateur fields
  tellerstand: number | null;
  tellerstand_type: string | null;
  soort_bouw: string | null;
  opbouw_merk: string | null;
  opbouw_type: string | null;
  constructievorm: string | null;
  gebruik: string | null;
  stalling: string | null;
  staat_bij_opname: string | null;
}

const ReportDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('reports')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setReport(data as unknown as Report);
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

  const formatTime = (timeString: string | null) => {
    if (!timeString) return '-';
    return timeString.slice(0, 5);
  };

  const formatCurrency = (value: number | null) => {
    if (value === null) return '-';
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };

  const formatNumber = (value: number | null, suffix?: string) => {
    if (value === null) return '-';
    return suffix ? `${value.toLocaleString('nl-NL')} ${suffix}` : value.toLocaleString('nl-NL');
  };

  const getQualityClassLabel = (value: string | null) => {
    if (value === null) return '-';
    return value;
  };

  const containerRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<ReturnType<typeof createRoot> | null>(null);

  const generatePdfFilename = () => {
    if (!report) return 'Taxatierapport.pdf';
    
    const parts = [
      'Taxatierapport',
      report.document_reference || '',
      report.license_plate || '',
      [report.vehicle_brand, report.vehicle_model].filter(Boolean).join('-')
    ].filter(Boolean);
    
    return parts.join('_').replace(/\s+/g, '-') + '.pdf';
  };

  const cleanup = () => {
    if (rootRef.current) {
      rootRef.current.unmount();
      rootRef.current = null;
    }
    if (containerRef.current && document.body.contains(containerRef.current)) {
      document.body.removeChild(containerRef.current);
      containerRef.current = null;
    }
  };

  const handlePdfDownload = async () => {
    if (!id || isGeneratingPdf || !report) return;
    
    setIsGeneratingPdf(true);
    
    try {
      // Create container that is rendered by the browser but not visible to the user.
      // NOTE: Using `opacity: 0` makes html2canvas render transparent (blank pages).
      const container = document.createElement('div');
      container.id = 'pdf-render-container';
      container.style.cssText = `
        position: fixed;
        top: 110vh;
        left: 0;
        width: 210mm;
        z-index: 1;
        opacity: 1;
        pointer-events: none;
        background: white;
      `;
      document.body.appendChild(container);
      containerRef.current = container;

      // Create React root and render components
      const root = createRoot(container);
      rootRef.current = root;

      // Calculate page number for valuation (now page 2, right after cover)
      const hasValuation = report.appraised_value && report.appraised_value > 0;
      const valuationPageNumber = hasValuation ? 2 : 0;

      // Render all PDF pages as a single React tree
      // Order: Cover -> Valuation (if applicable) -> Vehicle Data -> Appraisal Findings -> Photos
      root.render(
        <div id="pdf-content" style={{ fontFamily: 'Inter, system-ui, sans-serif', background: 'white' }}>
          <PDFCoverContent report={report} />
          {hasValuation && (
            <PDFValuationContent report={report} pageNumber={valuationPageNumber} />
          )}
          <PDFVehicleDataContent report={report} />
          <PDFAppraisalFindingsContent report={report} />
          <PDFPhotosContent report={report} />
        </div>
      );

      // Wait for React to render
      await new Promise(resolve => setTimeout(resolve, 500));

      // Wait for all images to load
      const images = container.querySelectorAll('img');
      const imagePromises = Array.from(images).map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise<void>((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Don't fail on missing images
        });
      });
      await Promise.all(imagePromises);
      
      // Additional wait for rendering to complete
      await new Promise(resolve => setTimeout(resolve, 500));

      const opt = {
        margin: 0,
        filename: generatePdfFilename(),
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          allowTaint: false,
          logging: false,
          width: 794, // A4 width in pixels at 96 DPI
          windowWidth: 794,
          backgroundColor: '#ffffff',
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait' as const
        },
        // Rely on CSS `page-break-after` in the templates; forcing `before: .pdf-page`
        // can introduce extra blank pages.
        pagebreak: { mode: ['css', 'legacy'] }
      };

      const pdfContent = container.querySelector('#pdf-content');
      if (pdfContent) {
        await html2pdf().set(opt).from(pdfContent).save();
      }

      cleanup();
    } catch (error) {
      console.error('Error generating PDF:', error);
      cleanup();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePdfPreview = () => {
    if (!id) return;
    window.open(`/intern/pdf/preview/${id}`, '_blank');
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  if (loading) {
    return (
      <InternalLayout title="Rapport laden...">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </InternalLayout>
    );
  }

  if (!report) {
    return (
      <InternalLayout title="Rapport niet gevonden">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            Het opgevraagde rapport kon niet worden gevonden.
          </p>
          <Button onClick={() => navigate('/intern/rapporten')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Terug naar rapporten
          </Button>
        </div>
      </InternalLayout>
    );
  }

  const customerName = [report.customer_title, report.customer_initials, report.customer_last_name]
    .filter(Boolean)
    .join(' ') || '-';

  const vehicleDisplay = [report.rdw_merk || report.vehicle_brand, report.rdw_handelsbenaming || report.vehicle_model]
    .filter(Boolean)
    .join(' ') || '-';

  const RDWBadge = () => (
    <Badge variant="secondary" className="ml-2 text-xs">
      <Lock className="h-3 w-3 mr-1" />
      RDW
    </Badge>
  );

  return (
    <InternalLayout title={`Rapport #${report.report_number}`}>
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="ghost" onClick={() => navigate('/intern/rapporten')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Terug naar overzicht
          </Button>
          <Button 
            variant="secondary-action" 
            onClick={() => navigate(`/intern/rapport/${id}/bewerken`)}
          >
            Rapport Bewerken
            <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={handlePdfDownload}
            disabled={isGeneratingPdf}
          >
            {isGeneratingPdf ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <FileDown className="h-4 w-4 mr-2" />
            )}
            {isGeneratingPdf ? 'Genereren...' : 'PDF Downloaden'}
          </Button>
          <Button 
            variant="ghost" 
            onClick={handlePdfPreview}
          >
            <Eye className="h-4 w-4 mr-2" />
            PDF Bekijken
          </Button>
        </div>

        {/* Report Header */}
        <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-border">
          <div>
            <p className="text-sm text-muted-foreground">Rapportnummer</p>
            <p className="text-2xl font-bold">{report.report_number}</p>
          </div>
          {report.document_reference && (
            <div>
              <p className="text-sm text-muted-foreground">Documentreferentie</p>
              <p className="text-lg font-medium">{report.document_reference}</p>
            </div>
          )}
          <div className="ml-auto text-right">
            <p className="text-sm text-muted-foreground">Aangemaakt op</p>
            <p className="text-sm">{formatDate(report.created_at)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                Klantgegevens
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="font-medium">{customerName}</p>
                {report.customer_street && (
                  <p className="text-muted-foreground">{report.customer_street}</p>
                )}
                {(report.customer_postcode || report.customer_city) && (
                  <p className="text-muted-foreground">
                    {[report.customer_postcode, report.customer_city].filter(Boolean).join(' ')}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Identification - Sectie 1 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Car className="h-5 w-5" />
                Voertuigidentificatie
                {report.rdw_data_locked && <RDWBadge />}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Kenteken</p>
                  <p className="font-medium font-mono">{report.license_plate || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Merk</p>
                  <p className="font-medium">{report.rdw_merk || report.vehicle_brand || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Handelsbenaming / Model</p>
                  <p className="font-medium">{report.rdw_handelsbenaming || report.vehicle_model || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Voertuigsoort</p>
                  <p className="font-medium">{report.rdw_voertuigsoort || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Carrosserievorm</p>
                  <p className="font-medium">{report.rdw_carrosserievorm || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">VIN / Chassisnummer</p>
                  <p className="font-medium font-mono text-sm">{report.vin || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Bouwjaar</p>
                  <p className="font-medium">{report.rdw_bouwjaar || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Datum eerste toelating</p>
                  <p className="font-medium">{formatDate(report.rdw_datum_eerste_toelating)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Datum eerste tenaamstelling</p>
                  <p className="font-medium">{formatDate(report.rdw_datum_eerste_tenaamstelling)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Datum laatste tenaamstelling</p>
                  <p className="font-medium">{formatDate(report.rdw_datum_laatste_tenaamstelling)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technical Data - Sectie 2 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Technische Hoofdgegevens
                {report.rdw_data_locked && <RDWBadge />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Brandstof</p>
                  <p className="font-medium">{report.rdw_brandstof || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Transmissie</p>
                  <p className="font-medium">{report.rdw_transmissie || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Aantal cilinders</p>
                  <p className="font-medium">{formatNumber(report.rdw_aantal_cilinders)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cilinderinhoud</p>
                  <p className="font-medium">{formatNumber(report.rdw_cilinderinhoud, 'cc')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vermogen</p>
                  <p className="font-medium">{formatNumber(report.rdw_vermogen_kw, 'kW')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Aantal deuren</p>
                  <p className="font-medium">{formatNumber(report.rdw_aantal_deuren)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Wielbasis</p>
                  <p className="font-medium">{formatNumber(report.rdw_wielbasis, 'mm')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mass and Weight - Sectie 3 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                Massa en Gewichten
                {report.rdw_data_locked && <RDWBadge />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Ledig gewicht</p>
                  <p className="font-medium">{formatNumber(report.rdw_ledig_gewicht, 'kg')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Massa rijklaar</p>
                  <p className="font-medium">{formatNumber(report.rdw_massa_rijklaar, 'kg')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Max. massa</p>
                  <p className="font-medium">{formatNumber(report.rdw_max_massa, 'kg')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* APK Status - Sectie 4 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                Keuring en Status
                {report.rdw_data_locked && <RDWBadge />}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">APK gekeurd</p>
                  <p className="font-medium">
                    {report.rdw_apk_gekeurd === true ? 'Ja' : report.rdw_apk_gekeurd === false ? 'Nee' : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">APK vervaldatum</p>
                  <p className="font-medium">{formatDate(report.rdw_apk_vervaldatum)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Importvoertuig</p>
                  <p className="font-medium">
                    {report.rdw_importvoertuig === true ? 'Ja' : report.rdw_importvoertuig === false ? 'Nee' : '-'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Odometer - Sectie 5 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Gauge className="h-5 w-5" />
                Tellerstand
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Tellerstand</p>
                  <p className="text-xl font-bold">
                    {report.tellerstand ? formatNumber(report.tellerstand, report.tellerstand_type || 'km') : '-'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Construction - Sectie 6 */}
          {(report.soort_bouw || report.opbouw_merk || report.opbouw_type || report.constructievorm) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  Opbouw en Constructie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Soort bouw</p>
                    <p className="font-medium capitalize">{report.soort_bouw || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Opbouw merk</p>
                    <p className="font-medium">{report.opbouw_merk || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Opbouw type</p>
                    <p className="font-medium">{report.opbouw_type || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Constructievorm</p>
                    <p className="font-medium">{report.constructievorm || '-'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Usage and Storage - Sectie 7 */}
          {(report.gebruik || report.stalling || report.staat_bij_opname) && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Gebruik en Stalling
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Gebruik</p>
                    <p className="font-medium capitalize">{report.gebruik || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Stalling</p>
                    <p className="font-medium capitalize">{report.stalling || '-'}</p>
                  </div>
                </div>
                {report.staat_bij_opname && (
                  <div>
                    <p className="text-sm text-muted-foreground">Staat bij opname</p>
                    <p className="font-medium">{report.staat_bij_opname}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Inspection Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Inspectiegegevens
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Locatie
                </p>
                <p className="font-medium">{report.inspection_location || '-'}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Datum</p>
                  <p className="font-medium">{formatDate(report.inspection_date)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Starttijd</p>
                  <p className="font-medium">{formatTime(report.inspection_start_time)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Eindtijd</p>
                  <p className="font-medium">{formatTime(report.inspection_end_time)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Valuation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Euro className="h-5 w-5" />
                Waardebepaling
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Getaxeerde waarde</p>
                  <p className="text-xl font-bold text-primary">
                    {formatCurrency(report.appraised_value)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Kwaliteitsklasse</p>
                  <p className="font-medium">{getQualityClassLabel(report.quality_class)}</p>
                </div>
              </div>
              {report.appraised_value_text && (
                <div>
                  <p className="text-sm text-muted-foreground">Waarde in woorden</p>
                  <p className="font-medium italic">{report.appraised_value_text}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Remarks */}
        {report.general_remarks && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Algemene opmerkingen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-muted-foreground">
                {report.general_remarks}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </InternalLayout>
  );
};

export default ReportDetail;
