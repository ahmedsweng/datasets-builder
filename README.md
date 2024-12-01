# JS Text Processing Utilities

A collection of JavaScript utilities for processing Arabic text (focusing on Algerian dialect) and web scraping capabilities for Wattpad stories.

## Features

- Text cleaning and normalization for Arabic text
- Web scraping functionality for Wattpad stories
- Text splitting and processing capabilities
- Unique word extraction and counting
- File processing utilities

## Prerequisites

- Node.js >= 18.17 (required by dependencies)
- npm or yarn package manager

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd js-utilities
```

2. Install dependencies:

```bash
npm install
```

## Project Structure

```bash
├── utils/
│ ├── text-splitter.js # Text processing and file handling
│ ├── clean-text.js # Arabic text cleaning utilities
│ ├── clean-results.js # Results processing
│ └── wattPadScrapper.js # Wattpad scraping functionality
├── data/
│ └── algerian/ # Directory for Algerian dialect data
│ └── result/ # Processed results directory
```

## Usage

### Text Processing

The project provides various text processing utilities:

1. **Clean Arabic Text**:

```javascript
import { cleanAlgerianWords } from "./utils/clean-text";
const cleanedText = cleanAlgerianWords(yourText);
```

2. **Process Text Files**:

```javascript
import { processAllFiles } from "./utils/text-splitter";
await processAllFiles("./data/algerian/");
```

### Web Scraping

To scrape Wattpad stories:

1. Create a `links.txt` file with Wattpad list URLs (one per line)
2. Run the scraper:

```javascript
node utils/wattPadScrapper.js
```

## Features in Detail

### Text Cleaning

- Removes non-Arabic characters
- Normalizes spaces
- Removes repetitive letters
- Filters out single-letter words

### File Processing

- Processes multiple text files
- Extracts unique words
- Generates word counts
- Creates split files for large datasets

### Web Scraping

- Scrapes Wattpad stories from lists
- Extracts chapter content
- Saves content to text files
- Handles multiple stories and chapters

## Dependencies

- axios: Web requests
- cheerio: HTML parsing
- fs/promises: File system operations

## License

ISC

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
