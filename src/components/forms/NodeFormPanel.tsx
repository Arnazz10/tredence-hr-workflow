import { useNodeForm } from '../../hooks/useNodeForm'
import { StartNodeForm } from './StartNodeForm'
import { TaskNodeForm } from './TaskNodeForm'
import { ApprovalNodeForm } from './ApprovalNodeForm'
import { AutomatedStepNodeForm } from './AutomatedStepNodeForm'
import { EndNodeForm } from './EndNodeForm'
import { useWorkflowStore } from '../../store/workflowStore'
import { getNodeAccentColor, getNodeTypeLabel } from '../../utils/validators'
import type {
  StartNodeData,
  TaskNodeData,
  ApprovalNodeData,
  AutomatedStepNodeData,
  EndNodeData,
  NodeType,
} from '../../types'

export function NodeFormPanel() {
  const { nodeType, nodeData, update, close } = useNodeForm()
  const deleteSelected = useWorkflowStore((s) => s.deleteSelected)

  if (!nodeType || !nodeData) return null

  const accentColor = getNodeAccentColor(nodeType as NodeType)
  const typeLabel = getNodeTypeLabel(nodeType as NodeType)

  return (
    <div className="w-[320px] min-w-[320px] bg-[#12141a] border-l border-gray-800/50 flex flex-col h-full overflow-hidden animate-slide-in-right">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <h3 className="text-sm font-semibold text-gray-200">
              {typeLabel} Node
            </h3>
          </div>
          <button
            onClick={close}
            className="text-gray-500 hover:text-gray-300 transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>
        <p className="text-[10px] text-gray-600 mt-1">
          Configure node properties
        </p>
      </div>

      {/* Form content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {nodeType === 'startNode' && (
          <StartNodeForm data={nodeData as StartNodeData} onChange={update} />
        )}
        {nodeType === 'taskNode' && (
          <TaskNodeForm data={nodeData as TaskNodeData} onChange={update} />
        )}
        {nodeType === 'approvalNode' && (
          <ApprovalNodeForm data={nodeData as ApprovalNodeData} onChange={update} />
        )}
        {nodeType === 'automatedStepNode' && (
          <AutomatedStepNodeForm
            data={nodeData as AutomatedStepNodeData}
            onChange={update}
          />
        )}
        {nodeType === 'endNode' && (
          <EndNodeForm data={nodeData as EndNodeData} onChange={update} />
        )}
      </div>

      {/* Footer actions */}
      <div className="px-5 py-3 border-t border-gray-800/50">
        <button
          onClick={() => {
            deleteSelected()
          }}
          className="w-full py-2 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium
                     hover:bg-red-500/20 transition-colors"
        >
          Delete Node
        </button>
      </div>
    </div>
  )
}
