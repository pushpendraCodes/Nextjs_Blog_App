import { Blog } from "@/models/blog";
import connectDB from "@/util/db";
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

import cloudinary from "cloudinary";

import os from "os";




console.log(process.env.CLOUDINARY_CLOUD_NAME, "CLOUDINARY_CLOUD_NAME");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

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

  // this code does not work in vercel
  // to save in folder
  // let uploaddir = path.join(process.cwd(), "public/uploads/" + filename);
  // to upload cloudinary

  try {
    await connectDB();
    let uploaddir = await saveImageToLocal(file);

    let cloudinaryRes = await cloudinary.v2.uploader.upload(uploaddir, {
      folder: "next_blog_upload",
    });

    console.log(cloudinaryRes, "cloudinaryRes");
    const newPosts = await new Blog({
      userName,
      userEmail,
      title,
      category,
      story,
      userPic,
      img: cloudinaryRes.secure_url,
    });

    let post = await newPosts.save();
    console.log(post, "postblog");
    return new NextResponse(JSON.stringify({ post }, { status: 200 }));
  } catch (error) {
    console.log("Error occured ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}

async function saveImageToLocal(file) {
  // to save temp folder local
  let extension = file.type.split("/")[1];
  console.log(extension, "extension ");
  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + extension;
  console.log(filename, "filename");

  const tempdir = os.tmpdir();
  let uploaddir = path.join(tempdir, filename);
  await writeFile(uploaddir, buffer);

  return uploaddir;
}

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page");
  const pagesize = searchParams.get("pagesize");
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  // const category = searchParams.get("category");
  console.log(search, "search");
  const pageNum = parseInt(page, 10);
  const pageSizeNum = parseInt(pagesize, 10);
  const skip = (pageNum - 1) * pageSizeNum;

  await connectDB();
  let totalPosts = (await Blog.find()).length;
  let posts = await Blog.find();

  if (category) {
    posts = await Blog.find({ category: category });
  }
  if (search) {
    const searchTerms = search.split(" ");
    posts = await Blog.find({
      $or: searchTerms.map((term) => ({
        title: { $regex: new RegExp(term, "i") },
      })),
    });
  }

  try {
    posts = posts.reverse();
    console.log(posts);
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
