function gaussElimiation() {
  hideSteps();
  let origin = getTableValues();

  //origin = [[5, 2, 1], [3, 1, 4], [1, 1, 3]];
  //origin = [[10, 2, -1], [-3, -6, 2], [1, 5, 5]];

  if (origin == null) {
    alert("Preencha todos os campos!");
    return;
  } else if (isNullMatrix(origin)) {
    alert("A matriz não pode ser nula!");
    return;
  } else if (math.det(origin) == 0) {
    alert("É uma matriz singular. O determinante da matriz é 0");
    return;
  }

  //apresentação da matriz inicial
  addStep(
    (title = "Matriz inicial"),
    (matrix = maTex(origin, "A =") + maTex(getLUMatrix(origin, "a"), "A ="))
  );

  //aplica o pivoteamento para tirar os '0' da diagonal principal
  let pivot = pivoting(copyMatrix(origin));

  if (pivot != null) {
    origin = copyMatrix(pivot);
    addStep(
      (title = "Após o Pivotemento"),
      (matrix = maTex(origin, "A =") + maTex(getLUMatrix(origin, "a"), "A ="))
    );
  }

  let matrixLU = copyMatrix(origin);

  //apresentação da matriz U com a primeira linha
  addStep(
    (title = "Linha 1 da Matriz U"),
    (matrix = maTex(getLUMatrix(matrixLU, "u", 0), "U = ")),
    [
      katex.renderToString(
        "\\boxed{" +
          underIndex("u", "ij") +
          " = " +
          "	\\kern0.1em " +
          underIndex("a", "ij") +
          " \\footnotesize ;\\kern0.1em j = 1, 2,..., n}"
      )
    ]
  );

  //primeira coluna da L
  let equations = [];

  equations.push(
    katex.renderToString(
      "\\boxed{" +
        underIndex("l", "i1") +
        " = " +
        " \\frac{" +
        underIndex("a", "i1") +
        "}{" +
        underIndex("u", "11") +
        "}" +
        "\\footnotesize ; i = 2,..., n}"
    )
  );

  for (let i = 1; i < origin[0].length; i++) {
    matrixLU[i][0] = math.round(origin[i][0] / matrixLU[0][0], 3);

    equations.push(
      katex.renderToString(
        underIndex("l", i + 1 + "1") +
          " = " +
          " \\frac{" +
          origin[i][0] +
          "}{" +
          matrixLU[0][0] +
          "}" +
          " = " +
          matrixLU[i][0]
      )
    );
  }

  //apresentação da primeira coluna da matriz L
  addStep(
    (title = "Coluna 1 da Matriz L"),
    (matrix = maTex(getLUMatrix(matrixLU, "l", 0), "L = ")),
    equations
  );

  //a partir da segunda linha e segunda coluna
  let wasCalc = false;
  let equationWValues = "";
  let equationResult = "";
  let finalEquations = [];
  let factor = 0;
  let factorEq = "";
  let factorEqWValues = "";

  for (let i = 1; i < origin.length; i++) {
    wasCalc = false;
    finalEquations = [];
    // próxima linha de U
    for (let j = i; j < origin[i].length; j++) {
      equation = "";
      equationWValues = "";
      equationResult = "";
      factor = 0;
      factorEq = "(";
      factorEqWValues = "(";

      for (let n = 0; n < i; n++) {
        //factor += lower[i][n] * upper[n][j];
        factor += matrixLU[i][n] * matrixLU[n][j];

        factorEq +=
          underIndex("l", i + 1 + "" + (n + 1)) +
          underIndex("u", n + 1 + "" + (j + 1)) +
          " + ";

        //factorEqWValues += lower[i][n] + ' * ' + upper[n][j] + '\\small + ';
        factorEqWValues += matrixLU[i][n] + "(" + matrixLU[n][j] + ") + ";
      }

      //upper[i][j] = Math.round((origin[i][j] - factor) * 100) / 100;
      matrixLU[i][j] = math.round(origin[i][j] - factor, 3);

      factorEq = factorEq.slice(0, -3) + ")";
      factorEqWValues = factorEqWValues.slice(0, -3) + ")";

      equation =
        underIndex("u", i + 1 + "" + (j + 1)) +
        " = " +
        underIndex("a", i + 1 + "" + (j + 1)) +
        " - " +
        factorEq;

      equationWValues =
        underIndex("u", i + 1 + "" + (j + 1)) +
        " = " +
        origin[i][j] +
        " - " +
        factorEqWValues;

      //equationResult = underIndex('u', (i + 1) + '' + (j + 1)) + '\\normalsize =' + upper[i][j];
      equationResult =
        underIndex("u", i + 1 + "" + (j + 1)) + " = " + matrixLU[i][j];

      finalEquations.push(
        katex.renderToString(
          "\\begin{matrix} " +
            equation +
            " \\\\ " +
            equationWValues +
            " \\\\ " +
            equationResult +
            "\\end{matrix}"
        )
      );
      wasCalc = true;
    }

    if (wasCalc) {
      addStep(
        (title = "Linha " + (i + 1) + " da Matriz U"),
        (matrix = maTex(getLUMatrix(matrixLU, "u", i), "U =")),
        finalEquations
      );
      wasCalc = false;
    }

    finalEquations = [];

    for (let j = i + 1; j < origin.length; j++) {
      equation = "";
      equationWValues = "";
      equationResult = "";
      factor = 0;
      factorEq = "(";
      factorEqWValues = "(";

      for (let n = 0; n < i; n++) {
        //factor += lower[j][n] * upper[n][i];
        factor += matrixLU[j][n] * matrixLU[n][i];

        factorEq +=
          underIndex("l", j + 1 + "" + (n + 1)) +
          underIndex("u", n + 1 + "" + (i + 1)) +
          " + ";

        //factorEqWValues += lower[j][n] + " * " + upper[n][i] + "\\small + ";
        factorEqWValues += matrixLU[j][n] + "(" + matrixLU[n][i] + ") + ";
      }

      //lower[j][i] = Math.round(((origin[i][i] - factor) / upper[i][i]) * 100) / 100;
      matrixLU[j][i] = math.round(origin[j][i] - factor, 3);

      factorEq = factorEq.slice(0, -3) + ")";
      factorEqWValues = factorEqWValues.slice(0, -3) + ")";

      //equation = 'l' + (j + 1) + "" + (i + 1) + " = a" + (i + 1) + "" + (i + 1) + " - " + factorEq + " / " + "u" + (i + 1) + "" + (i + 1);
      equation =
        underIndex("l", j + 1 + "" + (i + 1)) +
        " = " +
        underIndex("a", j + 1 + "" + (i + 1)) +
        " - \\frac{" +
        factorEq +
        "}{" +
        underIndex("u", i + 1 + "" + (i + 1)) +
        "}";

      /*equationWValues = underIndex('l', (j + 1) + '' + (i + 1))
        + " = " + origin[i][j]
        + " - \\frac{" + factor + "}{ "
        + upper[i][i] + "}";*/

      equationWValues =
        underIndex("l", j + 1 + "" + (i + 1)) +
        " = " +
        origin[j][i] +
        " - \\frac{" +
        factorEqWValues +
        "}{ " +
        matrixLU[i][i] +
        "}";

      //equationResult = underIndex('l', (j + 1) + '' + (i + 1)) + " = " + lower[j][i];
      equationResult =
        underIndex("l", j + 1 + "" + (i + 1)) + " = " + matrixLU[j][i];

      //console.log(equation + "\n" + equationWValues + "\n" + equationResult);
      finalEquations.push(
        katex.renderToString(
          "\\begin{matrix} " +
            equation +
            " \\\\ " +
            equationWValues +
            " \\\\ " +
            equationResult +
            "\\end{matrix}"
        )
      );

      wasCalc = true;
    }

    if (wasCalc) {
      addStep(
        (title = "Coluna " + (i + 1) + " da Matriz L"),
        (matrix = maTex(getLUMatrix(matrixLU, "l", i), "L =")),
        finalEquations
      );
    }
  }

  addStep(
    (title = "Matrizes L e U"),
    (matrix =
      maTex(getLUMatrix(matrixLU, "l", matrixLU.length - 2), "L =") +
      maTex(getLUMatrix(matrixLU, "u", matrixLU.length - 1), "U ="))
  );

  return {
    l: getLUMatrix(matrixLU, "l", matrixLU.length - 2),
    u: getLUMatrix(matrixLU, "u", matrixLU.length - 1)
  };

  //addStepsSet(steps)
  //stepContent = formMatrix([[1, 2, 3, 4], [4, 5, 6, 7], [7, 8, 9, 10], [11,12,13,-14]]) + formMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
  //step = stepSection('Teste de seção', stepContent);
  //show.innerHTML = step + step;
}

function showOperationButton() {
  /*
    Mostra o botão de ação para utilizar o método de eliminação de Gauss
  */

  var btn = document.getElementById("btn");
  btn.innerHTML =
    '<a class="waves-effect waves-light btn-large" onclick="gaussElimiation()">Gerar Matrizes LU</a>';
}

function hideOperationButton() {
  document.getElementById("btn").innerHTML = "";
}
