import { Navbar } from '../../components/Navbar/Navbar'
import style from './ServicePage.module.scss'
import { TableGrid } from './TableGrid/TableGrid'


export const ServicePage: React.FC = () => {
  return (
    <>
      <Navbar activeItems="Service" />
      <main className={style.container}>
        <TableGrid></TableGrid>
      </main>
    </>
  )
}
