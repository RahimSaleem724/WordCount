import { Sun, Moon } from 'lucide-react';

/**
 * Accessible Dark / Light Mode Toggle Button.
 *
 * @param {{ isDark: boolean, onToggle: () => void }} props
 */
export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="relative p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-150 shadow-sm"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode (روشنی کا موڈ)' : 'Switch to dark mode (تاریک موڈ)'}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-amber-400 animate-in fade-in zoom-in-75 duration-200" />
      ) : (
        <Moon className="w-5 h-5 text-teal-600 animate-in fade-in zoom-in-75 duration-200" />
      )}
    </button>
  );
}
