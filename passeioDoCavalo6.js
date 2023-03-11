const notacaoInicial = "a1";
const casa = converteNotacaoInicialEmNumero(notacaoInicial);
const result = [];
const tamanhoTabuleiro = 5
const possibilidades = montarPossibilidadesDoTabuleiro(tamanhoTabuleiro);
const possibilidadesBordaTabuleiro = coletarBordasDoTabuleiro(possibilidades, tamanhoTabuleiro)
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

function verificaSeAJogadaEValida(casa, jogada, possibilidades) {
    const novaCasa = [casa[0] + jogada[0], casa[1] + jogada[1]];
    const index = possibilidades.findIndex(
        (element) => element[0] === novaCasa[0] && element[1] === novaCasa[1]
    );
    if (index !== -1) {
        return novaCasa;
    } else {
        return casa;
    }
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
    const jogadasAprimorado = coletaJogadasPossiveisIniciandoPelasBordas(casa, possibilidades, possibilidadesBordaTabuleiro)
    for (let index = 0; index < jogadasAprimorado.length; index++) {
        const jogada = jogadasAprimorado[index];
        const novaCasa = verificaSeAJogadaEValida(casa, jogada, possibilidades);
        const casaEIgualNovaCasa = casa[0] === novaCasa[0] && casa[1] === novaCasa[1];
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
    let jogadasPossiveis = []
    for (let i = 0; i < jogadas.length; i++) {
        const jogada = jogadas[i];
        const alvo = [casa[0] + jogada[0], casa[1] + jogada[1]];
        const indexBorda = possibilidadesBordaTabuleiro.findIndex((element) => element[0] === alvo[0] && element[1] === alvo[1]);
        const indexCentro = possibilidades.findIndex((element) => element[0] === alvo[0] && element[1] === alvo[1]);
    if (indexBorda !== -1 && indexCentro !== -1) {
        jogadasPossiveis.push(jogada);
    } else {
        if (indexCentro !== -1) {
            jogadasPossiveis.push(jogada)
        }
    }
    }
    return jogadasPossiveis
}

function coletarBordasDoTabuleiro(possibilidades, tamanhoTabuleiro) {
    let bordas = []
    for (let index = 0; index < possibilidades.length; index++) {
        const element = possibilidades[index];
        const coletandoDiagonalSuperior = element[0] < 3 | element[1] < 3
        const coletandoDiagonalInferior = element [0] > tamanhoTabuleiro - 2 | element[1] > tamanhoTabuleiro - 2
        if ( coletandoDiagonalSuperior | coletandoDiagonalInferior ) {
            bordas.push(element)
        }
    }
    return bordas
}