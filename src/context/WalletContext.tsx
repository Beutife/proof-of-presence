import { createContext, useMemo, useContext } from 'react';
import type { ReactNode } from 'react';
import { useAccount, useWalletClient, usePublicClient } from 'wagmi';

interface WalletState {
  address: string | null;
  isConnected: boolean;
  walletClient: any;
  publicClient: any;
}

export const WalletContext = createContext<WalletState | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  // Debug logging
  console.log('WalletContext state:', { 
    address, 
    isConnected, 
    hasWalletClient: !!walletClient, 
    hasPublicClient: !!publicClient 
  });

  const walletState = useMemo(
    () => ({
      address: isConnected && address ? address : null,
      isConnected,
      walletClient,
      publicClient,
    }),
    [address, isConnected, walletClient, publicClient]
  );

  return (
    <WalletContext.Provider value={walletState}>
      {children}
    </WalletContext.Provider>
  );
}