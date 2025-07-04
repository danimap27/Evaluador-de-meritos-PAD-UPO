export interface MeritEntry {
  id: string;
  [key: string]: any;
}

export interface SectionAState {
  A1_1_Titulaciones: MeritEntry[];
  A1_2_CalificacionMedia: { value: number };
  A1_3_BecasContratos: MeritEntry[];
  A1_4_PremiosRelevantes: MeritEntry[];
  A2_1_OtrasTitulaciones: MeritEntry[];
  A2_2_CursosFormacion: MeritEntry[];
  A2_3_ActividadProfesional: MeritEntry[];
}

export interface SectionBState {
  B1_1_ActividadDocenteUni: { horas: number };
  B1_2_ActividadDocenteNoUni: { horas: number };
  B2_CalidadDocente: { informe: string };
  B3_TutelaAlumnado: MeritEntry[];
  B4_InnovacionDocente: MeritEntry[];
  B5_CursosFormacionDocente: MeritEntry[];
  B6_ActividadesDivulgacionDocente: MeritEntry[];
  B7_EstanciasDocentes: { meses: number; desc?: string };
}

export interface SectionCState {
  C1_ExperienciaCientifica: MeritEntry[];
  C2_ProduccionCientifica: MeritEntry[];
  C3_TransferenciaCientifica: MeritEntry[];
  C4_DivulgacionCientifica: MeritEntry[];
  C5_EstanciasInvestigacion: { meses: number; desc?: string };
}

export interface SectionDState {
  D1_GestionAcademica: MeritEntry[];
  D2_GestionDocenciaInvestigacion: MeritEntry[];
  D3_GestionNoUniversitaria: MeritEntry[];
}

export interface Phase2State {
  exposicion: number;
  debate: number;
}

export interface AppState {
  contestType: "adaptacion" | "acceso" | null;
  preferredMerits: {
    acreditacion: boolean;
    cincoAnios: boolean;
  };
  A: SectionAState;
  B: SectionBState;
  C: SectionCState;
  D: SectionDState;
  Phase2: Phase2State;
}

export interface SectionScore {
  name: string;
  score: number;
  maxScore: number;
  percentage: number;
}

export interface CalculatedScores {
  total: number;
  phase1: number;
  phase2: number;
  preferredMeritBonus: number;
  sections: SectionScore[];
}
