/**
 * Detect text direction (LTR or RTL) based on the first strong directional character.
 * Supports Urdu, Arabic, Persian, Hebrew scripts as RTL.
 *
 * @param {string} text
 * @returns {'ltr' | 'rtl'}
 */
export function detectDirection(text) {
  if (!text || typeof text !== 'string') {
    return 'ltr';
  }

  // Strong RTL scripts: Arabic, Urdu, Persian, Hebrew, Syriac, Thaana, etc.
  // Urdu/Arabic blocks: \u0600-\u06FF, \u0750-\u077F, \u08A0-\u08FF, \uFB50-\uFDFF, \uFE70-\uFEFF
  const rtlCharRegex = /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

  // Strong LTR scripts: Latin, Cyrillic, Greek, Armenian, etc.
  const ltrCharRegex = /[A-Za-z\u00C0-\u024F\u0370-\u03FF\u0400-\u04FF\u0500-\u052F\u2C00-\u2C5F]/;

  for (const char of text) {
    if (rtlCharRegex.test(char)) {
      return 'rtl';
    }
    if (ltrCharRegex.test(char)) {
      return 'ltr';
    }
  }

  return 'ltr';
}
