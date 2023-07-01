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
        const arrayRules = filteredRules(rules, input);
        turningMachine(rules, arrayRules, input);
    }
}

function filteredRules(rules) {
    const fileLines = fs.readFileSync(rules, "utf-8").split("\n");
    const filteredLines = fileLines
        .filter(line => line.trim() !== "" && !line.startsWith(";"))
        .map(line => {
            const lineWithoutComments = line.split(";")[0].trim();

            const [currentState, currentSymbol, newSymbol, direction, newState] = lineWithoutComments.split(" ");
            return { currentState, currentSymbol, newSymbol, direction, newState };
        });

    return filteredLines;
}

function turningMachine(rules, arrayRules, input) {
    const tape = (input.replace(" ", "_").split(""));
    let currentState = "0";
    let tapePosition = 0;
    let contador = 0;
    while (true) {
        contador++;
        const currentSymbol = tape[tapePosition];
        const result = findPair(currentState, currentSymbol, arrayRules);
        if (result == null) {
            console.log(`${rules},${input},ERR`);
            return;
        }

        if (result.newSymbol !== "*") {
            tape[tapePosition] = result.newSymbol;
        }

        if (result.newState.slice(0, 4) === "halt") {
            console.log(`${rules},${input},${tape.join("").replace(/_/g, " ").trim()}`);
            return;
        }
        if (result.direction === "r") {
            tapePosition++;
            if (tapePosition >= tape.length) {
                tape.push("_");
            }
        } else if (result.direction === "l") {
            tapePosition--;
            if (tapePosition < 0) {
                tape.unshift("_");
                tapePosition = 0;
            }
        }
        currentState = result.newState;
    }
}

function findPair(state, symbol, rules) {
    for (let i = 0; i < rules.length; i++) {
        if (rules[i].currentState === state && rules[i].currentSymbol === symbol) {
            return { ...rules[i] };
        }
    }

    for (let i = 0; i < rules.length; i++) {
        if ((rules[i].currentState === state || rules[i].currentState === "*") && (rules[i].currentSymbol === symbol || rules[i].currentSymbol === "*")) {
            return { ...rules[i] };
        }
    }

    return null;
}

const filename = process.argv[2];

if (!filename) {
    console.log("Nenhum argumento foi passado.");
    console.log("Exemplo de uso: node turingMachine.js datafile");
    process.exit(1);
}

processFile(filename);
