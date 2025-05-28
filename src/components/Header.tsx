
import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface HeaderProps {
  isWalletConnected: boolean;
  onConnectWallet: () => void;
  onNavigateToMint: () => void;
  onNavigateToMyNfts: () => void;
  currentPage: 'mint' | 'my-nfts';
}

const Header = ({ 
  onNavigateToMint, 
  onNavigateToMyNfts,
  currentPage 
}: HeaderProps) => {
  return (
    <header className="bg-red-600 shadow-lg">
      <link rel="icon" href="/favicon.ico" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white mr-8">Red Token Invoice</h1>
            <nav className="flex space-x-4">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateToMint();
                }}
                className={`px-4 py-2 rounded border transition-colors ${
                  currentPage === 'mint' 
                    ? 'bg-white text-red-600 hover:bg-gray-100' 
                    : 'text-white border-white hover:bg-red-700'
                }`}
              >
                Mint
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateToMyNfts();
                }}
                className={`px-4 py-2 rounded border transition-colors ${
                  currentPage === 'my-nfts' 
                    ? 'bg-white text-red-600 hover:bg-gray-100' 
                    : 'text-white border-white hover:bg-red-700'
                }`}
              >
                My NFTs
              </a>
            </nav>
          </div>
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === 'authenticated');

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <button
                          onClick={openConnectModal}
                          type="button"
                          className="h-10 px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                          Connect Wallet
                        </button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <button
                          onClick={openChainModal}
                          type="button"
                          className="h-10 px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                          Wrong network
                        </button>
                      );
                    }

                    return (
                      <div className="flex gap-2">
                        <button
                          onClick={openChainModal}
                          type="button"
                          className="h-10 px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 12,
                                height: 12,
                                borderRadius: 999,
                                overflow: 'hidden',
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  style={{ width: 12, height: 12 }}
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                        </button>

                        <button
                          onClick={openAccountModal}
                          type="button"
                          className="h-10 px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                        >
                          {account.displayName}
                          {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ''}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </div>
    </header>
  );
};

export default Header;
