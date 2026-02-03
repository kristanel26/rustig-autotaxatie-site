import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface UnsavedChangesDialogProps {
  open: boolean;
  onSaveAndLeave: () => void;
  onLeaveWithoutSaving: () => void;
  onStay: () => void;
}

export function UnsavedChangesDialog({
  open,
  onSaveAndLeave,
  onLeaveWithoutSaving,
  onStay,
}: UnsavedChangesDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Niet-opgeslagen wijzigingen</AlertDialogTitle>
          <AlertDialogDescription>
            Er zijn wijzigingen die nog niet zijn opgeslagen. Wil je deze eerst
            opslaan voordat je deze pagina verlaat?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogCancel onClick={onStay}>
            Blijf op pagina
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onLeaveWithoutSaving}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Verlaat zonder opslaan
          </AlertDialogAction>
          <AlertDialogAction onClick={onSaveAndLeave}>
            Opslaan en verlaten
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
