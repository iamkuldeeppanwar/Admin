import React from "react";
import axios from "axios";

function Updateuser(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const userData = {
    name,
    email,
    phone,
  };

  function updateUser(e) {
    e.preventDefault();
    axios
      .patch(
        `https://user-api-users.herokuapp.com/users/${props.id}`,
        userData,
        {
          headers: {
            Authorization: ` ${localStorage.getItem("Authorization")}`,
          },
        }
      )
      .then((user) => {
        window.location.reload();
      });
  }
  return (
    <div className="Login-container">
      <form onSubmit={updateUser}>
        <label>userName</label>
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
        <div>
          <input className="loginbtn" type="submit" value="Update" />
        </div>
        <br />
      </form>
    </div>
  );
}

export default Updateuser;
