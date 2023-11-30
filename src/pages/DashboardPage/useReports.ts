import { useEffect, useState } from 'react'
import { useReportsContext } from 'src/contexts/ReportsContext'

export function useReports() {
  const { getDishesRanking, getIngredientsRanking } = useReportsContext()

  const [dishesTable, setDishesTable] = useState<any[]>([])
  const [ingredientTable, setIngredientTable] = useState<any[]>([])

  const [dishesChart, setDishesChart] = useState<any[]>([])
  const [ingredientChart, setIngredientChart] = useState<any[]>([])

  useEffect(() => {
    getDishesRanking().then((res: any[]) => {
      setDishesTable(
        res.map((item) => {
          return {
            position: item.rank_number,
            name: item.name,
            quantity: item.sum_quantity,
          }
        }),
      )
      res.sort((a, b) => b.sum_quantity - a.sum_quantity)
      const data = []

      for (let i = 0; i < res.length; i++) {
        if (i > 4) break
        data.push({
          name: res[i].name,
          value: res[i].sum_quantity,
        })
      }
      setDishesChart(data)
    })

    getIngredientsRanking().then((res: any[]) => {
      setIngredientTable(
        res.map((item) => {
          return {
            position: item.rank_number,
            name: item.name,
            quantity: item.count_quantity,
          }
        }),
      )

      res.sort((a, b) => b.count_quantity - a.count_quantity)
      const data = []

      for (let i = 0; i < res.length; i++) {
        if (i > 4) break
        data.push({
          name: res[i].name,
          value: res[i].count_quantity,
        })
      }
      setIngredientChart(data)
    })

  }, [])

  return {
    dishesTable,
    dishesChart,
    ingredientTable,
    ingredientChart,
  }
}
