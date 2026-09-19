import React, { useState } from 'react';
import {
  Share2,
  User,
  Phone,
  Car,
  MapPin,
  FileText,
  Filter,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Shield,
  Info,
  ExternalLink,
  ChevronRight,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { Button } from '../buttons/Button';
import { NetworkGraphData, NetworkNode, NetworkEdge, NetworkNodeType } from '../../types';
import { CASE_NETWORK_DATA } from '../../data/unifiedCaseData';
import { NetworkService } from '../../services/networkService';

export interface CriminalNetworkViewProps {
  initialData?: NetworkGraphData;
  onOpenPersonProfile?: (personId: string) => void;
  onSelectNode?: (node: NetworkNode) => void;
}

export const CriminalNetworkView: React.FC<CriminalNetworkViewProps> = ({
  initialData = CASE_NETWORK_DATA,
  onOpenPersonProfile,
  onSelectNode
}) => {
  const [data, setData] = useState<NetworkGraphData>(initialData);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(
    data.nodes.find((n) => n.isFocus) || data.nodes[0]
  );
  const [filterType, setFilterType] = useState<'all' | NetworkNodeType>('all');
  const [minCalls, setMinCalls] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const filteredGraph = NetworkService.filterNetwork(data, filterType, minCalls);

  const getNodeColor = (type: NetworkNodeType, isFocus?: boolean) => {
    if (isFocus) return '#EF4444';
    switch (type) {
      case 'person':
        return '#2DD4FF';
      case 'phone':
        return '#A855F7';
      case 'vehicle':
        return '#22C55E';
      case 'location':
        return '#EC4899';
      case 'case':
        return '#F59E0B';
      default:
        return '#94A3B8';
    }
  };

  const getNodeIcon = (type: NetworkNodeType) => {
    switch (type) {
      case 'person':
        return <User className="w-3.5 h-3.5" />;
      case 'phone':
        return <Phone className="w-3.5 h-3.5" />;
      case 'vehicle':
        return <Car className="w-3.5 h-3.5" />;
      case 'location':
        return <MapPin className="w-3.5 h-3.5" />;
      case 'case':
        return <FileText className="w-3.5 h-3.5" />;
      default:
        return <Share2 className="w-3.5 h-3.5" />;
    }
  };

  const handleNodeClick = (node: NetworkNode) => {
    setSelectedNode(node);
    if (onSelectNode) {
      onSelectNode(node);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn font-sans select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#26313D] pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-[6px] bg-[#A855F7]/10 border border-[#A855F7]/30 text-[#A855F7]">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-[#2DD4FF] tracking-wider block">
              LINK ANALYSIS & SYNDICATE CORRELATION
            </span>
            <h2 className="text-[18px] font-bold text-[#F8FAFC]">
              Criminal Network & Association Graph
            </h2>
          </div>
        </div>

        {/* Legend */}
        <div className="hidden lg:flex items-center gap-4 text-[11px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
            <span className="text-[#94A3B8]">Suspect</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2DD4FF]" />
            <span className="text-[#94A3B8]">Associate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#A855F7]" />
            <span className="text-[#94A3B8]">Phone</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
            <span className="text-[#94A3B8]">Vehicle</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
            <span className="text-[#94A3B8]">Case</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Filters & Zoom */}
      <div className="p-3.5 rounded-[8px] bg-[#111820] border border-[#26313D] flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-[#64748B] flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter Nodes:
          </span>
          {(['all', 'person', 'phone', 'vehicle', 'location', 'case'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-2.5 py-1 rounded-[4px] text-[11px] font-mono uppercase transition-colors cursor-pointer ${
                filterType === type
                  ? 'bg-[#2DD4FF] text-[#0B0F14] font-bold'
                  : 'bg-[#0F151C] text-[#94A3B8] border border-[#26313D] hover:text-[#F8FAFC]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Zoom Buttons */}
          <div className="flex items-center gap-1 bg-[#0F151C] p-1 rounded-[6px] border border-[#26313D]">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.6))}
              className="p-1 rounded text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#151D26] cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-[#CBD5E1] px-1.5">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.7))}
              className="p-1 rounded text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#151D26] cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              className="p-1 rounded text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#151D26] cursor-pointer"
              title="Reset Zoom"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Graph Area with Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive SVG Canvas (2 cols) */}
        <div className="lg:col-span-2 rounded-[8px] bg-[#0B0F14] border border-[#26313D] p-4 relative overflow-hidden min-h-[460px] flex items-center justify-center">
          {/* Grid Background Pattern */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#2DD4FF 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* SVG Canvas */}
          <div
            className="w-full h-full min-h-[420px] transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
          >
            <svg viewBox="0 0 700 480" className="w-full h-full">
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="20"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#26313D" />
                </marker>
              </defs>

              {/* Render Edges */}
              {filteredGraph.edges.map((edge) => {
                const sourceNode = filteredGraph.nodes.find((n) => n.id === edge.source);
                const targetNode = filteredGraph.nodes.find((n) => n.id === edge.target);
                if (!sourceNode || !targetNode) return null;

                const sx = sourceNode.x || 350;
                const sy = sourceNode.y || 240;
                const tx = targetNode.x || 350;
                const ty = targetNode.y || 240;
                const isSelected =
                  selectedNode?.id === edge.source || selectedNode?.id === edge.target;

                return (
                  <g key={edge.id} className="transition-all duration-300">
                    <line
                      x1={sx}
                      y1={sy}
                      x2={tx}
                      y2={ty}
                      stroke={isSelected ? '#2DD4FF' : '#26313D'}
                      strokeWidth={isSelected ? edge.weight + 1 : edge.weight}
                      strokeDasharray={edge.type === 'call' ? 'none' : '4 4'}
                      opacity={isSelected ? 0.9 : 0.6}
                    />
                    {/* Edge Label Badge */}
                    <rect
                      x={(sx + tx) / 2 - 28}
                      y={(sy + ty) / 2 - 9}
                      width={56}
                      height={16}
                      rx={3}
                      fill="#0F151C"
                      stroke={isSelected ? '#2DD4FF' : '#26313D'}
                      strokeWidth={0.7}
                    />
                    <text
                      x={(sx + tx) / 2}
                      y={(sy + ty) / 2 + 2}
                      textAnchor="middle"
                      fill={isSelected ? '#2DD4FF' : '#94A3B8'}
                      fontSize={8}
                      fontFamily="monospace"
                    >
                      {edge.callCount ? `${edge.callCount} calls` : edge.label.slice(0, 8)}
                    </text>
                  </g>
                );
              })}

              {/* Render Nodes */}
              {filteredGraph.nodes.map((node) => {
                const nx = node.x || 350;
                const ny = node.y || 240;
                const isSelected = selectedNode?.id === node.id;
                const color = getNodeColor(node.type, node.isFocus);

                return (
                  <g
                    key={node.id}
                    transform={`translate(${nx}, ${ny})`}
                    onClick={() => handleNodeClick(node)}
                    className="cursor-pointer group"
                  >
                    {/* Outer Focus Ring */}
                    {isSelected && (
                      <circle
                        r={32}
                        fill="none"
                        stroke={color}
                        strokeWidth={1.5}
                        strokeDasharray="3 3"
                        className="animate-spin"
                        style={{ animationDuration: '10s' }}
                      />
                    )}

                    {/* Node Circle */}
                    <circle
                      r={node.isFocus ? 24 : 20}
                      fill="#0F151C"
                      stroke={color}
                      strokeWidth={isSelected ? 3 : 2}
                      className="transition-all"
                    />

                    {/* Glow for focus */}
                    {node.isFocus && (
                      <circle
                        r={28}
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth={1}
                        opacity={0.3}
                      />
                    )}

                    {/* Label inside or below */}
                    <text
                      y={node.isFocus ? 36 : 32}
                      textAnchor="middle"
                      fill="#F8FAFC"
                      fontSize={10}
                      fontWeight="bold"
                      fontFamily="sans-serif"
                    >
                      {node.label}
                    </text>
                    <text
                      y={node.isFocus ? 46 : 42}
                      textAnchor="middle"
                      fill="#94A3B8"
                      fontSize={8}
                      fontFamily="monospace"
                    >
                      {node.sublabel || node.category}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="absolute bottom-3 left-4 text-[10px] font-mono text-[#64748B]">
            Interactive Syndicate Topology • Click any node to inspect telemetry
          </div>
        </div>

        {/* Selected Entity Details Side Panel (1 col) */}
        <div className="rounded-[8px] bg-[#111820] border border-[#26313D] p-5 space-y-5 flex flex-col justify-between">
          {selectedNode ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#26313D] pb-3">
                <span className="text-[10px] font-mono uppercase text-[#2DD4FF]">
                  SELECTED ENTITY DOSSIER
                </span>
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold"
                  style={{
                    backgroundColor: `${getNodeColor(selectedNode.type, selectedNode.isFocus)}15`,
                    color: getNodeColor(selectedNode.type, selectedNode.isFocus),
                    borderColor: `${getNodeColor(selectedNode.type, selectedNode.isFocus)}40`,
                    borderWidth: '1px'
                  }}
                >
                  {selectedNode.type}
                </span>
              </div>

              <div>
                <h3 className="text-[17px] font-bold text-[#F8FAFC]">
                  {selectedNode.label}
                </h3>
                <span className="text-[12px] text-[#94A3B8]">
                  {selectedNode.sublabel || selectedNode.category}
                </span>
              </div>

              {/* Entity Metrics */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-2.5 rounded-[6px] bg-[#0F151C] border border-[#26313D]">
                  <span className="text-[10px] font-mono text-[#64748B] block uppercase">CDR CALLS</span>
                  <span className="text-[16px] font-mono font-bold text-[#F8FAFC]">
                    {selectedNode.callsCount || 0}
                  </span>
                </div>
                <div className="p-2.5 rounded-[6px] bg-[#0F151C] border border-[#26313D]">
                  <span className="text-[10px] font-mono text-[#64748B] block uppercase">CONTACTS</span>
                  <span className="text-[16px] font-mono font-bold text-[#2DD4FF]">
                    {selectedNode.uniqueContacts || 1}
                  </span>
                </div>
                <div className="p-2.5 rounded-[6px] bg-[#0F151C] border border-[#26313D]">
                  <span className="text-[10px] font-mono text-[#64748B] block uppercase">LINKED CASES</span>
                  <span className="text-[16px] font-mono font-bold text-[#F59E0B]">
                    {selectedNode.relatedCases || 1}
                  </span>
                </div>
                <div className="p-2.5 rounded-[6px] bg-[#0F151C] border border-[#26313D]">
                  <span className="text-[10px] font-mono text-[#64748B] block uppercase">LAST SEEN</span>
                  <span className="text-[11px] font-mono text-[#CBD5E1]">
                    {selectedNode.lastActivity ? '14 Sept 21:04' : 'Active'}
                  </span>
                </div>
              </div>

              {/* Attributes Details List */}
              {selectedNode.details && (
                <div className="p-3 rounded-[6px] bg-[#0F151C] border border-[#26313D] space-y-1.5 text-[12px]">
                  {Object.entries(selectedNode.details).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between">
                      <span className="text-[#64748B]">{k}:</span>
                      <span className="font-mono text-[#F8FAFC]">{v}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Primary phone */}
              {selectedNode.phone && (
                <div className="p-2.5 rounded-[6px] bg-[#151D26] border border-[#26313D] flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-1.5 text-[#94A3B8]">
                    <Phone className="w-3.5 h-3.5 text-[#2DD4FF]" />
                    <span>Primary Phone:</span>
                  </div>
                  <span className="font-mono text-[#2DD4FF] font-bold">{selectedNode.phone}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 text-center text-[12px] text-[#64748B]">
              Select a node in the graph to inspect entity telemetry.
            </div>
          )}

          {/* Action button */}
          <div className="pt-3 border-t border-[#26313D]">
            <Button
              variant="primary"
              size="sm"
              className="w-full justify-center"
              leftIcon={<ExternalLink className="w-3.5 h-3.5" />}
              onClick={() => onOpenPersonProfile && onOpenPersonProfile(selectedNode?.id || 'person-rahul-sharma')}
            >
              Open Full Person Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
