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
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-muted-foreground">Status:</span>
      <div className="grid grid-cols-2 gap-2">
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
                ? 'bg-[#ff751f] border-[#ff751f] text-white font-medium'
                : 'bg-white border-[#dde3ea] text-[#666] hover:border-[#1d3c71]'
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
      return { label: 'In behandeling', className: 'bg-[#fff3e0] text-[#ff751f] border-[#ff751f]/20' };
    case 'gereed':
      return { label: 'Gereed', className: 'bg-[#e6f4ea] text-[#1d7a3a] border-[#1d7a3a]/20' };
    case 'verzonden':
      return { label: 'Verzonden', className: 'bg-[#EBF2FB] text-[#1d3c71] border-[#1d3c71]/20' };
    case 'concept':
    default:
      return { label: 'Concept', className: 'bg-[#f7f8fa] text-[#698db3] border-[#698db3]/20' };
  }
}
