import { DialogContent, DialogOverlay } from '@reach/dialog';
import { FC, useState } from 'react';
import UrlKnown from '../../../common/UrlKnown';
import cancelIcon from '../../assets/others/cancel.svg';
import MigrationFAQ from '../MigrationFAQ';
import './index.scss';

const index: FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose}) => {
  const [showFAQDialog, setShowFAQDialog] = useState(false)

  return (
    <>
      <MigrationFAQ isOpen={showFAQDialog} onClose={() => setShowFAQDialog(false)}/>
      <DialogOverlay
        style={{ background: "hsla(0, 100%, 100%, 1)", width: '100vw', height: '100vh', top: '0', left: '0', position: 'absolute' }}
        isOpen={isOpen}
        onDismiss={onClose}
        aria-label='Dialog'
      >
        
        <DialogContent
          style={{ width: '100vw', height: '100vh' }}
          className='help-dialog'
          aria-label='Dialog'
        >
          <div className='help-dialog-header'>
            <h1>Help</h1>
            <div className='patch-dialog-exit-btn' tabIndex={0} onClick={onClose}>
              <img src={cancelIcon} alt="" />
            </div>
          </div>
          <div className='help-dialog-cont'>
            <div className='help-dialog-container'>
              <h2>Official Mojang Support</h2>
              <ul>
                <li><div className='help-item' onClick={() => setShowFAQDialog(true)}>Account Migration FAQ</div></li>
                <li><a target='_blank' href={UrlKnown.howToPlayMC} rel="noopener noreferrer">How do I play Minecraft?</a></li>
                <li><a target='_blank' href={UrlKnown.faqSupportCenter} rel="noopener noreferrer">FAQ/Support Center</a></li>
                <li><a target='_blank' href={UrlKnown.mojangSupport} rel="noopener noreferrer">Mojang Support on Twitter</a></li>
                <li><a target='_blank' href={UrlKnown.dungeonsFeedback} rel="noopener noreferrer">Give feedback: Minecraft Dungeons</a></li>
                <li><a target='_blank' href={UrlKnown.javaFeedback} rel="noopener noreferrer">Give feedback: Minecraft: Java Edition Snapshots</a></li>
              </ul>
              <h2>Social Media</h2>
              <ul>
                <li><a target='_blank' href={UrlKnown.twitter} rel="noopener noreferrer">Twitter</a></li>
                <li><a target='_blank' href={UrlKnown.facebook} rel="noopener noreferrer">Facebook</a></li>
                <li><a target='_blank' href={UrlKnown.instagram} rel="noopener noreferrer">Instagram</a></li>
                <li><a target='_blank' href={UrlKnown.youtube} rel="noopener noreferrer">Youtube</a></li>
              </ul>
              <h2>Community Driven Sites</h2>
              <ul>
                <li><a target='_blank' href={UrlKnown.wiki} rel="noopener noreferrer">Minecraft Wiki</a></li>
                <li><a target='_blank' href={UrlKnown.bugrockWiki} rel="noopener noreferrer">Bugrock Wiki</a></li>
                <li><a target='_blank' href={UrlKnown.planetMC} rel="noopener noreferrer">Planet Minecraft</a></li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </DialogOverlay>
    </>
  )
}

export default index
