import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import { useUserProfile } from '../hooks/todo';

const UsersPage = () => {
    const { allProfileAccounts, sendFriendRequest } = useUserProfile();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(allProfileAccounts);
    }, [allProfileAccounts]);

    return (
        <div>
            <Navbar />
            <div className="flex justify-center mt-10">
                <div className="w-full max-w-4xl">
                    <h1 className="text-3xl font-bold mb-6 text-center text-black">All Users</h1>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <ul>
                            {users.map((user, index) => (
                                <li key={index} className="my-3 flex gap-5 p-3 items-center border-b border-gray-200">
                                    <img
                                        src={user.account.profilePicture}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div className="flex flex-col justify-center gap-1 flex-grow">
                                        <p className="font-bold text-black">{user.account.name}</p>
                                        <p className="text-gray-600">{user.account.bio}</p>
                                    </div>
                                    <button
                                        className="bg-sky-900 rounded-md hover:bg-sky-800 text-white p-1"
                                        onClick={() => sendFriendRequest(user.publicKey.toString())}
                                    >
                                        Add Friend
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersPage;
