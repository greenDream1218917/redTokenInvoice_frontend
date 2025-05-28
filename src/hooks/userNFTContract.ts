import { useReadContract, useAccount } from 'wagmi';
import { useState, useEffect } from 'react';

// You'll need to replace this with your actual contract address
const NFT_CONTRACT_ADDRESS = '0x...'; // Replace with your contract address

// Basic ERC721 ABI for tokenOfOwnerByIndex and other functions
const NFT_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {"internalType": "uint256", "name": "index", "type": "uint256"}],
    "name": "tokenOfOwnerByIndex",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "tokenURI",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export interface NFT {
  tokenId: number;
  metadata: NFTMetadata | null;
  tokenURI: string;
}

export const useNFTContract = () => {
  const { address } = useAccount();
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(false);

  // Get the balance of NFTs owned by the user
  const { data: balance } = useReadContract({
    address: NFT_CONTRACT_ADDRESS as `0x${string}`,
    abi: NFT_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // Function to fetch metadata from tokenURI
  const fetchMetadata = async (tokenURI: string): Promise<NFTMetadata | null> => {
    try {
      console.log('Fetching metadata from:', tokenURI);
      
      // Handle IPFS URLs
      let url = tokenURI;
      if (tokenURI.startsWith('ipfs://')) {
        url = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/');
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const metadata = await response.json();
      
      // Handle IPFS image URLs
      if (metadata.image && metadata.image.startsWith('ipfs://')) {
        metadata.image = metadata.image.replace('ipfs://', 'https://ipfs.io/ipfs/');
      }
      
      return metadata;
    } catch (error) {
      console.error('Error fetching metadata:', error);
      return null;
    }
  };

  // Function to get token ID by index
  const getTokenOfOwnerByIndex = (index: number) => {
    return useReadContract({
      address: NFT_CONTRACT_ADDRESS as `0x${string}`,
      abi: NFT_ABI,
      functionName: 'tokenOfOwnerByIndex',
      args: address ? [address, BigInt(index)] : undefined,
      query: {
        enabled: !!address && balance !== undefined,
      },
    });
  };

  // Function to get token URI
  const getTokenURI = (tokenId: bigint) => {
    return useReadContract({
      address: NFT_CONTRACT_ADDRESS as `0x${string}`,
      abi: NFT_ABI,
      functionName: 'tokenURI',
      args: [tokenId],
      query: {
        enabled: !!tokenId,
      },
    });
  };

  // Load all NFTs
  useEffect(() => {
    const loadNFTs = async () => {
      if (!address || !balance || balance === 0n) {
        setNfts([]);
        return;
      }

      setLoading(true);
      console.log(`Loading ${balance.toString()} NFTs for address:`, address);

      try {
        const nftPromises = [];
        
        for (let i = 0; i < Number(balance); i++) {
          nftPromises.push(loadSingleNFT(i));
        }

        const loadedNFTs = await Promise.all(nftPromises);
        setNfts(loadedNFTs.filter(nft => nft !== null) as NFT[]);
      } catch (error) {
        console.error('Error loading NFTs:', error);
        setNfts([]);
      } finally {
        setLoading(false);
      }
    };

    const loadSingleNFT = async (index: number): Promise<NFT | null> => {
      try {
        // This is a simplified approach - in a real implementation, you'd want to use
        // multiple useReadContract calls properly
        console.log(`Loading NFT at index ${index}`);
        
        // For now, return a placeholder structure
        // You'll need to implement the actual contract calls here
        return {
          tokenId: index + 1, // Placeholder
          metadata: null,
          tokenURI: '',
        };
      } catch (error) {
        console.error(`Error loading NFT at index ${index}:`, error);
        return null;
      }
    };

    loadNFTs();
  }, [address, balance]);

  return {
    nfts,
    loading,
    balance: balance ? Number(balance) : 0,
    contractAddress: NFT_CONTRACT_ADDRESS,
  };
};