import fs from "fs";

function clean_and_split_result() {
  return new Promise((resolve, reject) => {
    fs.readFile("./data/algerian/result/all-words.txt", "utf8", (err, data) => {
      if (err) {
        reject("Oops! err reading the file, please try!");
      }

      // Sort alphabetically using localeCompare for proper Arabic collation
      const sorted_words = data
        .split(",")
        .sort((a, b) => a.localeCompare(b, "ar"));

      const words_per_split = 5000;

      const result_dir_path = "./data/algerian/result/";

      const array_of_words = sorted_words;

      const number_of_splits = Math.floor(
        array_of_words.length / words_per_split
      );
      const rest_of_words = array_of_words.length % words_per_split;

      console.log(number_of_splits, " splits, ", rest_of_words, " rest words.");

      for (let i = 0; i < number_of_splits; i++) {
        const start_index = i * words_per_split;
        const end_index = (i + 1) * words_per_split;

        const split_content = array_of_words.slice(start_index, end_index);

        fs.writeFile(
          result_dir_path + `words-${start_index}-${end_index}.txt`,
          split_content.join(","),
          "utf8",
          (err) => {
            if (err)
              reject(
                `Error writing to the file ${
                  result_dir_path + `words-${start_index}-${end_index}`
                }: ${err}`
              );
            else resolve(split_content);
          }
        );
      }

      const last_split_content = array_of_words.slice(
        words_per_split * number_of_splits,
        words_per_split * number_of_splits + rest_of_words + 1
      );

      if (rest_of_words > 0) {
        fs.writeFile(
          result_dir_path +
            `words-${words_per_split * number_of_splits}-${
              words_per_split * number_of_splits + rest_of_words
            }.txt`,
          last_split_content.join(","),
          "utf8",
          (err) => {
            if (err)
              reject(
                `Error writing to the file ${
                  result_dir_path +
                  `words-${words_per_split * number_of_splits}-${
                    words_per_split * number_of_splits + rest_of_words
                  }`
                }: ${err}`
              );
            else resolve(last_split_content);
          }
        );
      }
    });
  });
}

clean_and_split_result();
