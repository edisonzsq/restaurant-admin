import React, { Component } from "react";
import AdminDataService from "../services/admin.service";

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.onChangeTableId = this.onChangeTableId.bind(this);
    this.onChangeNoOfPax = this.onChangeNoOfPax.bind(this);
    this.onChangeBillAmount = this.onChangeBillAmount.bind(this);
    this.getOrder = this.getOrder.bind(this);
    this.updateCompleted = this.updateCompleted.bind(this);
    this.updateOrder = this.updateOrder.bind(this);

    this.state = {
      currentOrder: {
        // orderId: null,
        tableId: null,
        // dateTime: null,
        // restaurantId: null,
        noOfPax: null,
        billAmount: null,
        completed: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getOrder(this.props.match.params.id);
  }

  onChangeTableId(e) {
    const tableId = e.target.value;

    this.setState(function(prevState) {
      return {
        currentOrder: {
          ...prevState.currentOrder,
          tableId: tableId
        }
      };
    });
  }

  onChangeNoOfPax(e) {
    const noOfPax = e.target.value;
    
    this.setState(prevState => ({
      currentOrder: {
        ...prevState.currentOrder,
        noOfPax: noOfPax
      }
    }));
  }

  onChangeBillAmount(e) {
    const billAmount = e.target.value;
    
    this.setState(prevState => ({
      currentOrder: {
        ...prevState.currentOrder,
        billAmount: billAmount
      }
    }));
  }

  getOrder(orderId) {
    AdminDataService.getOrderByOrderId(orderId)
      .then(response => {
        this.setState({
          currentOrder: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCompleted(status) {
    let data = {
        // orderId: this.state.currentOrder.orderId,
        tableId: this.state.currentOrder.tableId,
        // dateTime: this.state.currentOrder.dateTime,
        // restaurantId: this.state.currentOrder.restaurantId,
        noOfPax: this.state.currentOrder.noOfPax,
        billAmount: this.state.currentOrder.billAmount,
        completed: status
    };

    AdminDataService.update(this.state.currentOrder.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentOrder: {
            ...prevState.currentOrder,
            completed: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateOrder() {
    AdminDataService.update(
      this.state.currentOrder.id,
      this.state.currentOrder
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The order was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentOrder } = this.state;

    return (
      <div>
        {currentOrder ? (
          <div className="edit-form">
            <h4>Order</h4>
            <form>
                
              <div className="form-group">
                <label htmlFor="tableId">Table Id</label>
                <input
                  type="number"
                  className="form-control"
                  id="tableId"
                  value={currentOrder.tableId}
                  onChange={this.onChangeTableId}
                />
              </div>

              <div className="form-group">
                <label htmlFor="noOfPax">No of Pax</label>
                <input
                  type="number"
                  className="form-control"
                  id="noOfPax"
                  value={currentOrder.noOfPax}
                  onChange={this.onChangeNoOfPax}
                />
              </div>

              <div className="form-group">
                <label htmlFor="billAmount">Bill Amount</label>
                <input
                  type="number"
                  className="form-control"
                  id="billAmount"
                  value={currentOrder.billAmount}
                  onChange={this.onChangeBillAmount}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status: </strong>
                </label>
                {currentOrder.completed ? "Completed" : "New"}
              </div>
            </form>

            {currentOrder.completed ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateCompleted(false)}
              >
                New
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateCompleted(true)}
              >
                Complete
              </button>
            )}

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateOrder}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an Order...</p>
          </div>
        )}
      </div>
    );
  }
}
