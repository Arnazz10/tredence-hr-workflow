import type { NodeType } from '../../types'

interface SidebarNodeCard {
  type: NodeType
  label: string
  icon: string
  color: string
  description: string
}

const nodeCards: SidebarNodeCard[] = [
  {
    type: 'startNode',
    label: 'Start',
    icon: '▶',
    color: 'from-green-500 to-emerald-600',
    description: 'Workflow entry point',
  },
  {
    type: 'taskNode',
    label: 'Task',
    icon: '✎',
    color: 'from-blue-500 to-cyan-600',
    description: 'Assign work to team',
  },
  {
    type: 'approvalNode',
    label: 'Approval',
    icon: '✓',
    color: 'from-amber-500 to-yellow-600',
    description: 'Require sign-off',
  },
  {
    type: 'automatedStepNode',
    label: 'Automated',
    icon: '⚡',
    color: 'from-purple-500 to-pink-600',
    description: 'Run automated action',
  },
  {
    type: 'endNode',
    label: 'End',
    icon: '■',
    color: 'from-red-500 to-rose-600',
    description: 'Workflow endpoint',
  },
]

export function DraggableSidebar() {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: NodeType
  ) => {
    event.dataTransfer.setData('application/reactflow', nodeType)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside className="w-[260px] min-w-[260px] bg-[#12141a] border-r border-gray-800/50 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-5 py-5 border-b border-gray-800/50">
        <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
          Node Palette
        </h2>
        <p className="text-xs text-gray-600 mt-1">
          Drag nodes onto the canvas
        </p>
      </div>

      {/* Node list */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {nodeCards.map((card) => (
          <div
            key={card.type}
            draggable
            onDragStart={(e) => onDragStart(e, card.type)}
            className="group relative flex items-center gap-3 rounded-xl bg-[#1a1d24] border border-gray-800/50
                       px-4 py-3.5 cursor-grab active:cursor-grabbing
                       transition-all duration-200
                       hover:border-gray-600/50 hover:bg-[#1e2129] hover:shadow-lg hover:translate-y-[-1px]"
          >
            {/* Icon */}
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg
                         bg-gradient-to-br ${card.color} text-white text-sm shadow-md`}
            >
              {card.icon}
            </div>

            {/* Text */}
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                {card.label}
              </p>
              <p className="text-[10px] text-gray-500 mt-0.5 truncate">
                {card.description}
              </p>
            </div>

            {/* Drag indicator */}
            <div className="ml-auto text-gray-700 group-hover:text-gray-500 transition-colors">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <circle cx="3" cy="2" r="1.2" />
                <circle cx="3" cy="6" r="1.2" />
                <circle cx="3" cy="10" r="1.2" />
                <circle cx="9" cy="2" r="1.2" />
                <circle cx="9" cy="6" r="1.2" />
                <circle cx="9" cy="10" r="1.2" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-gray-800/50">
        <p className="text-[10px] text-gray-600 text-center">
          HR Workflow Designer v1.0
        </p>
      </div>
    </aside>
  )
}
