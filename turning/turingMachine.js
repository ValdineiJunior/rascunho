const fs = require('fs');

function processFile(filename) {
  const fileData = fs.readFileSync(filename, 'utf8');
  const lines = fileData.split('\n');
  lines.pop()

  for (const line of lines) {
    const [rules, input] = line.split(',');
    turningMachine(rules, input);
  }
}

function turningMachine(rules, input) {
  // Lê o arquivo linha a linha
  const fileLines = fs.readFileSync(rules, 'utf-8').split('\n');

  // Filtra as linhas vazias e as que começam com ";", e separa os campos
  const filteredLines = fileLines
    .filter(line => line.trim() !== '' && !line.startsWith(';'))
    .map(line => {
      // Descarta tudo após ";"
      const lineWithoutComments = line.split(';')[0].trim();

      // Separa os campos pelos espaços em branco
      const [current_state, current_symbol, new_symbol, direction, new_state] = lineWithoutComments.split(' ');
      return { current_state, current_symbol, new_symbol, direction, new_state };
    });

  arrayRules = [[]]
  for (const line of filteredLines) {
    const { current_state, current_symbol, new_symbol, direction, new_state } = line;
    arrayRules.push([current_state, current_symbol, new_symbol, direction, new_state])
  }
  let tape = input.split('');
  tape.pop()
  let currentState = '0';
  let tapePosition = 0;
  // console.table(arrayRules)
  let contador = 0
  while(true) {
    const currentSymbol = tape[tapePosition];
    const [current_state, current_symbol, new_symbol, direction, new_state] = findPair(currentState,currentSymbol)
    if (result == null) {
      console.log(`${rules},${input},ERR`); // Regra não encontrada, imprimir "ERR"
      return;
    }
    console.log(result)
    if (result.new_state.startsWith('halt')) {
      console.log(`${rules},${input},${tape.join('')}`); // Finalizar e imprimir a fita
      return;
    }

    // Executar as ações da regra
    tape[tapePosition] = result.new_symbol;
    if (result.direction === 'r') {
      tapePosition++;
      if (tapePosition >= tape.length) {
        tape.push('_'); // Adicionar espaço em branco caso a posição exceda o tamanho atual da fita
      }
    } else if (result.direction === 'l') {
      tapePosition--;
      if (tapePosition < 0) {
        tape.unshift('_'); // Adicionar espaço em branco caso a posição seja menor que 0
        tapePosition = 0;
      }
    }

    currentState = result.new_state;

    // console.table(result)
    contador++
  }
}

function findPair(state, symbol) {
  for (let i = 0; i < arrayRules.length; i++) {
    // console.table(arrayRules[i])
    // console.log("estado rules:",arrayRules[i][1])
    // console.log("estado",state)
    if (arrayRules[i][0] === state && arrayRules[i][1] === symbol) {
      return arrayRules[i];
    }
  }

  for (let i = 0; i < arrayRules.length; i++) {
    if ((arrayRules[i][1] === state || arrayRules[i][1] === '*') && (arrayRules[i][2] === symbol || arrayRules[i][2] === '*')) {
      return arrayRules[i];
    }
  }

  return null; // Pair not found
};

const filename = process.argv[2];

if (!filename) {
  console.log('Nenhum argumento foi passado.');
  console.log('Exemplo de uso: node turingMachine.js datafile');
  process.exit(1);
}

processFile(filename);