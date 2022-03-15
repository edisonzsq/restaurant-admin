import axios from "axios";

const API = axios.create({
  baseURL: "https://restaurant-ordering-app.herokuapp.com",
});

export default API;