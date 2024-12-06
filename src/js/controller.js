'use strict';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import listView from './views/listView.js';
import searchView from './views/searchView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { CONSTANTS } from './config';

if (module.hot) {
  module.hot.accept();
}
///////////////////////////////////////
// Element selectors
//////////////////////////////////////
const recipeContainer = document.querySelector('.recipe');
const searchInput = document.querySelector('.search__field');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function () {
  try {
    // Get recipe id
    const recipeId = window.location.hash.slice(1);
    if (!recipeId || recipeId === model.state.recipe.id) return;
    recipeView.renderSpinner();
    // Update results to mark selected result
    if (model.state.searchResults) {
      listView.update(model.state.searchResults);
    }
    // Load recipe
    await model.loadRecipes(recipeId);
    const { recipe } = model.state;
    //Render recipe
    recipeView.render(recipe);
    // Render bookmarks
    bookmarksView.render(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
  }
};
const handleSearch = async function (e) {
  e.preventDefault();
  listView.renderSpinner();
  try {
    await model.loadSearchResults(
      e.target.querySelector('.search__field').value,
    );
    listView.render(model.state.searchResults);
  } catch (err) {
    listView.renderError(err);
  }
};
const controlServings = function (newServing) {
  model.updateServings(newServing);
  recipeView.update(model.state.recipe);
};
const controlToggleBookmark = function () {
  model.toggleBookmark(model.state.recipe);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};
// const handleBookmarkRender = function (e) {
//   e.preventDefault();
//   bookmarksView.render(state.bookmarks);
// }
const handleAddRecipe = async function (data) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(data);
    // Render success message
    addRecipeView.renderMessage('Recipe was successfully uploaded');
    // Render recipe
    recipeView.render(model.state.recipe);
    //Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // Render bookmarks
    bookmarksView.render(model.state.bookmarks);
    // Close form
    setTimeout(() => {
      // Close form window
      addRecipeView.toggleWindow();
      // Render addRecipeWindow
      addRecipeView.render();
      addRecipeView.addHandlerSubmit(handleAddRecipe);
    }, CONSTANTS.DELAY_MODAL_CLOSE * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
    setTimeout(() => {
      addRecipeView.render();
      addRecipeView.addHandlerSubmit(handleAddRecipe);
    }, CONSTANTS.DELAY_MODAL_CLOSE * 1000);
  }
};

const initBookmarks = function () {
  model.readBookmarks();
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  initBookmarks();
  recipeView.addHandlerRender(showRecipe);
  searchView.addHandlerRender(handleSearch);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlToggleBookmark);
  // bookmarksView.addHandlerRender(handleBookmarkRender);
  addRecipeView.addHandlerSubmit(handleAddRecipe);
};
init();
