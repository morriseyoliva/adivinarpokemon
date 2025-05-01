const datalist = document.getElementById("pokemon-list");
let pokedex = [];
let target;

fetch("pokedex.json")
  .then((res) => res.json())
  .then((data) => {
    pokedex = data;

    // Llenar el datalist con los nombres
    data.forEach(pokemon => {
      const option = document.createElement("option");
      option.value = pokemon.name;
      datalist.appendChild(option);
    });

    // Elegir Pokémon objetivo
    target = pokedex[Math.floor(Math.random() * pokedex.length)];
    console.log("Objetivo:", target.name);
  });


  function checkGuess() {
  const input = document.getElementById("guess").value.trim();
  const guess = pokedex.find(p => p.name.toLowerCase() === input.toLowerCase());

  const resultsDiv = document.getElementById("results");

  if (!guess) {
    resultsDiv.innerHTML += `<div class="feedback"><span class="wrong">Pokémon no encontrado: ${input}</span></div>`;
    return;
  }

  const feedbackDiv = document.createElement("div");
  feedbackDiv.className = "feedback";

  // Nombre
  const nameSpan = document.createElement("span");
  if (guess.name === target.name) {
    nameSpan.className = "correct";
    nameSpan.textContent = "🎯 ¡Correcto!";
    feedbackDiv.appendChild(nameSpan);
    resultsDiv.appendChild(feedbackDiv);
    return;
  } else {
    nameSpan.className = "wrong";
    nameSpan.textContent = guess.name;
    feedbackDiv.appendChild(nameSpan);
  }

  // Generación
  const genSpan = document.createElement("span");
  genSpan.className = guess.generation === target.generation ? "correct" : "wrong";
  genSpan.textContent = `Gen ${guess.generation}`;
  feedbackDiv.appendChild(genSpan);

  // Tipo
  const typeSpan = document.createElement("span");
  const match = guess.type.some(t => target.type.includes(t));
  typeSpan.className = match ? "partial" : "wrong";
  typeSpan.textContent = `Tipo: ${guess.type.join("/")}`;
  feedbackDiv.appendChild(typeSpan);

  // Altura
  const heightSpan = document.createElement("span");
  if (guess.height < target.height) {
      heightSpan.className = "lower";
      heightSpan.textContent = `Altura: Menor que ${target.height}m`;
  } else if (guess.height > target.height) {
      heightSpan.className = "higher";
      heightSpan.textContent = `Altura: Mayor que ${target.height}m`;
  } else {
      heightSpan.className = "equal";
      heightSpan.textContent = `Altura: Igual a ${target.height}m`;
  }
  feedbackDiv.appendChild(heightSpan);

    // Peso
    const weightSpan = document.createElement("span");
    if (guess.weight < target.weight) {
        weightSpan.className = "lower";
        weightSpan.textContent = `Altura: Menor que ${target.weight}m`;
    } else if (guess.weight > target.weight) {
        weightSpan.className = "higher";
        weightSpan.textContent = `Altura: Mayor que ${target.weight}m`;
    } else {
        weightSpan.className = "equal";
        weightSpan.textContent = `Altura: Igual a ${target.weight}m`;
    }
    feedbackDiv.appendChild(weightSpan);

    // Etapa
    const etapaSpan = document.createElement("span");
    if (guess.etapa < target.etapa) {
        etapaSpan.className = "lower";
        etapaSpan.textContent = `Etapa: Menor que ${target.etapa}m`;
    } else if (guess.etapa > target.etapa) {
        etapaSpan.className = "higher";
        etapaSpan.textContent = `Etapa: Mayor que ${target.etapa}m`;
    } else {
        etapaSpan.className = "equal";
        etapaSpan.textContent = `Etapa: Igual a ${target.etapa}m`;
    }
    feedbackDiv.appendChild(etapaSpan);

  resultsDiv.appendChild(feedbackDiv);
}
