import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b0f1a",
          backgroundImage:
            "radial-gradient(circle at 30% 25%, rgba(0,168,225,0.45), transparent 62%)",
          color: "#eef3fb",
          fontSize: 88,
          fontWeight: 800,
          fontFamily: "Arial, Helvetica, sans-serif",
          letterSpacing: -4,
        }}
      >
        NH
      </div>
    ),
    { ...size }
  );
}
