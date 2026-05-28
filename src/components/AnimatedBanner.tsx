const KEYWORDS = [
  "Sans gluten",
  "Sans lactose",
  "Gourmand",
  "Premium",
  "Fait maison",
  "Saveurs caribéennes",
  "Épicerie fine",
  "Cuisine saine",
  "Artisanal",
  "Caribéen",
];

const SEP = "◆";

export function AnimatedBanner() {
  const items = [...KEYWORDS, ...KEYWORDS];

  return (
    <div className="overflow-hidden border-y border-gold/15 bg-surface-1 py-3">
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((word, i) => (
          <span
            key={i}
            className="flex items-center gap-3 px-5 text-[11px] font-medium uppercase tracking-[0.2em] text-gold/60"
          >
            {word}
            <span className="text-gold/25">{SEP}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
