import { Loader2, Check, AlertCircle, CloudOff } from 'lucide-react';
import { SaveStatus } from '@/hooks/useAutoSave';
import { cn } from '@/lib/utils';

interface SaveStatusIndicatorProps {
  status: SaveStatus;
  className?: string;
}

const statusConfig: Record<SaveStatus, { icon: React.ReactNode; text: string; className: string }> = {
  idle: {
    icon: null,
    text: '',
    className: 'opacity-0',
  },
  pending: {
    icon: <Loader2 className="h-3.5 w-3.5 animate-spin" />,
    text: 'Opslaan…',
    className: 'text-muted-foreground',
  },
  saving: {
    icon: <Loader2 className="h-3.5 w-3.5 animate-spin" />,
    text: 'Opslaan…',
    className: 'text-muted-foreground',
  },
  saved: {
    icon: <Check className="h-3.5 w-3.5" />,
    text: 'Opgeslagen',
    className: 'text-green-600',
  },
  error: {
    icon: <AlertCircle className="h-3.5 w-3.5" />,
    text: 'Opslaan mislukt, controleer verbinding',
    className: 'text-destructive',
  },
};

export function SaveStatusIndicator({ status, className }: SaveStatusIndicatorProps) {
  const config = statusConfig[status];

  if (status === 'idle') {
    return null;
  }

  return (
    <div
      className={cn(
        'flex items-center gap-1.5 text-sm font-medium transition-opacity duration-200',
        config.className,
        className
      )}
    >
      {config.icon}
      <span>{config.text}</span>
    </div>
  );
}
