const fs = require("fs");

const primeiroPrimo = 2;
const ultimoPrimo = 9973;
const arquivoPi = "pi-1M.txt";

let numerosPrimos;
let digitosPi;
let maiorDasSequencias = "";

function isPrimo(numero) {
    if (numero === 2) {
        return true;
    }
    if (numero < 2 || numero % 2 === 0) {
        return false;
    }
    for (let i = 3; i <= Math.sqrt(numero); i += 2) {
        if (numero % i === 0) {
            return false;
        }
    }
    return true;
}

function obterNumerosPrimos(primoInicial, primoFinal) {
    const primos = new Set();
    for (let numero = primoInicial; numero <= primoFinal; numero++) {
        if (isPrimo(numero)) {
            primos.add(numero);
        }
    }
    return primos;
}

function coletarMaiorSequencia(indexDeInicio, sequenciaAtual) {
    let digito = "";
    let sequenciaAtualizada = "";
    let numero = 0;

    for (let i = indexDeInicio; i < indexDeInicio + 4 && i < digitosPi.length; i++) {
        digito += digitosPi[i];
        numero = parseInt(digito);
      
        if (numerosPrimos.has(numero)) {
            sequenciaAtualizada = sequenciaAtual + digito;
            coletarMaiorSequencia(i + 1, sequenciaAtualizada);
        }
    }
      
    if (sequenciaAtualizada.length > maiorDasSequencias.length) {
        maiorDasSequencias = sequenciaAtualizada;
    }
}

pi = fs.readFileSync(arquivoPi, "utf-8").slice(2);
digitosPi = pi.split("").map(Number);
numerosPrimos = obterNumerosPrimos(primeiroPrimo, ultimoPrimo);

for (let index = 0; index < digitosPi.length; index++) {
    const sequenciaInicial = '';
    coletarMaiorSequencia(index, sequenciaInicial);
}

console.log(maiorDasSequencias);
