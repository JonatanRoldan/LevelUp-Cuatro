let pokemons = '';
let UrlSig = '';
let Urlpre = '';
//funcion para retornar un numero random multiplo de 6 para aceptar la paginacion 
function Random (){
  let numero = Math.floor(Math.random() * 32);
  numero=numero*6;
  return numero;
}
//cargamos url inicial con un limite de 6 elemtos
let Urlpagina = `https://pokeapi.co/api/v2/pokemon/?offset=${Random()}&limit=6`;
//consultamos la api get 6 pokemones
const cargarDatos = async(url) => {
  try{
    const res = await fetch(url)
    const data = await res.json()
    //cargamos las url siguiente y anterior
    UrlSig=data.next
    Urlpre=data.previous
    console.log(data)
    //recorremos el arreglo de los pokemons para consultar su imagen
    data.results.forEach(pokemon =>{
      imagen(pokemon.url);
    });
    
  }catch(error){
    console.log(error)
  }
}
//consultamos la api para obtener los datos de solo un pokemon
const imagen = async(url) => {
  try{
    const res = await fetch(url)
    const imagen = await res.json()
    // agregamos al arreglo el pokemon con los datos de nombre e imagen 
    pokemons += `
    <div class="pokemon">
      <h1 class="titulo">${imagen.name}</h1>
      <img class="poster" src="${imagen.sprites.other.dream_world.front_default}">  
    </div>
    `;
    //imprimimos en el html
    document.getElementById('contenedor').innerHTML = pokemons;
  }catch(error){
    console.log(error)
  }
}
//lama funcion inicial
cargarDatos(Urlpagina);
//obtenemos botones anterior siguiente
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
//agregamos evento click para siguiente y anterior
btnSiguiente.addEventListener('click',()=>{
  btnAnterior.disabled = false;
  btnAnterior.innerHTML = 'Anterior';
    pokemons = '';
    cargarDatos(UrlSig);
})
btnAnterior.addEventListener('click',()=>{
    if(Urlpre!=null){
      pokemons = '';
      cargarDatos(Urlpre);
    }else{
      btnAnterior.disabled = true;
      btnAnterior.innerHTML = '';
    }
})

 