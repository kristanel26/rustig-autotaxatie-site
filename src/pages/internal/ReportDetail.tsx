import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InternalLayout from '@/components/internal/InternalLayout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, MapPin, Car, Euro, FileDown } from 'lucide-react';

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
  quality_class: number | null;
  general_remarks: string | null;
  created_at: string;
}

const ReportDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

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

  const getQualityClassLabel = (value: number | null) => {
    if (value === null) return '-';
    const labels: Record<number, string> = {
      1: '1 - Uitstekend',
      2: '2 - Goed',
      3: '3 - Gemiddeld',
      4: '4 - Matig',
      5: '5 - Slecht',
    };
    return labels[value] || String(value);
  };

  // Generate PDF filename: Taxatierapport_[document_reference]_[kenteken]_[merk]-[model].pdf
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

  const handlePdfDownload = () => {
    const pdfUrl = `/intern/pdf/voorblad/${id}`;
    const filename = generatePdfFilename();
    
    // Open PDF in new tab with suggested filename
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.target = '_blank';
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  // Build customer name
  const customerName = [report.customer_title, report.customer_initials, report.customer_last_name]
    .filter(Boolean)
    .join(' ') || '-';
  
  // Build customer address
  const customerAddress = report.customer_street 
    ? `${report.customer_street}${report.customer_postcode || report.customer_city ? ', ' : ''}${report.customer_postcode || ''} ${report.customer_city || ''}`.trim()
    : null;

  // Build vehicle display
  const vehicleDisplay = [report.vehicle_brand, report.vehicle_model]
    .filter(Boolean)
    .join(' ') || '-';

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
          >
            <FileDown className="h-4 w-4 mr-2" />
            PDF Downloaden
          </Button>
          <Button 
            variant="ghost" 
            onClick={() => window.open(`/intern/pdf/voorblad/${id}`, '_blank')}
          >
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

          {/* Vehicle Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Car className="h-5 w-5" />
                Voertuiggegevens
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Merk / Model</p>
                  <p className="font-medium">{vehicleDisplay}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Kenteken</p>
                  <p className="font-medium font-mono">{report.license_plate || '-'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">VIN / Chassisnummer</p>
                  <p className="font-medium font-mono text-sm">{report.vin || '-'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

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