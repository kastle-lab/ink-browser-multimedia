/**
 * levenshteinDistance
 * -------------------
 * Computes the Levenshtein distance between two strings.
 *
 * Definition:
 * - The Levenshtein distance is the minimum number of single-character edits
 *   (insertions, deletions, or substitutions) required to change one string into another.
 *
 * Example:
 * levenshteinDistance("kitten", "sitting") = 3
 * (substitute 'k'->'s', substitute 'e'->'i', add 'g')
 */
export function levenshteinDistance(s, t) {
  const m = s.length, n = t.length;

  // If one string is empty, distance = length of the other string
  if (m === 0) return n;
  if (n === 0) return m;

  // Create a DP (dynamic programming) matrix of size (m+1) x (n+1)
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  // Base cases: distance from empty string
  for (let i = 0; i <= m; i++) dp[i][0] = i; // cost of deleting chars
  for (let j = 0; j <= n; j++) dp[0][j] = j; // cost of inserting chars

  // Fill DP table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // If characters match, cost = 0; otherwise cost = 1 (substitution)
      const cost = s[i - 1] === t[j - 1] ? 0 : 1;

      // Minimum of:
      // - Deletion (dp[i-1][j] + 1)
      // - Insertion (dp[i][j-1] + 1)
      // - Substitution (dp[i-1][j-1] + cost)
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  // Final answer is in bottom-right cell
  return dp[m][n];
}

/**
 * similarity
 * ----------
 * Computes similarity between two strings using Levenshtein distance.
 *
 * Formula:
 * similarity = (maxLength - distance) / maxLength
 *
 * Meaning:
 * - 1 means identical strings.
 * - 0 means completely different strings.
 */
export function similarity(s, t) {
  const distance = levenshteinDistance(s, t);
  const maxLen = Math.max(s.length, t.length);
  return maxLen === 0 ? 1 : (maxLen - distance) / maxLen;
}

/**
 * correctOcrErrors
 * ----------------
 * Fixes common OCR misrecognitions by replacing incorrect words
 * with their corrected forms.
 *
 * Example corrections:
 * - "nvowtense" → "knowledge"
 * - "gaph" → "graph"
 *
 * NOTE: This is a simple placeholder and can be expanded with
 * more sophisticated corrections in the future.
 */
export function correctOcrErrors(keyword) {
  let corrected = keyword;
  const corrections = {
    'nvowtense': 'knowledge',
    'nowtense': 'knowledge',
    'gaph': 'graph'
  };

  // Replace any occurrence of wrong word with the correct one
  for (const [wrong, right] of Object.entries(corrections)) {
    const regex = new RegExp(wrong, 'gi'); // 'gi' = global + case-insensitive
    corrected = corrected.replace(regex, right);
  }
  return corrected;
}

/**
 * normalizeKeyword
 * ----------------
 * Standardizes a keyword string for further processing.
 * Steps:
 * 1. Convert to lowercase and trim spaces.
 * 2. Remove common prefixes like "called " or "process ".
 * 3. Apply OCR error corrections.
 * 4. Filter out too-short or invalid keywords.
 *
 * Returns:
 * - A cleaned-up keyword string.
 * - Empty string ("") if keyword is invalid.
 */
export function normalizeKeyword(keyword) {
  let k = keyword.toLowerCase().trim();

  // Remove unwanted prefixes
  k = k.replace(/^called\s+/, '').replace(/^process\s+/, '');

  // Correct known OCR misreads
  k = correctOcrErrors(k);

  // Only keep if length ≥ 2 and contains at least one letter
  return k.length < 2 || !/[a-z]/.test(k) ? "" : k;
}
