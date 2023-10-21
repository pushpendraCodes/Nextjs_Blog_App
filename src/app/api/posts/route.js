import { Blog } from "@/models/blog";
import connectDB from "@/util/db";
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export async function POST(req, res) {
  const formData = await req.formData();

  const file = formData.get("img");
  const userName = formData.get("userName");
  const userEmail = formData.get("userEmail");
  const title = formData.get("title");
  const category = formData.get("category");
  const story = formData.get("story");
  const userPic = formData.get("userPic");

  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + file.name.replaceAll(" ", "_");

  try {
    await connectDB();
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );

    const newPosts = await new Blog({
      userName,
      userEmail,
      title,
      category,
      story,
      userPic,
      img: filename,
    });



    let post = await newPosts.save();
    console.log(post,"post")
    return new NextResponse(
      JSON.stringify({ post }, { status: 200 })
    );
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const pagesize = searchParams.get("pagesize");
  const category = searchParams.get("category");
  // const category = searchParams.get("category");

  const pageNum = parseInt(page, 10);
  const pageSizeNum = parseInt(pagesize, 10);
  const skip = (pageNum - 1) * pageSizeNum;

  await connectDB();
  let totalPosts = (await Blog.find()).length;
  let posts = await Blog.find();

  if (category) {
    posts = await Blog.find({ category: category });


  }

  try {
    posts = posts.reverse()
    posts = posts.splice(skip, pageSizeNum);
    // return new NextResponse({data:posts}, { status: 200 });
    return new NextResponse(
      JSON.stringify({ posts, totalPosts }, { status: 200 })
    );
  } catch (error) {
    // return new NextResponse({ msg: "server error" }, { status: 500 });
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
}