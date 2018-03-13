const intToHexa = {10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F'};
const hexaToInt = {'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15};

// Classe pai para conversão

class Conversor{
    convert (number, tgtBase) {
        let dot = number.indexOf(".");
        let negative = '';

        if(number[0] === '-') {
            negative = '-';
            number = number.slice(1);
        }

        if (dot < 0) {
            return negative + this.intPart(number, tgtBase);
        } else {
            return negative
                   + (this.intPart(number.slice(0, dot), tgtBase)
                   + this.floatPart(number.slice(dot+1), tgtBase));
        }
    }

    intPar(number, tgtBase) {       
    }

    floatPart(number, tgtBase) {
    }
}

// DECIMAL

class Decimal extends Conversor{

    constructor() {
        super();
        this.re = new RegExp('^-?[0-9]+\.?[0-9]*$');
    }

    convert(number, tgtBase) {
        if(this.re.exec(number)){
            return super.convert(number, tgtBase);
        } else {
            return "";
        }
    }

    intPart (number, tgtBase) {
        let num = parseInt(number);
        let values = [];

        while (num >= tgtBase) {
            values.push(num % tgtBase);
            num = Math.floor(num / tgtBase);
        }

        values.push(num);

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

        return values ? values.reverse().join('') : '';
    }

    floatPart (number, tgtBase) {
        let floatNumber = parseFloat("0." + number);
        let cont = 0;
        let value = ""

        while(cont++ < 15 && (floatNumber > 0 && floatNumber < 1)){
            floatNumber = floatNumber * tgtBase;
            let intValue = Math.floor(floatNumber);
            floatNumber -= intValue;

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
        this.decimalObj = new Decimal();
        this.re = new RegExp('^-?[0-1]+\.?[0-1]*$');
    }

    convert(number, tgtBase) {
        if(this.re.exec(number)){
            return super.convert(number, tgtBase);
        } else {
            return "";
        }
    }

    intPart (number, tgtBase) {
        switch(tgtBase) {
            case 8:
            case 16:
                let dec = this.binToDecimal(number);
                console.log("DEC: " + dec);
                console.log("OUTRO: " + this.decimalObj.convert(dec.toString(), tgtBase))
                return dec 
                       ? this.decimalObj.convert(dec.toString(), tgtBase)
                       : "0";

            case 10:
                let ret = this.binToDecimal(number);

                return ret ? ret : "0";
        }
    }

    floatPart (number, tgtBase) {
        switch(tgtBase) {
            case 8:
            case 16:
                let dec = this.floatBinToDecimal(number).toString();

                if(dec !== "0") {
                    let index = dec.indexOf('.')
                    dec = dec.slice(index + 1);

                    return this.decimalObj.floatPart(dec, tgtBase);
                }
                
                return "";

            case 10:
                let ret = this.floatBinToDecimal(number).toString();
                
                if(ret !== '0')
                    ret = '.' + ret.slice(ret.indexOf('.') + 1)

                return ret !== "0" ? ret : "";
        }
    }

    binToDecimal (number) {
        let revNumber = number.split('').reverse();
        let decimal = 0;

        for(let index = 0; index < revNumber.length; index++){
            if(revNumber[index] === '1') {
                decimal += Math.pow(2, index);
            }
        }
        return decimal;
    }

    floatBinToDecimal (number) {
        let numberList = number.split('');
        let decimal = 0;

        for(let index = 0; index < numberList.length; index++) {
            if(numberList[index] === '1') {
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
        this.re = new RegExp('^-?[0-7]+\.?[0-7]*$');
    }

    convert(number, tgtBase) {
        if(this.re.exec(number)){
            return super.convert(number, tgtBase);
        } else {
            return "";
        }
    }

    intPart (number, tgtBase) {

        switch(tgtBase) {
            case 2:
            case 16:
                let dec = this.octToDecimal(number);

                return dec
                        ? this.decimalObj.convert(dec.toString(), tgtBase)
                        : "0";

            case 10:
                let ret = this.octToDecimal(number);

                return ret ? ret : "0";
        }
    }

    floatPart (number, tgtBase) {

        switch(tgtBase) {
            case 2:
            case 16:
                let dec = this.floatOctalToDecimal(number).toString();
                if(dec !== '0') {
                    let index = dec.indexOf('.')
                    dec = dec.slice(index + 1);
    
                    return this.decimalObj.floatPart(dec, tgtBase);
                } else {
                    return "";
                }
            case 10:
                let ret = this.floatOctalToDecimal(number).toString();

                if (ret !== '0')
                    ret = '.' + ret.slice(ret.indexOf('.') + 1)

                return ret !== "0" ? ret : "";
        }
        
    }

    octToDecimal(number) {
        let reverseNumber = number.split('').reverse();
        let cont = 0;

        for(let index = 0; index < number.length; index++) {
            cont += parseInt(reverseNumber[index]) * Math.pow(8, index);
        }

        return cont;
    }

    floatOctalToDecimal (number) {
        let numberList = number.split('');
        let decimal = 0;

        for(let index = 0; index < numberList.length; index++) {
            decimal += parseInt(numberList[index]) * Math.pow(8, (-1) * (index + 1))
        }

        return decimal;
    }

}

// HEXADECIMAL

class Hexadecimal extends Conversor{

    constructor() {
        super();
        this.decimalObj = new Decimal();
        this.re = new RegExp('^-?([0-9]|[a-fA-F])+\.?([0-9]|[a-fA-F])*$');
    }

    convert(number, tgtBase) {
        if(this.re.exec(number)){
            return super.convert(number, tgtBase);
        } else {
            return "";
        }
    }

    intPart (number, tgtBase) {

        number = number.toUpperCase();

        switch(tgtBase) {
            case 2:
            case 8:
                let dec = this.hexaToDecimal(number);
                return dec 
                        ? this.decimalObj.convert(dec.toString(), tgtBase)
                        : "0";
            
            case 10:
                let ret = this.hexaToDecimal(number);

                return ret ? ret : "0";
        }
    }

    floatPart (number, tgtBase) {

        number = number.toUpperCase();

        switch(tgtBase) {
            case 2:
            case 8:
                let dec = this.floatHexaToDecimal(number).toString();

                if(dec !== "0"){
                    let index = dec.indexOf('.')
                    dec = dec.slice(index + 1);

                    return this.decimalObj.floatPart(dec, tgtBase);
                }

                return "";
                
            case 10:
                let ret = this.floatHexaToDecimal(number).toString();
                
                if (ret !== '0')
                    ret = '.' + ret.slice(ret.indexOf('.') + 1)

                return ret !== '0' ? ret : "";
        }
    }

    hexaToDecimal(number) {
        let reverseNumber = number.split('').reverse();
        let cont = 0;

        for(let index = 0; index < number.length; index++) {
            let value = 0;

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
        let numberList = number.split('');
        let decimal = 0;

        for(let index = 0; index < numberList.length; index++) {
            let val = parseInt(numberList[index]);
            if(hexaToInt[numberList[index]]) {
                val = hexaToInt[numberList[index]]
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