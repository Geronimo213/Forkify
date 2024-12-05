'use strict';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import listView from './views/listView.js';
import searchView from './views/searchView.js';
import { readBookmarks, state } from './model.js';
import bookmarksView from './views/bookmarksView.js';

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
    if (!recipeId) return;
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
  model.persistBookmarks();
  recipeView.update(model.state.recipe);
};
const handleBookmarkRender = function (e) {
  e.preventDefault();
  bookmarksView.render(state.bookmarks);
}

const init = function () {
  readBookmarks();
  recipeView.addHandlerRender(showRecipe);
  searchView.addHandlerRender(handleSearch);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlToggleBookmark);
  bookmarksView.addHandlerRender(handleBookmarkRender)
};
init();
