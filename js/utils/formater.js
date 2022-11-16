export const toCurrency = (number, simbol = "") => {
    let result= new Intl.NumberFormat('es-CO').format(number); 
    return `${simbol}${result}`;
}