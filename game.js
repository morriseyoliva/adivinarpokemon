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

  resultsDiv.appendChild(feedbackDiv);
}
