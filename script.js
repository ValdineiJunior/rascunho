let array = []

fetch('./words.txt')
  .then(response => response.text())
  .then(text => {
    array = text.split("\n");
    anagrams(input2)
    anagrams(input4)
  })
function anagrams(input) {
    input = input.replace(' ','').toUpperCase()
    let inputWithValidCharacters = (/\w|\s/g.test(input))
    let inputContainsAtLeastOnePhraseOrWord = input.length != 0
    if (inputWithValidCharacters && inputContainsAtLeastOnePhraseOrWord) {
      let wordsForTheAnagram = array.filter(element => {
        let wordsFitInAnagram = new RegExp('[^' + input + ']');
        return !wordsFitInAnagram.test(element)
      });
      console.log(wordsForTheAnagram)
      let arrayInput = [...input]
      console.log(arrayInput.toString().replaceAll(',',''))
      let arrayAnagram = []
      let indexFirstWord = 0
      let indexToCut = []
      function findAnagrams( ) {
        let anagram = wordsForTheAnagram.find(element => {
          let wordsInAnagram = new RegExp('[' + arrayInput.toString().replaceAll(',','') + ']');
          return wordsInAnagram.test(element)
        });
        indexFirstWord = wordsForTheAnagram.findIndex(element => element === anagram )
        indexToCut.push(indexFirstWord)
        arrayAnagram.push(anagram)
        
        let arrayCharIntoAnagram = [...anagram]
        for (let index = 0; index < arrayCharIntoAnagram.length; index++) {
          const elementInAnagram = arrayCharIntoAnagram[index];
          const indexChar = arrayInput.findIndex(element => element === elementInAnagram)
          if (indexChar == -1) {
            return
          } else {
            arrayInput.splice(indexChar,1)
            console.log(indexFirstWord)
            console.log(arrayAnagram)
          }
        }
        if (arrayInput.length > 0) {
          findAnagrams()
        }

      }

      findAnagrams()
      while (wordsForTheAnagram.length > 0) {
        wordsForTheAnagram = wordsForTheAnagram.slice(indexToCut[0]+1)
        console.log(wordsForTheAnagram)
        findAnagrams()
        
      }


    } else {
      console.log(`(${input}) - Expressão invalida, deve conter uma frase ou uma palavra`)
    }
}

let input2 = 'volvo'
let input4 = 'oi gente'

// readFile no node