import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Order from "./components/order";
import OrdersList from "./components/orders-list";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/orders" className="navbar-brand">
            Restaurant Admin App
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/orders"} className="nav-link">
                Orders
              </Link>
            </li>
          </div>
        </nav>
        <div className="container mt-3">
          <Routes>
            <Route path="/orders" element={<OrdersList />} />
            <Route path="/orders/orderId/:orderId" element={<Order />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;