import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllMovies = async () => {
  const url = `${BASE_URL}/mba/api/v1/movies`;
  return await axios.get(url);
};
