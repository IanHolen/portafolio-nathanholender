import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nathan Holender — Production & Operations Manager";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "radial-gradient(ellipse at 20% 12%, rgba(0,168,225,0.22), transparent 55%), linear-gradient(160deg, #0e1524 0%, #0b0f1a 60%)",
          color: "#eef3fb",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 24,
            fontWeight: 700,
            color: "#8592a8",
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid #00A8E1",
              color: "#00A8E1",
              fontSize: 26,
              fontWeight: 800,
              letterSpacing: -2,
            }}
          >
            NH
          </div>
          Portafolio
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div
            style={{
              fontSize: 132,
              lineHeight: 0.9,
              fontWeight: 800,
              letterSpacing: -6,
              textTransform: "uppercase",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ color: "#eef3fb" }}>Nathan</span>
            <span style={{ color: "#00A8E1" }}>Holender</span>
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#aeb9cc",
              marginTop: 26,
              maxWidth: 900,
              lineHeight: 1.35,
            }}
          >
            Production &amp; Operations Manager — Prime Video International —
            operaciones de producción y campañas en LatAm, Europa y Canadá.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#69768c",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <span>Ciudad de México</span>
          <span style={{ color: "#00A8E1" }}>Amazon · Prime Video</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
