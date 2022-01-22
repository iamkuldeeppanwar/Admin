import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const Navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [error, setError] = React.useState("");

  const userData = {
    name,
    email,
    password,
    phone,
  };

  const signup_User = (e) => {
    e.preventDefault();
    axios
      .post(`https://user-api-users.herokuapp.com/users`, userData)
      .then((user) => {
        if (user.data) {
          localStorage.setItem("Authorization", user.token);
          localStorage.setItem("id", user.data.user._id);
          Navigate("/product");
        } else {
          throw new Error();
        }
      })
      .catch(() => {
        setError("Invalid user input!");
      });
  };

  return (
    <div className="Login-container">
      {error && <p>{error}</p>}
      <br />
      <form onSubmit={signup_User}>
        <label>UserName</label>

        <div>
          <input
            className="Email"
            type="text"
            name="name"
            placeholder="Name..."
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <br />
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
        <label>Phone</label>
        <div>
          <input
            className="Email"
            type="text"
            name="phone"
            placeholder="Phone..."
            onChange={(e) => setPhone(e.target.value)}
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
        <Link className="Account" to="/">
          Already have an Account?
        </Link>
      </form>
    </div>
  );
}

export default Signup;
