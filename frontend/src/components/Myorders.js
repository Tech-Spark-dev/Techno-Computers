import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";

const Myorders = () => {
  const [ordersummary, setOrdersummary] = useState([]);

  const userInfo = localStorage.getItem("userInfo");
  const userInfoParsed = JSON.parse(userInfo);
  const userid = userInfoParsed._id;

  useEffect(() => {
    const orderSummary = async (userid) => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const response = await axios.get(
          `http://localhost:5000/api/users/userscart/${userid}`,
          config
        );
        setOrdersummary(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error");
      }
    };
    orderSummary(userid);
  }, [userid]);
  return (
    <div>
      <h1 className="page-header">My orders</h1>
      {ordersummary.some((item)=>item.ispaid !=='0')?
      (<Table striped bordered hover variant="light" style={{ width: "50%" }}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Products</th>
          <th hidden>User ID:</th>
          <th> Total Amount</th>
          <th>Delivery Address</th>
        </tr>
      </thead>
      <tbody>
        {ordersummary.map((item, index) => {
          const options = { month: "short", day: "numeric", year: "numeric" };
          const formattedDate = new Date(item.createdAt).toLocaleDateString(
            undefined,
            options
          );
          return (
            
            <tr key={index}>
              <td>{formattedDate}</td>
              <td>
                {item.details.map((prod, i) => (
                  <span>{prod.name}
                  {i !==item.details.length -1 && (<>,</>)}
                  </span>
                ))}
              </td>
              <td hidden>{item.userid}</td>
              <td>{item.total.toLocaleString()}</td>
              <td>
                {item.street},{item.place},{item.city},{item.state},
                {item.district}
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>):(<div className="Noorders">You haven't placed any orders</div>)  
    }
    </div>
  );
};

export default Myorders;
