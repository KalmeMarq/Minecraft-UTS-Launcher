import { RouteComponentProps } from "@reach/router";
import { FC, useEffect, useState } from "react";
import UrlKnown from '../../../../../common/UrlKnown';
import PatchNoteCard from "./components/PatchNoteCard";
import PatchNotesDialog from "./components/PatchNotesDialog";
import './index.scss';

const index: FC<RouteComponentProps> = () => {
  const [patches, setPatches] = useState([] as any[])
  const [showPatchDialog, setShowPatchDialog] = useState(false)
  const [patchUsed, setPatchUsed] = useState('')

  useEffect(() => {
    fetch(UrlKnown.dungeonsPatchNotes).then(res => res.json())
    .then(data => {
      setPatches(data.entries)
    })
  }, [])

  return (
    <div className='dpatchnotes-subroute'>
      <div className='dpatches-container'>
        <div className='dpatches'>
          {patches.map(e => {
              return (
                <PatchNoteCard key={e.id} patchNote={e} onPatchCardClick={(id: string) => {
                  setPatchUsed(e.id)
                  setShowPatchDialog(true)
                }} />
             )
            }
          )}
        </div>
      </div>
        {(patches.length > 0 && patchUsed !== '') && (
          <PatchNotesDialog onClose={() => setShowPatchDialog(false)} isOpen={showPatchDialog} patchNotePath={patches.find((v: any) => v.id === patchUsed).contentPath} />
        )}
    </div>
  )
}

export default index