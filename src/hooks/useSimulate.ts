import { useState, useCallback } from 'react'
import { useWorkflowStore } from '../store/workflowStore'
import { validateWorkflow } from '../utils/validators'
import type { SimulateStep, SimulateResponse, ValidationError } from '../types'
import type { WorkflowNodeData } from '../types'
import type { Node } from '@xyflow/react'

export function useSimulate() {
  const { nodes, edges } = useWorkflowStore()
  const [steps, setSteps] = useState<SimulateStep[]>([])
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [isSimulating, setIsSimulating] = useState(false)
  const [showPanel, setShowPanel] = useState(false)

  const simulate = useCallback(async () => {
    // Validate first
    const typedNodes = nodes as Node<WorkflowNodeData>[]
    const validationErrors = validateWorkflow(typedNodes, edges)
    setErrors(validationErrors)
    setSteps([])

    if (validationErrors.some((e) => e.type === 'error')) {
      setShowPanel(true)
      return
    }

    setIsSimulating(true)
    setShowPanel(true)

    try {
      const response = await fetch('/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      })
      const data = (await response.json()) as SimulateResponse
      setSteps(data.steps)
    } catch {
      setErrors([{ type: 'error', message: 'Simulation request failed.' }])
    } finally {
      setIsSimulating(false)
    }
  }, [nodes, edges])

  const closePanel = useCallback(() => {
    setShowPanel(false)
    setSteps([])
    setErrors([])
  }, [])

  return {
    steps,
    errors,
    isSimulating,
    showPanel,
    simulate,
    closePanel,
  }
}
