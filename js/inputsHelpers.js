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
    createMatrixInput(dimValue, dimValue);
    showOperationButton();
    hideSteps();
  }
}
