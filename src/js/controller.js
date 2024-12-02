'use strict';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import listView from './views/listView.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

///////////////////////////////////////
// Element selectors
//////////////////////////////////////
const recipeContainer = document.querySelector('.recipe');
const searchInput = document.querySelector('.search__field');
const searchForm = document.querySelector('.search');

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
  } catch (err) {
    console.error(err);
  }
};
const handleSearch = async function (e) {
  e.preventDefault();
  listView.renderSpinner();
  await model.loadSearchResults(e.target.querySelector('.search__field').value);
  listView.render(model.state.searchResults);
};

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
searchForm.addEventListener('submit', handleSearch);
