import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap"; // Import React Bootstrap components
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../recipe-details.css";

function RecipeDetails() {
  const { recipeId } = useParams();
  const recipes = useSelector((state) => state.recipe.recipes);
  const selectedRecipe = recipes.find((recipe) => recipe.idMeal === recipeId);

  if (!selectedRecipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <Container className="recipe-details-container">
      <Row>
        <Col md={6}>
          <img
            src={selectedRecipe.strMealThumb}
            alt={selectedRecipe.strMeal}
            className="img-fluid recipe-image-details"
          />
        </Col>
        <Col md={6}>
          <div className="recipe-details">
            <Row>
            <Col md={6}>
            <h3>{selectedRecipe.strMeal}</h3>
            <h6>Category: {selectedRecipe.strCategory}</h6>
            <h6>Area: {selectedRecipe.strArea}</h6>
            </Col>
            <Col md={6}>
            <h3>Ingredients:</h3>
            <ul className="ingredients-list">
              {Array.from({ length: 20 }, (_, index) => index + 1).map(
                (index) =>
                  selectedRecipe[`strIngredient${index}`] && (
                    <li key={index}>
                      {selectedRecipe[`strIngredient${index}`]} -{" "}
                      {selectedRecipe[`strMeasure${index}`]}
                    </li>
                  )
              )}
            </ul>
            </Col>
            </Row>
            
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h3>Instructions:</h3>
          <p>{selectedRecipe.strInstructions}</p>
          {/* <Button className="recipe-button" variant="primary">
            <FontAwesomeIcon
              icon={faHeart}
              size="lg"
              style={{ color: "red" }}
            />
            Added to Favorites
          </Button> */}
        </Col>
      </Row>
    </Container>
  );
}

export default RecipeDetails;
