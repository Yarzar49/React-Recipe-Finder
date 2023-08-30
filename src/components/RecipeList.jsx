import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../recipeSlice";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { initializeFavoriteCount } from "../recipeSlice"; // Import the selector
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons"; // Import FontAwesome icon
import "../recipe-card.css";

// ... (import statements)

// ... (import statements)

function RecipeList() {
  const recipes = useSelector((state) => state.recipe.recipes);
  const dispatch = useDispatch();

  const currentFavoriteCount =
    parseInt(localStorage.getItem("currentFavoriteCount")) || 0;

  const storedHearts = JSON.parse(localStorage.getItem("filledHearts")) || {};
  const [filledHearts, setFilledHearts] = useState(storedHearts);

  useEffect(() => {
    localStorage.setItem("filledHearts", JSON.stringify(filledHearts));
  }, [filledHearts]);

  useEffect(() => {
    dispatch(initializeFavoriteCount());
  }, [dispatch]);

  const headerStyle = {
    position: "sticky",
    top: 0,

    backgroundColor: "#f0f0f0", // Adjust the background color
    zIndex: 100, // Adjust z-index if needed
    padding: "10px 0", // Adjust padding
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Box shadow
  };

  const heartIconStyle = {
    color: currentFavoriteCount > 0 ? "red" : "white",
    fontSize: "24px", // Adjust the font size
    marginLeft: "10px", // Adjust the margin
    marginRight: "5px",
  };

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
    <>
      <header style={headerStyle}>
        <h1 style={{ textAlign: "center", flex: 1, margin: 0 }}>Recipes</h1>
        <Button className="recipe-button me-3" variant="primary">
          <Link
            to="/favorites"
            style={{ textDecoration: "none", color: "white" }}
          >
            <FontAwesomeIcon icon={faHeart} size="lg" style={heartIconStyle} />
            {currentFavoriteCount}
          </Link>
        </Button>
      </header>
      <Container className="my-5">
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
                    {recipe.strMeal} {}{" "}
                    <Link
                      to={`/details/${recipe.idMeal}`}
                      style={{ textDecoration: "none" }}
                    >
                      <FontAwesomeIcon
                        icon={faInfoCircle}
                        size="sm"
                        className="text-warning"
                      />
                    </Link>
                  </Card.Title>
                  <Card.Text className="recipe-category">
                    {recipe.strCategory}
                  </Card.Text>

                  <Button
                    onClick={() => toggleFilledHeart(recipe.idMeal)}
                    className="recipe-button"
                    variant="primary"
                    style={{ background: "transparent", border: "none" }}
                  >
                    <FontAwesomeIcon
                      icon={faHeart}
                      size="lg"
                      style={{
                        color: filledHearts[recipe.idMeal] ? "red" : "white",
                      }}
                    />
                    {filledHearts[recipe.idMeal] ? (
                      <span className="ms-2">Added to Favorites</span>
                    ) : (
                      <span className="ms-2">Add to Favorites</span>
                    )}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default RecipeList;
