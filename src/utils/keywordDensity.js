import { ENGLISH_STOP_WORDS, URDU_STOP_WORDS } from './stopwords.js';

/**
 * Calculates the top keyword frequencies and density percentages.
 *
 * @param {string[]} wordsList - Array of words extracted from text
 * @param {Object} options
 * @param {boolean} [options.ignoreStopWords=false] - Whether to filter out common stop words
 * @param {number} [options.minEnglishLength=3] - Minimum length for Latin words
 * @param {number} [options.minUrduLength=2] - Minimum length for Urdu words
 * @param {number} [options.limit=10] - Number of top keywords to return
 * @param {number} [options.totalWords] - Total word count used for percentage calculation
 * @returns {Array<{ word: string, count: number, percentage: number }>}
 */
export function getKeywordDensity(wordsList = [], options = {}) {
  const {
    ignoreStopWords = false,
    minEnglishLength = 3,
    minUrduLength = 2,
    limit = 10,
    totalWords = wordsList?.length || 0
  } = options;

  if (!Array.isArray(wordsList) || wordsList.length === 0 || totalWords === 0) {
    return [];
  }

  const urduCharRegex = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
  const frequencies = new Map();

  for (const rawWord of wordsList) {
    if (!rawWord) continue;

    // Normalize: lowercase English words, trim Urdu words
    const normalized = rawWord.toLowerCase().trim();
    const isUrdu = urduCharRegex.test(normalized);

    // Stop words filter
    if (ignoreStopWords) {
      if (isUrdu && URDU_STOP_WORDS.has(normalized)) {
        continue;
      }
      if (!isUrdu && ENGLISH_STOP_WORDS.has(normalized)) {
        continue;
      }
    }

    // Minimum length filter (excluding ZWNJ from length check)
    const visibleLength = normalized.replace(/[\u200C\u200B]/g, '').length;
    if (isUrdu && visibleLength < minUrduLength) {
      continue;
    }
    if (!isUrdu && visibleLength < minEnglishLength) {
      continue;
    }

    // Increment count
    frequencies.set(normalized, (frequencies.get(normalized) || 0) + 1);
  }

  // Convert to array and sort descending by frequency, then alphabetically
  const sorted = Array.from(frequencies.entries())
    .map(([word, count]) => ({
      word,
      count,
      percentage: parseFloat(((count / totalWords) * 100).toFixed(1))
    }))
    .sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      return a.word.localeCompare(b.word);
    });

  return sorted.slice(0, limit);
}

/**
 * Format keyword density data into a clean plain text table.
 *
 * @param {Array<{ word: string, count: number, percentage: number }>} list
 * @returns {string}
 */
export function formatDensityAsText(list) {
  if (!list || list.length === 0) {
    return 'No keyword density data available.';
  }

  const header = `Rank | Word                          | Count | Density\n-----------------------------------------------------`;
  const rows = list.map((item, idx) => {
    const rank = String(idx + 1).padEnd(4, ' ');
    const word = item.word.padEnd(30, ' ');
    const count = String(item.count).padStart(5, ' ');
    const pct = `${item.percentage.toFixed(1)}%`.padStart(7, ' ');
    return `${rank}| ${word}| ${count} | ${pct}`;
  });

  return [header, ...rows].join('\n');
}
