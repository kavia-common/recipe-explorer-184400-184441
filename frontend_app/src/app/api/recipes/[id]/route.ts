import { NextRequest, NextResponse } from "next/server";
import { MOCK_RECIPES } from "@/lib/mockData";

// PUBLIC_INTERFACE
export async function GET(
  _req: NextRequest,
  { params }: { readonly params: { readonly id: string } }
) {
  /** Get recipe by id from mock data. */
  const id = params.id;
  const recipe = MOCK_RECIPES.find((r) => r.id === id);
  if (!recipe) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }
  return NextResponse.json(recipe, { status: 200 });
}
