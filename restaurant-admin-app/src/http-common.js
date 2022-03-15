import axios from "axios";

export default axios.create({
  baseURL: "https://restaurant-ordering-app.herokuapp.com",
  headers: {
    "Content-type": "application/json"
  }
});