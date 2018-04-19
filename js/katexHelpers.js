function underIndex(letter, index) {
  return (
    "\\raisebox{0.25em}{" +
    letter +
    "}\\tiny " +
    index +
    "\\normalsize \\raisebox{0em}{}"
  );
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
