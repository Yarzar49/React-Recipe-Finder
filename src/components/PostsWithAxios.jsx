
import React, { useRef, useContext, useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PostsWithAxios = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
     
    
     
  }, []);
  


  return (
    <div>
      <Container>
        <Row>
          <Col></Col>
          <Col sm={6}>
            <div>
              <h2>Posts</h2>
              <ul>
                {data.map((post) => (
                  <li key={post.id}>{post.title}</li>
                ))}
              </ul>
            </div>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default PostsWithAxios;
