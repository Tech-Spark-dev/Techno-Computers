import React, { useState } from "react";
import { REACT_SERVER_URL } from "../configs/ENV";
import axios from "axios";
import { Table } from "react-bootstrap";

const Userlist = () => {
  const [userlist, setUserlist] = useState([]);
  const [initialLoad, setInitialLoad] = useState(false);
  const fetchData = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.get(
        `${REACT_SERVER_URL}/api/users/userlist`,
        config
      );
      console.log(response.status);
      const sortedData = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setUserlist(sortedData);
      setInitialLoad(true);
    } catch (error) {
      console.log("error");
    }
  };
  if (!initialLoad) {
    fetchData();
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };
  return (
    <>
      <Table striped bordered hover style={{ width: "50%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>E-mail</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {userlist.map((user) => (
            <tr key={user._id}>
              <td> {user.name}</td>
              <td>{user.email}</td>
              <td>{formatDate(user.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Userlist;
