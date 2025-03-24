import classes from "./LandingPage.module.css";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <div className={classes.background}>
        <div style={{ marginTop: "40%" }}>
          <h2>
            Bypass the Industrial, <br /> Dive into the Digital!
          </h2>
          <p>
            Before us is a golden opportunity, demanding us to take a bold step
            forward and join the new digital era.
          </p>
          <div style={{ gap: "50%" }}>
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
