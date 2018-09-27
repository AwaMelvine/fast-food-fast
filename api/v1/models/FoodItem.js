export const allFoodItems = [];

export class FoodItem {
  constructor(foodItem) {
    if (foodItem.id) {
      this.id = foodItem.id;
    }
    this.name = foodItem.name ? foodItem.name.toString() : null;
    this.image = foodItem.image ? foodItem.image.toString() : 'http://via.placeholder.com/170x170';
    this.description = foodItem.description ? foodItem.description.toString() : 0;
    this.quantity = foodItem.quantity ? parseInt(foodItem.quantity, 10) : 0;
    this.unitPrice = foodItem.unitPrice ? parseInt(foodItem.unitPrice, 10) : 0;
    this.updatedAt = foodItem.updatedAt || null;
    this.createdAt = foodItem.createdAt || null;
  }
}
