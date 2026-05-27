"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { PricePoint } from "@/types";
import { formatProb } from "@/lib/utils";

interface Props {
  data: PricePoint[];
}

export function PriceChart({ data }: Props) {
  const last = data[data.length - 1].p;
  const first = data[0].p;
  const up = last >= first;
  const stroke = up ? "#00D084" : "#FF4560";

  return (
    <div className="h-[360px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 12, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={stroke} stopOpacity={0.35} />
              <stop offset="100%" stopColor={stroke} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="t"
            tickFormatter={(t) => new Date(t).toLocaleDateString(undefined, { day: "2-digit", month: "short" })}
            tick={{ fill: "#5B6373", fontSize: 11 }}
            axisLine={{ stroke: "rgba(255,255,255,0.04)" }}
            tickLine={false}
            minTickGap={48}
          />
          <YAxis
            domain={[0, 1]}
            tickFormatter={(v) => `${Math.round(v * 100)}%`}
            tick={{ fill: "#5B6373", fontSize: 11 }}
            axisLine={{ stroke: "rgba(255,255,255,0.04)" }}
            tickLine={false}
            width={40}
          />
          <Tooltip
            cursor={{ stroke: "rgba(240,242,245,0.2)", strokeDasharray: "4 4" }}
            contentStyle={{
              background: "rgba(15, 18, 24, 0.96)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              fontSize: 12,
            }}
            labelFormatter={(t) => new Date(t as number).toLocaleString()}
            formatter={(value) => [formatProb(value as number), "Probability"]}
          />
          <Area
            type="monotone"
            dataKey="p"
            stroke={stroke}
            strokeWidth={2}
            fill="url(#priceFill)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
