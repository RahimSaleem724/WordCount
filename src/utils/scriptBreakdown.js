/**
 * Analyze character script composition in the text.
 * Categories:
 * - Urdu / Arabic script
 * - Latin (English) script
 * - Digits (English 0-9 and Eastern Arabic/Urdu ۰-۹)
 * - Other (symbols, punctuation, emojis)
 *
 * @param {string} text
 * @returns {{
 *   urdu: { count: number, percentage: number },
 *   latin: { count: number, percentage: number },
 *   digits: { count: number, percentage: number },
 *   other: { count: number, percentage: number },
 *   total: number
 * }}
 */
export function getScriptBreakdown(text) {
  if (!text || typeof text !== 'string') {
    return {
      urdu: { count: 0, percentage: 0 },
      latin: { count: 0, percentage: 0 },
      digits: { count: 0, percentage: 0 },
      other: { count: 0, percentage: 0 },
      total: 0
    };
  }

  // Strip spaces and ZWNJ/ZWSP for script character breakdown
  const cleanChars = Array.from(text.replace(/[\s\u200C\u200B\uFEFF]/g, ''));
  const total = cleanChars.length;

  if (total === 0) {
    return {
      urdu: { count: 0, percentage: 0 },
      latin: { count: 0, percentage: 0 },
      digits: { count: 0, percentage: 0 },
      other: { count: 0, percentage: 0 },
      total: 0
    };
  }

  let urduCount = 0;
  let latinCount = 0;
  let digitCount = 0;
  let otherCount = 0;

  // Urdu/Arabic digits: \u0660-\u0669 and \u06F0-\u06F9
  const digitRegex = /[0-9\u0660-\u0669\u06F0-\u06F9]/;
  // Urdu/Arabic alphabet characters (excluding digits)
  const urduCharRegex = /[\u0600-\u065F\u0670-\u06EF\u06FA-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  // Latin alphabet characters
  const latinRegex = /[A-Za-z\u00C0-\u024F]/;

  for (const char of cleanChars) {
    if (digitRegex.test(char)) {
      digitCount++;
    } else if (urduCharRegex.test(char)) {
      urduCount++;
    } else if (latinRegex.test(char)) {
      latinCount++;
    } else {
      otherCount++;
    }
  }

  const calcPct = (cnt) => parseFloat(((cnt / total) * 100).toFixed(1));

  return {
    urdu: {
      count: urduCount,
      percentage: calcPct(urduCount)
    },
    latin: {
      count: latinCount,
      percentage: calcPct(latinCount)
    },
    digits: {
      count: digitCount,
      percentage: calcPct(digitCount)
    },
    other: {
      count: otherCount,
      percentage: calcPct(otherCount)
    },
    total
  };
}
