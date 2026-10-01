import { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, RotateCcw, X } from 'lucide-react';

/**
 * Toast Notification with optional Action button (e.g. Undo Clear).
 *
 * @param {{
 *   message: string,
 *   type?: 'success' | 'info' | 'error',
 *   actionLabel?: string,
 *   onAction?: () => void,
 *   onClose: () => void,
 *   duration?: number
 * }} props
 */
export default function Toast({
  message,
  type = 'info',
  actionLabel,
  onAction,
  onClose,
  duration = 5000
}) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-teal-500 shrink-0" />
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-slate-900 dark:bg-slate-800 text-white rounded-2xl shadow-xl border border-slate-700/60 max-w-md animate-in slide-in-from-bottom-5 duration-300"
    >
      {icons[type] || icons.info}
      <span className="text-sm font-medium">{message}</span>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={() => {
            onAction();
            onClose();
          }}
          className="ml-2 inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-teal-300 bg-teal-950/80 hover:bg-teal-900 border border-teal-700/60 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          {actionLabel}
        </button>
      )}

      <button
        type="button"
        onClick={onClose}
        className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 focus:outline-none transition-colors ml-auto"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
