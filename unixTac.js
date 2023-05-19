const readline = require('readline');
const fs = require('fs');

async function tac(fileName) {
  const fileStream = fs.createReadStream(fileName);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lines = [];
  let lineCount = 0;

  for await (const line of rl) {
    lines.unshift(line);
    lineCount++;

    if (lineCount >= 10000) {
      lines.forEach((line) => console.log(line));
      lines = [];
      lineCount = 0;
    }
  }

  // Imprimir as linhas restantes
  lines.forEach((line) => console.log(line));
}

// Uso: node tac.js arquivo
const fileName = process.argv[2];
tac(fileName);
