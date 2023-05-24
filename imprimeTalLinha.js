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
    let lineCount = 0;
    let desiredLine = null;

    const stream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: stream,
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      lineCount++;
      if (lineCount === lineNumber) {
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

const filePath = '1GB.txt';

countLines(filePath)
  .then((lineCount) => {
    let lineNumber = lineCount;

    function printLines(lineNumber) {
      if (lineNumber > 0) {
        getLine(filePath, lineNumber)
          .then((desiredLine) => {
            console.log(desiredLine);
            printLines(lineNumber - 1); // Chama a próxima linha recursivamente
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    }

    printLines(lineNumber); // Inicia a impressão recursiva
  })
  .catch((error) => {
    console.error('Error:', error);
  });

