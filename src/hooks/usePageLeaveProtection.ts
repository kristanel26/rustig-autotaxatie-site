import { useEffect, useCallback } from 'react';
import { useBlocker } from 'react-router-dom';

interface UsePageLeaveProtectionOptions {
  hasUnsavedChanges: boolean;
  onBeforeLeave?: () => Promise<boolean>;
  message?: string;
}

export function usePageLeaveProtection({
  hasUnsavedChanges,
  onBeforeLeave,
  message = 'Je hebt niet-opgeslagen wijzigingen. Weet je zeker dat je wilt vertrekken?',
}: UsePageLeaveProtectionOptions) {
  // Browser tab close / refresh protection
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges, message]);

  // React Router navigation protection
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      hasUnsavedChanges && currentLocation.pathname !== nextLocation.pathname
  );

  // Handle blocked navigation
  const handleProceed = useCallback(async () => {
    if (blocker.state === 'blocked') {
      if (onBeforeLeave) {
        const saved = await onBeforeLeave();
        if (saved) {
          blocker.proceed();
        }
      } else {
        blocker.proceed();
      }
    }
  }, [blocker, onBeforeLeave]);

  const handleReset = useCallback(() => {
    if (blocker.state === 'blocked') {
      blocker.reset();
    }
  }, [blocker]);

  return {
    isBlocked: blocker.state === 'blocked',
    proceed: handleProceed,
    reset: handleReset,
  };
}
