import axios from "axios";
import { load } from "cheerio";
import { appendFile, readFile } from "fs/promises";

(async () => {
  try {
    // Read the links.txt file
    const fileContent = await readFile("links.txt", "utf-8");
    const listsOfStories = fileContent
      .split("\n")
      .filter((link) => link.trim());

    const stories = await getAllStoriesFromList(listsOfStories);
    console.log("Stories: ", stories.length);

    const chapters = await getAllChaptersFromStories(stories);
    console.log("Chapters: ", chapters.length);

    const chapterContent = await getTextContentFromChapters(chapters);
    console.log("Content scraped successfully!");

    // Append the scraped data to wattPadExport.txt
    await appendFile(
      "./data/algerian/wattPadExport.txt",
      chapterContent + "\n\n\n\n",
      "utf-8"
    );
    console.log("Content saved to wattPadExport.txt");
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();

// Fetch all stories from the list
const getAllStoriesFromList = async (lists) => {
  const storyLinks = [];
  for (const listUrl of lists) {
    const html = await fetchHTML(listUrl);
    const $ = load(html);

    // Extract story links
    $(".list-group .list-group-item .clearfix a").each((_, el) => {
      const storyLink = "https://www.wattpad.com" + $(el).attr("href");
      storyLinks.push(storyLink);
    });
  }
  return storyLinks;
};

// Fetch all chapter links from stories
const getAllChaptersFromStories = async (stories) => {
  const chapterLinks = [];
  for (const story of stories) {
    const html = await fetchHTML(story);
    const $ = load(html);

    // Extract chapter links
    $(".table-of-contents .story-parts ul li a").each((_, el) => {
      const chapterLink = "https://www.wattpad.com" + $(el).attr("href");
      chapterLinks.push(chapterLink);
    });
  }
  return chapterLinks;
};

// Fetch text content from chapters
const getTextContentFromChapters = async (chapters) => {
  let text_paragraph = "";
  for (const chapter of chapters) {
    const html = await fetchHTML(chapter);
    const $ = load(html);

    // Extract text content
    $("pre p").each((_, el) => {
      text_paragraph += $(el).text();
    });
  }

  // Replace unwanted characters
  text_paragraph = text_paragraph.replace(/\s+\+/g, "");
  return text_paragraph;
};

// Helper function to fetch HTML content
const fetchHTML = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch URL: ${url}`, error);
    throw error;
  }
};
