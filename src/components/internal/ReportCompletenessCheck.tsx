import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, AlertCircle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  getChecklistForType,
  calculateItemStatus,
  calculateCompletenessPercentage,
  ChecklistStatus,
  ChecklistItem,
} from '@/lib/completenessConfig';

interface ReportCompletenessCheckProps {
  reportType: string | null;
  data: Record<string, unknown>;
  className?: string;
}

const statusConfig: Record<ChecklistStatus, {
  icon: React.ReactNode;
  className: string;
  bgClassName: string;
}> = {
  complete: {
    icon: <CheckCircle2 className="h-5 w-5" />,
    className: 'text-green-600 dark:text-green-500',
    bgClassName: 'bg-green-50 dark:bg-green-950/30',
  },
  incomplete: {
    icon: <XCircle className="h-5 w-5" />,
    className: 'text-destructive',
    bgClassName: 'bg-destructive/5',
  },
  warning: {
    icon: <AlertCircle className="h-5 w-5" />,
    className: 'text-amber-600 dark:text-amber-500',
    bgClassName: 'bg-amber-50 dark:bg-amber-950/30',
  },
};

interface ChecklistItemRowProps {
  item: ChecklistItem;
  status: ChecklistStatus;
  missingFields: string[];
  warnings: string[];
}

function ChecklistItemRow({ item, status, missingFields, warnings }: ChecklistItemRowProps) {
  const config = statusConfig[status];
  
  const handleClick = () => {
    const element = document.getElementById(item.sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left',
        'hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        config.bgClassName
      )}
    >
      <div className={cn('flex-shrink-0', config.className)}>
        {config.icon}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className={cn('font-medium text-sm', config.className)}>
            {item.label}
          </span>
          <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </div>
        
        {/* Show missing fields for incomplete items */}
        {status === 'incomplete' && missingFields.length > 0 && (
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            Ontbreekt: {missingFields.join(', ')}
          </p>
        )}
        
        {/* Show warnings for warning items */}
        {status === 'warning' && warnings.length > 0 && (
          <p className="text-xs text-amber-600 dark:text-amber-500 mt-0.5 truncate">
            {warnings.join(', ')}
          </p>
        )}
      </div>
    </button>
  );
}

export function ReportCompletenessCheck({ 
  reportType, 
  data,
  className 
}: ReportCompletenessCheckProps) {
  // Get checklist for this report type
  const checklist = useMemo(() => getChecklistForType(reportType), [reportType]);
  
  // Calculate status for each item
  const itemStatuses = useMemo(() => {
    return checklist.map(item => ({
      item,
      ...calculateItemStatus(item, data),
    }));
  }, [checklist, data]);
  
  // Calculate overall percentage
  const completenessPercentage = useMemo(() => {
    return calculateCompletenessPercentage(checklist, data);
  }, [checklist, data]);
  
  // Count statuses
  const completeCount = itemStatuses.filter(s => s.status === 'complete').length;
  const warningCount = itemStatuses.filter(s => s.status === 'warning').length;
  const incompleteCount = itemStatuses.filter(s => s.status === 'incomplete').length;
  
  // Determine overall status color
  const overallStatus: ChecklistStatus = 
    incompleteCount === 0 && warningCount === 0 ? 'complete' :
    incompleteCount === 0 ? 'warning' : 'incomplete';
  
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Rapport Compleetheidscheck
          </CardTitle>
          <span className={cn(
            'text-sm font-medium',
            statusConfig[overallStatus].className
          )}>
            {completenessPercentage}%
          </span>
        </div>
        <Progress 
          value={completenessPercentage} 
          className="h-2"
        />
        <p className="text-xs text-muted-foreground mt-2">
          {completeCount} van {checklist.length} secties compleet
          {warningCount > 0 && `, ${warningCount} waarschuwing${warningCount > 1 ? 'en' : ''}`}
        </p>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-1">
          {itemStatuses.map(({ item, status, missingFields, warnings }) => (
            <ChecklistItemRow
              key={item.id}
              item={item}
              status={status}
              missingFields={missingFields}
              warnings={warnings}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ReportCompletenessCheck;
