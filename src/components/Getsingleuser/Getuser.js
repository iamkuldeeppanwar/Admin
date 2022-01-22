import React, { useEffect } from "react";
import axios from "axios";
import "./Getuser.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function Getuser() {
  const Navigate = useNavigate();
  const [user, setUser] = React.useState("");

  useEffect(() => {
    axios
      .get(
        `https://user-api-users.herokuapp.com/users/${localStorage.getItem(
          "id"
        )}`
      )
      .then((user) => {
        setUser(user.data);
      });
  }, []);

  function userlogout() {
    fetch(`https://usersinfo-api-auth.herokuapp.com/users/logout`, {
      method: "POST",
      headers: {
        Authorization: ` ${localStorage.getItem("Authorization")}`,
      },
    }).then((res) => {
      localStorage.removeItem("Authorization");
      localStorage.removeItem("id");
      Navigate("/");
    });
  }

  return (
    <>
      <Button onClick={userlogout}>Logout</Button>
      <div className="profile">
        <h1>Your Profile</h1>
        <div>
          <label>Name</label>
          <p>{user.name}</p>
        </div>
        <div>
          <label>Email</label>
          <p>{user.email}</p>
        </div>
        <div>
          <label>Contact No.</label>
          <p>{user.phone}</p>
        </div>
        <div>
          <label>Post</label>
          <p>{user.role}</p>
        </div>
      </div>
    </>
  );
}

export default Getuser;
