import { useMemo } from "react";
import type { Transaction } from "../types/transaction";

interface Props {
  transactions: Transaction[];
}

const PALETTE = [
  "#3B82F6",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#F97316",
  "#6366F1",
  "#84CC16",
];

const formatAmount = (n: number) =>
  `৳ ${n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

function ExpenseChart({ transactions }: Props) {
  const { segments, total } = useMemo(() => {
    const totals = new Map<string, number>();

    transactions
      .filter((t) => t.type === "Expense")
      .forEach((t) => {
        const key = t.category.trim() || "Uncategorized";
        totals.set(key, (totals.get(key) ?? 0) + t.amount);
      });

    const total = [...totals.values()].reduce((sum, v) => sum + v, 0);

    const segments = [...totals.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([category, amount], i) => ({
        category,
        amount,
        percent: total > 0 ? (amount / total) * 100 : 0,
        color: PALETTE[i % PALETTE.length],
      }));

    return { segments, total };
  }, [transactions]);

  if (total === 0) {
    return (
      <div className="chart-card">
        <span className="section-title">Expense Breakdown</span>
        <div className="empty-state">No expenses recorded yet.</div>
      </div>
    );
  }

  const radius = 70;
  const strokeWidth = 22;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <div className="chart-card">
      <span className="section-title">Expense Breakdown</span>

      <div className="chart-body">
        <div className="donut-wrap">
          <svg viewBox="0 0 180 180" className="donut-svg">
            <g transform="rotate(-90 90 90)">
              <circle
                cx="90"
                cy="90"
                r={radius}
                fill="none"
                stroke="var(--border)"
                strokeWidth={strokeWidth}
              />
              {segments.map((seg) => {
                const dash = (seg.percent / 100) * circumference;
                const el = (
                  <circle
                    key={seg.category}
                    cx="90"
                    cy="90"
                    r={radius}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${dash} ${circumference - dash}`}
                    strokeDashoffset={-cumulative}
                    strokeLinecap="butt"
                  />
                );
                cumulative += dash;
                return el;
              })}
            </g>
          </svg>

          <div className="donut-center">
            <span className="donut-center-label">Total Expenses</span>
            <span className="donut-center-figure">{formatAmount(total)}</span>
          </div>
        </div>

        <ul className="legend">
          {segments.map((seg) => (
            <li className="legend-item" key={seg.category}>
              <span
                className="legend-swatch"
                style={{ background: seg.color }}
                aria-hidden="true"
              />
              <span className="legend-name">{seg.category}</span>
              <span className="legend-pct">{seg.percent.toFixed(0)}%</span>
              <span className="legend-amount">{formatAmount(seg.amount)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ExpenseChart;
