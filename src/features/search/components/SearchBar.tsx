"use client";

import { useSearch } from "@/features/search/hooks/useSearch";
import SearchDropdown from "@/features/search/components/SearchDropdown";

export default function SearchBar() {
    const {
        query,
        results,
        isOpen,
        isLoading,
        error,
        activeIndex,
        inputRef,
        dropdownRef,
        handleInputChange,
        handleKeyDown,
        selectItem,
        openDropdown,
        closeDropdown,
    } = useSearch();

    return (
        <div className="flex-1 max-w-xl relative transition-all duration-300">
            <div className="relative group">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-linear-to-r from-purple-500/50 to-blue-500/50 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Input wrapper */}
                <div className="relative flex items-center bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 group-focus-within:border-purple-500/50 transition-all duration-300">
                    <svg className="w-5 h-5 text-gray-400 ml-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        placeholder="Tìm kiếm 24,905 anime..."
                        className="w-full bg-transparent text-white placeholder-gray-500 px-4 py-3 focus:outline-none text-sm"
                        onChange={(e) => handleInputChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={openDropdown}
                        autoComplete="off"
                        spellCheck={false}
                        role="combobox"
                        aria-expanded={isOpen}
                        aria-haspopup="listbox"
                        aria-controls="search-dropdown"
                    />
                    {isLoading && (
                        <div className="mr-4">
                            <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}
                </div>
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div id="search-dropdown" role="listbox">
                    <SearchDropdown
                        results={results}
                        isLoading={isLoading}
                        error={error}
                        query={query}
                        activeIndex={activeIndex}
                        onSelect={selectItem}
                        dropdownRef={dropdownRef}
                    />
                </div>
            )}
        </div>
    );
}