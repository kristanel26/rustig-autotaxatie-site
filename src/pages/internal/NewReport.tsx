import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InternalLayout from '@/components/internal/InternalLayout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ReportTypeSelector, ReportType } from '@/components/internal/ReportTypeSelector';
import { Loader2 } from 'lucide-react';

const NewReport = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);

  const handleReportTypeSelect = async (reportType: ReportType) => {
    if (!user) {
      toast({
        title: 'Niet ingelogd',
        description: 'Je moet ingelogd zijn om een rapport aan te maken.',
        variant: 'destructive',
      });
      return;
    }

    setIsCreating(true);

    try {
      // Generate a temporary report number (will be finalized on first save)
      const timestamp = Date.now();
      const tempReportNumber = `DRAFT-${timestamp}`;

      // Create a minimal draft report
      const { data, error } = await supabase
        .from('reports')
        .insert({
          user_id: user.id,
          report_type: reportType,
          report_number: tempReportNumber,
          status: 'concept',
          // Set default values based on report type
          tellerstand_type: 'km',
        })
        .select('id, report_number')
        .single();

      if (error) throw error;

      // Generate proper report number based on ID
      const properReportNumber = generateReportNumber(reportType, data.id);
      
      // Update with proper report number
      const { error: updateError } = await supabase
        .from('reports')
        .update({ report_number: properReportNumber })
        .eq('id', data.id);

      if (updateError) {
        console.warn('Could not update report number:', updateError);
      }

      toast({
        title: 'Rapport aangemaakt',
        description: 'Je kunt nu het rapport invullen. Wijzigingen worden automatisch opgeslagen.',
      });

      // Navigate to edit page - autosave works there
      navigate(`/intern/rapport/${data.id}/bewerken`);
    } catch (error) {
      console.error('Error creating draft report:', error);
      toast({
        title: 'Fout bij aanmaken',
        description: 'Er is een fout opgetreden bij het aanmaken van het rapport.',
        variant: 'destructive',
      });
    } finally {
      setIsCreating(false);
    }
  };

  // Generate report number: TYPE-YYYY-XXXX format
  const generateReportNumber = (reportType: ReportType, id: string): string => {
    const year = new Date().getFullYear();
    // Use last 4 chars of UUID for uniqueness
    const suffix = id.replace(/-/g, '').slice(-4).toUpperCase();
    
    const prefixMap: Record<ReportType, string> = {
      camper: 'CAM',
      wev: 'WEV',
      klassieker: 'KLS',
    };
    
    return `${prefixMap[reportType]}-${year}-${suffix}`;
  };

  return (
    <InternalLayout title="Nieuwe Taxatie">
      {isCreating ? (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Rapport wordt aangemaakt...</p>
        </div>
      ) : (
        <ReportTypeSelector onSelect={handleReportTypeSelect} />
      )}
    </InternalLayout>
  );
};

export default NewReport;
