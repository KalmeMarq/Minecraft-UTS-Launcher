import { FC } from 'react'
import close from '../../assets/others/cancel.svg'
import info from '../../assets/others/info.png'
import './index.scss'

const index: FC<{ data: any }> = ({ data }) => {
  return (
    <div className='migra-notification'>
      <div className='info-ic'>
        <img src={info} alt="" />
      </div>
      <span dangerouslySetInnerHTML={{__html: data.entries[0].message}}></span>
      <button onClick={(e) => {
        e.currentTarget.parentElement?.classList.add('hide')
      }}>
      <img src={close} alt="" />
      </button>
    </div>
  )
}

export default index