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
    console.log(formattedInput)
    console.log(filteredArray)
    console.log(checkingIfTheWordFitsTheInput(formattedInput, "EHLE"))
    // for (let index = 0; index < filteredArray.length; index++) {
    //   verifyWord(filteredArray, formattedInput)
    //   filteredArray = filteredArray.slice(index)
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
  let wordRearrangedWithLettersInAlphabeticalOrder = [...word].sort().join("")
  let inputRearrangedWithLettersInAlphabeticalOrder = [...input].sort().join("")
  let regex = new RegExp('(' + wordRearrangedWithLettersInAlphabeticalOrder + ')');
  return regex.test(inputRearrangedWithLettersInAlphabeticalOrder)
}

function checkingIfTheWordFitsTheInput(inputToBeCut, lettersToBeRemoved) {
 // if (arrayToBeCut.every)
  // for (let index = 0; index < arrayToBeRemoved.length; index++) {
  //   const element = arrayToBeRemoved[index];
  //   let indexChar = arrayToBeCut.findIndex(e => {
  //     return e === element
  //   })
  //   if (indexChar !== -1) {
  //      arrayToBeCut.splice(indexChar,1)
  //   } else {
  //      return
  //   }
  // }
  // return arrayToBeCut
}


// function verifyWord(filteredArray, formattedInput) {
//   let arrayResposta = []
//   let words = filteredArray
//   let inputToIterable = formattedInput

//   if (inputToIterable.length == 0) {
//     console.log(arrayResposta)
//   } else {
//     let nextword = words.find(element => findAnagrams(element,inputToIterable))
//     if (inputToIterable.length == nextword.length) {
//       arrayResposta.push(words.find(element => findAnagrams(element,inputToIterable)))
//     } else {
//       arrayResposta.push(words.find(element => findAnagrams(element,inputToIterable)))
//       let verificando = cutWords(inputToIterable,arrayResposta[arrayResposta.length-1])
      
//       if (verificando == undefined) {
//         arrayResposta.pop()
//         let arrayIndex = (words.findIndex(element => findAnagrams(element,inputToIterable)))
//         words = words.slice(arrayIndex+1)
//         verifyWord(words,inputToIterable) 
//       } else {
//           inputToIterable = cutWords(inputToIterable,arrayResposta[arrayResposta.length-1])
//           verifyWord(words,inputToIterable)
//         }  
       
//     }
//   }
//   // console.log(words)
//   // console.log(arrayResposta)
// }

function findAnagrams(formattedInput,filteredArray) {

  if(formattedInput) {
    let wordsInAnagram = new RegExp('[' + formattedInput + ']+');
    return wordsInAnagram.test(filteredArray)
  }
}

let input = 'vermelho'
let input4 = 'oi gente'

// readFile no node