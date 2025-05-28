
import React, { useState } from 'react';
import Header from '@/components/Header';
import MintPage from '@/components/MintPage';
import MyNFTsPage from '@/components/MyNFTsPage';
import Footer from '@/components/Footer';
import { useAccount } from 'wagmi';

const Index = () => {
  const { isConnected } = useAccount();
  const [currentPage, setCurrentPage] = useState<'mint' | 'my-nfts'>('mint');

  const handleNavigateToMint = () => {
    setCurrentPage('mint');
  };

  const handleNavigateToMyNfts = () => {
    setCurrentPage('my-nfts');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header
        isWalletConnected={isConnected}
        onConnectWallet={() => {}} // No longer needed with RainbowKit
        onNavigateToMint={handleNavigateToMint}
        onNavigateToMyNfts={handleNavigateToMyNfts}
        currentPage={currentPage}
      />
      
      <main className="flex-1">
        {currentPage === 'mint' ? (
          <MintPage isWalletConnected={isConnected} />
        ) : (
          <MyNFTsPage isWalletConnected={isConnected} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
