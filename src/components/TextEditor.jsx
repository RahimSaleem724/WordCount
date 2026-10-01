import { AlignLeft, AlignRight, Sparkles, BookOpen } from 'lucide-react';

/**
 * Main Text Input Component with fully responsive mobile controls.
 *
 * @param {{
 *   value: string,
 *   onChange: (val: string) => void,
 *   directionMode: 'auto' | 'ltr' | 'rtl',
 *   onChangeDirectionMode: (mode: 'auto' | 'ltr' | 'rtl') => void,
 *   detectedDirection: 'ltr' | 'rtl',
 *   fontSize: 'small' | 'medium' | 'large',
 *   onChangeFontSize: (size: 'small' | 'medium' | 'large') => void,
 *   onLoadSample: () => void
 * }} props
 */
export default function TextEditor({
  value,
  onChange,
  directionMode,
  onChangeDirectionMode,
  detectedDirection,
  fontSize,
  onChangeFontSize,
  onLoadSample
}) {
  // Determine effective direction based on mode and auto-detection
  const effectiveDirection = directionMode === 'auto' ? detectedDirection : directionMode;
  const isUrduFont = effectiveDirection === 'rtl';

  // Font size class mapping
  const fontSizeClasses = {
    small: 'text-xs sm:text-sm',
    medium: 'text-sm sm:text-base',
    large: 'text-base sm:text-lg'
  };

  // Plain-text paste interceptor to prevent formatted HTML artifacts
  const handlePaste = (e) => {
    e.preventDefault();
    const plain = e.clipboardData.getData('text/plain');
    const textarea = e.target;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const current = textarea.value;

    const updated = current.substring(0, start) + plain + current.substring(end);
    onChange(updated);

    // Reposition cursor after pasted text
    requestAnimationFrame(() => {
      textarea.selectionStart = textarea.selectionEnd = start + plain.length;
    });
  };

  return (
    <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-200 focus-within:ring-2 focus-within:ring-teal-500/50 focus-within:border-teal-500">
      {/* Editor Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 bg-slate-50/80 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-400">
        {/* Left: Direction Controls */}
        <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-0.5 sm:p-1 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-2xs">
          <span className="hidden sm:inline px-1.5 font-medium text-slate-500 dark:text-slate-400">
            Direction:
          </span>
          <button
            type="button"
            onClick={() => onChangeDirectionMode('auto')}
            className={`px-2 py-1 rounded-md sm:rounded-lg font-medium text-[11px] sm:text-xs transition-all ${
              directionMode === 'auto'
                ? 'bg-teal-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
            title="Auto detect text direction (خودکار سمت)"
          >
            Auto <span className="text-[10px] opacity-80">({detectedDirection.toUpperCase()})</span>
          </button>
          <button
            type="button"
            onClick={() => onChangeDirectionMode('ltr')}
            className={`p-1 sm:p-1.5 rounded-md sm:rounded-lg transition-all ${
              directionMode === 'ltr'
                ? 'bg-teal-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
            title="Left-to-Right / انگریزی موڈ"
            aria-label="Force LTR direction"
          >
            <AlignLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button
            type="button"
            onClick={() => onChangeDirectionMode('rtl')}
            className={`p-1 sm:p-1.5 rounded-md sm:rounded-lg transition-all ${
              directionMode === 'rtl'
                ? 'bg-teal-600 text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
            title="Right-to-Left / اردو موڈ"
            aria-label="Force RTL direction"
          >
            <AlignRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Right: Font size & Sample text */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Font Size Selector */}
          <div className="flex items-center bg-white dark:bg-slate-800 p-0.5 sm:p-1 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-2xs">
            <span className="hidden sm:inline px-1.5 font-medium text-slate-500 dark:text-slate-400">
              Size:
            </span>
            {(['small', 'medium', 'large']).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => onChangeFontSize(size)}
                className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg font-medium text-[11px] sm:text-xs transition-all ${
                  fontSize === size
                    ? 'bg-teal-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
                title={`Font size ${size}`}
              >
                {size[0].toUpperCase()}
              </button>
            ))}
          </div>

          {/* Sample Text Button */}
          <button
            type="button"
            onClick={onLoadSample}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-teal-200 dark:border-teal-800/80 bg-teal-50/70 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 hover:bg-teal-100/70 dark:hover:bg-teal-900/60 font-medium text-[11px] sm:text-xs transition-colors shadow-2xs shrink-0"
            title="Load sample English and Urdu text"
          >
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Try sample</span>
          </button>
        </div>
      </div>

      {/* Large Text Area */}
      <div className="relative min-h-[220px] sm:min-h-[300px] flex-1 flex flex-col">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onPaste={handlePaste}
          dir={effectiveDirection}
          placeholder="Yahan apna text likhein ya paste karein... / Type or paste your text here..."
          className={`w-full min-h-[220px] sm:min-h-[300px] p-3.5 sm:p-5 bg-transparent resize-y text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none transition-colors ${
            fontSizeClasses[fontSize] || 'text-sm sm:text-base'
          } ${isUrduFont ? 'font-urdu leading-[2.2]' : 'font-sans leading-relaxed'}`}
          aria-label="Text content to analyze"
        />

        {/* Empty State Banner (shown only when text is empty) */}
        {!value && (
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center p-4 text-center opacity-40">
            <BookOpen className="w-8 h-8 sm:w-12 sm:h-12 text-slate-400 dark:text-slate-600 mb-1.5 stroke-1" />
            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
              Type or paste English &amp; Urdu text here
            </p>
            <p className="text-[11px] sm:text-xs font-urdu text-slate-400 dark:text-slate-500 mt-0.5">
              یہاں اپنا متن لکھیں یا چسپاں کریں
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
