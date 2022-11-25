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
    for (let index = 0; index < counter; index++) {
      let arrayResposta = []
      verifyWord(filteredArray, formattedInput,arrayResposta)
      filteredArray = filteredArray.slice(1)
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
  return arrayInput
}
let arrayTeste = ['ELM','OH','HO','REV']
let arrayRespostaTeste = []
console.log(verifyWord(arrayTeste, "VERMELHO",arrayRespostaTeste))

function verifyWord(filteredArray, formattedInput,arrayResposta) {
  let formattedInputIsEmpty
  let nextword = filteredArray.find(element => findAnagrams(element,formattedInput))
  if (nextword == undefined) {
    return
  }
  let arrayIndex = (filteredArray.findIndex(element => findAnagrams(element,formattedInput)))
  if (checkingIfTheWordFitsTheInput(formattedInput,nextword)) {
    formattedInput = cutTheInput(formattedInput, nextword)
    arrayResposta.push(nextword)
    filteredArray = filteredArray.slice(arrayIndex+1)
    formattedInputIsEmpty = formattedInput.length === 0
    if (formattedInputIsEmpty) {
      console.log(arrayResposta)
    } else {
      verifyWord(filteredArray,formattedInput,arrayResposta)
    }
  } else {
    filteredArray = filteredArray.slice(arrayIndex+1) 
  }
  // console.log(arrayResposta)
}

function findAnagrams(formattedInput,filteredArray) {
  let wordsInAnagram = new RegExp('[' + formattedInput + ']+');
  return wordsInAnagram.test(filteredArray)
}

let input = 'vermelho'
let input4 = 'oi gente'

// readFile no node