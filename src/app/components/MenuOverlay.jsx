import React from "react";
import NavLink from "./NavLink";

export default function MenuOverlay({ links }) {
  return (
    <nav className="flex flex-col items-center space-y-4 py-4 bg-gray-900">
      {links.map((link, index) => (
        <NavLink key={index} href={link.path} title={link.title} />
      ))}
    </nav>
  );
}
