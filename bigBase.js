const file = process.argv[2];
const readline = require("readline");
const fs = require("fs");

const myInterface = readline.createInterface({
    input: fs.createReadStream(file)
});

myInterface.on("line", function (line) {
    return convertBase(line);
});

function convertBase(line) {
  let char = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  
}

