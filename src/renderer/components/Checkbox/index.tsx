import { FC, useState } from 'react'
import './index.scss'

interface I {
  value?: boolean,
  onChange?: (value: boolean) => void
}

const index: FC<I> = ({ children, value, onChange }) => {
  const [checked, setChecked] = useState(value ?? false)

  const handleClick = () => {
    if(onChange) onChange(!checked)
    setChecked(!checked)
  }

  return (
    <div className={'checkbox ' + (checked ? ' active' : '')} onClick={handleClick} tabIndex={0}>
      <div className='check-box'>
      </div>
      <span>{children}</span>
    </div>
  )
}

export default index
