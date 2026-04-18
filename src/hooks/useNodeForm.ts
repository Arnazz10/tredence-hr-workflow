import { useCallback } from 'react'
import { useWorkflowStore } from '../store/workflowStore'
import type { WorkflowNodeData, NodeType } from '../types'

export function useNodeForm() {
  const { selectedNodeId, nodes, updateNodeData, selectNode } = useWorkflowStore()

  const selectedNode = selectedNodeId
    ? nodes.find((n) => n.id === selectedNodeId)
    : null

  const nodeType = selectedNode?.type as NodeType | undefined
  const nodeData = selectedNode?.data as WorkflowNodeData | undefined

  const update = useCallback(
    (patch: Partial<WorkflowNodeData>) => {
      if (selectedNodeId) {
        updateNodeData(selectedNodeId, patch)
      }
    },
    [selectedNodeId, updateNodeData]
  )

  const close = useCallback(() => {
    selectNode(null)
  }, [selectNode])

  return {
    selectedNodeId,
    selectedNode,
    nodeType,
    nodeData,
    update,
    close,
  }
}
