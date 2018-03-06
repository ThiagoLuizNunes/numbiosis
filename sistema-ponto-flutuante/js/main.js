function pontosFlutuantes(base, precisao, underflow, overflow) {
    let valoresBase = [];
    let valores = [];

    getValoresBase('', valoresBase, precisao);

    // Gerar todos os valores positivos e negativos possíves no intervalor de underflow a overflow
    for(let i = underflow; i <= overflow; i++) {
        valoresBase.forEach((value) => {
            let valorFloat = parseFloat(value) * base**(i);
            valores.push(valorFloat);
            valores.push((-1) * valorFloat);
        })
    }

    // Remover valores repetidos
    valores = valores.filter((value, index, self) => {
        return self.indexOf(value) == index;
    })

    return valores;
}

function getValoresBase(inicial, valoresBase, precisao, next=0) {
    if(inicial.length > precisao) {
        return;
    }

    valoresBase.push("0." + inicial)

    if(inicial.length > 0) {
        for(let i = 0; i < 10; i++) {
            getValoresBase(inicial + i, valoresBase, precisao);
        }
    } else {
        for(let i = 1; i < 10; i++) {
            getValoresBase(inicial + i, valoresBase, precisao);
        }
    }
    
}
