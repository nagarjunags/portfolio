"use client";

import React, { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { motion } from "framer-motion";

export default function BlogOne() {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch("/comments.json");
      const fetchedComments = await response.json();
      setComments(fetchedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!session) {
      signIn("google");
      return;
    }

    if (newComment.trim() === "") return;

    // Prepare the comment for the Perspective API
    const perspectiveAPIKey = process.env.PERSPECTIVE_API_KEY;
    console.log(perspectiveAPIKey);
    const perspectiveAPIURL = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${perspectiveAPIKey}`;

    const perspectiveRequest = {
      comment: {
        text: newComment,
      },
      requestedAttributes: {
        TOXICITY: {},
      },
    };

    try {
      // Send the comment to the Perspective API
      const perspectiveResponse = await fetch(perspectiveAPIURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(perspectiveRequest),
      });

      const perspectiveData = await perspectiveResponse.json();

      const toxicityScore =
        perspectiveData.attributeScores?.TOXICITY?.summaryScore?.value;

      // Check if the comment is too toxic (you can adjust the threshold)
      if (toxicityScore > 0.7) {
        alert(
          "Your comment seems inappropriate. Please revise it to be more respectful."
        );
        return;
      }

      // If the comment is appropriate, proceed to add it to your system
      const newCommentObj = {
        id: Date.now().toString(),
        user: session.user?.name || "Anonymous",
        content: newComment,
        createdAt: new Date().toISOString(),
      };

      // Post the new comment to your backend API
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCommentObj),
      });

      if (response.ok) {
        setNewComment("");
        fetchComments(); // Refresh comments after successfully adding
      } else {
        console.error("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          My First Blog Post
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-invert max-w-none"
        >
          <p>
            This is the content of my first blog post. It&apos;s a great place
            to share my thoughts, experiences, and insights about web
            development, technology, and more.
          </p>
          {/* Add more blog content here */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-800 p-4 rounded-lg mb-4">
              <p className="font-semibold">{comment.user}</p>
              <p>{comment.content}</p>
              <p className="text-sm text-gray-400 mt-2">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))}

          {session ? (
            <form onSubmit={handleSubmitComment} className="mt-8">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-2 rounded-lg bg-gray-800 text-white"
                rows={4}
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-medium transition duration-300 ease-in-out"
              >
                Post Comment
              </button>
            </form>
          ) : (
            <div className="mt-8 text-center">
              <p className="mb-4">Please sign in to leave a comment.</p>
              <button
                onClick={() => signIn("google")}
                className="px-4 py-2 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-medium transition duration-300 ease-in-out"
              >
                Sign In
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
