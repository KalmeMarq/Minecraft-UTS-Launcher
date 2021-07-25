import { navigate, Router } from '@reach/router';
import { useEffect, useState } from 'react';
import './App.scss';
import MainMenu from './components/MainMenu';
import MigrationNotification from './components/MigrationNotification';
import Dungeons from './routes/Dungeons';
import Java from './routes/Java';
import News from './routes/News';
import Settings from './routes/Settings';

const App = () => {
  if(window.location.pathname === '/') navigate('/news')
  else if(window.location.pathname === '/java') navigate('/java/play')
  else if(window.location.pathname === '/bugrock') navigate('/bugrock/play')
  else if(window.location.pathname === '/dungeons') navigate('/dungeons/play')
  else if(window.location.pathname === '/settings') navigate('/settings/general')

  const [alertMess, setAlertMess] = useState(undefined as any)

  useEffect(() => {
    /* fetch('https://launchercontent.mojang.com/alertMessaging.json').then(res => res.json())
    .then(data => {
      setAlertMess(data)
    }) */
  }, [])

  return (
    <>
      <div className='App'>
        <MainMenu />
        <Router style={{width: '100%', height: '100%'}}>
          <News path='/news' />
          <Java path='/java/*' />
          <Dungeons path='/dungeons/*' />
          <Settings path='/settings/*' />
        </Router>
      </div>
      {alertMess && (
        <MigrationNotification data={alertMess} />
      )}
    </>
  )
}

export default App
