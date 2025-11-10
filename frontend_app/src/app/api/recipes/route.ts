import { NextRequest, NextResponse } from "next/server";
import { buildListResponse, filterRecipes } from "@/lib/mockData";

// PUBLIC_INTERFACE
export async function GET(req: NextRequest) {
  /** List recipes from mock data. Supports q, category, page, pageSize query params. */
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? undefined;
  const category = searchParams.get("category") ?? undefined;
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const pageSize = Math.min(
    50,
    Math.max(1, parseInt(searchParams.get("pageSize") || "12", 10)),
  );

  const filtered = filterRecipes({ q, category });
  const body = buildListResponse(filtered, page, pageSize);
  return NextResponse.json(body, { status: 200 });
}
