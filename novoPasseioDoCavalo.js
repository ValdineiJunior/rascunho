// const readlineSync = require("readline-sync");
// const chessNotation = readlineSync.question("Digite uma casa em notacao algebrica de xadrez que sera a posicao inicial do cavalo: ");
const chessNotation = "a1"
function passeioDoCavalo(chessNotation) {
  const referenciaCasas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  let posicaoinicial = chessNotation.split('')
  posicaoinicial[1] = parseInt(posicaoinicial[1])
  posicaoinicial[0] = (referenciaCasas.findIndex((elemenet) => elemenet === posicaoinicial[0]) + 1)
  return posicaoinicial
}

let casa = passeioDoCavalo(chessNotation)
let result = [casa]
let corte = 0
let soma = true
function montarTabuleiro() {
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8]
  let line = []
  for (let i = 0; i < numbers.length; i++) {
    const elemento = numbers[i];
    for (let j = 0; j <= 7; j++) {
      const elementos = numbers[j];
      line.push([elemento, elementos])
    }
  }
  return line
}
let possibilidades = montarTabuleiro()

let possibilidadesBrancas = []
let possibilidadesPretas = []

for (let index = 0; index < possibilidades.length; index++) {
  const element = possibilidades[index];
  if ((element[0] + element[1]) % 2 == 0) {
    possibilidadesPretas = [...possibilidadesPretas, element]
  } else {
    possibilidadesBrancas = [...possibilidadesBrancas, element]
  }
}

let indexFirstHouse = possibilidadesPretas.findIndex((element) => element[0] == casa[0] && element[1] == casa[1])
if (indexFirstHouse == -1) {
  indexFirstHouse = possibilidadesBrancas.findIndex((element) => element[0] == casa[0] && element[1] == casa[1])
  possibilidadesBrancas.splice(indexFirstHouse, 1)
} else {
  possibilidadesPretas.splice(indexFirstHouse, 1)
}

let newPossibilidades = [...possibilidades]

function verificaSeAJogadaEValida(casa, jogada, possibilidades) {
  console.log(possibilidades)
  let novaCasa = [casa[0] + jogada[0], casa[1] + jogada[1]]
  if (novaCasa[0] < 9 & novaCasa[0] > 0 & novaCasa[1] < 9 & novaCasa[1] > 0) {
    let min = 0
    let max = possibilidades.length - 1
    let resto = (min + max) % 2
    let chute = ((min + max - resto) / 2)
    if (soma) {
      corte = corte + chute
    } else {
      if (possibilidades.length % 2 == 0) {
        corte = corte - 1
      }
      corte = corte - chute
    }
    if (possibilidades[chute][0] == novaCasa[0] && possibilidades[chute][1] == novaCasa[1]) {
      return novaCasa
    } else {
      if (((novaCasa[0] * 10) + novaCasa[1]) < (possibilidades[chute][0] * 10) + possibilidades[chute][1]) {
        max = chute - 1
        corte = corte - 1
        soma = false
        if (max < min) {
          return casa
        } else {
          return verificaSeAJogadaEValida(casa, jogada, possibilidades.slice(min, max + 1))
        }
      } else {
        min = chute + 1
        corte = corte + 1
        soma = true
        if (min > max) {
          return casa
        } else {
          return verificaSeAJogadaEValida(casa, jogada, possibilidades.slice(min, max + 1))
        }
      }
    }
  } else {
    return casa
  }

}

function realocaAJogadaParaOResultado(novaCasa, possibilidades, result) {
  result.push(possibilidades[corte])
  possibilidades.splice(corte, 1)
}

function movimentosReverso(novaCasa, possibilidades, result) {
  possibilidades.push(result.pop())
  novaCasa = result[result.length - 1]
  possibilidades.sort()
}

function novoMovimento(casa, possibilidadesPretas, possibilidadesBrancas) {
  console.table(result)
  let jogadas = [[2, 1], [2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2], [-2, 1], [-2, -1]];
  for (let index = 0; index < jogadas.length; index++) {
    const jogada = jogadas[index];
    corte = 0
    soma = true
    let novaCasa
    let verificaPretas = (casa[0] + jogada[0] + casa[1] + jogada[1]) % 2 === 0
    if (verificaPretas) {
      novaCasa = verificaSeAJogadaEValida(casa, jogada, possibilidadesPretas);
    }
    novaCasa = verificaSeAJogadaEValida(casa, jogada, possibilidadesBrancas);
    let casaEIgualNovaCasa = casa[0] == novaCasa[0] && casa[1] == novaCasa[1]
    if (!casaEIgualNovaCasa) {
      if (verificaPretas) {
        realocaAJogadaParaOResultado(novaCasa, possibilidadesPretas, result)
      }

      realocaAJogadaParaOResultado(novaCasa, possibilidadesBrancas, result)
      if (possibilidadesPretas.length < 32 && possibilidadesBrancas < 32) {
        return
      }
      novoMovimento(novaCasa, possibilidades, result)
      if (possibilidades.length > 0) {
        movimentosReverso(novaCasa, possibilidades, result)
      } else {
        return
      }
    }
  }
}
novoMovimento(casa, possibilidadesPretas, possibilidadesBrancas, result)
console.table(result)
const referenciaCasas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
for (let index = 0; index < result.length; index++) {
  let element = result[index];
  element[0] = referenciaCasas[element[0] - 1]
  element = element[0] + element[1]
  console.log(element)
}
