const fs = require('fs');
const levenshtein = require('fast-levenshtein');


// 1) Load dictionary
const loadDictionary = (path) => {
  // Read the contents of a file and split the string into an array of strings at every newline.
  // Then utilize a Set to remove duplicates and perform efficient existence checks.
  return new Set(fs.readFileSync(path, 'utf-8').split('\n'));
};


// 2) Load text file and return as array of words with line, column, and context information.
const loadTextFile = (path) => {
  const lines = fs.readFileSync(path, 'utf-8').split('\n');
  let words = [];
  lines.forEach((line, lineIndex) => {
    // Split the line of text into words by any sequence of spaces, tabs, or new line characters and store them into an array.
    line.split(/\s+/).forEach((word, wordIndex) => {
      // Ignore empty strings.
      if (word) { 
        //Add each word onto the "words" array along with their line, column, and context information.
        words.push({
          word: word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""), // Remove punctuation.
          line: lineIndex + 1,
          column: wordIndex + 1,
          context: line
        });
      }
    });
  });
  return words;
};


// 3) Find suggestions for a misspelled word
const findSuggestions = (word, dictionary) => {
  if (word === 'i') {
    return ['I']; // Directly suggest the capitalized "I"
  }

  let suggestions = [];
  dictionary.forEach(dictWord => {
    // Iterate over each word in the dictionary and calculate the Levenshtein distance between the lowercased version of the misspelled word and each dictionary word.
    const distance = levenshtein.get(word.toLowerCase(), dictWord.toLowerCase());
    //If the distance is 2 or less (indicating a close match), then the dictionary word is added to the suggestions.
    if (distance <= 2) { // You can adjust this threshold.
      suggestions.push(dictWord);
    }
  });
  return suggestions;
};


// 4) Main function to check spelling
const checkSpelling = (dictionaryPath, textPath) => {
  const dictionary = loadDictionary(dictionaryPath);
  const words = loadTextFile(textPath);
  words.forEach(({word, line, column, context}) => {
    // Skip single-letter words except "i" and capitalized letter "I"
    if ((word.length === 1 && word.toLowerCase() !== 'i') || word === 'I') {
      return; // Skip checking.
    }

    const isLowerCaseI = word === 'i';
    const isWordInDictionary = dictionary.has(word.toLowerCase());
    if (!isWordInDictionary || isLowerCaseI) {
      const suggestions = findSuggestions(word, dictionary);
      // For lowercase 'i', ensure the suggestion 'I' is added if not already included.
      if (isLowerCaseI && !suggestions.includes('I')) {
        suggestions.unshift('I');
      }
      console.log(`Misspelled word "${word}" at line ${line}, column ${column}. Context: "${context}".`);
      console.log(`Suggestions: ${suggestions.join(', ')}\n`);
    }
  });
};


// 5) Get command line arguments
const [dictionaryPath, textPath] = process.argv.slice(2);
if (!dictionaryPath || !textPath) {
  console.error('Usage: node spellChecker.js <dictionaryPath> <textPath>');
  process.exit(1);
}


// 6) Call the main function with the command line arguments
checkSpelling(dictionaryPath, textPath);
