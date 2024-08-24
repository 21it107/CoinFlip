import { WalletConnection } from '../components/WalletConnection';
import Coinflip from '../components/Coinflip';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <WalletConnection />
            <Coinflip />
        </div>
    );
}
