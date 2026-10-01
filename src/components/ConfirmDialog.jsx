import { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * Accessible confirmation modal dialog for clearing text.
 *
 * @param {{
 *   isOpen: boolean,
 *   title: string,
 *   message: string,
 *   confirmLabel?: string,
 *   cancelLabel?: string,
 *   onConfirm: () => void,
 *   onCancel: () => void
 * }} props
 */
export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Clear Text',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel
}) {
  const cancelBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      cancelBtnRef.current?.focus();

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onCancel();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
    >
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3
              id="confirm-dialog-title"
              className="text-base font-semibold text-slate-900 dark:text-white"
            >
              {title}
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {message}
            </p>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              Note: You can still undo this action for 5 seconds using the notification bar.
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            ref={cancelBtnRef}
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium rounded-xl bg-rose-600 hover:bg-rose-700 text-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors shadow-sm"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
