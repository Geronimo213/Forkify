// https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=<insert your key>

import { forkifyApiBase } from './config';
import { secrets } from './config';
import { fetchJSON, getJSON } from './helpers';
export const state = {
  recipe: {},
  bookmarks: [],
};
const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipes = async recipeId => {
  try {
    const data = await fetchJSON(`${forkifyApiBase}/${recipeId}`);
    state.recipe = createRecipeObject(data);

    state.recipe.bookmarked = state.bookmarks.some(
      bookmark => bookmark.id === recipeId,
    );
  } catch (err) {
    throw err;
  }
};
export const loadSearchResults = async searchTerms => {
  try {
    const data = await fetchJSON(
      `${forkifyApiBase}?search=${searchTerms}&key=${secrets}`,
    );
    const { recipes } = data.data;
    if (recipes.length < 1) return Promise.reject('No recipes found!');
    state.searchResults = recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        imageUrl: recipe.image_url,
        publisher: recipe.publisher,
        ...(recipe.key && { key: recipe.key }),
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
    state.bookmarks.splice(
      state.bookmarks.findIndex(bm => bm.id === recipe.id),
      1,
    );
  } else {
    // Add bookmark
    state.bookmarks.push(recipe);
  }
  // Mark current recipe as bookmark
  state.recipe.bookmarked = !state.recipe.bookmarked;
  persistBookmarks();
};

export const persistBookmarks = function () {
  const bookmarks = JSON.stringify(state.bookmarks);
  localStorage.setItem('bookmarks', bookmarks);
};

export const readBookmarks = function () {
  state.bookmarks = JSON.parse(localStorage.getItem('bookmarks')) ?? [];
};

export const uploadRecipe = async function (data) {
  const ingredients = Object.entries(data)
    .filter(ing => ing[0].startsWith('ingredient') && ing[1] !== '')
    .map(ing => {
      const ingArr = ing[1].split(',').map(x => x.trim());
      if (ingArr.length !== 3) throw new Error('Wrong ingredient format!');
      const [quantity, unit, description] = ingArr;
      return {
        quantity: quantity ? +quantity : null,
        unit,
        description,
      };
    });
  const recipeData = {
    title: data.title,
    source_url: data.sourceUrl,
    image_url: data.image,
    publisher: data.publisher,
    cooking_time: +data.cookingTime,
    servings: +data.servings,
    ingredients,
  };
  const uploadUri = `${forkifyApiBase}?key=${secrets}`;
  state.recipe = createRecipeObject(await fetchJSON(uploadUri, recipeData));
  toggleBookmark(state.recipe);
};
