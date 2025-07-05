@echo off
setlocal

echo Creating local data directories for user uploads if they don't exist...
if not exist "local_data" mkdir local_data
if not exist "local_data\historial_academico" mkdir local_data\historial_academico
if not exist "local_data\historial_academico\titulaciones" mkdir local_data\historial_academico\titulaciones
if not exist "local_data\historial_academico\certificaciones" mkdir local_data\historial_academico\certificaciones
if not exist "local_data\historial_academico\cursos" mkdir local_data\historial_academico\cursos
if not exist "local_data\experiencia_profesional" mkdir local_data\experiencia_profesional
if not exist "local_data\experiencia_profesional\contratos" mkdir local_data\experiencia_profesional\contratos
if not exist "local_data\experiencia_profesional\vida_laboral" mkdir local_data\experiencia_profesional\vida_laboral
if not exist "local_data\investigacion" mkdir local_data\investigacion
if not exist "local_data\investigacion\publicaciones" mkdir local_data\investigacion\publicaciones
if not exist "local_data\investigacion\proyectos" mkdir local_data\investigacion\proyectos
if not exist "local_data\otros_meritos" mkdir local_data\otros_meritos

REM Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install it to continue.
    exit /b 1
)

REM Check if dependencies are installed
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

REM Start the application
echo Starting the application...
npm run dev
