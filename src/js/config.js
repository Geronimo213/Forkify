export const CONSTANTS = {
  TIME_OUT_SECONDS: 10,
  DELAY_MODAL_CLOSE: 1.5,
};

export const forkifyApiBase =
  'https://forkify-api.herokuapp.com/api/v2/recipes';
const getSecrets = async () => {
  const res = await fetch('./secrets.json');
  return res.json();
};
export let secrets;
getSecrets()
  .then(secretJSON => {
    secrets = secretJSON.forkifyApi;
  })
  .catch(error => {
    console.error(error);
    secrets = '';
  });
