const fs = require('fs');
const readline = require('readline');

function countLines(filePath) {
  return new Promise((resolve, reject) => {
    let lineCount = 0;

    const stream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity
    });

    rl.on('line', () => {
      lineCount++;
    });

    rl.on('close', () => {
      resolve(lineCount);
    });

    stream.on('error', (error) => {
      reject(error);
    });
  });
}

function getLines(filePath, startLine, endLine) {
  return new Promise((resolve, reject) => {
    let lines = [];
    let lineCount = 0;

    const stream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      lineCount++;
      if (lineCount >= startLine && lineCount <= endLine) {
        lines.push(line);
      }
    });

    rl.on('close', () => {
      resolve(lines);
    });

    stream.on('error', (error) => {
      reject(error);
    });
  });
}

async function printLines(filePath, lineCount) {
  const batchSize = 1000000; // Define o tamanho do lote para impressão

  for (let start = lineCount; start > 0; start -= batchSize) {
    const end = Math.max(start - batchSize + 1, 1);
    try {
      const lines = await getLines(filePath, end, start);
      lines.reverse(); // Inverte as linhas para manter a ordem correta
      console.log(lines.join('\n')); // Imprime as linhas juntas
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

async function processFile(filePath) {
  try {
    const lineCount = await countLines(filePath);
    await printLines(filePath, lineCount);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Verifica se o arquivo foi passado como argumento na linha de comando
const filePath = process.argv[2];
if (!filePath) {
  console.error('Error: File path not provided. To run the program correctly, use "node unixTac.js 1GB.txt". You can replace 1GB.txt with any txt file you like.');
  process.exit(1);
}

processFile(filePath);
