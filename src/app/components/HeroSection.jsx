"use client";

import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col items-center lg:flex-row lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left lg:max-w-xl"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="block mb-2">Hello, I&apos;m</span>
              <TypeAnimation
                sequence={[
                  "Nagarjuna GS",
                  1000,
                  "Full Stack Dev",
                  1000,
                  "Cloud Enthusiast",
                  1000,
                  "API Developer",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500"
              />
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl mb-8">
              Passionate about creating dynamic, scalable web applications with
              Node.js, Express, Next.js or Angular. Let&apos;s build something
              amazing together!
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8">
              {[
                "Node.js",
                "Express.js",
                "Next.js",
                "Angular",
                "AWS",
                "SQL",
                "PostgreSQL",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm mb-2"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* <Link
                href="/#contact"
                className="px-6 py-3 w-full sm:w-auto text-center rounded-full bg-teal-500 hover:bg-teal-600 text-white font-medium transition duration-300 ease-in-out transform hover:scale-105"
              >
                Hire Me
              </Link> */}
              <Link
                href="/resume.pdf"
                className="px-6 py-3 w-full sm:w-auto text-center rounded-full bg-gray-700 hover:bg-gray-600 text-white font-medium transition duration-300 ease-in-out transform hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mt-12 lg:mt-0"
          >
            <div className="rounded-full bg-gradient-to-br from-teal-400 to-blue-500 p-2 w-64 h-64 mx-auto relative">
              <Image
                src="/images/hero-image.png"
                alt="Nagarjuna GS"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
