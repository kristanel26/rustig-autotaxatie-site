import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Logos
import logoAutomobiel from '@/assets/logo-automobiel-taxaties.png';
import logoVrt from '@/assets/logo-vrt.png';
import logoHobeon from '@/assets/logo-hobeon.webp';
import logoTmv from '@/assets/logo-tmv.png';
import logoFehac from '@/assets/logo-fehac.png';

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
  vehicle_photos: string[] | null;
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

  // Build customer name - format: "MW. M. HART"
  const customerName = [report.customer_title, report.customer_initials, report.customer_last_name]
    .filter(Boolean)
    .join(' ')
    .toUpperCase() || '-';

  // Build vehicle display
  const vehicleDisplay = [report.vehicle_brand, report.vehicle_model]
    .filter(Boolean)
    .join(' ')
    .toUpperCase() || '-';

  // Cover photo is first image from vehicle_photos array
  const coverPhoto = report.vehicle_photos && report.vehicle_photos.length > 0 
    ? report.vehicle_photos[0] 
    : null;

  return (
    <div className="min-h-screen bg-white flex print:flex font-sans">
      {/* Left Column - ~45% */}
      <div className="w-[45%] min-h-screen flex flex-col p-8 print:p-6 relative z-10 bg-white">
        
        {/* Register Logos - horizontal row */}
        <div className="flex items-center gap-3 mb-10">
          <img src={logoVrt} alt="VRT" className="h-12 w-auto object-contain" />
          <img src={logoHobeon} alt="Hobeon SKO" className="h-12 w-auto object-contain" />
          <img src={logoTmv} alt="TMV" className="h-12 w-auto object-contain" />
          <img src={logoFehac} alt="FEHAC" className="h-12 w-auto object-contain" />
        </div>

        {/* Title Block */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-800 uppercase leading-tight">
            TAXATIERAPPORT
          </h1>
          <p className="text-base text-slate-500 font-normal leading-snug">
            Volgens artikel 7:960 BW
          </p>
        </div>

        {/* Inzake (Vehicle) */}
        <div className="mb-5">
          <p className="text-sm text-slate-500 font-medium leading-tight">
            Inzake
          </p>
          <p className="text-xl font-semibold uppercase text-slate-800 leading-tight">
            {vehicleDisplay}
          </p>
        </div>

        {/* Kenteken */}
        <div className="mb-5">
          <p className="text-sm text-slate-500 font-medium leading-tight">
            Kenteken
          </p>
          <p className="text-xl font-semibold text-slate-800 leading-tight">
            {report.license_plate || '-'}
          </p>
        </div>

        {/* Documentkenmerk */}
        <div className="mb-8">
          <p className="text-sm text-slate-500 font-medium leading-tight">
            Documentkenmerk
          </p>
          <p className="text-xl font-semibold text-slate-800 leading-tight">
            {report.report_number}
          </p>
        </div>

        {/* In opdracht van */}
        <div className="mb-8">
          <p className="text-sm text-slate-500 font-medium leading-tight mb-1">
            In opdracht van
          </p>
          <p className="text-lg font-semibold text-slate-800 leading-snug">
            {customerName}
          </p>
          {report.customer_street && (
            <p className="text-lg font-semibold text-slate-800 leading-snug">
              {report.customer_street.toUpperCase()}
            </p>
          )}
          {(report.customer_postcode || report.customer_city) && (
            <p className="text-lg font-semibold text-slate-800 leading-snug">
              {[report.customer_postcode, report.customer_city?.toUpperCase()].filter(Boolean).join(' ')}
            </p>
          )}
        </div>

        {/* Inspection Details */}
        <div className="mb-4 space-y-0.5">
          <p className="text-sm leading-tight">
            <span className="text-slate-500 font-medium">Opnamedatum:</span>{' '}
            <span className="font-semibold text-slate-800">{formatDate(report.inspection_date)}</span>
          </p>
          <p className="text-sm leading-tight">
            <span className="text-slate-500 font-medium">Aanvangstijd opname:</span>{' '}
            <span className="font-semibold text-slate-800">{formatTime(report.inspection_start_time)}</span>
          </p>
          <p className="text-sm leading-tight">
            <span className="text-slate-500 font-medium">Eindtijd opname:</span>{' '}
            <span className="font-semibold text-slate-800">{formatTime(report.inspection_end_time)}</span>
          </p>
          <p className="text-sm leading-tight">
            <span className="text-slate-500 font-medium">Plaats:</span>{' '}
            <span className="font-semibold text-slate-800">{report.inspection_location || '-'}</span>
          </p>
        </div>

        {/* Uitgevoerd door */}
        <div className="mb-6">
          <p className="text-sm leading-tight">
            <span className="text-slate-500 font-medium">Uitgevoerd door:</span>{' '}
            <span className="font-semibold text-slate-800">Erik Elderson</span>
          </p>
          <p className="text-sm text-slate-500 font-medium leading-tight">TMV Register-Taxateur</p>
          <p className="text-sm text-slate-500 font-medium leading-tight">Register-Taxateur VRT</p>
        </div>

        {/* Spacer to push footer down */}
        <div className="flex-grow" />

        {/* Footer with Company Details */}
        <div className="border-t border-slate-300 pt-5 mt-auto">
          <div className="flex items-center gap-4">
            <img 
              src={logoAutomobiel} 
              alt="Automobiel Taxaties" 
              className="h-14 w-auto flex-shrink-0"
            />
            <div className="text-sm text-slate-600 leading-relaxed">
              <span className="font-semibold text-slate-800">Automobiel Taxaties</span>
              <span className="mx-1">|</span>
              <span>Leigraaf 160, 6651 GJ Druten</span>
              <span className="mx-1">|</span>
              <span>KVK: 95549269</span>
              <span className="mx-1">|</span>
              <span>BTW: NL003366178B93</span>
              <br />
              <span>TMV 33106</span>
              <span className="mx-1">|</span>
              <span>VRT 22-523-M</span>
              <span className="mx-1">|</span>
              <span>Bank: NL80RABO 0387915680</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - ~55% - Vehicle Photo */}
      <div className="w-[55%] min-h-screen relative">
        {coverPhoto ? (
          <img
            src={coverPhoto}
            alt="Voertuig"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-400">
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
