let fractions = []
fetch('./frac.txt')
  .then(response => response.text())
  .then(text => {
    fractions = text.split('\n')
    fractions.pop()
    console.log(fractions)
    for (let index = 0; index < fractions.length; index++) {
      const element = fractions[index];
      let hasDivisor = new RegExp(/(\/)\w/)
      if(!hasDivisor.test(element)) {
        console.log(element)
      } else {
        let numeradorAndDenominador = element.split('/')
        let numerador = parseInt(numeradorAndDenominador[0])
        let denominador = parseInt(numeradorAndDenominador[1])
        console.log(numerador,denominador)
        
      }
    }
  })
