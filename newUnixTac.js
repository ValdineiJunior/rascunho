const fs = require('fs');
const readline = require('readline');

if (process.argv.length < 3) {
  console.log('É necessário fornecer o nome do arquivo como parâmetro.');
  console.log('Exemplo: node unixTac.js mini1GB.txt');
  process.exit(1);
}

const inputFile = process.argv[2];
const lineCount = 13147026; // Número de linhas a serem lidas

const stream = fs.createReadStream(inputFile, { encoding: 'utf8' });
const rl = readline.createInterface({ input: stream });

const lines = [];

rl.on('line', (line) => {
  lines.push(line);

  if (lines.length > lineCount) {
    lines.shift(); // Remove a primeira linha se já tiver mais do que o necessário
  }
});

rl.on('close', () => {
  for (let i = lines.length - 1; i >= 0; i--) {
    console.log(lines[i]);
  }
});

stream.on('error', (error) => {
  console.error('Ocorreu um erro ao ler o arquivo:', error);
});
