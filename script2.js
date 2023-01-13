let expressoesNumericas = []
let result = 0
fetch('./d14.txt')
  .then(response => response.text())
  .then(text => {
    expressoesNumericas = text.split("\n");
    expressoesNumericas = expressoesNumericas.slice(0,-1)
    console.log(expressoesNumericas)
    for (let index = 0; index < expressoesNumericas.length; index++) {
      const element = expressoesNumericas[index];
      let expressao = element.split(' ').join('').split(/(\d|\(|\))/)
      expressao.shift()
      expressao.pop()
      expressao.forEach(function(item, i) { if (item == '') expressao[i] = 'c'; });
      verificaSeTemParentes(expressao)

      
    }
  })

function verificaSeTemParentes(expressao) {
  let eDivididoPorZero = RegExp("/0").test(expressao.join(''))
  if (eDivididoPorZero) {
    return console.log('ERR DIVBYZERO')
  }
  let lastIndexCloseParentheses = expressao.findIndex((elemenet)=> elemenet == ')')
  let firstIndexOpenParentheses = expressao.slice(0, lastIndexCloseParentheses).findLastIndex((elemenet)=> elemenet == '(')
  if (firstIndexOpenParentheses != -1 && lastIndexCloseParentheses != -1) {
    let expressaoInterna = expressao.slice(firstIndexOpenParentheses+2, lastIndexCloseParentheses-1)
    result = verificaSeTemParentes(expressaoInterna)
    expressao.splice(firstIndexOpenParentheses,lastIndexCloseParentheses-firstIndexOpenParentheses+1,result.toString())
  }
  resolverExpressao(expressao)
  if (expressao.length > 1) {
    return console.log('ERR SYNTAX')
  }
  console.log(expressao)
  return expressao
}

function resolverExpressao(expressao) {
  expressao = existeOOperadorNaExpressão(expressao,'c')
  expressao = existeOOperadorNaExpressão(expressao,'^')
  expressao = existeOOperadorNaExpressão(expressao,'*')
  expressao = existeOOperadorNaExpressão(expressao,'/')
  expressao = existeOOperadorNaExpressão(expressao,'+')
  expressao = existeOOperadorNaExpressão(expressao,'-')
  return expressao
}

function existeOOperadorNaExpressão(expressao,operador) {
  while (expressao.findIndex((elemenet)=> elemenet == operador) != -1) {
    expressao = calculo(expressao,operador)
  }
  return expressao
}

function calculo(expressao, operador) {
  let indexSum = expressao.findIndex((elemenet)=> elemenet == operador)
  if ( indexSum > 0 && indexSum < (expressao.length - 1) ) {
    switch (operador) {
      case 'c':
        let concatena = expressao[indexSum-1] + expressao[indexSum+1]
         expressao.splice(indexSum-1,3,concatena.toString()) 
        break;
      case '^':
        let eleva = expressao[indexSum-1] ** expressao[indexSum+1]
         expressao.splice(indexSum-1,3,eleva.toString()) 
        break;
      case '*':
        let multiplica = parseInt(expressao[indexSum-1]) * parseInt(expressao[indexSum+1])
         expressao.splice(indexSum-1,3,multiplica.toString()) 
        break;
      case '/':
        let divide = parseInt(expressao[indexSum-1]) / parseInt(expressao[indexSum+1])
         expressao.splice(indexSum-1,3,divide.toString()) 
        break;
      case '+':
        let soma = parseInt(expressao[indexSum-1]) + parseInt(expressao[indexSum+1])
         expressao.splice(indexSum-1,3,soma.toString()) 
        break;
      case '-':
        let subtrai = parseInt(expressao[indexSum-1]) - parseInt(expressao[indexSum+1])
         expressao.splice(indexSum-1,3,subtrai.toString()) 
        break;
    }            
  }
  return expressao
}

console.log('0 = 23')
console.log('1 = 5')
console.log('2 = 1')
console.log('3 = 10')
console.log('4 = ERR DIVBYZERO')
console.log('5 = 5')
console.log('6 = 64')
console.log('7 = 8')
console.log('8 = ERR DIVBYZERO')
console.log('9 = ERR SYNTAX')
console.log('10 = 402')
console.log('11 = ver')
