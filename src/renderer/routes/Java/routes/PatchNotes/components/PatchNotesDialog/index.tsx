import { DialogContent, DialogOverlay } from "@reach/dialog";
import { FC, useEffect, useState } from "react";
import UrlKnown from "../../../../../../../common/UrlKnown";
import cancelIcon from '../../../../../../assets/others/cancel.svg';
import './index.scss';
interface IPatchNote {
  title: string,
  type: 'release' | 'snapshot',
  version: string,
  image: object,
  body: string,
  id: string,
  contentPath: string
}

interface IPatchNotesDialog {
  isOpen: boolean,
  onClose: () => void,
  patchNotePath: string
}

const index: FC<IPatchNotesDialog> = ({ isOpen, onClose, patchNotePath }) => {
  const [patch, setPatch] = useState({} as IPatchNote)

  useEffect(() => {
    setPatch({} as any)
    fetch(UrlKnown.launcherContent + patchNotePath).then(res => res.json())
    .then(data => {
      setPatch(data)
    })
  }, [patchNotePath])

  return (
    <>
      <DialogOverlay
        style={{ background: "hsla(0, 100%, 100%, 1)", width: '100vw', height: '100vh', top: '0', left: '0', position: 'absolute' }}
        isOpen={isOpen}
        onDismiss={onClose}
        aria-label='Dialog'
      >
        <DialogContent
          style={{ width: '100vw', height: '100vh' }}
          className='patch-dialog'
          aria-label='Dialog'
        >
          <div className='patch-dialog-header'>
            <h1>Patch Notes {patch.version}</h1>
            <div className='patch-dialog-exit-btn' tabIndex={0} onClick={onClose}>
              <img src={cancelIcon} alt="" />
            </div>
          </div>
          <div className='patch-dialog-cont'>
            <div className='patch-dialog-container' dangerouslySetInnerHTML={{
              __html: patch.body
            }}>
            </div>
          </div>
        </DialogContent>
      </DialogOverlay>
    </>
  )
}

export default index
