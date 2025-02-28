/** @format */

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import Post from "@/app/models/Post";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    const { postId } = params;

    if (!ObjectId.isValid(postId)) {
      return NextResponse.json(
        { success: false, error: "Invalid post ID format" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const post = await Post.findOne({
      _id: ObjectId.createFromHexString(postId),
    })
      .populate("author", "name email profileImage")
      .lean();

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    const formattedPost = {
      ...post,
      formattedDate: new Date(post.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      readTime: post.readingTime || "5 min read",
      stats: {
        views: post.views || 0,
        likes: post.likes || 0,
        comments: post.comments?.length || 0,
      },
    };

    return NextResponse.json({
      success: true,
      post: formattedPost,
    });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { postId } = params;

    // Validate postId format
    if (!ObjectId.isValid(postId)) {
      return NextResponse.json(
        { success: false, error: "Invalid post ID format" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Delete the post
    const result = await Post.deleteOne({
      _id: ObjectId.createFromHexString(postId),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
