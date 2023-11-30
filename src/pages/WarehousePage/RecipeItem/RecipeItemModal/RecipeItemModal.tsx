import { Modal } from '@components/Modal/Modal'
import { ReactComponent as CloseIcon } from '@assets/icons/close.svg'

import style from './RecipeItemModal.module.scss'
import { useIngredientsContext } from 'src/contexts/IngredientsContext'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '@components/Button/Button'
import { IngredientType } from '@modules/ingredients/domain/IngredientType'
import { Ingredient } from '@modules/ingredients/domain/Ingredient'
import { Dish } from '@modules/dishes/domain/Dish'
import { Recipe } from '@modules/recipes/domain/Recipe'
import { useRecipesContext } from 'src/contexts/RecipesContext'
import { useEffect } from 'react'

type NewIngredientInputs = {
  image: string
  name: string
  realization: string
}

export const RecipeItemModal: React.FC<RecipeItemModalProps> = ({ modalRef, setOpen, refreshRecipes, recipe }) => {
  const { createRecipe, updateRecipe } = useRecipesContext()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewIngredientInputs>()

  const onSubmit: SubmitHandler<NewIngredientInputs> = async (data) => {
    let res = null
    if (recipe) {
      res = await updateRecipe({
        id: recipe.id,
        name: data.name,
        image: recipe.image,
        steps: [{ id:1, name: "1", order: 1, description: data.realization ?? "" }],
        ingredients: [],
      })
    } else {
      res = createRecipe({
        name: data.name,
        image: data.image,
        steps: [{ id:1, name: "1", order: 1, description: data.realization ?? "" }],
        ingredients: [],
      })
    }
    if (res) {
      await refreshRecipes()
      closeModal()
    }
  }

  useEffect(() => {
    if (recipe) {
      setValue('name', recipe.name)
      if(recipe.steps.length > 0){
        setValue('realization', recipe.steps[0].description)
      }
    }
  }, [recipe])

  function closeModal() {
    setOpen(false)
  }

  const imgPath = recipe?.name ? `/img/${recipe?.name.replace(/ /g, '+')}.jpg` : "/img/placeholder.jpg"

  return (
    <Modal modalRef={modalRef} setOpen={setOpen} outsideClose={false} className={style.modal}>
      <div className={style.header}>
        <h3 className="line-clamp-1">{recipe ? recipe.name : `New Recipe`}</h3>
        <button
          onClick={closeModal}
          type="button"
          className="text-white  hover:bg-gray-200 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center"
        >
          <CloseIcon className="w-4 h-4" fill="var(--font-color-secondary)" />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-900 dark:text-white">
            Image 
            <img className={style.image} src={imgPath} alt="recipe img" />
          </label>
          <input id="image" type="file" className={style.customFile} />
        </div>
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input
            {...register('name', { required: true })}
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[var(--primary-color-500)] focus:ring-1 focus:border-[var(--primary-color-500)] outline-none block w-full p-2.5"
            placeholder="Onion"
            required
          />
        </div>
        <div>
          <label htmlFor="realization" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Realization
          </label>
          <textarea
            {...register('realization')}
            id="realization"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[var(--primary-color-500)] focus:border-[var(--primary-color-500)] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[var(--primary-color-500)] dark:focus:border-[var(--primary-color-500)]"
            placeholder="Step 1..."
          ></textarea>
        </div>
        <div className="flex justify-end mt-2">
          <Button type="submit" variant="primary" text={recipe ? "Update ingredient" : "Create ingredient" }/>
        </div>
      </form>
    </Modal>
  )
}

interface RecipeItemModalProps {
  modalRef: React.RefObject<HTMLDialogElement>
  setOpen: (bool: boolean) => void
  refreshRecipes: () => void
  recipe?: Recipe
}
