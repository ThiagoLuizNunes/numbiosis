const intToHexa = {10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F'};
const hexaToInt = {'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15};

// Classe pai para conversão

class Conversor{
    preProcessing(number) {
        // remove as vígulas no número, o js estava considerando , e . para valores decimais
        return number.replace(new RegExp(',', 'g'),'');
    }

    check(number) {
        // verifica se o número é valido naquela base através a espressão regular
        return this.getRegex().exec(number)
               ? true
               : false
    }

    convert (number, tgtBase) {

        number = this.preProcessing(number);
        
        if(!this.check(number)){
            return '';
        }

        let dot = 0;
        let negative = '';

        if(number[0] === '-') {
            // verigica se o número é negativo
            // guarda o sinal negativo para o valor final
            negative = '-';
            number = number.slice(1);
        }

        // busca o índice do '.' para fazer divisão entre
        // parte inteira e decimal
        dot = number.indexOf(".");

        if (dot < 0) {
            // apenas parte inteira
            return negative + this.intPart(number, tgtBase);
        } else {
            // parte inteira e decimal
            return negative
                   + (this.intPart(number.slice(0, dot), tgtBase)
                   + this.floatPart(number.slice(dot+1), tgtBase));
        }
    }

    getRegex(){
        // retorna a expressão regular usada na base numérica
    }

    intPar(number, tgtBase) {
        // método para conversão da parte inteira do número para uma base
    }

    floatPart(number, tgtBase) {
        // método para conversão da parte decimal do número para uma base
    }
}

// DECIMAL

class Decimal extends Conversor{

    getRegex() {
        return new RegExp('^-?[0-9]+\.?[0-9]*$');
    }

    intPart (number, tgtBase) {
        let num = parseInt(number);
        let values = [];

        // fazer a divisões pela base algo e guardar o resto da divisão
        while (num >= tgtBase) {
            values.push(num % tgtBase);
            num = Math.floor(num / tgtBase);
        }

        // quando o valor for menor que a base, guarda o próprio valor
        values.push(num);

        // para da base 16 são feitas as conversões de número para as letras
        if( tgtBase == 16 ) {
            for(let index = 0; index < values.length; index++ ) {
                try {
                    if(intToHexa[values[index]]){
                        values[index] = intToHexa[values[index]];
                    }
                } catch(err) {
                    console.log(err)
                }
            }
        }

        // retorna o array de valores da divisão invertido
        return values ? values.reverse().join('') : '';
    }

    floatPart (number, tgtBase) {
        let floatNumber = parseFloat("0." + number);
        let cont = 0;
        let value = ""

        // faz sucessivas multiplicações no valor decimal pela base
        // guardando a parte inteira de cada múltiplicação
        // limita as mútiplicações em 20 para uma dízima periódica não deixar em loop infinito
        while(cont++ < 20 && (floatNumber > 0 && floatNumber < 1)){
            floatNumber = floatNumber * tgtBase;
            let intValue = Math.floor(floatNumber);
            floatNumber -= intValue;

            // faz a devida conversão de número para letra na base 16
            if (tgtBase == 16) {
                if(intToHexa[intValue]) {
                    intValue = intToHexa[intValue];
                }
            }
            value += intValue;
        }

        return value ? "." + value : "";
    }
}

// BINÁRIO

class Binary extends Conversor{
    constructor() {
        super();
        // cria um objeto para conversão de números na base decimal
        this.decimalObj = new Decimal();
    }

    getRegex() {
        return new RegExp('^-?[0-1]+\.?[0-1]*$');
    }

    intPart (number, tgtBase) {
        switch(tgtBase) {
            case 8:
            case 16:
                // converte o número para decimal
                let dec = this.binToDecimal(number);

                // retorna o valor em decimal convertido para a base desejada
                return dec 
                       ? this.decimalObj.convert(dec.toString(), tgtBase)
                       : "0";

            case 10:
                // converte para decimal
                let ret = this.binToDecimal(number);

                return ret ? ret : "0";
        }
    }

    floatPart (number, tgtBase) {
        switch(tgtBase) {
            case 8:
            case 16:
                // convete para a bas decimal
                let dec = this.floatBinToDecimal(number).toString();

                if(dec != 0) {
                    let index = dec.indexOf('.')
                    dec = dec.slice(index + 1);

                    return this.decimalObj.floatPart(dec, tgtBase);
                }
                
                return "";

            case 10:
                let ret = this.floatBinToDecimal(number).toString();

                if(ret != 0)
                    ret = '.' + ret.slice(ret.indexOf('.') + 1)

                return ret != 0 ? ret : "";
        }
    }

    binToDecimal (number) {
        // inverte a ordem dos dígitos
        let revNumber = number.split('').reverse();
        let decimal = 0;

        // converte a parte inteira em binário para a base 10
        for(let index = 0; index < revNumber.length; index++){
            if(revNumber[index] === '1') {
                decimal += Math.pow(2, index);
            }
        }
        return decimal;
    }

    floatBinToDecimal (number) {
        let decimal = 0;

        // converte a parte decimal em binário para a base 10
        for(let index = 0; index < number.length; index++) {
            if(number[index] === '1') {
                decimal += Math.pow(2, (-1) * (index + 1))
            }
        }

        return decimal;
    }
}

// OCTAL

class Octal extends Conversor{

    constructor() {
        super();
        this.decimalObj = new Decimal();
    }

    getRegex() {
        return new RegExp('^-?[0-7]+\.?[0-7]*$');
    }

    intPart (number, tgtBase) {

        switch(tgtBase) {
            case 2:
            case 16:
                // converte para a base 10
                let dec = this.octToDecimal(number);

                // converte da base 10 para a base desejada
                return dec
                        ? this.decimalObj.convert(dec.toString(), tgtBase)
                        : "0";

            case 10:
                // converte para decimal
                let ret = this.octToDecimal(number);

                return ret ? ret : "0";
        }
    }

    floatPart (number, tgtBase) {

        switch(tgtBase) {
            case 2:
            case 16:
                // converte da base 8 para a base 10
                let dec = this.floatOctalToDecimal(number).toString();

                if(dec != 0) {
                    // converte da base 10 para a base desejada
                    let index = dec.indexOf('.')
                    dec = dec.slice(index + 1);
    
                    return this.decimalObj.floatPart(dec, tgtBase);
                } else {
                    return "";
                }

            case 10:
            // converte da base 8 para a base 10
                let ret = this.floatOctalToDecimal(number).toString();

                if (ret != 0)
                    ret = '.' + ret.slice(ret.indexOf('.') + 1)

                return ret != 0 ? ret : "";
        }
        
    }

    octToDecimal(number) {
        // inverte a ordem dos dígitos
        let reverseNumber = number.split('').reverse();
        let cont = 0;

        // converte a parte inteira em octal para a base 10
        for(let index = 0; index < number.length; index++) {
            cont += parseInt(reverseNumber[index]) * Math.pow(8, index);
        }

        return cont;
    }

    floatOctalToDecimal (number) {
        let decimal = 0;

        // converte a parte decimal em octal para a base 10
        for(let index = 0; index < number.length; index++) {
            decimal += parseInt(number[index]) * Math.pow(8, (-1) * (index + 1))
        }

        return decimal;
    }

}

// HEXADECIMAL

class Hexadecimal extends Conversor{

    constructor() {
        super();
        this.decimalObj = new Decimal();
    }

    getRegex() {
        return new RegExp('^-?([0-9]|[a-fA-F])+\.?([0-9]|[a-fA-F])*$');
    }

    intPart (number, tgtBase) {
        // converte as letras para maíusculo
        number = number.toUpperCase();

        switch(tgtBase) {
            case 2:
            case 8:
                // converte da base 16 para a base 10
                let dec = this.hexaToDecimal(number);

                // converte da base 10 para a base desejada
                return dec 
                        ? this.decimalObj.convert(dec.toString(), tgtBase)
                        : "0";
            
            case 10:
                // converte da base 16 para a base 10
                let ret = this.hexaToDecimal(number);

                return ret ? ret : "0";
        }
    }

    floatPart (number, tgtBase) {
        // converte as letras para maiúsculo
        number = number.toUpperCase();

        switch(tgtBase) {
            case 2:
            case 8:
                // converte da base 16 para a base 10
                let dec = this.floatHexaToDecimal(number).toString();

                if(dec != 0){
                    let index = dec.indexOf('.')
                    dec = dec.slice(index + 1);

                    return this.decimalObj.floatPart(dec, tgtBase);
                }

                return "";
                
            case 10:
                let ret = this.floatHexaToDecimal(number).toString();
                
                if (ret != 0)
                    ret = '.' + ret.slice(ret.indexOf('.') + 1)

                return ret != 0 ? ret : "";
        }
    }

    hexaToDecimal(number) {
        // inverte a ordem dos dígitos
        let reverseNumber = number.split('').reverse();
        let cont = 0;

        // converte a parte inteira da base 16 para a base 10
        for(let index = 0; index < number.length; index++) {
            let value = 0;
            
            // faz a conversão de letra para número antes de converter para a base 10
            if(hexaToInt[reverseNumber[index]]) {
                value = hexaToInt[reverseNumber[index]];
            } else {
                value = parseInt(reverseNumber[index]);
            }

            cont += value * Math.pow(16, index);
        }

        return cont;
    }

    floatHexaToDecimal (number) {
        let decimal = 0;

        // convrete a parte decimal da base 16 para a base 10
        for(let index = 0; index < number.length; index++) {
            let val = 0;

            // converte a letra para o número correspondente
            if(hexaToInt[number[index]]) {
                val = hexaToInt[number[index]]
            } else {
                val = parseInt(number[index]);
            }

            decimal += val * Math.pow(16, (-1) * (index + 1))
        }

        return decimal;
    }
}

// Constantes

const decimal = new Decimal();
const bin = new Binary();
const oct = new Octal();
const hexa = new Hexadecimal();


/* CHANGE HANDLERS */

function changeDecimal() {
    console.log(document.getElementById('decimalInput').value)
    let number = document.getElementById('decimalInput').value;

    if(document.getElementById('decimalInput').value){
        document.getElementById('binaryInput').value = decimal.convert(number, 2);
        document.getElementById('octalInput').value = decimal.convert(number, 8);
        document.getElementById('hexaInput').value = decimal.convert(number, 16);
    } else {
        document.getElementById('binaryInput').value =
        document.getElementById('octalInput').value =
        document.getElementById('hexaInput').value = "";
    }
}

function changeBinary() {
    console.log(document.getElementById('binaryInput').value)
    let number = document.getElementById('binaryInput').value;

    if(document.getElementById('binaryInput').value){
        document.getElementById('decimalInput').value = bin.convert(number, 10);
        document.getElementById('octalInput').value = bin.convert(number, 8);
        document.getElementById('hexaInput').value = bin.convert(number, 16);
    } else {
        document.getElementById('decimalInput').value = 
        document.getElementById('octalInput').value = 
        document.getElementById('hexaInput').value = "";
    }
}

function changeOctal() {
    console.log(document.getElementById('octalInput').value)
    let number = document.getElementById('octalInput').value;

    if(document.getElementById('octalInput').value){
        document.getElementById('decimalInput').value = oct.convert(number, 10);
        document.getElementById('binaryInput').value = oct.convert(number, 2);
        document.getElementById('hexaInput').value = oct.convert(number, 16);
    } else {
        document.getElementById('decimalInput').value = 
        document.getElementById('binaryInput').value = 
        document.getElementById('hexaInput').value = "";
    }
}

function changeHexa() {
    console.log(document.getElementById('hexaInput').value)
    let number = document.getElementById('hexaInput').value;

    if(document.getElementById('hexaInput').value){
        document.getElementById('decimalInput').value = hexa.convert(number, 10);
        document.getElementById('binaryInput').value = hexa.convert(number, 2);
        document.getElementById('octalInput').value = hexa.convert(number, 8);
    } else {
        document.getElementById('decimalInput').value = 
        document.getElementById('binaryInput').value =
        document.getElementById('octalInput').value = "";
    }
}