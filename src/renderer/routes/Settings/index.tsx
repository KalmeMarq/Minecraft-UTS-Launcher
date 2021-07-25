import { navigate, RouteComponentProps } from '@reach/router'
import { FC, useState } from 'react'
import SettingsSubMenu from './components/SettingsSubMenu'
import './index.scss'

const index: FC<RouteComponentProps> = () => {
  let paths = ['/settings/general', '/settings/accounts', '/settings/about']
  const [activeTab, setActiveTab] = useState(paths.find(p => window.location.pathname === p) ?? paths[0])
  
  const changeActiveTab = (path: string) => {
    setActiveTab(path)
    navigate(path)
  }
  
  return (
    <div>
      <SettingsSubMenu onTabClick={changeActiveTab} activeTab={activeTab} />
    </div>
  )
}

export default index
