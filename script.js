let array = []

fetch('./words.txt')
  .then(response => response.text())
  .then(text => {
    array = text.split("\r\n");
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
      console.log(arrayInput)

    } else {
      console.log(`(${input}) - Expressão invalida, deve conter uma frase ou uma palavra`)
    }
}

let input2 = 'vermelho'
let input4 = 'oi gente'

// readFile no node