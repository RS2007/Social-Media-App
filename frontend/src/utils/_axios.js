import Axios from "axios";

const API_URL = import.meta.env.PROD
  ? "https://social-media-app-vild.onrender.com/api"
  : "http://localhost:5000/api";

const _axios = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

/**
 *
 * @param {string} key   URL for fetching data(baseURL already appended, so only enter the endpoint)
 * @returns {Object}  response body from get request
 */
export const fetcher = (key) => _axios.get(key).then((res) => res.data);

export default _axios;
