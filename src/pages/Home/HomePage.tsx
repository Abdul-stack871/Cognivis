import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  MessageSquare,
  GitFork,
  Network,
  Share2,
  BarChart2,
  BookOpen,
  Files,
  FileText,
  FileCode,
  FileSpreadsheet,
  FileImage,
  ArrowRight,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Database,
  ExternalLink,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { UploadModal } from '../../components/documents/UploadModal';
import { useDocuments } from '../../hooks/useDocuments';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedCapabilityFilter, setSelectedCapabilityFilter] = useState('All');
  const { uploadFile } = useDocuments();

  const recentDocs = [
    {
      name: 'Research_Paper.pdf',
      type: 'PDF',
      pages: '42 pages',
      time: '2 hours ago',
      color: 'bg-rose-500/20 text-rose-400 border-rose-800/40',
      icon: FileText,
      id: 'doc-1',
    },
    {
      name: 'System_Design.docx',
      type: 'DOCX',
      pages: '18 pages',
      time: '1 day ago',
      color: 'bg-blue-500/20 text-blue-400 border-blue-800/40',
      icon: FileText,
      id: 'doc-2',
    },
    {
      name: 'Dataset_Description.xlsx',
      type: 'XLSX',
      pages: '12 pages',
      time: '2 days ago',
      color: 'bg-emerald-500/20 text-emerald-400 border-emerald-800/40',
      icon: FileSpreadsheet,
      id: 'doc-3',
    },
    {
      name: 'Architecture_Diagram.png',
      type: 'Image',
      pages: '1 page',
      time: '3 days ago',
      color: 'bg-teal-500/20 text-teal-400 border-teal-800/40',
      icon: FileImage,
      id: 'doc-4',
    },
  ];

  const capabilities = [
    {
      title: 'Chat with Your Documents',
      desc: 'Get accurate, sourced answers instantly.',
      category: 'Understand',
      icon: MessageSquare,
      path: '/chat',
      color: 'bg-blue-600',
    },
    {
      title: 'Generate Workflows',
      desc: 'Turn processes into clear visual flows.',
      category: 'Visualize',
      icon: GitFork,
      path: '/workflows',
      color: 'bg-purple-600',
    },
    {
      title: 'Create Architectures',
      desc: 'Visualize systems, components and relationships.',
      category: 'Build',
      icon: Network,
      path: '/architecture',
      color: 'bg-emerald-600',
    },
    {
      title: 'Explore Knowledge Graphs',
      desc: 'Discover hidden connections between ideas.',
      category: 'Visualize',
      icon: Share2,
      path: '/knowledge-graph',
      color: 'bg-amber-600',
    },
    {
      title: 'Analyze Insights',
      desc: 'Find key topics, trends, and summaries.',
      category: 'Analyze',
      icon: BarChart2,
      path: '/analytics',
      color: 'bg-cyan-600',
    },
    {
      title: 'Organize Your Library',
      desc: 'Manage and search your knowledge.',
      category: 'Understand',
      icon: Files,
      path: '/documents',
      color: 'bg-stone-600',
    },
  ];

  const filteredCapabilities =
    selectedCapabilityFilter === 'All'
      ? capabilities
      : capabilities.filter((c) => c.category === selectedCapabilityFilter);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1500px] mx-auto">
      {/* ========================================================================= */}
      {/* 1. TOP HERO & GREETING ROW (EXACT REFERENCE COMPOSITION) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Main Hero Card (Large Scenic Window with Circular Aperture) */}
        <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-[#233129] shadow-2xl flex flex-col justify-between p-6 sm:p-8 min-h-[380px] bg-[#0A0E0C]">
          {/* Background Scenic Image with Circular Stone Portal */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/observatory-hero.jpg"
              alt="Observatory Scenic Portal"
              className="w-full h-full object-cover object-center opacity-45 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E0C] via-[#0A0E0C]/75 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E0C] via-transparent to-transparent" />
          </div>

          {/* Hero Header Content */}
          <div className="relative z-10 space-y-2 max-w-xl">
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              WELCOME TO COGNIVIS
            </span>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#F7F4EB] leading-[1.12]">
              Your Documents <br />
              <span className="italic font-light text-emerald-200">
                Deserve a Bigger Picture.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-[#A3ABA6] leading-relaxed pt-1">
              Upload. Ask. Visualize. Build. <br />
              Turn scattered information into connected knowledge.
            </p>
          </div>

          {/* Two Primary Action Cards Overlay */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-6 mt-4">
            {/* Upload Documents Card */}
            <div
              onClick={() => setUploadModalOpen(true)}
              className="p-4 rounded-2xl bg-[#111714]/90 backdrop-blur-md border border-[#2A3B33] hover:border-emerald-500/60 transition-all duration-200 cursor-pointer group shadow-lg flex items-center gap-3.5"
            >
              <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-700/50 text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#F7F4EB] group-hover:text-emerald-300 transition-colors">
                  Upload Documents
                </h3>
                <p className="text-[11px] text-[#8A948E] mt-0.5">
                  PDF, DOCX, TXT, Images, CSV and more
                </p>
              </div>
            </div>

            {/* Ask a Question Card */}
            <div
              onClick={() => navigate('/chat')}
              className="p-4 rounded-2xl bg-[#111714]/90 backdrop-blur-md border border-[#2A3B33] hover:border-blue-500/60 transition-all duration-200 cursor-pointer group shadow-lg flex items-center gap-3.5"
            >
              <div className="p-3 rounded-xl bg-blue-950/70 border border-blue-700/50 text-blue-400 group-hover:scale-105 transition-transform shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#F7F4EB] group-hover:text-blue-300 transition-colors">
                  Ask a Question
                </h3>
                <p className="text-[11px] text-[#8A948E] mt-0.5">
                  Get grounded answers with sources
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Greeting & Quick Actions */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-4">
          {/* Greeting Box */}
          <div className="p-6 rounded-3xl bg-[#111714] border border-[#233129] shadow-xl flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-[#8A948E]">Tue, 15 Apr 2025</span>
              <h2 className="font-serif text-2xl font-medium text-[#F7F4EB] mt-1">
                Good Morning, <br />
                <span className="text-emerald-300">Arun!</span>
              </h2>
              <p className="text-xs text-[#8A948E] mt-2">
                What will you explore today?
              </p>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="p-5 rounded-3xl bg-[#111714] border border-[#233129] shadow-xl flex-1 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8A948E] font-medium block mb-3">
              Quick Actions
            </span>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => navigate('/workflows')}
                className="p-3 rounded-2xl bg-[#16201B] hover:bg-[#1E2B25] border border-[#283832] hover:border-emerald-500/40 transition-all text-left group flex flex-col justify-between h-20"
              >
                <div className="p-1.5 rounded-lg bg-teal-950/80 text-teal-400 w-fit">
                  <GitFork className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-medium text-[#EDE8DC] group-hover:text-emerald-300 leading-tight">
                  Generate Workflow
                </span>
              </button>

              <button
                onClick={() => navigate('/architecture')}
                className="p-3 rounded-2xl bg-[#16201B] hover:bg-[#1E2B25] border border-[#283832] hover:border-purple-500/40 transition-all text-left group flex flex-col justify-between h-20"
              >
                <div className="p-1.5 rounded-lg bg-purple-950/80 text-purple-400 w-fit">
                  <Network className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-medium text-[#EDE8DC] group-hover:text-purple-300 leading-tight">
                  Create Architecture
                </span>
              </button>

              <button
                onClick={() => navigate('/knowledge-graph')}
                className="p-3 rounded-2xl bg-[#16201B] hover:bg-[#1E2B25] border border-[#283832] hover:border-amber-500/40 transition-all text-left group flex flex-col justify-between h-20"
              >
                <div className="p-1.5 rounded-lg bg-amber-950/80 text-amber-400 w-fit">
                  <Share2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-medium text-[#EDE8DC] group-hover:text-amber-300 leading-tight">
                  Explore Knowledge Graph
                </span>
              </button>

              <button
                onClick={() => navigate('/analytics')}
                className="p-3 rounded-2xl bg-[#16201B] hover:bg-[#1E2B25] border border-[#283832] hover:border-blue-500/40 transition-all text-left group flex flex-col justify-between h-20"
              >
                <div className="p-1.5 rounded-lg bg-blue-950/80 text-blue-400 w-fit">
                  <BarChart2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-medium text-[#EDE8DC] group-hover:text-blue-300 leading-tight">
                  Analyze Insights
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. STATS ROW (4 METRIC CARDS MATCHING REFERENCE) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 24 Documents */}
        <div className="p-5 rounded-2xl bg-[#111714] border border-[#233129] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-800/40 text-emerald-400">
              <Files className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-mono font-bold text-[#F7F4EB]">24</div>
              <div className="text-xs text-[#8A948E] uppercase tracking-wider">Documents</div>
            </div>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2 py-0.5 rounded-lg">
            +12%
          </span>
        </div>

        {/* 156 Questions Asked */}
        <div className="p-5 rounded-2xl bg-[#111714] border border-[#233129] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-blue-950/50 border border-blue-800/40 text-blue-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-mono font-bold text-[#F7F4EB]">156</div>
              <div className="text-xs text-[#8A948E] uppercase tracking-wider">Questions Asked</div>
            </div>
          </div>
          <span className="text-[11px] font-mono text-blue-400 bg-blue-950/50 border border-blue-800/40 px-2 py-0.5 rounded-lg">
            +28%
          </span>
        </div>

        {/* 37 Key Topics */}
        <div className="p-5 rounded-2xl bg-[#111714] border border-[#233129] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-950/50 border border-amber-800/40 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-mono font-bold text-[#F7F4EB]">37</div>
              <div className="text-xs text-[#8A948E] uppercase tracking-wider">Key Topics</div>
            </div>
          </div>
          <span className="text-[11px] font-mono text-amber-400 bg-amber-950/50 border border-amber-800/40 px-2 py-0.5 rounded-lg">
            +8%
          </span>
        </div>

        {/* 8,420 Knowledge Units */}
        <div className="p-5 rounded-2xl bg-[#111714] border border-[#233129] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-teal-950/50 border border-teal-800/40 text-teal-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-mono font-bold text-[#F7F4EB]">8,420</div>
              <div className="text-xs text-[#8A948E] uppercase tracking-wider">Knowledge Units</div>
            </div>
          </div>
          <span className="text-[11px] font-mono text-teal-400 bg-teal-950/50 border border-teal-800/40 px-2 py-0.5 rounded-lg">
            +35%
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. RECENT DOCUMENTS (WARM IVORY CARD) & YOUR KNOWLEDGE JOURNEY */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Recent Documents in distinct Warm Ivory Card from Reference */}
        <div className="lg:col-span-8 rounded-3xl p-6 bg-[#EBE7DD] text-[#141C18] border border-[#D5CFBF] shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-[#141C18]">
                Recent Documents
              </h3>
              <p className="text-xs text-[#5E6862]">
                Quick access to your vectorized knowledge vault
              </p>
            </div>
            <button
              onClick={() => navigate('/documents')}
              className="text-xs font-medium text-[#1A4D38] hover:text-[#0C3021] flex items-center gap-1 font-sans"
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {recentDocs.map((doc) => {
              const Icon = doc.icon;
              return (
                <div
                  key={doc.name}
                  onClick={() => navigate(`/documents/${doc.id}`)}
                  className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-[#DAD3C2] hover:border-[#10B981] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between h-32"
                >
                  <div className="flex items-center justify-between">
                    <span className="p-1.5 rounded-lg bg-[#EFECE4] text-[#1A4D38]">
                      <Icon className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] font-mono uppercase text-[#737E77] font-semibold">
                      {doc.type}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-medium text-xs text-[#141C18] group-hover:text-[#059669] transition-colors truncate">
                      {doc.name}
                    </h4>
                    <p className="text-[10px] text-[#737E77] font-mono mt-0.5">
                      {doc.pages} • {doc.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Your Knowledge Journey Flow */}
        <div className="lg:col-span-4 rounded-3xl p-6 bg-[#111714] border border-[#233129] shadow-xl flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="font-serif text-lg font-medium text-[#F7F4EB]">
              Your Knowledge Journey
            </h3>
            <p className="text-xs text-[#8A948E]">
              Connected cognitive progression
            </p>
          </div>

          <div className="space-y-3 my-auto">
            {/* Step 1: Upload */}
            <div className="flex items-center gap-3 p-2 rounded-xl bg-[#16201B] border border-[#283832]">
              <div className="w-7 h-7 rounded-lg bg-emerald-950 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center border border-emerald-800/40">
                1
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-[#F7F4EB] block">Upload</span>
                <span className="text-[10px] text-[#8A948E] block truncate">Bring in your sources</span>
              </div>
            </div>

            {/* Step 2: Understand */}
            <div className="flex items-center gap-3 p-2 rounded-xl bg-[#16201B] border border-[#283832]">
              <div className="w-7 h-7 rounded-lg bg-blue-950 text-blue-400 font-mono text-xs font-bold flex items-center justify-center border border-blue-800/40">
                2
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-[#F7F4EB] block">Understand</span>
                <span className="text-[10px] text-[#8A948E] block truncate">Extract deep context & citations</span>
              </div>
            </div>

            {/* Step 3: Visualize */}
            <div className="flex items-center gap-3 p-2 rounded-xl bg-[#16201B] border border-[#283832]">
              <div className="w-7 h-7 rounded-lg bg-purple-950 text-purple-400 font-mono text-xs font-bold flex items-center justify-center border border-purple-800/40">
                3
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-[#F7F4EB] block">Visualize</span>
                <span className="text-[10px] text-[#8A948E] block truncate">Generate graphs & flows</span>
              </div>
            </div>

            {/* Step 4: Build */}
            <div className="flex items-center gap-3 p-2 rounded-xl bg-[#16201B] border border-[#283832]">
              <div className="w-7 h-7 rounded-lg bg-amber-950 text-amber-400 font-mono text-xs font-bold flex items-center justify-center border border-amber-800/40">
                4
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-[#F7F4EB] block">Build</span>
                <span className="text-[10px] text-[#8A948E] block truncate">Turn insights into action</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. EXPLORE CAPABILITIES (6 CARDS WITH TABS MATCHING REFERENCE) */}
      {/* ========================================================================= */}
      <div className="rounded-3xl p-6 bg-[#111714] border border-[#233129] shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-serif text-xl font-medium text-[#F7F4EB]">
              Explore Capabilities
            </h3>
            <p className="text-xs text-[#8A948E]">
              Grounded multimodal studios built for research and synthesis
            </p>
          </div>

          {/* Category Tabs: All, Understand, Visualize, Analyze, Build */}
          <div className="flex items-center gap-1 bg-[#16201B] p-1 rounded-xl border border-[#283832] overflow-x-auto text-xs font-mono">
            {['All', 'Understand', 'Visualize', 'Analyze', 'Build'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedCapabilityFilter(tab)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  selectedCapabilityFilter === tab
                    ? 'bg-emerald-600 text-black font-semibold'
                    : 'text-[#8A948E] hover:text-[#EDE8DC]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Capabilities Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
          {filteredCapabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.title}
                onClick={() => navigate(cap.path)}
                className="p-4 rounded-2xl bg-[#16201B] border border-[#283832] hover:border-emerald-500/50 hover:bg-[#1A2621] transition-all cursor-pointer group flex flex-col justify-between h-44 shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-xl bg-[#0D1210] border border-[#233129] text-emerald-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h4 className="font-serif text-xs font-semibold text-[#F7F4EB] group-hover:text-emerald-300 transition-colors leading-snug">
                    {cap.title}
                  </h4>
                  <p className="text-[11px] text-[#8A948E] mt-1 line-clamp-3 leading-relaxed">
                    {cap.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-400 pt-2 border-t border-[#233129]">
                  <span>Launch</span>
                  <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        uploadFileService={uploadFile}
      />
    </div>
  );
};
