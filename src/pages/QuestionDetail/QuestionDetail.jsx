import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { UserContext } from "../../Context/UserProvider";
import axiosInstance from "../../API/axios";
import styles from "./QuestionDetail.module.css";
import { QuestionContext } from "../../Context/QuestionProvider";
import DOMPurify from "dompurify";
import "quill/dist/quill.snow.css";
import Quill from "quill";
import { FaUserCircle } from "react-icons/fa";

function QuestionDetail() {
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const token = localStorage.getItem("token");
  const [user, setUser] = useContext(UserContext);

  const { questions, setQuestions } = useContext(QuestionContext);
  const { question_id } = useParams();
  const [answer, setAnswer] = useState([]);
  const quillRef = useRef(null);
  const quillInstance = useRef(null);
  console.log(user);
  useEffect(() => {
    (async () => {
      try {
        const answers = await axiosInstance.get(`/answers/${question_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(answers);
        setAnswer(answers.data.answers);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  console.log(answer);
  const selectedQuestion = questions.find(
    (question) => question.question_id === question_id
  );

  useEffect(() => {
    if (quillRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, false] }], // Headers
            [{ font: [] }], // Font selection
            [{ list: "ordered" }, { list: "bullet" }], // Ordered & Bullet lists
            ["bold", "italic", "underline", "strike"], // Text styling
            [{ color: [] }, { background: [] }], // Text color & highlight
            [{ align: [] }], // Text alignment
            ["blockquote", "code-block"], // Blockquote & Code block
            ["link", "image", "video"], // Links, Images, Video
            [{ script: "sub" }, { script: "super" }], // Subscript & Superscript
            [{ indent: "-1" }, { indent: "+1" }], // Indent
            [{ direction: "rtl" }], // Right-to-left text
            ["clean"], // Remove formatting
          ],
        },
      });

      // Ensure that text is visible
      quillInstance.current.root.style.color = "#000";
    }
  }, []);

  const sanitizeContent = (content) =>
    DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [
        "b",
        "i",
        "u",
        "a",
        "img",
        "p",
        "ul",
        "ol",
        "li",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "code",
        "pre",
        "blockquote",
        "strong",
        "em",
        "hr",
        "br",
        "sub",
        "sup",
        "mark",
        "video",
        "iframe",
        "span",
      ],
      ALLOWED_ATTR: ["href", "src", "alt", "title", "style"],
    });

  const clickFunc = async (data) => {
    try {
      // Get content from Quill Editor
      let answer = quillInstance.current?.root.innerHTML.trim();

      if (!answer) {
        alert("Answer description is required.");
        return;
      }

      answer = sanitizeContent(answer); // Ensure safe content

      if (!question_id || !user?.user_id) {
        console.error("Missing required data:", { question_id, user });
        return;
      }
      console.log(answer);
      // Send answer
      await axiosInstance.post(
        `/answer/${question_id}`, // Correct dynamic URL
        {
          answer: answer, // Use Quill's content as the answer
          user_id: user.user_id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Fetch updated answers
      const ans = await axiosInstance.get(`/answers/${question_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnswer(ans.data.answers);
      setValue("answer", ""); // Clear form input

      // Reset Quill editor content
      if (quillInstance.current) {
        quillInstance.current.root.innerHTML = "";
      }
    } catch (error) {
      console.error(
        "Error posting answer:",
        error.response?.data || error.message
      );
    }
  };
  const question = questions.find((q) => q.question_id === question_id);
  console.log(question);
  console.log(user);

  const handleDelete = async (question_id) => {
    try {
      const user_id = user?.user_id; // Ensure user_id is available

      if (!user_id) {
        console.error("User not logged in.");
        return;
      }

      // Confirm deletion with the user
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this question?"
      );
      if (!confirmDelete) return; // Exit if user cancels

      // Log the request for debugging
      console.log("Deleting question:", { question_id, user_id });

      // Send a DELETE request to the backend
      const response = await axiosInstance.delete(
        `/questions/delete/${question_id}`,
        {
          headers: { Authorization: `Bearer ${token}` }, // Authorization with token
          data: { user_id, question_id }, // Send user_id and question_id in the request body
        }
      );

      console.log("Delete response:", response.data); // Log the response to verify

      // Remove the question from the state to reflect the deletion
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.question_id !== question_id)
      );
    } catch (err) {
      console.error("Error deleting question:", err);
    }
  };

  return (
    <>
      <div className={styles.outerDiv}>
        <div className={styles.questionCard}>
          <div className={styles.cardBody}>
            <h4 className={styles.cardTitle}>Question</h4>
            <h5 className={styles.cardSubtitle}>{selectedQuestion?.title}</h5>
            <p className={styles.cardText}></p>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(selectedQuestion?.answer),
              }}
            />
          </div>
          <button
            className={styles.deleteBtn}
            onClick={() => handleDelete(selectedQuestion?.question_id)} // Pass question_id to handleDelete
          >
            Delete
          </button>
        </div>
        <div className={styles.answersCard}>
          <div className={styles.cardBody}>
            <h4 className={styles.cardTitle}>Answers From The Community</h4>
          </div>
        </div>
        {console.log(answer)}
        {answer.map((singleAnswer, index) => (
          <div className={styles.answerCard} key={index}>
            <div className={styles.answerBody}>
              <div className={styles.userInfo}>
                <div className={styles.userIconDiv}>
                  <FaUserCircle size={35} className={styles.profileIcon} />
                  <p className={styles.username}>{singleAnswer.user_name}</p>
                </div>
                <div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(singleAnswer?.answer),
                    }}
                  />
                </div>
              </div>
              <div className={styles.answerContent}>
                <div ref={quillRef}></div>
              </div>
            </div>
          </div>
        ))}
        <div className={styles.answerFormCard}>
          <div className={styles.cardBody}>
            <h2 className={styles.formTitle}>Answer The Top Question.</h2>
            <Link to="/home" className={styles.link}>
              <small className={styles.goToQuestion}>Go to Question Page</small>
            </Link>
            <form onSubmit={handleSubmit(clickFunc)}>
              <div className={styles.formGroup}>
                <div ref={quillRef} className={styles.quillEditor}></div>
                {errors.answer && (
                  <div className={styles.errorMessage}>
                    {errors.answer.message}
                  </div>
                )}
              </div>
              <button type="submit" className={styles.submitButton}>
                Post Your Answer
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuestionDetail;
