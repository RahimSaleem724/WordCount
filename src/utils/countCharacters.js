/**
 * Language-aware character counter using Intl.Segmenter (grapheme) with Array.from fallback.
 * Accurately handles:
 * - Complex emojis (including skin tone and composite emojis)
 * - Urdu diacritics / harakaat (zabar, zer, pesh, jazm, tashdeed) as 1 combined character
 * - Excludes Zero-Width Non-Joiner (ZWNJ \u200C) from visible character counts
 *
 * @param {string} text
 * @returns {{ withSpaces: number, withoutSpaces: number }}
 */
export function countCharacters(text) {
  if (!text || typeof text !== 'string') {
    return { withSpaces: 0, withoutSpaces: 0 };
  }

  // Strip non-visible formatting characters like ZWNJ (\u200C) and ZWSP (\u200B)
  const cleaned = text.replace(/[\u200C\u200B\uFEFF]/g, '');

  let graphemes = [];
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    try {
      const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
      for (const seg of segmenter.segment(cleaned)) {
        graphemes.push(seg.segment);
      }
    } catch {
      graphemes = Array.from(cleaned);
    }
  } else {
    // Fallback: Array.from splits astral code points (surrogate pairs) correctly
    graphemes = Array.from(cleaned);
  }

  const withSpaces = graphemes.length;
  // Whitespace filter: spaces, tabs, line breaks
  const withoutSpaces = graphemes.filter((g) => !/^\s+$/.test(g)).length;

  return {
    withSpaces,
    withoutSpaces
  };
}
