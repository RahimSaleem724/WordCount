import { describe, it, expect } from 'vitest';
import { calculateReadingTime, formatDuration } from '../utils/readingTime.js';

describe('readingTime', () => {
  it('handles 0 words boundary', () => {
    const res = calculateReadingTime(0, 'latin');
    expect(res.readingTime.seconds).toBe(0);
    expect(res.readingTime.text).toBe('0 sec');
    expect(res.speakingTime.seconds).toBe(0);
  });

  it('handles 1 word boundary', () => {
    // 1 word in English (200 wpm) -> 1 second -> "less than a minute"
    const res = calculateReadingTime(1, 'latin');
    expect(res.readingTime.seconds).toBe(1);
    expect(res.readingTime.text).toBe('less than a minute');
  });

  it('handles 200 words boundary for English (200 WPM)', () => {
    // Exactly 1 minute (60 seconds)
    const res = calculateReadingTime(200, 'latin');
    expect(res.readingTime.seconds).toBe(60);
    expect(res.readingTime.text).toBe('1 min 0 sec');
  });

  it('handles 150 words boundary for Urdu (150 WPM)', () => {
    // Exactly 1 minute (60 seconds)
    const res = calculateReadingTime(150, 'urdu');
    expect(res.readingTime.seconds).toBe(60);
    expect(res.readingTime.text).toBe('1 min 0 sec');
  });

  it('handles 1000 words boundary for English', () => {
    // 1000 words / 200 wpm = 5 minutes = 300 seconds
    const res = calculateReadingTime(1000, 'latin');
    expect(res.readingTime.seconds).toBe(300);
    expect(res.readingTime.text).toBe('5 min 0 sec');
  });

  it('handles speaking time (130 WPM)', () => {
    // 130 words -> 60 seconds -> 1 min 0 sec
    const res = calculateReadingTime(130, 'latin');
    expect(res.speakingTime.seconds).toBe(60);
    expect(res.speakingTime.text).toBe('1 min 0 sec');
  });

  it('formats custom seconds properly', () => {
    expect(formatDuration(0)).toBe('0 sec');
    expect(formatDuration(35)).toBe('less than a minute');
    expect(formatDuration(65)).toBe('1 min 5 sec');
    expect(formatDuration(130)).toBe('2 min 10 sec');
  });
});
