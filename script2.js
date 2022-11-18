let array = []

fetch('./words.txt')
  .then(response => response.text())
  .then(text => {
    array = text.split("\r\n");
    let newInput = changeInput(input2)
    let wordsForTheAnagram2 = filterAnagram(newInput)
    isValidInput(newInput)
    for (let index = 0; index < wordsForTheAnagram2.length; index++) {
      verifyWord(wordsForTheAnagram2, newInput)
      wordsForTheAnagram2 = wordsForTheAnagram2.slice(index)
      
    }  
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
  if (entrada && retirada) {
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
  let arrayResposta = []
  let words = wordsForTheAnagram2
  let inputToIterable = newInput

  if (inputToIterable.length == 0) {
    console.log(arrayResposta)
  } else {
    let nextword = words.find(element => findAnagrams(element,inputToIterable))
    if (inputToIterable.length == nextword.length) {
      arrayResposta.push(words.find(element => findAnagrams(element,inputToIterable)))
    } else {
      arrayResposta.push(words.find(element => findAnagrams(element,inputToIterable)))
      let verificando = cutWords(inputToIterable,arrayResposta[arrayResposta.length-1])
      
      if (verificando == undefined) {
        arrayResposta.pop()
        let arrayIndex = (words.findIndex(element => findAnagrams(element,inputToIterable)))
        words = words.slice(arrayIndex+1)
        verifyWord(words,inputToIterable) 
      } else {
          inputToIterable = cutWords(inputToIterable,arrayResposta[arrayResposta.length-1])
          verifyWord(words,inputToIterable)
        }  
       
    }
  }
  // console.log(words)
  // console.log(arrayResposta)
}

function findAnagrams(newInput,wordsForTheAnagram2) {

  if(newInput) {
    let wordsInAnagram = new RegExp('[' + newInput + ']+');
    return wordsInAnagram.test(wordsForTheAnagram2)
  }
}

let input2 = 'vermelho'
let input4 = 'oi gente'

// readFile no node