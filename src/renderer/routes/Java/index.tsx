import { navigate, RouteComponentProps } from '@reach/router'
import { ipcRenderer } from 'electron'
import { FC, useState } from 'react'
import JavaPage from './components/JavaPage'
import { JavaSubMenu } from './components/JavaSubMenu'
import './index.scss'

const index: FC<RouteComponentProps> = () => {
  let paths = ['/java/play', '/java/installations', '/java/skins', '/java/patchnotes']
  const [showButa, setShowButa] = useState(true)
  const [activeTab, setActiveTab] = useState(paths.find(p => window.location.pathname === p) ?? paths[0])

  const changeActiveTab = (path: string) => {
    setActiveTab(path)
    navigate(path)
  }

  const onPlayClick = () => {
    ipcRenderer.send('mcutsl:launchBugrock')
  }
  
  return (
    <div className='java-route'>
      <JavaSubMenu onTabClick={changeActiveTab} activeTab={activeTab} onPlay={onPlayClick} showSubPlay={!showButa} />
      <JavaPage isShowingButa={(is) => setShowButa(is)} onPlay={onPlayClick} />
    </div>
  )
}

export default index