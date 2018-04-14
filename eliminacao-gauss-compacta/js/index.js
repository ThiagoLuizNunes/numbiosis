function copyMatrix(matrix) {
  let out = [];

  matrix.forEach(element => {
    aux = [];
    for (let i = 0; i < element.length; i++) {
      aux.push(element[i]);
    }
    out.push(aux)
  })

  return out;
}

function gaussElimiation() {
  //let show = document.getElementById('steps');
  let origin = getTableValues();

  if (origin == null) {
    alert('Preencha todos os campos!');
    //return;
  }

  origin = [[5, 2, 1], [3, 1, 4], [1, 1, 3]];

  let matrixLU = copyMatrix(origin);
  //getLUMatrix(matrixLU, 'u', 2);
  addStep(title = "Matriz inicial", matrix = maTex(origin, 'A ='))

  /*let lower = [];
  let upper = [];

  for (let i = 0; i < origin.length; i++) {
    let rowL = [];
    let rowU = [];
    for (let j = 0; j < origin[i].length; j++) {
      if (j >= i) {
        rowL.push(0);
        rowU.push(underIndex('u', (i + 1) + "" + (j + 1)))
      } else {
        rowL.push(underIndex('l', (i + 1) + "" + (j + 1)))
        rowU.push(0)
      }
    }
    lower.push(rowL);
    upper.push(rowU);
  }
  // primeira linha da U
  upper[0] = origin[0];*/

  //console.log("uij = aij; j = 1, 2, ..., n");
  addStep(title = "Linha 1 da Matriz U",
    matrix = maTex(getLUMatrix(matrixLU, 'u', 0), "U = "),
    [katex.renderToString("\\boxed{" + underIndex('u', 'ij') + " = "
      + "	\\kern0.1em " + underIndex('a', 'ij')
      + " \\footnotesize ;\\kern0.1em j = 1, 2,..., n}")]);

  // primeir coluna da L
  let equations = [];

  equations.push(katex.renderToString("\\boxed{" + underIndex('l', 'i1') + " = "
    + " \\frac{" + underIndex('a', 'i1') + "}{" + underIndex('u', '11') + "}"
    + "\\footnotesize ; i = 2,..., n}"))

  for (let i = 1; i < origin[0].length; i++) {
    //lower[i][0] = Math.round((origin[i][0] / upper[0][0]) * 100) / 100;
    matrixLU[i][0] = Math.round((origin[i][0] / matrixLU[0][0]) * 100) / 100;

    //equations.push(katex.renderToString(underIndex('l', (i + 1) + "1") + " = "
    //  + " \\frac{" + origin[i][0] + "}{" + upper[0][0] + "}"
    //  + " = " + lower[i][0]))
    equations.push(katex.renderToString(underIndex('l', (i + 1) + "1") + " = "
      + " \\frac{" + origin[i][0] + "}{" + matrixLU[0][0] + "}"
      + " = " + matrixLU[i][0]))
  }

  addStep(title = "Coluna 1 da Matriz L",
    matrix = maTex(getLUMatrix(matrixLU, 'l', 0), "L = "),
    equations
  );

  // a partir da segunda linha e segunda coluna
  let wasCalc = false;
  let equationWValues = '';
  let equationResult = '';
  let finalEquations = [];
  let factor = 0;
  let factorEq = '';
  let factorEqWValues = '';

  for (let i = 1; i < origin.length; i++) {
    wasCalc = false;
    finalEquations = [];
    // próxima linha de U
    for (let j = i; j < origin[i].length; j++) {
      equation = '';
      equationWValues = '';
      equationResult = '';
      factor = 0;
      factorEq = '\\raisebox{0em}{(}';
      factorEqWValues = '(';

      for (let n = 0; n < i; n++) {
        //factor += lower[i][n] * upper[n][j];
        factor += matrixLU[i][n] * matrixLU[n][j];

        factorEq += underIndex('l', (i + 1) + '' + (n + 1))
          + ' \\kern0.1em \\raisebox{0em}{*} \\kern0.1em'
          + underIndex('u', (n + 1) + '' + (j + 1)) + "\\small + ";

        //factorEqWValues += lower[i][n] + ' * ' + upper[n][j] + '\\small + ';
        factorEqWValues += matrixLU[i][n] + ' * ' + matrixLU[n][j] + '\\small + ';
      }

      //upper[i][j] = Math.round((origin[i][j] - factor) * 100) / 100;
      matrixLU[i][j] = Math.round((origin[i][j] - factor) * 100) / 100;

      factorEq = factorEq.slice(0, -3) + '\\raisebox{0em}{)}';
      factorEqWValues = factorEqWValues.slice(0, -3) + ')';

      equation = underIndex('u', (i + 1) + '' + (j + 1))
        + ' = \\kern0.1em ' + underIndex('a', (i + 1) + '' + (j + 1))
        + '\\kern0.1em - \\kern0.1em' + factorEq;

      equationWValues = underIndex('u', (i + 1) + '' + (j + 1))
        + " = " + origin[i][j] + " - " + factorEqWValues;

      //equationResult = underIndex('u', (i + 1) + '' + (j + 1)) + '\\normalsize =' + upper[i][j];
      equationResult = underIndex('u', (i + 1) + '' + (j + 1)) + ' = ' + matrixLU[i][j];

      finalEquations.push(katex.renderToString('\\begin{matrix} '
        + equation
        + ' \\\\ '
        + equationWValues
        + ' \\\\ '
        + equationResult
        + '\\end{matrix}'));
      wasCalc = true;
    }

    if (wasCalc) {
      addStep(title = 'Linha ' + (i + 1) + ' da Matriz U',
        matrix = maTex(getLUMatrix(matrixLU, 'u', i), 'U ='),
        finalEquations
      );
      wasCalc = false;
    }

    finalEquations = [];

    for (let j = i + 1; j < origin.length; j++) {
      equation = '';
      equationWValues = '';
      equationResult = '';
      factor = 0;
      factorEq = '\\raisebox{0.25em}{(}';
      factorEqWValues = '';

      for (let n = 0; n < i; n++) {
        //factor += lower[j][n] * upper[n][i];
        factor += matrixLU[j][n] * matrixLU[n][i];

        factorEq += underIndex('l', (j + 1) + '' + (n + 1))
          + ' \\kern0.1em \\raisebox{0em}{*} \\kern0.1em'
          + underIndex('u', (n + 1) + '' + (i + 1)) + "\\small + ";

        //factorEqWValues += lower[j][n] + " * " + upper[n][i] + "\\small + ";
        factorEqWValues += matrixLU[j][n] + " * " + matrixLU[n][i] + "\\small + ";
      }

      //lower[j][i] = Math.round(((origin[i][i] - factor) / upper[i][i]) * 100) / 100;
      matrixLU[j][i] = Math.round(((origin[i][i] - factor) / matrixLU[i][i]) * 100) / 100;

      factorEq = factorEq.slice(0, -3) + "\\raisebox{0em}{)}"
      factorEqWValues = factorEqWValues.slice(0, -3) + ")"

      //equation = 'l' + (j + 1) + "" + (i + 1) + " = a" + (i + 1) + "" + (i + 1) + " - " + factorEq + " / " + "u" + (i + 1) + "" + (i + 1);
      equation = underIndex('l', (j + 1) + '' + (i + 1))
        + ' = ' + underIndex('a', (i + 1) + '' + (i + 1))
        + ' - \\frac{' + factorEq + '}{'
        + underIndex('u', (i + 1) + "" + (i + 1)) + '}';

      /*equationWValues = underIndex('l', (j + 1) + '' + (i + 1))
        + " = " + origin[i][j]
        + " - \\frac{" + factor + "}{ "
        + upper[i][i] + "}";*/

      equationWValues = underIndex('l', (j + 1) + '' + (i + 1))
        + " = " + origin[i][j]
        + " - \\frac{" + factor + "}{ "
        + matrixLU[i][i] + "}";

      //equationResult = underIndex('l', (j + 1) + '' + (i + 1)) + " = " + lower[j][i];
      equationResult = underIndex('l', (j + 1) + '' + (i + 1)) + " = " + matrixLU[j][i];

      //console.log(equation + "\n" + equationWValues + "\n" + equationResult);
      finalEquations.push(katex.renderToString('\\begin{matrix} '
        + equation
        + ' \\\\ '
        + equationWValues
        + ' \\\\ '
        + equationResult
        + '\\end{matrix}'));

      wasCalc = true;
    }

    if (wasCalc) {
      addStep(title = "Coluna " + (i + 1) + " da L",
        matrix = maTex(getLUMatrix(matrixLU, 'l', i), 'L ='),
        finalEquations
      );
    }
  }

  //addStepsSet(steps)
  //stepContent = formMatrix([[1, 2, 3, 4], [4, 5, 6, 7], [7, 8, 9, 10], [11,12,13,-14]]) + formMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
  //step = stepSection('Teste de seção', stepContent);
  //show.innerHTML = step + step;
}

function getLUMatrix(matrix, type, iteration) {
  let lu = [];

  for (let i = 0; i < matrix.length; i++) {
    let aux = [];
    for (let j = 0; j < matrix[i].length; j++) {
      if (type === 'l' && j < i) {
        if (j <= iteration) {
          aux.push(matrix[i][j]);
        } else {
          aux.push(underIndex('j', (i + 1) + '' + (j + 1)));
        }
      } else if (type === 'u' && j >= i) {
        if (i <= iteration) {
          aux.push(matrix[i][j]);
        } else {
          aux.push(underIndex('u', (i + 1) + '' + (j + 1)));
        }
      } else {
        aux.push('0');
      }
    }
    lu.push(aux);
  }

  return lu;
}

function underIndex(letter, index) {
  return '\\raisebox{0.25em}{' + letter + '}\\tiny ' + index + '\\normalsize \\raisebox{0em}{}'
}

function getTableValues() {
  /*
    Pegar os valores dos inputs da matriz de entrada
  */
  let table = document.getElementById('matrix-input');
  let values = []
  let rowValues = []

  for (let i = 0; i < table.rows.length; i++) {
    rowValues = []

    for (let j = 0; j < table.rows[i].cells.length; j++) {
      let value = table.rows[i].cells[j].firstChild.value;
      if (value === '') {
        alert('A célula a' + (i + 1) + '' + (j + 1) + ' não possue valor!');
        return null;
      }
      rowValues.push(parseFloat(value));
    }
    values.push(rowValues);
  }

  return values;
}

function stepSection(title, content) {
  /*
    Cria uma seção 'step'
  */
  let step = '<div class="step">';

  step += '<div class="step-title"><h5>' + title + '</h5></div>';
  step += '<div class="step-content">' + content + '</div>';
  step += '</div>';

  return step;
}

function hideSteps() {
  /*
    Remove o conteúdo da div 'steps'
  */
  let steps = document.getElementById('steps');
  steps.innerHTML = "";
}

function addStep(title = '', matrix = '', equations = []) {
  let show = document.getElementById('steps');
  let fotmatedMatrix = '<div class="step-matrix">' + matrix + '</div>'
  let step = ''
  let finalEquation = '';

  if (equations.length != 0) {
    finalEquation = '<div class="equations">';

    for (let i = 0; i < equations.length; i++) {
      finalEquation += '<div class="equation">' + equations[i] + '</div>'
    }

    finalEquation += '</div>'
  }

  step = stepSection(title, finalEquation + fotmatedMatrix);
  show.innerHTML += step;
}

function maTex(matrix, prefix = '') {
  let rows = [];

  matrix.forEach(element => {
    rows.push(element.join(' & '));
  })

  return katex.renderToString(prefix + '\\begin{pmatrix} ' + rows.join('\\\\') + '\\end{pmatrix}')
}

function createMatrixInput(rows, columns) {
  /*
    Cria a matriz de inputs para a definição dos valores da matriz inicial
    Params:
      - rows: quantidade de linhas
      - columns: quantidade de colunas
  */

  let matrix = document.getElementById("matrix");

  matrix.innerHTML = "";

  let content = '<table id="matrix-input" class="matrix-table">';

  for (let i = 0; i < rows; i++) {
    content += "<tr>";
    for (let j = 0; j < columns; j++) {
      content +=
        '<td><input type="number" placeholder="a' +
        (i + 1) +
        "" +
        (j + 1) +
        '"></td>';
    }
    content += "</tr>";
  }

  content += "</table>";

  matrix.innerHTML = content;
}

function hideMatrixInput() {
  document.getElementById('matrix').innerHTML = "";
}

function showOperationButton() {
  /*
    Mostra o botão de ação para utilizar o método de eliminação de Gauss
  */

  var btn = document.getElementById('btn');
  btn.innerHTML = '<a class="waves-effect waves-light btn-large" onclick="gaussElimiation()">Gerar Matrizes LU</a>';
}

function hideOperationButton() {
  document.getElementById('btn').innerHTML = "";
}

function limitNumber(element) {
  /*
    Limita a quantidade de números no input
    Params:
      - element: input que tera os valores limitados
  */
  if (element.value.length > element.maxLength)
    element.value = element.value.slice(0, element.maxLength);
}

function dimHandler() {
  /*
    Função para verificar a modificação de valores no input de dimensão da matriz
  */
  dim = document.getElementById("dim");

  if (dim.value !== '') {
    dimValue = parseInt(dim.value);
  }

  limitNumber(dim);

  if (
    dimValue === '' ||
    dimValue <= 1 ||
    dimValue >= 9
  ) {
    alert("Coloque valores entre 2 e 8!");
    hideMatrixInput();
    hideOperationButton();
    hideSteps();
    dim.value = '';

  } else {
    createMatrixInput(dimValue, dimValue);
    showOperationButton();
    hideSteps();
  }
}
