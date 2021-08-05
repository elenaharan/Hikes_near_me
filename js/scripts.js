let pokemonRepository = (function () {

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let searchInput = document.querySelector("#search-bar");

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
      ) {
      pokemonList.push(pokemon);
    } else {
      console.log('You have entered an incorrect pokemon');
    }
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');

    let listItem = document.createElement('li');
    listItem.classList.add('group-list-item');

    let pokemonButton = document.createElement('button');
    pokemonButton.innerText = pokemon.name.toUpperCase();
    pokemonButton.classList.add('btn', 'pokemon-button', 'btn-primary');
    pokemonButton.setAttribute('data-target', '#modal-container');
    pokemonButton.setAttribute('data-toggle', 'modal');

    listItem.appendChild(pokemonButton);
    pokemonList.appendChild(listItem);

    pokemonButton.addEventListener("click", function() {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrlFront = details.sprites.front_default;
      item.imageURLBack = details.sprites.back_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = [];
      for (let i=0; i < details.types.length; i++) {
        item.types.push(details.types[i].type.name);
      }
      item.abilities = [];
      for (let i = 0; i < details.abilities.length; i++) {
        item.abilities.push(details.abilities[i].ability.name);
      }
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
     showModal(item);
  });
   }

  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    
    modalTitle.empty();
    modalBody.empty();

    let pokemonName = $('<h1>' + item.name + '</h1>');

    let pokemonImageFront = $('<img class = "pokemonImage" style="width:40%">');
    pokemonImageFront.attr('src', item.imageUrlFront);
    
    let pokemonImageBack = $('<img class = "pokemonImage" style="width:40%">');
    pokemonImageBack.attr('src', item.imageURLBack);

    let pokemonHeight = $('<p>' + 'Height: ' + item.height + '</p>');
    let pokemonWeight = $('<p>' + 'Weight: ' + item.weight + '</p>');
    let pokemonTypes = $('<p>' + 'Types: ' + item.types.join(', ') + '</p>');
    let pokemonAbilities = $('<p>' + 'Abilities: ' + item.abilities.join(', ') + '</p>');

    modalTitle.append(pokemonName);
    modalBody.append(pokemonImageFront);
    modalBody.append(pokemonImageBack);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonWeight);
    modalBody.append(pokemonTypes);
    modalBody.append(pokemonAbilities);
  } 


//search bar
searchInput.addEventListener("input", function () {
  let pokemonList = document.querySelectorAll("li");
  let value = searchInput.value.toUpperCase();

  pokemonList.forEach(function(pokemon) {
    if (pokemon.innerText.toLocaleUpperCase().indexOf(value) > -1) {
      pokemon.style.display = "";
    } else {
      pokemon.style.display = "none";
    }
  });
});


return {
  add: function(item) {
    pokemonList.push(item);
  },

  getAll: function() {
    return pokemonList;
  },

  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails,
  showModal: showModal
};
}) ();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});


//Back to top button
let backButton = document.getElementById('btn-back-to-top');

//When the user scrolls down 300px
window.onscroll = function () {
  scrollFunction();
}

function scrollFunction() {
  if (
    document.body.scrollTop > 500 ||
    document.documentElement.scrollTop > 500
  ) {
    backButton.style.display = "block";
  } else {
    backButton.style.display = "none";
  }
} 

//When the user clicks the button, it returns to the top
backButton.addEventListener('click', backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop =0;
}