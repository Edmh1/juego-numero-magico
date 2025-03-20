// Variables globales
let numeroMagico = 0;
let intentos = [];
const maxIntentos = 10;

// Elementos del DOM
const inputNumero = document.getElementById("number");
const btnIntentar = document.getElementById("btn-check");
const btnReiniciar = document.getElementById("btn-restart");
const tablaIntentos = document.getElementById("table");

// Inicializar el juego
document.addEventListener("DOMContentLoaded", iniciarJuego);
btnIntentar.addEventListener("click", compararNumeros);
btnReiniciar.addEventListener("click", iniciarJuego);

// Función para inicializar el juego
function iniciarJuego() {
    numeroMagico = Math.floor(Math.random() * 100) + 1; 
    intentos = [];
    tablaIntentos.innerHTML = "";
    inputNumero.value = "";
    inputNumero.disabled = false;
    btnIntentar.disabled = false;
    btnReiniciar.style.display = "none";
}

// Función para obtener el número ingresado
function obtenerNumero() {
    return parseInt(inputNumero.value);
}

// Función para comparar el número ingresado con el número mágico
function compararNumeros() {
    const numeroIngresado = obtenerNumero();

    // Validar si el número es válido
    if (isNaN(numeroIngresado) || numeroIngresado < 1 || numeroIngresado > 100) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Debe ser un número entre 1 y 100",
        });
        return;
    }

    intentos.push(numeroIngresado);
    actualizarTabla();

    // Comparar números
    if (numeroIngresado > numeroMagico) {
        Swal.fire({
            icon: "info",
            title: "Intenta de nuevo",
            text: "El número es menor.",
        });
    } else if (numeroIngresado < numeroMagico) {
        Swal.fire({
            icon: "info",
            title: "Intenta de nuevo",
            text: "El número es mayor.",
        });
    } else {
        Swal.fire({
            icon: "success",
            title: "¡Felicidades!",
            text: "Adivinaste el número.",
        });
        finalizarJuego();
        return;
    }

    // Verificar si se acabaron los intentos
    if (intentos.length >= maxIntentos) {
        Swal.fire({
            icon: "warning",
            title: "Juego terminado",
            text: `Se acabaron los intentos. El número era ${numeroMagico}.`,
        });
        finalizarJuego();
    }
}

// Función para actualizar la tabla de intentos
function actualizarTabla() {
    tablaIntentos.innerHTML = ""; 

    intentos.forEach((num, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `<td>${index + 1}</td><td>${num}</td>`;
        tablaIntentos.appendChild(fila);
    });
}

// Función para finalizar el juego
function finalizarJuego() {
    inputNumero.disabled = true;
    btnIntentar.disabled = true;
    btnReiniciar.style.display = "block";
}
