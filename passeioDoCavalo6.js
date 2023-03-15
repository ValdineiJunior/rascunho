const notacaoInicial = "d4";
const casaInicial = converteNotacao(notacaoInicial);
const resultado = [];
const tamanhoTabuleiro = 8
const possibilidades = possibilidadesTabuleiro(tamanhoTabuleiro);
const possibilidadesBordaTabuleiro = coletarBordasDoTabuleiro(possibilidades, tamanhoTabuleiro)
const possibilidadesSegundaCasaApartirDaBordaTabuleiro = coletarSegundaCasaApartirDaBordaDoTabuleiro(possibilidades, tamanhoTabuleiro)
contabilizandoMovimento(casaInicial, possibilidades, resultado);
main(casaInicial, possibilidades, resultado);
for (let index = 0; index < resultado.length; index++) {
    const notacaoNumerica = resultado[index];
    console.log(converteNotacao(notacaoNumerica));
}

function converteNotacao(notacaoInicial) {
    const letrasDeReferenciaDasCasas = ["a", "b", "c", "d", "e", "f", "g", "h"];
    if (typeof notacaoInicial === "string") {
        const notacaoEmNumeros = notacaoInicial.split("");
        notacaoEmNumeros[0] = (
            letrasDeReferenciaDasCasas.findIndex((elemenet) => elemenet === notacaoEmNumeros[0]) + 1
        );
        notacaoEmNumeros[1] = parseInt(notacaoEmNumeros[1]);
        return notacaoEmNumeros;
    } else {
        notacaoInicial[0] = letrasDeReferenciaDasCasas[notacaoInicial[0] - 1];
        notacaoInicial[1] = notacaoInicial[1].toString();
        const notacaoEmString = notacaoInicial[0] + notacaoInicial[1];
        return notacaoEmString;
    }
}

function possibilidadesTabuleiro(tamanho) {
    const colunas = [];
    for (let index = tamanho; index > 0; index--) {
        colunas.push(index);
    }
    const possibilidadesDoTabuleiro = [];
    for (let i = 0; i < colunas.length; i++) {
        const linha = colunas[i];
        for (let j = colunas.length - 1; j >= 0; j--) {
            const coluna = colunas[j];
            possibilidadesDoTabuleiro.push([linha, coluna]);
        }
    }
    return possibilidadesDoTabuleiro;
}

function contabilizandoMovimento(novaCasa, possibilidades, result) {
    const antigaCasa = possibilidades.findIndex(
        (element) => element[0] === novaCasa[0] && element[1] === novaCasa[1]
    );
    result.push(possibilidades[antigaCasa]);
    if (antigaCasa < possibilidades.length - 1) {
        possibilidades[antigaCasa] = possibilidades.pop();
    } else {
        possibilidades.pop();
    }
}

function reverteUltimoMovimento(novaCasa, possibilidades, resultado) {
    possibilidades.push(resultado.pop());
    novaCasa = resultado[resultado.length - 1];
}

function main(casaAtual, possibilidades) {
    const jogadasPossiveis = coletaJogadasPossiveisIniciandoPelasBordas(casaAtual, possibilidades, possibilidadesBordaTabuleiro, possibilidadesSegundaCasaApartirDaBordaTabuleiro)
    for (let index = 0; index < jogadasPossiveis.length; index++) {
        const jogada = jogadasPossiveis[index];
        const novaCasa = [casaAtual[0] + jogada[0], casaAtual[1] + jogada[1]];
        contabilizandoMovimento(novaCasa, possibilidades, resultado);
        main(novaCasa, possibilidades, resultado);
        if (possibilidades.length > 0) {
            reverteUltimoMovimento(novaCasa, possibilidades, resultado);
        } else {
            return;
        }

    }
}

function coletaJogadasPossiveisIniciandoPelasBordas(casa, possibilidades, possibilidadesBordaTabuleiro) {
    const movimentosPossiveisParaOCavalo = [
        [2, 1],
        [2, -1],
        [1, 2],
        [1, -2],
        [-1, 2],
        [-1, -2],
        [-2, 1],
        [-2, -1]
    ];
    let jogadasBorda = []
    let jogadasCentro = []
    let jogadasSegundacasaApartirdaBorda = []
    for (let i = 0; i < movimentosPossiveisParaOCavalo.length; i++) {
        const jogada = movimentosPossiveisParaOCavalo[i];
        const alvoCentro = [casa[0] + jogada[0], casa[1] + jogada[1]];
        const indexBorda = possibilidadesBordaTabuleiro.findIndex((element) => element[0] === alvoCentro[0] && element[1] === alvoCentro[1]);
        const indexSegundaCasaApartirBorda = possibilidadesSegundaCasaApartirDaBordaTabuleiro.findIndex((element) => element[0] === alvoCentro[0] && element[1] === alvoCentro[1]);
        const indexCentro = possibilidades.findIndex((element) => element[0] === alvoCentro[0] && element[1] === alvoCentro[1]);
        if (indexBorda !== -1 && indexCentro !== -1) {
            jogadasBorda.push(jogada);
        } else if (indexSegundaCasaApartirBorda !== -1 && indexCentro !== -1)
            jogadasSegundacasaApartirdaBorda.push(jogada)
        if (indexBorda === -1 && indexCentro !== -1) {
            jogadasCentro.push(jogada)
        }
    }
    const jogadasPossiveis = jogadasBorda.concat(jogadasSegundacasaApartirdaBorda).concat(jogadasCentro)
    return jogadasPossiveis
}

function coletarBordasDoTabuleiro(possibilidades, tamanhoTabuleiro) {
    let bordas = []
    for (let index = 0; index < possibilidades.length; index++) {
        const element = possibilidades[index];
        const coletandoDiagonalSuperior = element[0] < 2 | element[1] < 2
        const coletandoDiagonalInferior = element[0] > tamanhoTabuleiro - 1 | element[1] > tamanhoTabuleiro - 1
        if (coletandoDiagonalSuperior | coletandoDiagonalInferior) {
            bordas.push(element)
        }
    }
    return bordas
}

function coletarSegundaCasaApartirDaBordaDoTabuleiro(possibilidades, tamanhoTabuleiro) {
    let bordas = []
    for (let index = 0; index < possibilidades.length; index++) {
        const element = possibilidades[index];
        const coletandoDiagonalSuperior = element[0] < 3 | element[1] < 3
        const coletandoDiagonalInferior = element[0] > tamanhoTabuleiro - 2 | element[1] > tamanhoTabuleiro - 2
        if (coletandoDiagonalSuperior | coletandoDiagonalInferior) {
            bordas.push(element)
        }
    }
    return bordas
}
