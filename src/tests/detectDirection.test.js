import { describe, it, expect } from 'vitest';
import { detectDirection } from '../utils/detectDirection.js';

describe('detectDirection', () => {
  it('defaults to ltr for empty, null, or whitespace text', () => {
    expect(detectDirection('')).toBe('ltr');
    expect(detectDirection('   ')).toBe('ltr');
    expect(detectDirection(null)).toBe('ltr');
  });

  it('detects English text as ltr', () => {
    expect(detectDirection('The quick brown fox jumps over the lazy dog.')).toBe('ltr');
  });

  it('detects Urdu text as rtl', () => {
    expect(detectDirection('اردو ایک خوبصورت زبان ہے۔')).toBe('rtl');
  });

  it('detects direction based on the first strong character for mixed text', () => {
    // Starts with Urdu -> RTL
    expect(detectDirection('یہ English کے ساتھ ہے۔')).toBe('rtl');
    // Starts with English -> LTR
    expect(detectDirection('English کے ساتھ یہ ہے۔')).toBe('ltr');
  });

  it('ignores initial numbers and symbols before strong character', () => {
    expect(detectDirection('123. 456! اردو ٹیکسٹ')).toBe('rtl');
    expect(detectDirection('123. 456! English text')).toBe('ltr');
  });
});
