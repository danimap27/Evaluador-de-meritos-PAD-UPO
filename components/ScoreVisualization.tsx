import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { CalculatedScores } from "../types";

interface ScoreVisualizationProps {
  scores: CalculatedScores;
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--background-color)] p-2 border border-[var(--text-color)] border-opacity-30 rounded shadow-lg">
        <p className="font-bold text-[var(--text-color)]">{label}</p>
        <p className="text-[var(--primary-color)]">{`Puntuación: ${payload[0].value.toFixed(2)} / ${payload[0].payload.maxScore}`}</p>
      </div>
    );
  }
  return null;
};

export const ScoreVisualization: React.FC<ScoreVisualizationProps> = ({
  scores,
}) => {
  const chartData = scores.sections.map((s) => ({
    subject: s.name.split(":")[0],
    score: s.score,
    maxScore: s.maxScore,
  }));

  return (
    <div className="bg-[var(--background-color)] p-6 rounded-xl shadow-lg border border-[var(--text-color)] border-opacity-20 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-center text-[var(--text-color)]">
          Puntuación Total
        </h2>
        <p className="text-5xl font-extrabold text-center text-[var(--primary-color)] mt-2">
          {scores.total.toFixed(2)} / 100
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "var(--text-color)", fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, "dataMax + 5"]}
              tick={false}
              axisLine={false}
            />
            <Radar
              name="Puntuación"
              dataKey="score"
              stroke="var(--primary-color)"
              fill="var(--primary-color)"
              fillOpacity={0.6}
            />
            <Legend />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[var(--text-color)] border-b pb-2">
          Desglose de Puntuación
        </h3>

        <div className="p-3 bg-[color-mix(in srgb, var(--primary-color) 10%, transparent)] rounded-lg">
          <div className="flex justify-between items-baseline mb-1">
            <span className="font-bold text-[var(--primary-color)]">Fase 1</span>
            <span className="text-lg font-bold text-[var(--primary-color)]">
              {scores.phase1.toFixed(2)} / 75.00
            </span>
          </div>
          {scores.preferredMeritBonus > 0 && (
            <p className="text-xs text-[var(--secondary-color)]">
              + {scores.preferredMeritBonus.toFixed(2)} pts por méritos
              preferentes
            </p>
          )}
        </div>

        {scores.sections
          .filter((s) => s.name !== "Fase 2: Exposición y Debate")
          .map((section) => (
            <div key={section.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-[var(--text-color)]">
                  {section.name}
                </span>
                <span className="font-semibold text-[var(--text-color)]">
                  {section.score.toFixed(2)} / {section.maxScore.toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-[color-mix(in srgb, var(--text-color) 10%, transparent)] rounded-full h-2.5">
                <div
                  className="bg-[var(--primary-color)] h-2.5 rounded-full"
                  style={{ width: `${Math.min(section.percentage, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}

        <div className="p-3 bg-[color-mix(in srgb, var(--secondary-color) 10%, transparent)] rounded-lg mt-4">
          <div className="flex justify-between items-baseline mb-1">
            <span className="font-bold text-[var(--text-color)]">Fase 2</span>
            <span className="text-lg font-bold text-[var(--text-color)]">
              {scores.phase2.toFixed(2)} / 25.00
            </span>
          </div>
        </div>
        <div key={scores.sections[4].name}>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-[var(--text-color)]">
              {scores.sections[4].name}
            </span>
            <span className="font-semibold text-[var(--text-color)]">
              {scores.sections[4].score.toFixed(2)} /{" "}
              {scores.sections[4].maxScore.toFixed(2)}
            </span>
          </div>
          <div className="w-full bg-[color-mix(in srgb, var(--text-color) 10%, transparent)] rounded-full h-2.5">
            <div
              className="bg-[var(--secondary-color)] h-2.5 rounded-full"
              style={{
                width: `${Math.min(scores.sections[4].percentage, 100)}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};