import React from "react";
import classes from "./LandingPage.module.css";
import { Link, useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  function ToLogIn() {
    navigate(".users/login");
  }
  return (
    <div>
      <div className={classes.background}>
        <div style={{ marginTop: "30%" }}>
          <h2>
            Bypass the Industrial, <br /> Dive into the Digital!
          </h2>
          <p>
            Before us is a golden opportunity, demanding us to take a bold step
            forward and join the new digital era.
          </p>
          <div>
            <a className={classes.createAccount} href="/users/register">
              Create Account
            </a>
            <a className={classes.signIn} href="/users/login">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
