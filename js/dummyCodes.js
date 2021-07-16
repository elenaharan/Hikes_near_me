//this loop simply prints name of every pokemon in the array//
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