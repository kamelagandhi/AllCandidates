// src/components/CandidateCard.tsx

import type { Candidate } from "../types/candidate";

interface InterviewStage {
  id: string | number;
  name: string;
  scheduled?: boolean;
  mode?: "manual" | "automated";
}

interface Props {
  candidate: Candidate;
  onActionClick?: (candidate: Candidate, action: string) => void;
}

const timeOf = (s?: string | number): number => {
  if (!s) return 0;
  const t = Date.parse(String(s));
  return Number.isNaN(t) ? 0 : t;
};

export default function CandidateCard({ candidate, onActionClick }: Props) {
  const name = candidate.name ?? "Unnamed";
  const positionCompany = candidate.position ? candidate.position + (candidate.company ? ` • ${candidate.company}` : "") : candidate.company ?? "";
  const jobTitle = candidate.job_title ?? "";
  const status = candidate.status ?? "";
  const interviews: InterviewStage[] = Array.isArray((candidate as any).interviews) ? (candidate as any).interviews : [];

  return (
    <article className="bg-[var(--bg-white)] border border-[var(--bg-gray-200)] px-[15px] py-[20px] flex flex-col gap-3 hover:shadow-md transition-shadow duration-150">
      {/* Header */}
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <a
            href={candidate.action_link ?? "#"}
            className="text-[20px] font-normal text-[var(--primary-blue)] hover:underline truncate"
            onClick={(e) => {
              if (onActionClick) {
                e.preventDefault();
                onActionClick(candidate, "open-profile");
              }
            }}
          >
            {name}
          </a>

          <div className="text-[16px] text-[var(--text-secondary)] mt-1">{positionCompany}</div>
          {jobTitle && <div className="text-[14px] text-[var(--text-primary)] mt-1">{jobTitle}</div>}
        </div>

        <div className="flex flex-col items-end gap-2">
          <span
            className="inline-block px-3 py-1 text-[13px] rounded-sm font-normal"
            style={{
              background:
                status === "Active" ? "var(--success-green)" : status === "Rejected" ? "var(--danger-red)" : "var(--bg-gray-50)",
              color: status === "Active" || status === "Rejected" ? "#fff" : "var(--text-secondary)",
            }}
            aria-label={`Status: ${status}`}
          >
            {status || "—"}
          </span>

          <button
            type="button"
            onClick={() => onActionClick?.(candidate, "collect-feedback")}
            className="text-[14px] text-[var(--primary-blue)] hover:underline focus:outline-none"
            aria-label={`Collect feedback for ${name}`}
          >
            Collect Feedback
          </button>
        </div>
      </header>

      {/* Metadata row */}
      <div className="flex items-center justify-between text-sm text-[var(--text-tertiary)]">
        <div className="flex items-center gap-4">
          {candidate.location && <div className="truncate">{candidate.location}</div>}
          {candidate.experience && <div className="truncate">{candidate.experience}</div>}
        </div>

        <div className="text-xs text-[var(--text-tertiary)]">
          Last activity: {candidate.last_activity ? new Date(String(candidate.last_activity)).toLocaleDateString() : "—"}
        </div>
      </div>

      {/* Availability */}
      <div className="flex items-center justify-between gap-3 border-t pt-3">
        <div className="flex items-center gap-3">
          <div className="text-sm font-medium">Availability</div>
          <span className="inline-block px-3 py-1 text-[13px] rounded-sm bg-[var(--bg-gray-50)] text-[var(--text-secondary)]">
            {(candidate as any).availability?.status ?? "Not Requested"}
          </span>

          <button
            type="button"
            onClick={() => onActionClick?.(candidate, "request-availability")}
            className="text-sm text-[var(--primary-blue)] hover:underline"
          >
            Request Availability
          </button>
        </div>

        <div className="text-sm text-[var(--text-secondary)]">
          {interviews.length > 0 ? `${interviews.length} interview${interviews.length === 1 ? "" : "s"}` : "No interviews"}
        </div>
      </div>

      {/* Interviews */}
      {interviews.length > 0 && (
        <div>
          <div className="text-sm font-semibold text-[var(--text-primary)] mb-2">Interviews</div>
          <div className="space-y-2">
            {interviews.map((st) => (
              <div key={st.id} className="flex items-center justify-between gap-3 border rounded-sm p-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-[var(--text-primary)] truncate">{st.name}</div>
                  <div className="text-xs text-[var(--text-secondary)] mt-1 flex items-center gap-3">
                    <span>{st.scheduled ? "Scheduled" : "Not scheduled"}</span>
                    <span>|</span>
                    <span>{st.mode === "automated" ? "Automated scheduling" : "Schedule manually"}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => onActionClick?.(candidate, `schedule-manual-${st.id}`)} className="text-xs text-[var(--primary-blue)] hover:underline">
                    Schedule manually
                  </button>

                  <button type="button" onClick={() => onActionClick?.(candidate, `schedule-auto-${st.id}`)} className="text-xs text-[var(--text-secondary)] hover:underline">
                    Automated scheduling
                  </button>

                  <button type="button" className="p-1 rounded hover:bg-[var(--bg-gray-50)]" aria-label="More actions">
                    <svg className="w-5 h-5 text-[var(--text-secondary)]" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
