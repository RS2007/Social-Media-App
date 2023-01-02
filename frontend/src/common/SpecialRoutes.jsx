import { isLoggedIn } from "../utils/authUtils";

const LOGIN_URL = import.meta.env.PROD
  ? "https://pure-ravine-09795.herokuapp.com/login"
  : "http://localhost:3000/login";

/* eslint-disable react/prop-types*/
export const ProtectedRoute = ({ children }) => {
  if (!isLoggedIn()) {
    window.location.href = LOGIN_URL;
    return;
  }
  return children;
};
