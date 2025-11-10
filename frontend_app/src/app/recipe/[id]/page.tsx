"use client";

import { useEffect, useState } from "react";
import { fetchRecipeById } from "@/lib/data";
import { Recipe } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const r = await fetchRecipeById(id);
        if (active) setRecipe(r);
      } catch (e) {
        setErr(e instanceof Error ? e.message : "Failed to load");
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <section className="space-y-6">
        <div className="h-56 skeleton" />
        <div className="card p-6 space-y-3">
          <div className="h-6 w-1/2 skeleton" />
          <div className="h-4 w-1/3 skeleton" />
          <div className="h-4 w-2/3 skeleton" />
        </div>
      </section>
    );
  }

  if (err || !recipe) {
    return (
      <section className="space-y-4">
        <div className="card p-6 bg-red-50 border-red-200 text-red-800">
          <h1 className="text-lg font-semibold">Unable to load recipe</h1>
          <p className="text-sm">{err ?? "Unknown error"}</p>
        </div>
        <Link
          href="/"
          className="inline-block px-4 py-2 rounded-md text-white"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          Back to list
        </Link>
      </section>
    );
  }

  return (
    <article className="space-y-6">
      <div className="card overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={1200}
          height={400}
          className="w-full h-56 object-cover"
          priority={false}
          sizes="100vw"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div className="space-y-4">
          <header>
            <h1 className="text-2xl font-semibold text-gray-900">
              {recipe.title}
            </h1>
            <p className="text-gray-600 mt-1">{recipe.description}</p>
          </header>

          <section aria-labelledby="ingredients-heading" className="card p-5">
            <h2 id="ingredients-heading" className="text-lg font-semibold mb-3">
              Ingredients
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {recipe.ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="instructions-heading" className="card p-5">
            <h2 id="instructions-heading" className="text-lg font-semibold mb-3">
              Instructions
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              {recipe.steps.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ol>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="card p-5">
            <h3 className="text-base font-semibold">At a glance</h3>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-700">
              <div className="card p-3">
                <div className="text-xs text-gray-500">Duration</div>
                <div className="font-medium">{recipe.durationMinutes} mins</div>
              </div>
              <div className="card p-3">
                <div className="text-xs text-gray-500">Servings</div>
                <div className="font-medium">{recipe.servings}</div>
              </div>
              <div className="card p-3 col-span-2">
                <div className="text-xs text-gray-500">Category</div>
                <div className="font-medium">{recipe.category}</div>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center justify-center w-full px-4 py-2 rounded-md text-white transition-colors"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            ← Back to recipes
          </Link>
        </aside>
      </div>
    </article>
  );
}
