interface CategoryFilterProps {
  categories: string[]
  selected: string
  onSelect: (category: string) => void
}

const ALL = 'Todos'

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: CategoryFilterProps) {
  const options = [ALL, ...categories]

  return (
    <div className="no-scrollbar mx-auto mb-8 flex max-w-6xl gap-2 overflow-x-auto px-6">
      {options.map((option) => {
        const isActive = option === selected
        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              isActive
                ? 'bg-apple-text text-white'
                : 'bg-apple-gray text-apple-text hover:bg-black/10'
            }`}
          >
            {option}
          </button>
        )
      })}
    </div>
  )
}

export { ALL as ALL_CATEGORY }
