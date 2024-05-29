import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useUserProfile } from '../hooks/todo';

const LoginPage = () => {
    const router = useRouter();
    const { publicKey, initialized } = useUserProfile();
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() => {
        if (publicKey) {
           
            if (initialized) {
                setIsRegistered(true);
                router.push('/main');
            } else {
                setIsRegistered(false);
            }
        }
    }, [publicKey, initialized, router]);

    return (
        <div className="flex justify-center items-center h-full w-full p-5">
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-5">
                    <WalletMultiButton />
                </div>
                {!publicKey && (
                    <div className="text-center text-lg text-black">
                        Please connect your wallet to log in.
                    </div>
                )}
                {publicKey && !initialized && (
                    <div className="text-center text-lg text-red-500">
                        You are not registered. Please <a href="/register" className="text-blue-500 underline">register here</a>.
                    </div>
                )}
                <div className="mt-6 text-center text-black">
                    New here? <a href="/register" className="text-blue-500 underline">Register</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
