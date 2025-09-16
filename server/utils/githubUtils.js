import fs from "fs/promises";
import path from "path";
import { similarity } from "./stringUtils.js";

const CACHE_FILE = path.join(process.cwd(), "modules_cache.json");
const MODULES_API = "https://api.github.com/repos/KGConf/open-kg-curriculum/contents/curriculum/modules";

/**
 * Load modules list from cache or GitHub if cache doesn't exist
 */
async function loadModules() {
  try {
    // Try to read from cache
    const data = await fs.readFile(CACHE_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    // Cache not found or invalid, fetch from GitHub
    const response = await fetch(MODULES_API);
    if (!response.ok) {
      console.error(`Error fetching module list from GitHub: ${response.status}`);
      return [];
    }
    const modules = await response.json();

    // Write to cache
    await fs.writeFile(CACHE_FILE, JSON.stringify(modules, null, 2), "utf-8");

    return modules;
  }
}

/**
 * Find the best matching module and return its description text
 */
export async function getModuleDescriptionForKeyword(keyword) {
  try {
    const modules = await loadModules();
    const normKeyword = keyword.toLowerCase().trim();
    let bestMatch = { similarity: 0, item: null };

    for (const item of modules) {
      if (item.type === "dir") {
        const modNameNormalized = item.name.toLowerCase().replace(/_/g, " ");
        if (modNameNormalized.includes(normKeyword) || normKeyword.includes(modNameNormalized)) {
          bestMatch = { similarity: 1, item };
          break;
        } else {
          const sim = similarity(normKeyword, modNameNormalized);
          if (sim >= 0.8 && sim > bestMatch.similarity) {
            bestMatch = { similarity: sim, item };
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

export async function getReferenceLinks(keyword) {
  return [
    `https://en.wikipedia.org/wiki/${encodeURIComponent(keyword)}`,
    `https://www.youtube.com/results?search_query=${encodeURIComponent(keyword)}`
  ];
}
