// const readlineSync = require("readline-sync");
// const chessNotation = readlineSync.question("Digite uma casa em notacao algebrica de xadrez que sera a posicao inicial do cavalo: ");
const chessNotation = "a1"
function passeioDoCavalo(chessNotation) {
    const referenciaCasas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    let posicaoinicial = chessNotation.split('')
    posicaoinicial[1] = parseInt(posicaoinicial[1])
    posicaoinicial[0] = (referenciaCasas.findIndex((elemenet) => elemenet === posicaoinicial[0]) + 1)
    return posicaoinicial// const readlineSync = require("readline-sync");
    // const chessNotation = readlineSync.question("Digite uma casa em notacao algebrica de xadrez que sera a posicao inicial do cavalo: ");
    const chessNotation = "a1";
    function passeioDoCavalo(chessNotation) {
        const referenciaCasas = ["a", "b", "c", "d", "e", "f", "g", "h"];
        const posicaoinicial = chessNotation.split("");
        posicaoinicial[1] = parseInt(posicaoinicial[1]);
        posicaoinicial[0] =
            referenciaCasas.findIndex((elemenet) => elemenet === posicaoinicial[0]) + 1;
        return posicaoinicial;
    }

    const casa = passeioDoCavalo(chessNotation);
    const result = [casa];
    let corte = 0;
    let soma = true;
    function montarTabuleiro() {
        const numbers = [1, 2, 3, 4, 5, 6];
        const line = [];
        for (let i = 0; i < numbers.length; i++) {
            const elemento = numbers[i];
            for (let j = 0; j <= 5; j++) {
                const elementos = numbers[j];
                line.push([elemento, elementos]);
            }
        }
        return line;
    }
    const possibilidades = montarTabuleiro();

    const indexFirstHouse = possibilidades.findIndex(
        (element) => element[0] === casa[0] && element[1] === casa[1]
    );
    possibilidades.splice(indexFirstHouse, 1);

    function verificaSeAJogadaEValida(casa, jogada, possibilidades) {
        const novaCasa = [casa[0] + jogada[0], casa[1] + jogada[1]];
        if (
            (novaCasa[0] < 7) &
            (novaCasa[0] > 0) &
            (novaCasa[1] < 7) &
            (novaCasa[1] > 0)
        ) {
            let min = 0;
            let max = possibilidades.length - 1;
            const resto = (min + max) % 2;
            const chute = (min + max - resto) / 2;
            if (soma) {
                corte = corte + chute;
            } else {
                if (possibilidades.length % 2 === 0) {
                    corte = corte - 1;
                }
                corte = corte - chute;
            }
            if (
                possibilidades[chute][0] === novaCasa[0] &&
                possibilidades[chute][1] === novaCasa[1]
            ) {
                return novaCasa;
            } else {
                if (
                    novaCasa[0] * 10 + novaCasa[1] <
                    possibilidades[chute][0] * 10 + possibilidades[chute][1]
                ) {
                    max = chute - 1;
                    corte = corte - 1;
                    soma = false;
                    if (max < min) {
                        return casa;
                    } else {
                        return verificaSeAJogadaEValida(
                            casa,
                            jogada,
                            possibilidades.slice(min, max + 1)
                        );
                    }
                } else {
                    min = chute + 1;
                    corte = corte + 1;
                    soma = true;
                    if (min > max) {
                        return casa;
                    } else {
                        return verificaSeAJogadaEValida(
                            casa,
                            jogada,
                            possibilidades.slice(min, max + 1)
                        );
                    }
                }
            }
        } else {
            return casa;
        }
    }

    function realocaAJogadaParaOResultado(novaCasa, possibilidades, result) {
        result.push(possibilidades[corte]);
        possibilidades.splice(corte, 1);
    }

    function movimentosReverso(novaCasa, possibilidades, result) {
        possibilidades.push(result.pop());
        novaCasa = result[result.length - 1];
        possibilidades.sort();
    }

    function novoMovimento(casa, possibilidades) {
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
        for (let index = 0; index < jogadas.length; index++) {
            const jogada = jogadas[index];
            corte = 0;
            soma = true;

            const novaCasa = verificaSeAJogadaEValida(casa, jogada, possibilidades);
            const casaEIgualNovaCasa = casa[0] === novaCasa[0] && casa[1] === novaCasa[1];
            if (!casaEIgualNovaCasa) {
                realocaAJogadaParaOResultado(novaCasa, possibilidades, result);
                if (possibilidades.length < 1) {
                    return;
                }
                novoMovimento(novaCasa, possibilidades, result);
                if (possibilidades.length > 0) {
                    movimentosReverso(novaCasa, possibilidades, result);
                } else {
                    return;
                }
            }
        }
    }
    novoMovimento(casa, possibilidades, result);
    console.table(result);
    const referenciaCasas = ["a", "b", "c", "d", "e", "f", "g", "h"];
    for (let index = 0; index < result.length; index++) {
        let element = result[index];
        element[0] = referenciaCasas[element[0] - 1];
        element = element[0] + element[1];
        console.log(element);
    }

}

let casa = passeioDoCavalo(chessNotation)
let result = [casa]
let corte = 0
let soma = true
function montarTabuleiro() {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8]
    let line = []
    for (let i = 0; i < numbers.length; i++) {
        const elemento = numbers[i];
        for (let j = 0; j <= 7; j++) {
            const elementos = numbers[j];
            line.push([elemento, elementos])
        }
    }
    return line
}
let possibilidades = montarTabuleiro()

let possibilidadesBrancas = []
let possibilidadesPretas = []

for (let index = 0; index < possibilidades.length; index++) {
    const element = possibilidades[index];
    if ((element[0] + element[1]) % 2 == 0) {
        possibilidadesPretas = [...possibilidadesPretas, element]
    } else {
        possibilidadesBrancas = [...possibilidadesBrancas, element]
    }
}

let indexFirstHouse = possibilidadesPretas.findIndex((element) => element[0] == casa[0] && element[1] == casa[1])
if (indexFirstHouse == -1) {
    indexFirstHouse = possibilidadesBrancas.findIndex((element) => element[0] == casa[0] && element[1] == casa[1])
    possibilidadesBrancas.splice(indexFirstHouse, 1)
} else {
    possibilidadesPretas.splice(indexFirstHouse, 1)
}

let newPossibilidades = [...possibilidades]

function verificaSeAJogadaEValida(casa, jogada, possibilidades) {
    console.log(possibilidades)
    let novaCasa = [casa[0] + jogada[0], casa[1] + jogada[1]]
    if (novaCasa[0] < 9 & novaCasa[0] > 0 & novaCasa[1] < 9 & novaCasa[1] > 0) {
        let min = 0
        let max = possibilidades.length - 1
        let resto = (min + max) % 2
        let chute = ((min + max - resto) / 2)
        if (soma) {
            corte = corte + chute
        } else {
            if (possibilidades.length % 2 == 0) {
                corte = corte - 1
            }
            corte = corte - chute
        }
        if (possibilidades[chute][0] == novaCasa[0] && possibilidades[chute][1] == novaCasa[1]) {
            return novaCasa
        } else {
            if (((novaCasa[0] * 10) + novaCasa[1]) < (possibilidades[chute][0] * 10) + possibilidades[chute][1]) {
                max = chute - 1
                corte = corte - 1
                soma = false
                if (max < min) {
                    return casa
                } else {
                    return verificaSeAJogadaEValida(casa, jogada, possibilidades.slice(min, max + 1))
                }
            } else {
                min = chute + 1
                corte = corte + 1
                soma = true
                if (min > max) {
                    return casa
                } else {
                    return verificaSeAJogadaEValida(casa, jogada, possibilidades.slice(min, max + 1))
                }
            }
        }
    } else {
        return casa
    }

}

function realocaAJogadaParaOResultado(novaCasa, possibilidades, result) {
    result.push(possibilidades[corte])
    possibilidades.splice(corte, 1)
}

function movimentosReverso(novaCasa, possibilidades, result) {
    possibilidades.push(result.pop())
    novaCasa = result[result.length - 1]
    possibilidades.sort()
}

function novoMovimento(casa, possibilidadesPretas, possibilidadesBrancas) {
    console.table(result)
    let jogadas = [[2, 1], [2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2], [-2, 1], [-2, -1]];
    for (let index = 0; index < jogadas.length; index++) {
        const jogada = jogadas[index];
        corte = 0
        soma = true
        let novaCasa
        let verificaPretas = (casa[0] + jogada[0] + casa[1] + jogada[1]) % 2 === 0
        if (verificaPretas) {
            novaCasa = verificaSeAJogadaEValida(casa, jogada, possibilidadesPretas);
        }
        novaCasa = verificaSeAJogadaEValida(casa, jogada, possibilidadesBrancas);
        let casaEIgualNovaCasa = casa[0] == novaCasa[0] && casa[1] == novaCasa[1]
        if (!casaEIgualNovaCasa) {
            if (verificaPretas) {
                realocaAJogadaParaOResultado(novaCasa, possibilidadesPretas, result)
            }

            realocaAJogadaParaOResultado(novaCasa, possibilidadesBrancas, result)
            if (possibilidadesPretas.length < 32 && possibilidadesBrancas < 32) {
                return
            }
            novoMovimento(novaCasa, possibilidades, result)
            if (possibilidades.length > 0) {
                movimentosReverso(novaCasa, possibilidades, result)
            } else {
                return
            }
        }
    }
}
novoMovimento(casa, possibilidadesPretas, possibilidadesBrancas, result)
console.table(result)
const referenciaCasas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
for (let index = 0; index < result.length; index++) {
    let element = result[index];
    element[0] = referenciaCasas[element[0] - 1]
    element = element[0] + element[1]
    console.log(element)
}

// 01,52,13,34,03,54,11,24,14,33,02,53,12,23,56,09,51,64,35,04,55,10,25,22,32,15,42,39,36,05,08,57,63,50,37,06,41,44,21,26,16,31,40,43,38,07,58,45,49,62,29,18,47,60,27,20,30,17,48,61,28,19,46,59

a1
c2
e1
d3
f4
d5
f6
g4
h2
f3
g1
e2
c1
a2
b4
a6
b8
d7
f8
h7
g5
h3
f2
h1
g3
h5
g7
e8
c7
a8
b6
a4
b2
d1
c3
e4
c5
e6
d4
c6
e5
c4
d6
f5
h6
g8
e7
c8
a7
b5
a3
b1
d2
f1
e3
g2
h4
g6
h8
f7
d8
b7
a5
b3