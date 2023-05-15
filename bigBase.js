const file = process.argv[2];
const readline = require("readline");
const fs = require("fs");

const myInterface = readline.createInterface({
    input: fs.createReadStream(file)
});

myInterface.on("line", function (line) {
    return readBigBase(line);
});

function readBigBase(element) {
    numeros = element.split(' ').splice(0,3)
    // console.log(numeros)

    return handleBigBase(numeros[0],numeros[1],numeros[2]);
}

const bases = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
function handleBigBase(baseEntrada, baseSaida, numeroEntrada) {
  const basesInvalida = baseEntrada < 2 || baseEntrada > 62 || baseSaida < 2 || baseSaida > 62;
  const numeroNegativo = numeroEntrada < 0
  let numeroInvalidoParaBaseExpecifica = false
  const digitosValidosParaBaseExpecifica = [...bases.slice(0,baseEntrada)]
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
  let numeroNaBaseDez = transformandoParaDecimal(baseEntrada,numeroEntrada)
  const limit = BigInt(transformandoParaDecimal('62','zzzzzzzzzzzzzzzzzzzzzzzzzzzzzz'))
  if (numeroNaBaseDez > limit) {
    return console.log('???')
  }
  let result = ''
  if (numeroNaBaseDez == 0) {
    return console.log('0')
  }
  while (numeroNaBaseDez > 0) {
    resto = numeroNaBaseDez % BigInt(baseSaida);
    result = bases[resto] + result;
    numeroNaBaseDez = (numeroNaBaseDez - resto) / BigInt(baseSaida)
  }
  
  // console.log(numeroNaBaseDez)
  return console.log(result)
  // numeroNaBaseDez = 1 * 2^3 + 0 * 2^2 + 1 * 2^1 + 1 * 2^0
}

function transformandoParaDecimal(baseEntrada,numeroEntrada) {
  const arrayBases = bases.split("")
  numeroNaBaseDez = 0n
  expoente = BigInt(numeroEntrada.length - 1)
  for (let index = 0; index < numeroEntrada.length; index++) {
    // console.log(numeroEntrada[index])
    const element = numeroEntrada[index];
    baseElevada = 1n
    for (let j = 0; j < expoente; j++) {
      baseElevada *= BigInt(baseEntrada)
    }
    elementoNaBaseDez = BigInt(arrayBases.findIndex((char => char === element)))
    numeroNaBaseDez += elementoNaBaseDez * baseElevada
    expoente--
  }
  return numeroNaBaseDez
}