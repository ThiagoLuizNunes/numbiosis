function underIndex(letter, index) {
  return letter + "_{" + index + "}";
}

function maTex(matrix, prefix = "") {
  let rows = [];

  matrix.forEach(element => {
    rows.push(element.join(" & "));
  });

  return katex.renderToString(
    prefix + "\\begin{pmatrix} " + rows.join("\\\\") + "\\end{pmatrix}"
  );
}

function negative(value) {
  if (value < 0) {
    return "(" + value + ")";
  }

  return value;
}
