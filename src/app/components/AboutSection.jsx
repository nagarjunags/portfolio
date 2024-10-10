"use client";

import React, { useTransition, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="grid grid-cols-2 gap-2 text-sm">
        <li className="flex items-center">
          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>Node.js
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
          Express.js
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>Next.js
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
          React.js
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
          Tailwind CSS
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>Git
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>GitHub
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>Linux
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>AWS
          (beginner)
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>API
          Building & Testing (Postman)
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>C, C++,
          Java, Python
        </li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="space-y-2 text-sm">
        <li className="flex items-start">
          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 mt-1.5"></span>
          <div>
            <p className="font-semibold">
              Electronics and Communication Engineering
            </p>
            <p className="text-gray-400">
              Alva&apos;s Institute of Engineering and Technology (2024)
            </p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 mt-1.5"></span>
          <div>
            <p className="font-semibold">Pre-University (PCMCs)</p>
            <p className="text-gray-400">Vikasa PU College (2024)</p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 mt-1.5"></span>
          <div>
            <p className="font-semibold">SSLC</p>
            <p className="text-gray-400">Sri Mahaveer Vidyalaya (2018)</p>
          </div>
        </li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="space-y-2 text-sm">
        <li className="flex items-center">
          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>Legacy
          JavaScript Algorithms and DS - freeCodeCamp
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>
          Responsive Web Design - freeCodeCamp
        </li>
        <li className="flex items-center">
          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2"></span>Google
          Cloud Badges - GCP
        </li>
      </ul>
    ),
  },
  {
    title: "Experience",
    id: "experience",
    content: (
      <ul className="space-y-2 text-sm">
        <li className="flex items-start">
          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 mt-1.5"></span>
          <div>
            <p className="font-semibold">Trainee Intern Engineer</p>
            <p className="text-gray-400">
              Codecraft Technologies, Mangalore (02/2024 - Present)
            </p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 mt-1.5"></span>
          <div>
            <p className="font-semibold">Intern</p>
            <p className="text-gray-400">NITK Surathkal (04/2023 - 10/2023)</p>
          </div>
        </li>
      </ul>
    ),
  },
  {
    title: "Projects",
    id: "projects",
    content: (
      <ul className="space-y-2 text-sm">
        <li className="flex items-start">
          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 mt-1.5"></span>
          <div>
            <p className="font-semibold">Next.js Library Management System</p>
            <p className="text-gray-400">
              Tech Stack: Next.js, PostgreSQL, shadcn, TailwindCSS, AWS, Vercel
            </p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 mt-1.5"></span>
          <div>
            <p className="font-semibold">Electronic Filter Simulator</p>
            <p className="text-gray-400">Tech Stack: HTML, CSS, JavaScript</p>
          </div>
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 mt-1.5"></span>
          <div>
            <p className="font-semibold">Auto Login Bot</p>
            <p className="text-gray-400">Tech Stack: Python, Bash, Selenium</p>
          </div>
        </li>
      </ul>
    ),
  },
];

export default function AboutSection() {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="py-16 bg-gray-900" id="about">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/images/about-image.png"
              width={500}
              height={500}
              alt="About me"
              className="rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white"
          >
            <h2 className="text-3xl font-bold mb-4 text-teal-400">About Me</h2>
            <p className="text-gray-300 mb-6">
              Aspiring full-stack developer with hands-on experience in
              full-stack development, specializing in Node.js, Express.js, and
              Next.js. Strong foundation in building dynamic, efficient web
              applications with a focus on server-side logic, APIs, and database
              integration. Proficient in version control using Git and GitHub,
              with knowledge of cloud services like AWS. Experienced in writing
              clean, maintainable code with an emphasis on reliability through
              unit testing. Passionate about learning and implementing modern
              backend technologies.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {TAB_DATA.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    tab === item.id
                      ? "bg-teal-500 text-white"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              {TAB_DATA.find((t) => t.id === tab)?.content}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
