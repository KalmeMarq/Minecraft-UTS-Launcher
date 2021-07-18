import { FC, useState } from 'react'
import './App.scss'
import { MainMenu } from './components/MainMenu'

interface IApp {
  onLangChange: (index: number) => void
}

const App: FC<IApp> = ({onLangChange}) => {
  const [state, setstate] = useState(0)

  return (
    <div className='App'>
      <MainMenu />
      <button onClick={() => {
        let i = state
        if(i === 0) {
          i = 1
        } else {
          i = 0
        }
        setstate(i)

        onLangChange(i)
      }}>Change</button>
    </div>
  )
}

export default App
