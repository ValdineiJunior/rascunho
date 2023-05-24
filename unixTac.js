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

function getLine(filePath, lineNumber) {
  return new Promise((resolve, reject) => {
    let linesForPrinting = 0;
    let desiredLine = null;

    const stream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      linesForPrinting++;
      if (linesForPrinting === lineNumber) {
        desiredLine = line;
      }
    });

    rl.on('close', () => {
      resolve(desiredLine);
    });

    stream.on('error', (error) => {
      reject(error);
    });
  });
}

async function printLinesRecursive(filePath, lineNumber) {
  if (lineNumber <= 0) {
    return;
  }

  try {
    const desiredLine = await getLine(filePath, lineNumber);
    console.log(desiredLine);
    await printLinesRecursive(filePath, lineNumber - 1);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function processFile(filePath) {
  try {
    const lineCount = await countLines(filePath);
    await printLinesRecursive(filePath, lineCount);
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
