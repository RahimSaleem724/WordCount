import { useMemo } from 'react';
import { useDebounce } from './useDebounce.js';
import { countWords } from '../utils/countWords.js';
import { countCharacters } from '../utils/countCharacters.js';
import { countSentences } from '../utils/countSentences.js';
import { detectDirection } from '../utils/detectDirection.js';
import { getScriptBreakdown } from '../utils/scriptBreakdown.js';
import { calculateReadingTime } from '../utils/readingTime.js';
import { getKeywordDensity } from '../utils/keywordDensity.js';

/**
 * Custom hook to calculate all text statistics reactively.
 * Debounces calculations by 100ms for text > 50,000 characters to keep the UI smooth;
 * updates immediately for smaller texts.
 * Memoizes results with useMemo.
 *
 * @param {string} rawText
 * @param {Object} [keywordOptions={}]
 * @returns {Object} statistics object
 */
export function useTextStats(rawText = '', keywordOptions = {}) {
  const isLarge = rawText.length > 50000;
  const debouncedLargeText = useDebounce(rawText, 100);
  const text = isLarge ? debouncedLargeText : rawText;

  const stats = useMemo(() => {
    if (!text || text.trim() === '') {
      const charCounts = countCharacters(text);
      return {
        words: 0,
        charactersWithSpaces: charCounts.withSpaces,
        charactersWithoutSpaces: charCounts.withoutSpaces,
        sentences: 0,
        paragraphs: 0,
        lines: text === '' ? 0 : text.split(/\r?\n/).length,
        uniqueWords: 0,
        averageWordLength: 0,
        longestWord: '',
        readingTimeText: '0 sec',
        readingWpm: 200,
        speakingTimeText: '0 sec',
        speakingWpm: 130,
        dominantScript: 'latin',
        detectedDirection: 'ltr',
        scriptBreakdown: getScriptBreakdown(''),
        keywords: [],
        wordsList: []
      };
    }

    // 1. Words & vocabulary analysis
    const wordData = countWords(text);

    // 2. Characters analysis (with and without spaces, emojis, diacritics, ZWNJ)
    const charCounts = countCharacters(text);

    // 3. Sentences analysis (. ! ? ۔ ؟)
    const sentences = countSentences(text);

    // 4. Paragraphs (blocks separated by one or more blank lines)
    const paragraphs = text
      .split(/\n\s*\n/)
      .filter((p) => p.trim().length > 0).length;

    // 5. Lines (line count based on breaks)
    const lines = text.split(/\r?\n/).length;

    // 6. Dominant script & reading time
    const readingTimeData = calculateReadingTime(wordData.total, wordData.dominantScript);

    // 7. Direction detection
    const detectedDirection = detectDirection(text);

    // 8. Script breakdown
    const scriptBreakdown = getScriptBreakdown(text);

    // 9. Keyword density
    const keywords = getKeywordDensity(wordData.wordsList, {
      ...keywordOptions,
      totalWords: wordData.total
    });

    return {
      words: wordData.total,
      charactersWithSpaces: charCounts.withSpaces,
      charactersWithoutSpaces: charCounts.withoutSpaces,
      sentences,
      paragraphs,
      lines,
      uniqueWords: wordData.unique,
      averageWordLength: wordData.averageLength,
      longestWord: wordData.longestWord,
      readingTimeText: readingTimeData.readingTime.text,
      readingWpm: readingTimeData.readingTime.wpm,
      speakingTimeText: readingTimeData.speakingTime.text,
      speakingWpm: readingTimeData.speakingTime.wpm,
      dominantScript: wordData.dominantScript,
      detectedDirection,
      scriptBreakdown,
      keywords,
      wordsList: wordData.wordsList
    };
  }, [text, keywordOptions]);

  return stats;
}
