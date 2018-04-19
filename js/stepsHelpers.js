function stepSection(title, content) {
  /*
      Cria uma seção 'step'
    */
  let step = '<div class="step">';

  step += '<div class="step-title"><h5>' + title + "</h5></div>";
  step += '<div class="step-content">' + content + "</div>";
  step += "</div>";

  return step;
}

function hideSteps() {
  /*
      Remove o conteúdo da div 'steps'
    */
  let steps = document.getElementById("steps");
  steps.innerHTML = "";
}

function addStep(title = "", matrix = "", equations = []) {
  let show = document.getElementById("steps");
  let fotmatedMatrix = '<div class="step-matrix">' + matrix + "</div>";
  let step = "";
  let finalEquation = "";

  if (equations.length != 0) {
    finalEquation = '<div class="equations">';

    for (let i = 0; i < equations.length; i++) {
      finalEquation += '<div class="equation">' + equations[i] + "</div>";
    }

    finalEquation += "</div>";
  }

  step = stepSection(title, finalEquation + fotmatedMatrix);
  show.innerHTML += step;
}
