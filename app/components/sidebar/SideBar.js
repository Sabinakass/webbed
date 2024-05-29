import { useUserProfile } from '../../hooks/todo';

export default function SideBar() {
    const { initialized, initializeUser, loading, transactionPending, sendFriendRequest, acceptFriendRequest, friends, name, requests, sentRequests, allProfileAccounts } = useUserProfile();
    const threeUsers = allProfileAccounts.slice(0, 3);

    return (
    <div className="bg-white bg-800 h-90 w-100 rounded-xl">
        <div className='px-2 pt-2'>
        <p className="text-center text-black mb-3">Similar profiles</p>
        
        <ul className=''>
                    {threeUsers.map((item, index) => (
                        <li key={index} >
                            <div className=' my-3 flex gap-5 p-3 items-center'>
                                    
                            <img
                                        src={item.account.profilePicture}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />

                                <div className='flex flex-col justify-center gap-1'>
                                    <p className='font-bold text-black '>{item.account.name}</p>
                                    <p className='text-black text-300'>{item.account.bio}</p>
                                   
                                </div>
                                <button className="bg-sky-900 rounded-md hover:bg-sky-800 text-white p-1 " onClick={() => sendFriendRequest(item.publicKey.toString())}>Add Friend</button>
                            </div>
                            
                            <hr className='border border-gray-500'/>
                        </li>
                        
                ))}
                
        </ul>
        </div>
        <a href="/users" className="text-center">
                <button className="w-full rounded-bl-md rounded-br-md hover:bg-white-200 text-blue-500 text-lg">
                    <p className='m-2'>View all</p>
                </button>
        </a>
    </div>
    )

}