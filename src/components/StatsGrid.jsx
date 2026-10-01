import {
  FileText,
  Hash,
  AlignLeft,
  ListOrdered,
  Clock,
  Mic,
  Maximize2,
  Sparkles,
  BarChart2,
  Pilcrow
} from 'lucide-react';
import StatCard from './StatCard';

/**
 * Responsive Grid displaying the 11 Live Statistics Cards.
 *
 * @param {{ stats: Object }} props
 */
export default function StatsGrid({ stats }) {
  return (
    <div className="flex flex-col gap-2.5 sm:gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <BarChart2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-600 dark:text-teal-400" />
          <span>Live Statistics</span>
          <span className="font-urdu text-xs text-teal-700 dark:text-teal-400 font-normal">
            (اعداد و شمار)
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {/* 1. Words */}
        <StatCard
          label="Words"
          urduLabel="الفاظ"
          value={stats.words}
          subtext="Word count"
          icon={<FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          accent="teal"
        />

        {/* 2. Characters with spaces */}
        <StatCard
          label="Chars (all)"
          urduLabel="حروف بشمول فاصلہ"
          value={stats.charactersWithSpaces}
          subtext="With spaces"
          icon={<Hash className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          accent="cyan"
        />

        {/* 3. Characters without spaces */}
        <StatCard
          label="Chars (no sp)"
          urduLabel="حروف بغیر فاصلہ"
          value={stats.charactersWithoutSpaces}
          subtext="No spaces"
          icon={<Hash className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          accent="indigo"
        />

        {/* 4. Sentences */}
        <StatCard
          label="Sentences"
          urduLabel="جملے"
          value={stats.sentences}
          subtext="Sentence count"
          icon={<AlignLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          accent="emerald"
        />

        {/* 5. Paragraphs */}
        <StatCard
          label="Paragraphs"
          urduLabel="پیراگراف"
          value={stats.paragraphs}
          subtext="Blank-line split"
          icon={<Pilcrow className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          accent="teal"
        />

        {/* 6. Lines */}
        <StatCard
          label="Lines"
          urduLabel="سطریں"
          value={stats.lines}
          subtext="Total lines"
          icon={<ListOrdered className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          accent="cyan"
        />

        {/* 7. Unique Words */}
        <StatCard
          label="Unique Words"
          urduLabel="منفرد الفاظ"
          value={stats.uniqueWords}
          subtext={
            stats.words > 0
              ? `${((stats.uniqueWords / stats.words) * 100).toFixed(0)}% diversity`
              : '0% diversity'
          }
          icon={<Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          accent="amber"
        />

        {/* 8. Average Word Length */}
        <StatCard
          label="Avg Word Len"
          urduLabel="اوسط لمبائی"
          value={`${stats.averageWordLength} ch`}
          subtext="Chars per word"
          icon={<BarChart2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          accent="emerald"
        />

        {/* 9. Longest Word */}
        <div className="col-span-2">
          <StatCard
            label="Longest Word"
            urduLabel="طویل ترین لفظ"
            value={stats.longestWord ? `"${stats.longestWord}"` : '—'}
            subtext={
              stats.longestWord
                ? `${stats.longestWord.replace(/[\u200C\u200B]/g, '').length} characters`
                : 'No words entered'
            }
            icon={<Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            accent="rose"
          />
        </div>

        {/* 10. Reading Time */}
        <StatCard
          label="Reading Time"
          urduLabel="پڑھنے کا وقت"
          value={stats.readingTimeText}
          subtext={`${stats.readingWpm} WPM (${stats.dominantScript === 'urdu' ? 'Urdu' : 'English'})`}
          icon={<Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          accent="teal"
        />

        {/* 11. Speaking Time */}
        <StatCard
          label="Speaking Time"
          urduLabel="بولنے کا وقت"
          value={stats.speakingTimeText}
          subtext={`${stats.speakingWpm} WPM speech rate`}
          icon={<Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
          accent="indigo"
        />
      </div>
    </div>
  );
}
