import { Modal } from '@components/Modal/Modal'
import { ReactComponent as CloseIcon } from '@assets/icons/close.svg'

import style from './AddIngredientsModal.module.scss'
import { useIngredientsContext } from 'src/contexts/IngredientsContext'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '@components/Button/Button'
import { IngredientType } from '@modules/ingredients/domain/IngredientType'
import { useEffect } from 'react'

type NewIngredientInputs = {
  name: string
  type: string
}

export const AddIngredientsModal: React.FC<AddIngredientsModalProps> = ({
  modalRef,
  setOpen,
  refreshIngredients,
  ingredientTypes,
}) => {
  const { addIngredient } = useIngredientsContext()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<NewIngredientInputs>()

  const onSubmit: SubmitHandler<NewIngredientInputs> = (data) => {
    addIngredient({
      name: data.name,
      typeId: parseInt(data.type),
      unit: 'g',
    }).then((res) => {
      if (res) {
        refreshIngredients()
        closeModal()
      }
    })
  }

  function closeModal() {
    setValue('name', '')
    setValue('type', '')
    setOpen(false)
  }

  return (
    <Modal modalRef={modalRef} setOpen={setOpen} outsideClose={true} className={style.modal}>
      <div className={style.header}>
        <h3>New Ingredient</h3>
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
          <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Ingredient type
          </label>
          <select
            {...register('type', { required: true })}
            id="type"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[var(--primary-color-500)] focus:border-[var(--primary-color-500)] outline-none block w-full p-2.5"
          >
            <option value="" disabled selected>
              Select type
            </option>
            {ingredientTypes.map((type, i) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end mt-2">
          <Button type="submit" variant="primary" text="Create ingredient" />
        </div>
      </form>
    </Modal>
  )
}

interface AddIngredientsModalProps {
  modalRef: React.RefObject<HTMLDialogElement>
  ingredientTypes: IngredientType[]
  setOpen: (bool: boolean) => void
  refreshIngredients: () => void
}
