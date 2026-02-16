import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy para imagens externas (ex.: Cloudinary).
 * Usado quando o fetch direto falha por CORS ao gerar o PDF.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream returned ${res.status}` },
        { status: res.status }
      );
    }
    const buffer = await res.arrayBuffer();
    const contentType = res.headers.get("content-type") ?? "image/png";
    return new NextResponse(buffer, {
      headers: { "Content-Type": contentType },
    });
  } catch (e) {
    console.error("proxy-image error:", e);
    return NextResponse.json(
      { error: "Failed to fetch image" },
      { status: 502 }
    );
  }
}
