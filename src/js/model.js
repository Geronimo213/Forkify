// https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=<insert your key>

import { forkifyApiBase } from './config';
import { secrets } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
};

export const loadRecipes = async recipeId => {
  try {
    const data = await getJSON(`${forkifyApiBase}/${recipeId}`);
    let { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (err) {
    throw err;
  }
};
export const loadSearchResults = async searchTerms => {
  try {
    const data = await getJSON(`${forkifyApiBase}?search=${searchTerms}`);
    const { recipes } = data.data;
    if (recipes.length < 1) return Promise.reject('No recipes found!');
    state.searchResults = recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        imageUrl: recipe.image_url,
        publisher: recipe.publisher,
      };
    });
  } catch (error) {
    throw error;
  }
};
