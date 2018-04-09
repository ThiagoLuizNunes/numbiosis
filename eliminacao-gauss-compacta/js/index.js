function gaussElimiation() {
  //let show = document.getElementById('steps');
  let origin = getTableValues();

  if (origin == null) {
    alert('Preencha todos os campos!');
    //return;
  }

  origin = [[5,2,1], [3,1,4], [1,1,3]];

  addStep("Matriz inicial", origin);

  let lower = [];
  let upper = [];

  for(let i = 0; i < origin.length; i++) {
    let auxL = [];
    let auxU = [];
    for(let j = 0; j < origin[i].length; j++) {
      if(j >= i) {
        auxL.push(0);
        auxU.push("u" + (i + 1) + "" + (j + 1));
      } else {
        auxL.push("l" + (i + 1) + "" + (j + 1));
        auxU.push(0)
      }
    }
    lower.push(auxL);
    upper.push(auxU);
  }

  // primeira linha da U
  upper[0] = origin[0];

  console.log("uij = aij; j = 1, 2, ..., n");

  addStep("Linha 1 de U", upper);

  // primeir coluna da L
  for(let i = 1; i < origin[0].length; i++) {
    lower[i][0] = Math.round((origin[i][0]/upper[0][0]) * 100)/ 100
  }

  addStep("Coluna 1 de L", lower);

  console.log("lij = ai1/u11; i = 2 ,..., n")

  // a partir da segunda linha e segunda coluna
  let wasCalc = false;
  let equationWValues = '';
  let equationResult = '';
  let factor = 0;
  let factorEq = '';
  let factorEqWValues = '';
  for(let i = 1; i < origin.length; i++) {
    wasCalc = false;
    // próxima linha de U
    for(let j = i; j < origin[i].length; j++) {
      equation = '';
      equationWValues = '';
      equationResult = '';
      factor = 0;
      factorEq = '(';
      factorEqWValues = '';

      for(let n = 0; n < i; n++) {
        factor += lower[i][n] * upper[n][j];
        factorEq += "l" + (i + 1) + "" + (n + 1) + " * "
          + "u" + (i + 1) + "" + (j + 1) + " + "

        factorEqWValues += lower[i][n] + " * " + upper[n][j] + " + ";
      }

      factorEq = factorEq.slice(0,-3) + ")"
      factorEqWValues = factorEqWValues.slice(0, -3) + ")"

      equation = 'u' + (i + 1) + "" + (j + 1) + " = a" + (i + 1) + "" + (j + 1) + " - " + factorEq;
      equationWValues = 'u' + (i + 1) + "" + (j + 1) + " = " + origin[i][j] + " - " + factor;
      
      upper[i][j] = Math.round((origin[i][j] - factor) * 100) / 100 ; 

      equationResult = 'u' + (i + 1) + "" + (j + 1) + " = " + upper[i][j];

      console.log(equation + "\n" + equationWValues + "\n" + equationResult);
      wasCalc = true;
    }

    if(wasCalc) {
      addStep("Linha " + (i + 1) + " da U", upper);
      wasCalc = false;
    }

    for(let j = i + 1; j < origin.length; j++) {
      equation = '';
      equationWValues = '';
      equationResult = '';
      factor = 0;
      factorEq = '(';
      factorEqWValues = '';

      for(let n = 0; n < i; n++) {
        factor += lower[j][n] * upper[n][i];

        factorEq += "l" + (j + 1) + "" + (n + 1) + " * "
          + "u" + (n + 1) + "" + (i + 1) + " + "

        factorEqWValues += lower[j][n] + " * " + upper[n][i] + " + ";
      }

      factorEq = factorEq.slice(0, -3) + ")"
      factorEqWValues = factorEqWValues.slice(0, -3) + ")"

      equation = 'l' + (j + 1) + "" + (i + 1) + " = a" + (i + 1) + "" + (i + 1) + " - " + factorEq + " / " + "u" + (i + 1) + "" + (i + 1);
      equationWValues = 'l' + (i + 1) + "" + (i + 1) + " = " + origin[i][j] + " - " + factor + " / " + upper[i][i];

      lower[j][i] = Math.round(((origin[i][i] - factor)/ upper[i][i]) * 100)/100;

      equationResult = 'l' + (j + 1) + "" + (i + 1) + " = " + lower[j][i];

      console.log(equation + "\n" + equationWValues + "\n" + equationResult);

      wasCalc = true;
    }

    if(wasCalc) {
      addStep("Coluna " + (i + 1) + " da L", lower);
    }
  }

  //stepContent = formMatrix([[1, 2, 3, 4], [4, 5, 6, 7], [7, 8, 9, 10], [11,12,13,-14]]) + formMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
  //step = stepSection('Teste de seção', stepContent);
  //show.innerHTML = step + step;
} 

function getTableValues() {
  /*
    Pegar os valores dos inputs da matriz de entrada
  */
  let table = document.getElementById('matrix-input');
  let values = []
  let rowValues = []

  for(let i = 0; i < table.rows.length; i++) {
    rowValues = []

    for(let j = 0; j < table.rows[i].cells.length; j++) {
      let value = table.rows[i].cells[j].firstChild.value;
      if (value === '') {
        alert('A célula a' + (i+1) + '' + (j+1) + ' não possue valor!');
        return null;
      }
      rowValues.push(parseFloat(value));
    }
    values.push(rowValues);
  }

  return values;
}

function stepSection(title, content){
  /*
    Cria uma seção 'step'
  */
  let step = '<div class="step">';
  
  step += '<div class="step-title"><h6>' + title + '</h6></div>';
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

function addStep(title, matrix) {
  let show = document.getElementById('steps');
  let stepContent = formMatrix(matrix)
  let step = stepSection(title, stepContent);

  show.innerHTML += step;
}

function formMatrix(values) {
  /*
    Retorna uma tabela com os valores da matriz
    Params:
      - values: matriz de valores
  */

  var matrix = '<div class="matrix"><table class="matrix-show">';

  for(let i = 0; i < values.length; i++) {
    matrix += '<tr>';
    for(let j = 0; j < values[i].length; j++) {
      matrix += "<td>" + values[i][j] + "</td>";;
    }
    matrix += '</tr>';
  }

  matrix += '</table></div>';
  return matrix;
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
  
  if(dim.value !== ''){
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
