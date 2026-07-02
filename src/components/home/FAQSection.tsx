"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {FAQ_ITEMS.map((item, index) => (
        <div key={index} className="card-orion overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="flex w-full items-center justify-between gap-4 text-left"
          >
            <span className="font-medium text-white">{item.question}</span>
            <ChevronDown
              size={18}
              className={cn(
                "shrink-0 text-gold transition-transform duration-200",
                openIndex === index && "rotate-180"
              )}
            />
          </button>
          {openIndex === index && (
            <div className="mt-4 border-t border-navy-border pt-4 text-sm leading-relaxed text-slate-400">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
