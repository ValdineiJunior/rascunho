let data = []
let entradasTeste = '10 2 500'
let conversores = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
fetch('./baseconv.txt')
  .then(response => response.text())
  .then(text => {
    data = text.split("\n");
    console.log(data)
    let entrada = entradasTeste.split(" ")
    let baseEntrada = entrada[0]
    let baseSaida = entrada[1]
    let numero = entrada[2]
    console.log(baseEntrada,baseSaida,numero)
    let result = ''
    let resto = 0

    while ( numero > 0) {
      resto = numero%baseSaida
      console.log((numero- resto)/baseSaida)
      numero = (numero- resto)/baseSaida
      result = result + conversores[resto]
    }
    console.log(result)

    

   
    
    // while (numero > 0) {
      
    // }
    
  })