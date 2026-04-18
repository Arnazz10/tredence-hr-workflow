import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import type { AutomatedStepNodeData } from '../../types'
import { useWorkflowStore } from '../../store/workflowStore'

type AutomatedStepNodeType = Node<AutomatedStepNodeData, 'automatedStepNode'>

export function AutomatedStepNode({ id, data, selected }: NodeProps<AutomatedStepNodeType>) {
  const selectNode = useWorkflowStore((s) => s.selectNode)
  const paramCount = data.actionParams ? Object.keys(data.actionParams).length : 0

  return (
    <div
      onClick={() => selectNode(id)}
      className={`
        relative min-w-[200px] rounded-xl bg-[#1a1d24] border-2
        transition-all duration-200 shadow-lg cursor-pointer
        ${selected ? 'border-purple-400 shadow-purple-400/20' : 'border-purple-500/30 hover:border-purple-400/60'}
      `}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-purple-500 !border-2 !border-purple-300 !rounded-full"
      />

      <div className="h-1.5 w-full rounded-t-xl bg-gradient-to-r from-purple-400 to-pink-500" />

      <div className="px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20 text-purple-400 text-xs">
            ⚡
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-400/70">
            Automated
          </span>
        </div>

        <p className="text-sm font-medium text-gray-100 truncate">
          {data.title || 'Automated Step'}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-2">
          {data.actionId && (
            <span className="inline-flex items-center rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] text-purple-400">
              {data.actionId}
            </span>
          )}
          {paramCount > 0 && (
            <span className="inline-flex items-center rounded-full bg-pink-500/10 px-2 py-0.5 text-[10px] text-pink-400">
              {paramCount} params
            </span>
          )}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-purple-500 !border-2 !border-purple-300 !rounded-full"
      />
    </div>
  )
}
