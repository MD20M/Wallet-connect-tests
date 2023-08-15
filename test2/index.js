import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
  WagmiCore,
  WagmiCoreChains,
  WagmiCoreConnectors,
} from "https://unpkg.com/@web3modal/ethereum@2.6.2";
import { Web3Modal } from "https://unpkg.com/@web3modal/html@2.6.2";

//import { Connection, PublicKey } from 'https://unpkg.com/@solana/web3.js@latest/lib/index.iife.js';



//solana wallet adapter for all solana wallets in javascript using https imports
//import { WalletAdapterNetwork } from "https://cdn.jsdelivr.net/npm/@solana/wallet-adapter-base";



//console.log(solanaWeb3);
const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"));

const keypairs = solanaWeb3.Keypair.generate();

console.log(keypairs);



//import { PhantomWallet } from "../node_modules/@solana/wallet-adapter-phantom";
//console.log(solWeb3);
// 0. Import wagmi dependencies
const { mainnet, polygon, avalanche, arbitrum } = WagmiCoreChains;
const { configureChains, createConfig } = WagmiCore;

// 1. Define chains
const chains = [mainnet, polygon, avalanche, arbitrum];
const projectId = "0205b72056f86f430adfbbf1a2a05180";



// 2. Configure wagmi client
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    ...w3mConnectors({ chains, version: 2, projectId }),
    new WagmiCoreConnectors.CoinbaseWalletConnector({
      chains,
      options: {
        appName: "html wagmi example",
      },
    }),
  ],
  publicClient,
});

const ethClient = new EthereumClient(wagmiConfig, chains)
const web3modal = new Web3Modal({ projectId }, ethClient)

let connectButton = document.getElementById("connectButton");

connectButton.addEventListener("click", async () => {
  await web3modal.openModal()
});

let changeChainButton = document.getElementById("changeChainButton");

changeChainButton.addEventListener("click", async () => {
  await web3modal.setDefaultChain(polygon)
});


// 3. Create ethereum and modal clients
const ethereumClient = new EthereumClient(wagmiConfig, chains);
export const web3Modal = new Web3Modal(
  {
    projectId,
    walletImages: {
      safe: "https://pbs.twimg.com/profile_images/1566773491764023297/IvmCdGnM_400x400.jpg",
    },
  },
  ethereumClient
);