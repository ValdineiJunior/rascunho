const notacaoInicial = "a1";
const casa = converteNotacaoInicialEmNumero(notacaoInicial);
const result = [];
const tamanhoTabuleiro = 8
const possibilidades = montarPossibilidadesDoTabuleiro(tamanhoTabuleiro);
const possibilidadesBordaTabuleiro = coletarBordasDoTabuleiro(possibilidades, tamanhoTabuleiro)
const possibilidadesSegundaCasaApartirDaBordaTabuleiro = coletarSegundaCasaApartirDaBordaDoTabuleiro(possibilidades, tamanhoTabuleiro)
console.table(possibilidades)
movimentos(casa, possibilidades, result);
novoMovimento(casa, possibilidades, result);
console.table(result);

function converteNotacaoInicialEmNumero(notacaoInicial) {
    const referenciaCasas = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const posicaoinicial = notacaoInicial.split("");
    posicaoinicial[0] = (
        referenciaCasas.findIndex((elemenet) => elemenet === posicaoinicial[0]) + 1
    );
    posicaoinicial[1] = parseInt(posicaoinicial[1]);
    return posicaoinicial;
}

function montarPossibilidadesDoTabuleiro(tamanho) {
    const numbers = [];
    for (let index = tamanho; index > 0; index--) {
        numbers.push(index);
    }
    const tabuleiro = [];
    for (let i = 0; i < numbers.length; i++) {
        const linha = numbers[i];
        for (let j = numbers.length - 1; j >= 0; j--) {
            const coluna = numbers[j];
            tabuleiro.push([linha, coluna]);
        }
    }
    return tabuleiro;
}

function movimentos(novaCasa, possibilidades, result) {
    const corte = possibilidades.findIndex(
        (element) => element[0] === novaCasa[0] && element[1] === novaCasa[1]
    );
    result.push(possibilidades[corte]);
    if (corte < possibilidades.length - 1) {
        possibilidades[corte] = possibilidades.pop();
    } else {
        possibilidades.pop();
    }
}

function movimentosReverso(novaCasa, possibilidades, result) {
    possibilidades.push(result.pop());
    novaCasa = result[result.length - 1];
}

function novoMovimento(casa, possibilidades) {
    const jogadasAprimorado = coletaJogadasPossiveisIniciandoPelasBordas(casa, possibilidades, possibilidadesBordaTabuleiro, possibilidadesSegundaCasaApartirDaBordaTabuleiro)
    for (let index = 0; index < jogadasAprimorado.length; index++) {
        const jogada = jogadasAprimorado[index];
        const novaCasa = [casa[0] + jogada[0], casa[1] + jogada[1]];
        movimentos(novaCasa, possibilidades, result);
        novoMovimento(novaCasa, possibilidades, result);
        if (possibilidades.length > 0) {
            movimentosReverso(novaCasa, possibilidades, result);
        } else {
            return;
        }

    }
}

function coletaJogadasPossiveisIniciandoPelasBordas(casa, possibilidades, possibilidadesBordaTabuleiro) {
    const jogadas = [
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
    for (let i = 0; i < jogadas.length; i++) {
        const jogada = jogadas[i];
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