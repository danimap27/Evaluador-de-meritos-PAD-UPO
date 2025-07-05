import React from "react";
import { SectionBState } from "../../types";
import { SectionWrapper } from "../shared/SectionWrapper";
import { EntryCard } from "../shared/EntryCard";
import { NumberInput, TextareaInput } from "../shared/InputFields";

interface Props {
  data: SectionBState;
  updateField: (
    section: "B",
    field: keyof SectionBState,
    value: any,
    id?: string,
  ) => void;
  addEntry: (section: "B", field: keyof SectionBState, data?: object) => void;
  removeEntry: (section: "B", field: keyof SectionBState, id: string) => void;
}

export const SectionB: React.FC<Props> = ({
  data,
  updateField,
  addEntry,
  removeEntry,
}) => {
  const isSaturatedUni = data.B1_1_ActividadDocenteUni.horas >= 240;
  const isSaturatedNoUni = data.B1_2_ActividadDocenteNoUni.horas >= 240;

  return (
    <div className="space-y-8">
      <SectionWrapper
        title="B.1.1 Actividad Docente Universitaria"
        infoText="Registre las horas de docencia impartida en titulaciones universitarias oficiales. Se valora la diversidad de asignaturas, titulaciones, y la docencia en otros idiomas."
      >
        <div className="flex items-center gap-2">
          <NumberInput
            label="Total de Horas Impartidas"
            value={data.B1_1_ActividadDocenteUni.horas}
            onChange={(e) =>
              updateField("B", "B1_1_ActividadDocenteUni", {
                horas: (e.target as HTMLInputElement).valueAsNumber,
              })
            }
            max={240}
          />
          <div
            className={`mt-6 p-2 text-sm rounded-full hours-counter ${isSaturatedUni ? "bg-[color-mix(in srgb, var(--secondary-color) 20%, transparent)] text-[var(--text-color)]" : "bg-[color-mix(in srgb, var(--text-color) 10%, transparent)] text-[var(--text-color)]"}`}
          >
            {data.B1_1_ActividadDocenteUni.horas} / 240h{" "}
            {isSaturatedUni ? "(Máx)" : ""}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        title="B.1.2 Actividad Docente no Universitaria"
        infoText="Registre las horas de docencia impartida en otros contextos educativos reglados (e.g., Formación Profesional, Enseñanzas de Régimen Especial)."
      >
        <div className="flex items-center gap-2">
          <NumberInput
            label="Total de Horas Impartidas"
            value={data.B1_2_ActividadDocenteNoUni.horas}
            onChange={(e) =>
              updateField("B", "B1_2_ActividadDocenteNoUni", {
                horas: (e.target as HTMLInputElement).valueAsNumber,
              })
            }
            max={240}
          />
          <div
            className={`mt-6 p-2 text-sm rounded-full hours-counter ${isSaturatedNoUni ? "bg-[color-mix(in srgb, var(--secondary-color) 20%, transparent)] text-[var(--text-color)]" : "bg-[color-mix(in srgb, var(--text-color) 10%, transparent)] text-[var(--text-color)]"}`}
          >
            {data.B1_2_ActividadDocenteNoUni.horas} / 240h{" "}
            {isSaturatedNoUni ? "(Máx)" : ""}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        title="B.2 Calidad de la Actividad Docente Universitaria"
        infoText="Aporte los resultados de encuestas de evaluación docente (como el programa DOCENTIA) o un autoinforme detallado sobre la calidad de su docencia. La mención de excelencia será especialmente valorada."
      >
        <TextareaInput
          label="Resultados DOCENTIA o autoinforme (Máx 2500 caract.)"
          value={data.B2_CalidadDocente.informe}
          onChange={(e) =>
            updateField("B", "B2_CalidadDocente", { informe: e.target.value })
          }
          maxLength={2500}
          rows={4}
        />
      </SectionWrapper>

      <SectionWrapper
        title="B.3 Tutela de Alumnado (TFG, TFM, Tesis)"
        maxEntries={2}
        currentEntries={data.B3_TutelaAlumnado.length}
        onAddEntry={() => addEntry("B", "B3_TutelaAlumnado")}
        infoText="Incluya la dirección de hasta 2 trabajos como TFG, TFM o Tesis Doctorales. Se valora el impacto y la contribución al conocimiento."
      >
        {data.B3_TutelaAlumnado.map((entry) => (
          <EntryCard
            key={entry.id}
            title="Tutela"
            onRemove={() => removeEntry("B", "B3_TutelaAlumnado", entry.id)}
          >
            <TextareaInput
              label="Descripción de la tutela (Máx 500 caract.)"
              value={entry.desc || ""}
              onChange={(e) =>
                updateField(
                  "B",
                  "B3_TutelaAlumnado",
                  { desc: e.target.value },
                  entry.id,
                )
              }
              maxLength={500}
              rows={2}
            />
          </EntryCard>
        ))}
      </SectionWrapper>

      <SectionWrapper
        title="B.4 Innovación en Metodología Docente Universitaria"
        maxEntries={2}
        currentEntries={data.B4_InnovacionDocente.length}
        onAddEntry={() => addEntry("B", "B4_InnovacionDocente")}
        infoText="Aporte hasta 2 participaciones en proyectos de innovación docente, creación de materiales en acceso abierto o pertenencia a grupos de innovación. Se valora la financiación obtenida."
      >
        {data.B4_InnovacionDocente.map((entry) => (
          <EntryCard
            key={entry.id}
            title="Innovación"
            onRemove={() => removeEntry("B", "B4_InnovacionDocente", entry.id)}
          >
            <TextareaInput
              label="Descripción de la innovación (Máx 500 caract.)"
              value={entry.desc || ""}
              onChange={(e) =>
                updateField(
                  "B",
                  "B4_InnovacionDocente",
                  { desc: e.target.value },
                  entry.id,
                )
              }
              maxLength={500}
              rows={2}
            />
          </EntryCard>
        ))}
      </SectionWrapper>

      <SectionWrapper
        title="B.5 Cursos de Formación Docente Universitaria"
        maxEntries={2}
        currentEntries={data.B5_CursosFormacionDocente.length}
        onAddEntry={() => addEntry("B", "B5_CursosFormacionDocente")}
        infoText="Incluya hasta 2 cursos relevantes sobre formación docente, ya sean recibidos o impartidos. Se valora la duración y calidad."
      >
        {data.B5_CursosFormacionDocente.map((entry) => (
          <EntryCard
            key={entry.id}
            title="Curso"
            onRemove={() =>
              removeEntry("B", "B5_CursosFormacionDocente", entry.id)
            }
          >
            <TextareaInput
              label="Descripción del curso (recibido o impartido, máx 500 caract.)"
              value={entry.desc || ""}
              onChange={(e) =>
                updateField(
                  "B",
                  "B5_CursosFormacionDocente",
                  { desc: e.target.value },
                  entry.id,
                )
              }
              maxLength={500}
              rows={2}
            />
          </EntryCard>
        ))}
      </SectionWrapper>

      <SectionWrapper
        title="B.6 Actividades de Divulgación Docente Universitaria"
        maxEntries={2}
        currentEntries={data.B6_ActividadesDivulgacionDocente.length}
        onAddEntry={() => addEntry("B", "B6_ActividadesDivulgacionDocente")}
        infoText="Aporte hasta 2 actividades de divulgación relacionadas con la docencia, como la participación en olimpiadas científicas o ferias educativas."
      >
        {data.B6_ActividadesDivulgacionDocente.map((entry) => (
          <EntryCard
            key={entry.id}
            title="Actividad"
            onRemove={() =>
              removeEntry("B", "B6_ActividadesDivulgacionDocente", entry.id)
            }
          >
            <TextareaInput
              label="Descripción de la actividad (Máx 500 caract.)"
              value={entry.desc || ""}
              onChange={(e) =>
                updateField(
                  "B",
                  "B6_ActividadesDivulgacionDocente",
                  { desc: e.target.value },
                  entry.id,
                )
              }
              maxLength={500}
              rows={2}
            />
          </EntryCard>
        ))}
      </SectionWrapper>

      <SectionWrapper
        title="B.7 Estancias Docentes"
        infoText="Registre estancias en otras universidades (mínimo 15 días consecutivos) para impartir docencia. Se valora la duración (máx. 3 meses), financiación y prestigio del centro de destino."
      >
        <NumberInput
          label="Duración total en meses (Máx 3)"
          value={data.B7_EstanciasDocentes.meses}
          onChange={(e) =>
            updateField("B", "B7_EstanciasDocentes", {
              meses: (e.target as HTMLInputElement).valueAsNumber,
            })
          }
          max={3}
        />
        <TextareaInput
          label="Descripción de las estancias (Máx 2500 caract.)"
          value={data.B7_EstanciasDocentes.desc || ""}
          onChange={(e) =>
            updateField("B", "B7_EstanciasDocentes", { desc: e.target.value })
          }
          maxLength={2500}
          rows={4}
        />
      </SectionWrapper>
    </div>
  );
};
