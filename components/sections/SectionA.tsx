import React from "react";
import { SectionAState } from "../../types";
import { SectionWrapper } from "../shared/SectionWrapper";
import { EntryCard } from "../shared/EntryCard";
import {
  TextInput,
  NumberInput,
  TextareaInput,
  FileUpload,
} from "../shared/InputFields";

interface Props {
  data: SectionAState;
  files: { [id: string]: File };
  updateField: (
    section: "A",
    field: keyof SectionAState,
    value: any,
    id?: string,
  ) => void;
  addEntry: (section: "A", field: keyof SectionAState, data?: object) => string;
  removeEntry: (section: "A", field: keyof SectionAState, id: string) => void;
  updateFile: (id: string, file: File) => void;
}

export const SectionA: React.FC<Props> = ({
  data,
  files,
  updateField,
  addEntry,
  removeEntry,
  updateFile,
}) => (
  <div className="space-y-8">
    <SectionWrapper
      title="A.1.1 Titulaciones Universitarias"
      description="Titulaciones de Grado, Licenciatura, Arquitectura, Ingeniería, Máster Universitario, etc."
      infoText="Añada titulaciones oficiales como Grado, Licenciatura, Máster Universitario, Doctorado. Se valorará el carácter internacional (e.g., Erasmus, Mención Internacional en Doctorado)."
      onAddEntry={() => addEntry("A", "A1_1_Titulaciones")}
    >
      {data.A1_1_Titulaciones.map((entry) => (
        <EntryCard
          key={entry.id}
          title="Titulación"
          onRemove={() => removeEntry("A", "A1_1_Titulaciones", entry.id)}
        >
          <TextInput
            label="Tipo de Título"
            value={entry.tipo || ""}
            onChange={(e) =>
              updateField(
                "A",
                "A1_1_Titulaciones",
                { tipo: e.target.value },
                entry.id,
              )
            }
          />
          <FileUpload
            label="Justificante"
            file={files[entry.id]}
            onFileChange={(file) => updateFile(entry.id, file)}
            htmlId={`A1_1_Titulaciones-${entry.id}`}
          />
        </EntryCard>
      ))}
    </SectionWrapper>

    <SectionWrapper
      title="A.1.2 Calificación Media del Expediente Académico"
      infoText="Introduzca la calificación media de su expediente académico en una escala de 1 a 4 (Aprobado=1, Notable=2, Sobresaliente=3, Matrícula de Honor=4). Esta nota es un indicador clave de la excelencia académica."
    >
      <NumberInput
        label="Nota media (escala 1-4: Aprobado=1, Notable=2, Sobresaliente=3, MH=4)"
        value={data.A1_2_CalificacionMedia.value}
        onChange={(e) =>
          updateField("A", "A1_2_CalificacionMedia", {
            value: (e.target as HTMLInputElement).valueAsNumber,
          })
        }
        min={0}
        max={4}
      />
      <FileUpload
        label="Justificante"
        file={files[`A1_2_CalificacionMedia`]}
        onFileChange={(file) => updateFile(`A1_2_CalificacionMedia`, file)}
        htmlId={`A1_2_CalificacionMedia`}
      />
    </SectionWrapper>

    <SectionWrapper
      title="A.1.3 Becas/Contratos Predoctorales"
      maxEntries={2}
      currentEntries={data.A1_3_BecasContratos.length}
      onAddEntry={() => addEntry("A", "A1_3_BecasContratos")}
      infoText="Incluya hasta 2 becas o contratos competitivos obtenidos durante su etapa predoctoral (FPU, FPI, etc.). Se valora la competitividad y el prestigio de la convocatoria."
    >
      {data.A1_3_BecasContratos.map((entry) => (
        <EntryCard
          key={entry.id}
          title="Beca/Contrato"
          onRemove={() => removeEntry("A", "A1_3_BecasContratos", entry.id)}
        >
          <TextInput
            label="Tipo y Entidad Financiadora"
            value={entry.tipo || ""}
            onChange={(e) =>
              updateField(
                "A",
                "A1_3_BecasContratos",
                { tipo: e.target.value },
                entry.id,
              )
            }
          />
          <FileUpload
            label="Justificante"
            file={files[entry.id]}
            onFileChange={(file) => updateFile(entry.id, file)}
            htmlId={`A1_3_BecasContratos-${entry.id}`}
          />
        </EntryCard>
      ))}
    </SectionWrapper>

    <SectionWrapper
      title="A.1.4 Premios Relevantes"
      onAddEntry={() => addEntry("A", "A1_4_PremiosRelevantes")}
      infoText="Añada premios como Premio Extraordinario de Doctorado, Mención Europea/Internacional, etc. Describa brevemente su relevancia."
    >
      {data.A1_4_PremiosRelevantes.map((entry) => (
        <EntryCard
          key={entry.id}
          title="Premio"
          onRemove={() => removeEntry("A", "A1_4_PremiosRelevantes", entry.id)}
        >
          <TextareaInput
            label="Descripción del premio (Máx 500 caract.)"
            value={entry.desc || ""}
            onChange={(e) =>
              updateField(
                "A",
                "A1_4_PremiosRelevantes",
                { desc: e.target.value },
                entry.id,
              )
            }
            maxLength={500}
            rows={2}
          />
          <FileUpload
            label="Justificante"
            file={files[entry.id]}
            onFileChange={(file) => updateFile(entry.id, file)}
            htmlId={`A1_4_PremiosRelevantes-${entry.id}`}
          />
        </EntryCard>
      ))}
    </SectionWrapper>

    <SectionWrapper
      title="A.2 Otros Méritos"
      description="Máximo 6 aportaciones en total para esta subsección (titulaciones, cursos y actividad profesional)."
      infoText="Agregue hasta 6 méritos adicionales que complementen su perfil: otras titulaciones, cursos de formación especializada (se valoran los relacionados con planes de igualdad de la UPO) o experiencia profesional relevante."
      maxEntries={6}
      currentEntries={
        data.A2_1_OtrasTitulaciones.length +
        data.A2_2_CursosFormacion.length +
        data.A2_3_ActividadProfesional.length
      }
    >
      <h4 className="font-semibold text-[var(--text-color)]">
        A.2.1 Otras Titulaciones Complementarias
      </h4>
      {data.A2_1_OtrasTitulaciones.map((entry) => (
        <EntryCard
          key={entry.id}
          title="Titulación"
          onRemove={() => removeEntry("A", "A2_1_OtrasTitulaciones", entry.id)}
        >
          <TextInput
            label="Tipo de Título"
            value={entry.tipo || ""}
            onChange={(e) =>
              updateField(
                "A",
                "A2_1_OtrasTitulaciones",
                { tipo: e.target.value },
                entry.id,
              )
            }
          />
          <FileUpload
            label="Justificante"
            file={files[entry.id]}
            onFileChange={(file) => updateFile(entry.id, file)}
            htmlId={`A2_1_OtrasTitulaciones-${entry.id}`}
          />
        </EntryCard>
      ))}
      <button
        onClick={() => addEntry("A", "A2_1_OtrasTitulaciones")}
        className="text-sm text-[var(--primary-color)] hover:underline mt-2"
      >
        Añadir titulación
      </button>

      <h4 className="font-semibold mt-4 text-[var(--text-color)]">
        A.2.2 Cursos y Formación Recibida
      </h4>
      {data.A2_2_CursosFormacion.map((entry) => (
        <EntryCard
          key={entry.id}
          title="Curso"
          onRemove={() => removeEntry("A", "A2_2_CursosFormacion", entry.id)}
        >
          <TextInput
            label="Nombre del curso y duración (horas)"
            value={entry.nombre || ""}
            onChange={(e) =>
              updateField(
                "A",
                "A2_2_CursosFormacion",
                { nombre: e.target.value },
                entry.id,
              )
            }
          />
          <FileUpload
            label="Justificante"
            file={files[entry.id]}
            onFileChange={(file) => updateFile(entry.id, file)}
            htmlId={`A2_2_CursosFormacion-${entry.id}`}
          />
        </EntryCard>
      ))}
      <button
        onClick={() => addEntry("A", "A2_2_CursosFormacion")}
        className="text-sm text-[var(--primary-color)] hover:underline mt-2"
      >
        Añadir curso
      </button>

      <h4 className="font-semibold mt-4 text-[var(--text-color)]">
        A.2.3 Actividad Profesional
      </h4>
      {data.A2_3_ActividadProfesional.map((entry) => (
        <EntryCard
          key={entry.id}
          title="Actividad Profesional"
          onRemove={() =>
            removeEntry("A", "A2_3_ActividadProfesional", entry.id)
          }
        >
          <TextInput
            label="Puesto y duración"
            value={entry.puesto || ""}
            onChange={(e) =>
              updateField(
                "A",
                "A2_3_ActividadProfesional",
                { puesto: e.target.value },
                entry.id,
              )
            }
          />
          <FileUpload
            label="Justificante"
            file={files[entry.id]}
            onFileChange={(file) => updateFile(entry.id, file)}
            htmlId={`A2_3_ActividadProfesional-${entry.id}`}
          />
        </EntryCard>
      ))}
      <button
        onClick={() => addEntry("A", "A2_3_ActividadProfesional")}
        className="text-sm text-[var(--primary-color)] hover:underline mt-2"
      >
        Añadir actividad
      </button>
    </SectionWrapper>
  </div>
);
