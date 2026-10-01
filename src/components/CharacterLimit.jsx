import { Target } from 'lucide-react';

const PRESETS = [
  { id: 'twitter', label: 'Twitter / X', limit: 280 },
  { id: 'sms', label: 'SMS', limit: 160 },
  { id: 'meta', label: 'Meta Description', limit: 160 },
  { id: 'seo', label: 'SEO Title', limit: 60 },
  { id: 'instagram', label: 'Instagram', limit: 2200 },
  { id: 'facebook', label: 'Facebook', limit: 63206 },
  { id: 'whatsapp', label: 'WhatsApp', limit: 700 },
  { id: 'youtube', label: 'YouTube', limit: 100 },
  { id: 'custom', label: 'Custom', limit: 500 }
];

/**
 * Character Limit Presets and Progress Indicator Component.
 * Responsive for all mobile devices.
 *
 * @param {{
 *   currentCount: number,
 *   selectedPresetId: string,
 *   onSelectPresetId: (id: string) => void,
 *   customLimit: number,
 *   onChangeCustomLimit: (limit: number) => void
 * }} props
 */
export default function CharacterLimit({
  currentCount,
  selectedPresetId,
  onSelectPresetId,
  customLimit,
  onChangeCustomLimit
}) {
  const activePreset = PRESETS.find((p) => p.id === selectedPresetId) || PRESETS[0];
  const effectiveLimit = selectedPresetId === 'custom' ? customLimit : activePreset.limit;

  const percentage = effectiveLimit > 0 ? (currentCount / effectiveLimit) * 100 : 0;
  const clampedPercentage = Math.min(percentage, 100);
  const remaining = effectiveLimit - currentCount;
  const isOver = remaining < 0;

  // Progress Bar Color: Green (<80%), Yellow (80%-100%), Red (>100%)
  let progressColor = 'bg-emerald-500';
  let badgeTextColor = 'text-emerald-700 dark:text-emerald-300';
  let badgeBgColor = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800';

  if (percentage > 100) {
    progressColor = 'bg-rose-500';
    badgeTextColor = 'text-rose-700 dark:text-rose-300';
    badgeBgColor = 'bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800';
  } else if (percentage >= 80) {
    progressColor = 'bg-amber-500';
    badgeTextColor = 'text-amber-700 dark:text-amber-300';
    badgeBgColor = 'bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800';
  }

  return (
    <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
      <div className="flex items-center justify-between mb-2.5 sm:mb-3 gap-2">
        <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate">
          <Target className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
          <span>Character Limit</span>
          <span className="font-urdu text-xs text-teal-700 dark:text-teal-400 font-normal">
            (حد)
          </span>
        </h3>
        <span className={`text-[11px] sm:text-xs font-semibold px-2 py-0.5 rounded-full border ${badgeBgColor} ${badgeTextColor} shrink-0`}>
          {isOver ? `-${Math.abs(remaining)} over` : `${remaining} left`}
        </span>
      </div>

      {/* Preset Chips */}
      <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2.5 sm:mb-3">
        {PRESETS.map((preset) => {
          const isSelected = selectedPresetId === preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => onSelectPresetId(preset.id)}
              className={`px-2 sm:px-2.5 py-1 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-medium transition-all ${
                isSelected
                  ? 'bg-teal-600 text-white shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {preset.label}
              <span className="ml-1 opacity-70">
                ({preset.id === 'custom' ? customLimit : preset.limit})
              </span>
            </button>
          );
        })}
      </div>

      {/* Custom input if custom preset is selected */}
      {selectedPresetId === 'custom' && (
        <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
          <label htmlFor="custom-limit-input" className="text-xs font-medium text-slate-600 dark:text-slate-400">
            Set custom limit:
          </label>
          <input
            id="custom-limit-input"
            type="number"
            min="1"
            max="100000"
            value={customLimit}
            onChange={(e) => onChangeCustomLimit(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-24 px-2 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      )}

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="h-2 sm:h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            style={{ width: `${clampedPercentage}%` }}
            className={`h-full transition-all duration-300 ${progressColor}`}
          />
        </div>
        <div className="flex justify-between items-center text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">
          <span>{currentCount.toLocaleString()} used</span>
          <span>{percentage.toFixed(1)}% of {effectiveLimit.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
