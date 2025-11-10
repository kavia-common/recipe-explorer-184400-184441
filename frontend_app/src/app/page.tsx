"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchRecipes } from "@/lib/data";
import { Recipe, RecipeListResponse } from "@/lib/types";
import Link from "next/link";
import { cx } from "@/lib/theme";
import Image from "next/image";

function SearchBar({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <form
      role="search"
      aria-label="Recipe search"
      className="relative"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search recipes, ingredients..."
        className="w-full rounded-lg border border-black/10 bg-white/90 px-4 py-2 pr-10 shadow-sm focus-ring"
        aria-label="Search recipes"
      />
      <button
        type="submit"
        className="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 rounded-md text-white"
        style={{ backgroundColor: "var(--color-primary)" }}
        aria-label="Submit search"
      >
        Search
      </button>
    </form>
  );
}

function CategoryFilter({
  categories,
  value,
  onChange,
}: {
  categories: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {categories.map((c) => {
        const active = value === c;
        return (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={cx(
              "px-3 py-1 text-sm rounded-full border transition-colors focus-ring",
              active
                ? "text-white border-transparent"
                : "text-gray-700 border-black/10 bg-white/80 hover:bg-white",
            )}
            style={{
              backgroundColor: active ? "var(--color-primary)" : undefined,
            }}
            aria-pressed={active}
            aria-label={`Filter by ${c}`}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="card overflow-hidden">
      <div className="h-40 skeleton" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-2/3 skeleton" />
        <div className="h-3 w-1/2 skeleton" />
        <div className="h-3 w-3/4 skeleton" />
      </div>
    </div>
  );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/recipe/${encodeURIComponent(recipe.id)}`}
      className="block card overflow-hidden focus-ring"
      aria-label={`Open ${recipe.title}`}
    >
      <div className="relative">
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={640}
          height={300}
          className="h-40 w-full object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
        />
        <span className="badge absolute left-3 top-3 bg-white/80 backdrop-blur">
          {recipe.category}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-gray-900">{recipe.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
          {recipe.description}
        </p>
        <div className="mt-3 flex items-center gap-3 text-xs text-gray-600">
          <span>⏱ {recipe.durationMinutes}m</span>
          <span>🍽 {recipe.servings} servings</span>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<RecipeListResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const categories = useMemo(
    () => data?.categories ?? ["All"],
    [data?.categories],
  );

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchRecipes({
        q: q || undefined,
        category: category && category !== "All" ? category : undefined,
        page: 1,
        pageSize: 12,
      });
      setData(res);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Initial load
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Reload on category change
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] lg:gap-6">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Discover Recipes
          </h1>
          <p className="text-gray-600">
            Browse, search, and filter to find your next favorite dish.
          </p>
          <SearchBar value={q} onChange={setQ} onSubmit={load} />
          <div className="lg:hidden">
            <div className="card p-4">
              <h2 className="text-sm font-semibold text-gray-700 mb-2">
                Categories
              </h2>
              <CategoryFilter
                categories={categories}
                value={category}
                onChange={setCategory}
              />
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <div className="card p-4 sticky top-24">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">
              Categories
            </h2>
            <CategoryFilter
              categories={categories}
              value={category}
              onChange={setCategory}
            />
          </div>
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="card border-red-200 bg-red-50 text-red-800 p-4"
        >
          <p className="font-medium">Something went wrong</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {loading ? (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          aria-busy="true"
          aria-live="polite"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          role="list"
          aria-label="Recipe results"
        >
          {data?.items.map((r: Recipe) => (
            <div role="listitem" key={r.id}>
              <RecipeCard recipe={r} />
            </div>
          ))}
          {data && data.items.length === 0 && (
            <div className="card p-6">
              <p className="text-gray-700">
                No recipes found. Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
