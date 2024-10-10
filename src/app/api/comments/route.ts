import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// In-memory storage to use in production (since Vercel’s file system is read-only in production)
let commentsMemoryStore = [];

export async function POST(req) {
  try {
    const newComment = await req.json();
    const isDev = process.env.NODE_ENV === "development";

    if (isDev) {
      // For development: Use file system to store comments
      const filePath = path.join(process.cwd(), "public", "comments.json");

      try {
        const fileContent = await fs.readFile(filePath, "utf-8");
        const comments = JSON.parse(fileContent);

        // Add new comment to the array
        comments.push(newComment);

        // Save the updated comments array to the file
        await fs.writeFile(filePath, JSON.stringify(comments, null, 2));

        return NextResponse.json(
          { message: "Comment added successfully" },
          { status: 200 }
        );
      } catch (error) {
        console.error("Error writing to file:", error);
        return NextResponse.json(
          { error: "Failed to add comment" },
          { status: 500 }
        );
      }
    } else {
      // For production: Use in-memory store (since file system is read-only)
      commentsMemoryStore.push(newComment);

      return NextResponse.json(
        { message: "Comment added successfully (stored in memory)" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    // For development: Load comments from file
    const filePath = path.join(process.cwd(), "public", "comments.json");

    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      const comments = JSON.parse(fileContent);

      return NextResponse.json(comments, { status: 200 });
    } catch (error) {
      console.error("Error reading comments:", error);
      return NextResponse.json(
        { error: "Failed to load comments" },
        { status: 500 }
      );
    }
  } else {
    // For production: Return comments from in-memory store
    return NextResponse.json(commentsMemoryStore, { status: 200 });
  }
}
