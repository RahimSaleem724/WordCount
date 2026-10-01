import { FileText, Hash, Clock } from 'lucide-react';

/**
 * Mobile Sticky Bottom Bar displaying Words and Characters at all times.
 * Only rendered on mobile/tablet viewports (< 1024px).
 * Supports safe area insets for modern mobile devices.
 *
 * @param {{
 *   words: number,
 *   characters: number,
 *   readingTime: string
 * }} props
 */
export default function MobileStickyBar({ words, characters, readingTime }) {
  return (
    <aside
      aria-label="Quick statistics bar"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800 shadow-lg px-3 py-2 transition-colors duration-200"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom, 0.5rem))' }}
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-1 text-xs">
        {/* Words */}
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="p-1 rounded-md bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 shrink-0">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] text-slate-400 uppercase font-semibold block leading-none">
              Words
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate block">
              {words.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 shrink-0" />

        {/* Characters */}
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="p-1 rounded-md bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 shrink-0">
            <Hash className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] text-slate-400 uppercase font-semibold block leading-none">
              Chars
            </span>
            <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate block">
              {characters.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 shrink-0" />

        {/* Reading Time */}
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="p-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0">
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] text-slate-400 uppercase font-semibold block leading-none">
              Reading
            </span>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-900 dark:text-white truncate max-w-[85px] sm:max-w-[100px] block">
              {readingTime}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
