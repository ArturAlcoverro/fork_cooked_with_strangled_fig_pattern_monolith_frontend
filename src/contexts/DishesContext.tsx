import { Dish } from '@modules/dishes/domain/Dish'
import { DishesRepository } from '@modules/dishes/domain/DishesRepository'
import React, { useContext } from 'react'
import { getAllDishes as _getAllDishes } from '@modules/dishes/application/getAllDishes';

export interface ContextState {
	getAllDishes: () => Promise<Dish[]>;
}

export const DishesContext = React.createContext({} as ContextState)

export const DishesContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{ repository: DishesRepository }>) => {

  async function getAllDishes(): Promise<Dish[]> {
    return await _getAllDishes(repository)
  }

  return <DishesContext.Provider value={{ getAllDishes }}>{children}</DishesContext.Provider>
}

export const useDishesContext = () => useContext(DishesContext)
