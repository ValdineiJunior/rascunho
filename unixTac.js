const fs = require('fs');

if (process.argv.length < 3) {
  console.log('É necessário fornecer o nome do arquivo como parâmetro.');
  console.log('Exemplo: node unixTac.js mini1GB.txt');
  process.exit(1);
}

const inputFile = process.argv[2];

const stream = fs.createReadStream(inputFile, { encoding: 'utf8' });

stream.on('data', (chunk) => {
  const lines = chunk.split('\n');
  const lastLines = lines.slice(-101);
  const firstLines = lines.slice(0, -101);

  for (let i = lastLines.length - 1; i >= 0; i--) {
    console.log(lastLines[i]);
  }

  for (let i = firstLines.length - 1; i >= 0; i--) {
    console.log(firstLines[i]);
  }
});

stream.on('error', (error) => {
  console.error('Ocorreu um erro ao ler o arquivo:', error);
});
