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

function pivoting(matrix, column) {
  let max = 0;
  let aux = [];

  for (let i = 0; i < matrix.length; i++) {
    if (Math.abs(matrix[i][column]) > Math.abs(matrix[column][column])) {
      max = i;
    }
  }

  let copy = copyMatrix(matrix)

  matrix[max] = copy[column];
  matrix[column] = copy[max];
  console.log(matrix);
}

function isNullMatrix(matrix) {
  let nullMatrix = true;
  matrix.forEach(element => {
    element.forEach(cell => {
      if (cell != 0) {
        nullMatrix = false;
      }
    })
  })

  return nullMatrix;
}

function sylvester(matrix) {
  let auxMatrix = [];
  let actualMatrix = [];
  let det = 0;

  for (let i = 0; i < matrix.length; i++) {
    actualMatrix = []
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

function getTableValues() {
  /*
      Pegar os valores dos inputs da matriz de entrada
    */
  let table = document.getElementById("matrix-input");
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
  document.getElementById("matrix").innerHTML = "";
}

function getLUMatrix(matrix, type, iteration = 0, label = '') {
  let lu = [];
  if (label === '') {
    label = type;
  }

  for (let i = 0; i < matrix.length; i++) {
    let aux = [];
    for (let j = 0; j < matrix[i].length; j++) {
      if (type === "a") {
        if (j < i) {
          aux.push(underIndex("l", i + 1 + "" + (j + 1)));
        } else {
          aux.push(underIndex("u", i + 1 + "" + (j + 1)));
        }
      } else if (type === "l" && j <= i) {
        if (j <= iteration && j < i) {
          aux.push(matrix[i][j]);
        } else if (j == i) {
          aux.push(1);
        } else {
          aux.push(underIndex(label, i + 1 + "" + (j + 1)));
        }
      } else if (type === "u" && j >= i) {
        if (i <= iteration) {
          aux.push(matrix[i][j]);
        } else {
          aux.push(underIndex(label, i + 1 + "" + (j + 1)));
        }
      } else {
        aux.push("0");
      }
    }
    lu.push(aux);
  }

  return lu;
}