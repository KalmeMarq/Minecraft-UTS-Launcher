import { FC } from "react"
import UrlKnown from '../../../../../../../common/UrlKnown'
import './index.scss'

const index: FC<{ patchNote: any, onPatchCardClick: (id: string) => void }> = ({ patchNote, onPatchCardClick }) =>  {
  return (
    <div className={'patch-item' + ' ' + patchNote.type} onClick={() => onPatchCardClick(patchNote.id)}>
      <img src={UrlKnown.launcherContent + patchNote.image.url} alt={patchNote.image.title} />
      <div className='patch-cont'>
        <p>{patchNote.title}</p>
      </div>
    </div>
  )
}

export default index
