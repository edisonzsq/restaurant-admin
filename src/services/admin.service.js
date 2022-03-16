import API from "../http-common";

class AdminDataService {

  getAllOrders() {
    return API.get("/orders");
  }

  getOrderByOrderId(orderId) {
    return API.get(`/orders/orderId/${orderId}`);
  }

  getOrderItemsByOrderId(orderId) {
    return API.get(`/orderItems/orderId/${orderId}`);
  }

  updateOrder(orderId, data) {
    return API.put(`/orders/orderId/${orderId}`, data);
  }

  updateOrderItem(orderItemId, data) {
    return API.put(`/orderItems/orderItemId/${orderItemId}`, data);
  }

//   findOrderByTableId(tableId) {
//     return http.get(`/orders/tableId/${tableId}`);
//   }

  findOrderItemByItemTitle(itemTitle) {
    return API.get(`/orderItems?itemTitle=${itemTitle}`);
  }
  
}

export default new AdminDataService();