import { Navbar } from '../../components/Navbar/Navbar'
import { IngredientTypeItem } from './IngredientTypeItem/IngredientTypeItem'
import styles from './WarehousePage.module.scss'
import { useIngredients } from './useIngredients'
import { ReactComponent as AddIcon } from '@assets/icons/add.svg'
import { useRecipes } from './useRecipes'
import { RecipeItem } from './RecipeItem/RecipeItem'
import { AddIngredientsModal } from './AddIngredientsModal/AddIngredientsModal'
import useModal from '@components/Modal/useModal'
import { RecipeItemModal } from './RecipeItem/RecipeItemModal/RecipeItemModal'

export const WarehousePage: React.FC = () => {
  const { ingredientTypes, refreshIngredients } = useIngredients()
  const { refreshRecipes, recipes } = useRecipes()
  const { modalRef: addIngredientModalRed, setOpen: addIngredientSetOpen } = useModal()
  const { modalRef: addRecipeModalRef, setOpen: addRecipeSetOpen } = useModal()

  return (
    <main className="flex flex-col h-[100dvh]">
      <Navbar className="flex-grow-0" activeItems="Warehouse" />
      <div className="flex flex-col flex-1">
        <div className="flex flex-col h-full py-5">
          <h1 className="flex-grow-0 px-5">Warehouse</h1>
          <div className={styles.grid}>
            <div className={styles.grid__ingredients}>
              <div className="px-4 pt-4 flex justify-between items-center">
                <h3>Ingredients</h3>
                <button
                  onClick={() => {
                    addIngredientSetOpen(true)
                  }}
                  className="text-white  hover:bg-gray-200 focus:outline-none font-medium rounded-lg text-sm p-2 text-center inline-flex items-center"
                >
                  <AddIcon className="w-4 h-4" fill="var(--font-color-secondary)" />
                </button>
              </div>
              <div className={styles.parent}>
                <div className={styles.child}>
                  {ingredientTypes.map((type) => (
                    <IngredientTypeItem key={type.id} ingredientType={type} refreshIngredients={refreshIngredients} />
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.grid__recipes}>
              <div className="px-4 pt-4 flex justify-between items-center">
                <h3>Recipes</h3>
                <button onClick={()=>{
                  addRecipeSetOpen(true)
                }} className="text-white  hover:bg-gray-200 focus:outline-none font-medium rounded-lg text-sm p-2 text-center inline-flex items-center">
                  <AddIcon className="w-4 h-4" fill="var(--font-color-secondary)" />
                </button>
              </div>
              <div className={styles.parent}>
                <div className={styles.child}>
                  {recipes.map((recipe) => (
                    <RecipeItem key={recipe.id} recipe={recipe} refreshRecipes={refreshRecipes} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddIngredientsModal
        modalRef={addIngredientModalRed}
        setOpen={addIngredientSetOpen}
        refreshIngredients={refreshIngredients}
        ingredientTypes={ingredientTypes}
      />
      <RecipeItemModal modalRef={addRecipeModalRef} setOpen={addRecipeSetOpen} refreshRecipes={refreshRecipes} />
    </main>
  )
}
