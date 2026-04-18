import { Handle, Position, type NodeProps, type Node } from '@xyflow/react'
import type { AutomatedStepNodeData } from '../../types'
import { useWorkflowStore } from '../../store/workflowStore'

type AutomatedStepNodeType = Node<AutomatedStepNodeData, 'automatedStepNode'>

export function AutomatedStepNode({ id, data, selected }: NodeProps<AutomatedStepNodeType>) {
  const selectNode = useWorkflowStore((s) => s.selectNode)

  return (
    <div
      onClick={() => selectNode(id)}
      className={`
        relative min-w-[220px] rounded-[24px] bg-[#0c0c0c] border
        transition-all duration-300 cursor-pointer
        ${selected ? 'border-violet-500/40 shadow-[0_0_20px_rgba(139,92,246,0.15)]' : 'border-white/10 hover:border-violet-500/30'}
      `}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-[18px] !h-[18px] !bg-[#0c0c0c] !border-[1.5px] !border-violet-500/40 !-top-[9.5px] z-10"
      />

      <div className="px-6 py-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
               <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
             </svg>
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-white/50">
            Automation
          </span>
        </div>

        <p className="text-base font-medium text-white/90 mt-3 truncate">
          {data.title || 'Automated Step'}
        </p>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-[18px] !h-[18px] !bg-[#0c0c0c] !border-[1.5px] !border-violet-500/40 !-bottom-[9.5px] z-10"
      />
    </div>
  )
}
