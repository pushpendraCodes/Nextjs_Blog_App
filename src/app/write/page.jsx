"use client";
import Image from "next/image";
import styles from "./write.module.css";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";

import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAlert } from "react-alert";
import { WriteBlogAsync, getStatus } from "./BlogSlice";
import dynamic from "next/dynamic";

export default function Page() {

  const ReactQuill = dynamic(()=>import("react-quill"),{ssr:false})
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image',
  ];




  let alert = useAlert();
  let router = useRouter();
  const { data } = useSession();
  const { status } = useSession();

  let dispatch = useDispatch();
  let Blogstatus = useSelector(getStatus);

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Browser-specific code here

      // Create an audio element
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

  const [open, setOpen] = useState(false);
  const [file, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [content, setValue] = useState("");

  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (title && file && catSlug && content) {
      const formData = new FormData();
      formData.append("img", file);
      formData.append("title", title);
      formData.append("story", content);
      formData.append("category", catSlug);
      formData.append("userName", data.user.name);
      formData.append("userEmail", data.user.email);
      formData.append("userPic", data.user.image);

      try {
        const audio = document.querySelector("audio");
        dispatch(WriteBlogAsync({ formData, alert,audio,router }));
        setTitle("");
        setValue("");
        setCatSlug("");
        setSelectedFile("");

      } catch (error) {
        console.error("Error during upload:", error);
      }
    } else {
      alert.show("all feilds are mandatory");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <input
          type="text"
          placeholder="Title"
          className={styles.input}
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <select
          className={styles.select}
          onChange={(e) => setCatSlug(e.target.value)}
          value={catSlug}
        >
          <option>choose</option>
          <option value="style">style</option>
          <option value="fashion">fashion</option>
          <option value="food">food</option>
          <option value="culture">culture</option>
          <option value="travel">travel</option>
          <option value="coding">coding</option>
        </select>

        {file && (
          <p style={{ marginLeft: "5px", marginBottom: "6px" }}>{file.name}</p>
        )}

        <div className={styles.editor}>
          <button className={styles.button} onClick={() => setOpen(!open)}>
            <Image src="/plus.png" alt="img" width={16} height={16} />
          </button>
          {open && (
            <div className={styles.add}>
              <input
                type="file"
                id="image"
                name="img"
                onChange={(e) => {
                  handleFileChange(e);
                }}
                style={{ display: "none" }}
              />
              <button className={styles.addButton}>
                <label htmlFor="image">
                  <Image src="/picture.png" alt="img" width={16} height={16} />
                </label>
              </button>
              <button className={styles.addButton}>
                <Image src="/external.png" alt="img" width={16} height={16} />
              </button>
              <button className={styles.addButton}>
                <Image src="/video.png" alt="img" width={16} height={16} />
              </button>
            </div>
          )}
          <ReactQuill
            className={styles.textArea}
            theme="snow"
            value={content}
            onChange={setValue}
            placeholder="Tell your story..."
            modules={modules} formats={formats}
          />
        </div>

        <button onClick={handleUpload} className={styles.publish}>
          Publish
        </button>
      </div>
    </>
  );
}
