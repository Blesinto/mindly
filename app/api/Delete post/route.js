/** @format */

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Post from "@/app/models/Post";

export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const postId = params.id;

    // Soft delete the post by setting deleted to true
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { deleted: true },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
