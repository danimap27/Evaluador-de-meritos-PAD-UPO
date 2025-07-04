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
      <div className="bg-white p-2 border border-gray-300 rounded shadow-lg">
        <p className="font-bold">{label}</p>
        <p className="text-blue-600">{`Puntuación: ${payload[0].value.toFixed(2)} / ${payload[0].payload.maxScore}`}</p>
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
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Puntuación Total
        </h2>
        <p className="text-5xl font-extrabold text-center text-blue-600 mt-2">
          {scores.total.toFixed(2)} / 100
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: "#4A5568", fontSize: 12 }}
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
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.6}
            />
            <Legend />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
          Desglose de Puntuación
        </h3>

        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-baseline mb-1">
            <span className="font-bold text-blue-800">Fase 1</span>
            <span className="text-lg font-bold text-blue-800">
              {scores.phase1.toFixed(2)} / 75.00
            </span>
          </div>
          {scores.preferredMeritBonus > 0 && (
            <p className="text-xs text-green-600">
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
                <span className="font-medium text-gray-600">
                  {section.name}
                </span>
                <span className="font-semibold text-gray-800">
                  {section.score.toFixed(2)} / {section.maxScore.toFixed(2)}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${Math.min(section.percentage, 100)}%` }}
                ></div>
              </div>
            </div>
          ))}

        <div className="p-3 bg-green-50 rounded-lg mt-4">
          <div className="flex justify-between items-baseline mb-1">
            <span className="font-bold text-green-800">Fase 2</span>
            <span className="text-lg font-bold text-green-800">
              {scores.phase2.toFixed(2)} / 25.00
            </span>
          </div>
        </div>
        <div key={scores.sections[4].name}>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-600">
              {scores.sections[4].name}
            </span>
            <span className="font-semibold text-gray-800">
              {scores.sections[4].score.toFixed(2)} /{" "}
              {scores.sections[4].maxScore.toFixed(2)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-600 h-2.5 rounded-full"
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
