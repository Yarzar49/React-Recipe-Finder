import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFavorite } from '../recipeSlice';
import { Card, Button, Col, Row } from 'react-bootstrap'; // Import React Bootstrap components
import '../favorite-recipes.css'; // Import your custom CSS

function FavoriteRecipes() {
  const favorites = useSelector((state) => state.recipe.favorites);
  const dispatch = useDispatch();

  const handleRemoveFavorite = (recipe) => {
    dispatch(removeFavorite(recipe));
  };

  return (
    <div className="favorite-recipes-container">
      <h2 className="mb-4">Favorite Recipes</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {favorites.map((recipe) => (
          <Col key={recipe.idMeal}>
            <Card className="favorite-recipe-card">
              <Card.Img variant="top" src={recipe.strMealThumb} alt={recipe.strMeal} className="favorite-recipe-image" />
              <Card.Body>
                <Card.Title className="favorite-recipe-title">{recipe.strMeal}</Card.Title>
                <Card.Text className="favorite-recipe-category">{recipe.strCategory}</Card.Text>
                <Button
                  onClick={() => handleRemoveFavorite(recipe)}
                  className="favorite-recipe-button"
                  variant="outline-danger"
                >
                  Remove from Favorites
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default FavoriteRecipes;