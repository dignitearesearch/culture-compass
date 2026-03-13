import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import VisualReport from "./VisualReport";

interface EmailCaptureProps {
  scaleValues: Record<string, number | null>;
  scenarioResponses: Record<string, string[]>;
}

const EmailCapture = ({ scaleValues, scenarioResponses }: EmailCaptureProps) => {
  const [generating, setGenerating] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    setGenerating(true);
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
      // silent
    }
    setGenerating(false);
  };

  return (
    <div className="animate-fade-in" style={{ opacity: 0 }}>
      <div className="text-center mb-8">
        <h2 className="font-display text-3xl font-bold text-foreground mb-3">
          Your Culture Map Report
        </h2>
        <p className="text-muted-foreground font-body max-w-md mx-auto mb-6">
          Here's your personal culture profile. Download a copy to keep.
        </p>
        <Button
          onClick={handleDownload}
          disabled={generating}
          size="lg"
          className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-body font-semibold px-10"
        >
          {generating ? "Generating..." : "Download Report as PNG"}
        </Button>
      </div>

      {/* Visible report */}
      <div className="flex justify-center">
        <div className="rounded-lg overflow-hidden shadow-lg border border-border">
          <VisualReport
            ref={reportRef}
            email=""
            scaleValues={scaleValues}
            scenarioResponses={scenarioResponses}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailCapture;
