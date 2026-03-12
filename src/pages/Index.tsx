import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cultureScales } from "@/data/cultureScales";
import CultureScale from "@/components/CultureScale";
import ScenarioStep from "@/components/ScenarioStep";
import EmailCapture from "@/components/EmailCapture";

type Step = "intro" | "scales" | "scenarios" | "email";

const Index = () => {
  const [step, setStep] = useState<Step>("intro");
  const [scaleValues, setScaleValues] = useState<Record<string, number | null>>(
    Object.fromEntries(cultureScales.map((s) => [s.id, null]))
  );
  const [scenarioResponses, setScenarioResponses] = useState<
    Record<string, string[]>
  >({});

  const completedScales = Object.values(scaleValues).filter(
    (v) => v !== null
  ).length;

  const handleScaleChange = (id: string, value: number) => {
    setScaleValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleScenarioChange = (
    scaleId: string,
    qIdx: number,
    value: string
  ) => {
    setScenarioResponses((prev) => {
      const arr = [...(prev[scaleId] || [])];
      arr[qIdx] = value;
      return { ...prev, [scaleId]: arr };
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-display text-lg font-bold text-foreground tracking-tight">
            The Culture Map
          </h1>
          {step !== "intro" && (
            <div className="flex items-center gap-2 text-xs font-body text-muted-foreground">
              <span
                className={
                  step === "scales"
                    ? "text-secondary font-semibold"
                    : ""
                }
              >
                Map
              </span>
              <span>·</span>
              <span
                className={
                  step === "scenarios"
                    ? "text-secondary font-semibold"
                    : ""
                }
              >
                Reflect
              </span>
              <span>·</span>
              <span
                className={
                  step === "email"
                    ? "text-secondary font-semibold"
                    : ""
                }
              >
                Report
              </span>
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
              onClick={() => setStep("scales")}
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-body font-semibold px-10"
            >
              Begin Mapping →
            </Button>
          </div>
        )}

        {/* Scales */}
        {step === "scales" && (
          <div>
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl font-bold text-foreground mb-3">
                Place Yourself on Each Scale
              </h2>
              <p className="text-muted-foreground font-body">
                Click or drag on each scale to mark where you think you fall.
                Toggle country positions for reference.
              </p>
              <p className="text-sm text-secondary font-body mt-2 font-medium">
                {completedScales} of {cultureScales.length} scales completed
              </p>
            </div>

            {cultureScales.map((scale, i) => (
              <CultureScale
                key={scale.id}
                scale={scale}
                value={scaleValues[scale.id]}
                onChange={(v) => handleScaleChange(scale.id, v)}
                index={i}
              />
            ))}

            <div className="flex justify-end mt-8">
              <Button
                onClick={() => setStep("scenarios")}
                disabled={completedScales < cultureScales.length}
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-body font-semibold px-10 disabled:opacity-40"
              >
                Continue to Scenarios →
              </Button>
            </div>
            {completedScales < cultureScales.length && (
              <p className="text-xs text-muted-foreground font-body text-right mt-2">
                Complete all scales to continue
              </p>
            )}
          </div>
        )}

        {/* Scenarios */}
        {step === "scenarios" && (
          <div>
            <ScenarioStep
              responses={scenarioResponses}
              onChange={handleScenarioChange}
            />
            <div className="flex justify-between mt-10">
              <Button
                onClick={() => setStep("scales")}
                variant="outline"
                className="font-body"
              >
                ← Back to Scales
              </Button>
              <Button
                onClick={() => setStep("email")}
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-body font-semibold px-10"
              >
                Get My Report →
              </Button>
            </div>
          </div>
        )}

        {/* Email */}
        {step === "email" && (
          <div className="py-12">
            <EmailCapture
              scaleValues={scaleValues}
              scenarioResponses={scenarioResponses}
            />
            <div className="text-center mt-8">
              <Button
                onClick={() => setStep("scenarios")}
                variant="ghost"
                className="font-body text-muted-foreground"
              >
                ← Back to Scenarios
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
