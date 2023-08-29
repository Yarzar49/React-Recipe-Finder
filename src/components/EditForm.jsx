import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate, useParams} from "react-router-dom";
import { NameContext } from "../NameContext";

function EditForm() {
  const { i } = useParams();
  const { name, setName, names, setNames } = useContext(NameContext);

  const navigate = useNavigate();

  const updateHandler = () => {
    if (name.trim() !== "") {
      names[i] = name.trim();
      setNames(names);
      setName("");
      navigate('/')
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col sm={3}>Column 1</Col>
          <Col sm={6}>
            <h1>Hello React Edit</h1>
            <input
              type="text"
              name="name"
              defaultValue={names[i]}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="form-control"
            />
            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={updateHandler}
            >
              Update
            </button>
          </Col>
          <Col sm={3}>Column 3</Col>
        </Row>
      </Container>
    </>
  );
}

export default EditForm;
