import React from 'react';
import logo from './logo.svg';
import './App.css';
import { 
  init, PhantomConnector, WalletConnectConnector, 
  InjectedConnector, mainnetBetaWalletConnect, connect, switchConnector
} from '@walletconnect/solib'



const PROJECT_ID: string = "0205b72056f86f430adfbbf1a2a05180";

init(
  () => ({
    connectorName: WalletConnectConnector.connectorName,
    connectors: [
      new PhantomConnector(),
      new InjectedConnector('window.solflare'),
      new InjectedConnector('window.solana'),
      new WalletConnectConnector({
        relayerRegion: 'wss://relay.walletconnect.com',
        metadata: {
          description: 'Test app for solib',
          name: 'Test Solib dApp',
          icons: ['https://avatars.githubusercontent.com/u/37784886'],
          url: 'http://localhost:3000'
        },
        autoconnect: true,
        qrcode: true
      })
    ],
    chosenCluster: mainnetBetaWalletConnect()
  }),
  PROJECT_ID
);



const connectWallet = async () => {
  await connect()
};

function App() {




  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={connectWallet} >Connect Wallet</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
