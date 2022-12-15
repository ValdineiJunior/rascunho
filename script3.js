let wordArray = []

fetch('./words.txt')
  .then(response => response.text())
  .then(text => {
    if ((/(\r)/.test(text))) {
      wordArray = text.split("\r\n");
    } else {
      wordArray = text.split("\n");
    }
    let input = changingInputToCorrectFormat(input5)
    let array = filteringArrayForWordsThatFitTheAnagram(input)
    let inputIsValid = checksIfTheInputIsValid(input)
    if (inputIsValid == false) {
      console.log(`(${input}) - Expressão invalida, deve conter uma frase ou uma palavra, não permitido caracteres especiais.`)
      return
    }
    console.log(input)
    console.log(array)
    let counter = array.length
    for (let index = 0; index < 1; index++) {
      let arrayResposta = []
      verifyWord(array, input, arrayResposta)
      array = array.slice(1)
    }
  })

function changingInputToCorrectFormat(input) {
  return input = input.replace(' ', '').toUpperCase()
}

function filteringArrayForWordsThatFitTheAnagram(formattedInput) {
  let wordsForTheAnagram = wordArray.filter(element => {
    let wordsFitInAnagram = new RegExp('[^' + formattedInput + ']');
    return !wordsFitInAnagram.test(element)
  });
  return wordsForTheAnagram
}

function checksIfTheInputIsValid(formattedInput) {
  let inputWithValidCharacters = !(/\W/g.test(formattedInput))
  let inputContainsAtLeastOnePhraseOrWord = formattedInput.length != 0
  if (inputWithValidCharacters && inputContainsAtLeastOnePhraseOrWord) {
    return true
  } else {
    return false
  }
}

function cutTheInput(input, word) {
  let arrayInput = [...input]
  let ArrayWord = [...word]
  for (let index = 0; index < ArrayWord.length; index++) {
    const element = ArrayWord[index];
    let indexChar = arrayInput.findIndex(e => {
      return e === element
    })
    if (indexChar == -1) {
      return input
    }
    arrayInput.splice(indexChar, 1)
  }
  return arrayInput.join('')
}

function verifyWord(array, input, result) {
  let newArray = [...array];
  let newInput = [...input];
  let newResult = [...result];
  for (let index = 0; index < newArray.length; index++) {
    const element = newArray[index];
    // console.log(newArray)
    // console.log(newInput)
    // console.log((cutTheInput(newInput, element)) != newInput)
    if ((cutTheInput(newInput, element)) !== newInput) {
      if (newArray.length > 2) {
        verifyWord(newArray.slice(index + 1), newInput, newResult)
      }
      newInput = cutTheInput(newInput, element)
      newResult.push(element)
      if (newInput.length == 0) {
        console.log(newResult)
      } else {
        newArray = newArray.slice(index + 1)
        // console.log(newArray)
        verifyWord(newArray, newInput, newResult)

      }

      break
      console.log(newInput)
      console.log(newArray)
      console.log(result)
    }
  }
}

let input5 = 'vermelho'
let input4 = 'oi gente'

// readFile no node