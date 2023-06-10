const fs = require('fs');

if (process.argv.length !== 4) {
  console.error('Por favor, insira dois arquivos como argumentos.');
  process.exit(1);
}

const file1 = process.argv[2];
const file2 = process.argv[3];

// Função para ler um arquivo e retornar seu conteúdo como uma Promise
function readFilePromise(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

// Lê os dois arquivos
Promise.all([readFilePromise(file1), readFilePromise(file2)])
  .then(([content1, content2]) => {
    console.log(file1)
  })
  .catch((err) => {
    console.error('Erro ao ler os arquivos:', err);
  });
