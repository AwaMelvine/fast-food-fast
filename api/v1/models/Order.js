export const allOrders = [];

export class Order {
  constructor(order) {
    if (order && order.id) {
      this.id = order.id;
    }
    this.customerId = order.customerId ? order.customerId.toString() : null;
    this.itemId = order.itemId ? parseInt(order.itemId, 10) : 0;
    this.quantity = order.quantity ? parseInt(order.quantity, 10) : 0;
    this.totalPrice = order.totalPrice ? parseInt(order.totalPrice, 10) : 0;
    this.orderDate = order.orderDate ? order.orderDate : null;
    this.dateToDeliver = order.dateToDeliver || null;
    this.orderStatus = order.orderStatus ? order.orderStatus.toString() : null;
  }
}
