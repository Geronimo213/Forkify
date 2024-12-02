// https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=<insert your key>
const forkifyApiBase = 'https://forkify-api.herokuapp.com/api/v2/recipes';
const getSecrets = async () => {
  const res = await fetch('./secrets.json');
  return res.json();
};
let secrets;
getSecrets()
  .then(secretJSON => {
    secrets = secretJSON.forkifyApi;
  })
  .catch(error => {
    console.error(error);
  });

export const state = {
  recipe: {},
};

export const loadRecipes = async recipeId => {
  try {
    const res = await fetch(`${forkifyApiBase}/${recipeId}`);
    const data = await res.json();
    if (!res.ok)
      return Promise.reject(Error(`${data.message} (${res.status})`));

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
    console.error(err);
  }
};
export const loadSearchResults = async searchTerms => {
  try {
    const res = await fetch(`${forkifyApiBase}?search=${searchTerms}`);
    const data = await res.json();
    if (!res.ok)
      return Promise.reject(Error(`${data.message} (${res.status})`));
    const { recipes } = data.data;
    state.searchResults = recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        imageUrl: recipe.image_url,
        publisher: recipe.publisher,
      };
    });
  } catch (error) {
    console.error(error);
  }
};
