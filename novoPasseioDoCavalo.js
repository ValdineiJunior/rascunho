let casa = [4,4]
let result = [[4,4]]
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
}
let jogadas = [[2,1],[2,-1],[1,2],[1,-2],[-1,2],[-1,-2],[-2,1],[-2,-1]];

function jogada(casa, jogada, possibilidades) {
  let novaCasa = [casa[0]+jogada[0],casa[1]+jogada[1]]
  let index = possibilidades.findIndex((element) => element[0] == novaCasa[0] && element[1] == novaCasa[1])
  if (index != -1) {
    return novaCasa
  } else {
    return casa
  }
}

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
      contabilizaONovoMovimento(novaCasa, novasPossibilidades, novoResult)
      if (novasPossibilidades.length === 0) {
        console.log(novoResult)
      } else {
        movimentos(novaCasa, novasJogadas, novasPossibilidades, novoResult)
        retornaMovimento(casa,novasPossibilidades, novoResult)
        movimentos(novaCasa, novasJogadas, novasPossibilidades, novoResult)
        break
      }
    }
  }
}
    
passeioDoCavalo('c2')
let continua = true
console.log(movimentos(casa, jogadas, possibilidades, result))

function contabilizaONovoMovimento(novaCasa,novasPossibilidades, novoResult) {
  let corte = novasPossibilidades.findIndex((element) => element[0] == novaCasa[0] && element[1] == novaCasa[1])
  novoResult.push(novasPossibilidades[corte])
  novasPossibilidades[corte] = novasPossibilidades.pop()
}

function retornaMovimento(novaCasa,novasPossibilidades, novoResult) {
  let devolver = novoResult.pop()
  novasPossibilidades.push(devolver)
}