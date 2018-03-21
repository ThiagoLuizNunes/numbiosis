function bissecao(f, a, b, tol, N){
    /* 
        Params:
            f -> Função em string
            a -> Limite A
            b -> Limite B
            tol -> Tolerância de erro
            N -> Quantidade máxima de iterações
    */

    /*
        Ex1:
            f -> -42 + 686.7*(1 - exp(-6*c/35))/c
            a -> 12
            b -> 16
            tol -> 1e-5
            N -> 100
        
        Ex2:
            f -> -0.016 + (x + 4)/((-2*x + 42)**2*(-x + 28))
            a -> 0
            b -> 20
            tol -> 5e-3
            N -> 100
    */
    
    // Adicionar a chamada do método correspondente de Math
    f = f.replace(/(cos|sin|tan|exp)/, 'Math.$1');

    // Expressão regular para isolar a variável da função
    let regexVar = /([a-zA-Z][\w]*) ?([\+\-\/\*]|$|\))/
    
    // tentativa de identificar a variável
    let variavel = regexVar.exec(f);

    // Caso não encontre a variável
    if(!variavel) {
        alert('Não foi possível encontrar a variável!');
    }

    // Remove símbolos inválidos da variável
    variavel = variavel[0].replace(/\W+/, '');

    // converte o erro para valor
    tol = parseFloat(tol).toFixed(20);

    // Criando uma arrow function a partir da string
    f = eval('('+ variavel +') => ' + f);

    // Verficar se a função foi escrita corretamente
    try {
        f(1)
    } catch (Error) {
        alert("A função não está correta!");
        return;
    }

    // Valor da função nos extremos
    let fa = f(a);
    let fb = f(b);

    // Verificando se os sinais do intervalo
    if(fa*fb > 0) {
        alert("A função deve ter sinais opostos em A e B!");
        return;
    }

    /*
        Flag para previnir a obtenção da raiz antes do
        intervalo ter sido suficiente reduzido
    */
    let done = false;

    // Bissecta o intervalo
    let xm = (a+b)/2;
    let i = 1;
    let fxm;

    let xm_s = [];
    let fxm_s = [];

    while ((Math.abs(a-b) > tol) && (!done || i < N)) {
        fxm = f(xm);
        xm_s.push(xm);
        fxm_s.push(fxm);

        console.log("(i = " + i + ") f(xm)=  " + fxm + " | f(a)= " + fa + " | f(b)= " + fb);

        if(fa*fxm < 0) {
            b = xm;
            fb = fxm;
            xm = (a+b)/2;
        } else if(fb*fxm < 0) {
            a = xm;
            fa = fxm;
            xm = (a+b)/2;
        } else {
            done = true;
        }

        i++;
    }

    console.log("Solução Encontrada: " + xm);

    return({xm: xm, xm_s: xm_s, fxm_s: fxm_s});
}