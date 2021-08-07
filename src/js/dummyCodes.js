/*//this loop simply prints name of every pokemon in the array//
for (let i=0; i < pokemonList.length; i++) {
    document.write(pokemonList[i].name + " " + "<br>");
}

//This loop returns Pokemon's name and height//
 let text = "";
let i = 0;
while (pokemonList[i]) {
    text = text + "  " + pokemonList[i].name + " " + "(height: " + pokemonList[i].height + ")," + "<br>";
    i++;
}

document.write(text);

//This loop contains a conditional and a for loop//
let text = "";
for (let i=0; i < pokemonList.length; i++) {
  if (pokemonList[i].height > 0.5 && pokemonList[i].height < 2) {
    document.write(text + "  " + pokemonList[i].name + " " + "(height: " + 
    pokemonList[i].height + ")," + "<br>");
  } else if (pokemonList[i].height >= 2) {
    document.write(text + "  " + pokemonList[i].name + " " + "(height: " + 
    pokemonList[i].height + ")" + " " + "-" + " " + "Wow, that's big!" + "<br>");
}
}

/*pokemonRepository.getAll().forEach(function(pokemon) {
    document.write('<p>' + pokemon.name + ', ' + 'height: ' 
    + pokemon.height + ', ' + 'type: ' + pokemon.type + '</p>');
  })*/


/*pokemonRepository.getAll().forEach(function(pokemon) {
  if (pokemon.height > 1.5) {
    document.write('<p>' + pokemon.name + ', ' + 'height: ' 
    + pokemon.height + ', ' + 'type: ' + pokemon.type + " - Wow! That's big!" + '</p>')
  }
  document.write('<p>' + pokemon.name + ', ' + 'height: ' 
  + pokemon.height + ', ' + 'type: ' + pokemon.type + '</p>');
})






function add(pokemon) {
  if (typeof pokemon === object) {
    pokemonList.push(pokemon);
  } else {
    document.write("You've enetered incorrect type of data!");
  }
}*/















let pokemonRepository = (function () {
  let modalContainer = document.querySelector('#modal-container');

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
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

function showDetails(item) {
  pokemonRepository.loadDetails(item).then(function () {
    console.log(item);
  });
}

  //Modal functionality
  function showModal(title, text) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);

  let titleElement = document.createElement('h1');
  titleElement.innerText = title;

  let contentElement = document.createElement('p');
  contentElement.innerText = text;

  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);

  modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });

  modalContainer.addEventListener('click', (e) => {
    // Since this is also triggered when clicking INSIDE the modal
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });
  
  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal Title', 'This is content');
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
  showDetails: showDetails,
  showModal: showModal,
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