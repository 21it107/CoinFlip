import '../styles/globals.css';
import { WalletConnectionProvider } from '../components/WalletConnection';

function MyApp({ Component, pageProps }) {
    return (
        <WalletConnectionProvider>
            <Component {...pageProps} />
        </WalletConnectionProvider>
    );
}

export default MyApp;
