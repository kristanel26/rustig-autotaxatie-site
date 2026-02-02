import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';
import registerLogos from '@/assets/register-logos.svg';

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
  vehicle_brand: string | null;
  vehicle_model: string | null;
  inspection_location: string | null;
  inspection_date: string | null;
  inspection_start_time: string | null;
  inspection_end_time: string | null;
  cover_photo_url: string | null;
}

const PDFCover = () => {
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

  const formatTime = (timeString: string | null) => {
    if (!timeString) return '-';
    return timeString.slice(0, 5) + ' u';
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

  // Build customer name
  const customerName = [report.customer_title, report.customer_initials, report.customer_last_name]
    .filter(Boolean)
    .join(' ') || '-';

  // Build vehicle display
  const vehicleDisplay = [report.vehicle_brand, report.vehicle_model]
    .filter(Boolean)
    .join(' ')
    .toUpperCase() || '-';

  return (
    <div className="min-h-screen bg-white flex print:block" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Left Column - 40% */}
      <div className="w-[40%] min-h-screen flex flex-col p-8 print:p-6">
        
        {/* Register Logos */}
        <div className="mb-8">
          <img 
            src={registerLogos} 
            alt="Register logo's VRT, Hobeon, TMV, FEHAC" 
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Title Block */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-wide text-foreground uppercase">
            TAXATIERAPPORT
          </h1>
          <p className="text-sm italic text-muted-foreground mt-1">
            Volgens artikel 7:960 BW
          </p>
        </div>

        {/* Inzake (Vehicle) */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">Inzake:</p>
          <p className="text-lg font-bold uppercase text-foreground">
            {vehicleDisplay}
          </p>
        </div>

        {/* License Plate & Document Reference */}
        <div className="mb-6 space-y-3">
          <div>
            <p className="text-sm text-muted-foreground">Kenteken:</p>
            <p className="text-lg font-bold text-foreground font-mono">
              {report.license_plate || '-'}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Documentkenmerk:</p>
            <p className="text-lg font-bold text-foreground">
              {report.report_number}
            </p>
          </div>
        </div>

        {/* Customer Address Block */}
        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-1">In opdracht van:</p>
          <p className="font-bold text-foreground uppercase">
            {customerName}
          </p>
          {report.customer_street && (
            <p className="text-foreground">{report.customer_street}</p>
          )}
          {(report.customer_postcode || report.customer_city) && (
            <p className="text-foreground">
              {[report.customer_postcode, report.customer_city].filter(Boolean).join(' ')}
            </p>
          )}
        </div>

        {/* Inspection Details */}
        <div className="mb-8 text-sm space-y-1">
          <p className="text-muted-foreground">
            Opnamedatum: <span className="text-foreground">{formatDate(report.inspection_date)}</span>
          </p>
          <p className="text-muted-foreground">
            Aanvangstijd opname: <span className="text-foreground">{formatTime(report.inspection_start_time)}</span>
          </p>
          <p className="text-muted-foreground">
            Eindtijd opname: <span className="text-foreground">{formatTime(report.inspection_end_time)}</span>
          </p>
          <p className="text-muted-foreground">
            Plaats: <span className="text-foreground">{report.inspection_location || '-'}</span>
          </p>
        </div>

        {/* Spacer to push executor and footer to bottom */}
        <div className="flex-grow" />

        {/* Executor Block */}
        <div className="mb-6">
          <p className="text-foreground">
            <span className="text-muted-foreground">Uitgevoerd door:</span>{' '}
            <span className="font-bold">Erik Elderson</span>
          </p>
          <p className="text-sm text-muted-foreground">TMV Register-Taxateur</p>
          <p className="text-sm text-muted-foreground">Register-Taxateur VRT</p>
        </div>

        {/* Footer with Company Details */}
        <div className="border-t border-border pt-4">
          <img 
            src={logoAutomobiel} 
            alt="Automobiel Taxaties" 
            className="h-12 w-auto mb-3"
          />
          <div className="text-xs text-muted-foreground space-y-0.5">
            <p>Leigraaf 160 | 6651 GJ Druten</p>
            <p>KVK: 95549269 | BTW NL003366178B93</p>
            <p>TMV 33106 | VRT 22-523-M</p>
            <p>Bankrekening: NL80RABO 0387915680</p>
          </div>
        </div>
      </div>

      {/* Right Column - 60% - Vehicle Photo */}
      <div className="w-[60%] min-h-screen bg-muted">
        {report.cover_photo_url ? (
          <img
            src={report.cover_photo_url}
            alt="Voertuig"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <svg
                className="mx-auto h-24 w-24 mb-4 opacity-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm">Geen voertuigfoto beschikbaar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFCover;
