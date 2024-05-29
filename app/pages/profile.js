// ProfilePage.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import { useUserProfile } from '../hooks/todo';
import { useRouter } from 'next/router';
import Post from '../components/post/Post';

const ProfilePage = () => {
  const { initialized, loading, transactionPending, friends, name, profilePicture, userPosts, initializeUser, bio } = useUserProfile();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (name === '') {
      router.push('/login');
    }
  }, [name]);
  return (
    <div>
      <Navbar />
      <h1 className="text-center text-xl font-bold mt-3 text-black">Your profile</h1>
      <main className="rounded-md my-5 mx-20 flex gap-5">
        <div className="bg-white shadow-lg w-1/3 rounded-md flex flex-col items-center pt-10 mt-10 p-5">
          <div className="w-24 h-24 rounded-full mb-3 flex justify-center items-center">
            <img src={profilePicture} alt="profile picture" className="w-24 h-24 rounded-full object-cover" />
          </div>
          <span className="text-gray-800 text-2xl font-semibold mb-1">{name}</span>
          <span className="text-gray-600 text-lg font-semibold mb-5">{bio}</span>
         
        </div>
        <div className="w-2/3 bg-white shadow-lg rounded-md p-5">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold">Posts</h2>
          </div>
          <div className="posts-container">
            {userPosts.map((post, index) => (
              <Post
                key={index}
                profileName={name}
                profilePicture={profilePicture}
                content={post.content}
                postImage={post.image}
                createdTime={post.createdAt}
                likeCount={post.likes}                                
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
