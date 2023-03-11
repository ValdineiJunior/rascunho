const file = process.argv[2];
const readline = require("readline");
const fs = require("fs");
let tasks = []
const myInterface = readline.createInterface({
    input: fs.createReadStream(file)
});

myInterface.on("line", function (line) {
    const linha = extractingTitlesInTasks(line)
    const arquivo = './title.txt'
    writeOneMillionTimes(linha, arquivo, 'UTF-8')
    console.log(tasks)
});


function extractingTitlesInTasks(element) {
    const title = (/<title>/).test(element);
    if (title) {
      let cutTitle = `${element}`
      cutTitle = cutTitle.slice(7, cutTitle.length-8)
      cutTitle = `- [ ] ${cutTitle}`
      return (cutTitle.replaceAll('#',''));
    } else {
        return false
    }
}

function writeOneMillionTimes(writer, data, encoding, callback) {
    let i = 1000000;
    write();
    function write() {
      let ok = true;
      do {
        i--;
        if (i === 0) {
          // Last time!
          writer.write(data, encoding, callback);
        } else {
          // See if we should continue, or wait.
          // Don't pass the callback, because we're not done yet.
          ok = writer.write(data, encoding);
        }
      } while (i > 0 && ok);
      if (i > 0) {
        // Had to stop early!
        // Write some more once it drains.
        writer.once('drain', write);
      }
    }
  }