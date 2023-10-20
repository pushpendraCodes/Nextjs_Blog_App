import { Blog } from "@/models/blog";
import connectDB from "@/util/db";
import { NextResponse } from "next/server";

// get single post
export async function GET(req, { params }) {
  const { slug } = params;


  try {
    await connectDB()
    let blogpost = await Blog.findById(slug);

    return new NextResponse(JSON.stringify({ blogpost }, { status: 200 }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
}
