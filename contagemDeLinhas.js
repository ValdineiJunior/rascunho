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
      if (lineCount % 1000000 === 0) {
        console.log(`Processed ${lineCount} lines`);
      }
    });

    rl.on('close', () => {
      resolve(lineCount);
    });

    stream.on('error', (error) => {
      reject(error);
    });
  });
}

const filePath = 'input.txt';

countLines(filePath)
  .then((lineCount) => {
    console.log(`Total number of lines: ${lineCount}`);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
