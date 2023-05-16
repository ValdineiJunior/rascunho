const file = process.argv[2];
if (!file) {
    console.log('Você precisa fornecer um arquivo como argumento, utilize o arquivo teste "baseconv.txt"');
    process.exit(1);
}
const readline = require("readline");
const fs = require("fs");

const myInterface = readline.createInterface({
    input: fs.createReadStream(file)
});

myInterface.on("line", function (line) {
    return readBigBase(line);
});

function readBigBase(element) {
    const numbers = element.split(" ").splice(0, 3);
    return handleBigBase(numbers[0], numbers[1], numbers[2]);
}

const base = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
function handleBigBase(inputBase, outputBase, entryNumber) {
    const invalidBases =
        inputBase < 2 || inputBase > 62 || outputBase < 2 || outputBase > 62;
    const negativeNumber = parseInt(entryNumber) < 0;
    let InvalidNumberForInputBase = false;
    const ValidDigitsForInputBase = [...base.slice(0, inputBase)];
    for (let index = 0; index < entryNumber.length; index++) {
        const element = entryNumber[index];
        const digitBelongsToBase = ValidDigitsForInputBase.includes(element);
        if (!digitBelongsToBase) {
            InvalidNumberForInputBase = true;
            break;
        }
    }
    if (invalidBases || negativeNumber || InvalidNumberForInputBase) {
        return console.log("???");
    }
    let numberInBaseTen = convertingToDecimal(inputBase, entryNumber);
    const limit = BigInt(
        convertingToDecimal("62", "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
    );
    if (numberInBaseTen > limit) {
        return console.log("???");
    }
    let result = "";
    if (numberInBaseTen === 0n) {
        return console.log("0");
    }
    while (numberInBaseTen > 0) {
        const remainder = numberInBaseTen % BigInt(outputBase);
        result = base[remainder] + result;
        numberInBaseTen = (numberInBaseTen - remainder) / BigInt(outputBase);
    }
    return console.log(result);
}

function convertingToDecimal(inputBase, entryNumber) {
    const arrayBase = base.split("");
    let numberInBaseTen = 0n;
    let exponent = BigInt(entryNumber.length - 1);
    for (let index = 0; index < entryNumber.length; index++) {
        const element = entryNumber[index];
        let exponentiatedBase = 1n;
        for (let j = 0; j < exponent; j++) {
            exponentiatedBase *= BigInt(inputBase);
        }
        const elementInBaseTen = BigInt(
            arrayBase.findIndex((char) => char === element)
        );
        numberInBaseTen += elementInBaseTen * exponentiatedBase;
        exponent--;
    }
    return numberInBaseTen;
}
