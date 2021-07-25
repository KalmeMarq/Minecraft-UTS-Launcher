import { FC } from 'react'
import './JavaSubMenu.scss'
import JavaSubMenuTab from './JavaSubMenuTab'

interface IJavaSubMenu {
  activeTab: string,
  onPlay: () => void,
  showSubPlay: boolean,
  onTabClick: (path: string) => void
}

const JavaSubMenu: FC<IJavaSubMenu> = ({ activeTab, onTabClick, onPlay, showSubPlay }) => {
  return (
    <div className='bugrock-sub-menu'>
      <div className='head'>
        <h3>Minecraft: Java Edition</h3>
      </div>
      <nav>
        <ul>
          <JavaSubMenuTab to='/java/play' title='Play' activeTab={activeTab} onTabClick={onTabClick} />
          <JavaSubMenuTab to='/java/installations' title='Installations' activeTab={activeTab} onTabClick={onTabClick} />
          <JavaSubMenuTab to='/java/skins' title='Skins' activeTab={activeTab} onTabClick={onTabClick} />
          <JavaSubMenuTab to='/java/patchnotes' title='Patch notes' activeTab={activeTab} onTabClick={onTabClick} />
        </ul>
      </nav>
      {(showSubPlay && window.location.pathname === '/java/play') && <div className='buta-s' onClick={onPlay}>Play</div>}
    </div>
  )
}

export default JavaSubMenu
