function quadratura(pointsNum) {
  addStep(
    (title = "Tabela de pontos e pesos para " + pointsNum + " pontos"),
    (equations = [katex.renderToString(quadTableGenerator(pointsNum))])
  );

  var quadEqSymbols = [];
  var quadEqValues = [];

  for (var i = 0; i < pointsNum; i++) {
    quadEqSymbols.push(underIndex("A", i) + "f(" + underIndex("x", i) + ")");
    quadEqValues.push(
      "(" +
        math.round(quadTable[pointsNum]["w"][i], 3) +
        ") f(" +
        math.round(quadTable[pointsNum]["x"][i], 3) +
        ")"
    );
  }

  addStep(
    (title = "Regra da Quadratura para o intervalo [-1,1]"),
    (equations = [
      katex.renderToString(
        "\\begin{gathered} " +
          "\\int^1_{-1} f(x) dx \\approx " +
          quadEqSymbols.join(" + ") +
          " \\\\ " +
          "\\approx " +
          quadEqValues.join(" + ") +
          " \\end{gathered}"
      )
    ])
  );

  addStep(
    (title = "Polinômio de Lagrange Associado"),
    (equations = [
      katex.renderToString(
        "\\begin{gathered} " + lagrange(pointsNum) + " \\end{gathered}"
      )
    ])
  );
}

function quadTableGenerator(pointsNum) {
  var rows = [[underIndex("x", "i")], [underIndex("A", "i")]];

  for (var i = 0; i < pointsNum; i++) {
    rows[0].push(math.round(quadTable[pointsNum]["x"][i], 3));
    rows[1].push(math.round(quadTable[pointsNum]["w"][i], 3));
  }

  rows = math.transpose(rows);

  for (var i = 0; i < rows.length; i++) {
    rows[i] = rows[i].join(" & ");
  }

  return (
    "\\begin{array}{c | c} " + rows.join(" \\\\ \\hline ") + "\\end{array}"
  );
}

function lagrange(num) {
  var pol =
    "P(x) = \\displaystyle\\sum_{i=1}^" +
    num +
    " " +
    underIndex("y", "i") +
    " " +
    underIndex("L", "i") +
    "=";
  var polBody = [];

  for (var i = 1; i <= num; i++) {
    var l = "";
    for (var j = 1; j <= num; j++) {
      if (j != i) {
        l +=
          "\\begin{pmatrix} \\frac{x - " +
          underIndex("X", j) +
          "}{" +
          underIndex("X", i) +
          " - " +
          underIndex("X", j) +
          "}  \\end{pmatrix}";
      }
    }
    polBody.push(underIndex("y", i) + l);
  }

  return pol + " \\\\ " + polBody.join(num > 3 ? " + \\\\" : " + ");
}
