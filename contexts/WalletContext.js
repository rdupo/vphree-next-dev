// WalletContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [connectedAddress, setConnectedAddress] = useState('');
  const [walletChanged, setWalletChanged] = useState(false);

  useEffect(() => {
    // Use the Ethereum provider to listen for wallet changes
    const handleAccountsChanged = (accounts) => {
      // Update the connected wallet when the active account changes
      setConnectedAddress(accounts[0] || '');
      setWalletChanged(true); // Set walletChanged to true on account change
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      // Cleanup event listener when component unmounts
      if (window.ethereum) {
        window.ethereum.off('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const value = {
    connectedAddress,
    setConnectedAddress,
    walletChanged,
    setWalletChanged,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}
