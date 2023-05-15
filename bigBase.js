const baseEntrada = process.argv[2];
const baseSaida = process.argv[3];
const numeroEntrada = process.argv[4];
const bases = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const basesInvalida = baseEntrada < 2 && baseSaida > 62 && baseSaida < 2 && baseSaida > 62;
const numeroNegativo = numeroEntrada < 0
let numeroInvalidoParaBaseExpecifica = false
const digitosValidosParaBaseExpecifica = [...bases.slice(0,baseEntrada)]
console.log(digitosValidosParaBaseExpecifica)
for (let index = 0; index < numeroEntrada.length; index++) {
  const element = numeroEntrada[index];
  digitoPertenceABase = digitosValidosParaBaseExpecifica.findIndex((char => char === element))
  if (digitoPertenceABase == -1) {
    numeroInvalidoParaBaseExpecifica = true
  }
}
if (basesInvalida || numeroNegativo || numeroInvalidoParaBaseExpecifica) {
  return console.log('???')
}
const arrayBases = bases.split("")
numeroNaBaseDez = 0
expoente = numeroEntrada.length - 1
for (let index = 0; index < numeroEntrada.length; index++) {
  console.log(numeroEntrada[index])
  const element = numeroEntrada[index];
  baseElevada = 1
  for (let j = 0; j < expoente; j++) {
    baseElevada *= baseEntrada
  }
  // console.log("element: ",element,"baseElevada",baseElevada)
  elementoNaBaseDez = arrayBases.findIndex((char => char === element))
  numeroNaBaseDez += elementoNaBaseDez * baseElevada
  expoente--
}

let result = ''
while (numeroNaBaseDez > 0) {
  resto = numeroNaBaseDez % baseSaida;
  result = bases[resto] + result;
  numeroNaBaseDez = (numeroNaBaseDez - resto) / baseSaida
}

console.log(numeroNaBaseDez)
console.log(result)
// numeroNaBaseDez = 1 * 2^3 + 0 * 2^2 + 1 * 2^1 + 1 * 2^0