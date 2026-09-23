# InSpin • Customer Intelligence & Scheduling Infrastructure

> A production-grade design engineering portfolio project showcasing **headless design system architecture**, **WCAG 2.1 AA accessibility**, and **timezone-aware scheduling workflows** built with **Base UI** (`@base-ui/react`), **React 18**, **TypeScript**, and **Tailwind CSS**.

---

## ⚡ Overview & Product Intent

**InSpin** is a customer research and satisfaction analytics platform that turns unstructured survey feedback into actionable qualitative insights. More than a dashboard, InSpin bridges the gap between **analyzing feedback** and **engaging respondents directly** through an integrated, timezone-aware interview scheduling system.

This codebase demonstrates the complete craft of a **Senior Product Design Engineer**:
1. **Design System Craftsmanship:** Production-ready primitives built from scratch using headless Base UI.
2. **Scheduling Infrastructure:** Cross-timezone slot calculation using native `Intl.DateTimeFormat`.
3. **Accessibility First (a11y):** Full keyboard navigation, focus management, screen-reader semantics, and high-contrast tokens.
4. **Performance & Clean Code:** Zero template bloat, modular component boundaries, and sub-3.5s production builds.

---

## 🎨 Design System & Headless Primitives (`src/app/primitives/`)

Built on **Base UI** (`@base-ui/react`)—the foundational unstyled primitive library—the InSpin component library prioritizes composition, strict typing, and full keyboard ergonomics over rigid pre-styled widgets.

```
src/app/primitives/
├── Button.tsx     # Variant tokens (primary, secondary, emerald, ghost, destructive) + aria-busy loading
├── Dialog.tsx     # Accessible modal with focus trap, Escape key handling, and backdrop blur
├── Badge.tsx      # Semantic sentiment badges (success, warning, danger, neutral) with dot indicators
├── Tabs.tsx       # Roving tabindex keyboard navigation with smooth underline indicator
└── index.ts       # Barrel export
```

### 1. `Button` (`src/app/primitives/Button.tsx`)
- **Variant Tokens:** `primary` (emerald-900 brand), `secondary`, `emerald`, `outline`, `ghost`, and `destructive`.
- **States:** Built-in `loading` state with `aria-busy="true"` and an SVG micro-spinner.
- **Micro-interactions:** `active:scale-[0.98]` tactile press physics and `focus-visible:ring-2 focus-visible:ring-offset-2` outline tokens.

### 2. `Dialog` (`src/app/primitives/Dialog.tsx`)
- **Accessibility:** Built on `@base-ui/react/dialog` with automatic focus trapping inside the modal.
- **Escape Dismissal:** Dual-layer `Escape` key event listener ensuring quick dismissal on any platform.
- **Backdrop:** Non-intrusive backdrop blur (`backdrop-blur-xs`) that dismisses on outer click without bubbling issues.
- **ARIA:** Proper `role="dialog"`, `aria-modal="true"`, and automatic labeling.

### 3. `Badge` (`src/app/primitives/Badge.tsx`)
- **Tokens:** Semantic sentiment mapping (`success`, `warning`, `danger`, `info`, `neutral`).
- **Visuals:** Subtle tinted background pills with pulsing or solid dot status indicators.

### 4. `Tabs` (`src/app/primitives/Tabs.tsx`)
- **Keyboard Navigation:** Native Base UI tab list with roving tabindex (`ArrowLeft` / `ArrowRight` focus shifts).
- **Animation:** Active tab pill indicators with smooth transitions.

---

## 📅 Integrated Scheduling: Timezone-Aware Interview Scheduler

A central feature of InSpin is the **Respondent Interview Scheduler** (`src/app/components/ScheduleInterviewModal.tsx`), allowing researchers to instantly book follow-up research calls directly from respondent feedback rows.

### Key Capabilities:
- **Zero-Dependency Timezone Resolution:** Uses the browser's native `Intl.DateTimeFormat().resolvedOptions().timeZone` to automatically detect the researcher's local timezone.
- **Cross-Timezone Time Math:** Displays converted meeting times across 12 global timezones (UTC, EDT, CDT, MDT, PDT, GMT, CEST, GST, IST, SGT, JST, AEST).
- **Dynamic Duration Switching:** Instant duration selection (15m, 30m, 45m, 60m) recalculating available slot intervals on the fly.
- **Direct Research Handoff:** Pre-populates candidate context (name, email, role, customer NPS sentiment, feedback topic) directly into the booking confirmation.
- **Accessible Selection Grid:** Time slots formatted with semantic radio-like states, hover physics, and keyboard activation.

---

## ♿ Accessibility (WCAG 2.1 AA Standards)

The entire application was audited and updated to meet WCAG 2.1 AA requirements:

| Feature | Standard Applied | Implementation Detail |
|---|---|---|
| **Modal Dismissal** | WCAG 2.1.2 (No Keyboard Trap) | All modals (`Dialog`, `ScheduleInterviewModal`, `SearchResultsModal`, `ComparisonModal`, `ShareModal`) listen for `Escape` and outside clicks. |
| **Focus Visibility** | WCAG 2.4.7 (Focus Visible) | Every interactive element features high-contrast `focus-visible:ring-2` tokens with offset spacing. |
| **Semantic Buttons** | WCAG 4.1.2 (Name, Role, Value) | Replaced all clickable `<div>` elements with native `<button type="button">` including proper `aria-label` tags for icon-only buttons. |
| **Loading Indicators** | WCAG 4.1.3 (Status Messages) | Dynamic buttons communicate loading status via `aria-busy="true"` and `aria-live`. |
| **Color Contrast** | WCAG 1.4.3 (Contrast Minimum) | All text tokens maintain 4.5:1+ contrast against backgrounds (e.g., `#0f172a` against white/off-white, `#114e32` deep emerald headers). |

---

## 🏗 Architecture & Codebase Structure

```
src/
├── app/
│   ├── components/
│   │   ├── AIInsights.tsx               # AI theme cluster explorer with sentiment distribution
│   │   ├── AssistantDrawer.tsx          # Real-time research assistant chat drawer
│   │   ├── AuthScreen.tsx               # Enterprise authentication screen with demo credentials
│   │   ├── ComparisonModal.tsx          # Dual-workspace dataset comparison with trend charts
│   │   ├── DataImport.tsx               # Drag-and-drop Excel (.xlsx, .csv) survey ingestion
│   │   ├── HelpSupport.tsx              # Documentation and feedback center
│   │   ├── Logo.tsx                     # Semantic SVG brand icon and wordmark
│   │   ├── Notifications.tsx            # Team activity notifications and research updates
│   │   ├── Profile.tsx                  # User profile and account preferences
│   │   ├── Questions.tsx                # Question-by-question breakdown with NPS breakdown
│   │   ├── Reports.tsx                  # Executive report generator and share center
│   │   ├── ResearchOverview.tsx         # Executive dashboard with NPS metrics and activity feed
│   │   ├── Respondents.tsx              # Detailed survey respondents table with "Schedule Call" flow
│   │   ├── SavedFindings.tsx            # Pinned qualitative insights and research clips
│   │   ├── ScheduleInterviewModal.tsx   # Base UI timezone-aware interview booking flow
│   │   ├── SearchPopover.tsx            # Instant search suggestion overlay
│   │   ├── SearchResultsModal.tsx       # Semantic AI search results with quote citations
│   │   ├── Segments.tsx                 # Demographic and customer tier segmentation
│   │   ├── ShareModal.tsx               # Enterprise RBAC sharing modal with role selection
│   │   ├── SharingSettings.tsx          # Workspace access governance and collaborator roster
│   │   └── Themes.tsx                   # Qualitative customer sentiment cluster analyzer
│   ├── context/
│   │   └── SurveyDataContext.tsx        # React context managing active datasets, NPS math, & custom uploads
│   ├── primitives/                      # Base UI headless design system component library
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Dialog.tsx
│   │   ├── Tabs.tsx
│   │   └── index.ts
│   └── App.tsx                          # Core application shell, sidebar navigation, and glassmorphism workspace
├── main.tsx                             # React root entry point
└── styles/
    └── tailwind.css                     # Tailwind CSS v4 styling rules & theme tokens
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ (tested on Node 20 & 22)
- npm or pnpm

### Installation

```bash
# 1. Clone repository
git clone https://github.com/your-username/inspin-scheduler.git
cd inspin-scheduler

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Demo Credentials
Demo credentials are pre-configured on the login screen for instant testing:
- **Email:** `admin@inspin.com`
- **Password:** `Welcometonewworld`

*(You can also click the "Auto-fill" button on the login card.)*

### Production Build

```bash
npm run build
npm run preview
```

---

## 🛠 Tech Stack

- **Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler:** [Vite 6](https://vitejs.dev/) (3.19s production build)
- **Headless UI Primitives:** [@base-ui/react](https://base-ui.com/) (accessible unstyled primitives)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Data Visualizations:** [Recharts](https://recharts.org/)
- **Data Parsing:** [SheetJS / xlsx](https://sheetjs.com/) for drag-and-drop survey spreadsheet imports

---

## 📄 License & Attribution

MIT License. See [ATTRIBUTIONS.md](./ATTRIBUTIONS.md) for open-source library credits.