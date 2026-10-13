import React, { useState } from 'react';
import {
  User,
  Cpu,
  Sliders,
  Palette,
  Edit2,
  HardDrive,
  Check,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useToast } from '../../hooks/useToast';

export const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'integrations' | 'preferences' | 'appearance'>('profile');
  const [name, setName] = useState('Arun Kumar');
  const [email, setEmail] = useState('arun@example.com');
  const toast = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Settings Saved', 'Profile preferences updated.');
  };

  const tabs = [
    { key: 'profile', label: 'Profile' },
    { key: 'integrations', label: 'API & Integrations' },
    { key: 'preferences', label: 'Preferences' },
    { key: 'appearance', label: 'Appearance' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl mx-auto min-h-full flex flex-col justify-between select-none">
      <div className="space-y-6">
        {/* Header matching Reference Screen 9 */}
        <div>
          <h1 className="font-serif text-3xl font-medium text-[#F7F4EB]">
            Settings
          </h1>
          <p className="text-xs sm:text-sm text-[#8A948E] mt-0.5">
            Manage your account and preferences
          </p>
        </div>

        {/* Tab Pills matching Reference Screen 9 */}
        <div className="flex items-center gap-2 border-b border-[#233129] pb-3 overflow-x-auto text-xs font-mono">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-1.5 rounded-xl transition-all ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'bg-[#141C18] text-[#8A948E] hover:text-[#EDE8DC] border border-[#233129]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Profile Card matching Reference Screen 9 */}
        {activeTab === 'profile' && (
          <div className="rounded-3xl p-6 sm:p-8 bg-[#111714] border border-[#233129] shadow-xl space-y-8">
            {/* User Avatar + Name + Plan + Edit Profile Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1E2B25]">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-mono font-bold text-lg flex items-center justify-center shadow-lg">
                  AK
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#F7F4EB]">{name}</h3>
                  <p className="text-xs text-[#8A948E]">{email}</p>
                  <span className="inline-block text-[10px] font-mono text-blue-400 bg-blue-950/60 border border-blue-800/40 px-2 py-0.5 rounded-full mt-1.5 font-semibold">
                    ● Free Plan
                  </span>
                </div>
              </div>

              <Button
                onClick={() => toast.info('Edit Profile Dialog')}
                variant="outline"
                size="sm"
                className="self-start sm:self-center border-[#2A3B33] text-xs font-mono"
              >
                <Edit2 className="w-3.5 h-3.5 mr-1.5" />
                <span>Edit Profile</span>
              </Button>
            </div>

            {/* Inputs: Name & Email matching Reference Screen 9 */}
            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-[#8A948E] block mb-1.5">
                    Name
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[#16201B] border-[#283832] text-xs font-sans"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-[#8A948E] block mb-1.5">
                    Email
                  </label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#16201B] border-[#283832] text-xs font-sans"
                  />
                </div>
              </div>

              {/* Storage Usage matching Reference Screen 9 */}
              <div className="pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8A948E]">Storage Usage</span>
                  <span className="text-[#F7F4EB] font-bold">2.4 GB of 10 GB (24%)</span>
                </div>
                <div className="w-full h-2.5 bg-[#16201B] rounded-full overflow-hidden border border-[#283832]">
                  <div className="h-full bg-blue-500 rounded-full w-[24%]" />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="submit" variant="primary" size="md" className="bg-blue-600 text-white px-6">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* API & Integrations Tab */}
        {activeTab === 'integrations' && (
          <div className="rounded-3xl p-6 bg-[#111714] border border-[#233129] shadow-xl space-y-4 text-xs font-mono">
            <h3 className="font-serif text-lg text-white font-medium">Model & Vector Gateways</h3>
            <div className="p-4 rounded-xl bg-[#16201B] border border-[#283832] space-y-1">
              <div className="text-emerald-400 font-bold">LLM Ingestion Model</div>
              <div className="text-[#8A948E]">Anthropic Claude 3.7 / OpenAI GPT-4o (Grounded)</div>
            </div>
            <div className="p-4 rounded-xl bg-[#16201B] border border-[#283832] space-y-1">
              <div className="text-blue-400 font-bold">Vector Database</div>
              <div className="text-[#8A948E]">Qdrant Cluster (11ms p99 latency)</div>
            </div>
          </div>
        )}

        {/* Preferences & Appearance */}
        {(activeTab === 'preferences' || activeTab === 'appearance') && (
          <div className="rounded-3xl p-6 bg-[#111714] border border-[#233129] shadow-xl space-y-4 text-xs">
            <h3 className="font-serif text-lg text-white font-medium">Observatory Theme & Display</h3>
            <p className="text-[#8A948E]">
              Current mode: <strong>Deep Forest Obsidian</strong> with warm ivory highlights and natural ambient lighting.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Right Quote matching Reference Screen 9 */}
      <div className="pt-8 text-right border-t border-[#1C2520]">
        <p className="font-serif text-sm italic text-[#C5BEAF]">
          "A smarter you, builds a brighter tomorrow."
        </p>
      </div>
    </div>
  );
};
