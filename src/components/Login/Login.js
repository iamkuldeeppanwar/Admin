import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const Navigate = useNavigate();

  const userData = {
    email,
    password,
  };

  const login_User = (e) => {
    e.preventDefault();
    axios
      .post(`https://user-api-users.herokuapp.com/users/login`, userData)
      .then((user) => {
        if (!user.data) {
          throw new Error();
        } else {
          if (user.data.user.role === "admin") {
            localStorage.setItem("Authorization", user.data.token);
            Navigate("/manager");
          } else {
            localStorage.setItem("Authorization", user.data.token);
            localStorage.setItem("id", user.data.user._id);
            Navigate("/product");
          }
        }
      })
      .catch(() => {
        setError("Unable to login!");
      });
  };
  return (
    <div className="Login-container">
      {error && <p>{error}</p>}
      <br />
      <form onSubmit={login_User}>
        <label>Email</label>
        <div>
          <input
            className="Email"
            type="email"
            name="email"
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <br />
        <label>Password</label>
        <div>
          <input
            className="Password"
            type="password"
            name="password"
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
            minLength={7}
          />
        </div>
        <label>Password must be greater than 7 characters</label>
        <br />
        <div>
          <input className="loginbtn" type="submit" value="Login" />
        </div>
        <div>
          <h3>or</h3>
        </div>
        <Link className="Account" to="/Signup">
          Create an Account?
        </Link>
      </form>
    </div>
  );
}

export default Login;
