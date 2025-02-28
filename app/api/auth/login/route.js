/** @format */

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import User from "@/app/models/user";

/**
 * Handles POST requests for user login
 * @param {Request} request
 * @returns {Promise<NextResponse>}
 */
export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // Check password (direct comparison since we're not hashing)
    if (user.password !== password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Update last login
    await User.findByIdAndUpdate(user._id, {
      lastLogin: new Date(),
    });

    // Create user data for frontend
    const userData = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role || "user",
      lastLogin: new Date(),
    };

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: userData,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Login failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
