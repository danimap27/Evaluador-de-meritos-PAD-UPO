# Evaluador de Méritos PAD UPO

Este proyecto es una aplicación web desarrollada con React y Vite, diseñada para la evaluación de méritos, probablemente en el contexto de la Universidad Pablo de Olavide (UPO). Permite a los usuarios introducir información en diferentes secciones (A, B, C, D y Fase 2) y visualizar una puntuación o evaluación basada en los datos introducidos.

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
