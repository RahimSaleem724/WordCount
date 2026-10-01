import { describe, it, expect } from 'vitest';
import { countCharacters } from '../utils/countCharacters.js';

describe('countCharacters', () => {
  it('handles empty and null text', () => {
    expect(countCharacters('')).toEqual({ withSpaces: 0, withoutSpaces: 0 });
    expect(countCharacters(null)).toEqual({ withSpaces: 0, withoutSpaces: 0 });
  });

  it('counts English text with and without spaces', () => {
    const res = countCharacters('Hello World');
    expect(res.withSpaces).toBe(11);
    expect(res.withoutSpaces).toBe(10);
  });

  it('counts emojis correctly as single characters', () => {
    // "Hello 😀" has 7 graphemes: H, e, l, l, o, [space], 😀
    const res = countCharacters('Hello 😀');
    expect(res.withSpaces).toBe(7);
    expect(res.withoutSpaces).toBe(6);
  });

  it('does not count ZWNJ (U+200C) as a visible character', () => {
    // "بے‌شک" (ب + ی + ZWNJ + ش + ک) -> 4 visible characters
    const resWithZWNJ = countCharacters('بے\u200Cشک');
    const resWithoutZWNJ = countCharacters('بےشک');
    expect(resWithZWNJ.withSpaces).toBe(resWithoutZWNJ.withSpaces);
    expect(resWithZWNJ.withoutSpaces).toBe(resWithoutZWNJ.withoutSpaces);
    expect(resWithZWNJ.withSpaces).toBe(4);
  });

  it('counts Urdu text with diacritics (harakaat) as single graphemes', () => {
    // بَ (beh + zabar) = 1 grapheme
    const res = countCharacters('\u0628\u064E');
    expect(res.withSpaces).toBe(1);
    expect(res.withoutSpaces).toBe(1);
  });
});
