let casa = [1,1]
let result = [[1,1]]
let numbers = [5,4,3,2,1]
// let line = []
// for (let i = 0; i < numbers.length; i++) {
//   const elemento = numbers[i];
//   for (let j = 4; j >= 0; j--) {
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
let possibilidades = [
  [ 5, 1 ], [ 5, 2 ], [ 5, 3 ],
  [ 5, 4 ], [ 5, 5 ], [ 4, 1 ],
  [ 4, 2 ], [ 4, 3 ], [ 4, 4 ],
  [ 4, 5 ], [ 3, 1 ], [ 3, 2 ],
  [ 3, 3 ], [ 3, 4 ], [ 3, 5 ],
  [ 2, 1 ], [ 2, 3 ],
  [ 2, 4 ], [ 2, 5 ], [ 1, 1 ],
  [ 1, 2 ], [ 1, 3 ], [ 1, 4 ],
  [ 1, 5 ]
]

function passeioDoCavalo(casa) {
  const referenciaCasas = ['a','b','c','d','e','f','g','h']
  let posicaoinicial = casa.split('')
  posicaoinicial[0] = (referenciaCasas.findIndex((elemenet) => elemenet === posicaoinicial[0]) + 1).toString()
}


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


passeioDoCavalo('c2')

let jogadas = [[2,1],[2,-1],[1,2],[1,-2],[-1,2],[-1,-2],[-2,1],[-2,-1]];
for (let index = 0; index < jogadas.length; index++) {
  const jogada = jogadas[index];
  let novaCasa = verificaSeAJogadaEValida(casa, jogada, possibilidades);
  let casaEIgualNovaCasa = casa[0] == novaCasa[0] && casa[1] == novaCasa[1]
  console.log(casaEIgualNovaCasa)
  if (!casaEIgualNovaCasa) {
    console.table(result)
    movimentos(novaCasa, possibilidades, result)
    console.table(result)
  }
  console.log(result)
}
console.log(result)
movimentos(casa, possibilidades, result)
