let url = "https://pokeapi.co/api/v2/pokemon";

if (localStorage.getItem("pokemon") == null) {
    localStorage.setItem("pokemon", JSON.stringify([]));
}

const getInitialData = async () => {
    try {
        let pokemonList;

        if (JSON.parse(localStorage.getItem("pokemon")).length > 0) {
            pokemonList = JSON.parse(localStorage.getItem("pokemon"));
        } else {
            pokemonList = await fetchPokemon();
            console.log(pokemonList);
            localStorage.setItem("pokemon", JSON.stringify(pokemonList));
        }
        let results = pokemonList.results;
        displayData(results);
    } catch (err) {
        console.log(err);
    }
};
const fetchPokemon = async () => {
    try {
        let res = await fetch(url);
        res = await res.json();
        return res;
    } catch (error) {
        console.log(error);
    }
};

const displayData = (data) => {
    let container = document.getElementById("container");
    container.innerHTML = "";
    data.forEach((data) => {
        let name = document.createElement("p");
        name.textContent = data.name;

        container.appendChild(name);
    });
};
getInitialData();

let timer_id ;

function debounce(getData , delay){
    if(timer_id){
        clearTimeout(timer_id);
    }
    

    timer_id = setTimeout(function(){
        getData();
    } , delay);
}

let searchUrl = "https://pokeapi.co/api/v2/pokemon/";
async function getData(){
    // let query = document.getElementById("searchBar").value;
    // try {
    //     let response1 = await fetch(`searchUrl${query}`)
    //     let response = response1.json();
    //     populateSearchBar(response)
    // } catch (error) {
    //     console.log(error)
    // }

}
async function handleClick(){
    let query = document.getElementById("searchBar").value;
    try {
        let response = await fetch(`${searchUrl}${query}`);
        response = await response.json();
        console.log(response);
        renderData(response);
    } catch (error) {
        console.log(error)
    }
}


const renderData = (data) =>{
    let infoContainer = document.getElementById("container");
    infoContainer.innerHTML = "";

    let ability = document.createElement("div");
    ability.textContent = "ability   :-";
    data.abilities.forEach((ele) =>{
        ability.textContent += ele.ability.name + ",";
    })
    let height = document.createElement("div");
    height =  "Height   :-" + data.height;

    let id = document.createElement("div");
    id = "id   :-" +  data.id;
    
    let moves = document.createElement("div");
    moves.textContent = "moves  :-";
    data.moves.forEach((ele) =>{
        moves.textContent += ele.move.name + ",";
    })
    console.log(moves)
    infoContainer.append(height , id , moves , ability);
}