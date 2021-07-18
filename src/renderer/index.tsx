import { TranslationProvider } from '@mojang/t-component';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';

const translations = [
  {
    domain: 'messages',
    locale_data: {
      messages: {
        '': {
          domain: 'messages',
          lang: 'en-US',
          plural_forms: 'nplurals=2; plural=(n != 1);',
        },
        News: ['News'],
        Settings: ['Settings'],
        Play: ['Play'],
        Installations: ['Installations'],
        Skins: ['Skins'],
        PatchNotes: ['Patch notes']
      }
    }
  },
  {
    domain: 'mensagens',
    locale_data: {
      mensagens: {
        '': {
          domain: 'mensagens',
          lang: 'pt-PT',
          plural_forms: 'nplurals=2; plural=(n != 1);',
        },
        News: ['Notícias'],
        Settings: ['Definições'],
        Play: ['Jogar'],
        Installations: ['Instalações'],
        Skins: ['Skins'],
        PatchNotes: ['Notas de lançamento']
      }
    }
  }
]

const Root = () => {
  const [state, setstate] = useState(0)

  return (
    <TranslationProvider translation={translations[state]}>
      <App onLangChange={(i: number) => {
        console.log(state);
        setstate(i)
      }} />
      <h1>{state}</h1>
    </TranslationProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
)