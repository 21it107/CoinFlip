import { useMemo, useEffect } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    PhantomWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
    ConnectionProvider,
    WalletProvider,
    useWallet,
    WalletNotReadyError,
} from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

require('@solana/wallet-adapter-react-ui/styles.css');

const WalletConnectionProvider = ({ children }) => {
    const network = WalletAdapterNetwork.Devnet;

    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
    ], [network]);

    useEffect(() => {
        const checkWalletReady = async () => {
            const phantomWallet = new PhantomWalletAdapter();
            try {
                if (!phantomWallet.ready) {
                    console.warn('Phantom wallet not ready yet. Please ensure it is installed and open.');
                }
            } catch (error) {
                if (error instanceof WalletNotReadyError) {
                    console.error('Phantom wallet not ready error:', error.message);
                }
            }
        };

        checkWalletReady();
    }, []);

    return (
        <ConnectionProvider endpoint={`https://api.devnet.solana.com`}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const WalletConnection = () => {
    return (
        <div className="flex justify-center items-center">
            <WalletMultiButton />
        </div>
    );
};

export { WalletConnectionProvider, WalletConnection };
