**Summary of Project**<br>
In this Spell Checker assignment, I utilized Node.js to create a command line program to take in two files and reconcile misspelled words. Specifically, this command line program takes in a dictionary file to be used as the answer key and checks another text file against the dictionary file. During the process of checking each word, this program will write into the console output of the misspelled word along with the line number, column number, context, and suggested words.

**How To Run The Program**
1) git clone 
2) npm install
3) Make sure you have the dictionary.txt
4) Type some words onto file-to-check.txt
5) Type into the console node spellChecker.js dictionary.txt file-to-check.txt

**Assumptions**
1) This program only takes in a .txt file for the dictionary.
2) The format of the file-to-check has to be a .txt file.
3) If the word is a lowercase letter "i", then the suggestion will automatically suggest "I".
4) Capital letter "I" is considered a correctly spelled word.
5) This program utilizes a third party library of "fast-levenshtein", which has the algorithm to perform the comparison between the two files.
6) This program treats single letter words valid if it is not the letter "i" because typos of most single letters do not have a valid dictionary word associated with them.

**Edge Cases**
1) This program does not check for abbreviated words (Mrs.) and contraction words (don't).
2) It does not account for pronouns.
3) It does not account for niche words such as restaurant names, company names, etc.

**Further Enhancements**
1) Can utilize caching to speed up look up time when comparing words from the file-to-check against the dictionary.
2) Can use asynchronous calls to make a call to scan the dictionary before reading the file-to-check.
3) Can refine the algorithm to correctly check for words that are proper nouns (person or place names).