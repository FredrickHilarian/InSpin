import React, { createContext, useContext, useState } from "react";
import * as XLSX from "xlsx";

export interface RespondentData {
  id: string;
  name: string;
  email: string;
  role: string;
  tenure: string;
  npsScore: number;
  npsCategory: "Promoter" | "Passive" | "Detractor";
  sentiment: "Positive" | "Neutral" | "Negative";
  purchaseDate: string;
  featureStruggle: string;
  keyQuote: string;
  recommendation: string;
}

export interface ThemeItem {
  id: string;
  title: string;
  category: string;
  count: number;
  percentage: number;
  sentiment: "positive" | "neutral" | "negative";
  impact: "High" | "Medium" | "Low";
  npsImpact: string;
  keyQuote: string;
  actionableStep: string;
}

export interface QuestionSummary {
  id: string;
  title: string;
  type: string;
  responsesCount: number;
  avgScore?: number;
  topTheme?: string;
  breakdown?: { label: string; count: number; percentage: number }[];
}

export interface SegmentItem {
  id: string;
  name: string;
  count: number;
  percentage: number;
  avgNps: number;
  topConcern: string;
}

export interface SurveyDataset {
  fileName: string;
  uploadedAt: string;
  totalRespondents: number;
  npsScore: number;
  promotersPct: number;
  passivesPct: number;
  detractorsPct: number;
  avgSatisfaction: number;
  positiveSentimentPct: number;
  columns: string[];
  rawRows: Record<string, any>[];
  respondents: RespondentData[];
  themes: ThemeItem[];
  questions: QuestionSummary[];
  segments: SegmentItem[];
}

export interface WorkspaceItem {
  id: string;
  name: string;
  createdAt: string;
  dataset: SurveyDataset;
}

const DEFAULT_RESPONDENTS: RespondentData[] = [
  { id: "RESP-1092", name: "Elena Rostova", email: "elena@acmeresearch.com", role: "Product Manager", tenure: "2-4 years", npsScore: 9, npsCategory: "Promoter", sentiment: "Positive", purchaseDate: "2026-07-12", featureStruggle: "Exporting raw data to PDF took longer than expected", keyQuote: "InSpin has transformed how we synthesize customer interview transcripts into themes in minutes.", recommendation: "Add one-click PDF export options" },
  { id: "RESP-1093", name: "Marcus Vance", email: "marcus@techscale.io", role: "Senior Developer", tenure: "1-2 years", npsScore: 4, npsCategory: "Detractor", sentiment: "Negative", purchaseDate: "2026-07-14", featureStruggle: "Meeting overlap and lack of core hour flexibility", keyQuote: "Overlapping meeting schedules prevent deep flow time for technical execution.", recommendation: "Implement async daily standups" },
  { id: "RESP-1094", name: "Sophia Lin", email: "sophia@designcraft.co", role: "UX Researcher", tenure: "4+ years", npsScore: 10, npsCategory: "Promoter", sentiment: "Positive", purchaseDate: "2026-07-15", featureStruggle: "Tagging respondents across multiple studies", keyQuote: "The AI insight clustering automatically catches subtle user frustrations we missed manually.", recommendation: "Expand global cross-project tagging" },
  { id: "RESP-1095", name: "David Kim", email: "dkim@innovate.org", role: "Operations Director", tenure: "6-12 months", npsScore: 6, npsCategory: "Detractor", sentiment: "Neutral", purchaseDate: "2026-07-18", featureStruggle: "Complex permissions setup for external clients", keyQuote: "Managing guest access permissions requires too many manual steps in setting menus.", recommendation: "Simplify guest link security settings" },
  { id: "RESP-1096", name: "Amara Oke", email: "amara@apexglobal.com", role: "Data Analyst", tenure: "2-4 years", npsScore: 8, npsCategory: "Passive", sentiment: "Positive", purchaseDate: "2026-07-20", featureStruggle: "Custom chart builder color overrides", keyQuote: "Overall robust reporting platform; wish we could save custom palette presets.", recommendation: "Allow saving custom chart color palettes" },
  { id: "RESP-1097", name: "Julian Thorne", email: "jthorne@cloudscale.net", role: "Engineering Lead", tenure: "1-2 years", npsScore: 3, npsCategory: "Detractor", sentiment: "Negative", purchaseDate: "2026-07-21", featureStruggle: "Hardware licensing approval turnaround", keyQuote: "Outdated developer machines and strict core hours slow down build speeds.", recommendation: "Upgrade developer hardware budget" },
  { id: "RESP-1098", name: "Sarah Jenkins", email: "sjenkins@quantumly.com", role: "Product Designer", tenure: "4+ years", npsScore: 9, npsCategory: "Promoter", sentiment: "Positive", purchaseDate: "2026-07-22", featureStruggle: "Interactive prototype embedding speed", keyQuote: "Great user feedback synthesis! Very intuitive interface.", recommendation: "Improve prototype preview rendering" },
  { id: "RESP-1099", name: "Carlos Mendez", email: "cmendez@frontiers.io", role: "Marketing Manager", tenure: "2-4 years", npsScore: 9, npsCategory: "Promoter", sentiment: "Positive", purchaseDate: "2026-07-25", featureStruggle: "Automated email digest scheduling", keyQuote: "Automated sentiment summaries saved our weekly team sync 3 hours of prep.", recommendation: "Schedule weekly automated slack updates" },
];

const DEFAULT_THEMES: ThemeItem[] = [
  { id: "THM-1", title: "Operational Autonomy & Flexible Hours", category: "Workplace Culture", count: 48, percentage: 48, sentiment: "negative", impact: "High", npsImpact: "-14 pts on Engineering NPS", keyQuote: "Core hours feel outdated and disrupt flow during heavy coding tasks.", actionableStep: "Pilot an async-first work week for core engineering teams." },
  { id: "THM-2", title: "AI Insight Accuracy & Clustering Speed", category: "Product Feature", count: 34, percentage: 34, sentiment: "positive", impact: "High", npsImpact: "+22 pts on UX Researcher NPS", keyQuote: "Auto-clustering survey responses saves hours of spreadsheet filtering.", actionableStep: "Expand AI tagging presets for customer feedback." },
  { id: "THM-3", title: "Meeting Overlap & Schedule Disruption", category: "Operations", count: 28, percentage: 28, sentiment: "negative", impact: "Medium", npsImpact: "-8 pts overall", keyQuote: "Constant 15-minute sync meetings fragment deep focus blocks.", actionableStep: "Establish 3-hour daily focus blocks across departments." },
  { id: "THM-4", title: "Developer Tooling & Hardware Upgrades", category: "Equipment", count: 18, percentage: 18, sentiment: "negative", impact: "Medium", npsImpact: "-5 pts on Engineering NPS", keyQuote: "Build times are hindered by older hardware specifications.", actionableStep: "Set up a quarterly self-service developer hardware stipend." },
];

const DEFAULT_QUESTIONS: QuestionSummary[] = [
  { id: "Q1", title: "How satisfied are you with overall product performance?", type: "NPS Rating", responsesCount: 142, avgScore: 8.4, topTheme: "AI Clustering Speed", breakdown: [{ label: "Promoters (9-10)", count: 92, percentage: 65 }, { label: "Passives (7-8)", count: 32, percentage: 22 }, { label: "Detractors (0-6)", count: 18, percentage: 13 }] },
  { id: "Q2", title: "Which feature did you struggle with the most?", type: "Open Text", responsesCount: 128, topTheme: "Hardware & Permissions Setup" },
  { id: "Q3", title: "Would you recommend InSpin to a colleague?", type: "Boolean (Yes/No)", responsesCount: 142, avgScore: 88, topTheme: "High Team Advocacy", breakdown: [{ label: "Yes", count: 125, percentage: 88 }, { label: "No", count: 17, percentage: 12 }] },
  { id: "Q4", title: "How long have you been in your current role?", type: "Single Choice", responsesCount: 140, topTheme: "Tenure Distribution", breakdown: [{ label: "2-4 years", count: 58, percentage: 41 }, { label: "1-2 years", count: 42, percentage: 30 }, { label: "4+ years", count: 26, percentage: 19 }, { label: "Under 1 year", count: 14, percentage: 10 }] }
];

const DEFAULT_SEGMENTS: SegmentItem[] = [
  { id: "SEG-1", name: "Engineering Cohort", count: 52, percentage: 37, avgNps: -12, topConcern: "Meeting Overlap & Schedule Disruption" },
  { id: "SEG-2", name: "UX & Product Research", count: 44, percentage: 31, avgNps: 42, topConcern: "Export & Report Customization" },
  { id: "SEG-3", name: "Marketing & Growth", count: 28, percentage: 20, avgNps: 28, topConcern: "Automated Digest Scheduling" },
  { id: "SEG-4", name: "Operations & Admin", count: 18, percentage: 12, avgNps: 14, topConcern: "Guest Permission Management" },
];

const DATASET_1: SurveyDataset = {
  fileName: "Customer_Satisfaction_Survey_2026.xlsx",
  uploadedAt: "Today, 10:30 AM",
  totalRespondents: 142,
  npsScore: 52,
  promotersPct: 65,
  passivesPct: 22,
  detractorsPct: 13,
  avgSatisfaction: 4.3,
  positiveSentimentPct: 74,
  columns: ["Respondent ID", "Purchase Date", "Satisfaction (NPS)", "Feature Struggle", "Recommendation", "Role Tenure", "Most Important Info", "Preferred Job Site", "Start Date", "Talk to Us", "Email Address"],
  rawRows: [],
  respondents: DEFAULT_RESPONDENTS,
  themes: DEFAULT_THEMES,
  questions: DEFAULT_QUESTIONS,
  segments: DEFAULT_SEGMENTS,
};

const DATASET_2: SurveyDataset = {
  fileName: "Q1_Employee_Autonomy_Study.xlsx",
  uploadedAt: "Yesterday, 3:15 PM",
  totalRespondents: 218,
  npsScore: 28,
  promotersPct: 48,
  passivesPct: 32,
  detractorsPct: 20,
  avgSatisfaction: 3.8,
  positiveSentimentPct: 58,
  columns: ["Employee ID", "Department", "Workplace Autonomy Rating", "Primary Concern", "Workplace Recommendation"],
  rawRows: [],
  respondents: DEFAULT_RESPONDENTS.map((r, i) => ({ ...r, id: `EMP-${200 + i}`, role: i % 2 === 0 ? "Software Engineer" : "UX Researcher", npsScore: 5 + (i % 5) })),
  themes: DEFAULT_THEMES,
  questions: DEFAULT_QUESTIONS,
  segments: DEFAULT_SEGMENTS,
};

const INITIAL_WORKSPACES: WorkspaceItem[] = [
  {
    id: "ws-inspin",
    name: "InSpin Workspace",
    createdAt: "Jul 2026",
    dataset: DATASET_1
  },
  {
    id: "ws-employee-autonomy",
    name: "Q1 Employee Autonomy Study",
    createdAt: "Jul 2026",
    dataset: DATASET_2
  }
];

interface SurveyDataContextType {
  workspaces: WorkspaceItem[];
  activeWorkspaceId: string;
  activeWorkspace: WorkspaceItem;
  dataset: SurveyDataset;
  selectWorkspace: (id: string) => void;
  createWorkspaceFromExcel: (file: File) => Promise<WorkspaceItem>;
  updateActiveDataset: (newDataset: Partial<SurveyDataset>) => void;
}

const SurveyDataContext = createContext<SurveyDataContextType | undefined>(undefined);

export const SurveyDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workspaces, setWorkspaces] = useState<WorkspaceItem[]>(INITIAL_WORKSPACES);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string>("ws-inspin");

  const activeWorkspace = workspaces.find(w => w.id === activeWorkspaceId) || workspaces[0];
  const dataset = activeWorkspace.dataset;

  const selectWorkspace = (id: string) => {
    if (workspaces.some(w => w.id === id)) {
      setActiveWorkspaceId(id);
    }
  };

  const updateActiveDataset = (updates: Partial<SurveyDataset>) => {
    setWorkspaces(prev => prev.map(w => {
      if (w.id === activeWorkspaceId) {
        return { ...w, dataset: { ...w.dataset, ...updates } };
      }
      return w;
    }));
  };

  const createWorkspaceFromExcel = async (file: File): Promise<WorkspaceItem> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const rawRows: Record<string, any>[] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

          if (rawRows.length === 0) {
            throw new Error("Uploaded sheet is empty");
          }

          const columns = Object.keys(rawRows[0]);

          let totalNps = 0;
          let npsCount = 0;
          let promoters = 0;
          let passives = 0;
          let detractors = 0;
          let positiveSentiments = 0;

          const extractedRespondents: RespondentData[] = rawRows.slice(0, 100).map((row, idx) => {
            const rowKeys = Object.keys(row);
            let npsScore = 8;
            for (const key of rowKeys) {
              const lowerKey = key.toLowerCase();
              if (lowerKey.includes("nps") || lowerKey.includes("satisfaction") || lowerKey.includes("rating") || lowerKey.includes("score")) {
                const val = parseFloat(row[key]);
                if (!isNaN(val)) {
                  npsScore = Math.min(10, Math.max(0, Math.round(val)));
                  break;
                }
              }
            }

            totalNps += npsScore;
            npsCount++;

            let npsCategory: "Promoter" | "Passive" | "Detractor" = "Passive";
            if (npsScore >= 9) {
              npsCategory = "Promoter";
              promoters++;
            } else if (npsScore >= 7) {
              npsCategory = "Passive";
              passives++;
            } else {
              npsCategory = "Detractor";
              detractors++;
            }

            let featureStruggle = "Navigating workspace dashboards";
            let keyQuote = "Extracted response from row " + (idx + 1);
            for (const key of rowKeys) {
              const val = String(row[key]).trim();
              if (val.length > 15) {
                keyQuote = val;
                featureStruggle = val.slice(0, 45) + "...";
                break;
              }
            }

            let sentiment: "Positive" | "Neutral" | "Negative" = npsScore >= 8 ? "Positive" : npsScore >= 6 ? "Neutral" : "Negative";
            if (sentiment === "Positive") positiveSentiments++;

            const nameVal = row["Name"] || row["Respondent Name"] || row["Full Name"] || `Respondent ${idx + 101}`;
            const emailVal = row["Email"] || row["Email Address"] || `respondent${idx + 101}@company.com`;
            const roleVal = row["Role"] || row["Department"] || row["Job Title"] || (idx % 2 === 0 ? "Product Manager" : "Software Engineer");
            const tenureVal = row["Tenure"] || (idx % 3 === 0 ? "2-4 years" : idx % 2 === 0 ? "1-2 years" : "4+ years");

            return {
              id: `RESP-${idx + 1000}`,
              name: String(nameVal),
              email: String(emailVal),
              role: String(roleVal),
              tenure: String(tenureVal),
              npsScore,
              npsCategory,
              sentiment,
              purchaseDate: row["Date"] || new Date().toISOString().slice(0, 10),
              featureStruggle,
              keyQuote,
              recommendation: `Action recommendation derived from ${roleVal} feedback.`,
            };
          });

          const totalRespondents = rawRows.length;
          const calculatedNps = totalRespondents > 0 ? Math.round(((promoters - detractors) / totalRespondents) * 100) : 50;
          const promotersPct = totalRespondents > 0 ? Math.round((promoters / totalRespondents) * 100) : 60;
          const passivesPct = totalRespondents > 0 ? Math.round((passives / totalRespondents) * 100) : 25;
          const detractorsPct = Math.max(0, 100 - promotersPct - passivesPct);
          const avgSatisfaction = npsCount > 0 ? +(totalNps / npsCount / 2).toFixed(1) : 4.2;
          const positiveSentimentPct = totalRespondents > 0 ? Math.round((positiveSentiments / Math.max(1, extractedRespondents.length)) * 100) : 70;

          const dynamicThemes: ThemeItem[] = [
            {
              id: "THM-EX-1",
              title: `${file.name.replace(/\.[^/.]+$/, "")} Primary Theme`,
              category: "Extracted Theme",
              count: Math.round(totalRespondents * 0.42),
              percentage: 42,
              sentiment: calculatedNps > 40 ? "positive" : "negative",
              impact: "High",
              npsImpact: `${calculatedNps > 40 ? "+" : "-"}${Math.abs(calculatedNps - 30)} pts overall`,
              keyQuote: extractedRespondents[0]?.keyQuote || "Extracted feedback from uploaded file.",
              actionableStep: "Address main feedback items highlighted in the uploaded sheet."
            },
            {
              id: "THM-EX-2",
              title: "Usability & Workflow Efficiency",
              category: "User Experience",
              count: Math.round(totalRespondents * 0.31),
              percentage: 31,
              sentiment: "positive",
              impact: "High",
              npsImpact: "+18 pts",
              keyQuote: extractedRespondents[1]?.keyQuote || "Feature workflow operates smoothly.",
              actionableStep: "Optimize top-requested interface workflows."
            },
            {
              id: "THM-EX-3",
              title: "Integration & Setup Requests",
              category: "Operations",
              count: Math.round(totalRespondents * 0.27),
              percentage: 27,
              sentiment: "neutral",
              impact: "Medium",
              npsImpact: "-5 pts",
              keyQuote: extractedRespondents[2]?.keyQuote || "Setup requires initial configuration.",
              actionableStep: "Provide guided onboarding templates."
            }
          ];

          const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
          const formattedWorkspaceName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
          const newWsId = `ws-${Date.now()}`;

          const newDataset: SurveyDataset = {
            fileName: file.name,
            uploadedAt: "Just now",
            totalRespondents,
            npsScore: calculatedNps,
            promotersPct,
            passivesPct,
            detractorsPct,
            avgSatisfaction,
            positiveSentimentPct,
            columns,
            rawRows,
            respondents: extractedRespondents,
            themes: dynamicThemes,
            questions: DEFAULT_QUESTIONS.map(q => ({ ...q, responsesCount: totalRespondents })),
            segments: DEFAULT_SEGMENTS,
          };

          const newWorkspace: WorkspaceItem = {
            id: newWsId,
            name: formattedWorkspaceName,
            createdAt: "Just now",
            dataset: newDataset
          };

          setWorkspaces(prev => [...prev, newWorkspace]);
          setActiveWorkspaceId(newWsId);
          resolve(newWorkspace);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <SurveyDataContext.Provider
      value={{
        workspaces,
        activeWorkspaceId,
        activeWorkspace,
        dataset,
        selectWorkspace,
        createWorkspaceFromExcel,
        updateActiveDataset
      }}
    >
      {children}
    </SurveyDataContext.Provider>
  );
};

export const useSurveyData = () => {
  const context = useContext(SurveyDataContext);
  if (!context) {
    throw new Error("useSurveyData must be used within a SurveyDataProvider");
  }
  return context;
};
