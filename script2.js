let expressoesNumericas = []

fetch('./d14.txt')
  .then(response => response.text())
  .then(text => {
    expressoesNumericas = text.split("\n");
    expressoesNumericas = expressoesNumericas.slice(0,-1)
    console.log(expressoesNumericas)
    let expressao = expressoesNumericas[6].split('')
    console.log(expressao)
    let firstIndex = expressao.findIndex((elemenet)=> elemenet == '(')
    let lastIndex = expressao.findLastIndex((elemenet)=> elemenet == ')')
    console.log(firstIndex)
    console.log(lastIndex)
  })
