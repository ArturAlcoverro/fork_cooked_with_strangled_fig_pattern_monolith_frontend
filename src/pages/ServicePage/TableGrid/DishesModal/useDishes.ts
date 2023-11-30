import { useState } from "react"


export function useDishes(dishes: any[]) {
  const [selectedDishes, setSelectedDishes] = useState<Map<number, number>>(new Map())

  function increaseSelectedDish(id: number) {
    const newSelectedDishes = new Map(selectedDishes)
    if (newSelectedDishes.has(id)) {
      newSelectedDishes.set(id, newSelectedDishes.get(id)! + 1)
    } else {
      newSelectedDishes.set(id, 1)
    }
    setSelectedDishes(newSelectedDishes)
  }

  function decreaseSelectedDish(id: number) {
    const newSelectedDishes = new Map(selectedDishes)

    if(!newSelectedDishes.has(id)) return

    if (newSelectedDishes.get(id)! > 1) {
      newSelectedDishes.set(id, newSelectedDishes.get(id)! - 1)
    } else if(newSelectedDishes.get(id)! == 1){
      newSelectedDishes.delete(id)
    }

    setSelectedDishes(newSelectedDishes)
  }

  function clearSelectedDishes() {
    setSelectedDishes(new Map())
  }

  return {
    dishes,
    selectedDishes,
    increaseSelectedDish,
    decreaseSelectedDish,
    clearSelectedDishes,
  }
}