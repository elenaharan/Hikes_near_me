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

pokemonList.forEach(function(pokemon) {
    document.write('<p>' + pokemon.name + ', ' + 'height: ' 
    + pokemon.height + ', ' + 'type: ' + pokemon.type + '</p>');
})