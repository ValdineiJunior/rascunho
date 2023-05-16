const file = process.argv[2];
if (!file) {
    console.log('Você precisa fornecer um arquivo como argumento, utilize o arquivo teste "baseconv.txt"');
    process.exit(1);
  }
const readline = require("readline");
const fs = require("fs");

const myInterface = readline.createInterface({
    input: fs.createReadStream(file)
});

myInterface.on("line", function (line) {
    return readBigBase(line);
});

function readBigBase(element) {
    const numeros = element.split(" ").splice(0, 3);
    return handleBigBase(numeros[0], numeros[1], numeros[2]);
}

const bases = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
function handleBigBase(baseEntrada, baseSaida, numeroEntrada) {
    const basesInvalida =
        baseEntrada < 2 || baseEntrada > 62 || baseSaida < 2 || baseSaida > 62;
    const numeroNegativo = parseInt(numeroEntrada) < 0;
    let numeroInvalidoParaBaseExpecifica = false;
    const digitosValidosParaBaseExpecifica = [...bases.slice(0, baseEntrada)];
    for (let index = 0; index < numeroEntrada.length; index++) {
        const element = numeroEntrada[index];
        const digitoPertenceABase = digitosValidosParaBaseExpecifica.includes(element);
        if (!digitoPertenceABase) {
            numeroInvalidoParaBaseExpecifica = true;
            break
        }
    }
    
    if (basesInvalida || numeroNegativo || numeroInvalidoParaBaseExpecifica) {
        return console.log("???");
    }
    let numeroNaBaseDez = transformandoParaDecimal(baseEntrada, numeroEntrada);
    const limit = BigInt(
        transformandoParaDecimal("62", "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
    );
    
    if (numeroNaBaseDez > limit) {
        return console.log("???");
    }
    let result = "";
    if (numeroNaBaseDez === 0n) {
        return console.log("0");
    }
    while (numeroNaBaseDez > 0) {
        const resto = numeroNaBaseDez % BigInt(baseSaida);
        result = bases[resto] + result;
        numeroNaBaseDez = (numeroNaBaseDez - resto) / BigInt(baseSaida);
    }
    return console.log(result);
}

function transformandoParaDecimal(baseEntrada, numeroEntrada) {
    const arrayBases = bases.split("");
    let numeroNaBaseDez = 0n;
    let expoente = BigInt(numeroEntrada.length - 1);
    for (let index = 0; index < numeroEntrada.length; index++) {
        const element = numeroEntrada[index];
        let baseElevada = 1n;
        for (let j = 0; j < expoente; j++) {
            baseElevada *= BigInt(baseEntrada);
        }
        const elementoNaBaseDez = BigInt(
            arrayBases.findIndex((char) => char === element)
        );
        numeroNaBaseDez += elementoNaBaseDez * baseElevada;
        expoente--;
    }
    return numeroNaBaseDez;
}

console.log("01".length)