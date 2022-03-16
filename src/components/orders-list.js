import React, { Component } from "react";
import AdminDataService from "../services/admin.service";
// import { Link } from "react-router-dom";

export default class OrdersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchOrderId = this.onChangeSearchOrderId.bind(this);
    this.retrieveOrders = this.retrieveOrders.bind(this);
    this.retrieveOrderItemsinOrder = this.retrieveOrderItemsinOrder.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveOrderAndOrderItems = this.setActiveOrderAndOrderItems.bind(this);
    this.searchOrderId = this.searchOrderId.bind(this);

    this.state = {
      orders: [],
      currentOrder: "",
      currentOrderItemsInOrder: [],
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
          let data = response.data.data;
          data.sort((a,b) => b.orderId - a.orderId
          )
        this.setState({
          orders: data
        });
        console.log(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveOrders();
    this.setState({
      currentOrder: null,
      currentOrderItemsInOrder: null,
      currentIndex: -1
    });
  }

  
  async setActiveOrderAndOrderItems(order, index) {

    const result = await AdminDataService.getOrderItemsByOrderId(order.orderId);

    this.setState({
      currentOrder: order,
      currentOrderItemsInOrder: result.data.data,
      currentIndex: index
    })
    ;
  }

  retrieveOrderItemsinOrder(){

    let orderId = this.state.currentOrder.orderId;
    
    AdminDataService.getOrderItemsByOrderId(orderId)
      .then(response => {
      this.setState({
        currentOrderItemsInOrder: response.data.data
      });
      console.log(response.data.data);
      })
      .catch(e => {
      console.log(e);
      });
  };

  searchOrderId() {
    this.setState({
      currentOrder: null,
      currentOrderItemsInOrder: null,
      currentIndex: -1
    });

    AdminDataService.getOrderByOrderId(this.state.searchOrderId)
      .then(response => {
        this.setState({
            currentOrder: response.data.data
        });
        console.log(response.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  }



  render() {
    const { searchOrderId, orders, currentOrderItemsInOrder, currentOrder, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Search by Order Id"
              value={searchOrderId}
              onChange={this.onChangeSearchOrderId}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => {this.searchOrderId(); this.retrieveOrderItemsinOrder();}}
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
                  onClick={() => {this.setActiveOrderAndOrderItems(order, index);}}
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
                {new Date(currentOrder.dateTime).toLocaleString()}
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

              <br />

              <h4>Order Items</h4>

            <ul className="order-items-in-order">

            {currentOrderItemsInOrder &&
              currentOrderItemsInOrder.map((orderItemInOrder) => (
                <React.Fragment key={orderItemInOrder.orderItemId}>
                  <li><strong>Item Title:</strong> {orderItemInOrder.itemTitle}</li>
                  <li><strong>Item Unit Price:</strong> {orderItemInOrder.itemUnitPrice}</li>
                  <li><strong>Quantity:</strong> {orderItemInOrder.quantity}</li>
                  <li><strong>Special Request:</strong> {orderItemInOrder.specialRequest}</li>
                  <li><strong>Status:</strong> {orderItemInOrder.status}</li>
                  <br />
                </React.Fragment>
                
                
              ))}
          </ul>

              {/* <Link
                to={"/orders/ordersId/" + currentOrder.orderId}
              >
                Edit
              </Link> */}

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
