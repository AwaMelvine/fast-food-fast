import FoodItem from '../models/FoodItem';

export default {

  async getAllFoodItems(req, res) {
    const allFoodItems = await FoodItem.find({});
    return res.status(200).json(allFoodItems);
  },

  async getFoodItemById(req, res) {
    const { food_item_id } = req.params;
    if (!food_item_id) {
      return res.status(400).send({ errors: { food_item_id: 'A valid food Item Id is required' } });
    }

    const foodItem = await FoodItem.findById(food_item_id);
    if (!foodItem) {
      return res.status(404).send({ errors: { global: 'Food item not found' } });
    }
    res.status(200).json(foodItem);
  },

  async createFoodItem(req, res) {
    const foodItem = new FoodItem(req.body);
    const newFoodItem = await foodItem.save();

    res.status(201).json(newFoodItem);
  },

  async updateFoodItem(req, res) {
    const { food_item_id } = req.params;
    if (food_item_id == null) {
      res.status(400).send({ errors: { food_item_id: 'A valid food Item Id is required' } });
    }

    const previousFoodItem = await FoodItem.findById(food_item_id);

    if (!previousFoodItem.id) {
      res.status(404).send({ errors: { global: 'Food item not found' } });
    }

    previousFoodItem.name = req.body.name;
    previousFoodItem.image = req.body.image;
    previousFoodItem.description = req.body.description;
    previousFoodItem.quantity = req.body.quantity;
    previousFoodItem.unit_price = req.body.unit_price;
    const updatedFoodItem = await previousFoodItem.update();

    res.status(200).json(updatedFoodItem);
  },

  async deleteFoodItem(req, res) {
    const { food_item_id } = req.params;
    await FoodItem.delete(food_item_id);

    res.status(204).json({});
  },
};
