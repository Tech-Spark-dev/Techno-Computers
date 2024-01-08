import axios from "axios";
import React, { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {REACT_SERVER_URL} from '../configs/ENV'
import Footer from './Footer';
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import jsPDF from "jspdf";
import { FaEye } from "react-icons/fa";


const Orders = () => {
  const [address, setAddress] = useState([]);
  const [no] = useState(1);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const response = await axios.get(
          `${REACT_SERVER_URL}/api/users/address/`,
          config
        );
        setAddress(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error");
      }
    };
    fetchOrders();
  }, []);

  const viewaddress = (item) => {
    handleShow(true);
    setSelectedAddress(item);
  };
  const printAddres = ( selectedAddress ) => {
          const doc = new jsPDF();
          doc.setFont("helvetica");
           const textContent = `Name: ${
             selectedAddress?.name.toUpperCase()
           }\nProducts: ${selectedAddress?.details
             .map((detail) => `${detail.name} (${detail.qty})`)
             .join(",\n")} \n\nTotal Amount: ${
             selectedAddress?.total
           }.00\nDelivery Address:\n${selectedAddress?.street},\n${
             selectedAddress?.place
           }, \n${selectedAddress?.city},\n${selectedAddress?.district},\n${
             selectedAddress?.landmark
           }\n\nContact Number:${selectedAddress?.phonenumber}`;
            doc.text(textContent, 20, 20); // Set the position of the text in the PDF
          doc.save("document.pdf");      
  };
  return (
    <>
      <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>Sl.No.</th>
            <th hidden>User ID:</th>
            <th>Date</th>
            <th>Name</th>
            <th>Products</th>
            <th>Price:</th>
            <th>Total Quantity</th>
            <th>Total Amount:</th>
            <th>Street</th>
            <th>Place</th>
            <th>District</th>
            <th>State</th>
            <th>Landmark</th>
            <th>Phone Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          
          {address
          .slice()                                                       // Create a shallow copy to avoid modifying the original array
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((item, index) => (
            <tr key={item._id}>
              <td>{no + index}</td>
              <td hidden>{item.userid}</td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>{item.name}</td>
              <td>
                {item.details.map((prod, i) => (
                  <span key={prod.name}>
                    {prod.name} [{prod.qty}]
                    {i !== item.details.length - 1 && (
                      <>
                        ,<br />
                      </>
                    )}
                  </span>
                ))}
              </td>
              <td>
                {item.details.map((amount, i) => (
                  <span key={amount.price}>
                    {amount.price}.00 [{amount.qty}]
                    {i !== item.details.length - 1 && (
                      <>
                        , <br />
                      </>
                    )}
                  </span>
                ))}
              </td>
              <td>
                {item.details.reduce(
                  (total, quantity) => total + quantity.qty,
                  0
                )}
              </td>
              <td>{item.total.toLocaleString()}.00</td>
              <td>{item.street}</td>
              <td>{item.place}</td>
              <td>{item.district}</td>
              <td>{item.state}</td>
              <td>{item.landmark}</td>
              <td>{item.phonenumber}</td>
              <td>
                {item.ispaid !== "0" ? (
                  <Button
                    variant="success"
                    title={item.ispaid}
                  >
                    Paid
                  </Button>
                ) : (
                  <Button variant="danger">Not Paid</Button>
                )}
              </td>
              <td>
                <FaEye
                  onClick={() => viewaddress(item)}
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
       {selectedAddress && (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Customer's Address </Modal.Title>
        </Modal.Header>
        <Modal.Body> 
            <b>Name:</b> {selectedAddress?.name.toUpperCase()}
            <br />
            <b> Products:</b>{" "}
            {selectedAddress?.details.map((detail, index) => (
              <span key={detail.name}>
                {detail.name} [{detail.qty}]
                {index !== selectedAddress.details.length - 1 && ", "}
              </span>
            ))}
            <br />
            <b> Total Amount: </b>
            {selectedAddress?.total}
            <div>
              <b>Address: </b> <br />
              {selectedAddress?.street},
              <br />
              {selectedAddress?.place},
              <br />
              {selectedAddress?.city}, <br />
              {selectedAddress?.district},
              <br />
              {selectedAddress?.landmark}
              <br />
              <b>
                <i>Contact Number: </i>
              </b>
              {selectedAddress?.phonenumber}
              <br />
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => printAddres(selectedAddress)}
          >
            Print Address
          </Button>
        </Modal.Footer>
      </Modal> )}
      <Footer />
    </>
  );
};

export default Orders;
