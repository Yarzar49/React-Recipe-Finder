import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../recipeSlice";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { selectFavoriteCount } from "../recipeSlice"; // Import the selector
import "../recipe-card.css";

// ... (import statements)

// ... (import statements)

function RecipeList() {
  const recipes = useSelector((state) => state.recipe.recipes);
  const dispatch = useDispatch();
  const favoriteCount = useSelector(selectFavoriteCount);

  const storedHearts = JSON.parse(localStorage.getItem("filledHearts")) || {};
  const [filledHearts, setFilledHearts] = useState(storedHearts);

  useEffect(() => {
    localStorage.setItem("filledHearts", JSON.stringify(filledHearts));
  }, [filledHearts]);



  const toggleFilledHeart = (recipeId) => {
    if (filledHearts[recipeId]) {
      dispatch(
        removeFavorite(recipes.find((recipe) => recipe.idMeal === recipeId))
      ); // Assuming you have a removeFavorite action
    } else {
      dispatch(
        addFavorite(recipes.find((recipe) => recipe.idMeal === recipeId))
      );
    }
    setFilledHearts((prev) => ({ ...prev, [recipeId]: !prev[recipeId] }));
  };

 
  return (
    <Container className="my-5">
      <h1 style={{ textAlign: "center" }}>Recipes</h1>
      <button className="btn btn-success">
        <Link
          to="/favorites"
          style={{ textDecoration: "none", color: "white" }}
        >
          Favorites ({favoriteCount})
        </Link>
      </button>
      <Row xs={1} md={2} lg={3} className="g-4">
        {recipes.map((recipe) => (
          <Col key={recipe.idMeal} style={{ marginTop: "40px" }}>
            <Card className="recipe-card">
              <Card.Img
                variant="top"
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="recipe-image"
              />
              <Card.Body>
                <Card.Title className="recipe-title">
                  {recipe.strMeal}
                </Card.Title>
                <Card.Text className="recipe-category">
                  {recipe.strCategory}
                </Card.Text>
                <button
                  onClick={() => toggleFilledHeart(recipe.idMeal)}
                  className="recipe-button"
                  style={{ background: "transparent", border: "none" }}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    size="lg"
                    style={{
                      color: filledHearts[recipe.idMeal] ? "red" : "gray",
                    }}
                  />
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default RecipeList;
