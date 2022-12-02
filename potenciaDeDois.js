let numbersArray = []
let arrayTeste = []
fetch('./d12.txt')
  .then(response => response.text())
  .then(text => {
    numbersArray = text.split("\n");
    numbersArray.pop()
    console.log(numbersArray)
    // arrayTeste = [
    //   1,
    //   128,
    //   137,
    //   140,
    //   65535,
    //   65536,
    //   17179869184,
    // ]
    for (let i = 0; i < numbersArray.length; i++) {
      const element = numbersArray[i];
      let numberIsAPotentialOf = false
      let expoent = 0
      while ((2 ** expoent) <= element) {
        numberIsAPotentialOf = (2 ** expoent) == element
        expoent++
      }
      if (numberIsAPotentialOf) {
        console.log(element,numberIsAPotentialOf,expoent-1)
      } else {
        console.log(element,numberIsAPotentialOf)
      }
    }
  })
