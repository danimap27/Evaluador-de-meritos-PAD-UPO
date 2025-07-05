# Evaluador de Méritos PAD UPO

Esta es una herramienta para calcular la puntuación de los méritos del Personal de Administración y Dirección (PAD) de la Universidad Pablo de Olavide (UPO).

## Ejecución en Local

Para ejecutar la aplicación en tu máquina local, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone <URL-del-repositorio>
    cd evaluador-de-meritos-pad-upo
    ```

2.  **Ejecuta el script de inicio:**
    *   En **Windows**, haz doble clic en el fichero `run.bat`.
    *   En **macOS o Linux**, ejecuta el siguiente comando en la terminal:
        ```bash
        sh run.sh
        ```

    El script se encargará de instalar las dependencias necesarias (`npm install`) y de iniciar el servidor de desarrollo (`npm run dev`).

3.  **Abre la aplicación en tu navegador:**
    Una vez que el servidor esté en marcha, la terminal te mostrará una URL local (normalmente `http://localhost:5173`). Abre esa dirección en tu navegador para usar la aplicación.

## Estructura de Carpetas para Documentos (Local)

Al ejecutar la aplicación por primera vez con el script `run.bat` o `run.sh`, se creará una carpeta `local_data` en la raíz del proyecto. Esta carpeta está diseñada para que puedas organizar y guardar los documentos que acreditan tus méritos *antes* de subirlos a la aplicación.

La estructura creada es la siguiente:

```
/evaluador-de-meritos-pad-upo
|-- local_data/
|   |-- historial_academico/
|   |   |-- titulaciones/       # PDFs de títulos universitarios, etc.
|   |   |-- certificaciones/    # Certificados de idiomas, etc.
|   |   |-- cursos/             # Diplomas de cursos de formación.
|   |
|   |-- experiencia_profesional/
|   |   |-- contratos/          # Contratos de trabajo.
|   |   |-- vida_laboral/       # Informe de vida laboral.
|   |
|   |-- investigacion/
|   |   |-- publicaciones/      # Artículos, capítulos de libros.
|   |   |-- proyectos/          # Certificados de participación en proyectos.
|   |
|   |-- otros_meritos/          # Cualquier otro documento relevante.
|
|-- ... (resto de ficheros del proyecto)
```

**Importante:** La carpeta `local_data` y todo su contenido están excluidos del control de versiones de Git (a través del fichero `.gitignore`), por lo que tus documentos personales nunca se subirán al repositorio de Git.

## Funcionalidad de Subida y Exportación de Justificantes

La aplicación permite adjuntar ficheros justificantes a cada mérito individualmente. Estos ficheros se almacenan temporalmente en la memoria del navegador mientras usas la aplicación.

### Exportar a ZIP

Al hacer clic en el botón "Exportar a ZIP", la aplicación generará un fichero `.zip` que contendrá:

1.  **`resumen_meritos.txt`:** Un fichero de texto con un informe detallado de todos los méritos introducidos. Este informe incluye:
    *   La puntuación total estimada.
    *   La puntuación estimada por cada sección.
    *   Un desglose completo de todos los datos que has introducido en cada campo de cada mérito.
    *   La ruta relativa dentro del ZIP de cada fichero justificante que hayas adjuntado.

2.  **Carpeta `justificantes/`:** Una carpeta que contendrá todos los ficheros justificantes que hayas subido, organizados en una estructura de subcarpetas que replica la clasificación de los méritos. Por ejemplo:

    ```
    /evaluacion_meritos_upo.zip
    |-- resumen_meritos.txt
    |-- justificantes/
    |   |-- historial_academico/
    |   |   |-- titulaciones/       # Tus PDFs de títulos
    |   |   |-- certificaciones/    # Tus PDFs de certificados
    |   |   |-- cursos/             # Tus PDFs de diplomas de cursos
    |   |
    |   |-- experiencia_profesional/
    |   |   |-- contratos/          # Tus PDFs de contratos
    |   |   |-- vida_laboral/       # Tu PDF de vida laboral
    |   |
    |   |-- investigacion/
    |   |   |-- publicaciones/      # Tus PDFs de publicaciones
    |   |   |-- proyectos/          # Tus PDFs de proyectos
    |   |
    |   |-- otros_meritos/          # Tus PDFs de otros justificantes
    ```

Esta funcionalidad te permite tener un respaldo organizado de toda la información y los documentos asociados a tu evaluación de méritos.

## Cómo Funciona

La aplicación se compone de varias secciones interactivas donde el usuario puede introducir datos relevantes para la evaluación de méritos. Utiliza `uuid` para la gestión de identificadores únicos, `recharts` para la visualización de datos (probablemente la puntuación final o desgloses), y `zustand` (a través del hook `useMeritStore`) para la gestión del estado global de la aplicación.

El flujo general es el siguiente:

1.  El usuario introduce datos en las diferentes secciones (A, B, C, D, Fase 2).
2.  La aplicación procesa estos datos para calcular una puntuación.
3.  La puntuación se visualiza de alguna manera (por ejemplo, con gráficos).

## Dependencias

El proyecto utiliza las siguientes tecnologías y librerías principales:

- **React**: Una librería de JavaScript para construir interfaces de usuario.
- **Vite**: Un entorno de desarrollo frontend de próxima generación que proporciona una experiencia de desarrollo extremadamente rápida.
- **TypeScript**: Un superconjunto de JavaScript que añade tipado estático.
- **uuid**: Para la generación de identificadores únicos universales.
- **recharts**: Una librería de gráficos componible construida con React.
- **Zustand**: Una solución de gestión de estado pequeña, rápida y escalable para React.
- **JSZip**: Para la creación de ficheros ZIP en el navegador.
- **File-Saver**: Para la descarga de ficheros generados en el navegador.

Las dependencias exactas se pueden encontrar en el archivo `package.json`.

## Cómo Ejecutar el Proyecto

Sigue estos pasos para poner en marcha el proyecto en tu máquina local:

### 1. Instalación de Dependencias

Abre una terminal en la raíz del proyecto y ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
npm install
```

### 2. Ejecutar la Aplicación

Una vez que las dependencias estén instaladas, puedes iniciar el servidor de desarrollo. Hemos proporcionado scripts convenientes para diferentes sistemas operativos:

- **En Windows:**
  Haz doble clic en `run.bat` o ejecuta el siguiente comando en la línea de comandos:

  ```bash
  run.bat
  ```

- **En Linux/macOS:**
  Abre una terminal y ejecuta el siguiente comando:
  ```bash
  bash run.sh
  ```

Ambos scripts iniciarán el servidor de desarrollo de Vite y abrirán automáticamente tu navegador web en `http://localhost:5173`, donde podrás interactuar con la aplicación.

### 3. Construir para Producción (Opcional)

Si deseas construir la aplicación para despliegue en producción, puedes usar el siguiente comando:

```bash
npm run build
```

Esto generará los archivos estáticos optimizados en la carpeta `dist/`.

## Contribución

Si deseas contribuir a este proyecto, por favor, sigue las prácticas estándar de desarrollo de software (fork, branch, pull request).

## Licencia

[Considera añadir una sección de licencia aquí, por ejemplo, MIT, Apache 2.0, etc.]
