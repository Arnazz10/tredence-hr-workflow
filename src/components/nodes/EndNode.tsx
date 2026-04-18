import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import type { EndNodeData } from '../../types'
import { useWorkflowStore } from '../../store/workflowStore'

type EndNodeType = Node<EndNodeData, 'endNode'>

export function EndNode({ id, data, selected }: NodeProps<EndNodeType>) {
  const selectNode = useWorkflowStore((s) => s.selectNode)

  return (
    <div
      onClick={() => selectNode(id)}
      className={`
        relative min-w-[220px] rounded-[24px] bg-[#0c0c0c] border
        transition-all duration-300 cursor-pointer
        ${selected ? 'border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.15)]' : 'border-white/20 hover:border-white/30'}
      `}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-[18px] !h-[18px] !bg-[#0c0c0c] !border-[1.5px] !border-white/40 !-top-[9.5px] z-10"
      />

      <div className="px-6 py-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-transparent border border-white/10 text-white/50">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
               <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
             </svg>
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-white/50">
            End Process
          </span>
        </div>

        <p className="text-base font-medium text-white/60 mt-3 truncate">
          {data.endMessage || 'Workflow Complete'}
        </p>
      </div>
    </div>
  )
}
