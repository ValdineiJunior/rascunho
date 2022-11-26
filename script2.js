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
let arrayTeste = ['ELM','OH','HO','REV','REV','LEVER','OHM','REVEL','HOVER','HOLM','VEER','HELM','OVER','ROVE']
let result = []
console.log(verifyWord(arrayTeste, "VERMELHO"))

function verifyWord(filteredArray, formattedInput) {
  let formattedInputIsEmpty
  let nextword = filteredArray.find(element => checkingIfTheWordFitsTheInput(formattedInput,element))
  let arrayIndex = (filteredArray.findIndex(element => checkingIfTheWordFitsTheInput(formattedInput,element)))
  if (nextword == undefined) {
    return false
  }
  
  result.push(nextword)
  filteredArray = filteredArray.slice(arrayIndex+1)
  formattedInput = cutTheInput(formattedInput, nextword)
  formattedInputIsEmpty = formattedInput.length === 0
  console.log(formattedInput)
  if (formattedInputIsEmpty) {
    console.log(result)
    formattedInput = nextword
    result.pop()
    verifyWord(filteredArray,formattedInput)
  }
  // if (result.length > 1 && filteredArray.length > 1) {
  //   let newFilteredArray = filteredArray.slice(arrayIndex+1)
  //   console.log(result)
  //   verifyWord(newFilteredArray,formattedInput)
  // }
  verifyWord(filteredArray,formattedInput)
}

let input = 'vermelho'
let input4 = 'oi gente'

// readFile no node