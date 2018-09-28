import FoodItem from '../models/FoodItem';

export default {

  async getAllFoodItems(req, res) {
    const allFoodItems = await FoodItem.find({});
    res.status(200).json(allFoodItems);
  },

  async getFoodItemById(req, res) {
    const { foodItemId } = req.params;
    if (!foodItemId) {
      res.status(400).send({ errors: { foodItemId: 'A valid food Item Id is required' } });
    }

    const foodItem = await FoodItem.findById(foodItemId);
    res.status(200).json(foodItem);
  },

  async createFoodItem(req, res) {
    const foodItem = new FoodItem(req.body);
    const newFoodItem = await foodItem.save();

    res.status(201).json(newFoodItem);
  },

  async updateFoodItem(req, res) {
    const { foodItemId } = req.params;
    if (!foodItemId) {
      res.status(400).send({ errors: { foodItemId: 'A valid food Item Id is required' } });
    }

    const previousFoodItem = await FoodItem.findById(foodItemId);
    previousFoodItem.name = req.body.name;
    previousFoodItem.image = req.body.image;
    previousFoodItem.description = req.body.description;
    previousFoodItem.quantity = req.body.quantity;
    previousFoodItem.unitPrice = req.body.unitPrice;
    const updatedFoodItem = await previousFoodItem.save();

    res.status(200).json(updatedFoodItem);
  },

  async deleteFoodItem(req, res) {
    const { foodItemId } = req.params;
    await FoodItem.delete(foodItemId);

    res.status(204).json({});
  },
};
