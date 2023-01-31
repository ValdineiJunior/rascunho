// const readlineSync = require("readline-sync");
// const chessNotation = readlineSync.question("Digite uma casa em notacao algebrica de xadrez que sera a posicao inicial do cavalo: ");
const chessNotation = "a1"
function passeioDoCavalo(chessNotation) {
  const referenciaCasas = ['a','b','c','d','e','f','g','h']
  let posicaoinicial = chessNotation.split('')
  posicaoinicial[1] = parseInt(posicaoinicial[1])
  posicaoinicial[0] = (referenciaCasas.findIndex((elemenet) => elemenet === posicaoinicial[0]) + 1)
  return posicaoinicial
}

let casa = passeioDoCavalo(chessNotation)
let result = [passeioDoCavalo(chessNotation)]

function montarTabuleiro() {
  let numbers = [1,2,3,4,5]
  let line = []
  for (let i = 0; i < numbers.length; i++) {
    const elemento = numbers[i];
    for (let j = 0; j <= 4; j++) {
      const elementos = numbers[j];
      line.push([elemento,elementos])
    }
  }
  return line
}
let possibilidades = montarTabuleiro()
console.table(possibilidades)
let indexFirstHouse = possibilidades.findIndex((element) => element[0] == casa[0] && element[1] == casa[1])
possibilidades.splice(indexFirstHouse,1)
function verificaSeAJogadaEValida(casa, jogada, possibilidades) {
  let existeONumero = false
  let novaCasa = [casa[0]+jogada[0],casa[1]+jogada[1]]
  let min = 0
  let max = possibilidades.length-1
  let resto = (min + max)%2
  let chute = ((min + max - resto)/2)
  console.table(possibilidades)
  console.table(novaCasa)
  console.log(possibilidades[chute][0],novaCasa[0],possibilidades[chute][1],novaCasa[1])
  if (possibilidades[chute][0] == novaCasa[0] && possibilidades[chute][1] == novaCasa[1]) {
    existeONumero = true
  } else {
    if (((novaCasa[0]*10) + novaCasa[1]) < (possibilidades[chute][0]*10) + possibilidades[chute][1]) {
      max = chute - 1
      console.log('max')
      if (max < min) {
        return existeONumero
      } else {
        verificaSeAJogadaEValida(casa, jogada, possibilidades.slice(min,max))
      }
    } else {
      min = chute + 1
      if (possibilidades.length > 1) {
        verificaSeAJogadaEValida(casa, jogada, possibilidades.slice(min,max))
      } else {
        return existeONumero
      }
    }
  }
}

function movimentos(novaCasa, possibilidades, result) { 
      let corte = possibilidades.findIndex((element) => element[0] == novaCasa[0] && element[1] == novaCasa[1])
      result.push(possibilidades[corte])
      if (corte < possibilidades.length-1) {
        possibilidades[corte] = possibilidades.pop() 
      } else {
        possibilidades.pop()
      }
}

function movimentosReverso(novaCasa, possibilidades, result) { 
  possibilidades.push(result.pop())
  novaCasa = result[result.length-1]
}



function novoMovimento(casa, possibilidades) {
  let jogadas = [[2,1],[2,-1],[1,2],[1,-2],[-1,2],[-1,-2],[-2,1],[-2,-1]];
  for (let index = 0; index < jogadas.length; index++) {
    const jogada = jogadas[index];
    let novaCasa = [casa[0]+jogada[0],casa[1]+jogada[1]]
    let novaCasaEValida = false
    console.log
    console.log(novaCasa[0] < 5 && novaCasa[0] > 1 &&novaCasa[1] < 5 && novaCasa[1] > 1)
    if (novaCasa[0] < 5 && novaCasa[0] > 1 &&novaCasa[1] < 5 && novaCasa[1] > 1) {
      novaCasaEValida = verificaSeAJogadaEValida(casa, jogada, possibilidades);
    } else {
      novaCasaEValida = false
    }
    if (novaCasaEValida) {
      movimentos(novaCasa, possibilidades, result)
      novoMovimento(novaCasa, possibilidades, result)
      if (possibilidades.length > 0) {
        movimentosReverso(novaCasa, possibilidades, result)
      } else {
        return
      }
    }
  }
}

novoMovimento(casa, possibilidades, result)
const referenciaCasas = ['a','b','c','d','e','f','g','h']
for (let index = 0; index < result.length; index++) {
  let element = result[index];
  element[0] = referenciaCasas[element[0]-1]
  element = element[0] + element[1]
  console.log(element)
}