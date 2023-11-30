import styles from './Navbar.module.scss'

import { ReactComponent as Service } from '@assets/icons/service.svg'
import { ReactComponent as Kitchen } from '@assets/icons/kitchen.svg'
import { ReactComponent as Warehouse } from '@assets/icons/warehouse.svg'
import { ReactComponent as Dashboard } from '@assets/icons/dashboard.svg'
import { ReactComponent as Logout } from '@assets/icons/logout.svg'

const items: NavbarItem[] = [
  { label: 'Service', icon: Service, url: '/service' },
  { label: 'Kitchen', icon: Kitchen, url: '/kitchen' },
  { label: 'Warehouse', icon: Warehouse, url: '/warehouse' },
  { label: 'Dashboard', icon: Dashboard, url: '/dashboard' },
  // { align: 'right', label: 'Logout', icon: Logout, url: '/logout' },
]

export const Navbar: React.FC<NavbarProps> = ({ activeItems, className = '' }) => {
  return (
    <nav className={`${styles.styles} ${className}`}>
      <ul>
        {items.map((item: NavbarItem) => (
          <li key={item.label} className={item.label == activeItems ? styles.active : ''}>
            <a href={item.url}>
              <div>
                {item.icon ? <item.icon /> : null}
                <p className={styles.label}>{item.label}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

type ItemNames = 'Service' | 'Kitchen' | 'Warehouse' | 'Dashboard' | 'Logout'

interface NavbarProps {
  className?: string
  activeItems: ItemNames
  children?: React.ReactNode
}

export interface NavbarItem {
  label: ItemNames
  url: string
  icon?: React.ComponentType
}
