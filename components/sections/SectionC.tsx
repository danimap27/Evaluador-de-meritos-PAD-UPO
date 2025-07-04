import React from "react";
import { SectionCState } from "../../types";
import { SectionWrapper } from "../shared/SectionWrapper";
import { EntryCard } from "../shared/EntryCard";
import { NumberInput, TextareaInput } from "../shared/InputFields";

interface Props {
  data: SectionCState;
  updateField: (
    section: "C",
    field: keyof SectionCState,
    value: any,
    id?: string,
  ) => void;
  addEntry: (section: "C", field: keyof SectionCState, data?: object) => void;
  removeEntry: (section: "C", field: keyof SectionCState, id: string) => void;
}

export const SectionC: React.FC<Props> = ({
  data,
  updateField,
  addEntry,
  removeEntry,
}) => (
  <div className="space-y-8">
    <SectionWrapper
      title="C.1 Experiencia Científica (proyectos, contratos, etc.)"
      maxEntries={2}
      currentEntries={data.C1_ExperienciaCientifica.length}
      onAddEntry={() => addEntry("C", "C1_ExperienciaCientifica")}
      infoText="Aporte hasta 2 participaciones en proyectos de investigación, contratos, redes o grupos de investigación. Se valoran la financiación, el carácter internacional/interdisciplinar y su rol en el equipo."
    >
      {data.C1_ExperienciaCientifica.map((entry) => (
        <EntryCard
          key={entry.id}
          title="Participación"
          onRemove={() =>
            removeEntry("C", "C1_ExperienciaCientifica", entry.id)
          }
        >
          <TextareaInput
            label="Descripción (Máx 2500 caract.)"
            value={entry.desc || ""}
            onChange={(e) =>
              updateField(
                "C",
                "C1_ExperienciaCientifica",
                { desc: e.target.value },
                entry.id,
              )
            }
            maxLength={2500}
            rows={4}
          />
        </EntryCard>
      ))}
    </SectionWrapper>

    <SectionWrapper
      title="C.2 Producción Científica (publicaciones, congresos, etc.)"
      maxEntries={4}
      currentEntries={data.C2_ProduccionCientifica.length}
      onAddEntry={() => addEntry("C", "C2_ProduccionCientifica")}
      infoText="Seleccione sus 4 aportaciones científicas más relevantes (artículos, libros, patentes, software, etc.). Se evaluará la originalidad, el impacto (citas, calidad del medio) y la contribución a la ciencia abierta."
    >
      {data.C2_ProduccionCientifica.map((entry) => (
        <EntryCard
          key={entry.id}
          title="Aportación"
          onRemove={() => removeEntry("C", "C2_ProduccionCientifica", entry.id)}
        >
          <TextareaInput
            label="Resumen (Máx 2500 caract.)"
            value={entry.resumen || ""}
            onChange={(e) =>
              updateField(
                "C",
                "C2_ProduccionCientifica",
                { resumen: e.target.value },
                entry.id,
              )
            }
            maxLength={2500}
            rows={3}
          />
          <TextareaInput
            label="Indicios de relevancia/impacto (Máx 2500 caract.)"
            value={entry.impacto || ""}
            onChange={(e) =>
              updateField(
                "C",
                "C2_ProduccionCientifica",
                { impacto: e.target.value },
                entry.id,
              )
            }
            maxLength={2500}
            rows={3}
          />
        </EntryCard>
      ))}
    </SectionWrapper>

    <SectionWrapper
      title="C.3 Transferencia Científica"
      maxEntries={1}
      currentEntries={data.C3_TransferenciaCientifica.length}
      onAddEntry={() => addEntry("C", "C3_TransferenciaCientifica")}
      infoText="Presente 1 aportación destacada de transferencia de conocimiento, como contratos con empresas, creación de spin-offs, patentes licenciadas o actividades de valor social."
    >
      {data.C3_TransferenciaCientifica.map((entry) => (
        <EntryCard
          key={entry.id}
          title="Aportación"
          onRemove={() =>
            removeEntry("C", "C3_TransferenciaCientifica", entry.id)
          }
        >
          <TextareaInput
            label="Resumen (Máx 2500 caract.)"
            value={entry.resumen || ""}
            onChange={(e) =>
              updateField(
                "C",
                "C3_TransferenciaCientifica",
                { resumen: e.target.value },
                entry.id,
              )
            }
            maxLength={2500}
            rows={3}
          />
          <TextareaInput
            label="Indicios de relevancia/impacto (Máx 2500 caract.)"
            value={entry.impacto || ""}
            onChange={(e) =>
              updateField(
                "C",
                "C3_TransferenciaCientifica",
                { impacto: e.target.value },
                entry.id,
              )
            }
            maxLength={2500}
            rows={3}
          />
        </EntryCard>
      ))}
    </SectionWrapper>

    <SectionWrapper
      title="C.4 Divulgación Científica"
      maxEntries={1}
      currentEntries={data.C4_DivulgacionCientifica.length}
      onAddEntry={() => addEntry("C", "C4_DivulgacionCientifica")}
      infoText="Presente 1 aportación destacada de divulgación, como organización de congresos, participación en medios de comunicación, o proyectos de ciencia ciudadana."
    >
      {data.C4_DivulgacionCientifica.map((entry) => (
        <EntryCard
          key={entry.id}
          title="Aportación"
          onRemove={() =>
            removeEntry("C", "C4_DivulgacionCientifica", entry.id)
          }
        >
          <TextareaInput
            label="Resumen (Máx 2500 caract.)"
            value={entry.resumen || ""}
            onChange={(e) =>
              updateField(
                "C",
                "C4_DivulgacionCientifica",
                { resumen: e.target.value },
                entry.id,
              )
            }
            maxLength={2500}
            rows={3}
          />
          <TextareaInput
            label="Indicios de relevancia/impacto (Máx 2500 caract.)"
            value={entry.impacto || ""}
            onChange={(e) =>
              updateField(
                "C",
                "C4_DivulgacionCientifica",
                { impacto: e.target.value },
                entry.id,
              )
            }
            maxLength={2500}
            rows={3}
          />
        </EntryCard>
      ))}
    </SectionWrapper>

    <SectionWrapper
      title="C.5 Estancias de Investigación"
      infoText="Registre estancias de investigación en otros centros (mínimo 15 días consecutivos). Se valora la duración (máx. 1 año), financiación competitiva y el prestigio del centro de destino."
    >
      <NumberInput
        label="Duración total en meses (Máx 12)"
        value={data.C5_EstanciasInvestigacion.meses}
        onChange={(e) =>
          updateField("C", "C5_EstanciasInvestigacion", {
            meses: (e.target as HTMLInputElement).valueAsNumber,
          })
        }
        max={12}
      />
      <TextareaInput
        label="Descripción de las estancias (Máx 2500 caract.)"
        value={data.C5_EstanciasInvestigacion.desc || ""}
        onChange={(e) =>
          updateField("C", "C5_EstanciasInvestigacion", {
            desc: e.target.value,
          })
        }
        maxLength={2500}
        rows={4}
      />
    </SectionWrapper>
  </div>
);
