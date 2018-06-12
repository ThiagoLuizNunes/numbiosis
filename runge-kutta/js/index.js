function heunHandler() {
  var it = document.getElementById("it");
  var outputdiv = document.getElementById("steps");
  outputdiv.innerHTML = "";

  if (it.value === "") {
    alert("Adicione um número válido!");
  } else {
    heun(parseInt(it.value));
  }
}

function heun(iterations) {
  addStep(
    (title = "Condição Inicial"),
    (equations = [katex.renderToString(underIndex("w", "0") + "= \\alpha")])
  );

  addStep(
    (title = "Preditor"),
    (equations = [
      katex.renderToString(
        underIndex("\\widetilde{w}", "i+1") +
          " = " +
          underIndex("w", "i") +
          " + hf(" +
          underIndex("t", "i") +
          "," +
          underIndex("w", "i") +
          ")"
      )
    ])
  );

  addStep(
    (title = "Corretor"),
    (equations = [
      katex.renderToString(
        underIndex("w", "i+1") +
          " = " +
          underIndex("w", "i") +
          " + " +
          "\\dfrac{h}{2}" +
          "[f(" +
          underIndex("t", "i") +
          "," +
          underIndex("w", "i") +
          ")," +
          underIndex("\\widetilde{w}", "i+1") +
          ")]"
      ),
      katex.renderToString("i = 0, 1, ... , N-1")
    ])
  );

  equations = [];
  for (var i = 0; i < iterations; i++) {
    equations.push(
      katex.renderToString(
        underIndex("\\widetilde{w}", i + 1) +
          " = " +
          underIndex("w", i) +
          " + hf(" +
          underIndex("t", i) +
          "," +
          underIndex("w", i) +
          ")"
      )
    );

    equations.push(
      katex.renderToString(
        underIndex("w", i + 1) +
          " = " +
          underIndex("w", i) +
          " + " +
          "\\dfrac{h}{2}" +
          "[f(" +
          underIndex("t", i) +
          "," +
          underIndex("w", i) +
          ")," +
          underIndex("\\widetilde{w}", i + 1) +
          ")]"
      )
    );
  }

  addStep((title = "Método de Heun"), (equations = equations));
}

/****************************************************/

function ptMedioHandler() {
  var it = document.getElementById("it");
  var outputdiv = document.getElementById("steps");
  outputdiv.innerHTML = "";

  if (it.value === "") {
    alert("Adicione um número válido!");
  } else {
    ptMedio(parseInt(it.value));
  }
}

function ptMedio(iterations) {
  addStep(
    (title = "Condição Inicial"),
    (equations = [katex.renderToString(underIndex("w", "0") + "= \\alpha")])
  );

  addStep(
    (title = "Iterações"),
    (equations = [
      katex.renderToString(
        underIndex("w", "i+1") +
          " = " +
          underIndex("w", "i") +
          " + " +
          "hf(" +
          underIndex("t", "i") +
          " + \\dfrac{h}{2}" +
          "," +
          underIndex("w", "i") +
          " + \\dfrac{h}{2}f(" +
          underIndex("t", "i") +
          "," +
          underIndex("w", "i") +
          ")" +
          ")"
      ),
      katex.renderToString("i = 0, 1, ... , N-1")
    ])
  );

  equations = [];
  for (var i = 0; i < iterations; i++) {
    equations.push(
      katex.renderToString(
        underIndex("w", i + 1) +
          " = " +
          underIndex("w", i) +
          " + " +
          "hf(" +
          underIndex("t", i) +
          " + \\dfrac{h}{2}" +
          "," +
          underIndex("w", i) +
          " + \\dfrac{h}{2}f(" +
          underIndex("t", i) +
          "," +
          underIndex("w", i) +
          ")" +
          ")"
      )
    );
  }

  addStep((title = "Método do Ponto Médio"), (equations = equations));
}
