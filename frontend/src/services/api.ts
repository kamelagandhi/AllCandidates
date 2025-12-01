import type { Candidate } from "../types/candidate";
import candidatesData from "../data/candidates.json";

export function getLocalCandidates(): Candidate[] {
  if (Array.isArray(candidatesData)) {
    return candidatesData as Candidate[];
  }
  if (candidatesData && typeof candidatesData === "object" && "candidates" in candidatesData) {
    return (candidatesData as { candidates: Candidate[] }).candidates || [];
  }
  return [];
}
