import type { Edge } from '@xyflow/react'

// ─── Node Type Enum ───────────────────────────────────────────────
export type NodeType =
  | 'startNode'
  | 'taskNode'
  | 'approvalNode'
  | 'automatedStepNode'
  | 'endNode'

// ─── Key-Value Pair ───────────────────────────────────────────────
export interface KeyValuePair {
  key: string
  value: string
}

// ─── Node Data Types ──────────────────────────────────────────────
export interface StartNodeData {
  label: string
  startTitle: string
  metadata: KeyValuePair[]
  [key: string]: unknown
}

export interface TaskNodeData {
  label: string
  title: string
  description: string
  assignee: string
  dueDate: string
  customFields: KeyValuePair[]
  [key: string]: unknown
}

export interface ApprovalNodeData {
  label: string
  title: string
  approverRole: 'Manager' | 'HRBP' | 'Director'
  autoApproveThreshold: number
  [key: string]: unknown
}

export interface AutomatedStepNodeData {
  label: string
  title: string
  actionId: string
  actionParams: Record<string, string>
  [key: string]: unknown
}

export interface EndNodeData {
  label: string
  endMessage: string
  summaryFlag: boolean
  [key: string]: unknown
}

export type WorkflowNodeData =
  | StartNodeData
  | TaskNodeData
  | ApprovalNodeData
  | AutomatedStepNodeData
  | EndNodeData

// ─── Workflow Node ────────────────────────────────────────────────
export interface WorkflowNode {
  id: string
  type: NodeType
  position: { x: number; y: number }
  data: WorkflowNodeData
}

// ─── Automation Action ────────────────────────────────────────────
export interface AutomationAction {
  id: string
  label: string
  params: string[]
}

// ─── Simulation Types ─────────────────────────────────────────────
export interface SimulateRequest {
  nodes: WorkflowNode[]
  edges: Edge[]
}

export interface SimulateStep {
  nodeId: string
  nodeType: string
  label: string
  status: 'completed' | 'failed' | 'skipped'
}

export interface SimulateResponse {
  success: boolean
  steps: SimulateStep[]
}

// ─── Validation ───────────────────────────────────────────────────
export interface ValidationError {
  type: 'error' | 'warning'
  message: string
}
