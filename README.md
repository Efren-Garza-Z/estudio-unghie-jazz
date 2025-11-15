# 💅 Estudio Unghie JAZZ - Aplicación de Gestión de Citas (DEMO)

Este proyecto es una aplicación web prototipo (Single Page Application - SPA) desarrollada con **React** y estilizada con **Tailwind CSS**.  
Su objetivo principal es ofrecer una experiencia de usuario moderna y fluida, inspirada en la interfaz de usuario de **iOS**, para gestionar servicios de belleza (uñas) y agendar citas.

---

## 📌 Estado Actual

El proyecto se encuentra en **fase de demo**.  
La estructura de componentes y el diseño visual están completos, pero las funcionalidades de **persistencia de datos** (por ejemplo, guardar citas en una base de datos) están en desarrollo.

---

## ✨ Características Clave

- **Diseño "iOS-Like"**: Estilo visual oscuro, efectos blur y tipografía elegante.
- **Diseño Responsivo**: Optimizado para dispositivos móviles.
- **Vistas Incluidas**:
  - Landing Page con servicios destacados  
  - Galería de Servicios  
  - Pantalla de Agendamiento de Citas  

---

## 🛠️ Configuración e Instalación

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

---

### 1. Requisitos Previos

Necesitas tener instalado en tu sistema:

- **Node.js** — versión **18 o superior**
- **npm** — administrador de paquetes de Node (viene con Node.js)

---

### 2. Dependencias Principales

El proyecto usa **Vite** como entorno de desarrollo y bundler, junto con **React**.

Instalar todas las dependencias del proyecto:

Ejecuta en la carpeta raíz:

```bash
npm install
```

### 3. ⚙️ Configuración Específica de Tailwind CSS (¡Versión 3!)

La aplicación utiliza Tailwind CSS v3.x.
Es crucial seguir estos pasos para evitar errores de compatibilidad con PostCSS.

#### 🔄 Desinstalar versiones previas

Primero, limpia instalaciones anteriores:

``` bash
npm uninstall tailwindcss postcss autoprefixer @tailwindcss/postcss
```
#### 📦 Instalar Tailwind CSS v3.x, PostCSS y Autoprefixer

```bash
npm install -D tailwindcss@3 postcss autoprefixer
```

#### 📝 Inicializar configuración de Tailwind + PostCSS

```bash
npx tailwindcss init -p
```

Esto genera:

- tailwind.config.js

- postcss.config.js

### ✔ Verificar postcss.config.js

Debe tener:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### ✔ Verificar tailwind.config.js

Asegúrate de que la sección content incluya:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
```

(Además de tus configuraciones de colores y fuentes).

### ✔ src/index.css obligatorio

Debe empezar con:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
/* estilos globales opcionales */
---
### 🚀 Ejecución del Proyecto

Una vez que todo esté instalado correctamente:

```bash
npm run dev
```

El servidor se iniciará y mostrará una URL del estilo:

```arduino
http://localhost:5173/
```

Ábrela en tu navegador para ver la aplicación funcionando.