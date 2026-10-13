import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  FileText,
  FileSpreadsheet,
  FileImage,
  FileCode,
  MoreVertical,
  ExternalLink,
  Eye,
  Trash2,
  Edit2,
  Download,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { UploadModal } from '../../components/documents/UploadModal';
import { useDocuments } from '../../hooks/useDocuments';
import { useToast } from '../../hooks/useToast';
import { DocumentItem } from '../../types/document';

export const DocumentsPage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { documents, uploadFile, deleteDocument, renameDocument } = useDocuments();

  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [deleteModalDoc, setDeleteModalDoc] = useState<DocumentItem | null>(null);
  const [renameModalDoc, setRenameModalDoc] = useState<DocumentItem | null>(null);
  const [newNameInput, setNewNameInput] = useState('');
  const [openActionId, setOpenActionId] = useState<string | null>(null);

  const libraryRows = [
    {
      id: 'doc-1',
      name: 'Research_Paper.pdf',
      type: 'PDF',
      pages: 42,
      uploaded: '2 hours ago',
      color: 'text-rose-400 bg-rose-950/40 border-rose-800/40',
      icon: FileText,
    },
    {
      id: 'doc-2',
      name: 'System_Design.docx',
      type: 'DOCX',
      pages: 18,
      uploaded: '1 day ago',
      color: 'text-blue-400 bg-blue-950/40 border-blue-800/40',
      icon: FileText,
    },
    {
      id: 'doc-3',
      name: 'Dataset_Description.xlsx',
      type: 'XLSX',
      pages: 12,
      uploaded: '2 days ago',
      color: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/40',
      icon: FileSpreadsheet,
    },
    {
      id: 'doc-4',
      name: 'Architecture_Diagram.png',
      type: 'Image',
      pages: 1,
      uploaded: '4 days ago',
      color: 'text-teal-400 bg-teal-950/40 border-teal-800/40',
      icon: FileImage,
    },
    {
      id: 'doc-5',
      name: 'Project_Proposal.pdf',
      type: 'PDF',
      pages: 25,
      uploaded: '1 week ago',
      color: 'text-rose-400 bg-rose-950/40 border-rose-800/40',
      icon: FileText,
    },
    {
      id: 'doc-6',
      name: 'ML_System_Report.pdf',
      type: 'PDF',
      pages: 36,
      uploaded: '1 week ago',
      color: 'text-rose-400 bg-rose-950/40 border-rose-800/40',
      icon: FileText,
    },
    {
      id: 'doc-7',
      name: 'Notes_Summary.txt',
      type: 'TXT',
      pages: 8,
      uploaded: '1 week ago',
      color: 'text-stone-300 bg-stone-900 border-stone-800',
      icon: FileCode,
    },
  ];

  const filterTabs = [
    { key: 'all', label: 'All (24)' },
    { key: 'pdf', label: 'PDF (12)' },
    { key: 'docx', label: 'DOCX (4)' },
    { key: 'images', label: 'Images (2)' },
    { key: 'excel', label: 'Excel (3)' },
    { key: 'others', label: 'Others (3)' },
  ];

  const filteredRows = libraryRows.filter((row) => {
    if (activeTab === 'pdf' && row.type !== 'PDF') return false;
    if (activeTab === 'docx' && row.type !== 'DOCX') return false;
    if (activeTab === 'images' && row.type !== 'Image') return false;
    if (activeTab === 'excel' && row.type !== 'XLSX') return false;
    if (activeTab === 'others' && !['TXT', 'CSV'].includes(row.type)) return false;
    if (searchQuery.trim()) {
      return row.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const confirmRename = () => {
    if (renameModalDoc && newNameInput.trim()) {
      toast.success('Document Renamed', `Updated to ${newNameInput.trim()}`);
      setRenameModalDoc(null);
    }
  };

  const confirmDelete = () => {
    if (deleteModalDoc) {
      toast.info('Document Removed', `${deleteModalDoc.name} has been deleted.`);
      setDeleteModalDoc(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1500px] mx-auto min-h-full flex flex-col justify-between">
      <div className="space-y-6">
        {/* Header with Title and Search / Upload Button matching Reference */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl font-medium text-[#F7F4EB]">
              Document Library
            </h1>
            <p className="text-xs sm:text-sm text-[#8A948E] mt-0.5">
              Manage, organize and explore your documents
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-64">
              <Input
                leftIcon={<Search className="w-3.5 h-3.5" />}
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-2 text-xs bg-[#141C18]"
              />
            </div>

            <Button
              onClick={() => setUploadModalOpen(true)}
              variant="primary"
              size="md"
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-md"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              <span>Upload</span>
            </Button>
          </div>
        </div>

        {/* Filter Pills matching Reference */}
        <div className="flex items-center gap-2 border-b border-[#233129] pb-3 overflow-x-auto text-xs font-mono">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'bg-[#141C18] text-[#8A948E] hover:text-[#EDE8DC] border border-[#233129]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Document Table matching Reference Screen 3 */}
        <div className="rounded-2xl border border-[#233129] bg-[#111714] overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#0E1411] border-b border-[#233129] text-[#8A948E] font-mono text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6 font-medium">Name</th>
                  <th className="py-3.5 px-4 font-medium">Type</th>
                  <th className="py-3.5 px-4 font-medium">Pages</th>
                  <th className="py-3.5 px-4 font-medium">Uploaded</th>
                  <th className="py-3.5 px-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C2621]">
                {filteredRows.map((doc) => {
                  const Icon = doc.icon;
                  return (
                    <tr
                      key={doc.id}
                      className="hover:bg-[#16201B] transition-colors group cursor-pointer"
                      onClick={() => navigate(`/documents/${doc.id}`)}
                    >
                      {/* Name */}
                      <td className="py-3.5 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl border ${doc.color} shrink-0`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-medium text-[#F7F4EB] group-hover:text-blue-300 transition-colors block text-sm">
                              {doc.name}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Type */}
                      <td className="py-3.5 px-4 font-mono text-xs text-[#8A948E]">
                        <span className="px-2 py-0.5 rounded bg-[#16201B] border border-[#283832]">
                          {doc.type}
                        </span>
                      </td>

                      {/* Pages */}
                      <td className="py-3.5 px-4 font-mono text-xs text-[#D5D1C5]">
                        {doc.pages}
                      </td>

                      {/* Uploaded */}
                      <td className="py-3.5 px-4 font-mono text-xs text-[#8A948E]">
                        {doc.uploaded}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => navigate(`/documents/${doc.id}`)}
                            className="p-1.5 rounded-lg text-[#8A948E] hover:text-[#F7F4EB] hover:bg-[#1C2621] transition-colors"
                            title="Open Workspace"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setDeleteModalDoc(doc as any);
                            }}
                            className="p-1.5 rounded-lg text-[#8A948E] hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Atmospheric Bottom Row: Quote on Left + Stone Monument on Right */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#1C2520]">
        <div>
          <p className="font-serif text-lg italic text-[#C5BEAF] tracking-wide">
            "Organize today. Discover tomorrow."
          </p>
          <span className="text-[10px] font-mono text-[#6A7870] uppercase">
            Cognivis Vault Architecture
          </span>
        </div>

        {/* Stone Monument Image from Reference Screen 3 */}
        <div className="relative rounded-2xl overflow-hidden border border-[#2A3B33] shadow-lg w-72 h-28 bg-[#0D1210]">
          <img
            src="/images/stone-monument.jpg"
            alt="Documents Ideas Connections Impact"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1210]/90 via-transparent to-transparent flex items-end p-2.5">
            <span className="text-[10px] font-mono font-bold text-amber-200 tracking-wider">
              DOCUMENTS • IDEAS • CONNECTIONS • IMPACT
            </span>
          </div>
        </div>
      </div>

      {/* Modals */}
      <UploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        uploadFileService={uploadFile}
      />
    </div>
  );
};
