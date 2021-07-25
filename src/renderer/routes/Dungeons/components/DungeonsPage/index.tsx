import { Router } from "@reach/router"
import { FC } from "react"
import PatchNotes from "../../routes/PatchNotes"
import Play from "../../routes/Play"

const index: FC = () => {
  return (
    <Router style={{width: '100%', height: '100%', overflow: 'auto'}}>
      <Play path='play' />
      <PatchNotes path='patchnotes' />
    </Router>
  )
}

export default index