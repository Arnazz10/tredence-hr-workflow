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
    <div className="glass-panel absolute top-[100px] right-6 bottom-6 w-[340px] z-10 flex flex-col rounded-2xl overflow-hidden animate-slide-in-right">
      {/* Header */}
      <div className="px-6 py-5 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: accentColor,
                boxShadow: `0 0 10px ${accentColor}`,
              }}
            />
            <h3 className="text-sm font-semibold tracking-widest uppercase text-white">
              {typeLabel} Properties
            </h3>
          </div>
          <button
            onClick={close}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-all text-xs"
          >
            ✕
          </button>
        </div>
        <p className="text-[11px] text-white/40 mt-1.5 ml-5.5">
          ID: {nodeData.label || 'Node'}
        </p>
      </div>

      {/* Form content */}
      <div className="flex-1 overflow-y-auto px-6 py-5 custom-scrollbar">
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
      <div className="px-6 py-4 border-t border-white/5 bg-white/[0.01]">
        <button
          onClick={() => {
            deleteSelected()
          }}
          className="w-full py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 text-xs font-semibold uppercase tracking-wider
                     hover:bg-red-500/20 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all"
        >
          Delete Node
        </button>
      </div>
    </div>
  )
}
