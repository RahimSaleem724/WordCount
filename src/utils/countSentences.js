/**
 * Language-aware sentence counter supporting English and Urdu sentence boundaries.
 * Delimiters: '.', '!', '?', '۔' (Urdu full stop), '؟' (Urdu question mark).
 * Handles multiple consecutive punctuation characters like '?!', '...', '۔!'.
 *
 * @param {string} text
 * @returns {number}
 */
export function countSentences(text) {
  if (!text || typeof text !== 'string' || !text.trim()) {
    return 0;
  }

  // Split on one or more punctuation marks: English and Urdu sentence terminators
  // Regex includes dot, exclamation, question mark, Urdu khatam (۔ \u06D4), and Urdu question mark (؟ \u061F)
  const sentenceDelimiters = /[.!?۔؟\u06D4\u061F]+/;

  const rawSentences = text
    .split(sentenceDelimiters)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return rawSentences.length;
}
