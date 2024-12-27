// Variables
const marca = document.querySelector('#marca')
const year = document.querySelector('#year')
const minimo = document.querySelector('#minimo')
const maximo = document.querySelector('#maximo')
const puertas = document.querySelector('#puertas')
const transmision = document.querySelector('#transmision')
const color = document.querySelector('#color')

// Contenedor para los resultados
const resultado = document.querySelector('#resultado')


const yearMax = new Date().getFullYear()
const yearMin = yearMax - 10

// Generamos un objeto para la búsqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

// Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos) // Muestras los autos al cargar
    llenarSelect() // Llenar las opciones de años
})

// Event listener para los selects de búsqueda
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value
    // console.log(datosBusqueda)
    filtrarAuto()
})
year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value)
    filtrarAuto()
})
minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value
    filtrarAuto()
})
maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value
    filtrarAuto()
})
puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value)
    filtrarAuto()
})
transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value
    filtrarAuto()
})
color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value
    filtrarAuto()
    // console.log(datosBusqueda)
})





// Funciones
function mostrarAutos(autos) {

    limpiarHTML()

    autos.forEach( auto => {
        
        const {marca, modelo, year, precio, puertas, color, transmision} = auto;

        const autoHTML = document.createElement('P')
        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - Precio: ${precio} - Pertas: ${puertas} - Color: ${color} - ${transmision}
        `
        
        // Insertar en el HTML
        resultado.appendChild(autoHTML)

    } )   
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

function llenarSelect() {
    // console.log('llenando opciones al Select')
    
    for (let i = yearMax; i >= yearMin; i--) {
        const opcion = document.createElement('option')
        // console.log(i)
        opcion.value = i
        opcion.textContent = i
        year.appendChild(opcion)
    }
}

function filtrarAuto(auto) {
    console.log('filtrando')
    const resultado = autos.filter( filtraMarca )
    .filter( filtrarYear )
    .filter( filtrarMinimo )
    .filter( filtrarMaximo )
    .filter( filtrarPuertas )
    .filter( filtrarTransmision )
    .filter( filtrarColor )

    

    if(resultado.length) {
        console.log(resultado)
        mostrarAutos(resultado)
    } else {
        noResultado()
    }
}

function noResultado() {
    
    limpiarHTML()

    const mensaje = document.createElement('P')
    mensaje.classList.add('alerta', 'error')
    mensaje.textContent = 'No se encontraron resultados, intenta con otros criterios de búsqueda.'
    resultado.appendChild(mensaje)
}

function filtraMarca(auto) {
    const { marca } = datosBusqueda
    if(marca) {
        return auto.marca === marca
    }
    return auto
}

function filtrarYear(auto) {
    const { year } = datosBusqueda
    if(year) {
        return auto.year === year
    }
    return auto
}

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda
    if(minimo) {
        return auto.precio >= minimo
    }
    return auto
}

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda
    if(maximo) {
        return auto.precio <= maximo
    }
    return auto
}

function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda
    if(puertas) {
        return auto.puertas === puertas
    }
    return auto
}

function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda
    if(transmision) {
        return auto.transmision === transmision
    }
    return auto
}

function filtrarColor(auto) {
    const { color } = datosBusqueda
    if(color) {
        return auto.color === color
    }
    return auto
}