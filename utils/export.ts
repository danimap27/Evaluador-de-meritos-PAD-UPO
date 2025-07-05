import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { AppState, CalculatedScores } from '../types';

// Define a type for the file store
type FileStore = {
  [id: string]: File;
};

const getFolderPath = (section: string, field: string): string => {
  const mapping: { [key: string]: string } = {
    A1_1_Titulaciones: 'historial_academico/titulaciones',
    A1_2_CalificacionMedia: 'historial_academico/titulaciones',
    A1_3_BecasContratos: 'historial_academico/certificaciones',
    A1_4_PremiosRelevantes: 'historial_academico/certificaciones',
    A2_1_OtrasTitulaciones: 'historial_academico/titulaciones',
    A2_2_CursosFormacion: 'historial_academico/cursos',
    A2_3_ActividadProfesional: 'experiencia_profesional/contratos',
    B1_1_ActividadDocenteUni: 'experiencia_profesional/vida_laboral',
    B1_2_ActividadDocenteNoUni: 'experiencia_profesional/vida_laboral',
    B2_CalidadDocente: 'experiencia_profesional/vida_laboral',
    B3_TutelaAlumnado: 'experiencia_profesional/vida_laboral',
    B4_InnovacionDocente: 'experiencia_profesional/vida_laboral',
    B5_CursosFormacionDocente: 'historial_academico/cursos',
    B6_ActividadesDivulgacionDocente: 'experiencia_profesional/vida_laboral',
    B7_EstanciasDocentes: 'experiencia_profesional/vida_laboral',
    C1_ExperienciaCientifica: 'investigacion/proyectos',
    C2_ProduccionCientifica: 'investigacion/publicaciones',
    C3_TransferenciaCientifica: 'investigacion/proyectos',
    C4_DivulgacionCientifica: 'investigacion/publicaciones',
    C5_EstanciasInvestigacion: 'investigacion/proyectos',
    D1_GestionAcademica: 'otros_meritos',
    D2_GestionDocenciaInvestigacion: 'otros_meritos',
    D3_GestionNoUniversitaria: 'otros_meritos',
  };
  // Prepend 'justificantes/' to the path
  return `justificantes/${mapping[field] || 'otros_meritos'}`;
};

export const exportToZip = async (state: AppState, files: FileStore, scores: CalculatedScores) => {
  const zip = new JSZip();

  // 1. Create a summary text file
  let summary = `Resumen de Méritos - Puntuación Total: ${scores.total.toFixed(2)}\n`;
  summary += `==================================================\n\n`;

  scores.sections.forEach(section => {
    summary += `Puntuación ${section.name}: ${section.score.toFixed(2)} / ${section.maxScore} puntos\n`;
  });

  summary += `\nDetalles de los méritos introducidos:\n`;
  summary += `-------------------------------------\n`;

  for (const sectionKey of ['A', 'B', 'C', 'D']) { // Iterate over main sections
    const sectionData = state[sectionKey as keyof AppState] as any;
    summary += `\n--- SECCIÓN ${sectionKey} --- \n`;

    for (const fieldKey in sectionData) {
      const field = sectionData[fieldKey];

      if (Array.isArray(field)) {
        if (field.length > 0) {
          summary += `\n  Apartado: ${fieldKey}\n`;
          field.forEach((item: any, index: number) => {
            summary += `    Entrada ${index + 1} (ID: ${item.id}):\n`;
            for (const prop in item) {
              if (prop !== 'id') { // Exclude the ID from the summary details
                summary += `      - ${prop}: ${JSON.stringify(item[prop])}\n`;
              }
            }
            if (files[item.id]) {
              const folderPath = getFolderPath(sectionKey, fieldKey);
              summary += `      - Fichero adjunto: ${folderPath}/${files[item.id].name}\n`;
            }
          });
        }
      } else if (typeof field === 'object' && field !== null) {
        // Handle single object entries
        summary += `\n  Apartado: ${fieldKey}:\n`;
        for (const prop in field) {
          summary += `    - ${prop}: ${JSON.stringify(field[prop])}\n`;
        }
        const itemId = fieldKey;
        if (files[itemId]) {
          const folderPath = getFolderPath(sectionKey, fieldKey);
          summary += `    - Fichero adjunto: ${folderPath}/${files[itemId].name}\n`;
        }
      }
    }
  }

  zip.file('resumen_meritos.txt', summary);

  // 2. Add all uploaded files to the zip, in the correct folders
  for (const sectionKey in state) {
    if (['A', 'B', 'C', 'D'].includes(sectionKey)) {
      const section = state[sectionKey as keyof AppState] as any;
      for (const fieldKey in section) {
        const field = section[fieldKey];
        
        // Handle array entries
        if (Array.isArray(field)) {
          field.forEach(item => {
            if (files[item.id]) {
              const file = files[item.id];
              const folderPath = getFolderPath(sectionKey, fieldKey);
              zip.folder(folderPath)?.file(file.name, file);
            }
          });
        }
        // Handle single object entries
        else if (typeof field === 'object' && field !== null) {
          const itemId = fieldKey;
          if (files[itemId]) {
            const file = files[itemId];
            const folderPath = getFolderPath(sectionKey, fieldKey);
            zip.folder(folderPath)?.file(file.name, file);
          }
        }
      }
    }
  }

  // 3. Generate and download the zip file
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  saveAs(zipBlob, 'evaluacion_meritos_upo.zip');
};