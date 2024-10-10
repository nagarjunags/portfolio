import React from "react";
import { motion } from "framer-motion";

const variants = {
  default: { width: 0 },
  active: { width: "100%" },
};

export default function TabButton({ active, selectTab, children }) {
  return (
    <button
      onClick={selectTab}
      className={`mr-3 font-medium hover:text-teal-400 transition-colors ${
        active ? "text-teal-400" : "text-gray-400"
      }`}
    >
      {children}
      <motion.div
        animate={active ? "active" : "default"}
        variants={variants}
        className="h-1 bg-teal-400 mt-2"
      ></motion.div>
    </button>
  );
}
