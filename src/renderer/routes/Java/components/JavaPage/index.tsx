import { Router } from "@reach/router"
import { FC } from "react"
import PatchNotes from "../../routes/PatchNotes"
import Play from "../../routes/Play"

const index: FC<{ isShowingButa: (is: boolean) => void, onPlay: () => void }> = ({ isShowingButa, onPlay }) => {
  return (
    <Router style={{width: '100%', height: '100%', overflow: 'auto'}}>
      <Play path='play' isShowingButa={isShowingButa} onPlay={onPlay} />
      <PatchNotes path='patchnotes' />
    </Router>
  )
}

export default index