function palindromicNumbers(firstNumber,lastNumber) {
    let rangeOfNumbersIntoString = [];
    for (let index = firstNumber; index <= lastNumber; index++) {
        rangeOfNumbersIntoString.push(index.toString());
    }
    function isAPalindrome(numberIntoString) {
        let stringInReverseOrder = '';
        [...numberIntoString].forEach(char => {
            stringInReverseOrder = `${char}${stringInReverseOrder}`
        });
        
        return numberIntoString === stringInReverseOrder 
    }

    let arrayPalindrome = rangeOfNumbersIntoString.filter(isAPalindrome)
    
    for (let index = 0; index < arrayPalindrome.length; index++) {
        console.log(parseInt(arrayPalindrome[index]))     
    }
}

palindromicNumbers(1,20)