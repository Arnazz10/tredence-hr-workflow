import { create } from 'zustand'
import {
  type Edge,
  type Connection,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type NodeChange,
  type EdgeChange,
  type Node,
} from '@xyflow/react'
import type { WorkflowNodeData, NodeType } from '../types'

// ─── History Snapshot ─────────────────────────────────────────────
interface HistorySnapshot {
  nodes: Node<WorkflowNodeData>[]
  edges: Edge[]
}

// ─── Store Interface ──────────────────────────────────────────────
interface WorkflowStore {
  nodes: Node<WorkflowNodeData>[]
  edges: Edge[]
  selectedNodeId: string | null
  workflowTitle: string

  // History
  past: HistorySnapshot[]
  future: HistorySnapshot[]

  // Actions
  setWorkflowTitle: (title: string) => void
  setNodes: (nodes: Node<WorkflowNodeData>[]) => void
  setEdges: (edges: Edge[]) => void
  onNodesChange: (changes: NodeChange<Node<WorkflowNodeData>>[]) => void
  onEdgesChange: (changes: EdgeChange[]) => void
  onConnect: (connection: Connection) => void
  addNode: (node: Node<WorkflowNodeData>) => void
  updateNodeData: (nodeId: string, data: Partial<WorkflowNodeData>) => void
  selectNode: (nodeId: string | null) => void
  deleteSelected: () => void
  getNodeById: (nodeId: string) => Node<WorkflowNodeData> | undefined
  getNodeType: (nodeId: string) => NodeType | undefined

  // History
  pushHistory: () => void
  undo: () => void
  redo: () => void

  // Import / Export
  exportWorkflow: () => string
  importWorkflow: (json: string) => void
}

export const useWorkflowStore = create<WorkflowStore>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  workflowTitle: 'Untitled Workflow',
  past: [],
  future: [],

  setWorkflowTitle: (title) => set({ workflowTitle: title }),

  setNodes: (nodes) => set({ nodes }),

  setEdges: (edges) => set({ edges }),

  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),

  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),

  onConnect: (connection) => {
    get().pushHistory()
    set((state) => ({
      edges: addEdge(
        { ...connection, animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
        state.edges
      ),
    }))
  },

  addNode: (node) => {
    get().pushHistory()
    set((state) => ({
      nodes: [...state.nodes, node],
    }))
  },

  updateNodeData: (nodeId, data) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, ...data } } : n
      ),
    })),

  selectNode: (nodeId) => set({ selectedNodeId: nodeId }),

  deleteSelected: () => {
    const { selectedNodeId, nodes, edges } = get()
    if (!selectedNodeId) return
    get().pushHistory()
    set({
      nodes: nodes.filter((n) => n.id !== selectedNodeId),
      edges: edges.filter(
        (e) => e.source !== selectedNodeId && e.target !== selectedNodeId
      ),
      selectedNodeId: null,
    })
  },

  getNodeById: (nodeId) => get().nodes.find((n) => n.id === nodeId),

  getNodeType: (nodeId) => {
    const node = get().nodes.find((n) => n.id === nodeId)
    return node?.type as NodeType | undefined
  },

  pushHistory: () => {
    const { nodes, edges, past } = get()
    set({
      past: [...past.slice(-30), { nodes: structuredClone(nodes), edges: structuredClone(edges) }],
      future: [],
    })
  },

  undo: () => {
    const { past, nodes, edges } = get()
    if (past.length === 0) return
    const prev = past[past.length - 1]
    set({
      past: past.slice(0, -1),
      future: [{ nodes: structuredClone(nodes), edges: structuredClone(edges) }, ...get().future],
      nodes: prev.nodes,
      edges: prev.edges,
    })
  },

  redo: () => {
    const { future, nodes, edges } = get()
    if (future.length === 0) return
    const next = future[0]
    set({
      future: future.slice(1),
      past: [...get().past, { nodes: structuredClone(nodes), edges: structuredClone(edges) }],
      nodes: next.nodes,
      edges: next.edges,
    })
  },

  exportWorkflow: () => {
    const { nodes, edges, workflowTitle } = get()
    return JSON.stringify({ workflowTitle, nodes, edges }, null, 2)
  },

  importWorkflow: (json) => {
    try {
      const data = JSON.parse(json) as {
        workflowTitle: string
        nodes: Node<WorkflowNodeData>[]
        edges: Edge[]
      }
      get().pushHistory()
      set({
        workflowTitle: data.workflowTitle || 'Imported Workflow',
        nodes: data.nodes || [],
        edges: data.edges || [],
        selectedNodeId: null,
      })
    } catch {
      console.error('Failed to import workflow: invalid JSON')
    }
  },
}))
