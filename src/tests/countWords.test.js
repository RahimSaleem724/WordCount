import { describe, it, expect } from 'vitest';
import { countWords } from '../utils/countWords.js';

describe('countWords', () => {
  it('handles empty text and whitespace-only text', () => {
    expect(countWords('').total).toBe(0);
    expect(countWords('   ').total).toBe(0);
    expect(countWords('\n\t\r\n').total).toBe(0);
    expect(countWords(null).total).toBe(0);
  });

  it('counts basic words and ignores extra whitespace', () => {
    expect(countWords('hello world').total).toBe(2);
    expect(countWords('  hello   world  ').total).toBe(2);
  });

  it('handles contractions and hyphenated words as single words', () => {
    const res1 = countWords("don't stop");
    expect(res1.total).toBe(2);
    expect(res1.wordsList).toContain("don't");

    const res2 = countWords('well-known');
    expect(res2.total).toBe(1);
    expect(res2.wordsList[0]).toBe('well-known');
  });

  it('counts Urdu sentence accurately', () => {
    // "میں پاکستان سے ہوں۔" -> expected 4 words
    const res = countWords('میں پاکستان سے ہوں۔');
    expect(res.total).toBe(4);
    expect(res.wordsList).toEqual(['میں', 'پاکستان', 'سے', 'ہوں']);
    expect(res.dominantScript).toBe('urdu');
  });

  it('preserves Urdu words with ZWNJ (U+200C)', () => {
    // بے‌شک with ZWNJ \u200C
    const res = countWords('بے\u200Cشک یہ سچ ہے۔');
    expect(res.total).toBe(4);
    expect(res.wordsList[0]).toBe('بے\u200Cشک');
  });

  it('handles URLs and email addresses as single words', () => {
    // Words: Visit (1), URL (2), or (3), email (4), user@test.com (5), now (6)
    const res = countWords('Visit https://example.com/demo or email contact@example.com now');
    expect(res.total).toBe(6);
    expect(res.wordsList).toContain('https://example.com/demo');
    expect(res.wordsList).toContain('contact@example.com');
  });

  it('handles mixed English and Urdu text', () => {
    // Words: یہ (1), English (2), اور (3), Urdu (4), مکس (5), ٹیکسٹ (6), ہے (7)
    const res = countWords('یہ English اور Urdu مکس ٹیکسٹ ہے۔');
    expect(res.total).toBe(7);
  });

  it('computes unique words and average word length correctly', () => {
    const res = countWords('Hello hello world');
    expect(res.total).toBe(3);
    expect(res.unique).toBe(2); // case-insensitive
    expect(res.averageLength).toBeGreaterThan(0);
    expect(res.longestWord).toBe('Hello');
  });
});
