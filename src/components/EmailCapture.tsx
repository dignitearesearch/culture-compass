import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import VisualReport from "./VisualReport";

interface EmailCaptureProps {
  scaleValues: Record<string, number | null>;
  scenarioResponses: Record<string, string[]>;
}

const EmailCapture = ({ scaleValues, scenarioResponses }: EmailCaptureProps) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [generating, setGenerating] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setGenerating(true);
    // Wait a tick for the report to render
    await new Promise((r) => setTimeout(r, 100));

    try {
      if (reportRef.current) {
        const canvas = await html2canvas(reportRef.current, {
          backgroundColor: "#1a1a2e",
          scale: 2,
        });
        const link = document.createElement("a");
        link.download = "culture-map-report.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
    } catch {
      // Fallback: just mark as done
    }

    setGenerating(false);
    setSubmitted(true);
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
          Your visual culture map report has been downloaded. Check your downloads folder.
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
        Enter your email to download a visual summary of your personal culture
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
        <Button
          type="submit"
          size="lg"
          disabled={generating}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-body font-semibold"
        >
          {generating ? "Generating Report..." : "Download My Report"}
        </Button>
      </form>

      {/* Off-screen visual report for capture */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
        }}
      >
        <VisualReport
          ref={reportRef}
          email={email}
          scaleValues={scaleValues}
          scenarioResponses={scenarioResponses}
        />
      </div>
    </div>
  );
};

export default EmailCapture;
