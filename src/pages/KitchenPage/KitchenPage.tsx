import { Navbar } from '../../components/Navbar/Navbar'
import { Kanban } from './Kanban/Kanban'

export const KitchenPage: React.FC = () => {
  return (
    <main className="flex flex-col h-[100dvh]">
      <Navbar className="flex-grow-0" activeItems="Kitchen" />
      <main className="flex flex-col flex-1">
        <div className="flex flex-col h-full py-5">
          <h1 className="flex-grow-0 px-5">Kitchen management</h1>
          <Kanban />
        </div>
      </main>
    </main>
  )
}
