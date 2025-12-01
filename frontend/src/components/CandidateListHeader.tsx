import React from "react";

export default function CandidateListHeader() {
  return (
    <div className="hidden lg:grid grid-cols-[60%_40%] items-center px-[15px] py-3 text-sm text-[var(--text-secondary)] border-b border-[var(--border-light)]" role="row" aria-hidden>
      <div className="font-medium">Name</div>
      <div className="font-medium text-right">Job / Status</div>
    </div>
  );
}
