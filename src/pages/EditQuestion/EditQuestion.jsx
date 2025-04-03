// import React, { useState, useEffect, useContext, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axiosInstance from "../../API/axios";
// import styles from "./EditQuestion.module.css";
// import { QuestionContext } from "../../Context/QuestionProvider";
// import { UserContext } from "../../Context/UserProvider";
// import DOMPurify from "dompurify";
// import "quill/dist/quill.snow.css";
// import Quill from "quill";

// const EditQuestion = () => {
//   const { question_id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useContext(UserContext);
//   const { questions, setQuestions } = useContext(QuestionContext);
//   const token = localStorage.getItem("token");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [editorContent, setEditorContent] = useState("");
//   const [originalContent, setOriginalContent] = useState(""); // Store initial content
//   const quillRef = useRef(null);
//   const quillInstance = useRef(null);
//   console.log(user);

//   const question = questions.find((q) => q.question_id === question_id);
//   // console.log(question)
//   useEffect(() => {
//     if (!question) {
//       (async () => {
//         try {
//           const response = await axiosInstance.get(
//            `/questions/${question_id}`,
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );

//           const sanitizedContent = DOMPurify.sanitize(
//             response.data.question.question_description
//           );
//           console.log(sanitizedContent);
//           setQuestions((prevQuestions) => [
//             ...prevQuestions,
//             response.data.question,
//           ]);
//           console.log(response.data.question);
//           setEditorContent(sanitizedContent);
//           setOriginalContent(sanitizedContent); // Save original content for discard
//           setLoading(false);
//         } catch (err) {
//           setError("Failed to load question data.");
//           setLoading(false);
//         }
//       })();
//     } else {
//       const sanitizedContent = DOMPurify.sanitize(
//         question.question_description
//       );
//       setEditorContent(sanitizedContent);
//       setOriginalContent(sanitizedContent); // Save original content for discard
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (quillRef.current && !quillInstance.current) {
//       quillInstance.current = new Quill(quillRef.current, {
//         theme: "snow",
//         modules: {
//           toolbar: [
//             [{ header: [1, 2, 3, 4, 5, false] }],
//             [{ font: [] }],
//             [{ list: "ordered" }, { list: "bullet" }],
//             ["bold", "italic", "underline", "strike"],
//             [{ color: [] }, { background: [] }],
//             [{ align: [] }],
//             ["blockquote", "code-block"],
//             ["link", "image", "video"],
//             [{ script: "sub" }, { script: "super" }],
//             [{ indent: "-1" }, { indent: "+1" }],
//             [{ direction: "rtl" }],
//             ["clean"],
//           ],
//         },
//       });

//       quillInstance.current.root.style.color = "#000";
//       quillInstance.current.root.innerHTML = editorContent;

//       quillInstance.current.on("text-change", () => {
//         setEditorContent(
//           DOMPurify.sanitize(quillInstance.current.root.innerHTML)
//         );
//       });
//     }
//   }, [editorContent]);

//   const handleChange = (field, value) => {
//     setQuestions((prevQuestions) =>
//       prevQuestions.map((q) =>
//         q.question_id === question_id ? { ...q, [field]: value } : q
//       )
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const updatedQuestion = {
//         title: question.title,
//         question_description: editorContent,
//         tag: question.tag.split(",").map((tag) => tag.trim()),
//         user_id: user.user_id,
//         question_id,
//       };
//       console.log(updatedQuestion);
//       await axiosInstance.put(
//         `/questions/update/${question_id}`,
//         updatedQuestion,
//         {
//           headers: { Authorization: `Bearer ${token}`},
//         }
//       );
//       setQuestions((prevQuestions) =>
//         prevQuestions.map((q) =>
//           q.question_id === question_id ? { ...q, ...updatedQuestion } : q
//         )
//       );

//       navigate(`/questions/${question_id}`);
//     } catch (err) {
//       setError("Failed to update question.");
//     }
//   };

//   const handleDiscard = () => {
//     setEditorContent(originalContent); // Restore original content
//     if (quillInstance.current) {
//       quillInstance.current.root.innerHTML = originalContent;
//       navigate("/home"); // Reset Quill editor content
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className={styles.container}>
//       <h2>Edit Question</h2>
//       {error && <p className={styles.errorMessage}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className={styles.formGroup}>
//           <label>Title</label>
//           <input
//             type="text"
//             value={question.title}
//             onChange={(e) => handleChange("title", e.target.value)}
//             required
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label>Description (Preview)</label>
//           <div
//             className={styles.previewBox}
//             dangerouslySetInnerHTML={{ __html: editorContent }}
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label>Edit Description</label>
//           <div ref={quillRef} className={styles["quill-editor"]}></div>
//         </div>

//         <div className={styles.formGroup}>
//           <label>Tags</label>
//           <input
//             type="text"
//             value={question.tag}
//             onChange={(e) => handleChange("tag", e.target.value)}
//             placeholder="Comma-separated tags"
//           />
//         </div>

//         <div className={styles.buttonGroup}>
//           <button type="submit" className={styles.submitButton}>
//             Save Changes
//           </button>
//           <button
//             type="button"
//             className={styles.discardButton}
//             onClick={handleDiscard}
//           >
//             Discard Changes
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditQuestion;

// import React, { useState, useEffect, useContext, useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axiosInstance from "../../API/axios";
// import styles from "./EditQuestion.module.css";
// import { QuestionContext } from "../../Context/QuestionProvider";
// import { UserContext } from "../../Context/UserProvider";
// import DOMPurify from "dompurify";
// import "quill/dist/quill.snow.css";
// import Quill from "quill";

// const EditQuestion = () => {
//   const { question_id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useContext(UserContext);
//   const { questions, setQuestions } = useContext(QuestionContext);
//   const token = localStorage.getItem("token");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [editorContent, setEditorContent] = useState("");
//   const [originalContent, setOriginalContent] = useState(""); // Store initial content
//   const quillRef = useRef(null);
//   const quillInstance = useRef(null);
//   console.log(user);

//   const question = questions.find((q) => q.question_id === question_id);

//   useEffect(() => {
//     if (!question) {
//       (async () => {
//         try {
//           const response = await axiosInstance.get(
//             `/questions/${question_id}`,
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );

//           const sanitizedContent = DOMPurify.sanitize(
//             response.data.question.question_description
//           );
//           console.log(sanitizedContent);
//           setQuestions((prevQuestions) => [
//             ...prevQuestions,
//             response.data.question,
//           ]);
//           console.log(response.data.question);
//           setEditorContent(sanitizedContent);
//           setOriginalContent(sanitizedContent); // Save original content for discard
//           setLoading(false);
//         } catch (err) {
//           setError("Failed to load question data.");
//           setLoading(false);
//         }
//       })();
//     } else {
//       const sanitizedContent = DOMPurify.sanitize(
//         question.question_description
//       );
//       setEditorContent(sanitizedContent);
//       setOriginalContent(sanitizedContent); // Save original content for discard
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     if (quillRef.current && !quillInstance.current) {
//       quillInstance.current = new Quill(quillRef.current, {
//         theme: "snow",
//         modules: {
//           toolbar: [
//             [{ header: [1, 2, 3, 4, 5, false] }],
//             [{ font: [] }],
//             [{ list: "ordered" }, { list: "bullet" }],
//             ["bold", "italic", "underline", "strike"],
//             [{ color: [] }, { background: [] }],
//             [{ align: [] }],
//             ["blockquote", "code-block"],
//             ["link", "image", "video"],
//             [{ script: "sub" }, { script: "super" }],
//             [{ indent: "-1" }, { indent: "+1" }],
//             [{ direction: "rtl" }],
//             ["clean"],
//           ],
//         },
//       });

//       quillInstance.current.root.style.color = "#000";
//       quillInstance.current.root.innerHTML = editorContent;

//       quillInstance.current.on("text-change", () => {
//         setEditorContent(
//           DOMPurify.sanitize(quillInstance.current.root.innerHTML)
//         );
//       });
//     }
//   }, [editorContent]);

//   const handleChange = (field, value) => {
//     setQuestions((prevQuestions) =>
//       prevQuestions.map((q) =>
//         q.question_id === question_id ? { ...q, [field]: value } : q
//       )
//     );
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     const updatedQuestion = {
//   //       title: question.title,
//   //       question_description: editorContent,
//   //       // tag: question.tag
//   //       //   ? question.tag.split(",").map((tag) => tag.trim())
//   //       //   : [],
//   //       ...(question.tag
//   //         ? { tag: question.tag.split(",").map((tag) => tag.trim()) }
//   //         : {}),
//   //       user_id: user.user_id,
//   //       question_id,
//   //     };
//   //     console.log(updatedQuestion);
//   //     await axiosInstance.put(
//   //       `/questions/update/${question_id}`,
//   //       updatedQuestion,
//   //       {
//   //         headers: { Authorization: `Bearer ${token}` },
//   //       }
//   //     );
//   //     setQuestions((prevQuestions) =>
//   //       prevQuestions.map((q) =>
//   //         q.question_id === question_id ? { ...q, ...updatedQuestion } : q
//   //       )
//   //     );

//   //     navigate(`/questions/${question_id}`);
//   //   } catch (err) {
//   //     setError("Failed to update question.");
//   //   }
//   // };

//  const handleSubmit = async (e) => {
//    e.preventDefault();

//    try {
//      const updatedQuestion = {
//        title: question.title,
//        question_description: editorContent,
//        user_id: user.user_id,
//        question_id,
//      };

//      if (question.tag && question.tag.trim() !== "") {
//        updatedQuestion.tag = question.tag.split(",").map((tag) => tag.trim());
//      }

//      console.log(updatedQuestion);
//      await axiosInstance.put(
//        `/questions/update/${question_id}`,
//        updatedQuestion,
//        {
//          headers: { Authorization: `Bearer ${token}` },
//        }
//      );

//      setQuestions((prevQuestions) =>
//        prevQuestions.map((q) =>
//          q.question_id === question_id ? { ...q, ...updatedQuestion } : q
//        )
//      );

//      navigate(`/questions/${question_id}`);
//    } catch (err) {
//      setError("Failed to update question.");
//    }
//  };

//   const handleDiscard = () => {
//     setEditorContent(originalContent); // Restore original content
//     if (quillInstance.current) {
//       quillInstance.current.root.innerHTML = originalContent;
//       navigate("/home"); // Reset Quill editor content
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className={styles.container}>
//       <h2>Edit Question</h2>
//       {error && <p className={styles.errorMessage}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className={styles.formGroup}>
//           <label>Title</label>
//           <input
//             type="text"
//             value={question.title}
//             onChange={(e) => handleChange("title", e.target.value)}
//             required
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label>Description (Preview)</label>
//           <div
//             className={styles.previewBox}
//             dangerouslySetInnerHTML={{ __html: editorContent }}
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label>Edit Description</label>
//           <div ref={quillRef} className={styles["quill-editor"]}></div>
//         </div>

//         <div className={styles.formGroup}>
//           <label>Tags</label>
//           <input
//             type="text"
//             value={question.tag || ""}
//             onChange={(e) => handleChange("tag", e.target.value)}
//             placeholder="Comma-separated tags"
//           />
//         </div>

//         <div className={styles.buttonGroup}>
//           <button type="submit" className={styles.submitButton}>
//             Save Changes
//           </button>
//           <button
//             type="button"
//             className={styles.discardButton}
//             onClick={handleDiscard}
//           >
//             Discard Changes
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditQuestion;

import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosInstance from "../../API/axios";
import styles from "./EditQuestion.module.css";
import { QuestionContext } from "../../Context/QuestionProvider";
import { UserContext } from "../../Context/UserProvider";
import DOMPurify from "dompurify";
import "quill/dist/quill.snow.css";
import Quill from "quill";

const EditQuestion = () => {
  const { question_id } = useParams();
  const navigate = useNavigate();
  const [user] = useContext(UserContext);
  const { questions, setQuestions } = useContext(QuestionContext);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [editorContent, setEditorContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const quillRef = useRef(null);
  const quillInstance = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const question = questions.find((q) => q.question_id === question_id);

  useEffect(() => {
    if (!question) {
      (async () => {
        try {
          const response = await axiosInstance.get(
            `/questions/${question_id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const sanitizedContent = DOMPurify.sanitize(
            response.data.question.question_description
          );
          setQuestions((prev) => [...prev, response.data.question]);
          setEditorContent(sanitizedContent);
          setOriginalContent(sanitizedContent);
          reset({
            title: response.data.question.title,
            tag: response.data.question.tag || "",
          });
          setLoading(false);
        } catch {
          setLoading(false);
        }
      })();
    } else {
      setEditorContent(DOMPurify.sanitize(question.question_description));
      setOriginalContent(question.question_description);
      reset({
        title: question.title,
        tag: question.tag || "",
      });
      setLoading(false);
    }
  }, [question, reset]);

  useEffect(() => {
    if (quillRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, false] }],
            [{ font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["blockquote", "code-block"],
            ["link", "image", "video"],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            ["clean"],
          ],
        },
      });
      quillInstance.current.root.innerHTML = editorContent;
      quillInstance.current.on("text-change", () => {
        setEditorContent(
          DOMPurify.sanitize(quillInstance.current.root.innerHTML)
        );
      });
    }
  }, [editorContent]);

  const onSubmit = async (data) => {
    try {
      const updatedQuestion = {
        title: data.title,
        question_description: editorContent,
        user_id: user.user_id,
        question_id,
      };
      if (data.tag.trim()) {
        updatedQuestion.tag = data.tag.split(",").map((tag) => tag.trim());
      }
      await axiosInstance.put(
        `/questions/update/${question_id}`,
        updatedQuestion,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setQuestions((prev) =>
        prev.map((q) =>
          q.question_id === question_id ? { ...q, ...updatedQuestion } : q
        )
      );
      navigate(`/questions/${question_id}`);
    } catch {
      console.error("Failed to update question.");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h2>Edit Question</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label>Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className={styles.error}>{errors.title.message}</p>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Description (Preview)</label>
          <div
            className={styles.previewBox}
            dangerouslySetInnerHTML={{ __html: editorContent }}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Edit Description</label>
          <div ref={quillRef} className={styles["quill-editor"]}></div>
        </div>

        <div className={styles.formGroup}>
          <label>Tags</label>
          <input
            type="text"
            {...register("tag")}
            placeholder="Comma-separated tags - optional"
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>
            Save Changes
          </button>
          <button
            type="button"
            className={styles.discardButton}
            onClick={() => navigate("/home")}
          >
            Discard Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditQuestion;
