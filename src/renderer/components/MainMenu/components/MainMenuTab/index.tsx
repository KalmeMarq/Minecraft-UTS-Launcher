import { navigate } from "@reach/router"
import { FC } from "react"

interface IMainMenuTab {
  icon: string,
  to: string,
  tooltip: string,
  activeTab: string,
  onTabClick: (path: string) => void
}

const MainMenuTab: FC<IMainMenuTab> = ({ to, icon, tooltip, activeTab, onTabClick, children }) => {
  return (
    <div title={tooltip} className={'main-menu-btn' + (to.includes(activeTab) ? ' active' : '')} tabIndex={0} onClick={() => {
      navigate(to)
      onTabClick(to)
    }}>
      <div className='main-btn-icon'>
        <img src={icon} alt="" />
      </div>
      <div className='main-btn-cont'>{children}</div>
    </div>
  )
}

export default MainMenuTab
