let pokemonRepository = (function () {
    let pokemonList = [
    {
    name: 'Bulbasaur', 
    height: 0.7, 
    type: ['grass', 'poison']
}, 
    {
    name: 'Ivtsaur', 
    height: 1, 
    type: ['grass', 'poison']
}, 
    {
    name: 'Venusaur', 
    height: 2, 
    type: ['grass', 'poison']
}, 
    {
    name: 'Charmander', 
    height: 0.6, 
    type: 'fire'
}
];

function add(pokemon) {
  if (typeof pokemon === "object") {
    repository.push(pokemon);
  } else {
    console.log("You've entered an incorrect pokemon");
  }
}

function showDetails(pokemon) {
  console.log();
}

function addListItem(pokemon) {
  let pokemonList = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('buttonStyle');
  listItem.appendChild(button);
  pokemonList.appendChild(listItem);
  button.addEventListener("click", function showDetails(pokemon) {
    console.log(button.innerText);
  });
}

return {
  add: function(item) {
    pokemonList.push(item);
  },

  getAll: function() {
    return pokemonList;
  },

  addListItem: addListItem
}
}) ();

pokemonRepository.add({name: 'Charizard', height: 1.7, type: ['fire', 'flying']});

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
})