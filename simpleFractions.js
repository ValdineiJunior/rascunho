let fractions = []
fetch('./frac.txt')
  .then(response => response.text())
  .then(text => {
    fractions = text.split('\r\n')
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
        if(!denominador) {
          console.log("ERR")
        } else {
          const resultado = numerador/denominador
          if (Number.isInteger(resultado)) {
            console.log(resultado.toString())
          } else {
            if (denominador>numerador) {
              let resultado = denominador/numerador
              if (Number.isInteger(resultado)) {
                if (numerador > 1) {
                  numerador = numerador / resultado
                  denominador = denominador / resultado
                  console.log(`${numerador}/${denominador}`)
                } else {
                  console.log(`${numerador}/${denominador}`)
                }
              } else {
                // console.log(`${numerador}/${denominador}`)
                for (let index = numerador; index > 0; index--) {
                  let checkNumerador = Number.isInteger(numerador/index)
                  let checkDenominador = Number.isInteger(denominador/index)
                  if (checkNumerador && checkDenominador) {
                    numerador = numerador/index
                    denominador = denominador/index
                    console.log(`${numerador}/${denominador}`)
                    break
                  } else {
                    
                  }

                }
              }
            } else {
              let resto = numerador%denominador
              let semDivisor = numerador - resto
              let firstNumber = semDivisor/denominador
              console.log(`${firstNumber} ${resto}/${denominador}`)
               

            }
            
          }
        }
      }
    }
  })
