import { T } from '@mojang/t-component';
import { useState } from 'react';
import bugrockIcon from '../../assets/icons/bugrock_icon.png';
import comIcon from '../../assets/icons/com_icon.png';
import dungeonsIcon from '../../assets/icons/dungeons_icon.png';
import grassIcon from '../../assets/icons/grass_icon.png';
import nbtIcon from '../../assets/icons/nbt_icon.png';
import newsIcon from '../../assets/icons/news_icon.png';
import settingsIcon from '../../assets/icons/settings_icon.png';
import UserDropdown from '../UserDropdown';
import MainMenuTab from './components/MainMenuTab';
import './index.scss';

const index = () => {
  let paths = ['/news', '/java', '/bugrock', '/dungeons', '/marketplace', '/nbteditor', '/settings']
  const [activeTab, setActiveTab] = useState(paths.find(p => window.location.pathname.includes(p)) ?? '/news')
  const onActiveTabChange = (path: string) => setActiveTab(path)
  
  return (
    <div className='mainmenu'>
      <nav>
        <UserDropdown />
        <MainMenuTab to='/news' tooltip='News' icon={newsIcon} activeTab={activeTab} onTabClick={onActiveTabChange}>
          <T>News</T>
        </MainMenuTab>
        <MainMenuTab to='/java/play' tooltip='Java Edition' icon={grassIcon} activeTab={activeTab} onTabClick={onActiveTabChange}>
          <i>Minecraft:</i>
          <span>Java Edition</span>
        </MainMenuTab>
        <MainMenuTab to='/bugrock/play' tooltip='Bugrock Edition' icon={bugrockIcon} activeTab={activeTab} onTabClick={onActiveTabChange}>
          <i>Minecraft:</i>
          <span>Bugrock Edition</span>
        </MainMenuTab>
        <MainMenuTab to='/dungeons/play' tooltip='Dungeons' icon={dungeonsIcon} activeTab={activeTab} onTabClick={onActiveTabChange}>
          <i>Minecraft</i>
          <span>Dungeons</span>
        </MainMenuTab>
        <MainMenuTab to='/marketplace' tooltip='Marketplace' icon={comIcon} activeTab={activeTab} onTabClick={onActiveTabChange}>
          <T>Marketplace</T>
        </MainMenuTab>
        <MainMenuTab to='/nbteditor' tooltip='NBT Editor' icon={nbtIcon} activeTab={activeTab} onTabClick={onActiveTabChange}>
          <T>NBT Editor</T>
        </MainMenuTab>
        <div className='vertical-filler'></div>
        <MainMenuTab to='/settings/general' tooltip='Settings' icon={settingsIcon} activeTab={activeTab} onTabClick={onActiveTabChange}>
          <T>Settings</T>
        </MainMenuTab>
      </nav>
    </div>
  )
}

export default index