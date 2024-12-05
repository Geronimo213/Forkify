// https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=<insert your key>

import { forkifyApiBase } from './config';
import { secrets } from './config';
import { getJSON } from './helpers';
export const state = {
  recipe: {},
  bookmarks: [],
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

    state.recipe.bookmarked = state.bookmarks.some(bookmark => bookmark.id === recipeId);
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
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity =
      (ingredient.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

export const toggleBookmark = function (recipe) {
  if (state.recipe.bookmarked) {
    state.bookmarks.splice(state.bookmarks.findIndex(bm => bm.id === recipe.id), 1);
  }
  else {
  // Add bookmark
    state.bookmarks.push(recipe);
  }
  // Mark current recipe as bookmark
    state.recipe.bookmarked = !state.recipe.bookmarked;
};
export const persistBookmarks = function() {
  const bookmarks = JSON.stringify(state.bookmarks);
  localStorage.setItem('bookmarks', bookmarks);
}
export const readBookmarks = function () {
  state.bookmarks = JSON.parse(localStorage.getItem('bookmarks')) ?? [];
}
