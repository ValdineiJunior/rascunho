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
    let arrayTeste = ['ELM','OH','HO','REV','LEVER','OHM','REVEL','HOVER','HOLM','VEER','HELM','OVER','ROVE']
    let outroFormattedinput = [...filteredArray]
    let counter = filteredArray.length
    console.log(counter)
    for (let index = 0; index < counter; index++) {
      let result = []
      verifyWord(outroFormattedinput,formattedInput,result)
      outroFormattedinput = filteredArray.slice(index)
      // console.log(outroFormattedinput)
    }
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


function cutTheInput(input, word) {
  let arrayInput = [...input]
  let ArrayWord = [...word]
  for (let index = 0; index < ArrayWord.length; index++) {
    const element = ArrayWord[index];
    let indexChar = arrayInput.findIndex(e => {
      return e === element
    })
    if(indexChar === -1){
      return 0
    } else {
      arrayInput.splice(indexChar,1)
    }
  }
  return arrayInput.join('')
}


function verifyWord(filteredArray, formattedInput,result) {
  let nextword = filteredArray.shift()
  result = [...result, nextword]
  let newListWords = [...filteredArray];
  let newUserWord = [...formattedInput];
  let formattedInputIsEmpty
  let arrayIndex = []
  formattedInputIsEmpty = newUserWord.length === 0
  newUserWord = cutTheInput(newUserWord, nextword)
  if (newUserWord.length > 0) {
    arrayIndex = (filteredArray.findIndex(element => {
      if (cutTheInput(newUserWord,element)) {
        cutTheInput(newUserWord,element)
      }
    }))
  }
  if (arrayIndex === -1) {
    if (!(cutTheInput(formattedInput,nextword))) {
      return
    }
    newListWords = []
    // console.log(nextword)
    // console.log(formattedInput)
  } else {

  }
  newListWords = newListWords.slice(arrayIndex)
  console.log(result)
  if (!formattedInputIsEmpty) {
    return result
  } else {
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