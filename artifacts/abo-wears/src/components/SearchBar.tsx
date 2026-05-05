import { useState } from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
  dark?: boolean;
}

export function SearchBar({ placeholder = "Search products...", onSearch, className = "", dark = false }: SearchBarProps) {
  const [query, setQuery] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    onSearch(e.target.value);
  }

  function handleClear() {
    setQuery("");
    onSearch("");
  }

  return (
    <div className={`relative ${className}`}>
      <Search size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${dark ? "text-gray-400" : "text-muted-foreground"}`} />
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#22c55e] ${
          dark
            ? "bg-[#1a1a1a] border border-gray-700 text-white placeholder:text-gray-500 focus:border-[#22c55e]"
            : "bg-background border border-input text-foreground placeholder:text-muted-foreground focus:border-[#22c55e]"
        }`}
        data-testid="search-input"
      />
      {query && (
        <button
          onClick={handleClear}
          className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors ${dark ? "text-gray-400 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
