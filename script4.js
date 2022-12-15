let wordArray = []

fetch('./words.txt')
  .then(response => response.text())
  .then(text => {
    if ((/(\r)/.test(text))) {
      wordArray = text.split("\r\n");
    } else {
      wordArray = text.split("\n");
    }
    const input = changingInputToCorrectFormat(phraseOrWord)
    const array = filteringArrayForWordsThatFitTheAnagram(input)
    const inputIsNotValid = !checksIfTheInputIsValid(input)
    if (inputIsNotValid) {
      console.log(`(${input}) - Expressão invalida, deve conter pelo menos uma frase ou uma palavra e não é permitido caracteres especiais.`)
      return
    }
    let responseArray = []
    verifyWord(array, input, responseArray)
  })

function changingInputToCorrectFormat(phraseOrWord) {
  return phraseOrWord = phraseOrWord.replace(' ', '').toUpperCase()
}

function filteringArrayForWordsThatFitTheAnagram(input) {
  const wordsForTheAnagram = wordArray.filter(element => {
    return !RegExp('[^' + input + ']').test(element)
  });
  return wordsForTheAnagram
}

function checksIfTheInputIsValid(input) {
  const inputWithValidCharacters = !(/\W/g.test(input))
  const inputContainsAtLeastOnePhraseOrWord = input.length != 0
  if (inputWithValidCharacters && inputContainsAtLeastOnePhraseOrWord) {
    return true
  } else {
    return false
  }
}

function cutTheInput(input, word) {
  const arrayInput = [...input]
  for (let index = 0; index < word.length; index++) {
    const char = word[index];
    const indexChar = arrayInput.findIndex(e => {
      return e === char
    })
    const characterNotFound = indexChar == - 1
    if (characterNotFound) {
      return input
    }
    arrayInput.splice(indexChar, 1)
  }
  return arrayInput.join('')
}

function verifyWord(array, input, responseArray) {
  let newArray = [...array];
  let newInput = [...input];
  let newresponseArray = [...responseArray];
  for (let index = 0; index < newArray.length; index++) {
    const word = newArray[index];
    const wordFitInTheNewInput = (cutTheInput(newInput, word)) !== newInput
    if (wordFitInTheNewInput) {
      const arrayHasMoreThanTwoElements = newArray.length > 2
      if (arrayHasMoreThanTwoElements) {
        const arrayWithoutCurrentElementToSearchForOtherCombinations = newArray.slice(index + 1)
        verifyWord(arrayWithoutCurrentElementToSearchForOtherCombinations, newInput, newresponseArray)
      }
      newInput = cutTheInput(newInput, word)
      newresponseArray.push(word)
      const inputIsEmpty = newInput.length == 0
      if (inputIsEmpty) {
        console.log(newresponseArray.join(' '))
      } else {
        newArray = newArray.slice(index + 1)
        verifyWord(newArray, newInput, newresponseArray)
      }
      break
    }
  }
}

let input5 = 'vermelho'
let phraseOrWord = 'oi gente'