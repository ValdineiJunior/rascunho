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
    for (let index = 0; index < filteredArray.length; index++) {
      verifyWord(filteredArray, formattedInput)
      filteredArray = filteredArray.slice(index)
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
  let wordRearrangedWithLettersInAlphabeticalOrder = [...word].sort().join("")
  let inputRearrangedWithLettersInAlphabeticalOrder = [...input].sort().join("")
  let regex = new RegExp('(' + wordRearrangedWithLettersInAlphabeticalOrder + ')');
  return regex.test(inputRearrangedWithLettersInAlphabeticalOrder)
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


function verifyWord(filteredArray, formattedInput) {
  let arrayResposta = []
  let nextword = filteredArray.find(element => findAnagrams(element,formattedInput))
  if (checkingIfTheWordFitsTheInput(formattedInput,nextword)) {
    formattedInput = function cutTheInput(formattedInput, nextword)
    arrayResposta.push(nextword)
    let arrayIndex = (filteredArray.findIndex(element => findAnagrams(element,formattedInput)))
    filteredArray = filteredArray.slice(arrayIndex+1) 
  } else {
    filteredArray = filteredArray.slice(arrayIndex+1) 
  }
  console.log(filteredArray)
  console.log(arrayResposta)
}

function findAnagrams(formattedInput,filteredArray) {

  if(formattedInput) {
    let wordsInAnagram = new RegExp('[' + formattedInput + ']+');
    return wordsInAnagram.test(filteredArray)
  }
}

let input = 'vermelho'
let input4 = 'oi gente'

// readFile no node