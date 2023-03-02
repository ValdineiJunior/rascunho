const fs = require("fs");
const inputFile = process.argv[2];
let lineCount = 1; // 1GB.txt - 13147026 linhas
let i;
let firstLog = true;

const stream = fs.createReadStream(inputFile);
stream.on("data", chunk => {
    for (i = 0; i < chunk.length; ++i) {
		if (chunk[i] == 10) {lineCount++;}
	}
})
.on("end", () => loop());

const loop = () => {if (lineCount > 0) {readLine();}};

const rl = require("readline-specific");
const readLine = () => {
	rl.oneline(inputFile, lineCount, function(err, line) {
		if (err) {return console.error(err);}
		if (firstLog) {
			firstLog = false;
			process.stdout.write(line);
			lineCount--;
			loop();
		} else {
			extractingTitlesInTasks(line)
			lineCount--;
			loop();
		}
	});
};

function extractingTitlesInTasks(element) {
  const title = (/<title>/).test(element);
  if (title) {
    let cutTitle = `${element}`
    cutTitle = cutTitle.slice(7, cutTitle.length-8)
    cutTitle = `- [ ] ${cutTitle}`
    console.log(cutTitle.replaceAll('#',''));
  }
}
