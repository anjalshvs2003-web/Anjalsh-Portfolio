"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import initialData from "@/data/portfolioData.json";
import { PortfolioData, Project, SiteWords, ScrollingArcConfig } from "@/types";

interface PortfolioContextType {
  data: PortfolioData;
  projects: Project[];
  siteWords: SiteWords;
  scrollingArcConfig: ScrollingArcConfig;
  updateData: (updater: Partial<PortfolioData> | ((prev: PortfolioData) => PortfolioData)) => Promise<boolean>;
  refreshData: () => Promise<void>;
  isLoading: boolean;
}

const STORAGE_KEY = "anjalsh_portfolio_data_v1";

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<PortfolioData>(initialData as unknown as PortfolioData);
  const [isLoading, setIsLoading] = useState(false);

  // Load latest data from localStorage or API on client mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.projects && parsed.siteWords) {
          setData(parsed);
        }
      }
    } catch {
      // Ignore parse error, fallback to initialData
    }

    // Also fetch fresh from API
    fetch("/api/host/data")
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          setData(res.data);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(res.data));
          } catch {}
        }
      })
      .catch(() => {});

    // Listen to updates from host page
    const handleStorageUpdate = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setData(JSON.parse(e.newValue));
        } catch {}
      }
    };

    const handleCustomUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<PortfolioData>;
      if (customEvent.detail) {
        setData(customEvent.detail);
      }
    };

    window.addEventListener("storage", handleStorageUpdate);
    window.addEventListener("portfolio_data_updated", handleCustomUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageUpdate);
      window.removeEventListener("portfolio_data_updated", handleCustomUpdate);
    };
  }, []);

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/host/data");
      const json = await res.json();
      if (json.success && json.data) {
        setData(json.data);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(json.data));
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateData = useCallback(
    async (updater: Partial<PortfolioData> | ((prev: PortfolioData) => PortfolioData)): Promise<boolean> => {
      setIsLoading(true);
      try {
        const nextData = typeof updater === "function" ? updater(data) : { ...data, ...updater };
        setData(nextData);

        // Update localStorage
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
        } catch {}

        // Broadcast to other components
        window.dispatchEvent(
          new CustomEvent("portfolio_data_updated", { detail: nextData })
        );

        // Send to server API
        const token = sessionStorage.getItem("anjalsh_host_token") || "anjalsh_master_session_active";
        const res = await fetch("/api/host/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(nextData),
        });

        const json = await res.json();
        return json.success === true;
      } catch (err) {
        console.error("Failed to update portfolio data:", err);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [data]
  );

  return (
    <PortfolioContext.Provider
      value={{
        data,
        projects: data.projects,
        siteWords: data.siteWords,
        scrollingArcConfig: data.scrollingArcConfig,
        updateData,
        refreshData,
        isLoading,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    // Return server safe fallback
    return {
      data: initialData as unknown as PortfolioData,
      projects: initialData.projects as unknown as Project[],
      siteWords: initialData.siteWords as unknown as SiteWords,
      scrollingArcConfig: initialData.scrollingArcConfig as unknown as ScrollingArcConfig,
      updateData: async () => false,
      refreshData: async () => {},
      isLoading: false,
    };
  }
  return context;
}
