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

function pivoting(matrix, column) {
  let max = 0;
  let aux = [];

  for (let i = 0; i < matrix.length; i++) {
    if (Math.abs(matrix[i][column]) > Math.abs(matrix[column][column])) {
      max = i;
    }
  }

  aux = matrix[column];
  matrix[max] = matrix[column];
  matrix[column] = aux;
  console.log(matrix);
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
