import React from "react";
import { Code2, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProjectCard({
  imgUrl,
  title,
  description,
  gitUrl,
  previewUrl,
}) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105">
      <div className="relative h-48 md:h-64">
        <Image
          src={imgUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-all duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <Link href={gitUrl} className="mx-2">
            <button className="bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full transition-colors">
              <Code2 size={24} />
            </button>
          </Link>
          <Link href={previewUrl} className="mx-2">
            <button className="bg-teal-500 hover:bg-teal-600 text-white p-3 rounded-full transition-colors">
              <Eye size={24} />
            </button>
          </Link>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  );
}
