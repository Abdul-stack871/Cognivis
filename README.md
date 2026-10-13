# Cognivis — Multimodal Document Intelligence and Visual Reasoning Platform

> **"From Documents To Deeper Understanding"**  
> *Upload. Ask. Visualize. Build.*

Cognivis is an AI-powered multimodal document intelligence platform that understands complex documents (PDFs, DOCX, CSV, Excel, Images) and transforms retrieved knowledge into grounded answers, visual pipelines, system architectures, interactive knowledge graphs, and actionable research insights.

---

## 🚀 How to Run the Application

The development server is already running in your background at:
👉 **[http://localhost:5173](http://localhost:5173)**

### If you want to start or restart it manually:

#### Method 1: Using the convenience script (Quickest on Windows)
Simply double-click `dev.bat` or run in PowerShell/CMD:
```powershell
.\dev.bat
```

#### Method 2: In Windows PowerShell
If you see the error `running scripts is disabled on this system (PSSecurityException)`, use `npm.cmd` instead of `npm`:
```powershell
npm.cmd run dev
```

*(Alternatively, to permanently allow scripts in your user profile:)*
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
npm run dev
```

#### Method 3: In Command Prompt (cmd.exe)
```cmd
cd "D:\ABDUL RAHMAN\Projects\Cognivis"
npm run dev
```

#### Method 4: Production Build
```powershell
npm.cmd run build
npm.cmd run preview
```

---

## 🎨 Implemented Screens (Exact Reference Visual Source of Truth)

All 9 primary screens from the reference master design have been faithfully recreated:

| # | Screen | Route | Description |
|---|---|---|---|
| **1** | **Landing Page** | [`/landing`](http://localhost:5173/landing) | Editorial cinematic hero with circular stone portal, quote card, and platform metrics. |
| **2** | **Dashboard (Home)** | [`/`](http://localhost:5173/) or [`/home`](http://localhost:5173/home) | Stone portal hero, primary action cards (*Upload Documents* & *Ask a Question*), Arun Kumar greeting, Quick Action grid, 4 KPI stats, warm ivory Recent Documents card, 4-step Knowledge Journey, and Explore Capabilities tabs. |
| **3** | **Document Library** | [`/documents`](http://localhost:5173/documents) | Document management with format filters (*All, PDF, DOCX, Images, Excel, Others*), upload triggers, document table, and bottom stepped stone monument (*"DOCUMENTS • IDEAS • CONNECTIONS • IMPACT"*). |
| **4** | **Document Workspace + Chat** | [`/documents/1`](http://localhost:5173/documents/1) | Split-screen workspace with multi-page thumbnail rail, zoom controls, Page 2 Proposed Architecture text/diagram, and grounded chat panel with source citations. |
| **5** | **Workflow Studio** | [`/workflows`](http://localhost:5173/workflows) | Interactive React Flow pipeline: *Input → Data Collection → Preprocessing → Feature Extraction → ML Model → Output*, with floating left toolbar and zoom controls. |
| **6** | **Architecture Studio** | [`/architecture`](http://localhost:5173/architecture) | Full-screen interactive system architecture canvas: *User → Frontend → Backend → Database / ML Model → External APIs*. |
| **7** | **Knowledge Graph** | [`/knowledge-graph`](http://localhost:5173/knowledge-graph) | Radial concept graph centered around *Machine Learning* with connected topics, node inspector, and category legend. |
| **8** | **Analytics Dashboard** | [`/analytics`](http://localhost:5173/analytics) | 4 KPI cards, Most Discussed Topics bar chart, Document Types donut distribution, and Questions Over Time trend chart. |
| **9** | **Settings** | [`/settings`](http://localhost:5173/settings) | Account preferences with profile avatar, Free Plan status, 2.4 GB / 10 GB storage progress bar, and editorial quote. |
| **—** | **Digital Notebook** | [`/notebook`](http://localhost:5173/notebook) | Research journal to pin grounded answers, create notes, and attach source references. |

---

## 🛠️ Technology Stack
- **React 19** + **TypeScript** + **Vite 8**
- **Tailwind CSS v4** with custom obsidian/emerald/gold/ivory palette
- **@xyflow/react (React Flow v12)** for Workflow & Architecture studios
- **Recharts** for analytics data visualizations
- **Framer Motion** for subtle micro-interactions
- **Lucide React** for iconography
