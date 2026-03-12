import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cultureScales } from "@/data/cultureScales";

interface EmailCaptureProps {
  scaleValues: Record<string, number | null>;
  scenarioResponses: Record<string, string[]>;
}

const EmailCapture = ({ scaleValues, scenarioResponses }: EmailCaptureProps) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // In a real app this would send to a backend
    // For now we generate and download the report
    generateReport();
    setSubmitted(true);
  };

  const generateReport = () => {
    let report = "═══════════════════════════════════════════════\n";
    report += "        YOUR CULTURE MAP — PERSONAL REPORT\n";
    report += "═══════════════════════════════════════════════\n\n";
    report += `Generated for: ${email}\n`;
    report += `Date: ${new Date().toLocaleDateString()}\n\n`;

    report += "── YOUR POSITIONS ON THE 8 SCALES ──\n\n";

    cultureScales.forEach((scale) => {
      const val = scaleValues[scale.id];
      const pos = val !== null && val !== undefined ? val : "Not set";
      const bar =
        val !== null && val !== undefined
          ? "█".repeat(Math.round(val / 5)) +
            "░".repeat(20 - Math.round(val / 5))
          : "░".repeat(20);

      report += `${scale.name}\n`;
      report += `${scale.leftLabel}  [${bar}]  ${scale.rightLabel}\n`;
      report += `Your position: ${pos}%\n\n`;
    });

    report += "\n── SCENARIO REFLECTIONS ──\n\n";

    cultureScales.slice(0, 4).forEach((scale) => {
      const answers = scenarioResponses[scale.id];
      if (answers && answers.some((a) => a.trim())) {
        report += `▸ ${scale.name}\n`;
        scale.scenarioQuestions.forEach((q, i) => {
          if (answers[i]?.trim()) {
            report += `  Q: ${q}\n`;
            report += `  A: ${answers[i]}\n\n`;
          }
        });
      }
    });

    report += "\n═══════════════════════════════════════════════\n";
    report += "Based on the framework from Erin Meyer's The Culture Map\n";
    report += "═══════════════════════════════════════════════\n";

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "culture-map-report.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (submitted) {
    return (
      <div className="text-center animate-fade-in" style={{ opacity: 0 }}>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 mb-6">
          <span className="text-3xl">✓</span>
        </div>
        <h2 className="font-display text-3xl font-bold text-foreground mb-3">
          Report Downloaded!
        </h2>
        <p className="text-muted-foreground font-body max-w-md mx-auto mb-2">
          Your personal culture map report has been downloaded. Check your downloads folder.
        </p>
        <p className="text-sm text-muted-foreground font-body">
          Sent to: <span className="text-foreground font-medium">{email}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="text-center animate-fade-in" style={{ opacity: 0 }}>
      <h2 className="font-display text-3xl font-bold text-foreground mb-3">
        Get Your Report
      </h2>
      <p className="text-muted-foreground font-body max-w-md mx-auto mb-8">
        Enter your email to receive a one-page summary of your personal culture
        map, including your scale positions and scenario reflections.
      </p>

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-shadow text-center"
          />
          {error && (
            <p className="text-xs text-destructive mt-1 font-body">{error}</p>
          )}
        </div>
        <Button type="submit" size="lg" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-body font-semibold">
          Download My Report
        </Button>
      </form>
    </div>
  );
};

export default EmailCapture;
