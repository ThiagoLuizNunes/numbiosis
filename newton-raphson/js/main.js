function newtonRaphson(f, xk, tol, N) {
    /* 
        Params:
            f -> Função em string
            xk -> Chute inicial
            tol -> Tolerância de erro
            N -> Quantidade máxima de iterações
    */

    // Adicionar a chamada do método correspondente de Math
    f = f.replace(/(cos|sin|tan|exp)/, 'Math.$1');

    // Expressão regular para isolar a variável da função
    let regexVar = /([a-zA-Z][\w]*) ?([\+\-\/*]|$|\))/

    let variavel = regexVar.exec(f);

    // Caso não encontre a variável
    if (!variavel) {
        alert('Não foi possível encontrar a variável!');
    }

    // Remove símbolos
    variavel = variavel[0].replace(/\W+/, '');

    tol = parseFloat(tol).toFixed(20);
    // Criando uma arrow function a partir da string
    f = eval('(' + variavel + ') => ' + f);

    // Verficar se a função foi escrita corretamente
    try {
        f(1)
    } catch (Error) {
        alert("A função não está correta!");
        return;
    }

    // derivada da função
    let f_ln = getDerivada(f);

    // calculo o primeiro ponto
    let xk_ln = xk - (f(xk) / f_ln(xk));
    let fxk_ln = f(xk_ln);
    
    console.log("(k = " + 0 + ") f(xk+1)=  " + fxk_ln + " | xk+1= " + xk_ln);

    let k = 1;

    // variáveis para guardarem todos os pontos achados
    let xk_s = [xk, xk_ln];
    let fxk_s = [f(xk), fxk_ln];

    while ((Math.abs(xk - xk_ln) > tol) && (k < N)) {
        xk = xk_ln
        xk_ln = xk - (f(xk) / f_ln(xk))
        xk_s.push(xk_ln);
        fxk_s.push(f(xk_ln));

        console.log("(k = " + k + ") f(xk+1)=  " + fxk_ln + " | xk+1= " + xk_ln);
        k++;
    }

    return ({x: xk_ln, xk_s: xk_s, fxk_s: fxk_s});
}

function getDerivada(f) {
    let h = 0.001
    return (x) => (f(x + h) - f(x - h)) / (2 * h);
}