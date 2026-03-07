import { useState, useEffect } from 'react';
import { Loader2, Check, AlertCircle, Save, CloudOff } from 'lucide-react';
import { SaveStatus } from '@/hooks/useAutoSave';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StickyAutoSaveBarProps {
  status: SaveStatus;
  lastSavedAt: Date | null;
  hasPendingChanges: boolean;
  onSaveNow: () => void;
  className?: string;
}

const statusConfig: Record<SaveStatus, { 
  icon: React.ReactNode; 
  text: string; 
  className: string;
  bgClassName: string;
}> = {
  idle: {
    icon: <Check className="h-4 w-4" />,
    text: 'Opgeslagen',
    className: 'text-[hsl(var(--intern-green))]',
    bgClassName: 'bg-[hsl(var(--intern-green)/0.08)] border-[hsl(var(--intern-green)/0.2)]',
  },
  pending: {
    icon: <CloudOff className="h-4 w-4" />,
    text: 'Niet opgeslagen',
    className: 'text-amber-600 dark:text-amber-500',
    bgClassName: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800',
  },
  saving: {
    icon: <Loader2 className="h-4 w-4 animate-spin" />,
    text: 'Opslaan…',
    className: 'text-primary',
    bgClassName: 'bg-primary/5 border-primary/20',
  },
  saved: {
    icon: <Check className="h-4 w-4" />,
    text: 'Opgeslagen',
    className: 'text-green-600 dark:text-green-500',
    bgClassName: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
  },
  error: {
    icon: <AlertCircle className="h-4 w-4" />,
    text: 'Opslaan mislukt',
    className: 'text-destructive',
    bgClassName: 'bg-destructive/5 border-destructive/20',
  },
};

function formatLastSaved(date: Date | null): string {
  if (!date) return '';
  
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  
  if (diffSecs < 10) {
    return 'Zojuist';
  }
  if (diffSecs < 60) {
    return `${diffSecs} sec geleden`;
  }
  if (diffMins < 60) {
    return `${diffMins} min geleden`;
  }
  
  // Format as HH:MM:SS
  return date.toLocaleTimeString('nl-NL', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export function StickyAutoSaveBar({
  status,
  lastSavedAt,
  hasPendingChanges,
  onSaveNow,
  className,
}: StickyAutoSaveBarProps) {
  const config = statusConfig[status];
  const [displayTime, setDisplayTime] = useState(() => formatLastSaved(lastSavedAt));
  
  // Update display time every 10 seconds
  useEffect(() => {
    setDisplayTime(formatLastSaved(lastSavedAt));
    
    if (!lastSavedAt) return;
    
    const interval = setInterval(() => {
      setDisplayTime(formatLastSaved(lastSavedAt));
    }, 10000);
    
    return () => clearInterval(interval);
  }, [lastSavedAt]);

  // Determine if we should show unsaved state
  const showUnsaved = status === 'pending' || (status === 'idle' && hasPendingChanges);
  const effectiveStatus = showUnsaved ? 'pending' : status;
  const effectiveConfig = statusConfig[effectiveStatus];

  return (
    <div
      className={cn(
        'sticky top-0 z-40 flex items-center justify-between gap-4 px-4 py-2 border rounded-lg shadow-sm transition-colors duration-200',
        effectiveConfig.bgClassName,
        className
      )}
    >
      {/* Status indicator */}
      <div className={cn('flex items-center gap-2 font-medium', effectiveConfig.className)}>
        {effectiveConfig.icon}
        <span className="text-sm">{effectiveConfig.text}</span>
        {lastSavedAt && status !== 'pending' && status !== 'error' && (
          <span className="text-xs text-foreground/50 ml-1">
            • Laatst: {displayTime}
          </span>
        )}
      </div>

      {/* Manual save button */}
      <Button
        type="button"
        variant={status === 'error' || showUnsaved ? 'default' : 'ghost'}
        size="sm"
        onClick={onSaveNow}
        disabled={status === 'saving' || (!hasPendingChanges && status !== 'error')}
        className="gap-2"
      >
        {status === 'saving' ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        <span className="hidden sm:inline">Nu opslaan</span>
      </Button>
    </div>
  );
}
