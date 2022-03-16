import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// import AddTutorial from "./components/add-tutorial.component";
// import Tutorial from "./components/tutorial.component";
// import TutorialsList from "./components/tutorials-list.component";

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
          <Switch>
            <Route exact path={["/", "/orders"]} component={OrdersList} />
            <Route path="/orders/orderId/:orderId" component={Order} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;