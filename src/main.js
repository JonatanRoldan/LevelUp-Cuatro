let pokemons = '';
const cargarDatos = async() => {
  try{
    const res = await fetch('https://pokeapi.co/api/v2/pokemon')
    const data = await res.json()
    data.results.forEach(pokemon =>{
      imagen(pokemon.url);
    });
    
  }catch(error){
    console.log(error)
  }
}
const imagen = async(url) => {
  try{
    const res = await fetch(url)
    const imagen = await res.json()
    pokemons += `
    <div class="pokemon">
      <h1 class="titulo">${imagen.name}</h1>
      <img class="poster" src="${imagen.sprites.other.dream_world.front_default}">  
    </div>
  `;
    console.log(pokemons)
    document.getElementById('contenedor').innerHTML = pokemons;
  }catch(error){
    console.log(error)
  }
}
 cargarDatos();
 