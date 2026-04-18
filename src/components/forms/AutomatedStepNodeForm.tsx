import { useState, useEffect } from 'react'
import type { AutomatedStepNodeData, AutomationAction } from '../../types'

interface Props {
  data: AutomatedStepNodeData
  onChange: (patch: Partial<AutomatedStepNodeData>) => void
}

export function AutomatedStepNodeForm({ data, onChange }: Props) {
  const [actions, setActions] = useState<AutomationAction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/automations')
      .then((res) => res.json() as Promise<AutomationAction[]>)
      .then((result) => {
        setActions(result)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const selectedAction = actions.find((a) => a.id === data.actionId)

  const handleActionChange = (actionId: string) => {
    const action = actions.find((a) => a.id === actionId)
    const params: Record<string, string> = {}
    action?.params.forEach((p) => {
      params[p] = ''
    })
    onChange({
      actionId,
      actionParams: params,
      label: action?.label || 'Automated Step',
    })
  }

  const handleParamChange = (param: string, value: string) => {
    onChange({
      actionParams: { ...data.actionParams, [param]: value },
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium text-gray-400 block mb-1.5">
          Title
        </label>
        <input
          type="text"
          value={data.title || ''}
          onChange={(e) => onChange({ title: e.target.value, label: e.target.value || 'Automated Step' })}
          placeholder="e.g. Send Welcome Email"
          className="w-full rounded-lg bg-[#0f1117] border border-gray-700/50 px-3 py-2
                     text-sm text-gray-200 placeholder-gray-600
                     focus:outline-none focus:border-purple-500/50 transition-colors"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-gray-400 block mb-1.5">
          Action
        </label>
        {loading ? (
          <div className="flex items-center gap-2 text-xs text-gray-500 py-2">
            <div className="h-3 w-3 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
            Loading actions...
          </div>
        ) : (
          <select
            value={data.actionId || ''}
            onChange={(e) => handleActionChange(e.target.value)}
            className="w-full rounded-lg bg-[#0f1117] border border-gray-700/50 px-3 py-2
                       text-sm text-gray-200
                       focus:outline-none focus:border-purple-500/50 transition-colors
                       [color-scheme:dark]"
          >
            <option value="">Select an action...</option>
            {actions.map((action) => (
              <option key={action.id} value={action.id}>
                {action.label}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Dynamic param fields */}
      {selectedAction && selectedAction.params.length > 0 && (
        <div>
          <label className="text-xs font-medium text-gray-400 block mb-2">
            Parameters
          </label>
          <div className="space-y-3 pl-2 border-l-2 border-purple-500/20">
            {selectedAction.params.map((param) => (
              <div key={param}>
                <label className="text-[10px] font-medium text-gray-500 block mb-1 capitalize">
                  {param}
                </label>
                <input
                  type="text"
                  value={data.actionParams?.[param] || ''}
                  onChange={(e) => handleParamChange(param, e.target.value)}
                  placeholder={`Enter ${param}...`}
                  className="w-full rounded-lg bg-[#0f1117] border border-gray-700/50 px-3 py-1.5
                             text-xs text-gray-200 placeholder-gray-600
                             focus:outline-none focus:border-purple-500/50 transition-colors"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
