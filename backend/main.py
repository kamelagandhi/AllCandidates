# backend/main.py
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Dict, Any
import json
from pathlib import Path

app = FastAPI(title="Candidate Management API")

# Configure CORS (Vite default origin)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DATA_FILE points to project-root/mock-data/candidates.json
DATA_FILE = Path(__file__).parent.parent / "mock-data" / "candidates.json"


def load_candidates() -> List[Dict[str, Any]]:
    """Load candidates from JSON file. Accepts { "candidates": [...] } shape."""
    if not DATA_FILE.exists():
        # Return empty list rather than raising so frontend can handle gracefully
        return []
    try:
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
        # Accept either {"candidates": [...]} or top-level array
        if isinstance(data, dict) and "candidates" in data and isinstance(data["candidates"], list):
            return data["candidates"]
        if isinstance(data, list):
            return data
        # Unexpected shape -> return empty
        return []
    except Exception as e:
        # Log error and return empty list
        print("Error reading candidates.json:", e)
        return []


@app.get("/")
def read_root():
    """Root endpoint"""
    return {"message": "Candidate Management API", "docs": "/docs"}


@app.get("/api/candidates")
def get_candidates(
    search: Optional[str] = Query(None, description="Search by name, position, or company"),
):
    """
    GET /api/candidates?search=...
    - Returns ALL matching candidates (no pagination)
    - Filters (case-insensitive) across name, position, company
    Response:
      { "candidates": [...], "total": <int> }
    """
    # Load source data
    candidates = load_candidates()

    # If no search provided, return all
    if not search:
        return {"candidates": candidates, "total": len(candidates)}

    q = search.strip().lower()

    def matches(c: Dict[str, Any]) -> bool:
        # Look for search term in name, position, or company (case-insensitive).
        # Use safe access in case fields are missing or not strings.
        for fld in ("name", "position", "company"):
            v = c.get(fld)
            if v and isinstance(v, str) and q in v.lower():
                return True
        return False

    filtered = [c for c in candidates if matches(c)]
    return {"candidates": filtered, "total": len(filtered)}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
