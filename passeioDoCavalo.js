const readlineSync = require("readline-sync");
const chessNotation = readlineSync.question("Digite uma casa em notacao algebrica de xadrez que sera a posicao inicial do cavalo: ");
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
  let numbers = [8,7,6,5,4,3,2,1]
  let line = []
  for (let i = 0; i < numbers.length; i++) {
    const elemento = numbers[i];
    for (let j = 7; j >= 0; j--) {
      const elementos = numbers[j];
      line.push([elemento,elementos])
    }
  }
  return line
}
let possibilidades = montarTabuleiro()

let indexFirstHouse = possibilidades.findIndex((element) => element[0] == casa[0] && element[1] == casa[1])
possibilidades.splice(indexFirstHouse,1)
function verificaSeAJogadaEValida(casa, jogada, possibilidades) {
  let novaCasa = [casa[0]+jogada[0],casa[1]+jogada[1]]
  let index = possibilidades.findIndex((element) => element[0] == novaCasa[0] && element[1] == novaCasa[1])
  if (index != -1) {
    return novaCasa
  } else {
    return casa
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
    let novaCasa = verificaSeAJogadaEValida(casa, jogada, possibilidades);
    let casaEIgualNovaCasa = casa[0] == novaCasa[0] && casa[1] == novaCasa[1]
    if (!casaEIgualNovaCasa) {
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