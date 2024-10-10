import React from "react";

export default function ProjectTag({ name, onClick, isSelected }) {
  const buttonStyles = isSelected
    ? "bg-teal-500 text-white"
    : "bg-gray-800 text-gray-300 hover:bg-gray-700";

  return (
    <button
      className={`${buttonStyles} px-4 py-2 rounded-full text-sm font-medium transition-colors`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
}
