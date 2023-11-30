import { Recipe } from '@modules/recipes/domain/Recipe'
import { RecipeItemModal } from './RecipeItemModal/RecipeItemModal'
import useModal from '@components/Modal/useModal'

export const RecipeItem: React.FC<RecipeItemProps> = ({ recipe, refreshRecipes }) => {
  const { modalRef, setOpen } = useModal()
  return (
    <div>
      <div
        onClick={() => setOpen(true)}
        className="flex flex-col flex-grow-0 gap-2 w-36 p-2 rounded-2xl cursor-pointer hover:bg-gray-200"
      >
        <div className="aspect-square p-0 m-0">
          <object
            className="aspect-square w-full object-cover rounded-lg filter saturate-[85%]"
            data={`/img/${recipe.name.replace(/ /g, '+')}.jpg`}
            type="image/jpg"
          >
            <img src={recipe.image} alt={`${recipe.name} image`} />
          </object>
        </div>
        <div className="">
          <p className="line-clamp-2 text-xs font-medium select-none" title={recipe.name}>
            {recipe.name}
          </p>
        </div>{' '}
      </div>
      <RecipeItemModal modalRef={modalRef} setOpen={setOpen} refreshRecipes={refreshRecipes} recipe={recipe} />
    </div>
  )
}
;`
.dishItem {
  p {
    color: var(--font-color);
    font-size: .75rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    user-select: none;
  }
}`

interface RecipeItemProps {
  recipe: Recipe
  refreshRecipes: () => void
}
