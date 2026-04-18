import { useCallback, useRef } from 'react'
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

function WorkflowCanvas() {
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
      className="flex flex-col flex-1 h-full overflow-hidden outline-none"
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      {/* ─── Top Toolbar ─────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-6 py-3 bg-[#12141a] border-b border-gray-800/50 shrink-0 z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/20">
              H
            </div>
            <input
              type="text"
              value={workflowTitle}
              onChange={(e) => setWorkflowTitle(e.target.value)}
              className="bg-transparent text-sm font-semibold text-gray-200 border-none outline-none
                         focus:ring-0 hover:text-white transition-colors w-[200px]"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-800/50 px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              {nodes.length} node{nodes.length !== 1 ? 's' : ''}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-800/50 px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              {edges.length} edge{edges.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={undo}
            title="Undo (Ctrl+Z)"
            className="p-2 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-800/50 transition-colors text-sm"
          >
            ↩
          </button>
          <button
            onClick={redo}
            title="Redo (Ctrl+Shift+Z)"
            className="p-2 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-800/50 transition-colors text-sm"
          >
            ↪
          </button>

          <div className="w-px h-5 bg-gray-800" />

          <button
            onClick={handleImport}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-gray-400
                       hover:text-gray-200 hover:bg-gray-800/50 transition-colors"
          >
            📂 Import
          </button>
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs text-gray-400
                       hover:text-gray-200 hover:bg-gray-800/50 transition-colors"
          >
            💾 Export
          </button>

          <div className="w-px h-5 bg-gray-800" />

          <WorkflowSandboxPanel />
        </div>
      </header>

      {/* ─── Canvas + Side Panel ─────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 h-full" ref={reactFlowWrapper}>
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
              style: { stroke: '#6366f1', strokeWidth: 2 },
            }}
            style={{ background: '#0f1117' }}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={24}
              size={1}
              color="#1f2937"
            />
            <Controls showInteractive={false} position="bottom-left" />
            <MiniMap
              position="bottom-right"
              pannable
              zoomable
              nodeStrokeWidth={3}
            />
          </ReactFlow>
        </div>

        {selectedNodeId && <NodeFormPanel />}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0a0b0f]">
      <DraggableSidebar />
      <WorkflowCanvas />
    </div>
  )
}
