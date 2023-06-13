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
  console.table(arrayRules)
}

const filename = process.argv[2];

if (!filename) {
  console.log('Nenhum argumento foi passado.');
  console.log('Exemplo de uso: node turingMachine.js datafile');
  process.exit(1);
}

processFile(filename);
