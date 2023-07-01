const fs = require("fs");

function processFile(filename) {
    const fileData = fs.readFileSync(filename, "utf8");
    let lines = "";
    if ((/(\r)/.test(fileData))) {
        lines = fileData.split("\r\n");
    } else {
        lines = fileData.split("\n");
    }
    lines.pop();

    for (const line of lines) {
        const [rules, input] = line.split(",");
        turningMachine(rules, input);
    }
}

function turningMachine(rules, input) {
    // Lê o arquivo linha a linha
    const fileLines = fs.readFileSync(rules, "utf-8").split("\n");

    // Filtra as linhas vazias e as que começam com ";", e separa os campos
    const filteredLines = fileLines
        .filter(line => line.trim() !== "" && !line.startsWith(";"))
        .map(line => {
            // Descarta tudo após ";"
            const lineWithoutComments = line.split(";")[0].trim();

            // Separa os campos pelos espaços em branco
            const [currentState, currentSymbol, newSymbol, direction, newState] = lineWithoutComments.split(" ");
            return { currentState, currentSymbol, newSymbol, direction, newState };
        });

    const arrayRules = [[]];
    for (const line of filteredLines) {
        const { currentState, currentSymbol, newSymbol, direction, newState } = line;
        arrayRules.push([currentState, currentSymbol, newSymbol, direction, newState]);
    }
    const tape = input.split("");
    let currentState = "0";
    let tapePosition = 0;
    let contador = 0;
    while (true) {
        contador++;
        const currentSymbol = tape[tapePosition];
        // console.log(tape)
        const result = findPair(currentState, currentSymbol, arrayRules);
        if (result == null) {
            console.log(`${rules},${input},ERR`); // Regra não encontrada, imprimir "ERR"
            return;
        }

        if (result[2] !== "*") {
            tape[tapePosition] = result[2];
        }

        if (result[4].slice(0, 4) === "halt") {
            console.log(`${rules},${input},${tape.join("").replace(/_/g, " ").trim()}`); // Finalizar e imprimir a fita
            return;
        }
        if (result[3] === "r") {
            tapePosition++;
            if (tapePosition >= tape.length) {
                tape.push("_"); // Adicionar espaço em branco caso a posição exceda o tamanho atual da fita
            }
        } else if (result[3] === "l") {
            tapePosition--;
            if (tapePosition < 0) {
                tape.unshift("_"); // Adicionar espaço em branco caso a posição seja menor que 0
                tapePosition = 0;
            }
        }
        currentState = result[4];
    }
}

function findPair(state, symbol, arrayRules) {
    // console.log("state",state)
    // console.log("symbol:",symbol)
    // console.log(arrayRules)
    for (let i = 0; i < arrayRules.length; i++) {
        if (arrayRules[i][0] === state && arrayRules[i][1] === symbol) {
            return arrayRules[i];
        }
    }

    for (let i = 0; i < arrayRules.length; i++) {
        if ((arrayRules[i][0] === state || arrayRules[i][0] === "*") && (arrayRules[i][1] === symbol || arrayRules[i][1] === "*")) {
            return arrayRules[i];
        }
    }

    return null; // Pair not found
};

const filename = process.argv[2];

if (!filename) {
    console.log("Nenhum argumento foi passado.");
    console.log("Exemplo de uso: node turingMachine.js datafile");
    process.exit(1);
}

processFile(filename);
