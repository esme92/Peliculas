
//const base = "https://image.tmdb.org/t/p/original/"

//boton de paginacion
//la pagina siempre imicia en 1 y llega hasta 1000paginas
let pagina = 1;

let cargando = false
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');


btnSiguiente.addEventListener('click', () => {
	if(pagina < 1000 && !cargando){
		pagina += 1;
		cargarPeliculas();
	}
});

btnAnterior.addEventListener('click', () => {
	if(pagina > 1 && !cargando){
		pagina -= 1;
		cargarPeliculas();
	}
});
// obtener las peliculas  y con los arssreglos sacar los datos. imagen y titulo
const cargarPeliculas = async() => {
	try {
        cargando = true
		const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d8f9049d4aae5f26bb9e2c233fe45fc5&language=es-MX&page=${pagina}`);
	
		console.log(respuesta);

		// si la consola da el  status 200 es correcto y si es 500 es error
		if(respuesta.status === 200){
			const datos = await respuesta.json();
			
			let peliculas = '';
			datos.results.forEach(pelicula => {
				peliculas += `
					<div class="pelicula">
						<img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
						<h3 class="titulo">${pelicula.title}</h3>
                        <h3 class="titulo">${pelicula.overview}</h3>
					</div>
				`;
			});

			document.getElementById('contenedor').innerHTML = peliculas;

		} else {
			console.log('Error');
		}

	} catch(error){
		console.log(error);
	}
    cargando = false

}

cargarPeliculas();

/*function getPopular() {
    return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=d8f9049d4aae5f26bb9e2c233fe45fc5&language=en-US&page=1`)
	
    .then(response => response.json())  // convertir a json
}


async function init() {
    
    const response = await getPopular();
    const lista = response.results
    const contenedor = document.getElementById("lista")
    
    response.results.forEach(pelicula => {
        const elemento = document.createElement("li")
        elemento.innerHTML = pelicula.original_title
        contenedor.appendChild(elemento)
  
        const imagen = document.createElement("img")
        imagen.src = base + pelicula.poster_path
        contenedor.appendChild(imagen)
  
        const resumen = document.createElement("li")
        resumen.innerHTML = pelicula.overview
        contenedor.appendChild(resumen)
    });
    
  }
init()*/





