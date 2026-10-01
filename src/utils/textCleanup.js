/**
 * Utilities for cleaning and formatting text without damaging Urdu/RTL text.
 */

/**
 * Replace consecutive horizontal whitespace (spaces, tabs) with a single space.
 * Preserves line breaks.
 *
 * @param {string} text
 * @returns {string}
 */
export function removeExtraSpaces(text) {
  if (!text) return '';
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/[^\S\r\n]+/g, ' ').trim())
    .join('\n');
}

/**
 * Remove lines that contain only whitespace.
 *
 * @param {string} text
 * @returns {string}
 */
export function removeEmptyLines(text) {
  if (!text) return '';
  return text
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0)
    .join('\n');
}

/**
 * Trim leading and trailing whitespace from each line while maintaining line structure.
 *
 * @param {string} text
 * @returns {string}
 */
export function trimLines(text) {
  if (!text) return '';
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .join('\n');
}

/**
 * Convert Latin characters to UPPERCASE. Non-Latin characters (like Urdu) remain intact.
 *
 * @param {string} text
 * @returns {string}
 */
export function toUpperCase(text) {
  if (!text) return '';
  return text.toUpperCase();
}

/**
 * Convert Latin characters to lowercase. Non-Latin characters (like Urdu) remain intact.
 *
 * @param {string} text
 * @returns {string}
 */
export function toLowerCase(text) {
  if (!text) return '';
  return text.toLowerCase();
}

/**
 * Convert Latin words to Title Case (first letter capitalized, rest lowercased),
 * leaving Urdu characters intact.
 *
 * @param {string} text
 * @returns {string}
 */
export function toTitleCase(text) {
  if (!text) return '';
  return text.replace(/\b([a-zA-Z])([a-zA-Z]*)\b/g, (_, first, rest) => {
    return first.toUpperCase() + rest.toLowerCase();
  });
}
