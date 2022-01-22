import React, { useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Updateuser from "../Updateuser/Updateuser";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "./Manager.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function Manager() {
  const Navigate = useNavigate();
  const [user, setUser] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState("");
  const handleOpen = (id) => {
    setOpen(true);
    setUpdate(id);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (localStorage.getItem("Authorization")) {
      getUser();
    } else {
      Navigate("/");
    }
  }, []);

  const getUser = () => {
    axios
      .get(`https://user-api-users.herokuapp.com/users`, {
        headers: {
          Authorization: `${localStorage.getItem("Authorization")}`,
        },
      })
      .then((users) => {
        setUser(users.data);
      });
  };

  function deleteUser(id) {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirm === true) {
      axios
        .delete(`https://user-api-users.herokuapp.com/users/${id}`, {
          headers: {
            Authorization: ` ${localStorage.getItem("Authorization")}`,
          },
        })
        .then((res) => {
          getUser();
        });
    }
  }

  function userLogout() {
    fetch(`https://user-api-users.herokuapp.com/users/logout`, {
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
    <div>
      <Button className="logout" onClick={userLogout}>
        Logout
      </Button>
      <br />

      {/* Open modal window for updating user */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Updateuser id={update} />
          </Typography>
        </Box>
      </Modal>

      <div className="admin">
        <h1>Login As Admin</h1>
        <h3>We have {user.length - 1} Managers and 1 Admin.</h3>
      </div>

      {/* Table for showing users data */}
      <TableContainer color="secondary" component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.map((user) => (
              <>
                <TableRow key={user._id}>
                  <TableCell component="th" scope="row">
                    {user.email}
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <EditIcon onClick={() => handleOpen(user._id)}></EditIcon>
                  </TableCell>
                  <TableCell>
                    <DeleteIcon
                      onClick={() => deleteUser(user._id)}
                    ></DeleteIcon>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Manager;
