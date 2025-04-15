/**
 * Compute Levenshtein distance between two strings.
 */
export function levenshteinDistance(s, t) {
    const m = s.length, n = t.length;
    if (m === 0) return n;
    if (n === 0) return m;
    
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = s[i - 1] === t[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }
    return dp[m][n];
  }
  
/**
 * Compute similarity between two strings.
 * similarity = (maxLength - distance) / maxLength.
 */
  export function similarity(s, t) {
    const distance = levenshteinDistance(s, t);
    const maxLen = Math.max(s.length, t.length);
    return maxLen === 0 ? 1 : (maxLen - distance) / maxLen;
  }
  
  /**
 * Correct common OCR misrecognitions.
 * TODO: Work in Progess: Replace this with refined function for correcting ocr common errors!
 */
  export function correctOcrErrors(keyword) {
    let corrected = keyword;
    const corrections = {
      'nvowtense': 'knowledge',
      'nowtense': 'knowledge',
      'gaph': 'graph'
    };
    for (const [wrong, right] of Object.entries(corrections)) {
      const regex = new RegExp(wrong, 'gi');
      corrected = corrected.replace(regex, right);
    }
    return corrected;
  }
  
  export function normalizeKeyword(keyword) {
    let k = keyword.toLowerCase().trim();
    k = k.replace(/^called\s+/, '').replace(/^process\s+/, '');
    k = correctOcrErrors(k);
    return k.length < 2 || !/[a-z]/.test(k) ? "" : k;
  }
  