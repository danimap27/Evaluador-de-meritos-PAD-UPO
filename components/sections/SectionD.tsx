import React from "react";
import { SectionDState } from "../../types";
import { SectionWrapper } from "../shared/SectionWrapper";
import { EntryCard } from "../shared/EntryCard";
import { TextareaInput, FileUpload } from "../shared/InputFields";

interface Props {
  data: SectionDState;
  files: { [id: string]: File };
  updateField: (
    section: "D",
    field: keyof SectionDState,
    value: any,
    id?: string,
  ) => void;
  addEntry: (section: "D", field: keyof SectionDState, data?: object) => string;
  removeEntry: (section: "D", field: keyof SectionDState, id: string) => void;
  updateFile: (id: string, file: File) => void;
}

export const SectionD: React.FC<Props> = ({
  data,
  files,
  updateField,
  addEntry,
  removeEntry,
  updateFile,
}) => (
  <div className="space-y-8">
    <SectionWrapper
      title="D.1 Gestión Académica"
      maxEntries={2}
      currentEntries={data.D1_GestionAcademica.length}
      onAddEntry={() => addEntry("D", "D1_GestionAcademica")}
      infoText="Incluya hasta 2 cargos de gestión unipersonales (e.g., dirección de departamento) o participaciones en órganos colegiados."
    >
      {data.D1_GestionAcademica.map((entry) => (
        <EntryCard
          key={entry.id}
          title="Cargo/Actividad"
          onRemove={() => removeEntry("D", "D1_GestionAcademica", entry.id)}
        >
          <TextareaInput
            label="Descripción (Máx 500 caract.)"
            value={entry.desc || ""}
            onChange={(e) =>
              updateField(
                "D",
                "D1_GestionAcademica",
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
            htmlId={`D1_GestionAcademica-${entry.id}`}
          />
        </EntryCard>
      ))}
    </SectionWrapper>

    <SectionWrapper
      title="D.2 Gestión de la Docencia e Investigación"
      maxEntries={2}
      currentEntries={data.D2_GestionDocenciaInvestigacion.length}
      onAddEntry={() => addEntry("D", "D2_GestionDocenciaInvestigacion")}
      infoText="Incluya hasta 2 actividades como la coordinación de programas, participación en comités editoriales, evaluación de proyectos (peer review) u organización de congresos."
    >
      {data.D2_GestionDocenciaInvestigacion.map((entry) => (
        <EntryCard
          key={entry.id}
          title="Cargo/Actividad"
          onRemove={() =>
            removeEntry("D", "D2_GestionDocenciaInvestigacion", entry.id)
          }
        >
          <TextareaInput
            label="Descripción (Máx 500 caract.)"
            value={entry.desc || ""}
            onChange={(e) =>
              updateField(
                "D",
                "D2_GestionDocenciaInvestigacion",
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
            htmlId={`D2_GestionDocenciaInvestigacion-${entry.id}`}
          />
        </EntryCard>
      ))}
    </SectionWrapper>

    <SectionWrapper
      title="D.3 Gestión No Universitaria"
      maxEntries={2}
      currentEntries={data.D3_GestionNoUniversitaria.length}
      onAddEntry={() => addEntry("D", "D3_GestionNoUniversitaria")}
      infoText="Aporte hasta 2 cargos de responsabilidad en centros de I+D o educativos no universitarios."
    >
      {data.D3_GestionNoUniversitaria.map((entry) => (
        <EntryCard
          key={entry.id}
          title="Cargo/Actividad"
          onRemove={() =>
            removeEntry("D", "D3_GestionNoUniversitaria", entry.id)
          }
        >
          <TextareaInput
            label="Descripción (Máx 500 caract.)"
            value={entry.desc || ""}
            onChange={(e) =>
              updateField(
                "D",
                "D3_GestionNoUniversitaria",
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
            htmlId={`D3_GestionNoUniversitaria-${entry.id}`}
          />
        </EntryCard>
      ))}
    </SectionWrapper>
  </div>
);

