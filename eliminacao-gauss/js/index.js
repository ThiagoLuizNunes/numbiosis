function gaussElimiation() {
  let show = document.getElementById('steps');
  let tableValues = getTableValues();

  stepContent = formMatrix([[1, 2, 3, 4], [4, 5, 6, 7], [7, 8, 9, 10], [11,12,13,-14]]) + formMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
  step = stepSection('Teste de seção', stepContent);

  show.innerHTML = step + step;
} 

function getTableValues() {
  /*
    Pegar os valores dos inputs da matriz de entrada
  */
  return [[]];
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

function freeSteps() {
  /*
    Remove o conteúdo da div 'steps'
  */

  let steps = document.getElementById('steps');
  steps.innerHTML = "";
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
    for(let j = 0; j < values[0].length; j++) {
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
        '"><td>';
    }
    content += "</tr>";
  }

  content += "</table>";

  matrix.innerHTML = content;
}

function showOperationButton() {
  /*
    Mostra o botão de ação para utilizar o método de eliminação de Gauss
  */

  var btn = document.getElementById('btn');
  btn.innerHTML = '<a class="waves-effect waves-light btn-large" onclick="gaussElimiation()">Realizar Operação</a>';
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
  dimValue = dim.value;

  limitNumber(dim);

  if (
    dimValue === "" ||
    dimValue === "0" ||
    dimValue === "1" ||
    dimValue === "9"
  ) {
    if (dimValue !== "") {
      alert("Coloque valores entre 2 e 8!");
      dim.value = "";
    }
  } else {
    createMatrixInput(dimValue, dimValue);
    showOperationButton();
    freeSteps();
  }
}
