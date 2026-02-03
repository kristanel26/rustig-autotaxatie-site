import { useState, useRef, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type SaveStatus = 'idle' | 'pending' | 'saving' | 'saved' | 'error';

interface UseAutoSaveOptions {
  reportId: string | undefined;
  debounceMs?: number;
  intervalMs?: number;
}

interface UseAutoSaveReturn {
  status: SaveStatus;
  lastSavedAt: Date | null;
  hasPendingChanges: boolean;
  saveField: (fieldName: string, value: unknown) => void;
  saveMultipleFields: (fields: Record<string, unknown>) => void;
  flushSave: () => Promise<boolean>;
  markFieldChanged: (fieldName: string) => void;
}

export function useAutoSave({ 
  reportId, 
  debounceMs = 800, 
  intervalMs = 20000 
}: UseAutoSaveOptions): UseAutoSaveReturn {
  const { toast } = useToast();
  const [status, setStatus] = useState<SaveStatus>('idle');
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  
  // Pending changes queue
  const pendingChanges = useRef<Record<string, unknown>>({});
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryCount = useRef(0);
  const maxRetries = 3;

  const hasPendingChanges = Object.keys(pendingChanges.current).length > 0;

  // Execute the save operation
  const executeSave = useCallback(async (): Promise<boolean> => {
    if (!reportId || Object.keys(pendingChanges.current).length === 0) {
      return true;
    }

    const changesToSave = { ...pendingChanges.current };
    setStatus('saving');

    try {
      const { error } = await supabase
        .from('reports')
        .update(changesToSave)
        .eq('id', reportId);

      if (error) throw error;

      // Clear saved changes from queue
      Object.keys(changesToSave).forEach(key => {
        delete pendingChanges.current[key];
      });

      setStatus('saved');
      setLastSavedAt(new Date());
      retryCount.current = 0;

      // Reset to idle after 2 seconds
      setTimeout(() => {
        setStatus(prev => prev === 'saved' ? 'idle' : prev);
      }, 2000);

      return true;
    } catch (error) {
      console.error('Auto-save error:', error);
      retryCount.current++;

      if (retryCount.current < maxRetries) {
        // Retry after delay
        setTimeout(() => executeSave(), 2000 * retryCount.current);
        setStatus('pending');
      } else {
        setStatus('error');
        toast({
          title: 'Opslaan mislukt',
          description: 'Controleer je verbinding en probeer het opnieuw.',
          variant: 'destructive',
        });
      }
      return false;
    }
  }, [reportId, toast]);

  // Debounced save trigger
  const triggerDebouncedSave = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    setStatus('pending');
    debounceTimer.current = setTimeout(() => {
      executeSave();
    }, debounceMs);
  }, [debounceMs, executeSave]);

  // Save a single field
  const saveField = useCallback((fieldName: string, value: unknown) => {
    pendingChanges.current[fieldName] = value;
    triggerDebouncedSave();
  }, [triggerDebouncedSave]);

  // Save multiple fields at once
  const saveMultipleFields = useCallback((fields: Record<string, unknown>) => {
    Object.assign(pendingChanges.current, fields);
    triggerDebouncedSave();
  }, [triggerDebouncedSave]);

  // Mark a field as changed (for blur events without value)
  const markFieldChanged = useCallback((fieldName: string) => {
    if (fieldName in pendingChanges.current) {
      triggerDebouncedSave();
    }
  }, [triggerDebouncedSave]);

  // Flush save immediately (for navigation/export)
  const flushSave = useCallback(async (): Promise<boolean> => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }
    return executeSave();
  }, [executeSave]);

  // Interval-based auto-save fallback
  useEffect(() => {
    if (!reportId) return;

    const interval = setInterval(() => {
      if (Object.keys(pendingChanges.current).length > 0) {
        executeSave();
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [reportId, intervalMs, executeSave]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return {
    status,
    lastSavedAt,
    hasPendingChanges,
    saveField,
    saveMultipleFields,
    flushSave,
    markFieldChanged,
  };
}
