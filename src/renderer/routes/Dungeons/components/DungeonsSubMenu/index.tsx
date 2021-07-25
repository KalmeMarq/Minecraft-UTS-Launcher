import { FC } from 'react'
import DungeonsSubMenuTab from './components/DungeonsSubMenuTab'
import './index.scss'

interface ISubMenu {
  activeTab: string,
  onTabClick: (path: string) => void
}

const index: FC<ISubMenu> = ({ activeTab, onTabClick}) => {
  return (
    <div className='dungeons-sub-menu'>
      <div className='head'>
        <h3>Minecraft Dungeons</h3>
      </div>
      <nav>
        <ul>
          <DungeonsSubMenuTab to='/dungeons/play' title='Play' activeTab={activeTab} onTabClick={onTabClick} />
          <DungeonsSubMenuTab to='/dungeons/dlc' title='DLC' activeTab={activeTab} onTabClick={onTabClick} />
          <DungeonsSubMenuTab to='/dungeons/faq' title='FAQ' activeTab={activeTab} onTabClick={onTabClick} />
          <DungeonsSubMenuTab to='/dungeons/installation' title='Installation' activeTab={activeTab} onTabClick={onTabClick} />
          <DungeonsSubMenuTab to='/dungeons/patchnotes' title='Patch notes' activeTab={activeTab} onTabClick={onTabClick} />
        </ul>
      </nav>
    </div>
  )
}

export default index
