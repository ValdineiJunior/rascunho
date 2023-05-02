function solution(inputString) {
    let outputString = "";
    for (let index = 0; index < inputString.length; index++) {
        const element = inputString[index];
        let newChar = (element.charCodeAt(0) + 1);
        if (newChar === 123) {
            newChar = 97;
        }
        outputString += String.fromCharCode(newChar);
    }
    return outputString;
}

const inputString = "crazy";
solution(inputString);
