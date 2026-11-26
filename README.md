# Lugares Asombrosos

Aplicación web que muestra lugares naturales e históricos de Sudamérica, con su foto, su país y una breve descripción. Un pequeño servidor HTTP en Node.js (sin frameworks) sirve el frontend y expone una API con los datos de los lugares.

> **Estado:** proyecto en desarrollo. La API y la carga dinámica de lugares todavía se están armando (ver [Estado actual](#estado-actual)).

## Características

- **28 lugares de 10 países** sudamericanos: Argentina, Bolivia, Brasil, Chile, Colombia, Ecuador, Paraguay, Perú, Uruguay y Venezuela (por ejemplo, el Glaciar Perito Moreno, el Salar de Uyuni, Machu Picchu o el Salto Ángel).
- **Servidor HTTP propio** con el módulo nativo `node:http`, sin Express ni otras dependencias de producción.
- **Servidor de archivos estáticos** casero que detecta el `Content-Type` según la extensión del archivo.
- **API REST** en `/api` que devuelve la información de los lugares en JSON.
- **CORS habilitado** y manejo de solicitudes *preflight* (`OPTIONS`).
- **Frontend en HTML, CSS y JavaScript puro** con un botón para generar un nuevo lugar.

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

Después abrí <http://localhost:3000> en el navegador.

## API

| Método | Ruta   | Descripción                                   |
|--------|--------|-----------------------------------------------|
| GET    | `/api` | Devuelve información de los lugares en JSON.  |

Cada lugar en `data.json` tiene esta forma:

```json
{
  "pais": "Argentina",
  "titulo": "Glaciar Perito Moreno",
  "descripcion": "Una imponente masa de hielo milenario famosa por sus constantes desprendimientos y su color azul eléctrico.",
  "imagen": "imagenes/glaciar-perito-moreno.jpg"
}
```

Cualquier otra ruta que no empiece con `/api` se sirve como archivo estático desde la carpeta `public/`.

## Estructura del proyecto

```
lugares-asombrosos/
├── server.js               # Servidor HTTP: rutas /api y archivos estáticos
├── data.json               # Datos de los lugares (país, título, descripción, imagen)
├── imagenes/               # Fotos de cada lugar
├── public/                 # Frontend
│   ├── index.html
│   ├── style.css
│   ├── script.js           # Pide los datos a /api y los muestra
│   └── imagen/
│       └── background.jpg  # Imagen de fondo
├── utils/
│   ├── serverStatic.js     # Sirve archivos de public/
│   ├── getContent.js       # Lee data.json y arma la respuesta de la API
│   ├── getContentType.js   # Content-Type según la extensión
│   └── sendResponse.js     # Helper para enviar respuestas
├── package.json
└── package-lock.json
```

## Estado actual

Pendientes para que la app funcione de punta a punta:

- Importar `getContent` en `server.js` y corregir sus imports (`./contentType.js` no existe; la función correcta es `getContentType` en `./getContentType.js`).
- En `getContent.js`, parsear el JSON con `JSON.parse` y usar `Math.floor` para elegir un lugar al azar.
- Cargar `script.js` con `type="module"` (usa `await` de nivel superior) y conectar el botón **Generar nuevo lugar**.
- Servir la carpeta `imagenes/` desde el servidor para que el frontend pueda mostrar las fotos.

## Autor

Hecho por **Franco Calderon** ([@Cheeskoo](https://github.com/Cheeskoo)).
