// components/QuillEditor.js
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // import the styles separately
import styles from "./write.module.css"
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const QuillEditor = ({ content, setValue }) => {
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



  return (
    <ReactQuill
            className={styles.textArea}
            theme="snow"
            value={content}
            onChange={setValue}
            placeholder="Tell your story..."
            modules={modules} formats={formats}
          />
  );
};

export default QuillEditor;
