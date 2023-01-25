let posicao = [4,4]
let result = []
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
let x = [
  [ 8, 1 ], [ 8, 2 ], [ 8, 3 ], [ 8, 4 ], [ 8, 5 ],
  [ 8, 6 ], [ 8, 7 ], [ 8, 8 ], [ 7, 1 ], [ 7, 2 ],
  [ 7, 3 ], [ 7, 4 ], [ 7, 5 ], [ 7, 6 ], [ 7, 7 ],
  [ 7, 8 ], [ 6, 1 ], [ 6, 2 ], [ 6, 3 ], [ 6, 4 ],
  [ 6, 5 ], [ 6, 6 ], [ 6, 7 ], [ 6, 8 ], [ 5, 1 ],
  [ 5, 2 ], [ 5, 3 ], [ 5, 4 ], [ 5, 5 ], [ 5, 6 ],
  [ 5, 7 ], [ 5, 8 ], [ 4, 1 ], [ 4, 2 ], [ 4, 3 ],
  [ 4, 4 ], [ 4, 5 ], [ 4, 6 ], [ 4, 7 ], [ 4, 8 ],
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
let movimento = [[2,1],[2,-1],[1,2],[1,-2],[-1,2],[-1,-2],[-2,1],[-2,-1]];

function movimentos(posicao, x) {
  console.log(posicao,x)
  for (let index = 0; index < movimento.length; index++) {
    const element = movimento[index];
    let novaPsicao = jogada(posicao, element, x);
    if (posicao != novaPsicao) {
      index = x.findIndex((element) => element[0] == novaPsicao[0] && element[1] == novaPsicao[1])
      let newx = [...x]
      result.push(newx.splice(index,1))
      if (newx.length === 0) {
        console.log(result)
        break
      } else {
        movimentos(novaPsicao,newx)
      }
    }
  }
  console.log('aqui')
  return posicao;
}


function jogada(posicao, movimento,x) {
  let nextPosition = [posicao[0]+movimento[0],posicao[1]+movimento[1]]
  console.log(nextPosition)
  console.log(x, nextPosition)
  let index = x.findIndex((element) => element[0] == nextPosition[0] && element[1] == nextPosition[1])
  console.log(index)
  if (index != -1) {
    return nextPosition
  } else {
    return posicao
  }
}
passeioDoCavalo('c2')
movimentos(posicao, x)
