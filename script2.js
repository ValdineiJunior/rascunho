let array = []

fetch('./words.txt')
  .then(response => response.text())
  .then(text => {
    array = text.split("\r\n");
    let newInput = changeInput(input2)
    let wordsForTheAnagram2 = filterAnagram(newInput)
    isValidInput(newInput)
    // console.log(cutWords('VERMELHO','ELM'))
    console.log(findAnagrams(newInput,wordsForTheAnagram2))
    verifyWord(wordsForTheAnagram2, newInput)
  })

function changeInput(input) {
  return input = input.replace(' ','').toUpperCase()
}

function filterAnagram(newInput) {
  let wordsForTheAnagram = array.filter(element => {
    let wordsFitInAnagram = new RegExp('[^' + newInput + ']');
    return !wordsFitInAnagram.test(element)
  });
  return wordsForTheAnagram
}

function isValidInput(newInput) {
    
    let inputWithValidCharacters = !(/\W/g.test(newInput))
    let inputContainsAtLeastOnePhraseOrWord = newInput.length != 0
    if (inputWithValidCharacters && inputContainsAtLeastOnePhraseOrWord) {
      filterAnagram(newInput)

    } else {
      console.log(`(${newInput}) - Expressão invalida, deve conter uma frase ou uma palavra, não permitido caracteres especiais.`)
    }
}


function cutWords(entrada, retirada) {
  if (entrada) {
    let arrayEntrada = [...entrada]
    let arrayRetirada = [...retirada]
    for (let index = 0; index < arrayRetirada.length; index++) {
      const char = arrayRetirada[index];
      let indexChar = arrayEntrada.findIndex(element => {
        return char === element
      })
      if (indexChar !== -1) {
        arrayEntrada.splice(indexChar,1)
      } else {
        return
      }
    }
    return arrayEntrada
  }
}

function verifyWord(wordsForTheAnagram2, newInput) {
  let inputToIterable = newInput
  let arrayResposta = []
  for (let index = 0; index < wordsForTheAnagram2.length; index++) {
    const element = wordsForTheAnagram2[index];
    let verificador = findAnagrams(inputToIterable,wordsForTheAnagram2)
    console.log(verificador)
    if (verificador) {
      arrayResposta.push(element)
      inputToIterable = cutWords(inputToIterable,element)
      if (inputToIterable.length === 0) {
        console.log(arrayResposta)
      }
    } else {

    }
  }
}

function findAnagrams(newInput,wordsForTheAnagram2) {

  if(newInput) {
    let wordsInAnagram = new RegExp('[' + newInput + ']');
    console.log(wordsInAnagram)
    return wordsInAnagram.test(wordsForTheAnagram2)
  }
}

function cutArray(entradas, index) {
  
}

// function findAnagrams(wordsForTheAnagram, newInput) {
//   let arrayInput = [...newInput]
//   let arrayAnagram = []
//   let anagramIndex = wordsForTheAnagram.findIndex(element => {
//     let wordsInAnagram = new RegExp('[' + arrayInput.toString().replaceAll(',','') + ']');
//     return wordsInAnagram.test(element)
//   });
//   if (anagramIndex === -1 ) {
//     return
//   }
//   arrayAnagram.push(wordsForTheAnagram[anagramIndex])
//   let arrayCharIntoAnagram = [...wordsForTheAnagram[anagramIndex]]
//   let retirados = []
//   let arrayRetirados = []
//   for (let index = 0; index < arrayCharIntoAnagram.length; index++) {
//     const elementInAnagram = arrayCharIntoAnagram[index];
//     const indexChar = arrayInput.findIndex(elemento => elemento === elementInAnagram)
//     if (indexChar == -1) {
//       arrayInput.push(arrayRetirados)
//       return
//     } else {
//       retirados = arrayInput.splice(indexChar,1)
//       arrayRetirados.push(retirados[0])
//       console.log(arrayInput)
//     }
//     if (arrayInput.length == 0) {
//       console.log(arrayAnagram)
//     } else {
//       newWordsForTheAnagram = wordsForTheAnagram.slice(anagramIndex+1)
//     }
//   }    

// }

let input2 = 'vermelho'
let input4 = 'oi gente'

// readFile no node