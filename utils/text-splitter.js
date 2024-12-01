import fs from "fs";
import path from "path";

// Function to process and clean a file
const processFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(`Error reading the file ${filePath}: ${err}`);
        return;
      }

      // Step 1: Clean the text
      const cleanedText = data
        .replace(/["[\]:+.,!?؛،]/g, " ") // Remove special characters
        .replace(/[^\u0600-\u06FF\s]/g, "") // Keep Arabic, Latin, and whitespace
        .replace(/([\u0600-\u06FF])\1+/g, "$1") // Keep only Arabic
        .replace(/\s+/g, " ") // Normalize spaces
        .trim();

      // Step 2: Split into words and remove duplicates
      const words = cleanedText.split(/\s+/);
      const uniqueWords = [...new Set(words)];

      // Step 3: Write the processed text back to the same file
      fs.writeFile(filePath, uniqueWords.join(","), "utf8", (writeErr) => {
        if (writeErr) {
          reject(`Error writing to the file ${filePath}: ${writeErr}`);
        } else {
          console.log(`Processed and updated: ${filePath}`);
          resolve(uniqueWords); // Return unique words for aggregation
        }
      });
    });
  });
};

// Function to process all .txt files in the directory
export const processAllFiles = async (dialectDirPath) => {
  try {
    // Read all files in the directory
    const files = fs.readdirSync(dialectDirPath);

    // Filter for .txt files excluding result.txt
    const txtFiles = files.filter(
      (file) => file.endsWith(".txt") && file !== "result.txt"
    );

    if (txtFiles.length === 0) {
      console.log("No .txt files to process.");
      return;
    }

    let allUniqueWords = new Set();

    // Process each file
    for (const file of txtFiles) {
      const filePath = path.join(dialectDirPath, file);
      const uniqueWords = await processFile(filePath);
      uniqueWords.forEach((word) => allUniqueWords.add(word));
    }

    // Write the combined unique words to result.txt
    const allUniqueWordsArray = Array.from(allUniqueWords);
    const resultText = allUniqueWordsArray.join(",");
    const wordCount = allUniqueWordsArray.length;

    const finalResult = `${resultText}\n\nWord Count: ${wordCount}`;
    fs.writeFile(
      path.join(dialectDirPath, "result/all-words.txt"),
      finalResult,
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing to all-words.txt:", err);
        } else {
          console.log(
            `All unique words written to ${path.join(
              dialectDirPath,
              "result/all-words.txt"
            )}. Total words: ${wordCount}`
          );
        }
      }
    );
  } catch (err) {
    console.error("Error processing files:", err);
  }
};
