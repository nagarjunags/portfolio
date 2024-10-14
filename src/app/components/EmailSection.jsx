"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function EmailSection() {
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // const form = e.currentTarget;
    // const data = {
    //   email: form.email.value,
    //   subject: form.subject.value,
    //   message: form.message.value,
    // };
    // const JSONdata = JSON.stringify(data);
    // const endpoint = "/api/send";
    // const options = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSONdata,
    // };
    // const response = await fetch(endpoint, options);
    // const resData = await response.json();
    // if (response.status === 200) {
    //   console.log("Message sent.");
    //   setEmailSubmitted(true);
    // }
  };

  return (
    <section id="contact" className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-teal-400">
              Let&apos;s Connect
            </h2>
            <p className="text-gray-300 mb-4 max-w-md">
              I&apos;m currently looking for new opportunities. My inbox is
              always open. Whether you have a question or just want to say hi.
              <br />
              nagarjunags2014@gmail.com
              <br />
              Mob:+91 8618333210
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/nagarjunags/"
                className="text-white hover:text-teal-400 transition-colors"
              >
                <Github size={24} />
              </Link>
              <Link
                href="https://www.linkedin.com/in/nagarjuna-gs-ab59661b2?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                className="text-white hover:text-teal-400 transition-colors"
              >
                <Linkedin size={24} />
              </Link>
            </div>
          </motion.div>
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {emailSubmitted ? (
              <p className="text-teal-400 text-sm mt-2">
                Email sent successfully!
              </p>
            ) : (
              <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium mb-2 block"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 text-gray-300 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    placeholder="jacob@google.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium mb-2 block"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-3 py-2 text-gray-300 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    placeholder="Just saying hi"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="text-sm font-medium mb-2 block"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full px-3 py-2 text-gray-300 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                    placeholder="Let's talk about..."
                  />
                </div>
                <button
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-2.5 px-5 rounded-lg transition-colors w-full"
                >
                  Send Message
                </button>
              </form>
            )}
          </motion.div> */}
        </div>
      </div>
    </section>
  );
}
