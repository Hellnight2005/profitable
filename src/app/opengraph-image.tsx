/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import fs from "fs/promises";
import path from "path";

// Route segment config
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Image metadata
export const alt = "Abhijeet Shinde | Web Developer in Mumbai";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  // Read the image file from public or app directory
  let base64Image = "";
  try {
    const candidates = [
      path.join(process.cwd(), "public", "brgrounf_less.png"),
      path.join(process.cwd(), "src", "app", "icon.jpg"),
      path.join(process.cwd(), "public", "icon.png"),
    ];

    for (const filePath of candidates) {
      try {
        const fileBuffer = await fs.readFile(filePath);
        const mime = filePath.endsWith(".jpg") || filePath.endsWith(".jpeg") ? "image/jpeg" : "image/png";
        base64Image = `data:${mime};base64,${fileBuffer.toString("base64")}`;
        break;
      } catch {
        // try next
      }
    }
  } catch (error) {
    console.error("Error reading OG image file:", error);
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #dbeafe 0%, #ffedd5 100%)",
          padding: "80px",
        }}
      >
        {/* Left Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "60%",
            height: "100%",
          }}
        >
          {/* Logo / Brand Name */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <span
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#1e3a8a",
                letterSpacing: "0.05em",
              }}
            >
              ABHIJEET SHINDE
            </span>
          </div>

          {/* Subtitle / Tagline */}
          <div
            style={{
              fontSize: "24px",
              color: "#3b82f6",
              marginBottom: "15px",
              fontWeight: 500,
            }}
          >
            Web Developer & Systems Engineer
          </div>

          {/* Heading */}
          <div
            style={{
              fontSize: "48px",
              fontWeight: 800,
              color: "#1e3a8a",
              lineHeight: 1.2,
              marginBottom: "15px",
            }}
          >
            Scalable Backend, DevOps, & Full-Stack Systems
          </div>

          {/* Location/Context */}
          <div
            style={{
              fontSize: "18px",
              color: "#4b5563",
              fontWeight: 500,
            }}
          >
            Portfolio & Technical Blog • Mumbai, India
          </div>
        </div>

        {/* Right Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40%",
            height: "100%",
          }}
        >
          {base64Image && (
            <img
              src={base64Image}
              alt="Abhijeet Shinde"
              style={{
                width: "400px",
                height: "400px",
                objectFit: "contain",
              }}
            />
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
