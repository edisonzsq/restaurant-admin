import http from "../http-common";

class AdminDataService {

  getAllOrders() {
    return http.get("/orders");
  }

  getOrderByOrderId(orderId) {
    return http.get(`/orders/orderId/${orderId}`);
  }

  getOrderItemsByOrderId(orderId) {
    return http.get(`/orderItems/orderId/${orderId}`);
  }

  updateOrder(orderId, data) {
    return http.put(`/orders/orderId/${orderId}`, data);
  }

  updateOrderItem(orderItemId, data) {
    return http.put(`/orderItems/orderItemId/${orderItemId}`, data);
  }

//   findOrderByTableId(tableId) {
//     return http.get(`/orders/tableId/${tableId}`);
//   }

  findOrderItemByItemTitle(itemTitle) {
    return http.get(`/orderItems?itemTitle=${itemTitle}`);
  }
  
}

export default new AdminDataService();