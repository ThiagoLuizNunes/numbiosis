function pontosFlutuantes(base, precisao, underflow, overflow) {
    let valoresBase = [];
    let valores = [];

    getValoresBase(valoresBase, precisao);

    //console.log(valoresBase)
    // Gerar todos os valores positivos e negativos possíves no intervalor de underflow a overflow
    for(let i = underflow; i <= overflow; i++) {
        valoresBase.forEach((value) => {
            // converte o valor em string para float e mútiplica pela base elevada ao expoente atual
            let valorFloat = parseFloat(value) * base**(i);
            
            // guarda o valor positivo
            valores.push(valorFloat);

            // guarda o valor negativo
            valores.push((-1) * valorFloat);
        })
    }

    // Remover valores repetidos
    // Ex: originalmente são gerados valores como: 0.1, 0.10, 0.100, que acabam virando o mesmo valor
    valores = valores.filter((value, index, self) => {
        return self.indexOf(value) == index;
    })

    return valores;
}

// usa recursão para gerar os valores decimais possíveis, em módulo, no sistema
function getValoresBase(valoresBase, precisao, inicial='') {
    // condição de parada
    // caso já tenha chegado no valor limite da precisão do sistema
    if(inicial.length > precisao) {
        return;
    }

    // guarda o valor a iteração
    valoresBase.push("0." + inicial)

    if(inicial.length == 0) {
        // para os primeiros dígitos
        // vão de 1 a 9
        // 0.1, 0.2, ... , 0.9
        for(let i = 1; i < 10; i++) {
            getValoresBase(valoresBase, precisao, inicial + i);
        }

    } else {
        // para o segundo dígito em diante
        // 0.1i0, 0.1i1), 0.1i2, ..., 0.1i9, 0.1(i+1)0,...
        for(let i = 0; i < 10; i++) {
            getValoresBase(valoresBase, precisao, inicial + i);
        }
    }
    
}
