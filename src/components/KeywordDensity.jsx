import { useState } from 'react';
import { KeyRound, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { formatDensityAsText } from '../utils/keywordDensity';

/**
 * Keyword Density Component with fully responsive mobile layout.
 *
 * @param {{
 *   keywords: Array<{ word: string, count: number, percentage: number }>,
 *   ignoreStopWords: boolean,
 *   onToggleIgnoreStopWords: () => void,
 *   minEnglishLength: number,
 *   onChangeMinEnglishLength: (len: number) => void,
 *   minUrduLength: number,
 *   onChangeMinUrduLength: (len: number) => void,
 *   onShowToast: (msg: string, type?: string) => void
 * }} props
 */
export default function KeywordDensity({
  keywords = [],
  ignoreStopWords,
  onToggleIgnoreStopWords,
  minEnglishLength,
  onChangeMinEnglishLength,
  minUrduLength,
  onChangeMinUrduLength,
  onShowToast
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopyTable = async () => {
    if (!keywords || keywords.length === 0) {
      onShowToast('No keyword data to copy', 'info');
      return;
    }
    const textTable = formatDensityAsText(keywords);
    try {
      await navigator.clipboard.writeText(textTable);
      setCopied(true);
      onShowToast('Keyword table copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      onShowToast('Failed to copy keyword table', 'error');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-200">
      {/* Header with Collapse Toggle */}
      <div className="flex items-center justify-between p-3 sm:p-4 border-b border-slate-100 dark:border-slate-800/80 gap-2">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-left focus:outline-none min-w-0"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0">
            <KeyRound className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5 truncate">
              <span>Keyword Density</span>
              <span className="font-urdu text-[11px] sm:text-xs text-teal-700 dark:text-teal-400 font-normal truncate">
                (کلیدی الفاظ)
              </span>
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
              Top 10 most frequent words
            </p>
          </div>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-slate-400 ml-1 shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-400 ml-1 shrink-0" />
          )}
        </button>

        {/* Copy Plain Text Table */}
        <button
          type="button"
          onClick={handleCopyTable}
          disabled={keywords.length === 0}
          className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium disabled:opacity-50 transition-colors shadow-2xs shrink-0"
          title="Copy keyword density table as plain text"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-teal-600 dark:text-teal-400" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {isOpen && (
        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          {/* Responsive Filter Controls Bar */}
          <div className="flex flex-col gap-2.5 p-2.5 sm:p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-xs">
            {/* Ignore Stop Words Toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={ignoreStopWords}
                onChange={onToggleIgnoreStopWords}
                className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 dark:bg-slate-700 border-slate-300 dark:border-slate-600 shrink-0"
              />
              <span className="font-medium text-slate-700 dark:text-slate-200 text-xs">
                Ignore common words <span className="text-slate-400 font-normal">(the, is, کا، کی...)</span>
              </span>
            </label>

            {/* Minimum Length Filters in a clean responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 border-t border-slate-200/50 dark:border-slate-700/50">
              {/* English Filter */}
              <div className="flex items-center justify-between sm:justify-start gap-2 bg-white dark:bg-slate-800 p-1.5 sm:p-0 rounded-lg sm:bg-transparent sm:dark:bg-transparent">
                <span className="text-slate-500 dark:text-slate-400 whitespace-nowrap shrink-0 text-xs">
                  Min English:
                </span>
                <select
                  value={minEnglishLength}
                  onChange={(e) => onChangeMinEnglishLength(parseInt(e.target.value, 10))}
                  className="px-2 py-1 bg-slate-50 sm:bg-white dark:bg-slate-700/80 sm:dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none min-w-[90px]"
                >
                  <option value={1}>1 char</option>
                  <option value={2}>2 chars</option>
                  <option value={3}>3 chars</option>
                  <option value={4}>4 chars</option>
                  <option value={5}>5 chars</option>
                </select>
              </div>

              {/* Urdu Filter */}
              <div className="flex items-center justify-between sm:justify-start gap-2 bg-white dark:bg-slate-800 p-1.5 sm:p-0 rounded-lg sm:bg-transparent sm:dark:bg-transparent">
                <span className="text-slate-500 dark:text-slate-400 font-urdu whitespace-nowrap shrink-0 text-xs">
                  کم از کم اردو:
                </span>
                <select
                  value={minUrduLength}
                  onChange={(e) => onChangeMinUrduLength(parseInt(e.target.value, 10))}
                  className="px-2 py-1 bg-slate-50 sm:bg-white dark:bg-slate-700/80 sm:dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-teal-500 focus:outline-none min-w-[90px]"
                >
                  <option value={1}>1 حرف</option>
                  <option value={2}>2 حروف</option>
                  <option value={3}>3 حروف</option>
                  <option value={4}>4 حروف</option>
                </select>
              </div>
            </div>
          </div>

          {/* Keywords Table with Responsive Columns */}
          {keywords.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <tr>
                    <th className="py-2 px-2.5 font-semibold w-10 text-center">#</th>
                    <th className="py-2 px-2.5 font-semibold">Word / لفظ</th>
                    <th className="py-2 px-2.5 font-semibold w-16 text-right">Count</th>
                    <th className="py-2 px-2.5 font-semibold w-16 text-right">Density</th>
                    <th className="py-2 px-2.5 font-semibold w-24 hidden sm:table-cell">Visual</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {keywords.map((item, idx) => {
                    const isUrdu = /[\u0600-\u06FF]/.test(item.word);
                    return (
                      <tr
                        key={item.word}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="py-1.5 px-2.5 text-center text-slate-400 font-mono text-[11px]">
                          {idx + 1}
                        </td>
                        <td className={`py-1.5 px-2.5 font-medium text-slate-900 dark:text-white truncate max-w-[150px] ${isUrdu ? 'font-urdu text-xs' : 'font-sans'}`}>
                          {item.word}
                        </td>
                        <td className="py-1.5 px-2.5 text-right font-semibold text-slate-700 dark:text-slate-300">
                          {item.count}
                        </td>
                        <td className="py-1.5 px-2.5 text-right font-medium text-teal-600 dark:text-teal-400">
                          {item.percentage}%
                        </td>
                        <td className="py-1.5 px-2.5 hidden sm:table-cell">
                          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div
                              style={{ width: `${Math.min(item.percentage * 2, 100)}%` }}
                              className="bg-teal-500 dark:bg-teal-400 h-full rounded-full"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6 text-center text-slate-400 dark:text-slate-500 text-xs">
              No keyword data available for the current text and filters.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
