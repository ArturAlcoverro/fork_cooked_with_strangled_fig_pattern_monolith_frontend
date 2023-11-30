import { Modal } from '@components/Modal/Modal'
import useModal from '@components/Modal/useModal'
import { Ingredient } from '@modules/ingredients/domain/Ingredient'
import { IngredientItemModal } from './IngredientItemModal/IngredientItemModal'

export const IngredientItem: React.FC<IngredientItemProps> = ({ ingredient, refreshIngredients }) => {
  const { modalRef, setOpen, open } = useModal()

  return (
    <div
      className="flex justify-between hover:bg-gray-200 px-2 py-1 rounded-md cursor-pointer"
      onClick={() => {
        setOpen(true)
      }}
    >
      <p className="small-text !text-black">{ingredient.name}</p>
      <p className="small-text !text-black">{parseGrams(ingredient.quantity)}</p>
      <IngredientItemModal modalRef={modalRef} setOpen={setOpen} ingredient={ingredient} refreshIngredients={refreshIngredients}  />

    </div>
  )
}

interface IngredientItemProps {
  ingredient: Ingredient
  refreshIngredients: () => void
}

function parseGrams(value: number) {
  if (value < 1000) {
    return `${value}g`
  } else {
    return `${value / 1000}kg`
  }
}
