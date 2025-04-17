import ffmpeg from "fluent-ffmpeg";
import { createWorker } from "tesseract.js";
import keywordExtractor from "keyword-extractor";
import fs from "fs/promises";
import os from "os";
import path from "path";
import { execPromise } from "../utils/execPromise.js";
import { normalizeKeyword } from "../utils/stringUtils.js";
import { getModuleDescriptionForKeyword } from "../utils/githubUtils.js";

async function waitForFile(filePath, retries = 10, delay = 300) {
  for (let i = 0; i < retries; i++) {
    try {
      await fs.access(filePath);
      return true; // file exists
    } catch (err) {
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error(`File ${filePath} not accessible after ${retries} tries.`);
}

export async function processOcrRequest(req, res) {
  const { videoId, pauseTime } = req.body;
  if (!videoId || typeof pauseTime !== "number") {
    return res
      .status(400)
      .json({ error: "Please provide both videoId and pauseTime." });
  }

  try {
    const tmpDir = os.tmpdir();
    const videoPath = path.join(tmpDir, `${videoId}.mp4`);
    const framesDir = path.join(tmpDir, `${videoId}_frames`);
    await fs.mkdir(framesDir, { recursive: true });

    // Download video using yt-dlp.
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const downloadCmd = `yt-dlp -f best -o "${videoPath}" "${videoUrl}"`;
    console.log(`Downloading video: ${downloadCmd}`);
    await execPromise(downloadCmd);
    console.log(`Downloaded video to ${videoPath}`);

    // Wait for file to actually be ready
    await waitForFile(videoPath);

    // Normalize path for Windows
    const normalizedVideoPath = videoPath.replace(/\\/g, "/");

    // Extract one frame exactly at pauseTime.
    const outputFrame = path.join(framesDir, "paused_frame.jpg");
    console.log(`Extracting frame at ${pauseTime} seconds...`);
    await new Promise((resolve, reject) => {
      ffmpeg(normalizedVideoPath)
        .setStartTime(pauseTime)
        .frames(1)
        .output(outputFrame)
        .on("end", resolve)
        .on("error", reject)
        .run();
    });
    console.log(`Extracted frame to ${outputFrame}`);

    // Run OCR using Tesseract.js.
    const worker = await createWorker("eng");
    const { data } = await worker.recognize(outputFrame);
    await worker.terminate();
    const ocrText = data.text;
    console.log("OCR Text:", ocrText);

    // Clean OCR text.
    const cleanedText = ocrText
      .replace(/[\.,\/#!$%\^&\*;:{}=\-_`~()"]/g, "")
      .replace(/\s{2,}/g, " ");
    console.log("Cleaned OCR Text:", cleanedText);

    // Extract keywords.
    let extractedKeywords = keywordExtractor.extract(cleanedText, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true,
    });
    if (!Array.isArray(extractedKeywords)) {
      extractedKeywords = [];
    }
    console.log("Extracted Keywords (raw):", extractedKeywords);

    // Normalize and deduplicate keywords.
    let keywords = extractedKeywords.map(normalizeKeyword);
    keywords = Array.from(new Set(keywords));
    keywords = keywords.filter((k) => k !== "");
    console.log("Normalized Keywords:", keywords);

    // Enrich keywords.
    const enrichedKeywords = await Promise.all(
      keywords.map(async (keyword) => {
        const moduleDescription = await getModuleDescriptionForKeyword(keyword);
        return {
          name: keyword,
          summary: `Keyword: ${keyword}`,
          description:
            moduleDescription || `No module details available for ${keyword}.`,
        };
      })
    );
    console.log("Enriched Keywords:", enrichedKeywords);

    res.json({ keywords: enrichedKeywords });
  } catch (error) {
    console.error("Error processing OCR and enrichment:", error);
    res.status(500).json({ error: error.message });
  }
}