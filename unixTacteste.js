const readline = require('readline');
const fs = require('fs');
const crypto = require('crypto');

async function tac(fileName) {
  const fileStream = fs.createReadStream(fileName);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const hash = crypto.createHash('md5');
  let lineCount = 0;

  for await (const line of rl) {
    hash.update(line + '\n');
    lineCount++;

    if (lineCount >= 10000) {
      lineCount = 0;
    }
  }

  console.log(hash.digest('hex'));
}

// Uso: node tac.js arquivo
const fileName = process.argv[2];
tac(fileName);
