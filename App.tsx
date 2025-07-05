import React, { useState, useEffect } from "react";
import { useMeritStore } from "./hooks/useMeritStore";
import { SectionA } from "./components/sections/SectionA";
import { SectionB } from "./components/sections/SectionB";
import { SectionC } from "./components/sections/SectionC";
import { SectionD } from "./components/sections/SectionD";
import { SectionPhase2 } from "./components/sections/SectionPhase2";
import { ScoreVisualization } from "./components/ScoreVisualization";
import { Disclaimer } from "./components/Disclaimer";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookOpenIcon,
  DownloadIcon,
} from "./components/Icons";
import { AppState } from "./types";
import { useTheme } from "./ThemeContext";
import Footer from "./components/shared/Footer";
import { useSound } from "./hooks/useSound";
import CongratulationsPopup from "./components/CongratulationsPopup";

export type ContestType = "adaptacion" | "acceso";

const SECTIONS = ["A", "B", "C", "D", "Fase 2"];

const MAX_SCORES = {
  A: 100,
  B: 100,
  C: 100,
  D: 100,
  Phase2: 100,
};

const CONGRATULATIONS_MESSAGES = {
  A: "¡Has alcanzado la máxima puntuación en Historial Académico! Tu trayectoria es impecable.",
  B: "¡Felicidades! Has saturado la sección de Experiencia Docente. Tu dedicación a la enseñanza es excepcional.",
  C: "¡Increíble! Máxima puntuación en Investigación, Transferencia e Intercambio del Conocimiento. Tu impacto científico es sobresaliente.",
  D: "¡Enhorabuena! Has completado la sección de Gestión. Tu capacidad organizativa es admirable.",
  Phase2: "¡Excelente! Has alcanzado la máxima puntuación en la Fase 2. ¡Estás listo para el siguiente nivel!",
};

const generateTxtContent = (state: AppState): string => {
  let content = `**********************************************\n`;
  content += `EVALUACIÓN DE MÉRITOS - PROFESORADO AYUDANTE DOCTOR\n`;
  content += `**********************************************\n\n`;
  content += `Tipo de Concurso: ${state.contestType === "adaptacion" ? "Adaptación" : "Acceso"}\n\n`;

  const sectionTitles = {
    A: "Historial Académico",
    B: "Experiencia Docente",
    C: "Experiencia Investigadora, Transferencia e Intercambio del Conocimiento",
    D: "Gestión",
  };

  // Section A
  content += `--- SECCIÓN A: ${sectionTitles.A} ---\n\n`;
  content += `A.1.1 Titulaciones Universitarias:\n`;
  state.A.A1_1_Titulaciones.forEach(
    (e) =>
      (content += `- Tipo: ${e.tipo || "N/A"}. (Justificante: ${e.archivo || "N/A"})\n`),
  );
  content += `\nA.1.2 Calificación Media del Expediente Académico:\n- Nota: ${state.A.A1_2_CalificacionMedia.value}\n`;
  content += `\nA.1.3 Becas/Contratos Predoctorales:\n`;
  state.A.A1_3_BecasContratos.forEach(
    (e) => (content += `- Beca/Contrato: ${e.tipo || "N/A"}\n`),
  );
  content += `\nA.1.4 Premios Relevantes:\n`;
  state.A.A1_4_PremiosRelevantes.forEach(
    (e) => (content += `- Premio: ${e.desc || "N/A"}\n`),
  );
  content += `\nA.2 Otros Méritos:\n`;
  content += `  A.2.1 Otras Titulaciones Complementarias:\n`;
  state.A.A2_1_OtrasTitulaciones.forEach(
    (e) => (content += `  - Título: ${e.tipo || "N/A"}\n`),
  );
  content += `  A.2.2 Cursos y Formación Recibida:\n`;
  state.A.A2_2_CursosFormacion.forEach(
    (e) => (content += `  - Curso: ${e.nombre || "N/A"}\n`),
  );
  content += `  A.2.3 Actividad Profesional:\n`;
  state.A.A2_3_ActividadProfesional.forEach(
    (e) => (content += `  - Actividad: ${e.puesto || "N/A"}\n`),
  );

  // Section B
  content += `\n--- SECCIÓN B: ${sectionTitles.B} ---\n\n`;
  content += `B.1.1 Actividad Docente Universitaria:\n- Horas: ${state.B.B1_1_ActividadDocenteUni.horas}\n`;
  content += `B.1.2 Actividad Docente no Universitaria:\n- Horas: ${state.B.B1_2_ActividadDocenteNoUni.horas}\n`;
  content += `B.2 Calidad de la Actividad Docente Universitaria:\n- Informe: ${state.B.B2_CalidadDocente.informe || "N/A"}\n`;
  content += `B.3 Tutela de Alumnado (TFG, TFM, Tesis):\n`;
  state.B.B3_TutelaAlumnado.forEach(
    (e) => (content += `- Tutela: ${e.desc || "N/A"}\n`),
  );
  content += `B.4 Innovación en Metodología Docente Universitaria:\n`;
  state.B.B4_InnovacionDocente.forEach(
    (e) => (content += `- Innovación: ${e.desc || "N/A"}\n`),
  );
  content += `B.5 Cursos de Formación Docente Universitaria:\n`;
  state.B.B5_CursosFormacionDocente.forEach(
    (e) => (content += `- Curso: ${e.desc || "N/A"}\n`),
  );
  content += `B.6 Actividades de Divulgación Docente Universitaria:\n`;
  state.B.B6_ActividadesDivulgacionDocente.forEach(
    (e) => (content += `- Actividad: ${e.desc || "N/A"}\n`),
  );
  content += `B.7 Estancias Docentes:\n- Meses: ${state.B.B7_EstanciasDocentes.meses}\n- Descripción: ${state.B.B7_EstanciasDocentes.desc || "N/A"}\n`;

  // Section C
  content += `\n--- SECCIÓN C: ${sectionTitles.C} ---\n\n`;
  content += `C.1 Experiencia Científica (proyectos, contratos, etc.):\n`;
  state.C.C1_ExperienciaCientifica.forEach(
    (e) => (content += `- Experiencia: ${e.desc || "N/A"}\n`),
  );
  content += `C.2 Producción Científica (publicaciones, congresos, etc.):\n`;
  state.C.C2_ProduccionCientifica.forEach(
    (e) =>
      (content += `- Aportación: ${e.resumen || "N/A"}\n  Impacto: ${e.impacto || "N/A"}\n`),
  );
  content += `C.3 Transferencia Científica:\n`;
  state.C.C3_TransferenciaCientifica.forEach(
    (e) =>
      (content += `- Transferencia: ${e.resumen || "N/A"}\n  Impacto: ${e.impacto || "N/A"}\n`),
  );
  content += `C.4 Divulgación Científica:\n`;
  state.C.C4_DivulgacionCientifica.forEach(
    (e) =>
      (content += `- Divulgación: ${e.resumen || "N/A"}\n  Impacto: ${e.impacto || "N/A"}\n`),
  );
  content += `C.5 Estancias de Investigación:\n- Meses: ${state.C.C5_EstanciasInvestigacion.meses}\n- Descripción: ${state.C.C5_EstanciasInvestigacion.desc || "N/A"}\n`;

  // Section D
  content += `\n--- SECCIÓN D: ${sectionTitles.D} ---\n\n`;
  content += `D.1 Gestión Académica:\n`;
  state.D.D1_GestionAcademica.forEach(
    (e) => (content += `- Gestión: ${e.desc || "N/A"}\n`),
  );
  content += `D.2 Gestión de la Docencia e Investigación:\n`;
  state.D.D2_GestionDocenciaInvestigacion.forEach(
    (e) => (content += `- Gestión: ${e.desc || "N/A"}\n`),
  );
  content += `D.3 Gestión No Universitaria:\n`;
  state.D.D3_GestionNoUniversitaria.forEach(
    (e) => (content += `- Gestión: ${e.desc || "N/A"}\n`),
  );

  content += `\n--- FIN DEL INFORME ---\n`;
  return content;
};

const App: React.FC = () => {
  const [contestType, setContestType] = useState<ContestType | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const { theme, toggleTheme } = useTheme();
  const playClickSound = useSound("/click.mp3");
  const playSuccessSound = useSound("/success.mp3"); // Assuming a success sound

  const { state, updateField, addEntry, removeEntry, scores } =
    useMeritStore(contestType);

  useEffect(() => {
    const storedContestType = localStorage.getItem("contestType");
    if (storedContestType === "adaptacion" || storedContestType === "acceso") {
      setContestType(storedContestType as ContestType);
    }
  }, []);

  useEffect(() => {
    // Check for saturated sections
    if (scores.sections) {
      scores.sections.forEach((section) => {
        const sectionKey = section.name.replace(/ /g, '') as keyof typeof MAX_SCORES;
        if (MAX_SCORES[sectionKey] && section.score >= MAX_SCORES[sectionKey]) {
          setPopupMessage(CONGRATULATIONS_MESSAGES[sectionKey]);
          setShowPopup(true);
          playSuccessSound();
        }
      });
    }
  }, [scores, playSuccessSound]);

  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
  };

  const handleContestTypeSelect = (type: ContestType) => {
    playClickSound();
    setContestType(type);
    localStorage.setItem("contestType", type);
  };

  const resetApp = () => {
    playClickSound();
    localStorage.clear();
    setContestType(null);
    window.location.reload();
  };

  const handleExport = () => {
    playClickSound();
    const content = generateTxtContent(state);
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "meritos_PAD_UPO.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const renderSection = () => {
    switch (SECTIONS[currentSection]) {
      case "A":
        return (
          <SectionA
            data={state.A}
            updateField={updateField}
            addEntry={addEntry}
            removeEntry={removeEntry}
          />
        );
      case "B":
        return (
          <SectionB
            data={state.B}
            updateField={updateField}
            addEntry={addEntry}
            removeEntry={removeEntry}
          />
        );
      case "C":
        return (
          <SectionC
            data={state.C}
            updateField={updateField}
            addEntry={addEntry}
            removeEntry={removeEntry}
          />
        );
      case "D":
        return (
          <SectionD
            data={state.D}
            updateField={updateField}
            addEntry={addEntry}
            removeEntry={removeEntry}
          />
        );
      case "Fase 2":
        return (
          <SectionPhase2
            data={state.Phase2}
            updateField={updateField}
            preferredMerits={state.preferredMerits}
            contestType={contestType}
          />
        );
      default:
        return null;
    }
  };

  const nextSection = () => {
    playClickSound();
    setCurrentSection((s) => Math.min(s + 1, SECTIONS.length - 1));
  };
  const prevSection = () => {
    playClickSound();
    setCurrentSection((s) => Math.max(s - 1, 0));
  };

  if (!contestType) {
    return (
      <div className="min-h-screen bg-[var(--background-color)] flex flex-col items-center justify-center p-4">
        <div className="max-w-4xl w-full text-center bg-[var(--background-color)] p-8 rounded-xl shadow-lg border border-[var(--text-color)] border-opacity-20">
          <BookOpenIcon className="mx-auto h-16 w-16 text-[var(--primary-color)] mb-4" />
          <h1 className="text-3xl font-bold text-[var(--text-color)] mb-2">
            Evaluador de Méritos para Profesorado Ayudante Doctor
          </h1>
          <p className="text-[var(--text-color)] mb-8">
            Universidad Pablo de Olavide, Sevilla
          </p>
          <h2 className="text-xl font-semibold text-[var(--text-color)] mb-6">
            Seleccione el tipo de concurso:
          </h2>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <div className="flex-1 text-center">
              <button
                onClick={() => handleContestTypeSelect("adaptacion")}
                className="w-full bg-[var(--primary-color)] text-white font-bold py-3 px-6 rounded-lg hover:brightness-90 transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Concurso de Adaptación
              </button>
              <p className="text-sm text-[var(--text-color)] mt-3 px-2">
                Generalmente para personal que ya tiene una vinculación con la
                universidad y busca adaptarse a la nueva ley (LOSU). Puede
                incluir méritos preferentes específicos.
              </p>
            </div>
            <div className="flex-1 text-center">
              <button
                onClick={() => handleContestTypeSelect("acceso")}
                className="w-full bg-[var(--secondary-color)] text-white font-bold py-3 px-6 rounded-lg hover:brightness-90 transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Concurso de Acceso
              </button>
              <p className="text-sm text-[var(--text-color)] mt-3 px-2">
                Concurso de acceso general abierto a cualquier candidato/a que
                cumpla los requisitos, sin necesidad de vinculación previa con
                la universidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-color)] text-[var(--text-color)]">
      <header className="bg-[var(--background-color)] shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BookOpenIcon className="h-8 w-8 text-[var(--primary-color)]" />
            <h1 className="text-xl md:text-2xl font-bold text-[var(--text-color)]">
              Evaluador de Méritos PAD
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline bg-[color-mix(in srgb, var(--primary-color) 20%, transparent)] text-[var(--primary-color)] text-sm font-semibold px-3 py-1 rounded-full">
              {contestType === "adaptacion" ? "Adaptación" : "Acceso"}
            </span>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 text-sm text-[var(--text-color)] hover:text-[var(--primary-color)] hover:underline"
              title="Exportar a TXT"
            >
              <DownloadIcon className="h-4 w-4" />
              Exportar
            </button>
            <button
              onClick={resetApp}
              className="text-sm text-[var(--text-color)] hover:text-red-600 hover:underline"
            >
              Reiniciar
            </button>
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-[var(--secondary-color)] text-[var(--text-color)] hover:brightness-90 transition"
              title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-[var(--background-color)] p-6 rounded-xl shadow-lg border border-[var(--text-color)] border-opacity-20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[var(--text-color)]">
                Sección {SECTIONS[currentSection]}:{" "}
                {scores.sections[currentSection].name}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSection}
                  disabled={currentSection === 0}
                  className="p-2 rounded-full bg-[color-mix(in srgb, var(--text-color) 10%, transparent)] hover:bg-[color-mix(in srgb, var(--text-color) 20%, transparent)] disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                </button>
                <span className="text-sm font-medium text-[var(--text-color)]">
                  {currentSection + 1} / {SECTIONS.length}
                </span>
                <button
                  onClick={nextSection}
                  disabled={currentSection === SECTIONS.length - 1}
                  className="p-2 rounded-full bg-[color-mix(in srgb, var(--text-color) 10%, transparent)] hover:bg-[color-mix(in srgb, var(--text-color) 20%, transparent)] disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ArrowRightIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="space-y-6">{renderSection()}</div>
          </div>
        </div>

        <div className="lg:col-span-1 lg:sticky lg:top-24 self-start">
          <ScoreVisualization scores={scores} />
          <div className="mt-8">
            <Disclaimer />
          </div>
        </div>
      </main>

      <Footer />

      {showPopup && (
        <CongratulationsPopup message={popupMessage} onClose={handleClosePopup} />
      )}
    </div>
  );
};

export default App;
