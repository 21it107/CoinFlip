import { useState } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';

const network = 'https://api.devnet.solana.com';

const Coinflip = () => {
    const [betAmount, setBetAmount] = useState(0);
    const [side, setSide] = useState('heads');
    const { publicKey, sendTransaction } = useWallet();
    const [result, setResult] = useState('');

    const flipCoin = async () => {
        if (!publicKey) {
            alert('Please connect your wallet!');
            return;
        }

        const outcome = Math.random() < 0.5 ? 'heads' : 'tails';
        const connection = new Connection(network);
        const transaction = new Transaction();

        if (outcome === side) {
            const lamports = betAmount * 2 * 1e9; // 1 SOL = 1e9 Lamports
            const transferInstruction = SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: publicKey, // Send back to the user's wallet if they win
                lamports,
            });
            transaction.add(transferInstruction);

            try {
                await sendTransaction(transaction, connection);
                setResult('You won!');
            } catch (error) {
                console.error(error);
                setResult('Transaction failed.');
            }
        } else {
            setResult('You lost.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">Coinflip Game</h1>
            <div className="mt-5">
                <label>
                    Bet Amount (in SOL):
                    <input
                        type="number"
                        value={betAmount}
                        onChange={(e) => setBetAmount(Number(e.target.value))}
                        className="ml-2 p-2 border rounded"
                    />
                </label>
            </div>
            <div className="mt-5">
                <label>
                    Select Side:
                    <select value={side} onChange={(e) => setSide(e.target.value)} className="ml-2 p-2 border rounded">
                        <option value="heads">Heads</option>
                        <option value="tails">Tails</option>
                    </select>
                </label>
            </div>
            <button
                onClick={flipCoin}
                className="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Flip Coin
            </button>
            {result && <p className="mt-5 text-xl">{result}</p>}
        </div>
    );
};

export default Coinflip;
