class Step {
  constructor(title="", matrix=[], equations=[]) {
    this.title = title;
    this.matrix = matrix;
    this.equations = equations;
  }

  setTitle(title) {
    this.title = title;
  }

  setMatrix(matrix) {
    this.matrix = matrix;
  }

  setEquations(equations) {
    this.equations = equations;
  }

  getTitle() {
    return this.title;
  }

  getMatrix() {
    return this.matrix;
  }

  getEquations() {
    return this.equations;
  }
}

//##################################################//

function gaussElimiation() {
  //let show = document.getElementById('steps');
  let origin = getTableValues();

  if (origin == null) {
    alert('Preencha todos os campos!');
    //return;
  }

  origin = [[5,2,1], [3,1,4], [1,1,3]];

  let steps = []
  let step;
  steps.push(new Step("Matriz inicial", origin))

  let lower = [];
  let upper = [];

  for(let i = 0; i < origin.length; i++) {
    let rowL = [];
    let rowU = [];
    for(let j = 0; j < origin[i].length; j++) {
      if(j >= i) {
        rowL.push(0);
        rowU.push("\\raisebox{0.25em}{u}\\tiny " + (i + 1) + "" + (j + 1))
      } else {
        rowL.push("\\raisebox{0.25em}{l}\\tiny " + (i + 1) + "" + (j + 1));
        rowU.push(0)
      }
    }
    lower.push(rowL);
    upper.push(rowU);
  }

  // primeira linha da U
  upper[0] = origin[0];

  //console.log("uij = aij; j = 1, 2, ..., n");

  steps.push(new Step("Linha 1 da Matriz U",
                    upper,
    [katex.renderToString("\\boxed{\\raisebox{0.25em}{u}\\tiny ij \\normalsize ="
      +"	\\kern0.1em \\raisebox{0.25em}{a}\\tiny ij"
      +" \\footnotesize ;\\kern0.1em j = 1, 2,..., n}")]));

  //addStep("Linha 1 de U", upper,
  //        [katex.renderToString("\\raisebox{0.25em}{u}ij =  \\raisebox{0.25em}{a}ij; j = 1, 2, ..., n")]);

  // primeir coluna da L
  let equations = [];
  equations.push(katex.renderToString("\\boxed{\\raisebox{0.25em}{l}\\tiny i1 = "
    +" \\frac{\\raisebox{0.25em}{a}\\tiny i1}{\\raisebox{0.25em}{u}\\tiny 11}"
    + "\\footnotesize ; i = 2,..., n}"))

  for(let i = 1; i < origin[0].length; i++) {
    lower[i][0] = Math.round((origin[i][0]/upper[0][0]) * 100)/ 100;
    equations.push(katex.renderToString("\\raisebox{0.25em}{l}\\tiny " + (i + 1) + "1 \\normalsize = "
      + " \\frac{" + origin[i][0] + "}{" + upper[0][0] +"}"
      + " = " + lower[i][0]))
  }

  steps.push(new Step("Coluna 1 da Matriz L", lower, equations));
  //addStep("Coluna 1 de L", lower);

  //console.log("lij = ai1/u11; i = 2 ,..., n")

  // a partir da segunda linha e segunda coluna
  let wasCalc = false;
  let equationWValues = '';
  let equationResult = '';
  let finalEquations = [];
  let factor = 0;
  let factorEq = '';
  let factorEqWValues = '';

  for(let i = 1; i < origin.length; i++) {
    wasCalc = false;
    finalEquations = [];
    // próxima linha de U
    for(let j = i; j < origin[i].length; j++) {
      equation = '';
      equationWValues = '';
      equationResult = '';
      factor = 0;
      factorEq = '\\raisebox{0em}{(}';
      factorEqWValues = '(';

      for(let n = 0; n < i; n++) {
        factor += lower[i][n] * upper[n][j];
        //factorEq += "l" + (i + 1) + "" + (n + 1) + " * "
        //  + "u" + (i + 1) + "" + (j + 1) + " + "

        factorEq += '\\raisebox{0.25em}{l}\\tiny ' + (i + 1) + '' + (n + 1) 
          + ' \\normalsize \\kern0.1em \\raisebox{0em}{*} \\kern0.1em'
          + "\\raisebox{0.25em}{u}\\tiny " + (i + 1) + "" + (j + 1) + "\\small + ";
        
        factorEqWValues += lower[i][n] + ' * ' + upper[n][j] + '\\small + ';
      }

      factorEq = factorEq.slice(0, -3) + '\\raisebox{0em}{)}';
      factorEqWValues = factorEqWValues.slice(0, -3) + ')';

      //equation = 'u' + (i + 1) + "" + (j + 1) + " = a" + (i + 1) + "" + (j + 1) + " - " + factorEq;
      equation = '\\raisebox{0.25em}{u}\\tiny ' + (i + 1) + '' + (j + 1)
        + '\\normalsize = \\kern0.1em \\raisebox{0.25em}{u}\\tiny ' + (i + 1) + "" + (j + 1)
        + '\\normalsize \\raisebox{0em}{}\\kern0.1em - \\kern0.1em' + factorEq;

      equationWValues = '\\raisebox{0.25em}{u}\\tiny'
        + (i + 1) + "" + (j + 1)
        + "\\normalsize =" + origin[i][j] + " - " + factorEqWValues;
      
      upper[i][j] = Math.round((origin[i][j] - factor) * 100) / 100 ; 

      //equationResult = 'u' + (i + 1) + "" + (j + 1) + " = " + upper[i][j];
      equationResult = '\\raisebox{0.25em}{u}\\tiny ' + (i + 1) + '' + (j + 1)
        + '\\normalsize =' + upper[i][j];

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

    if(wasCalc) {
      steps.push(new Step('Linha ' + (i + 1) + ' da Matriz U', upper, finalEquations));
      // addStep("Linha " + (i + 1) + " da U", upper);
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
      //addStep("Coluna " + (i + 1) + " da L", lower);
    }
  }

  addStepsSet(steps)
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
        alert('A célula a' + (i + 1) + '' + (j + 1) + ' não possue valor!');
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

function addStepsSet(set) {
  set.forEach(element => {
    addStep(element.getTitle(), element.getMatrix(), element.getEquations())
  });
}

function addStep(title, matrix, equations = []) {
  let show = document.getElementById('steps');
  let fotmatedMatrix = '<div class="step-matrix">' + maTex(matrix) + '</div>'
  let step = ''
  let finalEquation = '';

  if(equations.length != 0) {
    finalEquation = '<div class="equations">';

    for(let i = 0; i < equations.length; i++) {
      finalEquation += '<div class="equation">' + equations[i] + '</div>'
    }

    finalEquation += '</div>'
  }
  
  step = stepSection(title, fotmatedMatrix + finalEquation);

  show.innerHTML += step;
}

function maTex(matrix, prefix='') {
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
