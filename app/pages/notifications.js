import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useUserProfile } from '../hooks/todo';
import { useRouter } from 'next/router';

const NotificationsPage = () => {
    const { initialized, initializeUser, loading, transactionPending, sendFriendRequest, rejectFriendRequest, allProfileAccounts, bio, acceptFriendRequest, friends, name, requests, sentRequests } = useUserProfile();
    const [pendingRequestsUsers, setPendingRequestsUsers] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (name === '') {
            router.push('/login');
        }
    }, [name]);

    useEffect(() => {
        const pendingRequestsUsers = allProfileAccounts.filter(item => requests.includes(item.publicKey.toString()));
        setPendingRequestsUsers(pendingRequestsUsers);
    }, [allProfileAccounts, requests]);

    return (
        <div>
            <Navbar />
            <div className=''>
                <h2 className='mb-10 mt-5 text-black text-center'>Pending Friend Requests:</h2> 
                <div className='flex justify-center'>
                    {pendingRequestsUsers.length === 0 ? (
                        <div className='bg-white bg-800 w-1/2 flex flex-col h-96 rounded-md p-2 flex items-center justify-center'>
                            <p className='text-gray-300'>No pending friend requests</p>
                        </div>
                    ) : (
                        <ul className='bg-white bg-800 w-1/2 flex flex-col h-40 rounded-md p-2'>
                            {pendingRequestsUsers.map((item, index) => (
                                <li key={index} className=''>
                                    <div className='flex gap-5 p-3 items-center'>
                                        <div className="bg-white w-10 h-10 rounded-full flex justify-center items-center">
                                        <img
                                        src={item.account.profilePicture}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full"
                                    />
                                        </div>
                                        <div className='flex flex-col justify-center gap-1'>
                                            <p className='font-bold text-black '>{item.account.name}</p>
                                            <p className='text-black text-300'>{bio}</p>
                                           
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="bg-green-500 p-2 rounded-md hover:bg-green-400 text-white text-lg" onClick={() => acceptFriendRequest(item.publicKey.toString())}>Accept</button>
                                            <button className="bg-red-500 p-2 rounded-md hover:bg-red-400 text-white text-lg" onClick={() => rejectFriendRequest(item.publicKey.toString())}>Reject</button>
                                        </div>
                                    </div>
                                    <hr className='border border-gray-500'/>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* <WalletMultiButton /> */}
        </div>
    );
};

export default NotificationsPage;
