import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cultureScales } from "@/data/cultureScales";
import ScaleWithScenarios from "@/components/ScaleWithScenarios";
import EmailCapture from "@/components/EmailCapture";

const Index = () => {
  const [step, setStep] = useState<"intro" | "scale" | "report">("intro");
  const [currentScaleIdx, setCurrentScaleIdx] = useState(0);
  const [scaleValues, setScaleValues] = useState<Record<string, number | null>>(
    Object.fromEntries(cultureScales.map((s) => [s.id, null]))
  );
  const [scenarioResponses, setScenarioResponses] = useState<
    Record<string, string[]>
  >({});

  const currentScale = cultureScales[currentScaleIdx];

  const handleScaleChange = (value: number) => {
    setScaleValues((prev) => ({ ...prev, [currentScale.id]: value }));
  };

  const handleScenarioChange = (qIdx: number, value: string) => {
    setScenarioResponses((prev) => {
      const arr = [...(prev[currentScale.id] || [])];
      arr[qIdx] = value;
      return { ...prev, [currentScale.id]: arr };
    });
  };

  const canProceed = scaleValues[currentScale?.id] !== null;

  const handleNext = () => {
    if (currentScaleIdx < cultureScales.length - 1) {
      setCurrentScaleIdx((i) => i + 1);
    } else {
      setStep("report");
    }
  };

  const handleBack = () => {
    if (currentScaleIdx > 0) {
      setCurrentScaleIdx((i) => i - 1);
    } else {
      setStep("intro");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-display text-lg font-bold text-foreground tracking-tight">
            The Culture Map
          </h1>
          {step === "scale" && (
            <div className="flex items-center gap-1.5">
              {cultureScales.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i < currentScaleIdx
                      ? "bg-secondary"
                      : i === currentScaleIdx
                      ? "bg-secondary ring-2 ring-secondary/30"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Intro */}
        {step === "intro" && (
          <div className="text-center max-w-xl mx-auto animate-fade-in" style={{ opacity: 0 }}>
            <p className="text-sm font-body text-secondary font-semibold tracking-widest uppercase mb-4">
              A Self-Assessment Tool by Dignitea
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Mapping Your
              <br />
              Cultural Profile
            </h2>
            <p className="text-muted-foreground font-body text-lg leading-relaxed mb-4">
              Based on Erin Meyer's{" "}
              <em className="text-foreground">The Culture Map</em>, this tool
              helps you reflect where you fall on 8 cultural
              scales — and how to adapt when working across cultures.
            </p>
            <p className="text-muted-foreground font-body text-sm mb-10">
              You'll place yourself on each scale, think through workplace
              scenarios, and receive a personalised report.
            </p>
            <Button
              onClick={() => setStep("scale")}
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-body font-semibold px-10"
            >
              Begin Mapping →
            </Button>
          </div>
        )}

        {/* Scale + Scenarios (one at a time) */}
        {step === "scale" && (
          <div key={currentScale.id}>
            <ScaleWithScenarios
              scale={currentScale}
              scaleValue={scaleValues[currentScale.id]}
              onScaleChange={handleScaleChange}
              scenarioResponses={scenarioResponses[currentScale.id] || []}
              onScenarioChange={handleScenarioChange}
              index={currentScaleIdx}
              total={cultureScales.length}
            />
            <div className="flex justify-between mt-10">
              <Button
                onClick={handleBack}
                variant="outline"
                className="font-body"
              >
                ← Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-body font-semibold px-10 disabled:opacity-40"
              >
                {currentScaleIdx < cultureScales.length - 1
                  ? "Next Scale →"
                  : "Get My Report →"}
              </Button>
            </div>
            {!canProceed && (
              <p className="text-xs text-muted-foreground font-body text-right mt-2">
                Place yourself on the scale to continue
              </p>
            )}
          </div>
        )}

        {/* Report */}
        {step === "report" && (
          <div className="py-12">
            <EmailCapture
              scaleValues={scaleValues}
              scenarioResponses={scenarioResponses}
            />
            <div className="text-center mt-8">
              <Button
                onClick={() => {
                  setCurrentScaleIdx(cultureScales.length - 1);
                  setStep("scale");
                }}
                variant="ghost"
                className="font-body text-muted-foreground"
              >
                ← Back to Scales
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-8 text-center">
        <p className="text-xs text-muted-foreground font-body">
          Based on <em>The Culture Map</em> by Erin Meyer · For educational
          purposes
        </p>
      </footer>
    </div>
  );
};

export default Index;
