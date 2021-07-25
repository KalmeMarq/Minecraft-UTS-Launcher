import { FC, useRef, useState } from "react"
import './index.scss'

interface IDropdown {
  data: { text: string }[],
  value: number,
  onChange: (index: number) => void
}

const index: FC<IDropdown> = ({ data, value, onChange }) => {
  const [open, setOpen] = useState(false)
  const [state, setstate] = useState(value)

  const a = useRef(null)

  window.addEventListener('click', (e) => {
    // @ts-ignore
    if (a.current && !a.current.contains(e.target)) {
      setOpen(false)
    }
  })

  const handleOpen = () => {
    setOpen(!open)

    if(!open) {
      let d = (a.current as any) as HTMLDivElement
      let b = d.querySelectorAll('.dropdown-item.active')[0] as HTMLButtonElement
      b?.scrollIntoView()
    }
  }

  const handleSelect = (index: number) => {
    setOpen(!open)
    setstate(index)
    if(onChange) onChange(index)
  }

  return (
    <div ref={a} tabIndex={0} className={'dropdown' + (open ? ' open' : '')}>
      <p onClick={handleOpen} className='item-dflt'>{data[state]?.text}</p>
      <div className='dropdown-cont'>
        {data.map((l, i) => {
          return <div key={i} onClick={() => handleSelect(i)} className={'dropdown-item' + (state === i ? ' active' : '')}>{l.text}</div>
        })}
      </div>
    </div>
  )
}

export default index