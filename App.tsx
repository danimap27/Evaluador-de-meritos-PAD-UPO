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
import { useTheme } from "./ThemeContext";
import Footer from "./components/shared/Footer";
import { useSound } from "./hooks/useSound";
import CongratulationsPopup from "./components/CongratulationsPopup";
import { exportToZip } from "./utils/export"; // Import the new export function

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

const App: React.FC = () => {
  const [contestType, setContestType] = useState<ContestType | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const { theme, toggleTheme } = useTheme();
  const playClickSound = useSound("/click.mp3");
  const playSuccessSound = useSound("/success.mp3"); // Assuming a success sound

  const { state, files, updateField, addEntry, removeEntry, updateFile, scores } =
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
    exportToZip(state, files, scores);
  };

  const renderSection = () => {
    switch (SECTIONS[currentSection]) {
      case "A":
        return (
          <SectionA
            data={state.A}
            files={files}
            updateField={updateField}
            addEntry={addEntry}
            removeEntry={removeEntry}
            updateFile={updateFile}
          />
        );
      case "B":
        return (
          <SectionB
            data={state.B}
            files={files}
            updateField={updateField}
            addEntry={addEntry}
            removeEntry={removeEntry}
            updateFile={updateFile}
          />
        );
      case "C":
        return (
          <SectionC
            data={state.C}
            files={files}
            updateField={updateField}
            addEntry={addEntry}
            removeEntry={removeEntry}
            updateFile={updateFile}
          />
        );
      case "D":
        return (
          <SectionD
            data={state.D}
            files={files}
            updateField={updateField}
            addEntry={addEntry}
            removeEntry={removeEntry}
            updateFile={updateFile}
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
              title="Exportar a ZIP"
            >
              <DownloadIcon className="h-4 w-4" />
              Exportar a ZIP
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
