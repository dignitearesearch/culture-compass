import { cultureScales } from "@/data/cultureScales";

interface ScenarioStepProps {
  responses: Record<string, string[]>;
  onChange: (scaleId: string, qIdx: number, value: string) => void;
}

const ScenarioStep = ({ responses, onChange }: ScenarioStepProps) => {
  // Pick 2 scales that have the most "extreme" user positions for interesting scenarios
  const selectedScales = cultureScales.slice(0, 4);

  return (
    <div className="space-y-10">
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl font-bold text-foreground mb-3">
          Workplace Scenarios
        </h2>
        <p className="text-muted-foreground font-body max-w-xl mx-auto">
          Consider these scenarios and reflect on how you would adapt when
          working across cultures. There are no right answers — this is about
          building self-awareness.
        </p>
      </div>

      {selectedScales.map((scale, sIdx) => (
        <div
          key={scale.id}
          className="bg-card rounded-lg p-6 border border-border animate-fade-in"
          style={{ animationDelay: `${sIdx * 100}ms`, opacity: 0 }}
        >
          <h3 className="font-display text-lg font-semibold text-foreground mb-1">
            {scale.name}
          </h3>
          <p className="text-xs text-muted-foreground font-body mb-4">
            {scale.leftLabel} ↔ {scale.rightLabel}
          </p>

          {scale.scenarioQuestions.map((q, qIdx) => (
            <div key={qIdx} className="mb-4 last:mb-0">
              <label className="text-sm font-body text-foreground font-medium block mb-2 leading-relaxed">
                {q}
              </label>
              <textarea
                value={responses[scale.id]?.[qIdx] || ""}
                onChange={(e) => onChange(scale.id, qIdx, e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/40 resize-none transition-shadow"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ScenarioStep;
