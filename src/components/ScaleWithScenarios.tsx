import CultureScale from "@/components/CultureScale";
import type { ScaleData } from "@/data/cultureScales";

interface ScaleWithScenariosProps {
  scale: ScaleData;
  scaleValue: number | null;
  onScaleChange: (value: number) => void;
  scenarioResponses: string[];
  onScenarioChange: (qIdx: number, value: string) => void;
  index: number;
  total: number;
}

const ScaleWithScenarios = ({
  scale,
  scaleValue,
  onScaleChange,
  scenarioResponses,
  onScenarioChange,
  index,
  total,
}: ScaleWithScenariosProps) => {
  return (
    <div className="animate-fade-in" style={{ opacity: 0 }}>
      <div className="text-center mb-8">
        <p className="text-sm text-secondary font-body font-medium mb-2">
          Scale {index + 1} of {total}
        </p>
        <h2 className="font-display text-3xl font-bold text-foreground mb-3">
          {scale.name}
        </h2>
      </div>

      <CultureScale
        scale={scale}
        value={scaleValue}
        onChange={onScaleChange}
        index={0}
      />

      {scaleValue !== null && (
        <div
          className="bg-card rounded-lg p-6 border border-border mt-6 animate-fade-in"
          style={{ opacity: 0 }}
        >
          <h3 className="font-display text-lg font-semibold text-foreground mb-1">
            Workplace Scenarios
          </h3>
          <p className="text-xs text-muted-foreground font-body mb-4">
            Consider these scenarios and reflect on how you would adapt.
          </p>

          {scale.scenarioQuestions.map((q, qIdx) => (
            <div key={qIdx} className="mb-4 last:mb-0">
              <label className="text-sm font-body text-foreground font-medium block mb-2 leading-relaxed">
                {q}
              </label>
              <textarea
                value={scenarioResponses[qIdx] || ""}
                onChange={(e) => onScenarioChange(qIdx, e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/40 resize-none transition-shadow"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScaleWithScenarios;
