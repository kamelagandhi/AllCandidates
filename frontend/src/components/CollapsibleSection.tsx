// frontend/src/components/CollapsibleSection.tsx
import React, { useRef, useState, useEffect } from "react";

interface Props {
  title: string;
  defaultOpen?: boolean;
  children?: React.ReactNode;
  className?: string;
}

const CollapsibleSection: React.FC<Props> = ({ title, defaultOpen = false, children, className = "" }) => {
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState<string>(defaultOpen ? "none" : "0px");

  useEffect(() => {
    if (defaultOpen && contentRef.current) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
      const t = setTimeout(() => setMaxHeight("none"), 300);
      return () => clearTimeout(t);
    }
  }, [defaultOpen]);

  useEffect(() => {
    if (!contentRef.current) return;
    if (open) {
      const h = contentRef.current.scrollHeight;
      setMaxHeight(`${h}px`);
      const id = setTimeout(() => setMaxHeight("none"), 300);
      return () => clearTimeout(id);
    } else {
      const h = contentRef.current.scrollHeight;
      setMaxHeight(`${h}px`);
      requestAnimationFrame(() => setMaxHeight("0px"));
    }
  }, [open]);

  return (
    <div className={`mb-3 ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`collapsible-${title.replace(/\s+/g, "-").toLowerCase()}`}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-1 py-2 text-left"
      >
        <div className="text-sm font-medium text-[var(--text-primary)]">{title}</div>
        <div className={`transform transition-transform duration-200 ${open ? "rotate-180" : "rotate-0"}`}>
          <svg className="w-4 h-4 text-[var(--text-secondary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <div
        id={`collapsible-${title.replace(/\s+/g, "-").toLowerCase()}`}
        ref={contentRef}
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: maxHeight === "none" ? undefined : maxHeight }}
      >
        <div className="pt-2 pb-3 px-1 text-sm text-[var(--text-secondary)]">{children}</div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
