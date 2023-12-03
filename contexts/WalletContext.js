// contexts/WalletContext.js
import { createContext, useContext, useState } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [connectedAddress, setConnectedAddress] = useState('');

  return (
    <WalletContext.Provider value={{ connectedAddress, setConnectedAddress }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  return useContext(WalletContext);
};
