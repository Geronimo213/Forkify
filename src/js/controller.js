'use strict';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import listView from './views/listView.js';
import searchView from './views/searchView.js';

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

    // Load recipe
    await model.loadRecipes(recipeId);
    const { recipe } = model.state;
    //Render recipe
    recipeView.render(model.state.recipe);
    recipeView.addHandlerServings();
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
const handleServings = function (e) {
  e.preventDefault();
};

const init = function () {
  recipeView.addHandlerRender(showRecipe);
  searchView.addHandlerRender(handleSearch);
};
init();
