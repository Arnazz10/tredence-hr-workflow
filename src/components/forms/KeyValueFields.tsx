import type { KeyValuePair } from '../../types'

interface KeyValueFieldsProps {
  label: string
  pairs: KeyValuePair[]
  onChange: (pairs: KeyValuePair[]) => void
  keyPlaceholder?: string
  valuePlaceholder?: string
}

export function KeyValueFields({
  label,
  pairs,
  onChange,
  keyPlaceholder = 'Key',
  valuePlaceholder = 'Value',
}: KeyValueFieldsProps) {
  const addPair = () => {
    onChange([...pairs, { key: '', value: '' }])
  }

  const removePair = (index: number) => {
    onChange(pairs.filter((_, i) => i !== index))
  }

  const updatePair = (index: number, field: 'key' | 'value', val: string) => {
    const updated = pairs.map((pair, i) =>
      i === index ? { ...pair, [field]: val } : pair
    )
    onChange(updated)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-medium text-gray-400">{label}</label>
        <button
          type="button"
          onClick={addPair}
          className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400
                     hover:bg-indigo-500/30 transition-colors"
        >
          + Add
        </button>
      </div>

      {pairs.length === 0 && (
        <p className="text-[10px] text-gray-600 italic">No entries yet</p>
      )}

      <div className="space-y-2">
        {pairs.map((pair, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <input
              type="text"
              value={pair.key}
              onChange={(e) => updatePair(idx, 'key', e.target.value)}
              placeholder={keyPlaceholder}
              className="flex-1 rounded-lg bg-[#0f1117] border border-gray-700/50 px-3 py-1.5
                         text-xs text-gray-200 placeholder-gray-600
                         focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
            <input
              type="text"
              value={pair.value}
              onChange={(e) => updatePair(idx, 'value', e.target.value)}
              placeholder={valuePlaceholder}
              className="flex-1 rounded-lg bg-[#0f1117] border border-gray-700/50 px-3 py-1.5
                         text-xs text-gray-200 placeholder-gray-600
                         focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
            <button
              type="button"
              onClick={() => removePair(idx)}
              className="text-gray-600 hover:text-red-400 transition-colors text-xs shrink-0"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
