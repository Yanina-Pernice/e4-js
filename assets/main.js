// Traer elementos del DOM
const form = document.querySelector("#form");
const pokeInput = document.querySelector(".search_input");
const cardContainer = document.querySelector(".card__container");
const errorMsg = document.querySelector(".error-msg");


const roundAndDivide = (value) => {
    return Math.round(value/10);
};

// Funcion para simplificar la data del pokemon
const getPokemonsData = (pokemon) => ({
    name: pokemon.name.toUpperCase(),
    // image: pokemon
    id: pokemon.id,
    height: roundAndDivide(pokemon.height),
    weight: roundAndDivide(pokemon.weight),
    types: pokemon.types[0].type.name,
});



// Función para crear la card del pokemon

const createCardTemplate = (pokemon) => {
    const { id, name, height, weight, types } = getPokemonsData (pokemon);

    return `
    <div class="poke-card">

        <p class="poke-id">#${id}</p>

        <img src = "${pokemon.sprites.other['official-artwork'].front_default}" class="pokeImg">

        <h2 class="name">${name}</h2>

        <div>
            <span class=${types}></span>
        </div>
       
        <p class="altura">Height: ${height} mts</p>

        <p class="peso">Weight: ${weight} kg</p>
    </div>
    `;
};

const renderPokemonCard = (pokemon) => {
    cardContainer.innerHTML = createCardTemplate(pokemon);
};

// Funciones Auxiliares
// Función si está vacío el input
const isEmpty = () => {
    return pokeInput.value.trim() === "";
};


const searchPokemon = async (e) => {
    e.preventDefault();

    //Validamos si el input está vacío
    if (isEmpty()) {
        console.log("Debes ingresar un ID");
        form.reset();       
        return;      
    }

    // Si el input NO está vacío, Fetch al pokemon
    const fetchedPokemon = await requestPokemons(pokeInput.value.toLowerCase());

    renderPokemonCard(fetchedPokemon);
    form.reset();

};





const init = () => {
    form.addEventListener("submit", searchPokemon);


};

init();