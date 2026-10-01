/**
 * Animated individual Stat Card with fully responsive mobile styling.
 *
 * @param {{
 *   label: string,
 *   urduLabel?: string,
 *   value: number | string,
 *   subtext?: string,
 *   icon?: import('react').ReactNode,
 *   accent?: 'teal' | 'cyan' | 'indigo' | 'emerald' | 'amber' | 'rose'
 * }} props
 */
export default function StatCard({
  label,
  urduLabel,
  value,
  subtext,
  icon,
  accent = 'teal'
}) {
  const accentStyles = {
    teal: 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 border-teal-100 dark:border-teal-900/60',
    cyan: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 border-cyan-100 dark:border-cyan-900/60',
    indigo: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-100 dark:border-indigo-900/60',
    emerald: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-100 dark:border-emerald-900/60',
    amber: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-100 dark:border-amber-900/60',
    rose: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-100 dark:border-rose-900/60'
  };

  const currentAccent = accentStyles[accent] || accentStyles.teal;

  return (
    <div className="relative p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:shadow-xs transition-all duration-200 flex flex-col justify-between overflow-hidden">
      <div className="flex items-start justify-between gap-1.5 min-w-0">
        <div className="min-w-0 flex-1">
          <span
            className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block truncate"
            title={label}
          >
            {label}
          </span>
          {urduLabel && (
            <span
              className="block text-[11px] sm:text-xs font-urdu text-teal-700 dark:text-teal-400 leading-tight mt-0.5 truncate"
              title={urduLabel}
            >
              {urduLabel}
            </span>
          )}
        </div>
        {icon && (
          <div className={`p-1 sm:p-1.5 rounded-lg sm:rounded-xl border ${currentAccent} shrink-0 ml-1`}>
            {icon}
          </div>
        )}
      </div>

      <div className="mt-2 sm:mt-3 min-w-0">
        <div
          key={String(value)}
          className="text-lg sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white animate-in fade-in zoom-in-95 duration-200 truncate"
          role="status"
          aria-live="polite"
          title={typeof value === 'string' ? value : String(value)}
        >
          {typeof value === 'number' ? value.toLocaleString() : value || '0'}
        </div>
        {subtext && (
          <p
            className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate"
            title={subtext}
          >
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}
