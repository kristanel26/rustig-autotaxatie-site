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
    <div className="min-h-screen bg-white flex print:flex" style={{ fontFamily: 'Georgia, serif' }}>
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
        <div className="mb-6">
          <h1 className="text-4xl font-bold tracking-tight text-[#1a365d] uppercase mb-1">
            TAXATIERAPPORT
          </h1>
          <p className="text-base italic text-gray-600">
            Volgens artikel 7:960 BW
          </p>
        </div>

        {/* Inzake (Vehicle) */}
        <div className="mb-5">
          <p className="text-sm italic text-gray-600">Inzake:</p>
          <p className="text-xl font-bold uppercase text-[#1a365d]">
            {vehicleDisplay}
          </p>
        </div>

        {/* Kenteken */}
        <div className="mb-5">
          <p className="text-sm italic text-gray-600">Kenteken:</p>
          <p className="text-xl font-bold text-[#1a365d]">
            {report.license_plate || '-'}
          </p>
        </div>

        {/* Documentkenmerk */}
        <div className="mb-8">
          <p className="text-sm italic text-gray-600">Documentkenmerk:</p>
          <p className="text-xl font-bold text-[#1a365d]">
            {report.report_number}
          </p>
        </div>

        {/* In opdracht van */}
        <div className="mb-8">
          <p className="text-sm italic text-gray-600">In opdracht van:</p>
          <p className="text-lg font-bold text-[#1a365d]">
            {customerName}
          </p>
          {report.customer_street && (
            <p className="text-lg font-bold text-[#1a365d]">{report.customer_street.toUpperCase()}</p>
          )}
          {(report.customer_postcode || report.customer_city) && (
            <p className="text-lg font-bold text-[#1a365d]">
              {[report.customer_postcode, report.customer_city?.toUpperCase()].filter(Boolean).join(' ')}
            </p>
          )}
        </div>

        {/* Inspection Details */}
        <div className="mb-8 space-y-0.5">
          <p className="text-sm text-gray-700">
            <span className="italic">Opnamedatum:</span> {formatDate(report.inspection_date)}
          </p>
          <p className="text-sm text-gray-700">
            <span className="italic">Aanvangstijd opname:</span> {formatTime(report.inspection_start_time)}
          </p>
          <p className="text-sm text-gray-700">
            <span className="italic">Eindtijd opname:</span> {formatTime(report.inspection_end_time)}
          </p>
          <p className="text-sm text-gray-700">
            <span className="italic">Plaats:</span> {report.inspection_location || '-'}
          </p>
        </div>

        {/* Spacer */}
        <div className="flex-grow" />

        {/* Uitgevoerd door */}
        <div className="mb-6">
          <p className="text-sm italic text-gray-700">
            Uitgevoerd door: <span className="not-italic">Erik Elderson</span>
          </p>
          <p className="text-sm italic text-gray-700">TMV Register-Taxateur</p>
          <p className="text-sm italic text-gray-700">Register-Taxateur VRT</p>
        </div>

        {/* Footer with Company Details */}
        <div className="border-t border-gray-200 pt-4">
          <img 
            src={logoAutomobiel} 
            alt="Automobiel Taxaties" 
            className="h-14 w-auto mb-2"
          />
          <div className="text-xs text-gray-600 space-y-0 text-center" style={{ maxWidth: '280px' }}>
            <p>Leigraaf 160 | 6651 GJ Druten</p>
            <p>KVK: 95549269 | BTW NL003366178B93</p>
            <p>TMV 33106 | VRT 22-523-M</p>
            <p>Bankrekening: NL80RABO 0387915680</p>
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
