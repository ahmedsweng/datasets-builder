export const cleanAlgerianWords = (data) => {
  const cleaned_words = data
    // Step 1: Remove non-Arabic characters
    .replace(/[^\u0600-\u06FF\s]/g, "")
    // Step 2: Normalize spaces
    .replace(/\s+/g, " ")
    // Step 3: Remove words with single repetitive letters
    .replace(/\b([\u0600-\u06FF])\1*\b/g, "")
    // Step 4: Normalize words by removing repeated letters
    .replace(/([\u0600-\u06FF])\1+/g, "$1")
    .trim();

  return cleaned_words;
};
