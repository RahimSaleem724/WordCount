import { Languages } from 'lucide-react';

/**
 * Script Breakdown Component showing Urdu vs Latin vs Digits vs Other composition.
 * Responsive for all mobile screen sizes.
 *
 * @param {{ breakdown: {
 *   urdu: { count: number, percentage: number },
 *   latin: { count: number, percentage: number },
 *   digits: { count: number, percentage: number },
 *   other: { count: number, percentage: number },
 *   total: number
 * } }} props
 */
export default function ScriptBreakdown({ breakdown }) {
  const { urdu, latin, digits, other, total } = breakdown;

  return (
    <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
      <div className="flex items-center justify-between mb-2.5 sm:mb-3">
        <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate">
          <Languages className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
          <span>Script Breakdown</span>
          <span className="font-urdu text-xs text-teal-700 dark:text-teal-400 font-normal">
            (رسم الخط)
          </span>
        </h3>
        <span className="text-[11px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 shrink-0">
          {total.toLocaleString()} chars
        </span>
      </div>

      {/* Visual multi-segment progress bar */}
      <div className="h-2.5 sm:h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
        {urdu.percentage > 0 && (
          <div
            style={{ width: `${urdu.percentage}%` }}
            className="bg-teal-500 dark:bg-teal-400 h-full transition-all duration-300"
            title={`Urdu: ${urdu.percentage}% (${urdu.count})`}
          />
        )}
        {latin.percentage > 0 && (
          <div
            style={{ width: `${latin.percentage}%` }}
            className="bg-cyan-500 dark:bg-cyan-400 h-full transition-all duration-300"
            title={`English (Latin): ${latin.percentage}% (${latin.count})`}
          />
        )}
        {digits.percentage > 0 && (
          <div
            style={{ width: `${digits.percentage}%` }}
            className="bg-amber-500 dark:bg-amber-400 h-full transition-all duration-300"
            title={`Digits: ${digits.percentage}% (${digits.count})`}
          />
        )}
        {other.percentage > 0 && (
          <div
            style={{ width: `${other.percentage}%` }}
            className="bg-purple-500 dark:bg-purple-400 h-full transition-all duration-300"
            title={`Other: ${other.percentage}% (${other.count})`}
          />
        )}
        {total === 0 && (
          <div className="w-full bg-slate-200 dark:bg-slate-700/50 h-full" />
        )}
      </div>

      {/* Breakdown detail badges */}
      <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-2.5 sm:mt-3 text-[11px] sm:text-xs">
        {/* Urdu */}
        <div className="flex items-center justify-between p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
            <span className="text-slate-600 dark:text-slate-300 font-medium truncate">
              Urdu <span className="font-urdu text-[10px] hidden sm:inline">(اردو)</span>
            </span>
          </div>
          <span className="font-semibold text-slate-900 dark:text-white shrink-0 ml-1">
            {urdu.percentage}%
          </span>
        </div>

        {/* Latin / English */}
        <div className="flex items-center justify-between p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
            <span className="text-slate-600 dark:text-slate-300 font-medium truncate">
              English
            </span>
          </div>
          <span className="font-semibold text-slate-900 dark:text-white shrink-0 ml-1">
            {latin.percentage}%
          </span>
        </div>

        {/* Digits */}
        <div className="flex items-center justify-between p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <span className="text-slate-600 dark:text-slate-300 font-medium truncate">
              Digits <span className="font-urdu text-[10px] hidden sm:inline">(ہندسے)</span>
            </span>
          </div>
          <span className="font-semibold text-slate-900 dark:text-white shrink-0 ml-1">
            {digits.percentage}%
          </span>
        </div>

        {/* Other */}
        <div className="flex items-center justify-between p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
            <span className="text-slate-600 dark:text-slate-300 font-medium truncate">
              Other / Emojis
            </span>
          </div>
          <span className="font-semibold text-slate-900 dark:text-white shrink-0 ml-1">
            {other.percentage}%
          </span>
        </div>
      </div>
    </div>
  );
}
