import { toInt } from '../helpers/functions';

export const allCategories = [];

export class Category {
  constructor(category) {
    this.id = category.id ? toInt(category.id) : 0;
    this.name = category.name ? category.name.toString() : null;
    this.description = category.description ? category.description.toString() : 0;
    this.updatedAt = category.updatedAt || null;
    this.createdAt = category.createdAt || null;
  }
}
