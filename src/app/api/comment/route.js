import { Blog } from "@/models/blog";
import connectDB from "@/util/db";
import { NextResponse } from "next/server";


export async function PATCH(req, res) {
  try {
    await connectDB();

    const post = await req.json()


    let comment = await Blog.findByIdAndUpdate(post._id, post, {
      new: true,
    });

    return new NextResponse(JSON.stringify({ comment }, { status: 200 }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
}

