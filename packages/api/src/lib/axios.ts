import axios from "axios";

const baseURL = "http://localhost:8000/api";

export const axiosInstance = axios.create({
  baseURL,

  headers: {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "http://localhost:8000", // replace this your actual origin
    "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT",
    "Access-Control-Allow-Headers":
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  },
});

export const api = axios.create({
  baseURL,

  headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});
