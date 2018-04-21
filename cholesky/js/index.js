function cholesky() {
  //let show = document.getElementById('steps');
  hideSteps();
  let origin = getTableValues();

  if (origin == null) {
    alert("Preencha todos os campos!");
    return;
  } else if (isNullMatrix(origin)) {
    alert("A matriz não pode ser nula!");
    return;
  } else if (math.det(origin) == 0) {
    alert("É uma matriz singular. O determinante da matriz é 0");
    return;
  } else if (!sylvester(origin)) {
    alert("A matriz não atende ao Critério de Sylvester");
    return;
  }

  let matrixLU = copyMatrix(origin);

  addStep(
    (title = "Matriz inicial"),
    (matrix = maTex(origin, "A =") + maTex(getLUMatrix(origin, "a"), "A ="))
  );

  let pivot = checkPivoting(origin);
  if (pivot >= 0) {
    pivoting(origin, pivot);
    pivoting(matrixLU, pivot);
    addStep(title = "Pivoteamento na linha " + (pivot + 1), matrix = maTex(origin, "A ="));
  }

}

function showOperationButton() {
  /*
    Mostra o botão de ação para utilizar o método de eliminação de Gauss
  */

  var btn = document.getElementById("btn");
  btn.innerHTML =
    '<a class="waves-effect waves-light btn-large" onclick="cholesky()">Fator de Cholesky</a>';
}

function hideOperationButton() {
  document.getElementById("btn").innerHTML = "";
}
