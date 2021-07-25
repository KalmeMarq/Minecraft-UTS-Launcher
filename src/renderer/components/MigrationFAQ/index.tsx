import { DialogContent, DialogOverlay } from '@reach/dialog';
import { FC, useEffect, useState } from 'react';
import UrlKnown from '../../../common/UrlKnown';
import cancelIcon from '../../assets/others/cancel.svg';
import './index.scss';

const index: FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose}) => {
  const [faq, setFaq] = useState([] as any)

  useEffect(() => {
    fetch(UrlKnown.faq).then(res => res.json())
    .then(data => {
      setFaq(data.data)
    })
  }, [])

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
          className='faq-dialog'
          aria-label='Dialog'
        >
          <div className='faq-dialog-header'>
            <h1>Account Migration FAQ</h1>
            <div className='patch-dialog-exit-btn' tabIndex={0} onClick={onClose}>
              <img src={cancelIcon} alt="" />
            </div>
          </div>
          <div className='faq-dialog-cont'>
            <div className='faq-dialog-container'>
              
              { faq.length > 0 && (
                <>
                  <h2>Frequently asked questions</h2>
                  <div className='faq-context' dangerouslySetInnerHTML={{
                    __html: faq[0].description
                  }}>
                    
                  </div>
                  <div className='faq-qas'>
                    {faq[0].qas.map((e: any) => (
                      <div className='faq-qa' key={e.id}>
                        <div className='faq-qa-question'>
                          <b>Q</b>
                          <div dangerouslySetInnerHTML={{__html: e.question}}></div>
                        </div>
                        <div className='faq-qa-answer'>
                          <b>A</b>
                          <div  dangerouslySetInnerHTML={{__html: e.answer}}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </DialogOverlay>
    </>
  )
}

export default index
