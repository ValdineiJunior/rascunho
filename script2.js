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
let arrayRespostaTeste = []
console.log(verifyWord(arrayTeste, "VERMELHO",arrayRespostaTeste))

function verifyWord(filteredArray, formattedInput,arrayResposta) {
  let AAfilteredArray = filteredArray
  let AAformattedInput = formattedInput
  let AAarrayResposta = arrayResposta
  // console.log(AAfilteredArray)
  // console.log(AAformattedInput)
  // console.log(AAarrayResposta)
  // console.log("---------------------------")
  // console.log(AAfilteredArray)
  // console.log(AAformattedInput)
  // console.log(arrayResposta)
  let formattedInputIsEmpty
  let nextword = AAfilteredArray.find(element => findAnagrams(element,AAformattedInput))
  if (nextword == undefined) {
    return
  }
  let arrayIndex = (AAfilteredArray.findIndex(element => findAnagrams(element,AAformattedInput)))
  if (checkingIfTheWordFitsTheInput(AAformattedInput,nextword)) {
    
    let backupFormattedInput = AAformattedInput
    let backuparrayResposta = AAarrayResposta
    AAfilteredArray = AAfilteredArray.slice(arrayIndex+1)
    AAformattedInput = cutTheInput(AAformattedInput, nextword)
    AAarrayResposta.push(nextword)
    formattedInputIsEmpty = AAformattedInput.length === 0
    if (formattedInputIsEmpty) {
      console.log(AAarrayResposta)
      AAarrayResposta.pop()
      verifyWord(AAfilteredArray,backupFormattedInput,AAarrayResposta)
    } else {
      // AAfilteredArray = AAfilteredArray.slice(1)
      verifyWord(AAfilteredArray,AAformattedInput,backuparrayResposta)
    }
    //  else {
    //   // console.log('aqui')
    //   // console.log(arrayResposta)
      
    //   // console.log(backuparrayResposta)
    //   // console.log('aqui')
    //   // console.log(backuparrayResposta)
    //   arrayResposta.pop()
    //   arrayResposta.pop()
    //   verifyWord(filteredArray,backupFormattedInput,backuparrayResposta)
    //   // console.log(arrayResposta)
    // }
    
  }
  // console.log(AAarrayResposta)
}

function findAnagrams(formattedInput,filteredArray) {
  let wordsInAnagram = new RegExp('[' + formattedInput + ']+');
  return wordsInAnagram.test(filteredArray)
}

let input = 'vermelho'
let input4 = 'oi gente'

// readFile no node