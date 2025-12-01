import React from "react";

interface Props { total: number; activeFilters?: string[]; }

export default function ResultsSummary({ total, activeFilters = [] }: Props) {
  return (
    <div className="flex items-center justify-between gap-4 w-full">
      <div className="flex items-center gap-3">
        <div className="text-sm text-[var(--text-primary)]">
          <span className="font-medium">{`Showing ${total} candidate application${total === 1 ? "" : "s"}`}</span>
        </div>
        <div title="Info" className="text-gray-400">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
            <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
            <path d="M12 8h.01" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11.5 12.5h1v3h-1z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 ml-2">
            {activeFilters.map((t) => (
              <span key={t} className="text-xs bg-[var(--success-green-light)] text-[var(--success-green)] px-2 py-1 rounded-sm border border-[var(--border-light)]">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
      <div />
    </div>
  );
}
