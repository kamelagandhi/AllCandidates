import React from "react";
import Button from "./ui/Button";

export default function ActionBar() {
  return (
    <div className="flex items-center gap-3">
      <Button variant="secondary" size="md" aria-label="Generate report">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
          <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
        </svg>
        Generate Report
      </Button>

      <Button variant="primary" size="md" aria-label="Add candidate">
        <span className="text-lg leading-none">+</span>
        Add Candidate
      </Button>

      <Button variant="secondary" size="md" aria-label="Bulk actions">
        Bulk Actions
      </Button>
    </div>
  );
}
