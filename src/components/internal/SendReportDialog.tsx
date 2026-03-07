import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Send, Loader2 } from 'lucide-react';

interface SendReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportId: string;
  customerEmail?: string;
  vehicleTitle?: string;
  documentReference?: string;
  onSent?: () => void;
}

export function SendReportDialog({
  open,
  onOpenChange,
  reportId,
  customerEmail = '',
  vehicleTitle = '',
  documentReference = '',
  onSent,
}: SendReportDialogProps) {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [email, setEmail] = useState(customerEmail);
  const [subject, setSubject] = useState(
    `Taxatierapport${documentReference ? ` ${documentReference}` : ''}${vehicleTitle ? ` – ${vehicleTitle}` : ''}`
  );
  const [body, setBody] = useState(
    `Geachte heer/mevrouw,\n\nBijgaand ontvangt u het taxatierapport${vehicleTitle ? ` van uw ${vehicleTitle}` : ''}${documentReference ? ` (ref. ${documentReference})` : ''}.\n\nMocht u vragen hebben, neem dan gerust contact met ons op.\n\nMet vriendelijke groet,\nErik Elderson\nTaxaris Voertuigtaxaties`
  );

  // Reset fields when dialog opens with new data
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setEmail(customerEmail);
      setSubject(
        `Taxatierapport${documentReference ? ` ${documentReference}` : ''}${vehicleTitle ? ` – ${vehicleTitle}` : ''}`
      );
      setBody(
        `Geachte heer/mevrouw,\n\nBijgaand ontvangt u het taxatierapport${vehicleTitle ? ` van uw ${vehicleTitle}` : ''}${documentReference ? ` (ref. ${documentReference})` : ''}.\n\nMocht u vragen hebben, neem dan gerust contact met ons op.\n\nMet vriendelijke groet,\nErik Elderson\nTaxaris Voertuigtaxaties`
      );
    }
    onOpenChange(newOpen);
  };

  const handleSend = async () => {
    if (!email.trim()) {
      toast({ title: 'E-mailadres ontbreekt', variant: 'destructive' });
      return;
    }
    setIsSending(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-report', {
        body: {
          reportId,
          recipientEmail: email.trim(),
          subject,
          body,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast({
        title: 'Rapport verzonden',
        description: `Het rapport is verstuurd naar ${email.trim()}.`,
      });
      onOpenChange(false);
      onSent?.();
    } catch (err) {
      console.error('Send error:', err);
      toast({
        title: 'Verzenden mislukt',
        description: err instanceof Error ? err.message : 'Onbekende fout',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Rapport verzenden</DialogTitle>
          <DialogDescription>
            Verstuur het taxatierapport als PDF-bijlage per e-mail.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="send-email">Ontvanger</Label>
            <Input
              id="send-email"
              type="email"
              placeholder="klant@voorbeeld.nl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="send-subject">Onderwerp</Label>
            <Input
              id="send-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="send-body">Bericht</Label>
            <Textarea
              id="send-body"
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSending}>
            Annuleren
          </Button>
          <Button onClick={handleSend} disabled={isSending}>
            {isSending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Verzenden...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Verzenden
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
