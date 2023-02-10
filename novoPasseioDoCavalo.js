// const readlineSync = require("readline-sync");
// const chessNotation = readlineSync.question("Digite uma casa em notacao algebrica de xadrez que sera a posicao inicial do cavalo: ");
const chessNotation = "a1";
function passeioDoCavalo(chessNotation) {
  const referenciaCasas = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const posicaoinicial = chessNotation.split("");
  posicaoinicial[1] = parseInt(posicaoinicial[1]);
  posicaoinicial[0] =
    referenciaCasas.findIndex((elemenet) => elemenet === posicaoinicial[0]) + 1;
  return posicaoinicial;
}

const casa = passeioDoCavalo(chessNotation);
const resultFirstPart = [casa];
let resultLastPart = []
let corte = 0;
let soma = true;
function montarTabuleiro() {
  const numbers = [1, 2, 3, 4, 5, 6];
  const line = [];
  for (let i = 0; i < numbers.length; i++) {
    const elemento = numbers[i];
    for (let j = 0; j <= 5; j++) {
      const elementos = numbers[j];
      line.push([elemento, elementos]);
    }
  }
  return line;
}
const possibilidades = montarTabuleiro();

const indexFirstHouse = possibilidades.findIndex(
  (element) => element[0] === casa[0] && element[1] === casa[1]
);
const indexLastHouse = ((possibilidades.length/2) - indexFirstHouse) + (possibilidades.length/2)
possibilidades.splice(indexFirstHouse, 1);
resultLastPart.push(possibilidades[indexLastHouse-2]);
possibilidades.splice((indexLastHouse-2), 1);

function verificaSeAJogadaEValida(casa, jogada, possibilidades) {
  // if (resultFirstPart.length > 15)
  // console.table(resultFirstPart)
  // console.table(resultLastPart)
  const novaCasa = [casa[0] + jogada[0], casa[1] + jogada[1]];
  if (
    (novaCasa[0] < 7) &
    (novaCasa[0] > 0) &
    (novaCasa[1] < 7) &
    (novaCasa[1] > 0)
  ) {
    let min = 0;
    let max = possibilidades.length - 1;
    const resto = (min + max) % 2;
    const chute = (min + max - resto) / 2;
    if (soma) {
      corte = corte + chute;
    } else {
      if (possibilidades.length % 2 === 0) {
        corte = corte - 1;
      }
      corte = corte - chute;
    }
    if (
      possibilidades[chute][0] === novaCasa[0] &&
      possibilidades[chute][1] === novaCasa[1]
    ) {
      return novaCasa;
    } else {
      if (
        novaCasa[0] * 10 + novaCasa[1] <
        possibilidades[chute][0] * 10 + possibilidades[chute][1]
      ) {
        max = chute - 1;
        corte = corte - 1;
        soma = false;
        if (max < min) {
          return casa;
        } else {
          return verificaSeAJogadaEValida(
            casa,
            jogada,
            possibilidades.slice(min, max + 1)
          );
        }
      } else {
        min = chute + 1;
        corte = corte + 1;
        soma = true;
        if (min > max) {
          return casa;
        } else {
          return verificaSeAJogadaEValida(
            casa,
            jogada,
            possibilidades.slice(min, max + 1)
          );
        }
      }
    }
  } else {
    return casa;
  }
}

function realocaAJogadaParaOResultado(novaCasa, possibilidades, resultFirstPart) {
  // console.log(possibilidades.length)
  // console.log(possibilidades[corte])
  console.table(possibilidades)
  console.log(possibilidades.length)
  const indexTraz = (((possibilidades.length/2) - corte) + (possibilidades.length/2)) - 1
  // console.log("---------",corte)
  // console.log("---------",indexTraz)
  console.log(possibilidades[corte])
  console.log(possibilidades[indexTraz])
  resultFirstPart.push(possibilidades[corte]);
  resultLastPart.push(possibilidades[indexTraz])
  // console.log(corte)
  // console.log(indexTraz)
  // console.table(possibilidades)
  if (corte > indexTraz) {
    possibilidades.splice(indexTraz, 1);
    possibilidades.splice(corte-1, 1);
  } else {
    possibilidades.splice(corte, 1);
    possibilidades.splice(indexTraz-1, 1);
  }
  
  // console.table(possibilidades)
  novaCasa = resultFirstPart[resultFirstPart.length - 1]
  console.log(possibilidades.length)
}

function movimentosReverso(novaCasa, possibilidades, resultFirstPart, resultLastPart) {
  console.log('aqui')
  console.table(possibilidades)
  possibilidades.push(resultFirstPart.pop());
  // console.log(possibilidades)
  novaCasa = resultFirstPart[resultFirstPart.length - 1];
  // console.table(resultLastPart)
  possibilidades.push(resultLastPart.pop());
  // console.log(possibilidades)
  possibilidades.sort();
  console.table(possibilidades)
}

function novoMovimento(casa, possibilidades) {

  const jogadas = [
    [2, 1],
    [2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
    [-2, 1],
    [-2, -1]
  ];

  for (let index = 0; index < jogadas.length; index++) {
    const jogada = jogadas[index];
    corte = 0;
    soma = true;
    const novaCasa = verificaSeAJogadaEValida(casa, jogada, possibilidades);
    const casaEIgualNovaCasa = casa[0] === novaCasa[0] && casa[1] === novaCasa[1];
    if (!casaEIgualNovaCasa) {
      realocaAJogadaParaOResultado(novaCasa, possibilidades, resultFirstPart, resultLastPart);
      if (possibilidades.length < 1) {
        return;
      }
      novoMovimento(novaCasa, possibilidades);
      if (possibilidades.length > 0) {
        movimentosReverso(novaCasa, possibilidades, resultFirstPart, resultLastPart);
      } else {
        return;
      }
    }
  }
}
novoMovimento(casa, possibilidades);
console.table(resultFirstPart);
const referenciaCasas = ["a", "b", "c", "d", "e", "f", "g", "h"];
for (let index = 0; index < resultFirstPart.length; index++) {
  let element = resultFirstPart[index];
  element[0] = referenciaCasas[element[0] - 1];
  element = element[0] + element[1];
  console.log(element);
}
console.table(resultLastPart);
for (let index = resultLastPart.length - 1; index >= 0; index--) {
  let element = resultLastPart[index];
  element[0] = referenciaCasas[element[0] - 1];
  element = element[0] + element[1];
  console.log(element);
}

// 02	03	04	05	06	07	08	09
// 03	04	05	06	07	08	09	10
// 04	05	06	07	08	09	10	11
// 05	06	07	08	09	10	11	12
// 06	07	08	09	10	11	12	13
// 07	08	09	10	11	12	13	14
// 08	09	10	11	12	13	14	15
// 09	10	11	12	13	14	15	16
