import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import styles from "./HomePage.module.css";
import { IoIosArrowDropright } from "react-icons/io";
import axiosInstance from "../../API/axios";
import { QuestionContext } from "../../context/QuestionProvider";
import { UserContext } from "../../context/UserProvider";

const Home = () => {
  const token = localStorage.getItem("token");
  const { questions, setQuestions } = useContext(QuestionContext);
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  function handleClick() {
    navigate("/ask");
  }
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
        console.log(response.data.questions);
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

  // Filter questions based on the search query
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
        <button className={styles.askQuestionBtn} onClick={handleClick}>
          Ask a Question
        </button>
      </header>

      {/* Search bar */}
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

      {!loading && !error && questions.length === 0 && (
        <p className={styles.noQuestionsMessage}>
          No questions available. Be the first to ask!
        </p>
      )}

      {!loading && !error && filteredQuestions.length === 0 && (
        <p className={styles.noQuestionsMessage}>
          No questions match your search criteria.
        </p>
      )}

      {!loading && !error && filteredQuestions.length > 0 && (
        // <Link to={/questions/${questions.question_id}}>
        <div className={styles.questionsList}>
          {filteredQuestions.map((question, index) => (
            <div className={styles.cardWrapper}>
              <div key={index} className={styles.questionCard}>
                <div className={styles.profileSection}>
                  <FaUserCircle className={styles.profileIcon} />
                  <span className={styles.username}>{user?.user_name}</span>
                </div>

                <div className={styles.questionDetails}>
                  <h2 className={styles.questionTags}>{question.tag} </h2>
                  <h4 className={styles.questionTitle}>{question.title}</h4>
                  <h3>{question?.user_name}</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: question.question_description,
                    }}
                  >
                    <p> {question.tag}</p>
                  </div>
                </div>
              </div>

              <div>
                <IoIosArrowDropright className={styles.arrowIcon} />
              </div>
            </div>
          ))}
        </div>
        // </Link>
      )}
    </div>
  );
};

export default Home;
