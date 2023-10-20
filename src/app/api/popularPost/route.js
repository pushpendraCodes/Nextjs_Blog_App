import { Blog } from "@/models/blog";
import connectDB from "@/util/db";

import { NextResponse } from "next/server";

export async function GET() {

  try {
    await connectDB();
    let data = await Blog.find();
    let popularBlog = data.filter((item) => item.comment.length > 0);

    const sortedArray = popularBlog.sort(
      (a, b) => b.comment.length - a.comment.length
    );

console.log(sortedArray,"sortedArray")
return new NextResponse(
  JSON.stringify({ sortedArray }, { status: 200 })
);
  } catch (error) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}
