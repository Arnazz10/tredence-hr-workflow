import type { Node, Edge } from '@xyflow/react'
import type { ValidationError, WorkflowNodeData, NodeType } from '../types'

/**
 * Validate the workflow graph before simulation.
 */
export function validateWorkflow(
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[]
): ValidationError[] {
  const errors: ValidationError[] = []

  // 1. Must have exactly one StartNode
  const startNodes = nodes.filter((n) => n.type === 'startNode')
  if (startNodes.length === 0) {
    errors.push({ type: 'error', message: 'Workflow must have exactly one Start node.' })
  } else if (startNodes.length > 1) {
    errors.push({ type: 'error', message: 'Workflow must have only one Start node.' })
  }

  // 2. Must have at least one EndNode
  const endNodes = nodes.filter((n) => n.type === 'endNode')
  if (endNodes.length === 0) {
    errors.push({ type: 'error', message: 'Workflow must have at least one End node.' })
  }

  // 3. No disconnected nodes
  const connectedNodeIds = new Set<string>()
  edges.forEach((e) => {
    connectedNodeIds.add(e.source)
    connectedNodeIds.add(e.target)
  })
  if (nodes.length > 1) {
    const disconnected = nodes.filter((n) => !connectedNodeIds.has(n.id))
    if (disconnected.length > 0) {
      const labels = disconnected
        .map((n) => (n.data as WorkflowNodeData).label || n.id)
        .join(', ')
      errors.push({
        type: 'error',
        message: `Disconnected nodes found: ${labels}`,
      })
    }
  }

  // 4. No cycles (DFS-based)
  if (hasCycle(nodes, edges)) {
    errors.push({ type: 'error', message: 'Workflow contains a cycle – cycles are not allowed.' })
  }

  return errors
}

/**
 * Check for cycles in directed graph using DFS.
 */
function hasCycle(nodes: Node<WorkflowNodeData>[], edges: Edge[]): boolean {
  const adjacency = new Map<string, string[]>()
  nodes.forEach((n) => adjacency.set(n.id, []))
  edges.forEach((e) => {
    adjacency.get(e.source)?.push(e.target)
  })

  const visited = new Set<string>()
  const recStack = new Set<string>()

  function dfs(nodeId: string): boolean {
    visited.add(nodeId)
    recStack.add(nodeId)
    const neighbors = adjacency.get(nodeId) || []
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) return true
      } else if (recStack.has(neighbor)) {
        return true
      }
    }
    recStack.delete(nodeId)
    return false
  }

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (dfs(node.id)) return true
    }
  }
  return false
}

/**
 * Topological sort for simulation traversal order.
 */
export function topologicalSort(
  nodes: Node<WorkflowNodeData>[],
  edges: Edge[]
): Node<WorkflowNodeData>[] {
  const adjacency = new Map<string, string[]>()
  const inDegree = new Map<string, number>()
  nodes.forEach((n) => {
    adjacency.set(n.id, [])
    inDegree.set(n.id, 0)
  })
  edges.forEach((e) => {
    adjacency.get(e.source)?.push(e.target)
    inDegree.set(e.target, (inDegree.get(e.target) || 0) + 1)
  })

  const queue: string[] = []
  inDegree.forEach((deg, id) => {
    if (deg === 0) queue.push(id)
  })

  const sorted: string[] = []
  while (queue.length > 0) {
    const current = queue.shift()!
    sorted.push(current)
    for (const neighbor of adjacency.get(current) || []) {
      const newDeg = (inDegree.get(neighbor) || 0) - 1
      inDegree.set(neighbor, newDeg)
      if (newDeg === 0) queue.push(neighbor)
    }
  }

  const nodeMap = new Map(nodes.map((n) => [n.id, n]))
  return sorted.map((id) => nodeMap.get(id)!).filter(Boolean)
}

/**
 * Get a human-readable label for a node type.
 */
export function getNodeTypeLabel(type: NodeType): string {
  const labels: Record<NodeType, string> = {
    startNode: 'Start',
    taskNode: 'Task',
    approvalNode: 'Approval',
    automatedStepNode: 'Automated Step',
    endNode: 'End',
  }
  return labels[type] || type
}

/**
 * Get the accent color for a node type.
 */
export function getNodeAccentColor(type: NodeType): string {
  const colors: Record<NodeType, string> = {
    startNode: '#22c55e',
    taskNode: '#3b82f6',
    approvalNode: '#f59e0b',
    automatedStepNode: '#a855f7',
    endNode: '#ef4444',
  }
  return colors[type] || '#6b7280'
}
