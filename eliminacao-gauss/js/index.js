function createMatrixInput(rows, columns) {
  let matrix = document.getElementById("matrix");
  console.log("asdasd");
  matrix.innerHTML = "";

  let content = '<table class="matrix-table">';

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

function limitNumber(element) {
  if (element.value.length > element.maxLength)
    element.value = element.value.slice(0, element.maxLength);
}

function dimHandler() {
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
  }
}
