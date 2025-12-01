import React from "react";

interface Props {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: Props) {
  const pages = Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1);
  return (
    <nav className="flex items-center gap-2" aria-label="Pagination">
      <button type="button" onClick={() => onPageChange(Math.max(1, page - 1))} disabled={page <= 1} className={`px-3 py-1 rounded border ${page <= 1 ? "opacity-50 cursor-not-allowed" : "hover:shadow-sm"}`}>
        ←
      </button>

      <div className="flex items-center gap-2">
        {pages.map((p) => {
          const isCurrent = p === page;
          return (
            <button key={p} type="button" onClick={() => onPageChange(p)} aria-current={isCurrent ? "page" : undefined} className={`w-[41px] h-[35px] flex items-center justify-center text-base rounded-sm border ${isCurrent ? "bg-[var(--bg-gray-100)] border-[var(--border-gray)]" : "bg-white border-transparent hover:border-[var(--border-gray)]"}`}>
              {p}
            </button>
          );
        })}
      </div>

      <button type="button" onClick={() => onPageChange(Math.min(totalPages, page + 1))} disabled={page >= totalPages} className={`px-3 py-1 rounded border ${page >= totalPages ? "opacity-50 cursor-not-allowed" : "hover:shadow-sm"}`}>
        →
      </button>
    </nav>
  );
}
