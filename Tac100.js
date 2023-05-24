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
    const lines = [];
    let currentLine = 0;

    const stream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      currentLine++;
      if (currentLine >= startLine && currentLine <= endLine) {
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

function reverseLines(lines) {
  return lines.reverse();
}

async function printLinesRecursive(filePath, startLine, endLine) {
  if (startLine <= 0) {
    return;
  }

  try {
    const lines = await getLines(filePath, startLine, endLine);
    const reversedLines = reverseLines(lines);
    console.log(reversedLines.join('\n'));
    await printLinesRecursive(filePath, startLine - 100, endLine - 100);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function processFile(filePath) {
  try {
    const lineCount = await countLines(filePath);
    await printLinesRecursive(filePath, lineCount, lineCount);
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
