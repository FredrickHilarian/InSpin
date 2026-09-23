import React, { useState, useEffect } from "react";
import {
  UploadCloud,
  Check,
  CheckCircle2,
  FileSpreadsheet,
  ArrowRight,
  Lock,
  ChevronDown,
  Sparkles,
  AlertCircle,
  HelpCircle,
  MoreVertical,
  Calendar,
  Star,
  AlignLeft,
  ToggleLeft,
  ListOrdered,
  Plus,
  ArrowLeft,
  Settings,
  ShieldCheck,
  CheckCircle,
  FileText,
  Save,
  Globe,
  Smile,
  Zap,
  BarChart4,
  Layout,
  LineChart,
  Users,
  Compass,
  FileDown,
  Loader2,
  RefreshCw,
  TrendingUp,
  MessageSquare,
  Sparkle,
  Share2
} from "lucide-react";

interface MappingItem {
  id: string;
  name: string;
  match: string;
  type: string;
  icon: string;
  mapTo: string;
  status: "success" | "warning";
}

import { useSurveyData } from "../context/SurveyDataContext";

export default function DataImport({ onExploreInsights }: { onExploreInsights?: () => void }) {
  const { dataset, createWorkspaceFromExcel } = useSurveyData();
  const [step, setStep] = useState(1);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Step 2 Mapping state
  const [mappingData, setMappingData] = useState<MappingItem[]>([
    { id: 'A', name: 'Respondent ID', match: '98% match', type: 'System Field', icon: 'settings', mapTo: 'Respondent ID', status: 'success' },
    { id: 'B', name: 'Purchase Date', match: '96% match', type: 'Date', icon: 'calendar', mapTo: 'Purchase Date', status: 'success' },
    { id: 'C', name: 'How satisfied were you with the s...', match: '95% match', type: 'NPS', icon: 'star', mapTo: 'Satisfaction (NPS)', status: 'success' },
    { id: 'D', name: 'Which feature did you struggle with...', match: '92% match', type: 'Long Text', icon: 'text', mapTo: 'Feature Struggle', status: 'success' },
    { id: 'E', name: 'Would you recommend us to a col...', match: '94% match', type: 'Yes/No', icon: 'toggle', mapTo: 'Recommendation', status: 'success' },
    { id: 'F', name: 'How long have you been with us...', match: '93% match', type: 'Single Choice', icon: 'check-circle', mapTo: 'Role Tenure', status: 'success' },
    { id: 'G', name: 'Which information about a...', match: '91% match', type: 'Ranking', icon: 'ranking', mapTo: 'Most Important Info', status: 'success' },
    { id: 'H', name: 'Which job site do you like to us...', match: '93% match', type: 'Single Choice', icon: 'check-circle', mapTo: 'Preferred Job Site', status: 'success' },
    { id: 'I', name: 'When did you start working at...', match: '90% match', type: 'Date', icon: 'calendar', mapTo: 'Start Date (Current Role)', status: 'success' },
    { id: 'J', name: 'Would you like to talk to us mor...', match: '95% match', type: 'Yes/No', icon: 'toggle', mapTo: 'Talk to Us', status: 'success' },
    { id: 'K', name: 'Email Address', match: '--', type: 'Unknown', icon: 'help', mapTo: 'Select data type', status: 'warning' },
  ]);

  const handleFile = async (file: File) => {
    try {
      setIsProcessingFile(true);
      setUploadError(null);
      const newWs = await createWorkspaceFromExcel(file);
      const parsedDataset = newWs.dataset;

      // Dynamically construct mapping items from extracted columns
      const dynamicMapping: MappingItem[] = parsedDataset.columns.map((colName, idx) => {
        const letter = String.fromCharCode(65 + (idx % 26));
        const lower = colName.toLowerCase();
        let type = 'Single Choice';
        let icon = 'check-circle';
        let mapTo = colName;

        if (lower.includes('id') || lower.includes('uuid')) {
          type = 'System Field';
          icon = 'settings';
        } else if (lower.includes('date') || lower.includes('time')) {
          type = 'Date';
          icon = 'calendar';
        } else if (lower.includes('nps') || lower.includes('satisfaction') || lower.includes('rating') || lower.includes('score')) {
          type = 'NPS';
          icon = 'star';
          mapTo = 'Satisfaction (NPS)';
        } else if (lower.includes('comment') || lower.includes('struggle') || lower.includes('feedback') || lower.includes('text') || lower.includes('quote')) {
          type = 'Long Text';
          icon = 'text';
          mapTo = 'Feature Struggle';
        } else if (lower.includes('recommend') || lower.includes('yes') || lower.includes('talk')) {
          type = 'Yes/No';
          icon = 'toggle';
        }

        return {
          id: letter,
          name: colName,
          match: `${90 + (idx % 8)}% match`,
          type,
          icon,
          mapTo,
          status: 'success'
        };
      });

      setMappingData(dynamicMapping);
      setStep(2);
    } catch (err: any) {
      setUploadError(err.message || 'Failed to read Excel file');
    } finally {
      setIsProcessingFile(false);
    }
  };

  // Step 3 Config state
  const [analysisFocus, setAnalysisFocus] = useState("all");
  const [aiModel, setAiModel] = useState("latest");
  const [sentimentAnalysis, setSentimentAnalysis] = useState("advanced");
  const [themeDetection, setThemeDetection] = useState("auto");
  const [language, setLanguage] = useState("auto");
  const [qualityChecks, setQualityChecks] = useState(true);
  const [statSignificance, setStatSignificance] = useState(true);

  // Output preferences
  const [vizPreference, setVizPreference] = useState("auto");
  const [segmentComparison, setSegmentComparison] = useState("top");
  const [openEndedSummary, setOpenEndedSummary] = useState("themes");
  const [reportFormat, setReportFormat] = useState("dashboard");

  // Step 4 Simulation state
  const [progress, setProgress] = useState(0);
  const [analysisPhase, setAnalysisPhase] = useState("");
  const [activeSubTab, setActiveSubTab] = useState("AI Overview");

  useEffect(() => {
    if (step === 4) {
      setProgress(0);
      setAnalysisPhase("AI is scanning questions and parsing columns...");

      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setAnalysisPhase("Analysis complete!");
            return 100;
          }
          const next = prev + 4;
          if (next === 20) setAnalysisPhase("Running sentiment analysis on open-ended comments...");
          if (next === 52) setAnalysisPhase("Detecting recurring themes and clustering responses...");
          if (next === 80) setAnalysisPhase("Building interactive dashboard visualizations...");
          return next;
        });
      }, 150);

      return () => clearInterval(interval);
    }
  }, [step]);

  const handleMapToChange = (id: string, value: string) => {
    setMappingData(prev => prev.map(item => {
      if (item.id === id) {
        const isUnknown = value === 'Select data type';
        return {
          ...item,
          mapTo: value,
          type: isUnknown ? 'Unknown' : item.type === 'Unknown' ? 'System Field' : item.type,
          status: isUnknown ? 'warning' : 'success'
        };
      }
      return item;
    }));
  };

  const getDataTypeIcon = (iconName: string) => {
    switch (iconName) {
      case 'settings':
        return <Settings className="size-4 text-emerald-600" />;
      case 'calendar':
        return <Calendar className="size-4 text-emerald-600" />;
      case 'star':
        return <Star className="size-4 text-emerald-600" />;
      case 'text':
        return <AlignLeft className="size-4 text-emerald-600" />;
      case 'toggle':
        return <ToggleLeft className="size-4 text-emerald-600" />;
      case 'check-circle':
        return <CheckCircle2 className="size-4 text-emerald-600" />;
      case 'ranking':
        return <ListOrdered className="size-4 text-emerald-600" />;
      default:
        return <HelpCircle className="size-4 text-slate-400" />;
    }
  };

  return (
    <div className="flex-1 w-full overflow-y-auto flex flex-col min-h-0 relative">
      <div className="flex flex-col gap-[32px] items-start p-[40px] w-full max-w-[1400px] mx-auto flex-1 pb-32">

        {/* Stepper Header */}
        <div className="flex items-center justify-center w-full border-b border-[#e2e8f0] pb-6 mb-2">
          <div className="flex items-center gap-6 md:gap-8 w-full max-w-4xl justify-center">
            {/* Step 1 */}
            <div className="flex items-center gap-3">
              {step === 1 ? (
                <div className="flex items-center justify-center size-9 rounded-full border-2 border-[#16a34a] text-[#16a34a] font-semibold text-sm bg-white shrink-0">
                  1
                </div>
              ) : (
                <div className="flex items-center justify-center size-9 rounded-full bg-[#16a34a] text-white shrink-0">
                  <Check className="size-5 stroke-[3]" />
                </div>
              )}
              <div className="flex flex-col text-left">
                <span className="text-[13px] font-semibold text-[#0f172a] whitespace-nowrap">Upload Files</span>
                <span className="text-[11px] text-[#64748b] whitespace-nowrap">
                  {step === 1 ? "Add your survey data" : "File uploaded"}
                </span>
              </div>
            </div>

            {/* Line */}
            <div className="h-px bg-[#e2e8f0] w-12 md:w-16 shrink-0" />

            {/* Step 2 */}
            <div className={`flex items-center gap-3 ${step < 2 ? 'opacity-50' : ''}`}>
              {step > 2 ? (
                <div className="flex items-center justify-center size-9 rounded-full bg-[#16a34a] text-white shrink-0">
                  <Check className="size-5 stroke-[3]" />
                </div>
              ) : step === 2 ? (
                <div className="flex items-center justify-center size-9 rounded-full border-2 border-[#16a34a] text-[#16a34a] font-semibold text-sm bg-white shrink-0">
                  2
                </div>
              ) : (
                <div className="flex items-center justify-center size-9 rounded-full border-2 border-slate-300 text-slate-400 font-semibold text-sm bg-white shrink-0">
                  2
                </div>
              )}
              <div className="flex flex-col text-left">
                <span className={`text-[13px] font-semibold whitespace-nowrap ${step >= 2 ? 'text-[#0f172a]' : 'text-slate-600'}`}>Map Columns</span>
                <span className={`text-[11px] whitespace-nowrap ${step >= 2 ? 'text-[#64748b]' : 'text-slate-400'}`}>
                  {step > 2 ? "24 columns mapped" : "Review and map fields"}
                </span>
              </div>
            </div>

            {/* Line */}
            <div className="h-px bg-[#e2e8f0] w-12 md:w-16 shrink-0" />

            {/* Step 3 */}
            <div className={`flex items-center gap-3 ${step < 3 ? 'opacity-50' : ''}`}>
              {step > 3 ? (
                <div className="flex items-center justify-center size-9 rounded-full bg-[#16a34a] text-white shrink-0">
                  <Check className="size-5 stroke-[3]" />
                </div>
              ) : step === 3 ? (
                <div className="flex items-center justify-center size-9 rounded-full border-2 border-[#16a34a] text-[#16a34a] font-semibold text-sm bg-white shrink-0">
                  3
                </div>
              ) : (
                <div className="flex items-center justify-center size-9 rounded-full border-2 border-slate-300 text-slate-400 font-semibold text-sm bg-white shrink-0">
                  3
                </div>
              )}
              <div className="flex flex-col text-left">
                <span className={`text-[13px] font-semibold whitespace-nowrap ${step >= 3 ? 'text-[#0f172a]' : 'text-slate-600'}`}>Configure Options</span>
                <span className={`text-[11px] whitespace-nowrap ${step >= 3 ? 'text-[#64748b]' : 'text-slate-400'}`}>
                  {step > 3 ? "Analysis configured" : "Set analysis preferences"}
                </span>
              </div>
            </div>

            {/* Line */}
            <div className="h-px bg-[#e2e8f0] w-12 md:w-16 shrink-0" />

            {/* Step 4 */}
            <div className={`flex items-center gap-3 ${step < 4 ? 'opacity-50' : ''}`}>
              <div className={`flex items-center justify-center size-9 rounded-full border-2 ${step === 4 ? 'border-[#16a34a] text-[#16a34a]' : 'border-slate-300 text-slate-400'} font-semibold text-sm bg-white shrink-0`}>
                4
              </div>
              <div className="flex flex-col text-left">
                <span className={`text-[13px] font-semibold whitespace-nowrap ${step === 4 ? 'text-[#0f172a]' : 'text-slate-600'}`}>Analyze Data</span>
                <span className={`text-[11px] whitespace-nowrap ${step === 4 ? 'text-[#64748b]' : 'text-slate-400'}`}>Generate AI insights</span>
              </div>
            </div>
          </div>
        </div>

        {step === 1 && (
          /* ===================================================================
             STEP 1: UPLOAD FILES
             =================================================================== */
          <div className="flex gap-[32px] items-start w-full">
            {/* Left Column: Input Panel */}
            <div className="flex-[1_0_0] flex flex-col gap-[32px] min-w-px">

              {/* Title Block */}
              <div className="flex flex-col gap-[8px] items-start">
                <h1 className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] text-[32px] leading-tight">
                  Import Survey Data
                </h1>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[#475569] text-[15px] max-w-[720px]">
                  Bring your raw customer feedback directly into InSpin to instantly generate AI insights and discover recurring themes.
                </p>
              </div>

              {/* Drag & Drop Area */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".xlsx, .xls, .csv"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                }}
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFile(file);
                }}
                className="flex flex-col items-center justify-center p-[40px] rounded-[24px] border-2 border-dashed border-[#86efac]/50 text-center relative w-full cursor-pointer hover:border-[#16a34a]/70 transition-all bg-white shadow-sm"
                style={{
                  background: "linear-gradient(135deg, rgba(240, 253, 244, 0.6) 0%, rgba(220, 252, 231, 0.4) 100%)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="flex items-center justify-center size-[54px] rounded-full bg-white shadow-sm text-[#16a34a] mb-[16px]">
                  {isProcessingFile ? (
                    <Loader2 className="size-[26px] animate-spin text-emerald-600" />
                  ) : (
                    <UploadCloud className="size-[26px]" />
                  )}
                </div>
                <h3 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#0f172a] text-[16px] mb-[6px]">
                  {isProcessingFile ? "Extracting Excel Sheet Data..." : "Drag and drop your CSV or Excel files here"}
                </h3>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[#64748b] text-[13px] mb-[20px]">
                  {dataset.fileName ? `Active dataset: ${dataset.fileName}` : "Supported formats: .csv, .xlsx, .xls"}
                </p>

                {uploadError && (
                  <div className="mb-4 text-[12px] font-semibold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200">
                    {uploadError}
                  </div>
                )}

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="bg-[#10b981] hover:bg-[#059669] text-white font-semibold text-[13px] px-[20px] py-[10px] rounded-[10px] flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <FileSpreadsheet className="size-4" />
                  Browse Files
                </button>

                <div className="flex items-center gap-6 mt-[32px] text-[12px] text-[#475569]">
                  <div className="flex items-center gap-1.5">
                    <Check className="size-[14px] text-[#16a34a]" />
                    <span>Auto-detect question types</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="size-[14px] text-[#16a34a]" />
                    <span>Clean inconsistent data</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="size-[14px] text-[#16a34a]" />
                    <span>Estimate processing time</span>
                  </div>
                </div>
              </div>

              {/* Connect Tools */}
              <div className="flex flex-col gap-[16px]">
                <div className="flex flex-col gap-[4px]">
                  <h3 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#0f172a] text-[16px]">
                    Or connect your tools
                  </h3>
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[#64748b] text-[13px]">
                    Direct API integrations allow one-click secure authentication to pull continuous feedback directly from your survey suites.
                  </p>
                </div>

                {/* Integrations Grid */}
                <div className="grid grid-cols-2 gap-[16px]">
                  {/* Qualtrics */}
                  <div onClick={() => setStep(2)} className="bg-white border border-[#e2e8f0] p-4 rounded-[16px] flex items-center justify-between hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-[#f1f5f9] flex items-center justify-center font-bold text-[#0f172a] text-lg">
                        Q
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm text-[#0f172a]">Qualtrics</span>
                        <span className="text-[12px] text-[#64748b]">Connect surveys in 1-click</span>
                      </div>
                    </div>
                    <div className="size-[20px] rounded-full bg-[#dcfce7] flex items-center justify-center text-[#15803d]">
                      <Check className="size-3 stroke-[3]" />
                    </div>
                  </div>

                  {/* Typeform */}
                  <div onClick={() => setStep(2)} className="bg-white border border-[#e2e8f0] p-4 rounded-[16px] flex items-center justify-between hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-[#f1f5f9] flex items-center justify-center font-bold text-[#0f172a] text-lg">
                        T
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm text-[#0f172a]">Typeform</span>
                        <span className="text-[12px] text-[#64748b]">Sync active forms instantly</span>
                      </div>
                    </div>
                    <div className="size-[20px] rounded-full bg-[#dcfce7] flex items-center justify-center text-[#15803d]">
                      <Check className="size-3 stroke-[3]" />
                    </div>
                  </div>

                  {/* Google Forms */}
                  <div onClick={() => setStep(2)} className="bg-white border border-[#e2e8f0] p-4 rounded-[16px] flex items-center justify-between hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-[#f1f5f9] flex items-center justify-center font-bold text-[#0f172a] text-lg">
                        G
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm text-[#0f172a]">Google Forms</span>
                        <span className="text-[12px] text-[#64748b]">Sync sheet responses</span>
                      </div>
                    </div>
                    <div className="size-[20px] rounded-full bg-[#dcfce7] flex items-center justify-center text-[#15803d]">
                      <Check className="size-3 stroke-[3]" />
                    </div>
                  </div>

                  {/* SurveyMonkey */}
                  <div onClick={() => setStep(2)} className="bg-white border border-[#e2e8f0] p-4 rounded-[16px] flex items-center justify-between hover:shadow-md transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-[#f1f5f9] flex items-center justify-center font-bold text-[#0f172a] text-lg">
                        S
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm text-[#0f172a]">SurveyMonkey</span>
                        <span className="text-[12px] text-[#64748b]">Pull survey results automatically</span>
                      </div>
                    </div>
                    <div className="size-[20px] rounded-full bg-[#dcfce7] flex items-center justify-center text-[#15803d]">
                      <Check className="size-3 stroke-[3]" />
                    </div>
                  </div>
                </div>

                <button className="flex items-center gap-1.5 text-[13px] font-semibold text-[#64748b] hover:text-[#0f172a] self-center mt-2 px-3 py-1.5 rounded-lg hover:bg-slate-100/85 transition-all">
                  <span>+12 more integrations available</span>
                  <ChevronDown className="size-4" />
                </button>
              </div>

              {/* Ready for Analysis Banner */}
              <div className="bg-green-100/70 border border-green-200/80 rounded-[20px] p-5 flex flex-col lg:flex-row gap-4 lg:items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="size-9 bg-[#16a34a] rounded-full flex items-center justify-center text-white shrink-0">
                    <Check className="size-5 stroke-[3]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-semibold text-[#14532d]">Ready for analysis</span>
                    <span className="text-[12px] text-[#166534]">All required columns detected. No critical issues found.</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                  <div className="flex flex-col items-start lg:items-end">
                    <span className="text-[10px] text-[#166534]/70 uppercase font-semibold whitespace-nowrap">Est. processing time</span>
                    <span className="text-sm font-bold text-[#14532d]">~18 sec</span>
                  </div>
                  <div className="hidden sm:block h-8 w-px bg-[#bbf7d0]" />
                  <div className="flex flex-col items-start lg:items-end">
                    <span className="text-[10px] text-[#166534]/70 uppercase font-semibold whitespace-nowrap">Languages detected</span>
                    <span className="text-sm font-bold text-[#14532d]">English</span>
                  </div>
                  <div className="hidden sm:block h-8 w-px bg-[#bbf7d0]" />
                  <div className="flex flex-col items-start lg:items-end">
                    <span className="text-[10px] text-[#166534]/70 uppercase font-semibold whitespace-nowrap">Duplicate responses</span>
                    <span className="text-sm font-bold text-[#14532d]">12 found</span>
                  </div>
                  <div className="hidden sm:block h-8 w-px bg-[#bbf7d0]" />
                  <div className="flex flex-col items-start lg:items-end">
                    <span className="text-[10px] text-[#166534]/70 uppercase font-semibold whitespace-nowrap">Missing values</span>
                    <span className="text-sm font-bold text-[#14532d]">3 columns</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Import Preview Sidebar Panel */}
            <div className="w-[380px] shrink-0 bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-sm flex flex-col gap-6 text-left">

              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#0f172a]">
                  <FileSpreadsheet className="size-5 text-[#16a34a]" />
                  <h3 className="font-semibold text-[16px]">Import Preview</h3>
                </div>
                <span className="bg-[#dcfce7] text-[#15803d] font-semibold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Auto-analyzed 10 sec ago
                </span>
              </div>

              {/* File Info */}
              <div className="bg-[#f8fafc] border border-[#e2e8f0] p-4 rounded-[16px] flex items-center gap-3">
                <div className="size-10 bg-[#dcfce7] text-[#15803d] font-bold text-[18px] flex items-center justify-center rounded-[10px] shrink-0">
                  X
                </div>
                <div className="flex flex-col min-w-px flex-1">
                  <span className="font-semibold text-sm text-[#0f172a] truncate">Customer_Satisfaction_Survey_2026.xlsx</span>
                  <span className="text-[12px] text-[#64748b]">2.4 MB • Uploaded just now</span>
                </div>
              </div>

              {/* Total stats */}
              <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-5">
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">Total Responses</span>
                  <span className="text-2xl font-bold text-[#0f172a]">2,847</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">Total Questions</span>
                  <span className="text-2xl font-bold text-[#0f172a]">24</span>
                </div>
              </div>

              {/* Question types */}
              <div className="flex flex-col gap-3 border-b border-slate-100 pb-5">
                <span className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">Detected Question Types</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-[#dcfce7] text-[#15803d] text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    6 Single Choice
                  </span>
                  <span className="bg-[#eef2ff] text-[#6366f1] text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    2 Multiple Choice
                  </span>
                  <span className="bg-[#fff7ed] text-[#c2410c] text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    2 Ranking
                  </span>
                  <span className="bg-[#eff6ff] text-[#1d4ed8] text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    1 NPS
                  </span>
                  <span className="bg-[#ecfdf5] text-[#047857] text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    3 Date
                  </span>
                  <span className="bg-[#f0fdf4] text-[#166534] text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    2 Yes/No
                  </span>
                  <span className="bg-[#faf5ff] text-[#6b21a8] text-[11px] font-semibold px-2.5 py-1 rounded-full">
                    8 Long Text
                  </span>
                </div>
              </div>

              {/* Column Mapping list */}
              <div className="flex flex-col gap-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">Column Mapping</span>
                  <span className="text-[11px] font-semibold text-[#16a34a] flex items-center gap-1">
                    <Check className="size-3 stroke-[3]" /> 24 columns mapped
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  {/* Respondent ID */}
                  <div className="flex items-center justify-between p-2 rounded-[10px] hover:bg-[#f8fafc] transition-colors">
                    <div className="flex items-center gap-2 min-w-px flex-1">
                      <span className="text-slate-400 font-bold text-xs">A</span>
                      <span className="text-[13px] font-medium text-[#0f172a] truncate text-left">Respondent ID</span>
                    </div>
                    <span className="bg-[#f0fdf4] text-[#166534] text-[11px] px-2 py-0.5 rounded-full border border-[#bbf7d0] font-semibold">
                      System ID
                    </span>
                  </div>

                  {/* Purchase Date */}
                  <div className="flex items-center justify-between p-2 rounded-[10px] hover:bg-[#f8fafc] transition-colors">
                    <div className="flex items-center gap-2 min-w-px flex-1">
                      <span className="text-slate-400 font-bold text-xs">B</span>
                      <span className="text-[13px] font-medium text-[#0f172a] truncate text-left">Purchase Date</span>
                    </div>
                    <span className="bg-[#f0fdf4] text-[#166534] text-[11px] px-2 py-0.5 rounded-full border border-[#bbf7d0] font-semibold">
                      Date
                    </span>
                  </div>

                  {/* How satisfied */}
                  <div className="flex items-center justify-between p-2 rounded-[10px] hover:bg-[#f8fafc] transition-colors">
                    <div className="flex items-center gap-2 min-w-px flex-1">
                      <span className="text-slate-400 font-bold text-xs">C</span>
                      <span className="text-[13px] font-medium text-[#0f172a] truncate text-left">How satisfied were you with the s...</span>
                    </div>
                    <span className="bg-[#f0fdf4] text-[#166534] text-[11px] px-2 py-0.5 rounded-full border border-[#bbf7d0] font-semibold">
                      NPS
                    </span>
                  </div>

                  {/* Which feature */}
                  <div className="flex items-center justify-between p-2 rounded-[10px] hover:bg-[#f8fafc] transition-colors">
                    <div className="flex items-center gap-2 min-w-px flex-1">
                      <span className="text-slate-400 font-bold text-xs">D</span>
                      <span className="text-[13px] font-medium text-[#0f172a] truncate text-left">Which feature did you struggle wi...</span>
                    </div>
                    <span className="bg-[#f0fdf4] text-[#166534] text-[11px] px-2 py-0.5 rounded-full border border-[#bbf7d0] font-semibold">
                      Long Text
                    </span>
                  </div>

                  {/* Would you recommend */}
                  <div className="flex items-center justify-between p-2 rounded-[10px] hover:bg-[#f8fafc] transition-colors">
                    <div className="flex items-center gap-2 min-w-px flex-1">
                      <span className="text-slate-400 font-bold text-xs">E</span>
                      <span className="text-[13px] font-medium text-[#0f172a] truncate text-left">Would you recommend us to a col...</span>
                    </div>
                    <span className="bg-[#f0fdf4] text-[#166534] text-[11px] px-2 py-0.5 rounded-full border border-[#bbf7d0] font-semibold">
                      Yes/No
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit mapping btn */}
              <button
                onClick={() => setStep(2)}
                className="w-full py-[12px] bg-[#f8fafc] border border-[#e2e8f0] text-[#475569] hover:bg-slate-100 hover:text-[#0f172a] rounded-[12px] flex items-center justify-center gap-2 text-sm font-semibold transition-all mt-auto"
              >
                <span>Review & Edit Mapping</span>
                <ArrowRight className="size-4" />
              </button>

              {/* Footer security */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#64748b] mt-1">
                <Lock className="size-3.5" />
                <span>Your data is secure and encrypted</span>
              </div>

            </div>

          </div>
        )}

        {step === 2 && (
          /* ===================================================================
             STEP 2: MAP COLUMNS PAGE
             =================================================================== */
          <div className="flex gap-[32px] items-start w-full">
            {/* Left Column: Mapping List */}
            <div className="flex-[1_0_0] flex flex-col gap-[24px] min-w-px bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-sm">

              {/* Header inside Left Column */}
              <div className="flex items-start justify-between w-full">
                <div className="flex flex-col gap-[6px] items-start text-left">
                  <h1 className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] text-[28px] leading-tight">
                    Map Columns
                  </h1>
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[#64748b] text-[14px] max-w-[700px]">
                    Review and map each column from your file to the correct question or data type. Our AI has pre-detected the most likely matches.
                  </p>
                </div>

                <span className="bg-[#dcfce7] text-[#166534] font-semibold text-[13px] px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shrink-0 border border-[#bbf7d0]">
                  <Sparkles className="size-4 text-[#16a34a] fill-[#16a34a]/20" />
                  <span>AI Auto-mapped</span>
                </span>
              </div>

              {/* Table */}
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#e2e8f0] text-[11px] font-bold text-[#64748b] uppercase tracking-wider">
                      <th className="py-3 px-3 w-10 text-center">#</th>
                      <th className="py-3 px-4">File Columns</th>
                      <th className="py-3 px-4 text-center">AI Suggestion</th>
                      <th className="py-3 px-4">Data Type</th>
                      <th className="py-3 px-4">Map To</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-3 w-8"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {mappingData.map((row) => (
                      <tr key={row.id} className="border-b border-[#f1f5f9] hover:bg-[#f8fafc]/50 transition-colors text-[13px]">
                        {/* ID Column */}
                        <td className="py-3 px-3 text-center">
                          <div className="flex items-center gap-1.5 justify-center">
                            <span className="text-slate-400 font-bold text-xs uppercase">{row.id}</span>
                          </div>
                        </td>

                        {/* File Column Name */}
                        <td className="py-3 px-4 font-semibold text-[#0f172a] max-w-[200px] truncate">
                          {row.name}
                        </td>

                        {/* AI Suggestion (Percentage match) */}
                        <td className="py-3 px-4 text-center">
                          {row.match !== '--' ? (
                            <span className="text-[#16a34a] font-semibold bg-emerald-50 px-2 py-0.5 rounded-full text-xs">
                              {row.match}
                            </span>
                          ) : (
                            <span className="text-slate-400">--</span>
                          )}
                        </td>

                        {/* Data Type Icon + Text */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2 text-[#0f172a] font-medium">
                            {getDataTypeIcon(row.icon)}
                            <span>{row.type}</span>
                          </div>
                        </td>

                        {/* Map To Dropdown */}
                        <td className="py-3 px-4">
                          <div className="relative inline-block w-full">
                            <select
                              value={row.mapTo}
                              onChange={(e) => handleMapToChange(row.id, e.target.value)}
                              className={`w-full appearance-none bg-white border ${row.mapTo === 'Select data type' ? 'border-[#e2e8f0] text-slate-400' : 'border-emerald-600/30 text-[#0f172a] font-medium'} rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 cursor-pointer`}
                            >
                              <option value="Select data type">Select data type</option>
                              <option value="Respondent ID">Respondent ID</option>
                              <option value="Purchase Date">Purchase Date</option>
                              <option value="Satisfaction (NPS)">Satisfaction (NPS)</option>
                              <option value="Feature Struggle">Feature Struggle</option>
                              <option value="Recommendation">Recommendation</option>
                              <option value="Role Tenure">Role Tenure</option>
                              <option value="Most Important Info">Most Important Info</option>
                              <option value="Preferred Job Site">Preferred Job Site</option>
                              <option value="Start Date (Current Role)">Start Date (Current Role)</option>
                              <option value="Talk to Us">Talk to Us</option>
                            </select>
                            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-[#64748b] pointer-events-none" />
                          </div>
                        </td>

                        {/* Status */}
                        <td className="py-3 px-4 text-center">
                          <div className="flex justify-center">
                            {row.status === "success" ? (
                              <CheckCircle className="size-5 text-[#16a34a] fill-emerald-50" />
                            ) : (
                              <AlertCircle className="size-5 text-amber-500 fill-amber-50" />
                            )}
                          </div>
                        </td>

                        {/* Menu Options Button */}
                        <td className="py-3 px-3 text-center">
                          <button className="text-[#94a3b8] hover:text-[#475569] p-1 rounded-md hover:bg-slate-100 transition-all">
                            <MoreVertical className="size-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Custom Field */}
              <button className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-[14px] self-start py-2 px-3 rounded-lg hover:bg-emerald-50/50 transition-all mt-2">
                <Plus className="size-4 stroke-[2.5]" />
                <span>Add custom field</span>
              </button>

            </div>

            {/* Right Column: Sidebar Stats */}
            <div className="w-[380px] shrink-0 flex flex-col gap-6">

              {/* File Summary Card */}
              <div className="bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-sm flex flex-col gap-5 text-left">
                <h3 className="font-semibold text-[#0f172a] text-[16px]">File Summary</h3>

                <div className="flex items-center gap-3 p-3 bg-emerald-50/40 border border-emerald-100 rounded-xl">
                  <div className="size-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700 shrink-0 font-bold">
                    <FileSpreadsheet className="size-5" />
                  </div>
                  <div className="flex flex-col min-w-px flex-1">
                    <span className="font-semibold text-sm text-[#0f172a] truncate">Customer_Satisfaction_Survey_2026.xlsx</span>
                    <span className="text-[11px] text-[#64748b]">Uploaded just now • 2.4 MB</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider">Total Responses</span>
                    <span className="text-2xl font-bold text-[#0f172a]">2,847</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider">Total Questions</span>
                    <span className="text-2xl font-bold text-[#0f172a]">24</span>
                  </div>
                </div>
              </div>

              {/* Mapping Summary Card */}
              <div className="bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-sm flex flex-col gap-4 text-left">
                <h3 className="font-semibold text-[#0f172a] text-[16px]">Mapping Summary</h3>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-[#16a34a] h-full" style={{ width: "91%" }} />
                  <div className="bg-amber-500 h-full" style={{ width: "9%" }} />
                </div>

                {/* Stats list */}
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex items-center justify-between text-[13px]">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-[#16a34a]" />
                      <span className="text-slate-600 font-medium">Mapped</span>
                    </div>
                    <span className="font-bold text-[#0f172a]">10 (91%)</span>
                  </div>
                  <div className="flex items-center justify-between text-[13px]">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-amber-500" />
                      <span className="text-slate-600 font-medium">Needs Review</span>
                    </div>
                    <span className="font-bold text-[#0f172a]">1 (9%)</span>
                  </div>
                  <div className="flex items-center justify-between text-[13px]">
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-slate-300" />
                      <span className="text-slate-600 font-medium">Unmapped</span>
                    </div>
                    <span className="font-bold text-[#0f172a]">0 (0%)</span>
                  </div>
                </div>

                <button className="flex items-center gap-1.5 text-[13px] font-semibold text-[#16a34a] hover:text-[#15803d] transition-all self-start mt-2">
                  <span>View all questions</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>

              {/* Data Preview Card */}
              <div className="bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-sm flex flex-col gap-4 text-left">
                <div className="flex flex-col gap-0.5">
                  <h3 className="font-semibold text-[#0f172a] text-[16px]">Data Preview</h3>
                  <span className="text-[11px] text-[#64748b]">Showing first 5 rows</span>
                </div>

                <div className="overflow-x-auto w-full border border-slate-100 rounded-lg">
                  <table className="w-full text-left border-collapse text-[11px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 font-bold text-slate-500">
                        <th className="py-2 px-3">Respondent</th>
                        <th className="py-2 px-3">Purchase Date</th>
                        <th className="py-2 px-3">Satisfaction</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600 font-medium">
                      <tr className="border-b border-slate-50">
                        <td className="py-2 px-3">R-0001</td>
                        <td className="py-2 px-3">Jan 12, 2026</td>
                        <td className="py-2 px-3">9</td>
                      </tr>
                      <tr className="border-b border-slate-50">
                        <td className="py-2 px-3">R-0002</td>
                        <td className="py-2 px-3">Jan 12, 2026</td>
                        <td className="py-2 px-3">8</td>
                      </tr>
                      <tr className="border-b border-slate-50">
                        <td className="py-2 px-3">R-0003</td>
                        <td className="py-2 px-3">Jan 12, 2026</td>
                        <td className="py-2 px-3">7</td>
                      </tr>
                      <tr className="border-b border-slate-50">
                        <td className="py-2 px-3">R-0004</td>
                        <td className="py-2 px-3">Jan 13, 2026</td>
                        <td className="py-2 px-3">9</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">R-0005</td>
                        <td className="py-2 px-3">Jan 13, 2026</td>
                        <td className="py-2 px-3">10</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Security info */}
              <div className="flex items-center justify-center gap-2 p-4 bg-emerald-50/20 border border-emerald-100/30 rounded-2xl text-[12px] text-emerald-700/80">
                <ShieldCheck className="size-5 text-emerald-600 shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-emerald-800">Your data is secure and encrypted</span>
                  <span>We never share your data with anyone.</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {step === 3 && (
          /* ===================================================================
             STEP 3: CONFIGURE OPTIONS PAGE
             =================================================================== */
          <div className="flex gap-[32px] items-start w-full">

            {/* Left Column: Options Forms */}
            <div className="flex-[1_0_0] flex flex-col gap-[32px] min-w-px">

              {/* Header inside Left Column */}
              <div className="flex items-start justify-between w-full">
                <div className="flex flex-col gap-[6px] items-start text-left">
                  <h1 className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] text-[28px] leading-tight">
                    Configure Options
                  </h1>
                  <p className="font-['Inter:Regular',sans-serif] font-normal text-[#64748b] text-[14px] max-w-[700px]">
                    Customize how InSpin analyzes your survey data and generates AI insights.
                  </p>
                </div>

                <button className="bg-white border border-[#e2e8f0] hover:bg-slate-50 text-[#0f172a] font-semibold text-[13px] px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shrink-0 shadow-sm transition-all">
                  <Save className="size-4 text-slate-500" />
                  <span>Load saved preset</span>
                </button>
              </div>

              {/* SECTION 1: ANALYSIS FOCUS */}
              <div className="bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-sm flex flex-col gap-[20px] text-left">
                <div className="flex flex-col gap-1">
                  <h2 className="text-[16px] font-bold text-[#0f172a]">1. Analysis Focus</h2>
                  <p className="text-[13px] text-[#64748b]">What would you like to prioritize in this analysis?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 w-full">
                  {/* Option 1: All Insights */}
                  <div
                    onClick={() => setAnalysisFocus("all")}
                    className={`border rounded-xl p-4 cursor-pointer transition-all flex flex-col gap-2 ${analysisFocus === "all" ? 'border-emerald-600 bg-emerald-50/20 shadow-sm ring-1 ring-emerald-600' : 'border-[#e2e8f0] bg-white hover:border-slate-300'}`}
                  >
                    <div className="size-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700">
                      <Compass className="size-4" />
                    </div>
                    <span className="font-bold text-[13px] text-[#0f172a]">All Insights</span>
                    <span className="text-[11px] text-[#64748b] leading-relaxed">Comprehensive analysis across all questions.</span>
                  </div>

                  {/* Option 2: Key Drivers */}
                  <div
                    onClick={() => setAnalysisFocus("drivers")}
                    className={`border rounded-xl p-4 cursor-pointer transition-all flex flex-col gap-2 ${analysisFocus === "drivers" ? 'border-emerald-600 bg-emerald-50/20 shadow-sm ring-1 ring-emerald-600' : 'border-[#e2e8f0] bg-white hover:border-slate-300'}`}
                  >
                    <div className="size-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700">
                      <Zap className="size-4" />
                    </div>
                    <span className="font-bold text-[13px] text-[#0f172a]">Key Drivers</span>
                    <span className="text-[11px] text-[#64748b] leading-relaxed">Identify key factors driving satisfaction.</span>
                  </div>

                  {/* Option 3: Pain Points */}
                  <div
                    onClick={() => setAnalysisFocus("pain")}
                    className={`border rounded-xl p-4 cursor-pointer transition-all flex flex-col gap-2 ${analysisFocus === "pain" ? 'border-emerald-600 bg-emerald-50/20 shadow-sm ring-1 ring-emerald-600' : 'border-[#e2e8f0] bg-white hover:border-slate-300'}`}
                  >
                    <div className="size-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700">
                      <AlertCircle className="size-4" />
                    </div>
                    <span className="font-bold text-[13px] text-[#0f172a]">Pain Points</span>
                    <span className="text-[11px] text-[#64748b] leading-relaxed">Uncover the main issues and areas of concern.</span>
                  </div>

                  {/* Option 4: Trends Over Time */}
                  <div
                    onClick={() => setAnalysisFocus("trends")}
                    className={`border rounded-xl p-4 cursor-pointer transition-all flex flex-col gap-2 ${analysisFocus === "trends" ? 'border-emerald-600 bg-emerald-50/20 shadow-sm ring-1 ring-emerald-600' : 'border-[#e2e8f0] bg-white hover:border-slate-300'}`}
                  >
                    <div className="size-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700">
                      <LineChart className="size-4" />
                    </div>
                    <span className="font-bold text-[13px] text-[#0f172a]">Trends Over Time</span>
                    <span className="text-[11px] text-[#64748b] leading-relaxed">Analyze changes and patterns over time.</span>
                  </div>

                  {/* Option 5: Custom Focus */}
                  <div
                    onClick={() => setAnalysisFocus("custom")}
                    className={`border rounded-xl p-4 cursor-pointer transition-all flex flex-col gap-2 ${analysisFocus === "custom" ? 'border-emerald-600 bg-emerald-50/20 shadow-sm ring-1 ring-emerald-600' : 'border-[#e2e8f0] bg-white hover:border-slate-300'}`}
                  >
                    <div className="size-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700">
                      <Settings className="size-4" />
                    </div>
                    <span className="font-bold text-[13px] text-[#0f172a]">Custom Focus</span>
                    <span className="text-[11px] text-[#64748b] leading-relaxed">Choose specific questions or topics to analyze.</span>
                  </div>
                </div>
              </div>

              {/* SECTION 2: AI ANALYSIS SETTINGS */}
              <div className="bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-sm flex flex-col gap-[20px] text-left">
                <div className="flex flex-col gap-1">
                  <h2 className="text-[16px] font-bold text-[#0f172a]">2. AI Analysis Settings</h2>
                  <p className="text-[13px] text-[#64748b]">Configure how AI should process and interpret your data.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full border-b border-slate-100 pb-5">
                  {/* AI Model Select */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-semibold text-[#0f172a]">AI Model</label>
                    <div className="relative w-full">
                      <select
                        value={aiModel}
                        onChange={(e) => setAiModel(e.target.value)}
                        className="w-full appearance-none bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 pr-10 text-[13px] focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="latest">InSpin AI (Latest) - Recommended</option>
                        <option value="legacy">InSpin AI (Legacy)</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#64748b] pointer-events-none" />
                    </div>
                    <span className="text-[11px] text-[#64748b]">Most accurate for survey analysis</span>
                  </div>

                  {/* Sentiment Analysis Select */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-semibold text-[#0f172a]">Sentiment Analysis</label>
                    <div className="relative w-full">
                      <select
                        value={sentimentAnalysis}
                        onChange={(e) => setSentimentAnalysis(e.target.value)}
                        className="w-full appearance-none bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 pr-10 text-[13px] focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="advanced">Advanced (Detects emotions & intensity)</option>
                        <option value="standard">Standard (Positive / Negative / Neutral)</option>
                        <option value="disabled">Disabled</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#64748b] pointer-events-none" />
                    </div>
                  </div>

                  {/* Theme Detection */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-semibold text-[#0f172a]">Theme Detection</label>
                    <div className="relative w-full">
                      <select
                        value={themeDetection}
                        onChange={(e) => setThemeDetection(e.target.value)}
                        className="w-full appearance-none bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 pr-10 text-[13px] focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="auto">Auto-detect themes</option>
                        <option value="disabled">Disabled</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#64748b] pointer-events-none" />
                    </div>
                    <span className="text-[11px] text-[#64748b]">AI will identify themes from open-ended responses</span>
                  </div>

                  {/* Language */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-semibold text-[#0f172a]">Language</label>
                    <div className="relative w-full">
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full appearance-none bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 pr-10 text-[13px] focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="auto">Auto-detect (English)</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#64748b] pointer-events-none" />
                    </div>
                    <span className="text-[11px] text-[#64748b]">Detected from survey responses</span>
                  </div>
                </div>

                {/* Checks toggles */}
                <div className="flex flex-col gap-4">
                  {/* Data Quality Checks */}
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={qualityChecks}
                      onChange={() => setQualityChecks(!qualityChecks)}
                      className="size-4.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/30 accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex flex-col">
                      <span className="text-[13px] font-semibold text-[#0f172a]">Data Quality Checks</span>
                      <span className="text-[11px] text-[#64748b]">Detect inconsistencies, duplicates, and missing data</span>
                    </div>
                  </label>

                  {/* Statistical Significance */}
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={statSignificance}
                      onChange={() => setStatSignificance(!statSignificance)}
                      className="size-4.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/30 accent-emerald-600 cursor-pointer"
                    />
                    <div className="flex flex-col">
                      <span className="text-[13px] font-semibold text-[#0f172a]">Statistical Significance</span>
                      <span className="text-[11px] text-[#64748b]">Show significance for comparisons (95% confidence)</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* SECTION 3: OUTPUT PREFERENCES */}
              <div className="bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-sm flex flex-col gap-[20px] text-left">
                <div className="flex flex-col gap-1">
                  <h2 className="text-[16px] font-bold text-[#0f172a]">3. Output Preferences</h2>
                  <p className="text-[13px] text-[#64748b]">Choose how you want to explore and export your insights.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                  {/* Visualization */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-semibold text-[#0f172a]">Visualization Preference</label>
                    <div className="relative w-full">
                      <select
                        value={vizPreference}
                        onChange={(e) => setVizPreference(e.target.value)}
                        className="w-full appearance-none bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 pr-10 text-[13px] focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="auto">Auto (Best fit)</option>
                        <option value="bar">Bar charts only</option>
                        <option value="line">Line charts only</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#64748b] pointer-events-none" />
                    </div>
                  </div>

                  {/* Segment Comparison */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-semibold text-[#0f172a]">Segment Comparison</label>
                    <div className="relative w-full">
                      <select
                        value={segmentComparison}
                        onChange={(e) => setSegmentComparison(e.target.value)}
                        className="w-full appearance-none bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 pr-10 text-[13px] focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="top">Top Segments</option>
                        <option value="all">All Segments</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#64748b] pointer-events-none" />
                    </div>
                  </div>

                  {/* Open-ended responses */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-semibold text-[#0f172a]">Open-ended Responses</label>
                    <div className="relative w-full">
                      <select
                        value={openEndedSummary}
                        onChange={(e) => setOpenEndedSummary(e.target.value)}
                        className="w-full appearance-none bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 pr-10 text-[13px] focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="themes">Summarize with themes</option>
                        <option value="raw">Show raw responses</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#64748b] pointer-events-none" />
                    </div>
                  </div>

                  {/* Report format */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[13px] font-semibold text-[#0f172a]">Report Format</label>
                    <div className="relative w-full">
                      <select
                        value={reportFormat}
                        onChange={(e) => setReportFormat(e.target.value)}
                        className="w-full appearance-none bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 pr-10 text-[13px] focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      >
                        <option value="dashboard">Interactive Dashboard</option>
                        <option value="pdf">PDF Report</option>
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-[#64748b] pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Advanced Options Link */}
                <button className="text-[13px] font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 self-start mt-2">
                  <span>Advanced Options (Filters, Weighting, Custom Rules)</span>
                  <ChevronDown className="size-4" />
                </button>
              </div>

            </div>

            {/* Right Column: Sidebar Stats */}
            <div className="w-[380px] shrink-0 flex flex-col gap-6">

              {/* Analysis Preview Card */}
              <div className="bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-sm flex flex-col gap-5 text-left">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-[#0f172a] text-[16px]">Analysis Preview</h3>
                  <span className="bg-emerald-50 text-[#16a34a] border border-emerald-100 font-semibold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                    AI Insights
                  </span>
                </div>

                {/* File info */}
                <div className="flex items-center gap-3 p-3 bg-emerald-50/40 border border-emerald-100 rounded-xl">
                  <div className="size-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700 shrink-0 font-bold">
                    <FileSpreadsheet className="size-5" />
                  </div>
                  <div className="flex flex-col min-w-px flex-1">
                    <span className="font-semibold text-sm text-[#0f172a] truncate">Customer_Satisfaction_Survey_2026.xlsx</span>
                    <span className="text-[11px] text-[#64748b]">2.4 MB • Uploaded just now</span>
                  </div>
                </div>

                {/* Total Stats Grid */}
                <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-5">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider">Total Responses</span>
                    <span className="text-2xl font-bold text-[#0f172a]">2,847</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider">Total Questions</span>
                    <span className="text-2xl font-bold text-[#0f172a]">24</span>
                  </div>
                </div>

                {/* What will be analyzed list */}
                <div className="flex flex-col gap-3 border-b border-slate-100 pb-5">
                  <span className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">What will be analyzed</span>
                  <div className="flex flex-col gap-2.5 text-[13px] text-slate-700">
                    <div className="flex items-start gap-2">
                      <Check className="size-4 text-[#16a34a] shrink-0 mt-0.5" />
                      <span>24 questions across 8 question types</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="size-4 text-[#16a34a] shrink-0 mt-0.5" />
                      <span>2,847 complete responses</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="size-4 text-[#16a34a] shrink-0 mt-0.5" />
                      <span>Open-ended responses will be grouped into themes</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="size-4 text-[#16a34a] shrink-0 mt-0.5" />
                      <span>Comparisons across key segments</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="size-4 text-[#16a34a] shrink-0 mt-0.5" />
                      <span>Trends and correlations identified</span>
                    </div>
                  </div>
                </div>

                {/* Detected Segments */}
                <div className="flex flex-col gap-3 border-b border-slate-100 pb-5">
                  <span className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">Detected Segments (Top 5)</span>
                  <div className="flex flex-col gap-2.5 text-[13px]">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="font-semibold">Role Tenure</span>
                      <span className="text-slate-500 font-medium">3 groups</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="font-semibold">Job Site / Location</span>
                      <span className="text-slate-500 font-medium">5 locations</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="font-semibold">Department</span>
                      <span className="text-slate-500 font-medium">6 groups</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="font-semibold">Work Experience</span>
                      <span className="text-slate-500 font-medium">3 groups</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="font-semibold">Buyer</span>
                      <span className="text-slate-500 font-medium">4 groups</span>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 text-[13px] font-semibold text-emerald-600 hover:text-emerald-700 transition-all self-start mt-1">
                    <span>View all segments</span>
                    <ArrowRight className="size-4" />
                  </button>
                </div>

                {/* Estimated analysis time */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider">Estimated Analysis Time</span>
                  <span className="text-xl font-bold text-slate-850">~45 seconds</span>
                  <span className="text-[11px] text-slate-400">This may vary based on data size and complexity.</span>
                </div>
              </div>

              {/* Tip info */}
              <div className="flex items-center gap-3 p-4 bg-amber-50/20 border border-amber-100/30 rounded-2xl text-[12px] text-amber-700/90 text-left">
                <Sparkles className="size-5 text-amber-500 shrink-0" />
                <span><strong>Tip:</strong> Save this configuration as a preset to use for future surveys.</span>
              </div>

            </div>

          </div>
        )}

        {step === 4 && progress < 100 && (
          /* ===================================================================
             STEP 4: ANALYZE DATA (LOADING FLOW ANIMATION)
             =================================================================== */
          <div className="flex items-center justify-center w-full min-h-[500px]">
            <div className="bg-white border border-[#e2e8f0] rounded-[32px] p-12 max-w-lg w-full shadow-lg flex flex-col items-center justify-center text-center gap-8 relative overflow-hidden">
              {/* Pulse loading animation background effect */}
              <div className="absolute -inset-10 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 blur-3xl opacity-50 rounded-full" />

              <div className="relative size-24 flex items-center justify-center">
                {/* Circular spinner */}
                <div className="absolute inset-0 rounded-full border-4 border-emerald-100 animate-pulse" />
                <div className="absolute inset-0 rounded-full border-4 border-emerald-600 border-t-transparent animate-spin" />
                <Sparkles className="size-10 text-emerald-600 animate-bounce" />
              </div>

              <div className="flex flex-col gap-3 relative z-10">
                <h2 className="text-2xl font-bold text-[#0f172a]">Analyzing Survey Data</h2>
                <p className="text-sm text-[#64748b] max-w-sm mx-auto h-12 flex items-center justify-center font-medium">
                  {analysisPhase}
                </p>
              </div>

              {/* Progress bar container */}
              <div className="w-full flex flex-col gap-2 relative z-10">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-500 px-1">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden border border-slate-50 p-0.5">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-300 shadow-sm"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && progress === 100 && (
          /* ===================================================================
             STEP 4: ANALYZE DATA (DASHBOARD COMPLETED VIEW)
             =================================================================== */
          <div className="flex flex-col gap-6 w-full text-left">
            {/* Header banner */}
            <div className="flex items-start justify-between w-full">
              <div className="flex flex-col gap-[6px] items-start text-left">
                <h1 className="font-['Inter:Bold',sans-serif] font-bold text-[#0f172a] text-[28px] leading-tight">
                  Analyze Data
                </h1>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[#64748b] text-[14px]">
                  InSpin AI is analyzing your survey data and generating actionable insights.
                </p>
              </div>

              <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 font-semibold text-[13px] px-3.5 py-1.5 rounded-full flex items-center gap-2 shrink-0">
                <CheckCircle className="size-4.5 text-[#16a34a] fill-emerald-50" />
                <span>AI Analysis Complete</span>
                <span className="text-slate-400 font-normal">|</span>
                <span className="text-emerald-700/80 font-medium">Completed in 48 seconds</span>
                <button className="text-slate-400 hover:text-slate-600 transition-colors ml-1">
                  <RefreshCw className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Sub-tabs menu */}
            <div className="flex items-center gap-1 border-b border-slate-200 w-full overflow-x-auto scrollbar-none pb-px">
              {["AI Overview", "Themes", "Questions", "Segments", "Drivers", "Trends", "Cross-Tab", "Raw Data"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveSubTab(tab)}
                  className={`px-4 py-2.5 font-semibold text-[13.5px] border-b-2 transition-all -mb-px whitespace-nowrap ${activeSubTab === tab ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-500 hover:text-[#0f172a]'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Dashboard content grid */}
            <div className="flex gap-[32px] items-start w-full">

              {/* Left Column Dashboard */}
              <div className="flex-[1_0_0] flex flex-col gap-6 min-w-px">

                {/* 1. AI Insights Overview */}
                <div className="bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-sm flex flex-col gap-6 w-full">
                  <div className="flex items-center gap-2">
                    <Sparkle className="size-5 text-emerald-600 fill-emerald-100" />
                    <div className="flex flex-col">
                      <h3 className="font-bold text-[16px] text-[#0f172a]">AI Insights Overview</h3>
                      <span className="text-[12px] text-[#64748b]">Top highlights from your survey data</span>
                    </div>
                  </div>

                  {/* KPI Row grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 w-full">
                    {/* Overall Sat */}
                    <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-3 flex flex-col justify-between h-[110px] min-w-0">
                      <span className="text-[9px] font-bold text-[#64748b] uppercase tracking-wider leading-tight truncate">Overall Satisfaction (NPS)</span>
                      <div className="flex flex-wrap items-baseline gap-1 mt-1">
                        <span className="text-2xl font-extrabold text-[#0f172a]">42</span>
                        <span className="bg-emerald-50 text-[#16a34a] text-[9px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap">Good</span>
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1 font-semibold flex items-center gap-0.5 truncate">
                        <TrendingUp className="size-3 text-[#16a34a] shrink-0" />
                        <span className="truncate">8 vs prev survey</span>
                      </span>
                    </div>

                    {/* Top Positive Theme */}
                    <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-3 flex flex-col justify-between h-[110px] min-w-0">
                      <span className="text-[9px] font-bold text-[#64748b] uppercase tracking-wider leading-tight truncate">Top Positive Theme</span>
                      <div className="flex flex-wrap items-baseline gap-1 mt-1">
                        <span className="text-2xl font-extrabold text-[#0f172a]">68%</span>
                        <span className="bg-indigo-50 text-indigo-600 text-[9px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap truncate max-w-full">Service Quality</span>
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1 font-semibold truncate">of responses</span>
                    </div>

                    {/* Top Pain Point */}
                    <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-3 flex flex-col justify-between h-[110px] min-w-0">
                      <span className="text-[9px] font-bold text-[#64748b] uppercase tracking-wider leading-tight truncate">Top Pain Point</span>
                      <div className="flex flex-wrap items-baseline gap-1 mt-1">
                        <span className="text-2xl font-extrabold text-[#0f172a]">32%</span>
                        <span className="bg-rose-50 text-rose-600 text-[9px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap">Pricing</span>
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1 font-semibold truncate">of responses</span>
                    </div>

                    {/* Engagement Score */}
                    <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-3 flex flex-col justify-between h-[110px] min-w-0">
                      <span className="text-[9px] font-bold text-[#64748b] uppercase tracking-wider leading-tight truncate">Engagement Score</span>
                      <div className="flex flex-wrap items-baseline gap-1 mt-1">
                        <span className="text-2xl font-extrabold text-[#0f172a]">71</span>
                        <span className="bg-emerald-50 text-[#16a34a] text-[9px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap">High</span>
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1 font-semibold flex items-center gap-0.5 truncate">
                        <TrendingUp className="size-3 text-[#16a34a] shrink-0" />
                        <span className="truncate">8 vs prev survey</span>
                      </span>
                    </div>

                    {/* Response Rate */}
                    <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-3 flex flex-col justify-between h-[110px] min-w-0">
                      <span className="text-[9px] font-bold text-[#64748b] uppercase tracking-wider leading-tight truncate">Response Rate</span>
                      <div className="flex flex-wrap items-baseline gap-1 mt-1">
                        <span className="text-2xl font-extrabold text-[#0f172a]">2,847</span>
                        <span className="bg-emerald-50 text-[#16a34a] text-[9px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap">100%</span>
                      </div>
                      <span className="text-[9px] text-slate-400 mt-1 font-semibold truncate">Completed responses</span>
                    </div>
                  </div>

                  {/* Key Takeaway Banner */}
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex items-center justify-between gap-6">
                    <div className="flex items-start gap-3">
                      <div className="size-9 bg-[#16a34a] rounded-full flex items-center justify-center text-white shrink-0 mt-0.5">
                        <Sparkle className="size-4.5 text-white fill-white/10" />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[13px] font-bold text-[#14532d]">Key Takeaway</span>
                        <p className="text-[12px] text-emerald-800 leading-relaxed max-w-xl">
                          Customers are generally satisfied with your product (NPS 42). Service quality and ease of use are your strongest drivers. Pricing and missing features are the top areas needing improvement.
                        </p>
                      </div>
                    </div>
                    <button className="bg-white hover:bg-slate-50 border border-emerald-600/10 text-emerald-800 font-semibold text-[12px] px-4 py-2 rounded-lg shadow-sm shrink-0 flex items-center gap-1">
                      <span>View Full Summary</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </div>

                {/* Satisfaction Breakdown & Top Themes Side-by-Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  {/* Satisfaction Breakdown Card */}
                  <div className="bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-sm flex flex-col gap-5 text-left relative">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col">
                        <h3 className="font-bold text-[16px] text-[#0f172a]">Satisfaction Breakdown</h3>
                        <span className="text-[12px] text-[#64748b]">Overall satisfaction distribution</span>
                      </div>
                      <button className="text-[#94a3b8] hover:text-[#475569] p-1 rounded-md hover:bg-slate-50 transition-all">
                        <MoreVertical className="size-4" />
                      </button>
                    </div>

                    {/* Radial donut chart with SVG */}
                    <div className="flex items-center justify-center gap-6 py-2">
                      <div className="relative size-32">
                        {/* Donut sectors */}
                        <svg className="size-full transform -rotate-90" viewBox="0 0 36 36">
                          {/* Background grey */}
                          <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f1f5f9" strokeWidth="4" />
                          {/* Promoters (Green, 32%): strokeDasharray="32 68" offset 0 */}
                          <circle cx="18" cy="18" r="15.915" fill="none" stroke="#16a34a" strokeWidth="4" strokeDasharray="32 68" strokeDashoffset="0" />
                          {/* Passives (Yellow, 38%): strokeDasharray="38 62" offset 32 */}
                          <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="38 62" strokeDashoffset="-32" />
                          {/* Detractors (Red, 30%): strokeDasharray="30 70" offset 70 */}
                          <circle cx="18" cy="18" r="15.915" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="30 70" strokeDashoffset="-70" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                          <span className="text-lg font-extrabold text-[#0f172a]">2,847</span>
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Responses</span>
                        </div>
                      </div>

                      {/* Legend details */}
                      <div className="flex flex-col gap-2.5 text-[12px]">
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-[#16a34a]" />
                          <span className="text-slate-600 font-medium">Promoters (9-10)</span>
                          <span className="font-bold text-[#0f172a]">32%</span>
                          <span className="text-slate-400 text-[10px]">(912)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-[#f59e0b]" />
                          <span className="text-slate-600 font-medium">Passives (7-8)</span>
                          <span className="font-bold text-[#0f172a]">38%</span>
                          <span className="text-slate-400 text-[10px]">(1,082)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="size-2 rounded-full bg-[#ef4444]" />
                          <span className="text-slate-600 font-medium">Detractors (0-6)</span>
                          <span className="font-bold text-[#0f172a]">30%</span>
                          <span className="text-slate-400 text-[10px]">(853)</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom metrics grid */}
                    <div className="grid grid-cols-3 gap-2 border-t border-slate-50 pt-4 mt-1 text-center">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">NPS</span>
                        <span className="text-base font-extrabold text-[#0f172a]">42</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Promoters</span>
                        <span className="text-base font-extrabold text-[#16a34a]">32%</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Detractors</span>
                        <span className="text-base font-extrabold text-[#ef4444]">30%</span>
                      </div>
                    </div>
                  </div>

                  {/* Top Themes by Sentiment Card */}
                  <div className="bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-sm flex flex-col gap-5 text-left">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col">
                        <h3 className="font-bold text-[16px] text-[#0f172a]">Top Themes by Sentiment</h3>
                        <span className="text-[12px] text-[#64748b]">AI-detected themes and overall sentiment</span>
                      </div>
                      <button className="text-[#94a3b8] hover:text-[#475569] p-1 rounded-md hover:bg-slate-50 transition-all">
                        <MoreVertical className="size-4" />
                      </button>
                    </div>

                    {/* Row List */}
                    <div className="flex flex-col gap-3.5">
                      {/* Headers */}
                      <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-50">
                        <span>Theme</span>
                        <div className="flex items-center gap-6 w-32 justify-end">
                          <span className="text-emerald-600">POS</span>
                          <span className="text-amber-500">NEU</span>
                          <span className="text-rose-500">NEG</span>
                        </div>
                      </div>

                      {/* Row 1: Service Quality */}
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="font-bold text-slate-700">Service Quality</span>
                        <div className="w-32 h-2.5 rounded-full overflow-hidden flex bg-slate-100">
                          <div className="bg-[#16a34a] h-full" style={{ width: "70%" }} />
                          <div className="bg-[#f59e0b] h-full" style={{ width: "20%" }} />
                          <div className="bg-[#ef4444] h-full" style={{ width: "10%" }} />
                        </div>
                      </div>

                      {/* Row 2: Ease of Use */}
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="font-bold text-slate-700">Ease of Use</span>
                        <div className="w-32 h-2.5 rounded-full overflow-hidden flex bg-slate-100">
                          <div className="bg-[#16a34a] h-full" style={{ width: "65%" }} />
                          <div className="bg-[#f59e0b] h-full" style={{ width: "25%" }} />
                          <div className="bg-[#ef4444] h-full" style={{ width: "10%" }} />
                        </div>
                      </div>

                      {/* Row 3: Product Features */}
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="font-bold text-slate-700">Product Features</span>
                        <div className="w-32 h-2.5 rounded-full overflow-hidden flex bg-slate-100">
                          <div className="bg-[#16a34a] h-full" style={{ width: "55%" }} />
                          <div className="bg-[#f59e0b] h-full" style={{ width: "30%" }} />
                          <div className="bg-[#ef4444] h-full" style={{ width: "15%" }} />
                        </div>
                      </div>

                      {/* Row 4: Pricing */}
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="font-bold text-slate-700">Pricing</span>
                        <div className="w-32 h-2.5 rounded-full overflow-hidden flex bg-slate-100">
                          <div className="bg-[#16a34a] h-full" style={{ width: "20%" }} />
                          <div className="bg-[#f59e0b] h-full" style={{ width: "30%" }} />
                          <div className="bg-[#ef4444] h-full" style={{ width: "50%" }} />
                        </div>
                      </div>

                      {/* Row 5: Customer Support */}
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="font-bold text-slate-700">Customer Support</span>
                        <div className="w-32 h-2.5 rounded-full overflow-hidden flex bg-slate-100">
                          <div className="bg-[#16a34a] h-full" style={{ width: "60%" }} />
                          <div className="bg-[#f59e0b] h-full" style={{ width: "25%" }} />
                          <div className="bg-[#ef4444] h-full" style={{ width: "15%" }} />
                        </div>
                      </div>
                    </div>

                    <button className="flex items-center gap-1.5 text-[13px] font-semibold text-emerald-600 hover:text-emerald-700 transition-all self-start mt-2">
                      <span>View all themes</span>
                      <ArrowRight className="size-4" />
                    </button>
                  </div>
                </div>

                {/* NPS Trend Over Time Line Chart */}
                <div className="bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-sm flex flex-col gap-6 w-full text-left relative">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col">
                      <h3 className="font-bold text-[16px] text-[#0f172a]">NPS Trend Over Time</h3>
                      <span className="text-[12px] text-[#64748b]">Track changes in customer sentiment over time</span>
                    </div>

                    <div className="relative">
                      <select className="appearance-none bg-white border border-[#e2e8f0] rounded-lg px-3 py-1.5 pr-8 text-[12px] font-semibold text-slate-700 focus:outline-none cursor-pointer">
                        <option>Last 9 months</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 size-3.5 text-[#64748b]" />
                    </div>
                  </div>

                  {/* SVG Line Chart */}
                  <div className="relative w-full h-[240px] pt-4 px-2">
                    {/* Jan 25 flag/tooltip card */}
                    <div className="absolute top-[35px] right-[10px] bg-emerald-600 text-white rounded-lg px-3 py-1.5 text-center shadow-md flex flex-col shrink-0 z-10">
                      <span className="text-sm font-extrabold leading-none">42</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5 leading-none">Jan '25</span>
                    </div>

                    <svg className="w-full h-full overflow-visible" viewBox="0 0 600 160">
                      {/* Grid lines */}
                      <line x1="0" y1="40" x2="600" y2="40" stroke="#f1f5f9" strokeDasharray="3 3" />
                      <line x1="0" y1="80" x2="600" y2="80" stroke="#e2e8f0" />
                      <line x1="0" y1="120" x2="600" y2="120" stroke="#f1f5f9" strokeDasharray="3 3" />

                      {/* Area Gradient under line */}
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M 50 160 L 50 75 L 115 40 L 180 105 L 245 45 L 310 82 L 375 110 L 440 48 L 505 130 L 570 58 L 570 160 Z" fill="url(#chartGrad)" />

                      {/* Trend line */}
                      <path
                        d="M 50 75 L 115 40 L 180 105 L 245 45 L 310 82 L 375 110 L 440 48 L 505 130 L 570 58"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Data point dots */}
                      <circle cx="50" cy="75" r="4" fill="white" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="115" cy="40" r="4" fill="white" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="180" cy="105" r="4" fill="white" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="245" cy="45" r="4" fill="white" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="310" cy="82" r="4" fill="white" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="375" cy="110" r="4" fill="white" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="440" cy="48" r="4" fill="white" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="505" cy="130" r="4" fill="white" stroke="#10b981" strokeWidth="2.5" />
                      <circle cx="570" cy="58" r="4" fill="white" stroke="#10b981" strokeWidth="2.5" />
                    </svg>

                    {/* X axis labels */}
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold px-4 mt-2">
                      <span>May '24</span>
                      <span>Jun '24</span>
                      <span>Jul '24</span>
                      <span>Aug '24</span>
                      <span>Sep '24</span>
                      <span>Oct '24</span>
                      <span>Nov '24</span>
                      <span>Dec '24</span>
                      <span>Jan '25</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column Dashboard Sidebar */}
              <div className="w-[380px] shrink-0 flex flex-col gap-6">

                {/* Analysis Summary */}
                <div className="bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-sm flex flex-col gap-5 text-left">
                  <h3 className="font-semibold text-[#0f172a] text-[16px]">Analysis Summary</h3>

                  <div className="flex items-center gap-3 p-3 bg-[#f8fafc] border border-slate-100 rounded-xl">
                    <div className="size-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-700 shrink-0 font-bold">
                      <FileSpreadsheet className="size-5" />
                    </div>
                    <div className="flex flex-col min-w-px flex-1">
                      <span className="font-semibold text-sm text-[#0f172a] truncate">Customer_Satisfaction_Survey_2026.xlsx</span>
                      <span className="text-[11px] text-[#64748b]">2.4 MB • Uploaded just now</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-b border-slate-100 pb-5">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider">Total Responses</span>
                      <span className="text-2xl font-bold text-[#0f172a]">2,847</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-semibold text-[#64748b] uppercase tracking-wider">Total Questions</span>
                      <span className="text-2xl font-bold text-[#0f172a]">24</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-[11px] font-semibold text-[#64748b] uppercase tracking-wider">What was analyzed</span>
                    <div className="flex flex-col gap-2.5 text-[13px] text-slate-700">
                      <div className="flex items-start gap-2">
                        <Check className="size-4 text-[#16a34a] shrink-0 mt-0.5" />
                        <span>24 questions across 8 question types</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="size-4 text-[#16a34a] shrink-0 mt-0.5" />
                        <span>2,847 complete responses</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="size-4 text-[#16a34a] shrink-0 mt-0.5" />
                        <span>Open-ended responses grouped into themes</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="size-4 text-[#16a34a] shrink-0 mt-0.5" />
                        <span>Comparisons across key segments</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Check className="size-4 text-[#16a34a] shrink-0 mt-0.5" />
                        <span>Trends and correlations identified</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Actions */}
                <div className="bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-sm flex flex-col gap-4 text-left">
                  <h3 className="font-semibold text-[#0f172a] text-[16px]">AI Actions</h3>

                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between p-3 rounded-[12px] hover:bg-[#f8fafc] border border-transparent hover:border-slate-100 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="size-9 bg-[#eff6ff] rounded-lg flex items-center justify-center text-[#1d4ed8]">
                          <MessageSquare className="size-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-[13px] text-[#0f172a]">Ask a follow-up question</span>
                          <span className="text-[11px] text-[#64748b]">Dig deeper into any insight</span>
                        </div>
                      </div>
                      <ArrowRight className="size-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-[12px] hover:bg-[#f8fafc] border border-transparent hover:border-slate-100 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="size-9 bg-[#f0fdf4] rounded-lg flex items-center justify-center text-[#15803d]">
                          <Users className="size-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-[13px] text-[#0f172a]">Compare segments</span>
                          <span className="text-[11px] text-[#64748b]">See differences across groups</span>
                        </div>
                      </div>
                      <ArrowRight className="size-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-[12px] hover:bg-[#f8fafc] border border-transparent hover:border-slate-100 transition-all cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="size-9 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-700">
                          <FileDown className="size-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-[13px] text-[#0f172a]">Download report</span>
                          <span className="text-[11px] text-[#64748b]">Export insights and charts</span>
                        </div>
                      </div>
                      <ArrowRight className="size-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Analysis Quality */}
                <div className="bg-white border border-[#e2e8f0] rounded-[24px] p-6 shadow-sm flex flex-col gap-4 text-left">
                  <h3 className="font-semibold text-[#0f172a] text-[16px]">Analysis Quality</h3>

                  {/* Horizontal bar ratio quality */}
                  <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-100">
                    <div className="bg-[#16a34a] h-full" style={{ width: "51%" }} />
                    <div className="bg-[#f59e0b] h-full" style={{ width: "25%" }} />
                    <div className="bg-[#ef4444] h-full" style={{ width: "24%" }} />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold px-0.5">
                    <span className="text-emerald-600">51%</span>
                    <span className="text-amber-500">25%</span>
                    <span className="text-rose-500">24%</span>
                  </div>

                  {/* Quality criteria */}
                  <div className="flex flex-col gap-3.5 mt-2 text-[12.5px] border-b border-slate-50 pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-700">
                        <CheckCircle className="size-4 text-emerald-600 fill-emerald-50" />
                        <span>Data Completeness</span>
                      </div>
                      <span className="bg-emerald-50 text-[#16a34a] text-[10px] font-bold px-2 py-0.5 rounded-md">Excellent</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-700">
                        <CheckCircle className="size-4 text-emerald-600 fill-emerald-50" />
                        <span>Response Quality</span>
                      </div>
                      <span className="bg-emerald-50 text-[#16a34a] text-[10px] font-bold px-2 py-0.5 rounded-md">Good</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-700">
                        <CheckCircle className="size-4 text-emerald-600 fill-emerald-50" />
                        <span>Attention Checks</span>
                      </div>
                      <span className="bg-emerald-50 text-[#16a34a] text-[10px] font-bold px-2 py-0.5 rounded-md">Passed</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-slate-700">
                        <CheckCircle className="size-4 text-emerald-600 fill-emerald-50" />
                        <span>Duplicate Responses</span>
                      </div>
                      <span className="text-slate-500 font-semibold text-[11px]">12 removed</span>
                    </div>
                  </div>

                  <button className="text-[13px] font-semibold text-emerald-600 hover:text-emerald-700 transition-all self-center mt-1">
                    View Data Quality Report
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>

      {/* Sticky Bottom Footer Bar for Step 2 */}
      {step === 2 && (
        <div className="sticky bottom-0 w-full h-20 bg-white/70 backdrop-blur-md border-t border-[#e2e8f0] flex items-center justify-between px-10 shadow-[0_-8px_16px_rgba(15,23,42,0.04)] z-50 shrink-0">
          {/* Back button */}
          <button
            onClick={() => setStep(1)}
            className="flex items-center gap-2 text-[#475569] hover:text-[#0f172a] font-semibold text-[14px] py-2 px-4 rounded-lg hover:bg-slate-50 transition-all"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Upload</span>
          </button>

          {/* Central progress */}
          <div className="flex flex-col items-center gap-1.5 w-[300px]">
            <span className="text-[12px] text-[#475569] font-medium">
              {mappingData.filter(d => d.mapTo !== 'Select data type').length} of {mappingData.length} columns mapped
            </span>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#16a34a] h-full transition-all duration-300"
                style={{ width: `${(mappingData.filter(d => d.mapTo !== 'Select data type').length / mappingData.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold text-[14px] py-2.5 px-4 rounded-lg hover:bg-emerald-50 transition-all border border-emerald-600/10">
              <Sparkles className="size-4 text-[#16a34a] fill-[#16a34a]/10" />
              <span>Auto-map columns</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-[14px] py-2.5 px-5 rounded-lg shadow-sm transition-all"
            >
              <span>Continue</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* Sticky Bottom Footer Bar for Step 3 */}
      {step === 3 && (
        <div className="sticky bottom-0 w-full h-20 bg-white/70 backdrop-blur-md border-t border-[#e2e8f0] flex items-center justify-between px-10 shadow-[0_-8px_16px_rgba(15,23,42,0.04)] z-50 shrink-0">
          {/* Back button */}
          <button
            onClick={() => setStep(2)}
            className="flex items-center gap-2 text-[#475569] hover:text-[#0f172a] font-semibold text-[14px] py-2 px-4 rounded-lg hover:bg-slate-50 transition-all"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Map Columns</span>
          </button>

          {/* Central progress status */}
          <div className="flex items-center gap-2 text-emerald-800 text-[13px] bg-emerald-50/50 border border-emerald-100 rounded-full px-4 py-1.5 font-semibold">
            <CheckCircle className="size-4.5 text-[#16a34a] fill-emerald-50" />
            <span>You're ready to generate AI insights</span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-[#475569] hover:text-[#0f172a] font-semibold text-[14px] py-2.5 px-4 rounded-lg hover:bg-slate-50 transition-all border border-[#e2e8f0]">
              <Save className="size-4 text-slate-500" />
              <span>Save as preset</span>
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-[14px] py-2.5 px-5 rounded-lg shadow-sm transition-all"
            >
              <span>Continue to Analyze Data</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* Sticky Bottom Footer Bar for Step 4 (Completed) */}
      {step === 4 && progress === 100 && (
        <div className="sticky bottom-0 w-full h-20 bg-white/70 backdrop-blur-md border-t border-[#e2e8f0] flex items-center justify-between px-10 shadow-[0_-8px_16px_rgba(15,23,42,0.04)] z-50 shrink-0">
          {/* Back button */}
          <button
            onClick={() => setStep(3)}
            className="flex items-center gap-2 text-[#475569] hover:text-[#0f172a] font-semibold text-[14px] py-2 px-4 rounded-lg hover:bg-slate-50 transition-all"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Configure Options</span>
          </button>

          {/* Center actions */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-[#475569] hover:text-[#0f172a] font-semibold text-[13px] py-2 px-4 rounded-lg hover:bg-slate-50 transition-all border border-[#e2e8f0]">
              <Save className="size-4 text-slate-500" />
              <span>Save analysis as preset</span>
            </button>
            <button className="flex items-center gap-2 text-[#475569] hover:text-[#0f172a] font-semibold text-[13px] py-2 px-4 rounded-lg hover:bg-slate-50 transition-all border border-[#e2e8f0]">
              <Share2 className="size-4 text-slate-500" />
              <span>Share insights</span>
            </button>
          </div>

          {/* Right action */}
          <button
            onClick={() => {
              if (onExploreInsights) {
                onExploreInsights();
              } else {
                setStep(1);
              }
            }}
            className="flex items-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-[14px] py-2.5 px-5 rounded-lg shadow-sm transition-all"
          >
            <span>Explore Full Insights</span>
            <ArrowRight className="size-4" />
          </button>
        </div>
      )}

    </div>
  );
}
