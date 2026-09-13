import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#050505",
          borderTop: "8px solid #26db12",
          color: "#f8fafc",
          fontFamily: "sans-serif"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 26,
            color: "#94a3b8"
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 10,
              border: "2px solid rgba(38, 219, 18, 0.55)",
              color: "#ffffff",
              fontSize: 26,
              fontWeight: 700
            }}
          >
            VK
          </div>
          Backend systems, APIs, auth, and distributed architecture
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: "-0.03em" }}>
            {siteConfig.name}
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 40,
              lineHeight: 1.25,
              color: "#26db12",
              maxWidth: 980
            }}
          >
            {siteConfig.tagline}
          </div>
        </div>
        <div style={{ display: "flex", gap: "28px", fontSize: 24, color: "#94a3b8" }}>
          <span>Node.js</span>
          <span>Kafka</span>
          <span>gRPC</span>
          <span>Docker</span>
          <span>PostgreSQL</span>
        </div>
      </div>
    ),
    size
  );
}
