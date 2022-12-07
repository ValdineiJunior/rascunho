let numericalExpressions = []
fetch('./d14.txt')
  .then(response => response.text())
  .then(text => {
    numericalExpressions = text.split('\n')
    numericalExpressions.pop()
    console.log(numericalExpressions)
    for (let i = 0; i < numericalExpressions.length; i++) {
      const element = numericalExpressions[i].replaceAll(' ','');
      let expression = [...element]
      for (let j = 0; j < expression.length; j++) {
        const element = expression[j] ;
        let numbers = parseInt(element)
        let isANumber = isNaN(numbers)
        if (!isANumber) {
          expression.splice(j,1,numbers)
        }
      }
      let result = expression.values()
      console.log(expression)
    }
  })
