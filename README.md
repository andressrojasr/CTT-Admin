# CTT-Admin

Sistema de administración para el Centro de Transferencia Tecnológica (CTT). Plataforma web construida con React y Vite para la gestión de cursos, estudiantes y contenido educativo.

## 📋 Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Scripts Disponibles](#scripts-disponibles)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Configuración](#configuración)
- [Características Principales](#características-principales)

## 🚀 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **npm** o **yarn** (gestor de paquetes)

## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/andressrojasr/CTT-Admin.git
   cd ctt-admin
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno** (si es necesario)
   - Crea un archivo `.env` en la raíz del proyecto
   - Configura las URLs de la API y otras variables necesarias

## 🛠️ Scripts Disponibles

- **`npm run dev`** - Inicia el servidor de desarrollo en modo local
- **`npm run build`** - Genera la versión de producción optimizada
- **`npm run preview`** - Previsualiza la versión de producción localmente
- **`npm run lint`** - Ejecuta ESLint para verificar la calidad del código

## 📁 Estructura del Proyecto

```
ctt-admin/
├── public/                      # Archivos estáticos públicos
├── src/                         # Código fuente de la aplicación
│   ├── api/                     # Configuración y servicios de API
│   │   ├── api.js              # Cliente HTTP base (Axios)
│   │   ├── auth.js             # Servicios de autenticación
│   │   ├── courses.js          # Servicios de gestión de cursos
│   │   └── users.js            # Servicios de gestión de usuarios
│   │
│   ├── assets/                  # Recursos estáticos (imágenes, iconos, etc.)
│   │
│   ├── components/              # Componentes reutilizables
│   │   ├── courses/            # Componentes específicos de cursos
│   │   │   ├── CourseContent.jsx       # Contenido del curso
│   │   │   ├── CourseDates.jsx         # Fechas del curso
│   │   │   ├── CourseHeader.jsx        # Encabezado del curso
│   │   │   ├── CourseMaterials.jsx     # Materiales del curso
│   │   │   ├── CourseObjectives.jsx    # Objetivos del curso
│   │   │   ├── CourseRequirements.jsx  # Requisitos del curso
│   │   │   ├── CourseSidebar.jsx       # Barra lateral del curso
│   │   │   ├── StepContents.jsx        # Paso: contenidos
│   │   │   ├── StepGeneralData.jsx     # Paso: datos generales
│   │   │   ├── StepImages.jsx          # Paso: imágenes
│   │   │   ├── StepNavigation.jsx      # Navegación entre pasos
│   │   │   └── StepRequirements.jsx    # Paso: requisitos
│   │   │
│   │   ├── Banner.jsx           # Componente de banner
│   │   ├── BannerImage.jsx      # Banner con imagen
│   │   ├── CardCourse.jsx       # Tarjeta de curso
│   │   ├── carrussel.jsx        # Carrusel de contenido
│   │   ├── CourseSection.jsx    # Sección de curso
│   │   ├── CoursesList.jsx      # Lista de cursos
│   │   ├── FilterSideBar.jsx    # Barra lateral de filtros
│   │   ├── Footer.jsx           # Pie de página
│   │   ├── header.jsx           # Encabezado principal
│   │   ├── hero.jsx             # Sección hero
│   │   ├── itemHeader.jsx       # Item de encabezado
│   │   ├── Menu.jsx             # Menú de navegación
│   │   ├── nav.jsx              # Barra de navegación
│   │   ├── section.jsx          # Sección genérica
│   │   ├── stats.jsx            # Estadísticas
│   │   └── Table.jsx            # Tabla de datos
│   │
│   ├── hooks/                   # Custom hooks de React
│   │   ├── useCourseData.js    # Hook para datos de cursos
│   │   └── useCourseForm.js    # Hook para formulario de cursos
│   │
│   ├── pages/                   # Páginas/Vistas principales
│   │   ├── courses/            # Páginas de cursos
│   │   │   ├── CourseDetail.jsx    # Detalle de un curso
│   │   │   └── FormCourse.jsx      # Formulario de curso
│   │   │
│   │   ├── Cursos.jsx          # Página de listado de cursos
│   │   ├── Dashboard.jsx       # Panel de control
│   │   ├── Estudiantes.jsx     # Página de estudiantes
│   │   ├── home.jsx            # Página de inicio
│   │   └── Login.jsx           # Página de inicio de sesión
│   │
│   ├── utils/                   # Utilidades y helpers
│   │
│   ├── App.css                  # Estilos globales de la aplicación
│   ├── App.jsx                  # Componente principal de la aplicación
│   ├── index.css                # Estilos base
│   └── main.jsx                 # Punto de entrada de la aplicación
│
├── .eslintrc.js                 # Configuración de ESLint
├── index.html                   # HTML principal
├── package.json                 # Dependencias y scripts
├── vite.config.js              # Configuración de Vite
└── README.md                    # Este archivo
```

## 🔧 Tecnologías Utilizadas

### Core
- **React 19.1.1** - Biblioteca de interfaz de usuario
- **Vite 7.1.2** - Herramienta de construcción y desarrollo
- **React Router DOM 7.9.1** - Enrutamiento de la aplicación

### UI y Estilos
- **Tailwind CSS 4.1.13** - Framework de CSS utility-first
- **Headless UI 2.2.8** - Componentes UI sin estilos
- **Heroicons 2.2.0** - Iconos SVG
- **React Icons 5.5.0** - Biblioteca de iconos
- **AOS 2.3.4** - Animaciones al hacer scroll

### HTTP y Estado
- **Axios 1.12.2** - Cliente HTTP para peticiones a la API

### Desarrollo
- **ESLint 9.33.0** - Linter para mantener calidad de código
- **@vitejs/plugin-react 5.0.0** - Plugin de React para Vite

## ⚙️ Configuración

### Variables de Entorno

El proyecto puede requerir variables de entorno. Crea un archivo `.env` en la raíz:

```env
VITE_API_URL=http://tu-api-url.com
VITE_API_KEY=tu-api-key
```

### Configuración de Vite

La configuración de Vite se encuentra en `vite.config.js` y puede ser personalizada según las necesidades del proyecto.

### Configuración de ESLint

El proyecto utiliza ESLint con reglas específicas para React. La configuración se encuentra en `eslint.config.js`.

## ✨ Características Principales

### 1. Gestión de Cursos
- **Listado de cursos** - Vista de todos los cursos disponibles
- **Detalle de curso** - Información completa de cada curso
- **Creación y edición** - Formulario multi-paso para gestionar cursos
- **Filtrado y búsqueda** - Herramientas para encontrar cursos específicos

### 2. Gestión de Estudiantes
- **Listado de estudiantes** - Vista de todos los estudiantes registrados
- **Gestión de datos** - Administración de información de estudiantes

### 3. Dashboard
- **Panel de control** - Vista general del sistema
- **Estadísticas** - Métricas y datos importantes

### 4. Autenticación
- **Sistema de login** - Autenticación de usuarios
- **Gestión de sesiones** - Control de acceso a la plataforma

## 📝 Estructura de Componentes

### Componentes de Cursos
Los componentes relacionados con cursos están organizados en pasos para facilitar la creación y edición:

1. **StepGeneralData** - Información general del curso
2. **StepImages** - Gestión de imágenes del curso
3. **StepContents** - Contenido y estructura del curso
4. **StepRequirements** - Requisitos y condiciones

### Custom Hooks

- **useCourseData** - Manejo de datos de cursos (obtención, actualización)
- **useCourseForm** - Lógica del formulario de cursos (validación, estados)

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:5173
```

## 📄 Licencia

Este proyecto es privado y está desarrollado para el Centro de Transferencia Tecnológica.

## 👥 Contribución

Para contribuir al proyecto:

1. Crea una rama desde `main`: `git checkout -b feature/nueva-caracteristica`
2. Realiza tus cambios y haz commit: `git commit -m 'feat: agregar nueva característica'`
3. Sube tus cambios: `git push origin feature/nueva-caracteristica`
4. Crea un Pull Request

---

**Desarrollado por:** [Andrés Rojas](https://github.com/andressrojasr)
