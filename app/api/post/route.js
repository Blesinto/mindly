/**
 * eslint-disable @typescript-eslint/no-unused-vars
 *
 * @format
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

/** @format */

import { NextResponse } from "next/server";
import Post from "@/app/models/Post";
import { connectToDatabase } from "@/app/lib/mongodb";

export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    // Validate minimum description length before creating post
    if (body.description.trim().length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: "Description must be at least 10 characters long",
        },
        { status: 400 }
      );
    }

    // Calculate reading time
    const readingTime = `${Math.ceil(
      body.description.split(" ").length / 200
    )} min read`;

    // Create new post using the model
    const post = await Post.create({
      title: body.title,
      description: body.description,
      author: body.author,
      readingTime,
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Error creating post:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationErrors,
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create post",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const posts = await Post.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch posts",
      },
      { status: 500 }
    );
  }
}
