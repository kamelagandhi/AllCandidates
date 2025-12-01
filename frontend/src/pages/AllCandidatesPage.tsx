// src/pages/AllCandidatesPage.tsx
import { useEffect, useMemo, useState } from "react";
import type { Candidate } from "../types/candidate";
import { getLocalCandidates } from "../services/api"; // your local loader
import CandidateCard from "../components/CandidateCard";
import { Sidebar } from "../components/Sidebar";
import { SearchInput } from "../components/SearchInput";
import ResultsSummary from "../components/ResultsSummary";
import ActionBar from "../components/ActionBar";
import Pagination from "../components/Pagination";
import CandidateListHeader from "../components/CandidateListHeader";


const PAGE_SIZE = 5;

export default function AllCandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // UI state
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<"activity_desc" | "activity_asc" | "name_asc" | "name_desc">("activity_desc");
  const [page, setPage] = useState<number>(1);
  const [jobs, setJobs] = useState<string[]>([]);                // unique job titles for UI
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  useEffect(() => {
  // derive distinct job titles from loaded candidates once data is fetched
  if (candidates && candidates.length) {
    const uniq = Array.from(new Set(candidates.map(c => (c.job_title ?? c.position ?? "").trim()).filter(Boolean)));
    setJobs(uniq);
  }
  }, [candidates]);

  const toggleJob = (job: string) => {
    setSelectedJobs(prev => (prev.includes(job) ? prev.filter(j => j !== job) : [...prev, job]));
    setPage(1); // reset page on filter change
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const data = await getLocalCandidates();
        setCandidates(data);
      } catch (err) {
        // API errors are logged to console and optional error UI is set
        console.error("Failed to load candidates", err);
        setErrorMsg("Failed to load candidates");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Apply search & sort (client-side)
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let out = candidates.slice();

    if (q) {
      out = out.filter((c) => {
        const fields = [
          c.name ?? "",
          c.position ?? "",
          c.company ?? "",
          c.job_title ?? "",
          (c as any).location ?? "",
        ];
        return fields.some((f) => (f ?? "").toLowerCase().includes(q));
      });
    }

    // Sorting
    const timeOf = (s?: string | number): number => {
  // If s is falsy or invalid, return 0 so it sorts as oldest
  if (!s) return 0;
  const t = Date.parse(String(s));
  return Number.isNaN(t) ? 0 : t;
};

if (sort === "activity_asc") {
  out.sort((a, b) => timeOf(a.last_activity) - timeOf(b.last_activity));
} else {
  // activity_desc (default)
  out.sort((a, b) => timeOf(b.last_activity) - timeOf(a.last_activity));
}


    if (selectedJobs.length > 0) {
  out = out.filter(c => {
    const jt = (c.job_title ?? c.position ?? "").toString();
    return selectedJobs.includes(jt);
  });
}

    return out;
  }, [candidates, search, sort]);

  // Pagination calculations (client-side)
  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // If page > totalPages (out of bounds) keep pagination visible but empty list
  useEffect(() => {
    if (page > totalPages) {
      // Keep page but you could clamp to last page if preferred:
      // setPage(totalPages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  const visible = useMemo(() => {
    // If page out of range, this may be []
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return filtered.slice(start, end);
  }, [filtered, page]);

  return (
    <div className="min-h-screen bg-[var(--bg-gray-50)]">
      <div className="flex">
        <aside className="w-[var(--sidebar-width)] border-r border-[var(--border-light)] bg-[var(--bg-white)]">
          <Sidebar
          searchValue={search}
          onSearchChange={(v) => { setSearch(v); setPage(1); }}
          jobs={jobs}
          selectedJobs={selectedJobs}
          onToggleJob={toggleJob}
        />
        </aside>

        <main className="flex-1 p-[var(--content-padding)]">
          {/* Top row: summary + actions */}
          <div className="mb-4 flex items-center justify-between gap-4">
            <ResultsSummary total={total} />
            <ActionBar />
          </div>

          {/* Controls row: search + sort */}
          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="max-w-md w-full">
              <SearchInput placeholder="Search candidates, roles or location" value={search} onChange={(v) => { setSearch(v); setPage(1); }} />
            </div>

            <CandidateListHeader />

            <div>
              <select
                aria-label="Sort candidates"
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="h-9 px-3 border border-[var(--border-gray)] rounded-sm text-sm"
              >
                <option value="activity_desc">Last activity (new → old)</option>
                <option value="activity_asc">Last activity (old → new)</option>
                <option value="name_asc">Name (A → Z)</option>
                <option value="name_desc">Name (Z → A)</option>
              </select>
            </div>
          </div>

          {/* Loading / error */}
          {loading && <div className="py-8 text-center text-[var(--text-secondary)]">Loading candidates…</div>}
          {errorMsg && <div role="alert" className="py-4 text-center text-red-600">{errorMsg}</div>}

          {/* Candidate list or empty state */}
          <div role="list" className="space-y-3 mt-2">
      {visible.length > 0 ? visible.map(c => <CandidateCard key={c.id} candidate={c} />) : (
        <div className="p-6 text-center text-[var(--text-secondary)]">
          {filtered.length === 0 ? "No candidates found." : "No items on this page."}
        </div>
      )}
    </div>

          {/* Pagination controls (always visible even if empty page) */}
          <div className="mt-6 flex items-center justify-end">
            <Pagination page={page} totalPages={totalPages} onPageChange={(p)=>setPage(p)} />
          </div>
        </main>
      </div>
    </div>
  );
}
