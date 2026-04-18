import { useCallback, useRef, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  type NodeTypes,
  useReactFlow,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { DraggableSidebar } from './components/sidebar/DraggableSidebar'
import { NodeFormPanel } from './components/forms/NodeFormPanel'
import { WorkflowSandboxPanel } from './components/sandbox/WorkflowSandboxPanel'
import { LandingPage } from './components/LandingPage'
import { PlansPage } from './components/PlansPage'
import {
  StartNode,
  TaskNode,
  ApprovalNode,
  AutomatedStepNode,
  EndNode,
} from './components/nodes'
import { useWorkflow } from './hooks/useWorkflow'
import { useWorkflowStore } from './store/workflowStore'
import type { NodeType } from './types'

const nodeTypes: NodeTypes = {
  startNode: StartNode,
  taskNode: TaskNode,
  approvalNode: ApprovalNode,
  automatedStepNode: AutomatedStepNode,
  endNode: EndNode,
}

function WorkflowCanvas({ onNavHome, onNavPlans }: { onNavHome: () => void; onNavPlans: () => void }) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const { screenToFlowPosition } = useReactFlow()
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, createNode } =
    useWorkflow()
  const {
    selectedNodeId,
    selectNode,
    deleteSelected,
    workflowTitle,
    setWorkflowTitle,
    exportWorkflow,
    importWorkflow,
    undo,
    redo,
  } = useWorkflowStore()

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      const type = event.dataTransfer.getData('application/reactflow') as NodeType
      if (!type) return

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      })

      createNode(type, position)
    },
    [screenToFlowPosition, createNode]
  )

  const onPaneClick = useCallback(() => {
    selectNode(null)
  }, [selectNode])

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Delete' || event.key === 'Backspace') {
        const target = event.target as HTMLElement
        if (
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT'
        )
          return
        deleteSelected()
      }
      if ((event.metaKey || event.ctrlKey) && event.key === 'z') {
        event.preventDefault()
        if (event.shiftKey) {
          redo()
        } else {
          undo()
        }
      }
    },
    [deleteSelected, undo, redo]
  )

  const handleExport = () => {
    const json = exportWorkflow()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${workflowTitle.replace(/\s+/g, '_').toLowerCase()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        const text = ev.target?.result as string
        importWorkflow(text)
      }
      reader.readAsText(file)
    }
    input.click()
  }

  return (
    <div
      className="relative flex flex-col h-screen w-screen overflow-hidden outline-none"
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      {/* ─── React Flow Canvas (Background Layer) ──────────────────── */}
      <div className="absolute inset-0 z-0" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          fitView
          proOptions={{ hideAttribution: true }}
          defaultEdgeOptions={{
            animated: true,
          }}
        >
          <Background
            variant={BackgroundVariant.Dots}
            gap={32}
            size={1.5}
            color="rgba(255, 255, 255, 0.05)"
          />
          <Controls 
            showInteractive={false} 
            position="bottom-left" 
            style={{ 
              marginBottom: '24px', 
              marginLeft: '320px', 
              border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '12px', 
              display: 'flex', 
              flexDirection: 'column', 
              overflow: 'hidden',
              backgroundColor: 'rgba(11, 12, 21, 0.95)'
            }} 
          />
          <MiniMap
            position="bottom-right"
            pannable
            zoomable
            nodeStrokeWidth={3}
            style={{ margin: '24px 380px 24px 24px', backgroundColor: 'rgba(11, 12, 21, 0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
            maskColor="rgba(0, 0, 0, 0.3)"
            nodeColor="rgba(255, 255, 255, 0.2)"
          />
        </ReactFlow>
      </div>

      {/* ─── Floating Top Toolbar Layer ────────────────────────────── */}
      <header className="glass-panel absolute top-6 left-6 right-6 z-10 flex items-center justify-between px-6 py-3 rounded-2xl">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            <img 
              src="/logo.png" 
              alt="HRnest" 
              className="w-10 h-10 mix-blend-screen opacity-90"
            />
            <button 
              onClick={onNavHome}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white hover:text-black transition-all group"
              title="Return to Home"
            >
               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
                  <path d="M15 18l-6-6 6-6" />
               </svg>
            </button>
            <input
              type="text"
              value={workflowTitle}
              onChange={(e) => setWorkflowTitle(e.target.value)}
              className="bg-transparent text-base font-semibold text-white border-none outline-none
                         focus:ring-0 hover:text-white/80 transition-colors w-[250px] placeholder-white/30"
              placeholder="Untitled Workflow"
            />
          </div>

          <div className="h-6 w-px bg-white/10" />

          <div className="flex items-center gap-3 text-xs text-white/50 font-medium tracking-wide">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 border border-white/5">
              <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              {nodes.length} N
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 border border-white/5">
              <span className="h-1.5 w-1.5 rounded-full bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
              {edges.length} E
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={undo}
            title="Undo (Ctrl+Z)"
            className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
          </button>
          <button
            onClick={redo}
            title="Redo (Ctrl+Shift+Z)"
            className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/></svg>
          </button>

          <div className="h-6 w-px bg-white/10 mx-2" />

          <button
            onClick={handleImport}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-white/70
                       hover:text-white hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/10"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Import
          </button>
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-white/70
                       hover:text-white hover:bg-white/10 transition-all duration-200 border border-transparent hover:border-white/10"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </button>

          <div className="h-6 w-px bg-white/10 mx-2" />

          <WorkflowSandboxPanel />

          <div className="h-6 w-px bg-white/10 mx-2" />

          <button 
            onClick={onNavPlans}
            className="px-6 py-1.5 rounded-xl border-[2px] border-white bg-[#030303] text-white font-bold tracking-wide shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:bg-white hover:shadow-[0_0_25px_rgba(255,255,255,0.6)] hover:text-black transition-all"
          >
            Plans
          </button>
        </div>
      </header>

      {/* ─── Floating Sidebar ────────────────────────────────────── */}
      <DraggableSidebar />

      {/* ─── Floating Settings Panel ─────────────────────────────── */}
      {selectedNodeId && <NodeFormPanel />}
    </div>
  )
}

export default function App() {
  const [view, setView] = useState<'landing' | 'app' | 'plans'>('landing')

  if (view === 'landing') {
    return <LandingPage onEnterApp={() => setView('app')} onNavPlans={() => setView('plans')} />
  }

  if (view === 'plans') {
    return <PlansPage onNavBack={() => setView('app')} />
  }

  return <WorkflowCanvas onNavHome={() => setView('landing')} onNavPlans={() => setView('plans')} />
}
