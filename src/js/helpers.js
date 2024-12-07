import { CONSTANTS } from './config';

export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};
export const delay = function (s) {
  return new Promise(resolve => {
    setTimeout(resolve, s * 1000);
  });
};
// export const getJSON = async url => {
//   try {
//     const res = await Promise.race([
//       fetch(url),
//       timeout(CONSTANTS.TIME_OUT_SECONDS),
//     ]);
//     const data = await res.json();
//     if (!res.ok)
//       return Promise.reject(Error(`${data.message} (${res.status})`));
//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
// export const sendJSON = async (url, recipeData) => {
//   try {
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(recipeData),
//     });
//     const res = await Promise.race([response, timeout(CONSTANTS.TIME_OUT_SECONDS)]);
//     const responseData = await response.json();
//     if (!response.ok) {
//       return Promise.reject(Error(`${responseData.message} (${response.status})`));
//     }
//     return responseData;
//   } catch (error) {
//     throw error;
//   }
// }
export const fetchJSON = async (url, recipeData = null) => {
  try {
    const response = await fetch(url, {
      method: recipeData ? 'POST' : 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: recipeData ? JSON.stringify(recipeData) : null,
    });
    const res = await Promise.race([
      response,
      timeout(CONSTANTS.TIME_OUT_SECONDS),
    ]);
    const responseData = await res.json();
    if (!response.ok) {
      return Promise.reject(
        Error(`${responseData.message} (${response.status})`),
      );
    }
    return responseData;
  } catch (error) {
    throw error;
  }
};
