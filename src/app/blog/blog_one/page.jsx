"use client";

import React, { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { addComments } from "./actions";
import Image from "next/image";
import Link from "next/link";

export default function BlogOne() {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const adminEmail = "nagarjunags2014@gmail.com";

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch("/api/comments");
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

    try {
      const result = await addComments(
        newComment,
        session.user.name,
        session.user.image
      );

      if (result === "nontoxic") {
        setNewComment("");
        fetchComments();
      } else if (result === "toxic") {
        alert(
          "The comment you are trying to add seems to be inappropriate. Please be respectful and try again."
        );
      } else {
        alert("Failed to add the comment. Please try again later.");
      }
    } catch (error) {
      alert("Failed to add the comment. Please try again later.");
    }
  };

  const handleDeleteComment = async (id) => {
    if (!session || session.user.email !== adminEmail) {
      alert("You are not authorized to delete this comment.");
      return;
    }

    try {
      const response = await fetch("/api/comments", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        alert("Comment deleted successfully.");
        fetchComments();
      } else {
        alert("Failed to delete comment.");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment. Please try again later.");
    }
  };
  console.log(comments);
  console.log("Session:", session);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 py-4 fixed w-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-teal-400">
            DevBlog
          </Link>
          <nav>
            <ul className="flex justify-center items-center space-x-6">
              <li>
                <Link
                  href="/"
                  className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-medium transition duration-300 ease-in-out"
                >
                  Home
                </Link>
              </li>
              <li>
                {session ? (
                  <button
                    onClick={() => signOut()}
                    className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-medium transition duration-300 ease-in-out"
                  >
                    Sign Out
                  </button>
                ) : (
                  <button
                    onClick={() => signIn("google")}
                    className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-medium transition duration-300 ease-in-out"
                  >
                    Sign In
                  </button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl mt-16 font-extrabold text-center mb-8 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent"
        >
          🚀 How to Become a Full Stack Developer in 2024: The Path I Undergone{" "}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          <p>
            Hey there! Welcome to my first blog! 🎉 I wanted to share a bit
            about my journey into the world of full stack development. It’s been
            an exciting ride, diving into both the front-end and back-end of web
            applications. I’ve been blending design, programming, and
            problem-solving skills to create some cool projects. Let’s take a
            look at the path I’ve been on to become a full stack developer!
          </p>
          <p>
            In 2024, full stack development requires knowledge in multiple areas
            such as responsive design, JavaScript frameworks, databases, APIs,
            server management, testing, and more.I hope this path will help you
            navigate the journey to becoming a full stack developer by providing
            a detailed roadmap along with the resources i undergone for each
            step. Ready to start? Let&apos;s go! 🌟
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            1. 📑 Master the Basics: HTML, CSS, and JavaScript
          </h2>
          <p>
            Before diving into full stack development, you need a solid
            understanding of the foundational technologies that power the web.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-2">HTML & CSS:</h3>
          <p>
            HTML (HyperText Markup Language) and CSS (Cascading Style Sheets)
            are the building blocks of web design.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <a
                href="https://www.freecodecamp.org/learn/2022/responsive-web-design/"
                className="text-teal-400 hover:underline"
              >
                Responsive Web Design Certification – FreeCodeCamp
              </a>
              <p className="ml-6">
                Get started with FreeCodeCamp&apos;s comprehensive course on
                responsive design. You&apos;ll learn to create web pages that
                look great on any device 📱🖥️.
              </p>
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">JavaScript (JS):</h3>
          <p>
            JavaScript is the backbone of web interactivity and is vital for
            both front-end and back-end development.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <a
                href="https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/"
                className="text-teal-400 hover:underline"
              >
                JavaScript Algorithms and Data Structures Certification –
                FreeCodeCamp
              </a>
              <p className="ml-6">
                Learn essential algorithms and data structures, preparing you to
                write efficient JavaScript code. 🚀
              </p>
            </li>
            <li>
              <a
                href="https://javascript30.com/"
                className="text-teal-400 hover:underline"
              >
                JavaScript30 – JavaScript30
              </a>
              <p className="ml-6">
                30 JavaScript projects in 30 days! This course is packed with
                real-world scenarios that will level up your JS skills through
                hands-on projects 💻.
              </p>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            2. 🧠 Understand Core Computer Science Concepts
          </h2>
          <p>
            To be a great developer, it&apos;s essential to have a foundation in
            computer science. Understanding algorithms, data structures, and
            system design can greatly improve your ability to write efficient
            code.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <a
                href="https://missing.csail.mit.edu/"
                className="text-teal-400 hover:underline"
              >
                The Missing Semester of Your CS Education – MIT CSAIL
              </a>
              <p className="ml-6">
                A fantastic course that covers essential CS topics such as shell
                scripting, version control, and security. It fills in the gaps
                you might have missed during your formal education.
              </p>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            3. 🔧 Version Control: Git and GitHub
          </h2>
          <p>
            Every developer must know Git, the most popular version control
            system, and GitHub, the platform where developers collaborate.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <a
                href="https://www.linkedin.com/learning/git-and-github-for-developers/"
                className="text-teal-400 hover:underline"
              >
                Git & GitHub for Developers – LinkedIn Learning
              </a>
              <p className="ml-6">
                A great resource to master version control! This course covers
                Git essentials like committing, branching, merging, and
                collaborating with others.
              </p>
            </li>
          </ul>
          <p>
            To improve your Git skills, try contributing to open-source projects
            on GitHub. It will help you apply your knowledge in real-world
            scenarios while gaining exposure to collaborative development.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            4. 🖥️ Linux Basics and Bash Scripting
          </h2>
          <p>
            As a full stack developer, you&apos;ll likely work with Linux-based
            servers. Knowing basic Linux commands and shell scripting can be
            incredibly helpful.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <a
                href="https://www.youtube.com/watch?v=ZtqBQ68cfJc"
                className="text-teal-400 hover:underline"
              >
                Linux Basics in 1-2 Hours – Linux Basics Video
              </a>
              <p className="ml-6">
                This video provides a quick but thorough introduction to Linux,
                covering essential commands, permissions, file systems, and
                globbing patterns.
              </p>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            5. 🌐 Learning Node.js for Backend Development
          </h2>
          <p>
            Node.js is a runtime environment that allows you to run JavaScript
            on the server. It&apos;s essential for full stack developers, as it
            allows for both front-end and back-end development with one
            language.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <a
                href="https://www.youtube.com/watch?v=TlB_eWDSMt4"
                className="text-teal-400 hover:underline"
              >
                Learn Node.js in 1 Hour – Node.js Tutorial
              </a>
              <p className="ml-6">
                This quick tutorial covers everything from setting up a Node.js
                project to creating a basic server 🖥️.
              </p>
            </li>
          </ul>
          <p>
            <strong>Classes and Objects in Node.js:</strong> Understanding
            object-oriented programming (OOP) in Node.js is crucial for
            organizing your code. Implement a LinkedList in Node.js to learn how
            to use classes in JavaScript by implementing data structures like
            LinkedLists. This will improve your understanding of OOP concepts.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            6. ⚡ Promises and Asynchronous Programming in JavaScript
          </h2>
          <p>
            Asynchronous programming allows JavaScript to handle multiple tasks
            simultaneously, making it a critical skill for full stack
            developers.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <a
                href="https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous"
                className="text-teal-400 hover:underline"
              >
                Promises, Async/Await – MDN Web Docs
              </a>
              <p className="ml-6">
                Learn how to manage asynchronous operations using Promises and
                the async/await syntax. Also, explore the Fetch API for making
                HTTP requests.
              </p>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            7. 🛠️ Unit Testing Your Code
          </h2>
          <p>
            Testing your code is important to ensure that it works as expected
            and avoids future bugs. Unit testing allows you to write small tests
            that check individual pieces of code.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <a
                href="https://www.youtube.com/watch?v=FDEf3iWEgFI"
                className="text-teal-400 hover:underline"
              >
                JavaScript Unit Testing – YouTube
              </a>
              <p className="ml-6">
                Learn how to write simple and effective unit tests using
                JavaScript testing libraries. 🧪
              </p>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            8. 🔄 Iterators, Generators, and Advanced JS Concepts
          </h2>
          <p>
            Once you&apos;ve mastered basic JavaScript, it&apos;s time to dive
            into more advanced concepts like iterators and generators. These are
            helpful for handling data streams and writing efficient loops.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <a
                href="https://www.youtube.com/watch?v=gu3FfmgkwUc"
                className="text-teal-400 hover:underline"
              >
                Iterators and Generators in JavaScript – YouTube
              </a>
              <p className="ml-6">
                Get a deep dive into these powerful JS features and understand
                how they can make your code more concise and flexible.
              </p>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            9. 🏗️ TypeScript for Type Safety
          </h2>
          <p>
            TypeScript is a typed superset of JavaScript that helps catch errors
            early, making your code more robust and scalable. It&apos;s widely
            adopted in full stack development.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <a
                href="https://www.totaltypescript.com/tutorials/beginners-typescript"
                className="text-teal-400 hover:underline"
              >
                Beginner&apos;s TypeScript Tutorial – Total TypeScript
              </a>
            </li>
            <li>
              <a
                href="https://www.typescriptlang.org/docs/handbook/intro.html"
                className="text-teal-400 hover:underline"
              >
                TypeScript Handbook – TypeScript Documentation
              </a>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            10. 📡 API Testing with Postman
          </h2>
          <p>
            APIs are essential for communicating between the client and server,
            and Postman is an indispensable tool for testing them.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <a
                href="https://www.postman.com/postman/workspace/postman-30-days-of-postman/overview"
                className="text-teal-400 hover:underline"
              >
                Postman 30 Days Challenge – Postman Workspace
              </a>
              <p className="ml-6">
                This interactive challenge helps you learn API testing from
                scratch.
              </p>
            </li>
            <li>
              <a
                href="https://youtube.com/playlist?list=PL7GozF-qZ4KcpOh6FK1gsIuz49IK8RIdX&si=6ih82QQIrQlYNdYA"
                className="text-teal-400 hover:underline"
              >
                Postman Course Playlist – YouTube
              </a>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            11. 🌐 Networking Concepts for Web Developers
          </h2>
          <p>
            Understanding networking concepts like TCP/IP, DNS, HTTP, and HTTPS
            will help you troubleshoot and optimize web applications.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <a
                href="https://youtu.be/2JYT5f2isg4?si=PTB0ahrS09tDC-gL"
                className="text-teal-400 hover:underline"
              >
                Networking Concepts for Developers – Networking Video
              </a>
              <p className="ml-6">
                This video provides an easy-to-follow introduction to networking
                fundamentals.
              </p>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            12. 📊 Mastering SQL for Databases
          </h2>
          <p>
            SQL (Structured Query Language) is the most commonly used language
            for managing relational databases, such as PostgreSQL, MySQL, and
            SQL Server.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <a
                href="https://sqlbolt.com/"
                className="text-teal-400 hover:underline"
              >
                Learn SQL – SQLBolt
              </a>
              <p className="ml-6">
                SQLBolt provides interactive lessons that teach SQL step by
                step, from basic queries to complex joins.
              </p>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            13. 🔍 Advanced Topics: Functional Programming, TDD, and Design
            Patterns
          </h2>
          <h3 className="text-xl font-semibold mt-6 mb-2">
            Test-Driven Development (TDD):
          </h3>
          <p>
            Write tests first and then develop your code to pass these tests.
            This methodology helps ensure your code is reliable.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>TDD Tutorial – YouTube</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">
            Functional Programming:
          </h3>
          <p>
            Understand functional programming techniques like map, reduce,
            filter, and currying.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions"
                className="text-teal-400 hover:underline"
              >
                Functional Programming in JavaScript – MDN Guide
              </a>
            </li>
          </ul>

          <h3 className="text-xl font-semibold mt-6 mb-2">Design Patterns:</h3>
          <p>Learn design patterns to solve common software design problems.</p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <a
                href="https://refactoring.guru/design-patterns"
                className="text-teal-400 hover:underline"
              >
                Design Patterns – Refactoring Guru
              </a>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            14. ⚛️ React and Next.js for Front-End Development
          </h2>
          <p>
            React and Next.js are key technologies for building fast, dynamic,
            and scalable front-end applications.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <a
                href="https://reactjs.org/docs/getting-started.html"
                className="text-teal-400 hover:underline"
              >
                React Basics – React Official Documentation
              </a>
              <p className="ml-6">
                Start by learning components, state, and hooks like useState and
                useEffect.
              </p>
            </li>
            <li>
              <a
                href="https://nextjs.org/docs"
                className="text-teal-400 hover:underline"
              >
                Next.js Documentation – Next.js Official Docs
              </a>
              <p className="ml-6">
                Learn about Server-Side Rendering (SSR), Client-Side Rendering
                (CSR), and Next.js routing.
              </p>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            15. 🎨 Styling with Tailwind CSS
          </h2>
          <p>
            Tailwind CSS simplifies web design by providing utility classes that
            let you style components easily without writing custom CSS.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <a
                href="https://tailwindcss.com/docs"
                className="text-teal-400 hover:underline"
              >
                Tailwind CSS Documentation – Tailwind Official Docs
              </a>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            16. 🔒 OAuth 2.0 and Microservices Integration
          </h2>
          <p>
            For authentication and authorization, you&apos;ll need to understand
            OAuth 2.0. Microservices architectures also benefit from learning
            OAuth for secure communication.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              <a
                href="https://oauth2simplified.com/"
                className="text-teal-400 hover:underline"
              >
                OAuth 2.0 Overview – OAuth 2.0 Simplified
              </a>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            17. 🎓 Additional Reads and Resources
          </h2>
          <ul className="list-disc list-inside mb-4">
            <li>
              <a
                href="https://eloquentjavascript.net/"
                className="text-teal-400 hover:underline"
              >
                Eloquent JavaScript – Eloquent JavaScript
              </a>
            </li>
            <li>
              <a
                href="https://flukeout.github.io/"
                className="text-teal-400 hover:underline"
              >
                CSS Diner for mastering selectors – CSS Diner
              </a>
            </li>
            <li>
              <a
                href="https://orm.drizzle.team/"
                className="text-teal-400 hover:underline"
              >
                Drizzle ORM Documentation – Drizzle ORM
              </a>
            </li>
            <li>
              <a
                href="https://vitest.dev/"
                className="text-teal-400 hover:underline"
              >
                Vitest for Unit Testing – Vitest
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=Yz4WpE1KMfk"
                className="text-teal-400 hover:underline"
              >
                Hilarious Video on Interfaces and Types – Matt&apos;s Wizardry
              </a>
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">
            🎯 Conclusion: Start Your Full Stack Journey
          </h2>
          <p>
            Becoming a full stack developer is a marathon, not a sprint. With
            these resources, you can learn at your own pace, but remember: the
            most important thing is to apply your knowledge by building
            projects. 💡
          </p>
          <p>
            By mastering the full stack, you&apos;ll be able to create complete
            web applications, from the front-end user interface to the back-end
            server logic, and everything in between. So buckle up, stay
            consistent, and enjoy the process! 🚀
          </p>
          <p className="text-xl font-bold text-center mt-8">Good luck! 🌟</p>
        </motion.div>
        <section className="mt-16">
          <h2 className="text-3xl font-bold mb-6">💬 Comments</h2>
          <form onSubmit={handleSubmitComment} className="mb-8">
            <textarea
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 bg-gray-800 text-gray-100 rounded-md mb-4"
              placeholder="Leave a comment..."
            ></textarea>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-500 text-gray-900 rounded-md hover:bg-teal-400 transition-colors"
            >
              {session ? "Submit Comment" : "Sign in to comment"}
            </button>
          </form>

          <ul className="space-y-4">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="p-4 bg-gray-800 rounded-md flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  {comment.profilePicture ? (
                    <Image
                      src={comment.profilePicture}
                      alt={`${comment.user}'s profile`}
                      className="w-10 h-10 rounded-full"
                      width={300}
                      height={300}
                    />
                  ) : (
                    <Image
                      src="/robot.png"
                      alt={`${comment.user}'s profile`}
                      className="w-10 h-10 rounded-full"
                      width={300}
                      height={300}
                    />
                  )}
                  <div>
                    <p className="text-sm text-teal-400 mb-1">{comment.user}</p>
                    <p className="text-gray-100">{comment.content}</p>
                  </div>
                </div>
                {session && session.user.email === adminEmail && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="ml-4 text-sm text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="bg-gray-800 py-4 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Nagarjuna GS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
