import { describe, it, expect } from 'vitest';
import { getKeywordDensity } from '../utils/keywordDensity.js';

describe('keywordDensity', () => {
  it('returns empty array for empty words list or 0 total words', () => {
    expect(getKeywordDensity([], { totalWords: 0 })).toEqual([]);
    expect(getKeywordDensity(null)).toEqual([]);
  });

  it('calculates word frequencies and percentage accurately', () => {
    const words = ['apple', 'banana', 'apple', 'apple', 'orange'];
    const result = getKeywordDensity(words, { totalWords: 5, minEnglishLength: 1 });

    expect(result[0]).toEqual({
      word: 'apple',
      count: 3,
      percentage: 60.0
    });
  });

  it('filters English stop words when ignoreStopWords is true', () => {
    const words = ['the', 'quick', 'the', 'brown', 'fox', 'and', 'the', 'lazy', 'dog'];
    const withStopWords = getKeywordDensity(words, { ignoreStopWords: false, totalWords: words.length });
    expect(withStopWords.some((item) => item.word === 'the')).toBe(true);

    const withoutStopWords = getKeywordDensity(words, { ignoreStopWords: true, totalWords: words.length });
    expect(withoutStopWords.some((item) => item.word === 'the')).toBe(false);
    expect(withoutStopWords.some((item) => item.word === 'and')).toBe(false);
  });

  it('filters Urdu stop words when ignoreStopWords is true', () => {
    const words = ['پاکستان', 'کا', 'مطلب', 'کیا', 'پاکستان', 'کی', 'شان'];
    const withoutStopWords = getKeywordDensity(words, {
      ignoreStopWords: true,
      minUrduLength: 2,
      totalWords: words.length
    });

    // 'کا' and 'کی' and 'کیا' are stop words and should be filtered
    expect(withoutStopWords.some((item) => item.word === 'کا')).toBe(false);
    expect(withoutStopWords.some((item) => item.word === 'کی')).toBe(false);
    expect(withoutStopWords[0].word).toBe('پاکستان');
    expect(withoutStopWords[0].count).toBe(2);
  });

  it('respects minimum word length filter for English and Urdu', () => {
    const words = ['hi', 'bye', 'hello', 'نو', 'کتاب'];
    const res = getKeywordDensity(words, {
      ignoreStopWords: false,
      minEnglishLength: 3,
      minUrduLength: 3,
      totalWords: words.length
    });

    // 'hi' (length 2) should be excluded
    expect(res.some((item) => item.word === 'hi')).toBe(false);
    // 'نو' (length 2) should be excluded
    expect(res.some((item) => item.word === 'نو')).toBe(false);
    // 'bye', 'hello', 'کتاب' should be present
    expect(res.some((item) => item.word === 'bye')).toBe(true);
    expect(res.some((item) => item.word === 'کتاب')).toBe(true);
  });
});
