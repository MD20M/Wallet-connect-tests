import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
  WagmiCore,
  WagmiCoreChains,
  WagmiCoreConnectors,
} from "https://unpkg.com/@web3modal/ethereum@2.6.2";
import { Web3Modal } from "https://unpkg.com/@web3modal/html@2.6.2";


//console.log(solanaWeb3);
const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("devnet"));

const keypairs = solanaWeb3.Keypair.generate();

console.log(keypairs);


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

let connectButton = document.getElementById("connectButton");

connectButton.addEventListener("click", async () => {
  await web3modal.openModal()
});

let changeChainButton = document.getElementById("changeChainButton");

changeChainButton.addEventListener("click", async () => {
  await web3modal.setDefaultChain(polygon)
});

/////////////////////////////////////////////////////////////
let solConnectBtn = document.getElementById("solConnect");

solConnectBtn.addEventListener("click", async () => {
  await window.solflare.connect();
});
/////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
const { createClient } = supabase
const _supabase = createClient('https://tiydslbpuiyjczpcbgpc.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpeWRzbGJwdWl5amN6cGNiZ3BjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAzMDIxNjQsImV4cCI6MjAwNTg3ODE2NH0.PqFWBpujnGoanrFqy-Saz8Yyq4b5yycs_dvMIacmTf8')
console.log('Supabase Instance: ', _supabase)



async function signInWithDiscord() {
  const { data, error } = await _supabase.auth.signInWithOAuth({
    provider: 'discord',
    options: {
      scopes: 'identify guilds guilds.members.read connections email'
    }
  })
}

let disButton = document.getElementById("disButton");

disButton.addEventListener("click", async () => {
  await signInWithDiscord()
});

const isLoggedInFunc = async () => {
  const { session } = await _supabase.auth.getSession();
  return !session;
};

const isLoggedIn = await isLoggedInFunc();
console.log(isLoggedIn);
if (isLoggedIn) {
  console.log("User is logged in");
  const { data: { user } } = await _supabase.auth.getUser();
  console.log(await _supabase.auth.getUser())
  console.log(user.user_metadata);
  //console.log(user.user_metadata.full_name);
  disButton.textContent = user.user_metadata.full_name;
  console.log("<img src="+ user.user_metadata.avatar_url +'/>')
  disButton.innerHTML = "<img src='"+ user.user_metadata.avatar_url +"'/>" + user.user_metadata.full_name
} else {
  console.log("User is not logged in");
}

let disButtonOut = document.getElementById("disButtonOut");
async function signout() {
  const { error } = await _supabase.auth.signOut()
}
disButtonOut.addEventListener("click", async () => {
  await signout()
  disButton.textContent = "Discord Login";
});

//////////////////////////////////////////////////////////////////////////////////////////////////

