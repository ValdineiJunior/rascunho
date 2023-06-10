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

  // Faça algo com as linhas filtradas e os campos separados
  arrayRules = [[]]
  for (const line of filteredLines) {
    const { current_state, current_symbol, new_symbol, direction, new_state } = line;
    // ... faça algo com cada variável separada
    arrayRules.push([current_state, current_symbol, new_symbol, direction, new_state])
    // console.log(current_state, current_symbol, new_symbol, direction, new_state);
  }
  console.table(arrayRules)

  // Resto da lógica da turningMachine...
}

const filename = process.argv[2];
processFile(filename);
