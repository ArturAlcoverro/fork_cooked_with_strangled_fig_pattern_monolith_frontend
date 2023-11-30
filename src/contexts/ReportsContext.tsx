import { getDishesRanking } from '@modules/reports/application/getDishesRanking'
import { getIngredientsRanking } from '@modules/reports/application/getIngredientsRanking'
import { ReportsRepository } from '@modules/reports/domain/ReportsRepository'
import React, { useContext } from 'react'

export interface ContextState {
  getDishesRanking: () => Promise<any>
  getIngredientsRanking: () => Promise<any>
}
export const ReportsContext = React.createContext({} as ContextState)

export const ReportsContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{ repository: ReportsRepository }>) => {
  
  async function _getDishesRanking() {
    return await getDishesRanking(repository)
  }

  async function _getIngredientsRanking() {
    return await getIngredientsRanking(repository)
  }

  return (
    <ReportsContext.Provider
      value={{
        getDishesRanking: _getDishesRanking,
        getIngredientsRanking: _getIngredientsRanking,
      }}
    >
      {children}
    </ReportsContext.Provider>
  )
}

export const useReportsContext = () => useContext(ReportsContext)
