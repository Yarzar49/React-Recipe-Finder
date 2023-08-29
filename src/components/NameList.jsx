import React, { useRef, useContext, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NameContext } from "../NameContext";
import { Link } from "react-router-dom";
import axios from "axios";

function NameList() {
  const { names, setNames } = useContext(NameContext);
  const nameRef = useRef(null);


  useEffect(() => {
    nameRef.current.focus(); // Focus the input element on mount
  });


  const clickHandler = () => {
    console.warn(nameRef.current.value);
    if (nameRef.current.value !== "") {
      setNames([...names, nameRef.current.value]);
      nameRef.current.value = "";
    }
  };

  const deleteHandler = (index) => {
    const updatedNames = [...names];
    updatedNames.splice(index, 1);
    setNames(updatedNames);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container fluid>
        <Row className="align-items-center">
          <Col sm={3}>Column 1</Col>
          <Col sm={6}>
            <h1>Hello React <button className="btn btn-secondary"><Link  style={{ textDecoration: "none", color: "white" }} to={"/posts"}>Posts</Link></button></h1>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              ref={nameRef}
              //   onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
            <button
              onClick={clickHandler}
              type="button"
              className="btn btn-primary mt-3"
            >
              Submit
            </button>
            <ul style={{ listStyle: "none" }}>
              {names.length > 0 ? (
                names.map((n, i) => (
                  <li key={i} style={{ textAlign: "center" }} className="mt-2">
                    {n}{" "}
                    <button className="btn btn-warning me-2 text-white">
                      <Link
                        to={`/edit/${i}`}
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Edit
                      </Link>
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteHandler(i)}
                    >
                      Delete
                    </button>{" "}
                  </li>
                ))
              ) : (
                <h4 style={{ textAlign: "center" }}>Nothing</h4>
              )}
            </ul>
          </Col>
          <Col sm={3}>Column 3</Col>
        </Row>
      </Container>
    </div>
  );
}

export default NameList;
