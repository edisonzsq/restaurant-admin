import React, { Component } from "react";
import AdminDataService from "../services/admin.service";
import { Link } from "react-router-dom";

export default class OrdersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchOrderId = this.onChangeSearchOrderId.bind(this);
    this.retrieveOrders = this.retrieveOrders.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveOrder = this.setActiveOrder.bind(this);
    this.searchOrderId = this.searchOrderId.bind(this);

    this.state = {
      orders: [],
      currentOrder: null,
      currentIndex: -1,
      searchOrderId: ""
    };
  }

  componentDidMount() {
    this.retrieveOrders();
  }

  onChangeSearchOrderId(e) {
    const searchOrderId = e.target.value;

    this.setState({
        searchOrderId: searchOrderId
    });
  }

  retrieveOrders() {
    AdminDataService.getAllOrders()
      .then(response => {
        this.setState({
          orders: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveOrders();
    this.setState({
      currentOrder: null,
      currentIndex: -1
    });
  }

  setActiveOrder(order, index) {
    this.setState({
      currentOrder: order,
      currentIndex: index
    });
  }

  searchOrderId() {
    this.setState({
      currentOrder: null,
      currentIndex: -1
    });

    AdminDataService.getOrderByOrderId(this.state.searchOrderId)
      .then(response => {
        this.setState({
          orders: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchOrderId, orders, currentOrder, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Order Id"
              value={searchOrderId}
              onChange={this.onChangeSearchOrderId}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchOrderId}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Orders List</h4>

          <ul className="list-group">
            {orders &&
              orders.map((order, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveOrder(order, index)}
                  key={index}
                >
                  {order.orderId}
                </li>
              ))}
          </ul>

        </div>

        <div className="col-md-6">
          {currentOrder ? (
            <div>
              <h4>Order</h4>

              <div>
                <label>
                  <strong>Order Id:</strong>
                </label>{" "}
                {currentOrder.orderId}
              </div>

              <div>
                <label>
                  <strong>Table Id:</strong>
                </label>{" "}
                {currentOrder.tableId}
              </div>

              <div>
                <label>
                  <strong>Date and Time:</strong>
                </label>{" "}
                {currentOrder.dateTime}
              </div>

              <div>
                <label>
                  <strong>Restaurant Id:</strong>
                </label>{" "}
                {currentOrder.restaurantId}
              </div>

              <div>
                <label>
                  <strong>No of Pax:</strong>
                </label>{" "}
                {currentOrder.noOfPax}
              </div>

              <div>
                <label>
                  <strong>Bill Amount:</strong>
                </label>{" "}
                {currentOrder.billAmount}
              </div>

              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentOrder.completed ? "Completed" : "New"}
              </div>

              <Link
                to={"/orders/ordersId" + currentOrder.orderId}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on an Order...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
