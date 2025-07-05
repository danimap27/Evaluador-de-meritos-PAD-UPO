import React from "react";

export const Disclaimer: React.FC = () => {
  return (
    <div className="p-6 bg-[var(--secondary-color)] bg-opacity-20 border-l-4 border-[var(--secondary-color)] rounded-r-lg text-[var(--text-color)]">
      <h3 className="font-bold text-lg mb-2">Aviso Importante</h3>
      <p className="text-sm">
        Esta aplicación es una <strong>herramienta de ayuda</strong> y sus
        cálculos son{" "}
        <strong>
          solo para fines informativos y no tienen valor normativo
        </strong>
        . La evaluación final, los criterios y las decisiones son competencia
        exclusiva de las Comisiones de Selección correspondientes.
      </p>
      <p className="text-sm mt-2">
        La herramienta considera los principios de no discriminación y tiene en
        cuenta circunstancias como permisos, reducciones de jornada o enfermedad
        para la conciliación de la vida personal, familiar y laboral.
      </p>
    </div>
  );
};
