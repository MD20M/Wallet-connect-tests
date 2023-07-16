import React, {FC, ReactNode, useMemo} from 'react';
//import logo from './logo.svg';
import './App.css';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal, Web3Button, Web3NetworkSwitch } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'



const chains = [arbitrum, mainnet, polygon]
const projectId = '0205b72056f86f430adfbbf1a2a05180'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

function HomePage() {
  return <Web3Button />
}

function App() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <HomePage />
      </WagmiConfig>
      <button>Connect</button>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} explorerRecommendedWalletIds={[
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
    'a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393'
  ]}/>
      <Web3NetworkSwitch></Web3NetworkSwitch>
    </>
  )
}

export default App;