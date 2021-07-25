import { T } from "@mojang/t-component";
import { RouteComponentProps } from "@reach/router";
import { FC, useEffect, useState } from "react";
import UrlKnown from '../../../../../common/UrlKnown';
import Checkbox from "../../../../components/Checkbox";
import NoMatchWarn from "./components/NoMatchWarn";
import PatchNoteCard from "./components/PatchNoteCard";
import PatchNotesDialog from "./components/PatchNotesDialog";
import './index.scss';

const index: FC<RouteComponentProps> = () => {
  const [showSnapshots, setShowSnapshots] = useState(true)
  const [showReleases, setShowReleases] = useState(true)
  const [patches, setPatches] = useState([] as any[])
  const [showPatchDialog, setShowPatchDialog] = useState(false)
  const [patchUsed, setPatchUsed] = useState('')

  useEffect(() => {
    fetch(UrlKnown.javaPatchNotes).then(res => res.json())
    .then(data => {
      fetch(UrlKnown.javaVersionsV2).then(res => res.json())
      .then(vdata => {
        let a: string[] = vdata.versions.map((v: any) => v.id)
        let b = (data.entries as any[])
        let c: any[] = []
        
        for(let i = 0; i < a.length; i++) {
          if(a[i].includes('1.13-pre10')) break;

          let n = b.findIndex((j: any) => j.version === a[i])
          if(n !== -1) {
            c.push(b[n])
          }
        }

        setPatches(c)
      })
    })
  }, [])

  const handleReleasesChange = (value: boolean) => setShowReleases(value)
  const handleSnapshotsChange = (value: boolean) => setShowSnapshots(value)

  return (
    <div className='patchnotes-subroute'>
      <div className='filter-bar'>
        <Checkbox value={true} onChange={handleReleasesChange}><T>Releases</T></Checkbox>
        <Checkbox value={true} onChange={handleSnapshotsChange}><T>Snapshots</T></Checkbox>
      </div>
      <div className='patches-container'>
        <div className='patches'>
          {patches.map(e => {
            if((e.type === 'release' && showReleases) || (e.type === 'snapshot' && showSnapshots)) {
              return (
                <PatchNoteCard key={e.id} patchNote={e} onPatchCardClick={(id: string) => {
                setPatchUsed(e.id)
                setShowPatchDialog(true)
              }} />
             )
            }
          })}
        </div>
        {!(showReleases && showSnapshots) && <NoMatchWarn title='No matching results' description="We couldn't find any patch notes matching your filter settings. If you have version filters turned off, try turning them back on." />}
      </div>
        {(patches.length > 0 && patchUsed !== '') && (
          <PatchNotesDialog onClose={() => setShowPatchDialog(false)} isOpen={showPatchDialog} patchNotePath={patches.find((v: any) => v.id === patchUsed).contentPath} />
        )}
    </div>
  )
}

export default index
