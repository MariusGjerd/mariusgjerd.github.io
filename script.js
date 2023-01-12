
//TASK 1.1

function printItems(items) {
  items.forEach((item, index) => {
    setTimeout(() => {
      console.log(`item ${index + 1} is a ${item.name}`);
    }, item.delay * 1000);
  });
}

const myItems = [
  {
    name: 'shovel',
    delay: 1
  },
  {
    name: 'shoe',
    delay: 3
  },
  {
    name: 'newspaper',
    delay: 5
  }
];

console.log(printItems(myItems));



//TASK 1.2


function repeatString(str, n, callback) {
    let result = '';
    for (let i = 0; i < n; i++) {
      result += str;
    }
    callback(result);
}

repeatString('ha', 3, function (result) {
    console.log(result);
});


//TASK 1.3

function compress(input) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(input.slice(0, 3));
      }, 100);
    });
}

  function encrypt(input) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(input.split('').reverse().join(''));
      }, 100);
    });
}

compress("the secret key is 123543")
  .then(function(result) {
    return encrypt(result);
  })
  .then(function(encryptedResult) {
    console.log(encryptedResult);
  })
  .catch(function(err) {
    console.error(err);
  });



  //TASK 1.4


  function process(places) {
    return new Promise((resolve, reject) => {
      let output = places.map((place) => place.name).join(', ');
      setTimeout(() => resolve(output), 1000);
    });
  }

  async function main() {
    const response = await fetch("https://www.vullum.io/academy/oslo.json");
    const data = await response.json();
    const processedData = await process(data);
    console.log(processedData);
  }
  main();











  //POKEDEX

// Fetch the list of all pokemons from the PokeAPI
fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
  .then(response => response.json())
  .then(data => {
    // Get the list of pokemons from the API response
    const pokemons = data['results'];

    // Iterate through the list of pokemons
    for (const pokemon of pokemons) {
      // Make a request to the PokeAPI to retrieve the details for this pokemon
      fetch(pokemon['url'])
        .then(response => response.json())
        .then(pokemonData => {
          // Get the sprite (image) for the pokemon
          const spriteUrl = pokemonData['sprites']['front_default'];
          const spriteUrlShiny = pokemonData['sprites']['front_shiny'];
          const id = pokemonData['id'];
          const types = pokemonData['types'].map(type => type['type']['name']);
          const hp = pokemonData['stats'].find(stat => stat['stat']['name'] === 'hp').base_stat;

          // Create a div element for the pokemon
          const pokemonElement = `
            <div style="margin-bottom: 50px">  
            <div class="pokemon-hp-container">
                <p class="pokemon-hp">HP: ${hp}</p>
              </div>
              <img src="${spriteUrl}" alt="${pokemon['name']}">
              <img src="${spriteUrlShiny}" alt="${pokemon['name']}">
              <p id="pokemon-name">${pokemon['name']}</p>
              <p class="pokemon-id">ID: ${id}</p>
              ${types.map(type => `<p class="pokemon-type ${type}">${type}</p>`).join('')}
            </div>
          `;

          // Add the pokemon element to the page
          document.getElementById("pokemons").innerHTML += pokemonElement;
        });
    }



    // Bind the search function to the input field's keyup event
    document.getElementById('search-input').addEventListener('keyup', searchPokemons);




    // Define the search function
    function searchPokemons() {
      // Get the search query from the input field
      const query = document.getElementById('search-input').value;

      // Clear the current list of pokemons from the page
      document.getElementById('pokemons').innerHTML = '';

      // Iterate through the list of pokemons
      for (const pokemon of pokemons) {
        // Check if the pokemon name starts with the search query
        if (pokemon['name'].startsWith(query)) {
          // Make a request to the PokeAPI to retrieve the details for this pokemon
          fetch(pokemon['url'])
            .then(response => response.json())
            .then(pokemonData => {
              // Get the sprite (image) for the pokemon
              const spriteUrl = pokemonData['sprites']['front_default'];
              const spriteUrlShiny = pokemonData['sprites']['front_shiny'];
              const id = pokemonData['id'];
              const types = pokemonData['types'].map(type => type['type']['name']);
              const hp = pokemonData['stats'].find(stat => stat['stat']['name'] === 'hp').base_stat;

          // Create a div element for the pokemon
          const pokemonElement = `
            <div>
              <div class="pokemon-hp-container">
                <p class="pokemon-hp">HP: ${hp}</p>
              </div>
              <img src="${spriteUrl}" alt="${pokemon['name']}">
              <img src="${spriteUrlShiny}" alt="${pokemon['name']}">
              <p id="pokemon-name">${pokemon['name']}</p>
              <p class="pokemon-id">ID: ${id}</p>
              ${types.map(type => `<p class="pokemon-type ${type}">${type}</p>`).join('')}
            </div>`;

          // Add the pokemon element to the page
          document.getElementById("pokemons").innerHTML += pokemonElement;
            });
        }
      }
    }
  });







