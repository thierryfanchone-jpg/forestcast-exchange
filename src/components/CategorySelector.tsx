"use client";

import { Category, CATEGORY_LABELS, CATEGORY_ICONS } from "@/types";
import { cn } from "@/lib/utils";

interface CategorySelectorProps {
  value: Category;
  onChange: (value: Category) => void;
  label?: string;
}

const CATEGORIES: Category[] = [
  "electricite",
  "plomberie",
  "climatisation",
  "electromenager",
  "serrurerie",
  "general",
];

export default function CategorySelector({
  value,
  onChange,
  label = "Catégorie",
}: CategorySelectorProps) {
  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onChange(cat)}
            className={cn(
              "flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-sm font-medium transition-all",
              value === cat
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50"
            )}
          >
            <span className="text-lg">{CATEGORY_ICONS[cat]}</span>
            <span className="text-left leading-tight">{CATEGORY_LABELS[cat]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
