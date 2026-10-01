/**
 * Language-aware word counting utility supporting English and Urdu.
 *
 * Rules:
 * - Uses Intl.Segmenter with granularity 'word' and isWordLike filtering.
 * - Regex fallback if Intl.Segmenter is unavailable.
 * - Treats URLs, emails, hyphenated words (e.g. well-known), contractions (e.g. don't) as 1 word.
 * - Preserves Urdu words containing Zero-Width Non-Joiner (ZWNJ \u200C) as a single word.
 * - Handles Urdu digits (۰-۹) and English digits (0-9) as word tokens.
 * - Ignores Urdu punctuation (۔ ، ؟ ؛) and Latin punctuation.
 *
 * @param {string} text
 * @returns {{
 *   total: number,
 *   unique: number,
 *   longestWord: string,
 *   averageLength: number,
 *   wordsList: string[],
 *   dominantScript: 'urdu' | 'latin'
 * }}
 */
export function countWords(text) {
  if (!text || typeof text !== 'string' || !text.trim()) {
    return {
      total: 0,
      unique: 0,
      longestWord: '',
      averageLength: 0,
      wordsList: [],
      dominantScript: 'latin'
    };
  }

  // Regular expressions to protect URLs, emails, and hyphenated words from premature splitting
  const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/gi;
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
  // Hyphenated compound words like well-known, state-of-the-art
  const hyphenWordRegex = /[\p{L}\p{M}\p{N}\u200C]+(?:[-–—][\p{L}\p{M}\p{N}\u200C]+)+/gu;

  const specialTokens = [];
  const placeholderPrefix = '___SPEC_TOKEN_';
  const placeholderSuffix = '___';

  const processed = text
    .replace(urlRegex, (match) => {
      const idx = specialTokens.length;
      specialTokens.push(match);
      return ` ${placeholderPrefix}${idx}${placeholderSuffix} `;
    })
    .replace(emailRegex, (match) => {
      const idx = specialTokens.length;
      specialTokens.push(match);
      return ` ${placeholderPrefix}${idx}${placeholderSuffix} `;
    })
    .replace(hyphenWordRegex, (match) => {
      const idx = specialTokens.length;
      specialTokens.push(match);
      return ` ${placeholderPrefix}${idx}${placeholderSuffix} `;
    });

  let rawWords = [];

  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    try {
      // Create segmenter. When locale is unspecified, it adheres to Unicode UAX #29 standard rules
      const segmenter = new Intl.Segmenter(undefined, { granularity: 'word' });
      for (const segment of segmenter.segment(processed)) {
        if (segment.isWordLike) {
          rawWords.push(segment.segment.trim());
        }
      }
    } catch {
      // Fallback
      rawWords = fallbackWordSplit(processed);
    }
  } else {
    rawWords = fallbackWordSplit(processed);
  }

  // Restore special tokens and clean any edge punctuation
  const wordsList = [];
  const tokenRegex = new RegExp(`^${placeholderPrefix}(\\d+)${placeholderSuffix}$`);

  for (const raw of rawWords) {
    const match = raw.match(tokenRegex);
    if (match) {
      const idx = parseInt(match[1], 10);
      if (specialTokens[idx]) {
        wordsList.push(specialTokens[idx]);
      }
    } else {
      // Strip any stray punctuation that might have attached to a word
      const cleaned = raw.replace(/^[\s.,!?;:۔،؟؛"“”'’()[\]{}]+|[\s.,!?;:۔،؟؛"“”'’()[\]{}]+$/g, '');
      if (cleaned.length > 0) {
        wordsList.push(cleaned);
      }
    }
  }

  const total = wordsList.length;

  if (total === 0) {
    return {
      total: 0,
      unique: 0,
      longestWord: '',
      averageLength: 0,
      wordsList: [],
      dominantScript: 'latin'
    };
  }

  // Calculate unique words (case-insensitive for Latin, direct for others)
  const uniqueSet = new Set();
  let totalCharsInWords = 0;
  let longestWord = '';
  let urduWordCount = 0;
  let latinWordCount = 0;

  const urduCharRegex = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
  const latinCharRegex = /[A-Za-z]/;

  for (const word of wordsList) {
    // Normalization: lowercase Latin, strip ZWNJ for comparison if necessary
    const normalized = word.toLowerCase();
    uniqueSet.add(normalized);

    // Character length (excluding ZWNJ)
    const visibleLength = word.replace(/[\u200C\u200B]/g, '').length;
    totalCharsInWords += visibleLength;

    if (visibleLength > longestWord.replace(/[\u200C\u200B]/g, '').length) {
      longestWord = word;
    }

    if (urduCharRegex.test(word)) {
      urduWordCount++;
    } else if (latinCharRegex.test(word)) {
      latinWordCount++;
    }
  }

  const unique = uniqueSet.size;
  const averageLength = total > 0 ? parseFloat((totalCharsInWords / total).toFixed(1)) : 0;
  const dominantScript = urduWordCount > latinWordCount ? 'urdu' : 'latin';

  return {
    total,
    unique,
    longestWord,
    averageLength,
    wordsList,
    dominantScript
  };
}

/**
 * Fallback word extraction splitting on whitespace and filtering punctuation.
 * @param {string} text
 * @returns {string[]}
 */
function fallbackWordSplit(text) {
  // Split on whitespace
  const tokens = text.split(/\s+/);
  const result = [];
  for (const tok of tokens) {
    const cleaned = tok.replace(/^[\s.,!?;:۔،؟؛"“”'’()[\]{}]+|[\s.,!?;:۔،؟؛"“”'’()[\]{}]+$/g, '');
    if (cleaned.length > 0) {
      result.push(cleaned);
    }
  }
  return result;
}
