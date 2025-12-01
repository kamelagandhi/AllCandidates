// src/components/Sidebar.tsx
import React, { useState } from "react";
import { SearchInput } from "./SearchInput";
import CollapsibleSection from "./CollapsibleSection";

interface SidebarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  jobs?: string[];
  selectedJobs?: string[];
  onToggleJob?: (job: string) => void;
}


/**
 * Sidebar (named export)
 *
 * - Visual-only filter sections (collapsible)
 * - Uses SearchInput (named export) which should accept `value` and `onChange`
 * - Props are required so parent page can control search state
 */
export const Sidebar: React.FC<SidebarProps> = ({ searchValue, onSearchChange, jobs = [], selectedJobs = [], onToggleJob = () => {} }) => {
  const [fullTextSearch, setFullTextSearch] = useState<boolean>(false);

  return (
    <aside className="w-[248px] bg-[#f7f8f7] min-h-screen px-6 pt-4 pb-6">
      {/* Search Input */}
      <div className="mb-3">
        <SearchInput placeholder="Search candidates, roles or location" value={searchValue} onChange={onSearchChange} />
      </div>

      {/* Full Text Search Toggle */}
      <div className="mt-2 mb-3">
        <div className="flex items-center gap-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="fullTextSearch"
              checked={fullTextSearch}
              onChange={(e) => setFullTextSearch(e.target.checked)}
              className="sr-only peer"
            />
            {/* track */}
            <div className="relative">
              <div className="w-[50px] h-[25px] bg-[#ccd4d1] rounded-full peer-checked:bg-[#047957] transition-colors duration-200 ease-in-out" />
              {/* knob */}
              <div
                className={`absolute top-0 left-0 w-[25px] h-[25px] bg-white border-[3px] rounded-full transition-transform duration-200 ease-in-out ${
                  fullTextSearch ? "translate-x-[25px] border-[#047957]" : "translate-x-0 border-[#ccd4d1]"
                }`}
              />
            </div>
          </label>

          <label htmlFor="fullTextSearch" className="text-[13px] font-medium text-[#15372c] cursor-pointer leading-[19.5px]">
            Full Text Search
          </label>
        </div>
        <p className="text-[11.6px] text-[#909090] font-light leading-[12px] mt-1">(Includes resumes and notes)</p>
      </div>

      {/* Sort Dropdown (visual only) */}
      <div className="mt-4">
        <div
          role="button"
          aria-label="Sort options (visual only)"
          className="w-full h-[36px] px-3 flex items-center justify-between border border-[#e1e1e1] bg-white rounded text-[14px] text-[#333333] cursor-default select-none"
        >
          <span className="truncate">Last Activity (new to old)</span>
          <svg className="w-3.5 h-3.5 text-[#909090] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Collapsible visual-only filter sections */}
      <div className="mt-6">
        <CollapsibleSection title="Application Type" defaultOpen>
          {/* intentionally empty for core requirements */}
        </CollapsibleSection>

        <CollapsibleSection title="Jobs">
  <div className="space-y-2">
    {jobs && jobs.length ? (
      jobs.map((job) => {
        const selected = selectedJobs.includes(job);
        return (
          <label key={job} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selected}
              onChange={() => onToggleJob(job)}
              className="w-4 h-4"
            />
            <span className={`truncate ${selected ? "font-medium" : ""}`}>{job}</span>
          </label>
        );
      })
    ) : (
      <div className="text-xs text-[var(--text-tertiary)]">No jobs</div>
    )}
  </div>
</CollapsibleSection>


        <CollapsibleSection title="CRM">
          {/* intentionally empty */}
        </CollapsibleSection>

        <CollapsibleSection title="Profile Details">
          {/* intentionally empty */}
        </CollapsibleSection>

        <CollapsibleSection title="Source">
          {/* intentionally empty */}
        </CollapsibleSection>

        <CollapsibleSection title="Responsibility">
          {/* intentionally empty */}
        </CollapsibleSection>

        <CollapsibleSection title="Pipeline Tasks">
          {/* intentionally empty */}
        </CollapsibleSection>

        <CollapsibleSection title="Education">
          {/* intentionally empty */}
        </CollapsibleSection>
      </div>

      {/* Reset Filters Button */}
      <button
        type="button"
        onClick={() => {
          // visual-only reset: call onSearchChange to clear search; you can expand this as needed
          onSearchChange("");
        }}
        className="mt-6 w-full px-4 py-2 text-[#3574d6] text-[13.9px] font-light flex items-center justify-center gap-2 hover:underline"
        aria-label="Reset filters"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span>Reset Filters</span>
      </button>
    </aside>
  );
};

export default Sidebar;
