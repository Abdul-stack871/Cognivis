import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import {
  Files,
  Database,
  Sparkles,
  MessageSquare,
  ChevronDown,
} from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState('Last 30 days');

  const topicData = [
    { topic: 'Machine Learning', count: 19 },
    { topic: 'Deep Learning', count: 14 },
    { topic: 'Computer Vision', count: 15 },
    { topic: 'Data Processing', count: 12 },
    { topic: 'Neural Networks', count: 10 },
  ];

  const docTypes = [
    { name: 'PDF', value: 50, color: '#A855F7' },
    { name: 'DOCX', value: 17, color: '#3B82F6' },
    { name: 'Images', value: 13, color: '#06B6D4' },
    { name: 'Excel', value: 8, color: '#F59E0B' },
    { name: 'Others', value: 12, color: '#10B981' },
  ];

  const timelineData = [
    { month: 'Jan', questions: 20 },
    { month: 'Feb', questions: 35 },
    { month: 'Mar', questions: 55 },
    { month: 'Apr', questions: 95 },
    { month: 'May', questions: 156 },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1500px] mx-auto min-h-full flex flex-col justify-between select-none">
      <div className="space-y-6">
        {/* Header matching Reference Screen 8 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-medium text-[#F7F4EB]">
              Document Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-[#8A948E] mt-0.5">
              Insights from your knowledge base
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#141C18] border border-[#233129] text-xs font-mono text-[#EDE8DC]">
              <span>{timeframe}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8A948E]" />
            </button>
          </div>
        </div>

        {/* Top 4 Stats Grid matching Reference Screen 8 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 24 Documents */}
          <div className="p-5 rounded-2xl bg-[#111714] border border-[#233129] flex items-center justify-between">
            <div>
              <div className="text-3xl font-mono font-bold text-[#F7F4EB]">24</div>
              <div className="text-xs text-[#8A948E] uppercase tracking-wider mt-0.5">Documents</div>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2 py-0.5 rounded-lg">
              +20%
            </span>
          </div>

          {/* 8,420 Knowledge Units */}
          <div className="p-5 rounded-2xl bg-[#111714] border border-[#233129] flex items-center justify-between">
            <div>
              <div className="text-3xl font-mono font-bold text-[#F7F4EB]">8,420</div>
              <div className="text-xs text-[#8A948E] uppercase tracking-wider mt-0.5">Knowledge Units</div>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2 py-0.5 rounded-lg">
              +35%
            </span>
          </div>

          {/* 37 Key Topics */}
          <div className="p-5 rounded-2xl bg-[#111714] border border-[#233129] flex items-center justify-between">
            <div>
              <div className="text-3xl font-mono font-bold text-[#F7F4EB]">37</div>
              <div className="text-xs text-[#8A948E] uppercase tracking-wider mt-0.5">Key Topics</div>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2 py-0.5 rounded-lg">
              +18%
            </span>
          </div>

          {/* 156 Questions */}
          <div className="p-5 rounded-2xl bg-[#111714] border border-[#233129] flex items-center justify-between">
            <div>
              <div className="text-3xl font-mono font-bold text-[#F7F4EB]">156</div>
              <div className="text-xs text-[#8A948E] uppercase tracking-wider mt-0.5">Questions</div>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2 py-0.5 rounded-lg">
              +42%
            </span>
          </div>
        </div>

        {/* 3 Panels Row matching Reference Screen 8 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Most Discussed Topics */}
          <div className="lg:col-span-5 rounded-3xl p-6 bg-[#111714] border border-[#233129] flex flex-col justify-between">
            <h3 className="font-serif text-base font-semibold text-[#F7F4EB] mb-4">
              Most Discussed Topics
            </h3>

            <div className="space-y-3.5 my-auto">
              {topicData.map((item) => (
                <div key={item.topic} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-sans text-[#D5D1C5]">
                    <span>{item.topic}</span>
                    <span className="font-mono text-emerald-400">{item.count}</span>
                  </div>
                  <div className="w-full h-2.5 bg-[#16201B] rounded-full overflow-hidden border border-[#283832]">
                    <div
                      className="h-full bg-cyan-500 rounded-full"
                      style={{ width: `${(item.count / 20) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center: Document Types (Donut) */}
          <div className="lg:col-span-3 rounded-3xl p-6 bg-[#111714] border border-[#233129] flex flex-col justify-between items-center">
            <h3 className="font-serif text-base font-semibold text-[#F7F4EB] self-start mb-2">
              Document Types
            </h3>

            <div className="w-40 h-40 relative my-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={docTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {docTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#0D1210" strokeWidth={2} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-full text-[11px] font-mono pt-2 border-t border-[#233129]">
              {docTypes.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5 text-[#8A948E]">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span>{item.name}</span>
                  <span className="text-white ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Questions Over Time */}
          <div className="lg:col-span-4 rounded-3xl p-6 bg-[#111714] border border-[#233129] flex flex-col justify-between">
            <h3 className="font-serif text-base font-semibold text-[#F7F4EB] mb-2">
              Questions Over Time
            </h3>

            <div className="h-48 w-full my-auto">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData}>
                  <defs>
                    <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#A855F7" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#A855F7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1C2621" vertical={false} />
                  <XAxis dataKey="month" stroke="#8A948E" fontSize={11} tickLine={false} />
                  <YAxis stroke="#8A948E" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#111714',
                      borderColor: '#233129',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="questions"
                    stroke="#C084FC"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#purpleGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Quote matching Reference Screen 8 */}
      <div className="pt-6 text-center border-t border-[#1C2520]">
        <p className="font-serif text-sm italic text-[#C5BEAF]">
          "Knowledge grows when it's explored."
        </p>
      </div>
    </div>
  );
};
