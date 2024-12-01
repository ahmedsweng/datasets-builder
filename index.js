import { processAllFiles } from "./utils/text-splitter.js";

// Directory containing the algerian dialect files
const directoryPath = "./data/algerian/";

processAllFiles(directoryPath);
