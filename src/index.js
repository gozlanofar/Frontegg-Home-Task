import ReactDOM from 'react-dom/client';
import App from './App.js'
import './index.css';
import { FronteggProvider } from '@frontegg/react';

const contextOptions = {
baseUrl: 'https://app-57np1g03k1ku.frontegg.com',
clientId: 'd43caac5-f915-431d-9fd2-c99fd32c71bf',
appId: '82cbc0c7-d957-464a-b7ad-6dd6d2477d4c'
};

const authOptions = {
keepSessionAlive: true // Uncomment this in order to maintain the session alive
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

<FronteggProvider
  contextOptions={contextOptions}
  hostedLoginBox={true}
  authOptions={authOptions}
>
  <App />
</FronteggProvider>
, document.getElementById('root') ); 