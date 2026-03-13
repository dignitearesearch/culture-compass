import { forwardRef } from "react";
import { cultureScales } from "@/data/cultureScales";

interface VisualReportProps {
  email: string;
  scaleValues: Record<string, number | null>;
  scenarioResponses: Record<string, string[]>;
}

const VisualReport = forwardRef<HTMLDivElement, VisualReportProps>(
  ({ email, scaleValues, scenarioResponses }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          width: "800px",
          padding: "48px 60px",
          backgroundColor: "#1a1a2e",
          color: "#e8e0d4",
          fontFamily: "'Source Sans 3', sans-serif",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 32,
              fontWeight: 700,
              color: "#e8e0d4",
              marginBottom: 8,
            }}
          >
            Your Culture Map
          </h1>
          <p style={{ fontSize: 13, color: "#9a938a", marginBottom: 4 }}>
            Personal Profile Report
          </p>
          <p style={{ fontSize: 12, color: "#9a938a" }}>
            {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Scales */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {cultureScales.map((scale) => {
            const val = scaleValues[scale.id];
            return (
              <div key={scale.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#e8e0d4",
                    }}
                  >
                    {scale.name}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 11,
                    color: "#9a938a",
                    marginBottom: 4,
                  }}
                >
                  <span>{scale.leftLabel}</span>
                  <span>{scale.rightLabel}</span>
                </div>
                <div
                  style={{
                    position: "relative",
                    height: 28,
                    backgroundColor: "#2a2a42",
                    borderRadius: 6,
                    overflow: "hidden",
                  }}
                >
                  {/* Country markers */}
                  {scale.countries.map((c) => (
                    <div
                      key={c.country}
                      style={{
                        position: "absolute",
                        left: `${c.position}%`,
                        top: 0,
                        bottom: 0,
                        width: 1,
                        backgroundColor: "rgba(232,224,212,0.12)",
                      }}
                      title={c.country}
                    />
                  ))}
                  {/* User marker */}
                  {val !== null && val !== undefined && (
                    <div
                      style={{
                        position: "absolute",
                        left: `${val}%`,
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        backgroundColor: "#c8a45e",
                        border: "3px solid #1a1a2e",
                        boxShadow: "0 0 8px rgba(200,164,94,0.4)",
                      }}
                    />
                  )}
                </div>
                {/* Country labels below bar */}
                <div
                  style={{
                    position: "relative",
                    height: 18,
                    marginTop: 4,
                  }}
                >
                  {scale.countries.map((c) => (
                    <span
                      key={c.country}
                      style={{
                        position: "absolute",
                        left: `${c.position}%`,
                        transform: "translateX(-50%)",
                        fontSize: 10,
                        color: "#6b6560",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {c.country}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Scenario Reflections */}
        {Object.keys(scenarioResponses).some((key) =>
          scenarioResponses[key]?.some((a) => a?.trim())
        ) && (
          <div style={{ marginTop: 36 }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 18,
                fontWeight: 600,
                color: "#e8e0d4",
                marginBottom: 16,
                borderTop: "1px solid #2a2a42",
                paddingTop: 20,
              }}
            >
              Scenario Reflections
            </h2>
            {cultureScales.map((scale) => {
              const answers = scenarioResponses[scale.id];
              if (!answers || !answers.some((a) => a?.trim())) return null;
              return (
                <div key={scale.id} style={{ marginBottom: 16 }}>
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#c8a45e",
                      marginBottom: 6,
                    }}
                  >
                    {scale.name}
                  </p>
                  {scale.scenarioQuestions.map((q, i) => {
                    if (!answers[i]?.trim()) return null;
                    return (
                      <div key={i} style={{ marginBottom: 8, paddingLeft: 12 }}>
                        <p style={{ fontSize: 13, color: "#9a938a", marginBottom: 2 }}>
                          {q}
                        </p>
                        <p style={{ fontSize: 14, color: "#e8e0d4" }}>
                          {answers[i]}
                        </p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            marginTop: 32,
            paddingTop: 16,
            borderTop: "1px solid #2a2a42",
            textAlign: "center",
            fontSize: 10,
            color: "#6b6560",
          }}
        >
          Based on <em>The Culture Map</em> by Erin Meyer · For educational
          purposes
        </div>
      </div>
    );
  }
);

VisualReport.displayName = "VisualReport";

export default VisualReport;
