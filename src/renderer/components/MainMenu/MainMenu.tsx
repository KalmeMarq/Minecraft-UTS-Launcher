import { useTranslation } from '@mojang/t-component';
import './MainMenu.scss';

const MainMenu = () => {
  const {t} = useTranslation()
  return (
    <div className='mainmenu'>
      {t('Play')}      
    </div>
  )
}

export default MainMenu
