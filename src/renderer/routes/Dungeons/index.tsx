import { navigate, RouteComponentProps } from '@reach/router'
import { FC, useState } from 'react'
import DungeonsPage from './components/DungeonsPage'
import DungeonsSubMenu from './components/DungeonsSubMenu'
import './index.scss'

const index: FC<RouteComponentProps> = () => {
  let paths = ['/dungeons/play', '/dungeons/dlc', '/dungeons/faq', '/dungeons/installation', '/dungeons/patchnotes']
  const [activeTab, setActiveTab] = useState(paths.find(p => window.location.pathname === p) ?? paths[0])
  
  const changeActiveTab = (path: string) => {
    setActiveTab(path)
    navigate(path)
  }
  
  return (
    <div className='dungeons-route'>
      <DungeonsSubMenu onTabClick={changeActiveTab} activeTab={activeTab} />
      <DungeonsPage />
    </div>
  )
}

export default index
