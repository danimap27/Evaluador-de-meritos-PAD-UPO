import { useState, useEffect, useCallback } from "react";
import { AppState, CalculatedScores } from "../types";
import { ContestType } from "../App";
import { v4 as uuidv4 } from "uuid";

const initialAppState: AppState = {
  contestType: null,
  preferredMerits: {
    acreditacion: false,
    cincoAnios: false,
  },
  A: {
    A1_1_Titulaciones: [],
    A1_2_CalificacionMedia: { value: 0 },
    A1_3_BecasContratos: [],
    A1_4_PremiosRelevantes: [],
    A2_1_OtrasTitulaciones: [],
    A2_2_CursosFormacion: [],
    A2_3_ActividadProfesional: [],
  },
  B: {
    B1_1_ActividadDocenteUni: { horas: 0 },
    B1_2_ActividadDocenteNoUni: { horas: 0 },
    B2_CalidadDocente: { informe: "" },
    B3_TutelaAlumnado: [],
    B4_InnovacionDocente: [],
    B5_CursosFormacionDocente: [],
    B6_ActividadesDivulgacionDocente: [],
    B7_EstanciasDocentes: { meses: 0, desc: "" },
  },
  C: {
    C1_ExperienciaCientifica: [],
    C2_ProduccionCientifica: [],
    C3_TransferenciaCientifica: [],
    C4_DivulgacionCientifica: [],
    C5_EstanciasInvestigacion: { meses: 0, desc: "" },
  },
  D: {
    D1_GestionAcademica: [],
    D2_GestionDocenciaInvestigacion: [],
    D3_GestionNoUniversitaria: [],
  },
  Phase2: {
    exposicion: 0,
    debate: 0,
  },
};

const MAX_SCORES = {
  A: 25,
  B: 35,
  C: 35,
  D: 5,
  Phase2: 25,
};

const calculateScores = (state: AppState): CalculatedScores => {
  const scoreA = Math.min(
    (state.A.A1_1_Titulaciones.length / 2) * 2 +
      state.A.A1_2_CalificacionMedia.value * 2 +
      (state.A.A1_3_BecasContratos.length / 2) * 5 +
      (state.A.A1_4_PremiosRelevantes.length / 2) * 3 +
      (state.A.A2_1_OtrasTitulaciones.length / 6) * 3 +
      (state.A.A2_2_CursosFormacion.length / 6) * 4 +
      (state.A.A2_3_ActividadProfesional.length / 6) * 3,
    MAX_SCORES.A,
  );

  const scoreB = Math.min(
    (Math.min(state.B.B1_1_ActividadDocenteUni.horas, 240) / 240) * 10 +
      (Math.min(state.B.B1_2_ActividadDocenteNoUni.horas, 240) / 240) * 5 +
      (state.B.B2_CalidadDocente.informe.length > 0 ? 5 : 0) +
      (state.B.B3_TutelaAlumnado.length / 2) * 3 +
      (state.B.B4_InnovacionDocente.length / 2) * 3 +
      (state.B.B5_CursosFormacionDocente.length / 2) * 3 +
      (state.B.B6_ActividadesDivulgacionDocente.length / 2) * 3 +
      (Math.min(state.B.B7_EstanciasDocentes.meses, 3) / 3) * 3,
    MAX_SCORES.B,
  );

  const scoreC = Math.min(
    (state.C.C1_ExperienciaCientifica.length / 2) * 8 +
      (state.C.C2_ProduccionCientifica.length / 4) * 12 +
      (state.C.C3_TransferenciaCientifica.length / 1) * 5 +
      (state.C.C4_DivulgacionCientifica.length / 1) * 2 +
      (Math.min(state.C.C5_EstanciasInvestigacion.meses, 12) / 12) * 8,
    MAX_SCORES.C,
  );

  const scoreD = Math.min(
    (state.D.D1_GestionAcademica.length / 2) * 2 +
      (state.D.D2_GestionDocenciaInvestigacion.length / 2) * 2 +
      (state.D.D3_GestionNoUniversitaria.length / 2) * 1,
    MAX_SCORES.D,
  );

  let phase1Subtotal = scoreA + scoreB + scoreC + scoreD;

  let preferredMeritBonus = 0;
  let bonusMultiplier = 0;
  if (state.preferredMerits.acreditacion) bonusMultiplier += 0.125;
  if (state.contestType === "adaptacion" && state.preferredMerits.cincoAnios)
    bonusMultiplier += 0.125;

  preferredMeritBonus = phase1Subtotal * bonusMultiplier;
  const phase1Total = Math.min(phase1Subtotal + preferredMeritBonus, 75);

  const scorePhase2 = Math.min(
    (state.Phase2.exposicion / 10) * 12.5 + (state.Phase2.debate / 10) * 12.5,
    MAX_SCORES.Phase2,
  );

  const totalScore = phase1Total + scorePhase2;

  return {
    total: totalScore,
    phase1: phase1Total,
    phase2: scorePhase2,
    preferredMeritBonus: preferredMeritBonus,
    sections: [
      {
        name: "Historial Académico",
        score: scoreA,
        maxScore: MAX_SCORES.A,
        percentage: (scoreA / MAX_SCORES.A) * 100,
      },
      {
        name: "Experiencia Docente",
        score: scoreB,
        maxScore: MAX_SCORES.B,
        percentage: (scoreB / MAX_SCORES.B) * 100,
      },
      {
        name: "Experiencia Investigadora",
        score: scoreC,
        maxScore: MAX_SCORES.C,
        percentage: (scoreC / MAX_SCORES.C) * 100,
      },
      {
        name: "Gestión",
        score: scoreD,
        maxScore: MAX_SCORES.D,
        percentage: (scoreD / MAX_SCORES.D) * 100,
      },
      {
        name: "Fase 2: Exposición y Debate",
        score: scorePhase2,
        maxScore: MAX_SCORES.Phase2,
        percentage: (scorePhase2 / MAX_SCORES.Phase2) * 100,
      },
    ],
  };
};

export const useMeritStore = (contestType: ContestType | null) => {
  const [state, setState] = useState<AppState>(() => {
    try {
      const savedState = localStorage.getItem("meritState");
      if (savedState) {
        return JSON.parse(savedState);
      }
    } catch (error) {
      console.error("Could not load state from localStorage", error);
    }
    return { ...initialAppState, contestType };
  });

  useEffect(() => {
    setState((s) => ({ ...s, contestType }));
  }, [contestType]);

  useEffect(() => {
    try {
      localStorage.setItem("meritState", JSON.stringify(state));
    } catch (error) {
      console.error("Could not save state to localStorage", error);
    }
  }, [state]);

  const updateField = useCallback(
    (section: keyof AppState, field: string, value: any, id?: string) => {
      setState((prevState) => {
        const newState = { ...prevState };
        const sectionData = newState[section];

        if (section === "Phase2" || section === "preferredMerits") {
          if (
            typeof sectionData === "object" &&
            sectionData !== null &&
            field in sectionData
          ) {
            (newState[section] as any) = { ...sectionData, [field]: value };
          }
          return newState;
        }

        if (typeof sectionData !== "object" || sectionData === null) {
          return prevState;
        }

        const sectionState = { ...sectionData } as any;

        if (Array.isArray(sectionState[field])) {
          const itemIndex = sectionState[field].findIndex(
            (item: any) => item.id === id,
          );
          if (itemIndex > -1) {
            const updatedItem = { ...sectionState[field][itemIndex], ...value };
            sectionState[field] = [
              ...sectionState[field].slice(0, itemIndex),
              updatedItem,
              ...sectionState[field].slice(itemIndex + 1),
            ];
          }
        } else {
          if (
            typeof sectionState[field] === "object" &&
            sectionState[field] !== null
          ) {
            sectionState[field] = { ...sectionState[field], ...value };
          }
        }

        newState[section] = sectionState;
        return newState;
      });
    },
    [],
  );

  const addEntry = useCallback(
    (section: keyof AppState, field: string, newEntryData: object = {}) => {
      setState((prevState) => {
        const newState = { ...prevState };
        const sectionData = newState[section];
        if (typeof sectionData !== "object" || sectionData === null) {
          return prevState;
        }
        const sectionState = { ...sectionData } as any;
        if (Array.isArray(sectionState[field])) {
          const newEntry = { id: uuidv4(), ...newEntryData };
          sectionState[field] = [...sectionState[field], newEntry];
          newState[section] = sectionState;
        }
        return newState;
      });
    },
    [],
  );

  const removeEntry = useCallback(
    (section: keyof AppState, field: string, id: string) => {
      setState((prevState) => {
        const newState = { ...prevState };
        const sectionData = newState[section];
        if (typeof sectionData !== "object" || sectionData === null) {
          return prevState;
        }
        const sectionState = { ...sectionData } as any;
        if (Array.isArray(sectionState[field])) {
          sectionState[field] = sectionState[field].filter(
            (item: any) => item.id !== id,
          );
          newState[section] = sectionState;
        }
        return newState;
      });
    },
    [],
  );

  const scores = calculateScores(state);

  return { state, updateField, addEntry, removeEntry, scores };
};
