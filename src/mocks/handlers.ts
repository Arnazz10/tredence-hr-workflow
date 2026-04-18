import { http, HttpResponse, delay } from 'msw'
import type { SimulateRequest, SimulateStep } from '../types'
import { topologicalSort } from '../utils/validators'
import type { Node } from '@xyflow/react'
import type { WorkflowNodeData, NodeType } from '../types'

const automations = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject', 'body'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
  { id: 'notify_slack', label: 'Notify Slack', params: ['channel', 'message'] },
]

function getStepLabel(node: Node<WorkflowNodeData>): string {
  const nodeType = node.type as NodeType
  const data = node.data
  switch (nodeType) {
    case 'startNode':
      return `Workflow Started: ${data.label || 'Start'}`
    case 'taskNode':
      return `Task: ${data.label || 'Untitled Task'}`
    case 'approvalNode':
      return `Approval: ${data.label || 'Pending Approval'}`
    case 'automatedStepNode':
      return `Automated: ${data.label || 'Automated Step'}`
    case 'endNode':
      return `Workflow Completed: ${data.label || 'End'}`
    default:
      return data.label || 'Unknown Step'
  }
}

export const handlers = [
  // GET /automations
  http.get('/automations', async () => {
    await delay(300)
    return HttpResponse.json(automations)
  }),

  // POST /simulate
  http.post('/simulate', async ({ request }) => {
    await delay(800)
    const body = (await request.json()) as SimulateRequest
    const { nodes, edges } = body

    const rawNodes = nodes as unknown as Node<WorkflowNodeData>[]

    const sorted = topologicalSort(rawNodes, edges)

    const steps: SimulateStep[] = sorted.map((node) => ({
      nodeId: node.id,
      nodeType: node.type as string,
      label: getStepLabel(node),
      status: 'completed' as const,
    }))

    return HttpResponse.json({
      success: true,
      steps,
    })
  }),
]
