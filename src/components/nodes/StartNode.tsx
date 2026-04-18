import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import type { StartNodeData } from '../../types'
import { useWorkflowStore } from '../../store/workflowStore'

type StartNodeType = Node<StartNodeData, 'startNode'>

export function StartNode({ id, data, selected }: NodeProps<StartNodeType>) {
  const selectNode = useWorkflowStore((s) => s.selectNode)

  return (
    <div
      onClick={() => selectNode(id)}
      className={`
        relative min-w-[220px] rounded-[24px] bg-[#0c0c0c] border
        transition-all duration-300 cursor-pointer
        ${selected ? 'border-emerald-500/40 shadow-[0_0_20px_rgba(52,211,153,0.15)]' : 'border-white/10 hover:border-emerald-500/30'}
      `}
    >
      <div className="px-6 py-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.1)]">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
               <polygon points="5 3 19 12 5 21 5 3"/>
             </svg>
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-white/50">
            Start Trigger
          </span>
        </div>

        <p className="text-base font-medium text-white/90 mt-3 truncate">
          {data.startTitle || 'Workflow Start'}
        </p>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-[18px] !h-[18px] !bg-[#0c0c0c] !border-[1.5px] !border-emerald-500/40 !-bottom-[9.5px] z-10"
      />
    </div>
  )
}
