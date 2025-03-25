import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDropright } from "react-icons/io";
import axiosInstance from "../../API/axios";
import { QuestionContext } from "../../Context/QuestionProvider";
import { UserContext } from "../../Context/UserProvider";
import DOMPurify from "dompurify";
import styles from "./HomePage.module.css";

const Home = () => {
  const token = localStorage.getItem("token");
  const { questions, setQuestions } = useContext(QuestionContext);
  const [user] = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get("/questions/all-questions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(response.data.questions);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError(
          err.response?.data?.message || "An error occurred. Please try again."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, [token, setQuestions]);

  const handleEdit = (question_id) => {
    navigate(`/questions/update/${question_id}`);
  };

  const filteredQuestions = questions.filter(
    (question) =>
      question.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.homeContainer}>
      <header className={styles.homeHeader}>
        <div className={styles.welcomeUser}>
          <h1>Welcome: {user?.user_name}!</h1>
          <p>Engage, Ask, and Share Knowledge with the Community!</p>
        </div>
        <button
          className={styles.askQuestionBtn}
          onClick={() => navigate("/ask")}
        >
          Ask a Question
        </button>
      </header>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {loading && <p className={styles.loadingMessage}>Loading questions...</p>}
      {error && <p className={styles.errorMessage}>{error}</p>}
      {!loading && !error && filteredQuestions.length === 0 && (
        <p className={styles.noQuestionsMessage}>No questions available.</p>
      )}

      {!loading && !error && filteredQuestions.length > 0 && (
        <div className={styles.questionsList}>
          {filteredQuestions.map((question) => (
            <div
              key={question.question_id}
              className={styles.cardWrapper}
              id={`question-summary-${question.question_id}`}
            >
              <div className={styles.questionCard}>
                <div className={styles.stats}></div>
                <div className={styles.profileSection}>
                  <FaUserCircle className={styles.profileIcon} />
                  <span className={styles.username}>{question?.user_name}</span>
                </div>
                <div className={styles.content}>
                  <h3 className={styles.contentTitle}>
                    <Link
                      to={`/questions/${question.question_id}`}
                      className={styles.link}
                    >
                      {question.title}
                    </Link>
                  </h3>
                  <div style={{ marginBottom: "5px" }}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          question?.question_description
                        ),
                      }}
                    />
                  </div>

                  <div className={styles.meta}>
                    <div className={styles.metaTags}>
                      <ul className={styles.tagList}>
                        {question?.tags?.map((tag) => (
                          <li key={tag} className={styles.tagItem}>
                            <a
                              href={`/questions/tagged/${tag}`}
                              className={styles.tag}
                            >
                              {tag}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.userCard} aria-live="polite">
                      <time className={styles.time}>
                        Asked at{" "}
                        <span title={question.created_at}>
                          {new Date(question.createdAt).toLocaleString()}
                        </span>
                      </time>
                    </div>
                    <div className={styles.btnContainer}>
                      {user?.user_id === question.user_id && (
                        <div className={styles.actionButtons}>
                          <button
                            className={styles.editBtn}
                            onClick={() => handleEdit(question.question_id)}
                          >
                            Edit
                          </button>
                          <button
                            className={styles.deleteBtn}
                            onClick={() => handleDelete(question.question_id)}
                          >
                            Click to delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to={`/questions/${question.question_id}`}
                className={styles.arrow}
              >
                <div className={styles.arrowDiv}>
                  <IoIosArrowDropright className={styles.arrowIcon} />
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
