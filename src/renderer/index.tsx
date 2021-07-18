import { ipcRenderer } from 'electron';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <button onClick={() => {
      ipcRenderer.send('mcutsl:launchBugrock')
    }}>Launcher</button>
  </React.StrictMode>,
  document.getElementById('root')
)