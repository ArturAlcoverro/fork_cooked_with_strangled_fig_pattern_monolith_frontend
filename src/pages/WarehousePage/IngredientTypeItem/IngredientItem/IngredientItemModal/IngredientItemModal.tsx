import { Modal } from '@components/Modal/Modal'
import { ReactComponent as CloseIcon } from '@assets/icons/close.svg'

import style from './IngredientItemModal.module.scss'
import { useIngredientsContext } from 'src/contexts/IngredientsContext'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '@components/Button/Button'
import { IngredientType } from '@modules/ingredients/domain/IngredientType'
import { useEffect } from 'react'
import { Ingredient } from '@modules/ingredients/domain/Ingredient'

type StockInputs = {
  stock: number
}

export const IngredientItemModal: React.FC<IngredientItemModalProps> = ({
  modalRef,
  setOpen,
  refreshIngredients,
  ingredient,
}) => {
  useEffect(() => {
    setValue('stock', ingredient.quantity)
  }, [ingredient])

  const { setIngredientStock } = useIngredientsContext()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<StockInputs>()

  const onSubmit: SubmitHandler<StockInputs> = (data) => {
    const stock = data.stock - ingredient.quantity
    setIngredientStock(ingredient.id, stock).then((res) => {
      if (res) {
        refreshIngredients()
        closeModal()
      }
    })
  }

  function closeModal() {
    setOpen(false)
  }

  return (
    <Modal modalRef={modalRef} setOpen={setOpen} outsideClose={true} className={style.modal}>
      <div className={style.header}>
        <h3>{ingredient.name} Stock</h3>
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
          <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Ingredient Stock (g)
          </label>
          <input
            {...register('stock', { required: true })}
            id="stock"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[var(--primary-color-500)] focus:ring-1 focus:border-[var(--primary-color-500)] outline-none block w-full p-2.5"
            required
          />
        </div>
        <div className="flex justify-end mt-2">
          <Button type="submit" variant="primary" text="Update stock" />
        </div>
      </form>
    </Modal>
  )
}

interface IngredientItemModalProps {
  modalRef: React.RefObject<HTMLDialogElement>
  ingredient: Ingredient
  setOpen: (bool: boolean) => void
  refreshIngredients: () => void
}
