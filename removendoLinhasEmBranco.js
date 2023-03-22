const file = process.argv[2];
const readline = require("readline");
const fs = require("fs");
let tasks = []
const myInterface = readline.createInterface({
    input: fs.createReadStream(file)
});

myInterface.on("line", function (line) {
    if (line.length > 0) {
        line = `- [ ] ${line}`
        console.log(line)
    }
});
