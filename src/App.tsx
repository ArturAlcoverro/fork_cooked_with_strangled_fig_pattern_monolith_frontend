import { DashboardPage } from '@pages/DashboardPage/DashboardPage'
import { Dashboard } from '@pages/Dashboard/Dashboard'
import { ServicePage } from '@pages/ServicePage/ServicePage'
import { KitchenPage } from '@pages/KitchenPage/KitchenPage'
import { WarehousePage } from '@pages/WarehousePage/WarehousePage'

import './styles/tailwind.css'
import './styles/colors.scss'
import './styles/fonts.scss'
import './styles/global.scss'

import { Route, Redirect } from 'wouter'
import { DishesContextProvider } from './contexts/DishesContext'
import { APIDishesRepository } from '@modules/dishes/infrastructure/APIDishesRepository'
import { OrdersContextProvider } from './contexts/OrdersContext'
import { APIOrderRepository } from '@modules/orders/infrastructure/APIOrderRepository'
import { TablesContextProvider } from './contexts/TablesContext'
import { APITableRepository } from '@modules/tables/infrastructure/APITableRepository'
import { IngredientsContextProvider } from './contexts/IngredientsContext'
import { APIIngredientsRepository } from '@modules/ingredients/infrastructure/APIIngredientsRepository'
import { RecipesContextProvider } from './contexts/RecipesContext'
import { APIRecipesRepository } from '@modules/recipes/infrastructure/APIRecipesRepository'
import { ReportsContext, ReportsContextProvider } from './contexts/ReportsContext'
import { APIReportsRepository } from '@modules/reports/infrastructure/APIReportsRepository'

function App() {
  return (
    <RecipesContextProvider repository={new APIRecipesRepository()}>
      <DishesContextProvider repository={new APIDishesRepository()}>
        <OrdersContextProvider repository={new APIOrderRepository()}>
          <TablesContextProvider repository={new APITableRepository()}>
            <IngredientsContextProvider repository={new APIIngredientsRepository()}>
              <ReportsContextProvider repository={new APIReportsRepository()}>
                <div className="App">
                  <Route path="/service" component={ServicePage} />
                  <Route path="/kitchen" component={KitchenPage} />
                  <Route path="/warehouse" component={WarehousePage} />
                  <Route path="/dashboard" component={DashboardPage} />

                  <Route path="/">{() => <Redirect to="/service" />}</Route>
                </div>
              </ReportsContextProvider>
            </IngredientsContextProvider>
          </TablesContextProvider>
        </OrdersContextProvider>
      </DishesContextProvider>
    </RecipesContextProvider>
  )
}

export default App
