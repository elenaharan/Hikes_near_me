let pokemonRepository = (function () {
  let modalContainer = document.querySelector('#modal-container'); 
  let modal = document.querySelector('.modal'); 

  //modal features
  let modalClose = document.createElement('button');
  modalClose.classList.add('modal-close');
  let pokemonName = document.createElement('h1');
  pokemonName.classList.add('pokemonName');
  let pokemonHeight = document.createElement('p');
  pokemonHeight.classList.add('pokemonHeight');
  let pokemonType = document.createElement('p');
  pokemonType.classList.add('pokemonType');
  let imageContainer = document.createElement('div');
  imageContainer.classList.add('img-container');
  let pokemonImage = document.createElement('img');
  pokemonImage.classList.add('pokemonImage');


  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
      ) {
      pokemonList.push(pokemon);
    } else {
      console.log("You've entered an incorrect pokemon");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name.toUpperCase();
    button.classList.add('buttonStyle');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

  function showModal() {
    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  modalClose.addEventListener('click' , hideModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });

  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      // Clear all existing modal content
    modalContainer.innerHTML = '';

    pokemonName.innerHTML = pokemon.name.toUpperCase();
    pokemonHeight.innerHTML = 'Height: ' + pokemon.height;
    pokemonType.innerHTML = 'Type: ' + pokemon.types;
    pokemonImage.src = pokemon.imageUrl;
    modalClose.innerHTML = 'X';
    modal.appendChild(modalClose);
    modal.appendChild(pokemonName);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonType);
    modal.appendChild(modalClose);
    imageContainer.appendChild(pokemonImage);
    modal.appendChild(imageContainer);
    modalContainer.appendChild(modal);
    
    modalContainer.classList.add('is-visible');
  }
   )}


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
        console.log(pokemon);
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
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types[0].type.name;
    }).catch(function (e) {
      console.error(e);
    });
  }

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
  showDetails: showDetails
};
}) ();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});