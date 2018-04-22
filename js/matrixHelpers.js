function copyMatrix(matrix) {
  let out = [];

  matrix.forEach(element => {
    aux = [];
    for (let i = 0; i < element.length; i++) {
      aux.push(element[i]);
    }
    out.push(aux);
  });

  return out;
}

function checkPivoting(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][i] == 0) {
      return i;
    }
  }

  return -1;
}

function pivoting(matrix, bVector = null) {
  let max = 0;
  let n = 0;
  let column = 0;

  while (checkPivoting(matrix) >= 0 && n < matrix.length) {
    n++;
    column = checkPivoting(matrix);
    max = 0;

    for (let i = 0; i < matrix.length; i++) {
      if (Math.abs(matrix[i][column]) > Math.abs(matrix[max][column])) {
        max = i;
      }
    }

    let copy = copyMatrix(matrix);

    matrix[max] = copy[column];
    matrix[column] = copy[max];

    if (bVector != null) {
      let aux = bVector[column];
      bVector[column] = bVector[max];
      bVector[max] = bVector[column];
    }

    //console.log(matrix);
  }

  return n == 0 ? null : matrix;
}

function isNullMatrix(matrix) {
  let nullMatrix = true;
  matrix.forEach(element => {
    element.forEach(cell => {
      if (cell != 0) {
        nullMatrix = false;
      }
    });
  });

  return nullMatrix;
}

function sylvester(matrix) {
  let auxMatrix = [];
  let actualMatrix = [];
  let det = 0;

  for (let i = 0; i < matrix.length; i++) {
    actualMatrix = [];
    for (let j = 0; j <= i; j++) {
      auxMatrix = [];
      for (let k = 0; k <= i; k++) {
        auxMatrix.push(matrix[j][k]);
      }
      actualMatrix.push(auxMatrix);
    }

    det = math.det(actualMatrix);
    if (det <= 0) {
      return false;
    }
  }

  return true;
}

function isSymmetric(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] != matrix[j][i]) {
        return false;
      }
    }
  }

  return true;
}

function rowCriterion(matrix) {
  let count = 0;
  let actual = 0;

  for (let i = 0; i < matrix.length; i++) {
    count = 0;
    for (let j = 0; j < matrix[i].length; j++) {
      if (j != i) {
        count += Math.abs(matrix[i][j]);
      }
    }

    actual = count / Math.abs(matrix[i][i]);

    if (actual > 1) {
      return false;
    }
  }

  return true;
}

function getTableValues(id = "matrix-input") {
  /*
      Pegar os valores dos inputs da matriz de entrada
    */
  let table = document.getElementById(id);
  let values = [];
  let rowValues = [];

  for (let i = 0; i < table.rows.length; i++) {
    rowValues = [];

    for (let j = 0; j < table.rows[i].cells.length; j++) {
      let value = table.rows[i].cells[j].firstChild.value;
      if (value === "") {
        alert("A célula a" + (i + 1) + "" + (j + 1) + " não possue valor!");
        return null;
      }
      rowValues.push(parseFloat(value));
    }
    values.push(rowValues);
  }

  return values;
}

function createMatrixInput(
  rows,
  columns,
  id = "matrix",
  matrixId = "matrix-input",
  label = "a"
) {
  /*
      Cria a matriz de inputs para a definição dos valores da matriz inicial
      Params:
        - rows: quantidade de linhas
        - columns: quantidade de colunas
    */

  let matrix = document.getElementById(id);

  matrix.innerHTML = "";

  let content = '<table id="' + matrixId + '" class="matrix-table">';

  for (let i = 0; i < rows; i++) {
    content += "<tr>";
    for (let j = 0; j < columns; j++) {
      content +=
        '<td><input type="number" placeholder="' +
        label +
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

function hideMatrixInput(id = "matrix") {
  document.getElementById(id).innerHTML = "";
}

function hideSystemInput(id = "system") {
  document.getElementById(id).style.display = "none";
}

function showSystemInput(id = "system") {
  document.getElementById(id).style.display = "flex";
}

function getLUMatrix(matrix, type, iteration = 0, label = "") {
  let lu = [];
  if (label === "") {
    label = type;
  }

  for (let i = 0; i < matrix.length; i++) {
    let aux = [];
    for (let j = 0; j < matrix[i].length; j++) {
      switch (type) {
        case "g":
          if (j <= i) {
            aux.push(underIndex(label, i + 1 + "" + (j + 1)));
          } else {
            aux.push("0");
          }
          break;
        case "a":
          if (j < i) {
            aux.push(underIndex("l", i + 1 + "" + (j + 1)));
          } else {
            aux.push(underIndex("u", i + 1 + "" + (j + 1)));
          }
          break;
        case "l":
          if (j <= i) {
            if (j <= iteration && j < i) {
              aux.push(matrix[i][j]);
            } else if (j == i) {
              aux.push(1);
            } else {
              aux.push(underIndex(label, i + 1 + "" + (j + 1)));
            }
          } else {
            aux.push("0");
          }
          break;
        case "u":
          if (j >= i) {
            if (i <= iteration) {
              aux.push(matrix[i][j]);
            } else {
              aux.push(underIndex(label, i + 1 + "" + (j + 1)));
            }
          } else {
            aux.push("0");
          }
          break;
      }
    }
    lu.push(aux);
  }

  return lu;
}

function getColumn(matrix, column) {
  let outColumn = [];
  matrix.forEach(line => {
    for (let i = 0; i < line.length; i++) {
      if (i == column) {
        outColumn.push([line[i]]);
      }
    }
  });

  return outColumn;
}

function toArray(vector) {
  let outArray = [];

  vector.forEach(element => {
    outArray.push(element[0]);
  });

  return outArray;
}

function toMatrix(vector) {
  let outMatrix = [];

  vector.forEach(element => {
    outMatrix.push([element]);
  });

  return outMatrix;
}

function erroCalc(newVector, oldVector) {
  return (
    math.max(math.round(math.abs(math.subtract(newVector, oldVector)), 3)) /
    math.max(math.abs(newVector))
  );
}
