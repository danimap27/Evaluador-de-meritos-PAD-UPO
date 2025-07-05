import React from "react";
import { Phase2State } from "../../types";
import { SectionWrapper } from "../shared/SectionWrapper";
import { AppState } from "../../types";

interface Props {
  data: Phase2State;
  updateField: (
    section: "Phase2" | "preferredMerits",
    field: string,
    value: any,
  ) => void;
  preferredMerits?: AppState["preferredMerits"];
  contestType?: "adaptacion" | "acceso" | null;
}

export const SectionPhase2: React.FC<Props> = ({
  data,
  updateField,
  preferredMerits,
  contestType,
}) => {
  return (
    <div className="space-y-8">
      <SectionWrapper
        title="Méritos Preferentes"
        infoText="Marque las casillas si cumple con estos méritos. Estos otorgan una bonificación del +12.5% cada uno sobre la puntuación de la Fase 1. La acreditación es un mérito general, mientras que la experiencia de 5 años solo aplica al Concurso de Adaptación."
      >
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 rounded-md border border-[var(--text-color)] border-opacity-20 cursor-pointer hover:border-[var(--primary-color)] transition phase2-checkbox-container">
            <input
              type="checkbox"
              className="h-5 w-5 rounded border-[var(--text-color)] border-opacity-30 text-[var(--primary-color)] focus:ring-[var(--primary-color)]"
              checked={preferredMerits?.acreditacion ?? false}
              onChange={(e) =>
                updateField("preferredMerits", "acreditacion", e.target.checked)
              }
            />
            <span className="phase2-checkbox-label">Acreditación vigente de Profesor/a Ayudante Doctor/a.</span>
          </label>
          {contestType === "adaptacion" && (
            <label className="flex items-center gap-3 p-3 rounded-md border border-[var(--text-color)] border-opacity-20 cursor-pointer hover:border-[var(--primary-color)] transition phase2-checkbox-container">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-[var(--text-color)] border-opacity-30 text-[var(--primary-color)] focus:ring-[var(--primary-color)]"
                checked={preferredMerits?.cincoAnios ?? false}
                onChange={(e) =>
                  updateField("preferredMerits", "cincoAnios", e.target.checked)
                }
              />
              <span className="phase2-checkbox-label">
                Para Concurso de Adaptación: haber realizado docencia en
                universidades públicas españolas durante al menos cinco cursos
                académicos de los últimos siete.
              </span>
            </label>
          )}
        </div>
      </SectionWrapper>

      <SectionWrapper
        title="Autoevaluación de la Fase 2 (Exposición y Debate)"
        infoText="Esta fase es cualitativa y la decide la comisión. Realice una autoevaluación honesta (0-10) de sus habilidades de exposición oral y debate para obtener una puntuación meramente orientativa."
      >
        <p className="text-sm text-[var(--secondary-color)] bg-[color-mix(in srgb, var(--secondary-color) 10%, transparent)] p-3 rounded-md">
          <strong>Atención:</strong> Esta fase es evaluada cualitativamente por
          la comisión. La puntuación aquí es solo una{" "}
          <strong>autoevaluación indicativa</strong>.
        </p>
        <div className="space-y-4 pt-4">
          <div>
            <label
              htmlFor="exposicion"
              className="block text-sm font-medium text-[var(--text-color)]"
            >
              Valoración de la Exposición (0-10)
            </label>
            <p className="text-xs text-[var(--text-color)] text-opacity-70 mb-2">
              Claridad, estructura, dominio, perspectivas novedosas.
            </p>
            <input
              type="range"
              id="exposicion"
              min="0"
              max="10"
              value={data.exposicion}
              onChange={(e) =>
                updateField("Phase2", "exposicion", e.target.valueAsNumber)
              }
              className="w-full h-2 bg-[color-mix(in srgb, var(--text-color) 10%, transparent)] rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center font-bold text-[var(--primary-color)] mt-1">
              {data.exposicion}
            </div>
          </div>

          <div>
            <label
              htmlFor="debate"
              className="block text-sm font-medium text-[var(--text-color)]"
            >
              Valoración del Debate (0-10)
            </label>
            <p className="text-xs text-[var(--text-color)] text-opacity-70 mb-2">
              Respuestas, defensa crítica, apertura al diálogo, agilidad.
            </p>
            <input
              type="range"
              id="debate"
              min="0"
              max="10"
              value={data.debate}
              onChange={(e) =>
                updateField("Phase2", "debate", e.target.valueAsNumber)
              }
              className="w-full h-2 bg-[color-mix(in srgb, var(--text-color) 10%, transparent)] rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center font-bold text-[var(--primary-color)] mt-1">
              {data.debate}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};