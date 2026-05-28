"use client";

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Props {
  data: { t: number; v: number }[];
}

export function PnLChart({ data }: Props) {
  const first = data[0].v;
  const last = data[data.length - 1].v;
  const up = last >= first;
  const color = up ? "#00D084" : "#FF4560";

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="pnlFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
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
            tickFormatter={(v) => `$${(v / 1000).toFixed(1)}K`}
            tick={{ fill: "#5B6373", fontSize: 11 }}
            axisLine={{ stroke: "rgba(255,255,255,0.04)" }}
            tickLine={false}
            width={48}
          />
          <Tooltip
            contentStyle={{
              background: "rgba(15, 18, 24, 0.96)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
              fontSize: 12,
            }}
            labelFormatter={(t) => new Date(t as number).toLocaleString()}
            formatter={(v) => [`$${(v as number).toLocaleString()}`, "Equity"]}
          />
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={2}
            fill="url(#pnlFill)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
