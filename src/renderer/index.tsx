import { TranslationProvider } from '@mojang/t-component';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import en from './assets/locales/langs/en-US.json';
import pt from './assets/locales/langs/pt-PT.json';
import './index.scss';

let enUS = {
  domain: 'messages',
  locale_data: Object.assign({
    messages: {
      '': {
        domain: 'messages',
        lang: 'en-US',
        plural_forms: 'nplurals=2; plural=(n != 1);',
      }
    }
  },
  en)
}

let ptPT = {
  domain: 'messages',
  locale_data: Object.assign({
    messages: {
      '': {
        domain: 'messages',
        lang: 'pt-PT',
        plural_forms: 'nplurals=2; plural=(n != 1);',
      }
    }
  },
  pt)
}

const Root = () => {
  return (
    <>
      <TranslationProvider translation={enUS}>
        <App />
      </TranslationProvider>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
)