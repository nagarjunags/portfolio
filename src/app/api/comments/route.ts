// src/app/api/comments/route.ts
import { db } from "@/db/index"; // Assuming this is your Drizzle DB instance
import { commentsTable } from "@/db/schema"; // Import the comments table schema
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const newComment = await req.json();

    // Insert the new comment into the database
    await db.insert(commentsTable).values({
      user: newComment.user,
      content: newComment.content,
      createdAt: new Date(),
      profilePicture: newComment.profilePicture,
    });

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

export async function GET() {
  try {
    // Fetch all comments from the database
    const comments = await db
      .select()
      .from(commentsTable)
      .orderBy(commentsTable.createdAt);

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

import { getServerSession } from "next-auth"; // To check the user session
import { authOptions } from "@/utils/authOptions"; // Assuming your auth config is in lib/auth

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  // Check if the user is authorized to delete comments
  if (userEmail !== "nagarjunags2014@gmail.com") {
    return NextResponse.json(
      { error: "Unauthorized to delete comments" },
      { status: 403 }
    );
  }

  try {
    const { id } = await req.json(); // Get the comment id from the request body

    // Delete the comment from the database
    await db.delete(commentsTable).where(eq(commentsTable.id, id));

    return NextResponse.json(
      { message: "Comment deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting comment:", error);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    );
  }
}
