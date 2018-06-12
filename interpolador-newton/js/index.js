function onClickHandler() {
  var degree = document.getElementById("degree");
  var outputdiv = document.getElementById("steps");
  outputdiv.innerHTML = "";

  if (degree.value === "") {
    alert("Adicione um número válido!");
  } else {
    newtonInterpolatorEquation(parseInt(degree.value), outputdiv);
  }
}

function newtonInterpolatorEquation(degree, outputdiv) {
  var equation = "P(x) = ";
  var equationBody = [];

  addStep(
    (title = "Dados iniciais"),
    (equations = [katex.renderToString(dataMatrixGenerator(degree))])
  );

  addStep(
    (title = "Tabela das Diferenças Divididas"),
    (equations = [katex.renderToString(ddTableGenerator(degree))])
  );

  // Equação do interpolador
  for (var i = 0; i <= degree; i++) {
    var degreeEq = underIndex("d", i);
    for (var j = 0; j < i; j++) {
      degreeEq += "(x - " + underIndex("x", j) + ")";
    }

    if (i > 2) {
      equationBody.push(degreeEq + "\\\\");
    } else {
      equationBody.push(degreeEq);
    }
  }

  equation =
    "\\begin{matrix}" + equation + equationBody.join(" + ") + "\\end{matrix}";

  addStep(
    (title = "Equação do Intepolador de Newto para n = " + degree),
    (matrix = ""),
    (equations = [katex.renderToString(equation)])
  );
}

function ddTableGenerator(degree) {
  var table = [];
  var tableSymbol = [];

  for (var i = 0; i <= degree + 1; i++) {
    var column = [];
    var columnSymbol = [];
    for (var j = 0; j <= degree; j++) {
      column.push(" ");
      columnSymbol.push("");
    }

    tableSymbol.push(columnSymbol);
    table.push(column);
  }

  for (var i = 0; i <= degree + 1; i++) {
    if (i == 0) {
      for (var j = 0; j <= degree; j++) {
        table[i][j] = underIndex("x", j);
        tableSymbol[i][j] = underIndex("x", j);
      }
    } else if (i == 1) {
      for (var j = 0; j <= degree; j++) {
        table[i][j] =
          (j
            ? underIndex("d", "0" + j)
            : "\\color{red}" + underIndex("d", "0")) +
          "[" +
          underIndex("y", i - 1) +
          "]";
        tableSymbol[i][j] = j ? underIndex("d", "0" + j) : underIndex("d", "0");
      }
    } else {
      var count = 0;
      j = i - 1;
      for (var k = 0; k <= i - 1; k++, j++) {
        var up = "";
        var bottom = "";

        if (!tableSymbol[i - 1][j]) continue;

        up = tableSymbol[i - 1][j] + "-" + tableSymbol[i - 1][j - 1];
        bottom = tableSymbol[0][count + (i - 1)] + "-" + tableSymbol[0][count];
        table[i][k] =
          "\\dfrac{" +
          up +
          "}{" +
          bottom +
          "} = " +
          (count
            ? underIndex("d", i - 1 + "" + count)
            : "\\color{red}" + underIndex("d", i - 1));
        tableSymbol[i][j] = count
          ? underIndex("d", i - 1 + "" + count)
          : underIndex("d", i - 1);
        count++;
      }
    }
  }
  return tableToMatrix(table, degree);
}

function tableToMatrix(table, degree) {
  var tableT = math.transpose(table);
  var rows = [];
  var columnsTitles = ["x"];
  var columns = ["c"];

  for (var i = 0; i <= degree; i++) {
    if (i == 0) {
      columnsTitles.push(underIndex("\\Delta", i) + "[f(x)]");
    } else {
      columnsTitles.push(underIndex("\\Delta", i));
    }
    columns.push("c");
  }

  for (var i = 0; i < tableT.length; i++) {
    rows.push(tableT[i].join(" & "));
  }

  var ddTable =
    "\\begin{array}{" +
    columns.join(" | ") +
    "} " +
    columnsTitles.join(" & ") +
    "\\\\ \\hline \\cr[0.1pt] " +
    rows.join(" \\\\ \\cr[0.1pt]") +
    "\\end{array}";

  return ddTable;
}

function dataMatrixGenerator(degree) {
  var rows = [["x"], ["f(x)"]];
  var columns = ["c"];

  for (var i = 0; i <= degree; i++) {
    rows[0].push(underIndex("x", i));
    rows[1].push(underIndex("y", i));
    columns.push("c");
  }

  var dTable =
    "\\begin{array}{" +
    columns.join(" | ") +
    "} " +
    rows[0].join(" & ") +
    "\\\\ \\hline " +
    rows[1].join(" & ") +
    "\\end{array}";

  return dTable;
}
