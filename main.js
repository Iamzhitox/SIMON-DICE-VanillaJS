const verde = document.querySelector('.verde')
const amarillo = document.querySelector('.amarillo')
const azul = document.querySelector('.azul')
const rojo = document.querySelector('.rojo')

const tecla = document.querySelector('.tecla')
const btnJugar = document.querySelector('#jugar')

const puntaje = document.querySelector('.modal p')
const nivel = document.querySelector('.nivel h3')
const intentarDeNuevo = document.querySelector('#try-again')

const audioEmpezar = new Audio('sonido/empezar(1).mp3')
const audioTocar = new Audio('sonido/toque(1).mp3')
const delPatron = new Audio('sonido/patron(1).mp3')
const nivelPasado = new Audio('sonido/nivel-pasado(1).mp3')
const perdiste = new Audio('sonido/perdiste(1).mp3')

cargarEventos()

let contador = 1
const colores = {
    0: 'verde',
    1: 'amarillo',
    2: 'azul',
    3: 'rojo'
}

let mayorPuntuacion
let patron = []
let seguirPatron = []

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', () => {
        mayorPuntuacion = JSON.parse(localStorage.getItem('mayorPuntuacion')) || 0;
        puntaje.textContent = `Mejor Puntuacion: ${mayorPuntuacion}`
        console.log(mayorPuntuacion)
    })
    btnJugar.addEventListener('click', iniciarJuego)

    verde.addEventListener('click', colorAlTocar)
    amarillo.addEventListener('click', colorAlTocar)
    azul.addEventListener('click', colorAlTocar)
    rojo.addEventListener('click', colorAlTocar)

    intentarDeNuevo.addEventListener('click', () => {
        if (contador-1 > mayorPuntuacion) {
            localStorage.setItem('mayorPuntuacion', JSON.stringify(contador-1))
        }
        location.reload()
    })
}

function iniciarJuego() {
    audioEmpezar.play()
    const containerToRemove = btnJugar.parentElement.parentElement
    containerToRemove.style.display = 'none'

    setTimeout(() => patronRandom(), 1000);
}

function colorAlTocar(e) {
    audioTocar.play()

    if(e.target.classList.contains('verde')) seguirPatron.push(0) 
    if(e.target.classList.contains('amarillo')) seguirPatron.push(1)
    if(e.target.classList.contains('azul')) seguirPatron.push(2)
    if(e.target.classList.contains('rojo')) seguirPatron.push(3)

    for (let i = 0; i < seguirPatron.length; i++) {
        if (seguirPatron[i] !== patron[i]) {
            nivel.textContent = `Le erraste :(`
            setTimeout(() => perdiste.play(), 100);
            intentarDeNuevo.style.opacity = 1
            console.log('No coinciden')
            return
        }
        console.log(seguirPatron[i], ' = ', patron[i])
    }

    console.log(seguirPatron)

    if(seguirPatron.length === patron.length) {
        console.log('El patrón está correcto')
        nivel.textContent = `Nivel ${contador}`
        seguirPatron = []
        patronRandom()
    }

}

function patronRandom() {
    if (contador > 1) setTimeout(() => nivelPasado.play(), 100);
    
    patron = []
    console.log(`Contador: ${contador}`)
    for (let i = 0; i < contador; i++) {
        const numeroRandom = Math.floor(Math.random() * 4)
        patron.push(numeroRandom)
        console.log(numeroRandom)
    }
    activarColor(patron)
    contador++
    console.log(patron)
}

function activarColor(patron) {
    let pasada = 1
    patron.forEach(color => {
        if (colores[color] === 'verde') {

            setTimeout(() => {
                verde.classList.remove('tecla')
                verde.classList.add('tecla-activa')
                audioTocar.play()
            }, pasada * 1000);

            console.log(`Pintando: ${colores[color]}`)

            setTimeout(() => {
                verde.classList.remove('tecla-activa')
                verde.classList.add('tecla')
            }, pasada * 1000 + 600);
        }
        if (colores[color] === 'amarillo') {

            setTimeout(() => {
                amarillo.classList.remove('tecla')
                amarillo.classList.add('tecla-activa')
                audioTocar.play()
            }, pasada * 1000);

            console.log(`Pintando: ${colores[color]}`)

            setTimeout(() => {
                amarillo.classList.remove('tecla-activa')
                amarillo.classList.add('tecla')
            }, pasada * 1000 + 600);
        }
        if (colores[color] === 'azul') {

            setTimeout(() => {
                azul.classList.remove('tecla')
                azul.classList.add('tecla-activa')
                audioTocar.play()
            }, pasada * 1000);

            console.log(`Pintando: ${colores[color]}`)

            setTimeout(() => {
                azul.classList.remove('tecla-activa')
                azul.classList.add('tecla')
            }, pasada * 1000 + 600);
        }
        if (colores[color] === 'rojo') {

            setTimeout(() => {
                rojo.classList.remove('tecla')
                rojo.classList.add('tecla-activa')
                audioTocar.play()
            }, pasada * 1000);

            console.log(`Pintando: ${colores[color]}`)

            setTimeout(() => {
                rojo.classList.remove('tecla-activa')
                rojo.classList.add('tecla')
            }, pasada * 1000 + 600);
        }
        pasada++
    })
}
