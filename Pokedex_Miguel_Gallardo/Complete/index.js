document.addEventListener("DOMContentLoaded", function(event) {
  const options = {
    protocol: "https",
    versionPath: "/api/v2/",
    cache: true,
    timeout: 5 * 1000 // 5s
  };
  const P = new Pokedex.Pokedex(options);

  const pokemonDisplay = pokemon => {
    console.log(pokemon);

    let wrapper = document.getElementById("pokemon_container");

    let pokemonDiv = document.createElement("div");
    pokemonDiv.classList.add("pokemon");

    let pokemonPicture = document.createElement("img");
    pokemonPicture.src = pokemon.sprites.front_default;
    pokemonDiv.appendChild(pokemonPicture);

    let pokemonDetails = document.createElement("div");
    pokemonDetails.classList.add("pokemon_details_container");

    let pokemonName = document.createElement("h2");
    pokemonName.innerHTML = pokemon.name;
    pokemonDetails.appendChild(pokemonName);

    let pokemonId = document.createElement("span");
    pokemonId.innerHTML = "#" + pokemon.id;
    pokemonDetails.appendChild(pokemonId);

    let pokemonTypes = document.createElement("div");
    pokemonTypes.classList.add("pokemon_types");

    let typeSpan;

    pokemon.types.forEach(type => {
      typeSpan = document.createElement("span");
      typeSpan.classList.add("pokemon_type");
      typeSpan.classList.add("background-color-" + type.type.name);
      typeSpan.innerHTML = type.type.name;
      pokemonTypes.appendChild(typeSpan);
    });

    pokemonDiv.appendChild(pokemonDetails);
    pokemonDiv.appendChild(pokemonTypes);

    wrapper.appendChild(pokemonDiv);
  };

  const pokemonSearch = ev => {
    let searchBar = document.getElementById("search_bar");
    let pokemonName = searchBar.value != "" ? searchBar.value : "bulbasaur";
    pokemonName.toLowerCase();

    P.getPokemonByName(pokemonName).then(
      function(response) {
        let pokemon = response;
        pokemonDisplay(pokemon);
      },
      function(reason) {
        alert("That's not a pokemon name");
      }
    );
  };

  let searchBar = document.getElementById("search_bar");
  searchBar.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
      document.getElementById("search_button").click();
    }
  });

  let searchButton = document.getElementById("search_button");
  searchButton.addEventListener("click", pokemonSearch);
});
