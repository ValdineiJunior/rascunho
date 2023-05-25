const fs = require("fs");

const primeiroPrimo = 2;
const ultimoPrimo = 9973;

function obterNumerosPrimos(primoInicial, primoFinal) {
    let primos = [];
    for (let numero = primoInicial; numero <= primoFinal; numero++) {
        let ehPrimo = true;
        for (let i = 2; i <= Math.sqrt(numero); i++) {
            if (numero % i === 0) {
                ehPrimo = false;
                break;
            }
        }
        if (ehPrimo) {
            primos.push(numero);
        }
    }

    return primos;
}

function verificaSeTemAlgumPrimo(digitos, primos) {
    for (let i = 0; i < primos.length; i++) {
        const primo = primos[i];
        if (digitos.includes(primo)) {
            return true;
        }
    }
    return false;
}

function coletaIndicesAusenciaPrimosSequenciais(pi) {
    const indicesAusenciaPrimos = [];
    for (let i = 0; i < pi.length - 3; i++) {
        const quatroDigitos = pi.slice(i, i + 4);
        const contemUmPrimo = verificaSeTemAlgumPrimo(quatroDigitos, primos);

        if (!contemUmPrimo) {
            indicesAusenciaPrimos.push(i);
        }
    }

    return indicesAusenciaPrimos;
}

function coletaMaiorSubstringComPrimosSequenciais(pi, indicesAusenciaPrimos) {
    indicesAusenciaPrimos.unshift(0);
    indicesAusenciaPrimos.push(pi.length - 4);
    let maiorDistancia = 0;
    let inicio = 0;
    let fim = 0;
    for (let i = 0; i < indicesAusenciaPrimos.length - 1; i++) {
        const indiceAtual = indicesAusenciaPrimos[i];
        const indiceSeguinte = indicesAusenciaPrimos[i + 1];
        const distancia = indiceSeguinte - indiceAtual;

        if (distancia > maiorDistancia) {
            maiorDistancia = distancia;
            inicio = indiceAtual;
            fim = indiceSeguinte;
        }
    }

    return pi.slice(inicio, fim + 4);
}

const arquivoPi = "minipi-1M.txt";
const pi = fs.readFileSync(arquivoPi, "utf-8").slice(2);
const primos = obterNumerosPrimos(primeiroPrimo, ultimoPrimo);
const indicesAusenciaPrimos = coletaIndicesAusenciaPrimosSequenciais(pi);
const substringDePi = coletaMaiorSubstringComPrimosSequenciais(pi, indicesAusenciaPrimos);

console.log(substringDePi);
