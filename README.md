# Lugares Asombrosos

Aplicación web que muestra lugares naturales e históricos de Sudamérica, con su foto, su país y una breve descripción. Cada vez que tocás **Generar nuevo lugar** aparece otro lugar al azar. Un pequeño servidor HTTP en Node.js (sin frameworks) sirve el frontend y expone una API con los datos de los lugares.

## Características

- **28 lugares de 10 países** sudamericanos: Argentina, Bolivia, Brasil, Chile, Colombia, Ecuador, Paraguay, Perú, Uruguay y Venezuela (por ejemplo, el Glaciar Perito Moreno, el Salar de Uyuni, Machu Picchu o el Salto Ángel).
- **Servidor HTTP propio** con el módulo nativo `node:http`, sin Express ni otras dependencias de producción.
- **Servidor de archivos estáticos** casero que detecta el `Content-Type` según la extensión del archivo, responde 404 si no existe y bloquea rutas fuera de `public/`.
- **API REST** en `/api` que devuelve un lugar al azar en JSON.
- **CORS habilitado** y manejo de solicitudes *preflight* (`OPTIONS`).
- **Frontend en HTML, CSS y JavaScript puro** con un botón para generar un nuevo lugar (sin repetir el que ya se muestra).

## Tecnologías

- [Node.js](https://nodejs.org/) (módulos ES, `node:http`, `node:fs/promises`)
- HTML5, CSS3 y JavaScript (vanilla)
- [nodemon](https://nodemon.io/) para recargar el servidor en desarrollo
- Fuente [Inter](https://fonts.google.com/specimen/Inter) de Google Fonts

## Requisitos

- Node.js **20.11 o superior** (el servidor usa `import.meta.dirname`)
- npm

## Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/Cheeskoo/lugares-asombrosos.git
cd lugares-asombrosos

# Instalar dependencias
npm install

# Iniciar en modo desarrollo (se reinicia al guardar cambios)
npm run dev

# o iniciar en modo normal
npm start
```

Después abrí <http://localhost:3000> en el navegador. Para usar otro puerto: `PORT=8080 npm start`.

## API

| Método | Ruta   | Descripción                                   |
|--------|--------|-----------------------------------------------|
| GET    | `/api` | Devuelve un lugar elegido al azar, en JSON.   |

Ejemplo de respuesta (cada lugar en `data.json` tiene esta forma):

```json
{
  "pais": "Argentina",
  "titulo": "Glaciar Perito Moreno",
  "descripcion": "Una imponente masa de hielo milenario famosa por sus constantes desprendimientos y su color azul eléctrico.",
  "imagen": "imagenes/glaciar-perito-moreno.jpg"
}
```

Otras rutas bajo `/api` responden 404, y otros métodos en `/api` responden 405. Cualquier ruta que no empiece con `/api` se sirve como archivo estático desde la carpeta `public/`.

## Estructura del proyecto

```
lugares-asombrosos/
├── server.js               # Servidor HTTP: rutas /api y archivos estáticos
├── data.json               # Datos de los lugares (país, título, descripción, imagen)
├── public/                 # Frontend (archivos estáticos)
│   ├── index.html
│   ├── style.css
│   ├── script.js           # Pide un lugar a /api y lo muestra
│   ├── imagenes/           # Fotos de cada lugar
│   └── imagen/
│       └── background.jpg  # Imagen de fondo
├── utils/
│   ├── serverStatic.js     # Sirve archivos de public/
│   ├── getContent.js       # Lee data.json y responde con un lugar al azar
│   ├── getContentType.js   # Content-Type según la extensión
│   └── sendResponse.js     # Helper para enviar respuestas
├── package.json
└── package-lock.json
```

## Agregar un lugar nuevo

1. Guardá la foto en `public/imagenes/` (por ejemplo `mi-lugar.jpg`).
2. Agregá un objeto a `data.json` con `pais`, `titulo`, `descripcion` e `imagen` (`"imagenes/mi-lugar.jpg"`).
3. Reiniciá el servidor si no estás usando `npm run dev`.

## Autor

Hecho por **Franco Calderon** ([@Cheeskoo](https://github.com/Cheeskoo)).
