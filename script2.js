let wordArray = []

fetch('./words.txt')
  .then(response => response.text())
  .then(text => {
    wordArray = text.split("\r\n");
    let formattedInput = changingInputToCorrectFormat(input)
    let filteredArray = filteringArrayForWordsThatFitTheAnagram(formattedInput)
    let inputIsValid = checksIfTheInputIsValid(formattedInput)
    if (inputIsValid == false) {
      console.log(`(${formattedInput}) - Expressão invalida, deve conter uma frase ou uma palavra, não permitido caracteres especiais.`)
      return
    }
    // 'LEVER','OHM','REVEL','HOVER','HOLM','VEER','HELM','OVER','ROVE'
    let arrayTeste = ['ELM','OH','HO','REV',]
    let result = []
    console.log(verifyWord(arrayTeste, 'VERMELHO',result))
    let counter = filteredArray.length
    // for (let index = 0; index < counter; index++) {
    //   let arrayResposta = []
    //   verifyWord(filteredArray, formattedInput,arrayResposta)
    //   filteredArray = filteredArray.slice(1)
    // }  
  })

function changingInputToCorrectFormat(input) {
  return input = input.replace(' ','').toUpperCase()
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

function checkingIfTheWordFitsTheInput(input, word) {
  let result = true
  let arrayInput = [...input]
  let ArrayWord = [...word]
  for (let index = 0; index < ArrayWord.length; index++) {
    const element = ArrayWord[index];
    let indexChar = arrayInput.findIndex(e => {
      return e === element
    })
    if(indexChar === -1) {
      result = false
      return result
    }
    arrayInput.splice(indexChar,1)
  }
  return result
}


function cutTheInput(input, word) {
  let arrayInput = [...input]
  let ArrayWord = [...word]
  for (let index = 0; index < ArrayWord.length; index++) {
    const element = ArrayWord[index];
    let indexChar = arrayInput.findIndex(e => {
      return e === element
    })
    arrayInput.splice(indexChar,1)
  }
  return arrayInput.join('')
}


function verifyWord(filteredArray, formattedInput,result) {
  let nextword = filteredArray.shift()
  result = [...result, nextword]
  let newListWords = [...filteredArray];
  let newUserWord = [...formattedInput];
  let formattedInputIsEmpty
  let arrayIndex = (newListWords.findIndex(element => checkingIfTheWordFitsTheInput(newUserWord,element)))
  if (arrayIndex == -1) {
    return result
  }
  newListWords = newListWords.slice(arrayIndex)
  newUserWord = cutTheInput(newUserWord, nextword)
  formattedInputIsEmpty = newUserWord.length === 0
  if (formattedInputIsEmpty) {
    return result
  } else {
    console.log(result)
    let sizeListWords = newListWords.length
    for (let i = 0; i < sizeListWords; i++) {
      let isAnagram = verifyWord(newListWords, newUserWord, result)
      if (isAnagram) {
        isAnagram = isAnagram.join(' ')
        console.log(isAnagram)
      }
    }
  }
}

let input = 'vermelho'
let input4 = 'oi gente'

// readFile no node