"use client";

import Link from "next/link";
import React, { useState } from "react";
import NavLink from "./NavLink";
import { Menu, X } from "lucide-react";
import MenuOverlay from "./MenuOverlay";
import { signIn, signOut, useSession } from "next-auth/react";

const navLinks = [
  {
    title: "About",
    path: "#about",
  },
  // {
  //   title: "Projects",
  //   path: "#projects",
  // },
  {
    title: "Contact",
    path: "#contact",
  },
  {
    title: "My Blogs",
    path: "/blog/blog_one",
  },
];

export default function Navbar() {
  const { data: session } = useSession(); // Access the current session
  const [navbarOpen, setNavbarOpen] = useState(false);
  console.log("session:", session);

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-gray-900 bg-opacity-95 text-white">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl md:text-3xl font-bold text-teal-400">
          My Portfolio :)
        </Link>
        <div className="mobile-menu block md:hidden">
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className="flex items-center px-3 py-2 border rounded border-teal-400 text-teal-400 hover:text-white hover:border-white"
            >
              <Menu className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className="flex items-center px-3 py-2 border rounded border-teal-400 text-teal-400 hover:text-white hover:border-white"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
            <li>
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-medium transition duration-300 ease-in-out"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => signIn("google")} // Sign in with Google
                  className="px-4 py-2 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-medium transition duration-300 ease-in-out"
                >
                  Sign In
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
      {navbarOpen ? <MenuOverlay links={navLinks} /> : null}
    </nav>
  );
}
