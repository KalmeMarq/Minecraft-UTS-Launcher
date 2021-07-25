import { shell } from "electron"
import moment from "moment"
import { FC } from "react"
import UrlKnown from '../../../../../../../common/UrlKnown'
import './index.scss'

const index: FC<{
  data: any
}> = ({ data }) => {
  moment.locale()

  return (
    <div className='java-news-item'>
      {data.cardBorder && <div className='jcard-border'></div>}
      <img src={UrlKnown.launcherContent + data.playPageImage.url}  alt="" />
      <div className='java-news-item-cont'>
        <h3>{data.title}</h3>
        <div className='jnews-tag-date'>
          <span className='jnews-tag'>{data.tag}</span>
          <span className='jnews-date'>{moment(data.date).format('LL')}</span>
        </div>
        <p>{data.text}</p>
        <div className='vertical-filler'></div>
        <div className='buta-ss' tabIndex={0} onClick={() => {
          shell.openExternal(data.readMoreLink)
        }}>Read more</div>
      </div>
    </div>
  )
}

export default index
