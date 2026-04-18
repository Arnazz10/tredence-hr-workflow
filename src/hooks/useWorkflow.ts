import { useCallback } from 'react'
import { useWorkflowStore } from '../store/workflowStore'
import type { NodeType, WorkflowNodeData, StartNodeData, TaskNodeData, ApprovalNodeData, AutomatedStepNodeData, EndNodeData } from '../types'
import type { Node } from '@xyflow/react'

let nodeCounter = 0

function getDefaultData(type: NodeType): WorkflowNodeData {
  switch (type) {
    case 'startNode':
      return {
        label: 'Start',
        startTitle: 'Workflow Start',
        metadata: [],
      } satisfies StartNodeData
    case 'taskNode':
      return {
        label: 'New Task',
        title: '',
        description: '',
        assignee: '',
        dueDate: '',
        customFields: [],
      } satisfies TaskNodeData
    case 'approvalNode':
      return {
        label: 'Approval',
        title: '',
        approverRole: 'Manager',
        autoApproveThreshold: 0,
      } satisfies ApprovalNodeData
    case 'automatedStepNode':
      return {
        label: 'Automated Step',
        title: '',
        actionId: '',
        actionParams: {},
      } satisfies AutomatedStepNodeData
    case 'endNode':
      return {
        label: 'End',
        endMessage: 'Workflow completed',
        summaryFlag: false,
      } satisfies EndNodeData
  }
}

export function useWorkflow() {
  const { addNode, nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useWorkflowStore()

  const createNode = useCallback(
    (type: NodeType, position: { x: number; y: number }) => {
      nodeCounter += 1
      const id = `node_${Date.now()}_${nodeCounter}`
      const data = getDefaultData(type)
      const newNode: Node<WorkflowNodeData> = {
        id,
        type,
        position,
        data,
      }
      addNode(newNode)
      return id
    },
    [addNode]
  )

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    createNode,
  }
}
