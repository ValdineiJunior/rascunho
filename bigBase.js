const base_entrada = process.argv[2];
const base_saida = process.argv[3];
const numero_entrada = process.argv[4];
const bases = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
const arrayBases = bases.split("")
numeroNaBaseDez = 0
expoente = numero_entrada.length - 1
for (let index = 0; index < numero_entrada.length; index++) {
  console.log(numero_entrada[index])
  const element = numero_entrada[index];
  baseElevada = 1
  for (let j = 0; j < expoente; j++) {
    baseElevada *= base_entrada
  }
  // console.log("element: ",element,"baseElevada",baseElevada)
  elementoNaBaseDez = arrayBases.findIndex((char => char === element))
  numeroNaBaseDez += elementoNaBaseDez * baseElevada
  expoente--
}

let result = ''
while (numeroNaBaseDez > 0) {
  numeroNaBaseDez
}
console.log(numeroNaBaseDez)
// numeroNaBaseDez = 1 * 2^3 + 0 * 2^2 + 1 * 2^1 + 1 * 2^0