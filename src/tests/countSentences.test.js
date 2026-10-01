import { describe, it, expect } from 'vitest';
import { countSentences } from '../utils/countSentences.js';

describe('countSentences', () => {
  it('returns 0 for empty or whitespace-only text', () => {
    expect(countSentences('')).toBe(0);
    expect(countSentences('   \n\t  ')).toBe(0);
  });

  it('counts English sentences with standard punctuation', () => {
    expect(countSentences('Hello world. How are you? I am fine!')).toBe(3);
  });

  it('handles multiple consecutive punctuation marks like Really?!', () => {
    expect(countSentences('Really?! Yes! Amazing...')).toBe(3);
  });

  it('counts Urdu sentences with Urdu full stop (۔) and Urdu question mark (؟)', () => {
    // "یہ ایک اچھی کتاب ہے۔ کیا آپ نے پڑھی؟" -> 2 sentences
    const text = 'یہ ایک اچھی کتاب ہے۔ کیا آپ نے پڑھی؟';
    expect(countSentences(text)).toBe(2);
  });

  it('counts a single sentence without terminal punctuation', () => {
    expect(countSentences('Just one sentence without dot')).toBe(1);
  });

  it('counts mixed Urdu and English sentences', () => {
    const text = 'This is English. یہ اردو جملہ ہے۔ Does it work? بالکل!';
    expect(countSentences(text)).toBe(4);
  });
});
