function copyMatrix(matrix) {
  /*
    Faz a cópia dos elementos de uma matriz
    Params:
      matrix: matriz a ser copiada
  */
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
  /*
    Verifica qual linha da matriz precisa ser pivoteada
    Params:
      matrix: matriz
  */
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][i] == 0) {
      return i;
    }
  }

  return -1;
}

function pivoting(matrix, bVector = null) {
  /*
    Realiza o pivotemanto em uma matriz e em um vetor
    Params:
      matrix: matriz
      bVector: vetor
  */
  let max = 0;
  let n = 0;
  let column = 0;

  //verifica se a matriz ainda precisa de pivoteamento
  //limita a quantidade de iterações pelo tamanho da matriz
  while (checkPivoting(matrix) >= 0 && n < matrix.length) {
    n++;
    column = checkPivoting(matrix);
    max = 0;

    //procura a linha que possue o maior valor na mesma coluna em que precisa de pivoteamento
    for (let i = 0; i < matrix.length; i++) {
      if (Math.abs(matrix[i][column]) > Math.abs(matrix[max][column])) {
        max = i;
      }
    }

    let copy = copyMatrix(matrix);

    matrix[max] = copy[column];
    matrix[column] = copy[max];

    //modifica o vetor b associado à matriz
    if (bVector != null) {
      let aux = bVector[column];
      bVector[column] = bVector[max];
      bVector[max] = bVector[column];
    }
  }

  return n == 0 ? null : matrix;
}

function isNullMatrix(matrix) {
  /*
    Verifica se a matriz de entrada é nula
    Params:
      matrix: matriz
  */
  let nullMatrix = true;

  matrix.forEach(element => {
    element.forEach(cell => {
      //se possuir qualquer valor diferente de 0, a matriz não é nula
      if (cell != 0) {
        nullMatrix = false;
      }
    });
  });

  return nullMatrix;
}

function sylvester(matrix) {
  /*
    Verifica se a matriz atende ao Critério de Sylvester
    Params:
      matrix: matriz
    */
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
  /*
    Verifica se a matriz é simétrica
    Params:
      matrix: matriz
  */
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
  /*
    Verifica se a matriz atende ao Critério de Linha
    Params:
      matrix: matriz
  */
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
  /*
    Retorna a parte Lower ou Upper de uma matriz
    Params:
      - matrix: matriz
      - type: 'l','u','a','g'
      - iteration: interação do algoritmo de separação LU
      - lable: texto dos campos ainda não calculados
  */

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
  /*
    Retorna a coluna de uma matriz
  */

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
  /*
    Converte um vetor no formato de matriz com uma coluna para um array
  */
  let outArray = [];

  vector.forEach(element => {
    outArray.push(element[0]);
  });

  return outArray;
}

function toMatrix(vector) {
  /*
    Converte um vetor no formato de array para o formato de matriz com uma coluna
  */
  let outMatrix = [];

  vector.forEach(element => {
    outMatrix.push([element]);
  });

  return outMatrix;
}

function erroCalc(newVector, oldVector) {
  /*
    Calcula o erro relativo dos métodos iterativos
    Params:
      - newVector: novo vetor de valores encontrado
      - oldVector: vetor de valores anterior
  */
  return (
    math.max(math.round(math.abs(math.subtract(newVector, oldVector)), 3)) /
    math.max(math.abs(newVector))
  );
}

function factLU(matrix) {
  let matrixLU = copyMatrix(matrix);

  //primeira coluna da L

  for (let i = 1; i < matrix[0].length; i++) {
    matrixLU[i][0] = math.round(matrix[i][0] / matrixLU[0][0], 3);
  }

  //a partir da segunda linha e segunda coluna
  let factor = 0;

  for (let i = 1; i < matrix.length; i++) {
    // próxima linha de U
    for (let j = i; j < matrix[i].length; j++) {
      factor = 0;
      for (let n = 0; n < i; n++) {
        factor += matrixLU[i][n] * matrixLU[n][j];
      }

      matrixLU[i][j] = math.round(matrix[i][j] - factor, 3);
    }

    //a partir da segunda coluna

    for (let j = i + 1; j < matrix.length; j++) {
      factor = 0;

      for (let n = 0; n < i; n++) {
        factor += matrixLU[j][n] * matrixLU[n][i];
      }

      matrixLU[j][i] = math.round(matrix[j][i] - factor, 3);
    }
  }

  return {
    origin: copyMatrix(matrixLU),
    l: getLUMatrix(matrixLU, "l", matrixLU.length - 2),
    u: getLUMatrix(matrixLU, "u", matrixLU.length - 1)
  };
}

function getDiagonal(matrix) {
  let diagonal = copyMatrix(matrix);

  for (let i = 0; i < diagonal.length; i++) {
    for (let j = 0; j < diagonal[i].length; j++) {
      if (i != j) {
        diagonal[i][j] = 0;
      }
    }
  }

  return diagonal;
}
