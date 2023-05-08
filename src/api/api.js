import axios from "axios";
export const fetchMovieSugestions = async (searchString) => {
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${searchString}&apikey=d2660e85`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
