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
          backgroundColor: "#18180f",
          backgroundImage:
            "radial-gradient(circle at 30% 25%, rgba(156,61,46,0.40), transparent 62%)",
          color: "#f3f1ea",
          fontSize: 92,
          fontWeight: 500,
          fontFamily: "Georgia, 'Times New Roman', serif",
          letterSpacing: -3,
        }}
      >
        NH
      </div>
    ),
    { ...size }
  );
}
