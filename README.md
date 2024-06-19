# Marvel Characters App

## Descripción

Esta aplicación permite buscar y mostrar información sobre personajes de Marvel, utilizando la API de Marvel. Está desarrollada con Next.js, utilizando el sistema de App Routing. La aplicación cuenta con dos modos: desarrollo y producción, manejando correctamente la minimización y concatenación de assets.

## Demo

Actualmente la aplicación se encuentra desplegada en Vercel, puedes acceder a ella desde [aquí](https://zara-web-challenge-omega.vercel.app/dashboard/heroes),

## Configuración del Proyecto

### Requisitos

- Node.js >= 18
- Next >= 14

### Instalación

1. Clonar el repositorio:

   ```bash
   git clone (usa el enlace hhtp o ssh)
   cd zara-web-challenge

   ```

2. Instalar las dependencias:

   - `npm install`

3. Configurar las variables de entorno:
   `Crea un archivo .env.local en la raíz del proyecto con el siguiente contenido:`

- NEXT_PUBLIC_API_KEY=your_api_key_here
- NEXT_PRIVATE_API_KEY=your_private_api_key_here

### Scripts de NPM

· Desarrollo: Ejecutar la aplicación en modo desarrollo.

- `npm run dev`

· Producción: Construir la aplicación para producción.

- `npm run build`

· Iniciar Producción: Iniciar la aplicación en producción.

- `npm run start`

· Test: Ejecutar los test de integración.

- `npm test`

## Estructura del proyecto

- zara-web-challenge/
  - src/
    - app/ **_(Aqui encontraremos las rutas de la aplicación)_**
    - components/ **_(Aqui encontraremos los componentes UI)_**
    - context/ **_(Aqui encontraremos el context de la aplicación)_**
    - heroes/ **_(Aqui encontraremos los componentes e interfaces de los heroes)_**
    - services/ **_(Aqui encontraremos las llamadas a la API)_**
    - .env.local **_(Aqui has de configurar las variables de entorno)_**
    - package.json **_(Archivo donde encontramos las dependencias de la aplicación)_**
  - public/ **_(Aqui encontraremos los iconos e imágenes)_**

## Desarrollo

- **Vista Principal**:

  - La vista principal (app/dashboard/heroes) muestra una lista de personajes de Marvel y un campo de búsqueda para filtrar personajes por nombre.

- **Vista de Detalle**:

  - La vista de detalle (app/dashboard/heroe/[id]) muestra información detallada sobre un personaje seleccionado, incluyendo su imagen, descripción y cómics en los que aparece.

- **Vista Favoritos**:
  - La vista de heroes favoritos (app/dashboard/favoriteHeroes) muestra una lista de personajes de Marvel guardados como favoritos.
