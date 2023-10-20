"use client";
import Image from "next/image";
import styles from "./comment.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { postCommentAsync } from "../cardList/PostsSlice";
import SkeletonLoading from "../skelton_loading/SkeletonLoading";
import { useAlert } from "react-alert";
function Comment({ post }) {
  let alert = useAlert();
  let { status } = useSession();
  const [comment, setcomment] = useState("");
  let dispatch = useDispatch();
  const { data } = useSession();

  useEffect(() => {
    // Create an audio element
    if (typeof window !== "undefined") {
      const audio = new Audio("/water_droplet.mp3");

      // Hide the audio element (optional)
      audio.style.display = "none";

      // Append the audio element to the document body
      document.body.appendChild(audio);

      return () => {
        // Cleanup: Remove the audio element when the component unmounts
        document.body.removeChild(audio);
      };
    }
  }, []);

  async function submit() {
    const audio = document.querySelector("audio");
    let userComment = {};
    userComment.userName = data.user.name;
    userComment.email = data.user.email;
    userComment.img = data.user.image;
    userComment.date = new Date();
    userComment.comment = comment;

    const updatedObject = {
      ...post, // Copy the properties of the original object
      comment: [...post?.comment, userComment], // Create a new array with the added item
    };

    console.log(updatedObject, "post");
    // console.log(userComment, "data");

    dispatch(postCommentAsync({ updatedObject, alert, audio }));
    setcomment("");
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Comments</h2>
      <div className={styles.inputContainer}>
        <input
          disabled={status !== "authenticated"}
          placeholder="write a comment"
          className={styles.input}
          type="text"
          onChange={(e) => {
            setcomment(e.target.value);
          }}
          value={comment}
        />

        <div className={styles.btn}>
          <button disabled={!comment} onClick={submit}>
            Send
          </button>
        </div>
      </div>
      {status !== "authenticated" && (
        <p style={{ marginTop: "10px" }}>
          {" "}
          <Link style={{ color: "red" }} href="/login">
            login
          </Link>{" "}
          to comment
        </p>
      )}

      {post ? (
        post.comment?.map((item) => {
          return (
            <div key={item.date} className={styles.comments}>
              <div className={styles.userContainer}>
                <Image alt="img" width={40} height={40} src={`${item.img}`} />
                <div className={styles.userName}>
                  <h4>{item.userName}</h4>
                  <p>{new Date(item.date).toDateString()}</p>
                </div>
              </div>
              <p className={styles.content}>{item.comment}</p>
            </div>
          );
        })
      ) : (
        <>
          <SkeletonLoading />
          <SkeletonLoading />
          <SkeletonLoading />
        </>
      )}
    </div>
  );
}

export default Comment;
