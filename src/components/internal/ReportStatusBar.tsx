import { cn } from '@/lib/utils';

export type ReportStatus = 'concept' | 'in_behandeling' | 'gereed' | 'verzonden';

interface ReportStatusBarProps {
  status: ReportStatus;
  onChange: (status: ReportStatus) => void;
  disabled?: boolean;
}

const statusOptions: { value: ReportStatus; label: string }[] = [
  { value: 'concept', label: 'Concept' },
  { value: 'in_behandeling', label: 'In behandeling' },
  { value: 'gereed', label: 'Gereed' },
  { value: 'verzonden', label: 'Verzonden' },
];

export function ReportStatusBar({ status, onChange, disabled }: ReportStatusBarProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground mr-1">Status:</span>
      <div className="flex gap-2 flex-nowrap">
        {statusOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange(opt.value)}
            className={cn(
              'whitespace-nowrap rounded-[6px] text-[13px] px-[14px] py-[5px] border transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              status === opt.value
                ? 'bg-[#C9A84C] border-[#C9A84C] text-[#0e0e0f] font-medium'
                : 'bg-transparent border-[rgba(255,255,255,0.15)] text-[#7a7870] hover:border-[rgba(255,255,255,0.3)]'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function getStatusBadgeProps(status: string | null) {
  switch (status) {
    case 'in_behandeling':
      return { label: 'In behandeling', className: 'bg-[#c9a84c] text-white border-[#c9a84c]' };
    case 'gereed':
      return { label: 'Gereed', className: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/20' };
    case 'verzonden':
      return { label: 'Verzonden', className: 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/20' };
    case 'concept':
    default:
      return { label: 'Concept', className: 'bg-muted text-muted-foreground border-muted' };
  }
}
