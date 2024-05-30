import React from 'react';
import { useUserProfile } from '../../hooks/todo';

const Sidebar = () => {
  const { initialized, initializeUser, loading, transactionPending, sendFriendRequest, acceptFriendRequest, friends, name, requests, sentRequests, allProfileAccounts, publicKey } = useUserProfile();

  

  const threeUsers = allProfileAccounts.slice(0, 3);

  return (
    <div className="sidebar bg-white rounded-xl mt-10 w-45"> {/* Increased width to w-96 */}
      <ul>
        {threeUsers.map((item, index) => (
          <li key={index}>
            <div className='my-3 flex gap-5 p-3 items-center'>
              <img
                src={item.account.profilePicture}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className='flex flex-col justify-center gap-1'>
                <p className='font-bold text-black'>{item.account.name}</p>
                <p className='text-gray-600'>{item.account.bio}</p>
              </div>
              <button
                className="bg-sky-900 rounded-md hover:bg-sky-800 text-white p-1"
                onClick={() => sendFriendRequest(item.publicKey.toString())}
              >
                Add Friend
              </button>
            </div>
            <hr className='border border-gray-500' />
          </li>
        ))}
      </ul>
      <a href="/users" className="text-center">
        <button className="w-full bg-white hover:bg-gray-200 text-blue-500 text-lg rounded-bl-md rounded-br-md">
          <p className='m-2'>View all</p>
        </button>
      </a>
    </div>
  );
}

export default Sidebar;
