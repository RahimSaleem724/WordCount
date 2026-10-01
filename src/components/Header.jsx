import { Type, CheckCircle2 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

/**
 * Mobile-friendly Application Header component.
 *
 * @param {{
 *   isDark: boolean,
 *   onToggleTheme: () => void,
 *   isSaved: boolean
 * }} props
 */
export default function Header({ isDark, onToggleTheme, isSaved }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2">
        {/* Brand / Titles */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-sm shadow-teal-500/20 shrink-0">
            <Type className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-sm sm:text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white truncate">
                Word &amp; Character Counter
              </h1>
              {/* Roman Urdu Tooltip Badge (visible on tablets/desktop) */}
              <span
                className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60 cursor-help shrink-0"
                title="Alfaz aur haroof ki live ginti aur tajzia"
              >
                Alfaz Ginti
              </span>
            </div>
            <p className="text-[11px] sm:text-xs font-urdu font-medium text-teal-700 dark:text-teal-400 mt-0.5 leading-tight truncate">
              الفاظ اور حروف شمار کنندہ
            </p>
          </div>
        </div>

        {/* Right side: Auto-save badge + Theme toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Auto-save visual indicator */}
          <div
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-medium transition-all duration-300 ${
              isSaved
                ? 'opacity-100 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 scale-100'
                : 'opacity-0 scale-95 pointer-events-none'
            }`}
            role="status"
            aria-live="polite"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="hidden xs:inline">Saved <span className="font-urdu text-[10px] hidden sm:inline">(محفوظ)</span></span>
          </div>

          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}
