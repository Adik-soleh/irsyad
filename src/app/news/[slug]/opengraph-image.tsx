import { ImageResponse } from "next/og";
import { getNewsEntry } from "@/data/content";

export const runtime = "edge";
export const alt = "Adi News";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getNewsEntry(slug);

  const title = entry?.title ?? "Adi News";
  const excerpt = entry?.excerpt ?? "";
  const category = entry?.category ?? "News";
  const date = entry?.date ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          fontFamily: "sans-serif",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "16px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "3px",
              color: "#818cf8",
            }}
          >
            <span>{category}</span>
            <span style={{ color: "#4b5563" }}>·</span>
            <span style={{ color: "#9ca3af" }}>{date}</span>
          </div>

          <h1
            style={{
              fontSize: title.length > 50 ? "42px" : "52px",
              fontWeight: 800,
              lineHeight: 1.2,
              margin: 0,
              background: "linear-gradient(90deg, #ffffff 0%, #c7d2fe 100%)",
              backgroundClip: "text",
              color: "transparent",
              maxWidth: "900px",
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: "22px",
              lineHeight: 1.5,
              color: "#94a3b8",
              margin: 0,
              maxWidth: "800px",
              display: "-webkit-box",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {excerpt.length > 140 ? excerpt.slice(0, 140) + "..." : excerpt}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: 800,
                color: "#ffffff",
              }}
            >
              A
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              <span style={{ fontSize: "18px", fontWeight: 700, color: "#e2e8f0" }}>
                Adik Soleh
              </span>
              <span style={{ fontSize: "14px", color: "#64748b" }}>
                adiportofolio.fun
              </span>
            </div>
          </div>

          <div
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#6366f1",
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}
          >
            ADI NEWS
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
