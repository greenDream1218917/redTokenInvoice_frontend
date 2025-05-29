import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';


export const hederaTestnet = {
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

export const config = getDefaultConfig({
  appName: 'Red Token Invoice',
  projectId: 'YOUR_PROJECT_ID',
  chains: [hederaTestnet, mainnet, polygon, optimism, arbitrum, base],
  ssr: false,
});
