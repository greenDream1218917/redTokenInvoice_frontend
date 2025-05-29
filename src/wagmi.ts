import { createConfig, Chain, http  } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';

// Define Hedera Testnet as a custom chain
export const hederaTestnet: Chain = {
  id: 296,
  name: 'Hedera Testnet',
  network: 'hedera-testnet',
  nativeCurrency: {
    name: 'HBAR',
    symbol: 'HBAR',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://testnet.hashio.io/api'],
    },
    public: {
      http: ['https://testnet.hashio.io/api'],
    },
  },
  blockExplorers: {
    default: {
      name: 'HashScan',
      url: 'https://hashscan.io/testnet',
    },
  },
  testnet: true,
  iconUrl: './hedera.svg',
  iconBackground: '#4A90E2',
};

// Supported chains
const chains: Chain[] = [hederaTestnet];

// Define connectors properly
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [metaMaskWallet],
  },
],   {
  appName: 'My RainbowKit App',
  projectId: '72c315afaa36aeb3e9d31839be8bd671',
});

// Create the WAGMI config
export const config = createConfig({
  connectors,
  chains,
  transports: {
    [mainnet.id]: http('https://mainnet.example.com'),
    [hederaTestnet.id]: http('https://testnet.hashio.io/api'),
  }
});
