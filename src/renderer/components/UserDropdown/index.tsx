import { useRef, useState } from 'react'
import HelpDialog from '../HelpDialog'
import './index.scss'

const index = () => {
  const [open, setOpen] = useState(false)
  const [showHelpDialog, setShowHelpDialog] = useState(false)

  const a = useRef(null)

  window.addEventListener('click', (e) => {
    // @ts-ignore
    if (a.current && !a.current.contains(e.target)) {
      setOpen(false)
    }
  })

  return (
    <>
      <div className='user-dropdown'>
        <div className='user-main' onClick={() => setOpen(!open)} ref={a} tabIndex={0}></div>
        <div className={'user-dropdown-cont' + (open ? ' open' : '')}>
          <div className='user-dropdown-item' onClick={() => setShowHelpDialog(true)}>Help</div>
        </div>
      </div>
      <HelpDialog onClose={() => setShowHelpDialog(false)} isOpen={showHelpDialog} />
    </>
  )
}

export default index
