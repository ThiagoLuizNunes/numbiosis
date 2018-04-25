function underIndex(letter, index) {
  /*
    Retorna a letra os texto secundário subscrito
    Params:
      letter: texto principal
      index: texto secundário
  */
  return letter + "_{" + index + "}";
}

function maTex(matrix, prefix = "") {
  /*
    Retorna a matriz de entrada no formato de uma matriz na
    sintax do Latex
    Params:
      matrix: matriz de entrada
      prefix: prefixo colocado antes de apresentação da matrix
  */
  let rows = [];

  matrix.forEach(element => {
    rows.push(element.join(" & "));
  });

  return katex.renderToString(
    prefix + "\\begin{pmatrix} " + rows.join("\\\\") + "\\end{pmatrix}"
  );
}

function negative(value) {
  /*
    Para números negativos, se o número for negativo, retorna ele com parênteses
    Params:
      value: valor a ser avaliado
  */
  if (value < 0) {
    return "(" + value + ")";
  }

  return value;
}
