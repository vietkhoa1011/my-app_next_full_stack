"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { fetchSearchResults } from "@/features/search/services/search.service";
import type { SearchResult, SearchState } from "@/features/search/types/search.types";

const INITIAL_STATE: SearchState = {
    query: "",
    results: [],
    isOpen: false,
    isLoading: false,
    error: null,
    activeIndex: -1,
};

const DEBOUNCE_MS = 300;
const MIN_QUERY_LENGTH = 2;

export function useSearch() {
    const [state, setState] = useState<SearchState>(INITIAL_STATE);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);
    const abortRef = useRef<AbortController | null>(null);

    // --------------- Cleanup ---------------
    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            if (abortRef.current) abortRef.current.abort();
        };
    }, []);

    // --------------- Click outside ---------------
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node) &&
                inputRef.current &&
                !inputRef.current.contains(e.target as Node)
            ) {
                setState((prev) => ({ ...prev, isOpen: false, activeIndex: -1 }));
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // --------------- Perform search ---------------
    const performSearch = useCallback(async (query: string) => {
        // Cancel previous request
        if (abortRef.current) abortRef.current.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        try {
            const results = await fetchSearchResults(query, controller.signal);
            if (!controller.signal.aborted) {
                setState((prev) => ({
                    ...prev,
                    results,
                    isLoading: false,
                    activeIndex: -1,
                }));
            }
        } catch (err) {
            if ((err as Error).name === "AbortError") return;
            setState((prev) => ({
                ...prev,
                results: [],
                isLoading: false,
                error: "Search failed",
                activeIndex: -1,
            }));
        }
    }, []);

    // --------------- Handle input change ---------------
    const handleInputChange = useCallback(
        (value: string) => {
            setState((prev) => ({ ...prev, query: value, isOpen: value.length >= MIN_QUERY_LENGTH }));

            if (debounceRef.current) clearTimeout(debounceRef.current);

            if (value.length < MIN_QUERY_LENGTH) {
                setState((prev) => ({ ...prev, results: [], isLoading: false }));
                return;
            }

            debounceRef.current = setTimeout(() => {
                performSearch(value);
            }, DEBOUNCE_MS);
        },
        [performSearch]
    );

    // --------------- Keyboard navigation ---------------
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (!state.isOpen || state.results.length === 0) return;

            switch (e.key) {
                case "ArrowDown": {
                    e.preventDefault();
                    setState((prev) => ({
                        ...prev,
                        activeIndex: Math.min(prev.activeIndex + 1, prev.results.length - 1),
                    }));
                    break;
                }
                case "ArrowUp": {
                    e.preventDefault();
                    setState((prev) => ({
                        ...prev,
                        activeIndex: Math.max(prev.activeIndex - 1, 0),
                    }));
                    break;
                }
                case "Enter": {
                    e.preventDefault();
                    if (state.activeIndex >= 0 && state.activeIndex < state.results.length) {
                        const selected = state.results[state.activeIndex];
                        window.location.href = `/anime/${selected.id}`;
                    }
                    break;
                }
                case "Escape": {
                    e.preventDefault();
                    setState((prev) => ({ ...prev, isOpen: false, activeIndex: -1 }));
                    inputRef.current?.blur();
                    break;
                }
            }
        },
        [state.isOpen, state.results, state.activeIndex]
    );

    // --------------- Select item ---------------
    const selectItem = useCallback((id: number) => {
        window.location.href = `/anime/${id}`;
    }, []);

    // --------------- Open / close ---------------
    const openDropdown = useCallback(() => {
        if (state.query.length >= MIN_QUERY_LENGTH) {
            setState((prev) => ({ ...prev, isOpen: true }));
        }
    }, [state.query]);

    const closeDropdown = useCallback(() => {
        setState((prev) => ({ ...prev, isOpen: false, activeIndex: -1 }));
    }, []);

    return {
        ...state,
        inputRef,
        dropdownRef,
        handleInputChange,
        handleKeyDown,
        selectItem,
        openDropdown,
        closeDropdown,
        setQuery: handleInputChange,
    };
}