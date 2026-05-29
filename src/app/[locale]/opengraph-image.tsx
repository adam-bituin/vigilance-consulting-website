import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FFFFFF",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "9999px",
              backgroundColor: "#F1512A",
            }}
          />
          <div
            style={{
              fontSize: "26px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#0A0A0A",
              fontWeight: 600,
            }}
          >
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "76px",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: "900px",
            }}
          >
            <span style={{ color: "#0A0A0A" }}>Until the numbers move,</span>
            <span style={{ color: "#F1512A" }}>the work isn&apos;t done.</span>
          </div>
          <div style={{ fontSize: "30px", color: "#6B6B6B", maxWidth: "820px" }}>
            {site.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "8px",
            width: "160px",
            backgroundColor: "#F1512A",
            borderRadius: "9999px",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
