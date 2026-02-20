// app/opengraph-image.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #0B2545, #13315C)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        fontFamily: "Inter",
        color: "white",
        position: "relative",
      }}
    >
      {/* Gold accent shape */}
      <div
        style={{
          position: "absolute",
          right: 120,
          bottom: 80,
          width: 220,
          height: 220,
          background: "#F4C430",
          borderRadius: "40px",
          transform: "rotate(20deg)",
          opacity: 0.15,
        }}
      />

      {/* Logo / Brand */}
      <div style={{ fontSize: 72, fontWeight: 800 }}>
        <span style={{ color: "#F4C430" }}>Ax</span>ign
      </div>

      {/* Tagline */}
      <div
        style={{
          marginTop: 40,
          fontSize: 48,
          fontWeight: 600,
          lineHeight: 1.2,
          maxWidth: 900,
        }}
      >
        Assign. Track. Drive Performance.
      </div>

      {/* Supporting text */}
      <div
        style={{
          marginTop: 24,
          fontSize: 30,
          opacity: 0.85,
        }}
      >
        Role-based dashboards for modern organizations.
      </div>
    </div>,
    {
      ...size,
    },
  );
}
