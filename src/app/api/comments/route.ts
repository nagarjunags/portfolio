import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const newComment = await req.json();
    const filePath = path.join(process.cwd(), "public", "comments.json");

    const fileContent = await fs.readFile(filePath, "utf-8");
    const comments = JSON.parse(fileContent);

    comments.push(newComment);

    await fs.writeFile(filePath, JSON.stringify(comments, null, 2));

    return NextResponse.json(
      { message: "Comment added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 }
    );
  }
}
