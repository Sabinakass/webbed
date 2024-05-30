import React, { useState, useEffect, useMemo } from 'react';
import { useUserProfile } from '../../hooks/todo';
import { useConnection, useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { TODO_PROGRAM_PUBKEY } from '../../constants';
import { IDL as profileIdl } from '../../constants/idl';
import * as anchor from '@project-serum/anchor';

const Post = ({ profileName, profilePicture, content, postImage, createdTime, profileAuthority, postPublicKey, likeCount, commentCount }) => {
  const { addComment, comments, allProfileAccounts, likePost, deleteLike, bio } = useUserProfile();
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const anchorWallet = useAnchorWallet();
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [postComments, setPostComments] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false); 

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };


  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions());
      return new anchor.Program(profileIdl, TODO_PROGRAM_PUBKEY, provider);
    }
  }, [connection, anchorWallet]);

  const toggleComments = async () => {
    setShowComments(!showComments);
    if (!showComments) {
      await fetchPostComments(postPublicKey);
      console.log(comments);
    }
  };

  useEffect(() => {
    if (likeCount.some((like) => like.toBase58() === publicKey.toBase58())) {
      setIsLiked(true);
    }
    }, [likeCount]);


  const fetchPostComments = async (postPublicKey) => {
    if (program) {
      try {
        setLoading(true);
        const commentAccounts = await program.account.comment.all();
        const commentAccounts2 = commentAccounts.filter(comment => comment.account.post.toBase58() === postPublicKey.toBase58());
        console.log("commentAccounts: ", commentAccounts2);
        setUserComments(commentAccounts2.map(account => account.account));
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleLikes = async () => {
    if (isLiked) {
      deleteLike(postPublicKey, publicKey);
    } else {
      likePost(postPublicKey, publicKey);
    }
    setIsLiked(!isLiked);
  };
  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    addComment(newComment, new Date().toString(), postPublicKey);
    setNewComment('');
  };

  const combinedComments = userComments.map((comment) => {
    const authorInfo = allProfileAccounts.find((account) => account.account.authority.toBase58() === comment.authority.toBase58());
    return {
      commentInfo: comment,
      userInfo: authorInfo,
    };
  });

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-4 shadow-md rounded-md mb-4 w-1/2 relative">
        <div className="flex items-center mb-4">
          <img src={profilePicture} alt="Profile" className="w-12 h-12 rounded-full mr-2 object-cover" />
          <div>
            <h2 className="font-semibold text-lg text-black">{profileName}</h2>
            <p className="text-gray-500">{bio}</p>
          </div>
          <div className="text-gray-500 text-sm absolute top-4 right-4">{formatDate(createdTime)}</div>
        </div>
        <p className="text-gray-800">{content}</p>
        {postImage && (
          <img src={postImage} alt="Post" className="w-full mt-4 rounded-md" />
        )}
        <hr className="my-3" />
        <div className="flex gap-10 items-center w-1/2">
          <button
            className={`flex items-center ${isLiked ? 'text-red-500' : 'text-black'}`}
            onClick={toggleLikes}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <span className="text-gray-500 ml-1">{likeCount.length}</span>
          </button>

          <button className="flex items-center" onClick={toggleComments}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
            <span className="text-gray-500 ml-1">{commentCount}</span>
          </button>

          
        </div>

        {showComments && (
          <div className="mt-4 text-teal-800">
            {combinedComments.map((comment, index) => (
              <div key={index} className="bg-gray-100 p-2 rounded-md mt-2">
                <h3 className="font-semibold text-black">{comment.userInfo.account.name}</h3>
                <p className="text-sm">{comment.commentInfo.content}</p>
                <p className="text-xs text-gray-500">{formatDate(comment.commentInfo.createdAt)}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4">
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 text-black"
            placeholder="Write a comment..."
            value={newComment}
            onChange={handleCommentChange}
          ></textarea>
          <button
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleCommentSubmit}
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
