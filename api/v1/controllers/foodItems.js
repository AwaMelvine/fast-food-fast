import FoodItem from '../models/FoodItem';

export default {

  async getAllFoodItems(req, res) {
    const allFoodItems = await FoodItem.find({});
    return res.status(200).send({ data: allFoodItems, message: 'success' });
  },

  async getFoodItemById(req, res) {
    const food_item_id = parseInt(req.params.food_item_id, 10);
    if (!food_item_id || Number.isNaN(food_item_id)) {
      return res.status(400).send({ errors: { food_item_id: 'A valid food Item Id is required' } });
    }

    const foodItem = await FoodItem.findById(food_item_id);
    if (!foodItem) {
      return res.status(200).send({ errors: { global: 'Food item not found' } });
    }
    return res.status(200).send({ data: foodItem, message: 'success' });
  },

  async createFoodItem(req, res) {
    const foodItem = new FoodItem(req.body);
    const newFoodItem = await foodItem.save();

    return res.status(201).send({ data: newFoodItem, message: 'Food item created successfully' });
  },

  async updateFoodItem(req, res) {
    const food_item_id = parseInt(req.params.food_item_id, 10);

    const previousFoodItem = await FoodItem.findById(food_item_id);

    if (!previousFoodItem) {
      return res.status(200).send({ errors: { global: 'Food item not found' } });
    }

    previousFoodItem.name = req.body.name;
    previousFoodItem.image = req.body.image;
    previousFoodItem.description = req.body.description;
    previousFoodItem.quantity = req.body.quantity;
    previousFoodItem.unit_price = req.body.unit_price;
    const updatedFoodItem = await previousFoodItem.update();

    return res.status(200).json({ data: updatedFoodItem, message: 'Item updated successfully' });
  },

  async deleteFoodItem(req, res) {
    const food_item_id = parseInt(req.params.food_item_id, 10);
    const results = await FoodItem.delete(food_item_id);

    return res.status(204).json({ message: 'Item deleted successfully' });
  },
};
