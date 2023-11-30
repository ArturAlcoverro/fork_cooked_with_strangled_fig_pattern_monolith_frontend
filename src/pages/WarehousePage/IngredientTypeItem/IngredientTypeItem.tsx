import { IngredientType } from '@modules/ingredients/domain/IngredientType'
import { useState } from 'react'
import { ReactComponent as ExpandLessIcon } from '@assets/icons/expand_less.svg'
import { ReactComponent as ExpandMoreIcon } from '@assets/icons/expand_more.svg'
import { IngredientItem } from './IngredientItem/IngredientItem'

export const IngredientTypeItem: React.FC<IngredientTypeItemProps> = ({ ingredientType, refreshIngredients }) => {
  const [open, setOpen] = useState<boolean>(true)

  function toogleHandler() {
    setOpen(!open)
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full p-1 px-4">
        <p className="flex-grow small-text">{ingredientType.name.toUpperCase()}</p>
        <button
          className="inline-flex items-center flex-grow-0 p-2 text-xs text-sm font-medium text-center text-white rounded-lg hover:bg-gray-200 focus:outline-none"
          onClick={toogleHandler}
        >
          {open ? <ExpandLessIcon className="w-3 h-3" /> : <ExpandMoreIcon className="w-3 h-3" />}
        </button>
      </div>
      {open && (
        <div className="flex flex-col p-4 pt-1 px-4">
          {ingredientType.ingredients.map((ingredient) => (
            <IngredientItem key={ingredient.id} ingredient={ingredient} refreshIngredients={refreshIngredients}/>
          ))}
        </div>
      )}
      <div className="h-[1px] w-full bg-[var(--divider)]"></div>
    </div>
  )
}

interface IngredientTypeItemProps {
  ingredientType: IngredientType,
  refreshIngredients: () => void
  
}
