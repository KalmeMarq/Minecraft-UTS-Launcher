import { FC } from 'react'
import SettingsSubMenuTab from './components/SettingsSubMenuTab'
import './index.scss'

interface ISubMenu {
  activeTab: string,
  onTabClick: (path: string) => void
}

const index: FC<ISubMenu> = ({ activeTab, onTabClick}) => {
  return (
    <div className='settings-sub-menu'>
      <div className='head'>
        <h3>Settings</h3>
      </div>
      <nav>
        <ul>
          <SettingsSubMenuTab to='/settings/general' title='General' activeTab={activeTab} onTabClick={onTabClick} />
          <SettingsSubMenuTab to='/settings/accounts' title='Accounts' activeTab={activeTab} onTabClick={onTabClick} />
          <SettingsSubMenuTab to='/settings/about' title='About' activeTab={activeTab} onTabClick={onTabClick} />
        </ul>
      </nav>
    </div>
  )
}

export default index
