import React from "react";
import { Tabs as BaseTabs } from "@base-ui/react";

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export interface TabsProps {
  value: string;
  onValueChange: (val: string) => void;
  tabs: TabItem[];
  className?: string;
}

/**
 * Accessible Tabs primitive built on Base UI (@base-ui/react).
 * Fully keyboard navigable (Left/Right arrow keys to switch tabs, Home/End to jump).
 */
export function Tabs({ value, onValueChange, tabs, className = "" }: TabsProps) {
  return (
    <BaseTabs.Root
      value={value}
      onValueChange={(val) => {
        if (typeof val === "string") onValueChange(val);
      }}
      className={`relative ${className}`}
    >
      <BaseTabs.List className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-2xl border border-slate-200/60 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = value === tab.id;
          return (
            <BaseTabs.Tab
              key={tab.id}
              value={tab.id}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-[12.5px] font-semibold transition-all duration-150 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 whitespace-nowrap ${
                isActive
                  ? "bg-white text-slate-800 shadow-xs border border-slate-200/60 font-bold"
                  : "text-slate-500 hover:text-slate-800 hover:bg-white/50"
              }`}
            >
              {tab.icon && <span className="size-4 shrink-0" aria-hidden="true">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge && <span className="shrink-0">{tab.badge}</span>}
            </BaseTabs.Tab>
          );
        })}
      </BaseTabs.List>
    </BaseTabs.Root>
  );
}

export const TabsRoot = BaseTabs.Root;
export const TabsList = BaseTabs.List;
export const TabsTab = BaseTabs.Tab;
export const TabsPanel = BaseTabs.Panel;
export const TabsIndicator = BaseTabs.Indicator;
