const fs = require("fs");

function readFractions(path) {
    fs.readFile(path, "utf-8", function (error, data) {
        if (error) {
            console.log("erro de leitura: " + error.message);
        } else {
            let expressoesNumericas;
            if ((/(\r)/.test(data))) {
                expressoesNumericas = data.split("\r\n");
            } else {
                expressoesNumericas = data.split("\n");
            }
            expressoesNumericas = expressoesNumericas.slice(0, -1);
            for (let index = 0; index < expressoesNumericas.length; index++) {
                const element = expressoesNumericas[index];
                const expressao = element.split(" ").join("").split(/(\d|\(|\))/);
                expressao.shift();
                expressao.pop();
                expressao.forEach(function (item, i) { if (item === "") expressao[i] = "c"; });
                console.log(verificaSeTemParentes(expressao));
            }
        }
    });
}

function verificaSeTemParentes(expressao) {
    const lastIndexCloseParentheses = expressao.findIndex((elemenet) => elemenet === ")");
    const firstIndexOpenParentheses = expressao.slice(0, lastIndexCloseParentheses).findLastIndex((elemenet) => elemenet === "(");
    if (firstIndexOpenParentheses !== -1 && lastIndexCloseParentheses !== -1) {
        const expressaoInterna = expressao.slice(firstIndexOpenParentheses + 2, lastIndexCloseParentheses - 1);
        const result = verificaSeTemParentes(expressaoInterna);
        expressao.splice(firstIndexOpenParentheses, lastIndexCloseParentheses - firstIndexOpenParentheses + 1, result.toString());
        verificaSeTemParentes(expressao);
    }
    const eDivididoPorZero = RegExp("/0").test(expressao.join(""));
    if (eDivididoPorZero) {
        return "ERR DIVBYZERO";
    } else {
        resolverExpressao(expressao);
        if (expressao.length > 1 | isNaN(expressao[0])) {
            return "ERR SYNTAX";
        } else {
            return expressao[0];
        }
    }
}

function resolverExpressao(expressao) {
    expressao = existeOOperadorNaExpressão(expressao, "c");
    expressao = existeOOperadorNaExpressão(expressao, "^");
    expressao = existeOOperadorNaExpressão(expressao, "/");
    expressao = existeOOperadorNaExpressão(expressao, "*");
    expressao = existeOOperadorNaExpressão(expressao, "+");
    expressao = existeOOperadorNaExpressão(expressao, "-");
    return expressao;
}

function existeOOperadorNaExpressão(expressao, operador) {
    while (expressao.findIndex((elemenet) => elemenet === operador) !== -1) {
        expressao = calculo(expressao, operador);
    }
    return expressao;
}

function calculo(expressao, operador) {
    const indexSum = expressao.findIndex((elemenet) => elemenet === operador);
    if (indexSum > 0 && indexSum < (expressao.length - 1)) {
        switch (operador) {
        case "c": {
            const concatena = expressao[indexSum - 1] + expressao[indexSum + 1];
            expressao.splice(indexSum - 1, 3, concatena.toString());
            break;
        }
        case "^": {
            const eleva = expressao[indexSum - 1] ** expressao[indexSum + 1];
            expressao.splice(indexSum - 1, 3, eleva.toString());
            break;
        }
        case "*": {
            const multiplica = parseInt(expressao[indexSum - 1]) * parseInt(expressao[indexSum + 1]);
            expressao.splice(indexSum - 1, 3, multiplica.toString());
            break;
        }
        case "/": {
            const divide = parseInt(expressao[indexSum - 1]) / parseInt(expressao[indexSum + 1]);
            expressao.splice(indexSum - 1, 3, divide.toString());
            break;
        }
        case "+": {
            const soma = parseInt(expressao[indexSum - 1]) + parseInt(expressao[indexSum + 1]);
            expressao.splice(indexSum - 1, 3, soma.toString());
            break;
        }
        case "-": {
            const subtrai = parseInt(expressao[indexSum - 1]) - parseInt(expressao[indexSum + 1]);
            expressao.splice(indexSum - 1, 3, subtrai.toString());
            break;
        }
        }
    }
    return expressao;
}
readFractions("./d14.txt");
