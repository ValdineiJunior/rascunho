let casa = [4,4]
let result = [[4,4]]
// let numbers = [8,7,6,5,4,3,2,1]
// let line = []
// for (let i = 0; i < numbers.length; i++) {
//   const elemento = numbers[i];
//   for (let j = 7; j >= 0; j--) {
//     const elementos = numbers[j];
//     line.push([elemento,elementos])
//   }
// }
// console.log(line)
let xadrez = [
  ['81', '82', '83', '84', '85', '86', '87', '88'],
  ['71', '72', '73', '74', '75', '76', '77', '78'],
  ['61', '62', '63', '64', '65', '66', '67', '68'],
  ['51', '52', '53', '54', '55', '56', '57', '58'],
  ['41', '42', '43', '44', '45', '46', '47', '48'],
  ['31', '32', '33', '34', '35', '36', '37', '38'],
  ['21', '22', '23', '24', '25', '26', '27', '28'],
  ['11', '12', '13', '14', '15', '16', '17', '18']]
console.log(xadrez)
let possibilidades = [
  [ 8, 1 ], [ 8, 2 ], [ 8, 3 ], [ 8, 4 ], [ 8, 5 ],
  [ 8, 6 ], [ 8, 7 ], [ 8, 8 ], [ 7, 1 ], [ 7, 2 ],
  [ 7, 3 ], [ 7, 4 ], [ 7, 5 ], [ 7, 6 ], [ 7, 7 ],
  [ 7, 8 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 6, 4 ],
  [ 6, 5 ], [ 6, 6 ], [ 6, 7 ], [ 6, 8 ], [ 5, 1 ],
  [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 5, 6 ],
  [ 5, 7 ], [ 5, 8 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ],
   [ 4, 5 ], [ 4, 6 ], [ 4, 7 ], [ 4, 8 ],
  [ 3, 1 ], [ 3, 2 ], [ 3, 3 ], [ 3, 4 ], [ 3, 5 ],
  [ 3, 6 ], [ 3, 7 ], [ 3, 8 ], [ 2, 1 ], [ 2, 2 ],
  [ 2, 3 ], [ 2, 4 ], [ 2, 5 ], [ 2, 6 ], [ 2, 7 ],
  [ 2, 8 ], [ 1, 1 ], [ 1, 2 ], [ 1, 3 ], [ 1, 4 ],
  [ 1, 5 ], [ 1, 6 ], [ 1, 7 ], [ 1, 8 ]
]

function passeioDoCavalo(casa) {
  const referenciaCasas = ['a','b','c','d','e','f','g','h']
  let posicaoinicial = casa.split('')
  posicaoinicial[0] = (referenciaCasas.findIndex((elemenet) => elemenet === posicaoinicial[0]) + 1).toString()
  console.log(posicaoinicial)
}
let jogadas = [[2,1],[2,-1],[1,2],[1,-2],[-1,2],[-1,-2],[-2,1],[-2,-1]];
let lastMoveFind = 3

function jogada(casa, jogada, possibilidades) {
  let novaCasa = [casa[0]+jogada[0],casa[1]+jogada[1]]
  let index = possibilidades.findIndex((element) => element[0] == novaCasa[0] && element[1] == novaCasa[1])
  if (index != -1) {
    return novaCasa
  } else {
    return casa
  }
}

let count = 0
function movimentos(casa, jogadas, possibilidades, result) {
  let novaCasa = [...casa]
  let novasJogadas = [...jogadas]
  let novasPossibilidades = [...possibilidades]
  let novoResult = [...result]
  for (let index = 0; index < novasJogadas.length; index++) {
    const existeUmaProximaJogada = novasJogadas[index];
    novaCasa = jogada(novaCasa, existeUmaProximaJogada, novasPossibilidades);
    let casaEIgualNovaCasa = casa[0] == novaCasa[0] && casa[1] == novaCasa[1]
    if (!casaEIgualNovaCasa) {
      // if(proximasJogadas.length > 0) {
      //   movimentos(novaCasa,proximasJogadas,novasPossibilidades, novoResult)
      // }
      // movimentos(novaCasa,novasJogadas,novasPossibilidades)
      let corte = novasPossibilidades.findIndex((element) => element[0] == novaCasa[0] && element[1] == novaCasa[1])
      let apeend = novasPossibilidades.splice(corte,1)
      novoResult.push(apeend[0])
      if (novasPossibilidades.length < 5) {
        console.table(novoResult)
        return novoResult
      } else {
          movimentos(novaCasa, novasJogadas, novasPossibilidades, novoResult)
          if (novasPossibilidades.length < 5) {
            return novoResult
          }
          let devolver = novoResult.splice((novoResult.length-1),1)
          novasPossibilidades.push(devolver[0])
          novaCasa = [...casa]
          // count ++
        
      }
    }
  }
  // movimentos(casa, jogadas, possibilidades, result)
  console.log('aqui')
  return novoResult;
}


passeioDoCavalo('c2')
movimentos(casa, jogadas, possibilidades, result)


// function verifyWord(array, input, responseArray) {
//   let newArray = [...array];
//   let newInput = [...input];
//   const newresponseArray = [...responseArray];
//   for (let index = 0; index < newArray.length; index++) {
//       const word = newArray[index];
//       const wordFitInTheNewInput = (cutTheInput(newInput, word)) !== newInput;
//       if (wordFitInTheNewInput) {
//           const arrayHasMoreThanTwoElements = newArray.length > 2;
//           if (arrayHasMoreThanTwoElements) {
//               const arrayWithoutCurrentElementToSearchForOtherCombinations = newArray.slice(index + 1);
//               verifyWord(arrayWithoutCurrentElementToSearchForOtherCombinations, newInput, newresponseArray);
//           }
//           newInput = cutTheInput(newInput, word);
//           newresponseArray.push(word);
//           const inputIsEmpty = newInput.length === 0;
//           if (inputIsEmpty) {
//               console.log(newresponseArray.join(" "));
//           } else {
//               newArray = newArray.slice(index + 1);
//               verifyWord(newArray, newInput, newresponseArray);
//           }
//           break;
//       }
//   }
// }