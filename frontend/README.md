# Frontend Application

React + TypeScript + TailwindCSS application for candidate management.

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/          # React components
│   ├── Sidebar.tsx     # Sidebar with filters
│   ├── CandidateCard.tsx  # Individual candidate card
│   ├── Pagination.tsx  # Pagination component
│   └── ...             # Add your components here
├── types/              # TypeScript type definitions
│   └── candidate.ts    # Candidate and API response types
├── App.tsx             # Main app component
├── App.css             # Custom CSS (use sparingly)
├── index.css           # Tailwind imports
└── main.tsx            # App entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Implementation Guide

### 1. Component Structure

**Pre-built components (use these):**
- ✅ `SearchInput.tsx` - Complete, already integrated into Sidebar
- ✅ `Sidebar.tsx` - Complete with search, toggle, dropdown
- 🔶 `CollapsibleSection.tsx` - Skeleton provided, needs state management

**Components you need to build:**
- `CandidateCard.tsx` - Individual candidate display
- `Pagination.tsx` - Pagination controls
- `CandidateList.tsx` - List container (optional)
- `FilterTags.tsx` - Active filter badges (optional)

### 2. State Management

You can use React hooks for state:
- `useState` for local component state
- `useEffect` for API calls
- Consider creating a custom hook for API calls

Example:
```typescript
const [candidates, setCandidates] = useState<Candidate[]>([]);
const [loading, setLoading] = useState(false);
const [page, setPage] = useState(1);
const [search, setSearch] = useState('');
```

### 3. API Integration

The backend API is available at `http://localhost:8000/api/candidates`

Example fetch:
```typescript
const fetchCandidates = async (search: string) => {
  const params = new URLSearchParams({
    ...(search && { search }),
  });

  const response = await fetch(`http://localhost:8000/api/candidates?${params}`);
  const data = await response.json();
  return data; // Returns { candidates: [...], total: number }
};
```

**Note:** Pagination is handled client-side. The backend returns all matching candidates.

### 4. Styling with Tailwind

Common patterns you'll use:

**Layout:**
```jsx
<div className="flex">
  <aside className="w-[200px] border-r"></aside>
  <main className="flex-1"></main>
</div>
```

**Buttons:**
```jsx
<button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover">
  Click me
</button>
```

**Inputs:**
```jsx
<input
  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary"
  type="text"
  placeholder="Search..."
/>
```

### 5. TypeScript Types

Type definitions are in `src/types/candidate.ts`:
- `Candidate` - Individual candidate
- `Interview` - Interview stage
- `CandidatesResponse` - API response
- `FilterState` - Filter state

Use these types for props and state:
```typescript
interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  // ...
};
```

## Tips

1. **Start with the structure** - Build the layout first (sidebar + main content)
2. **Component by component** - Build one component at a time, test it, then move on
3. **Static first** - Display static data before adding interactivity
4. **Then add state** - Add filtering, sorting, pagination
5. **Polish last** - Add hover states, animations, loading states at the end

## Troubleshooting

**Tailwind classes not working?**
- Make sure `index.css` has the `@tailwind` directives
- Check that `tailwind.config.js` includes your file paths

**CORS errors?**
- Make sure the backend is running on port 8000
- Check that CORS is configured correctly in `backend/main.py`

**TypeScript errors?**
- Make sure you're using the types from `src/types/candidate.ts`
- **Do not use `any` type** (use proper types or `unknown`)

## Reference Design

See the [Figma design](https://www.figma.com/design/gZL1X2fSo0MzExOIXNW1hz/Sample-Pages?node-id=1-1390&t=00CymjmcEhM0QfRK-11) for visual reference.

Design specs are in `../designs/specs.md`.
