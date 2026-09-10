import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import { join } from "path";

export async function GET() {
  try {
    const filePath = join(process.cwd(), "src", "utils", "pdf", "irsyad_portfolio.pdf");
    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=Irsyad-Rafly-Wahyudi-Portfolio.pdf",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Failed to read CV file", error);
    return new NextResponse("File not found", { status: 404 });
  }
}
