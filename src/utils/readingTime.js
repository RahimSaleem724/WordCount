/**
 * Calculates estimated reading and speaking times based on word count and script.
 *
 * Rules:
 * - English reading speed: 200 WPM
 * - Urdu reading speed: 150 WPM
 * - Mixed text: uses dominant script
 * - Speaking speed: 130 WPM
 * - Display: "0 sec" for 0 words, "less than a minute" for < 60s, "X min Y sec" for >= 60s.
 *
 * @param {number} wordCount
 * @param {'urdu' | 'latin'} [dominantScript='latin']
 * @returns {{
 *   readingTime: { seconds: number, text: string, wpm: number },
 *   speakingTime: { seconds: number, text: string, wpm: number }
 * }}
 */
export function calculateReadingTime(wordCount, dominantScript = 'latin') {
  if (!wordCount || wordCount <= 0) {
    return {
      readingTime: { seconds: 0, text: '0 sec', wpm: dominantScript === 'urdu' ? 150 : 200 },
      speakingTime: { seconds: 0, text: '0 sec', wpm: 130 }
    };
  }

  const readingWpm = dominantScript === 'urdu' ? 150 : 200;
  const speakingWpm = 130;

  const readingSeconds = Math.ceil((wordCount / readingWpm) * 60);
  const speakingSeconds = Math.ceil((wordCount / speakingWpm) * 60);

  return {
    readingTime: {
      seconds: readingSeconds,
      text: formatDuration(readingSeconds),
      wpm: readingWpm
    },
    speakingTime: {
      seconds: speakingSeconds,
      text: formatDuration(speakingSeconds),
      wpm: speakingWpm
    }
  };
}

/**
 * Format seconds into user-friendly text string:
 * - 0s -> "0 sec"
 * - < 60s -> "less than a minute"
 * - >= 60s -> "X min Y sec"
 *
 * @param {number} totalSeconds
 * @returns {string}
 */
export function formatDuration(totalSeconds) {
  if (totalSeconds <= 0) {
    return '0 sec';
  }
  if (totalSeconds < 60) {
    return 'less than a minute';
  }
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins} min ${secs} sec`;
}
