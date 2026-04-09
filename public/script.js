const titulo = document.getElementById("titulo-lugar");
const imagen = document.getElementById("imagen-lugar");
const descripcion = document.getElementById("descripcion-lugar");

let lugares = [];

try {
    const response = await fetch("http://localhost:3000/api", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    } );
    const data = await response.json();
    lugares = data;
    titulo.textContent = lugares[0].titulo;
    imagen.src = lugares[0].imagen;
    descripcion.textContent = lugares[0].descripcion;
}catch (error) {
    console.error("Error al cargar los lugares:", error);
}