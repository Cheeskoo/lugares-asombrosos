const titulo = document.getElementById("titulo-lugar");
const imagen = document.getElementById("imagen-lugar");
const descripcion = document.getElementById("descripcion-lugar");
const boton = document.getElementById("generar-lugar");

let lugarActual = null;

async function cargarLugar() {
    boton.disabled = true;
    try {
        let lugar;
        /* Pide otro lugar si la API devuelve el mismo que ya se muestra */
        for (let intento = 0; intento < 5; intento++) {
            const response = await fetch("/api");
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            lugar = await response.json();
            if (lugar.titulo !== lugarActual?.titulo) break;
        }
        lugarActual = lugar;
        titulo.textContent = `${lugar.titulo} (${lugar.pais})`;
        imagen.src = lugar.imagen;
        imagen.alt = lugar.titulo;
        descripcion.textContent = lugar.descripcion;
    } catch (error) {
        console.error("Error al cargar los lugares:", error);
        descripcion.textContent = "No se pudo cargar el lugar. Intentá de nuevo.";
    } finally {
        boton.disabled = false;
    }
}

boton.addEventListener("click", cargarLugar);
cargarLugar();
