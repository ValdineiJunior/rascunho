
function passeioDoCavalo(casa) {
  const referenciaCasas = ['a','b','c','d','e','f','g','h']
  let posicaoinicial = casa.split('')
  posicaoinicial[0] = (referenciaCasas.findIndex((elemenet) => elemenet === posicaoinicial[0]) + 1).toString()
  console.log(posicaoinicial)
}

passeioDoCavalo('c2')