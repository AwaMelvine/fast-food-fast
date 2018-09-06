import { toInt } from '../helpers/functions';

export const allOrders = [];

export class Order {
  constructor(order) {
    this.id = order.id ? toInt(order.id) : 0;
    this.customerId = order.customerId ? order.customerId.toString() : null;
    this.itemId = order.itemId ? toInt(order.itemId) : 0;
    this.quantity = order.quantity ? toInt(order.quantity) : 0;
    this.totalPrice = order.totalPrice ? toInt(order.totalPrice) : 0;
    this.orderDate = order.orderDate ? order.orderDate : null;
    this.dateToDeliver = order.dateToDeliver || null;
    this.orderStatus = order.orderStatus ? order.orderStatus.toString() : null;
  }
}
