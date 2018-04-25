function limitNumber(element) {
  /*
      Limita a quantidade de números no input
      Params:
        - element: input que tera os valores limitados
    */
  if (element.value.length > element.maxLength)
    element.value = element.value.slice(0, element.maxLength);
}

function dimHandler(matrixId = "matrix") {
  /*
      Função para verificar a modificação de valores no input de dimensão da matriz
    */
  dim = document.getElementById("dim");

  if (dim.value !== "") {
    dimValue = parseInt(dim.value);
  }

  limitNumber(dim);

  if (dimValue === "" || dimValue <= 1 || dimValue >= 9) {
    alert("Coloque valores entre 2 e 8!");
    hideMatrixInput();
    hideOperationButton();
    hideSteps();
    dim.value = "";
  } else {
    createMatrixInput(dimValue, dimValue, matrixId);
    showOperationButton();
    hideSteps();
  }
}

function dimHandlerSys(
  matrixId = "matrix",
  xVectorId = "xVector",
  bVectorId = "bVector"
) {
  /*
      Função para verificar a modificação de valores no input de dimensão da matriz
    */
  dim = document.getElementById("dim");

  if (dim.value !== "") {
    dimValue = parseInt(dim.value);
  }

  limitNumber(dim);

  if (dimValue === "" || dimValue <= 1 || dimValue >= 9) {
    alert("Coloque valores entre 2 e 8!");
    hideSystemInput();
    hideOperationButton();
    hideSteps();
    if (hidePlot) {
      hidePlot();
    }
    dim.value = "";
  } else {
    showSystemInput();
    createMatrixInput(dimValue, dimValue, matrixId);
    createMatrixInput(dimValue, 1, xVectorId, "xvector-input", "x");
    createMatrixInput(dimValue, 1, bVectorId, "bvector-input", "b");
    showOperationButton();
    hideSteps();
    if (hidePlot) {
      hidePlot();
    }
  }
}

function getFloatValue(id) {
  let element = document.getElementById(id);
  return element.value === "" ? null : parseFloat(element.value);
}
