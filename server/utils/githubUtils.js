import { similarity } from './stringUtils.js';
/**
 * Uses the GitHub API to fetch the list of module folders from KGConf/open-kg-curriculum
 */
export async function getModuleDescriptionForKeyword(keyword) {
  try {
    const apiUrl = 'https://api.github.com/repos/KGConf/open-kg-curriculum/contents/curriculum/modules';
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error(`Error fetching module list from GitHub: ${response.status}`);
      return "";
    }
    const modules = await response.json();
    const normKeyword = keyword.toLowerCase().trim();
    let bestMatch = { similarity: 0, item: null };
    for (const item of modules) {
      if (item.type === 'dir') {
        const modNameNormalized = item.name.toLowerCase().replace(/_/g, ' ');
        if (modNameNormalized.includes(normKeyword) || normKeyword.includes(modNameNormalized)) {
          bestMatch = { similarity: 1, item: item };
          break;
        } else {
          const sim = similarity(normKeyword, modNameNormalized);
          if (sim >= 0.8 && sim > bestMatch.similarity) {
            bestMatch = { similarity: sim, item: item };
          }
        }
      }
    }
    if (bestMatch.item) {
      const candidateFile = `${bestMatch.item.name}.md`;
      let fileUrl = `https://raw.githubusercontent.com/KGConf/open-kg-curriculum/master/curriculum/modules/${bestMatch.item.name}/${candidateFile}`;
      let fileResponse = await fetch(fileUrl);
      if (!fileResponse.ok) {
        fileUrl = `https://raw.githubusercontent.com/KGConf/open-kg-curriculum/master/curriculum/modules/${bestMatch.item.name}/README.md`;
        fileResponse = await fetch(fileUrl);
      }
      if (fileResponse.ok) {
        let content = await fileResponse.text();
        // Extract text after the header "## Content"
        const parts = content.split(/##\s*Content\s*#+/i);
        if (parts.length > 1) {
          const subParts = parts[1].split(/\n##\s*/);
          content = subParts[0].trim();
        } else {
          content = content.trim();
        }
        return content;
      }
    }
  } catch (e) {
    console.error("Error while matching module for keyword", keyword, e);
  }
  return "";
}
