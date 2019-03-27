import multer from 'multer';
import path from 'path';
import express from 'express';
import foodItemsController from '../controllers/foodItems';
import validateFoodItem from '../helpers/validateFoodItem';
import authenticate from '../helpers/authenticate';

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'api/v1/uploads/images');
  },
  filename: (req, file, cb) => {
    // get the original name + the date + the extention
    cb(null, `${path.basename(file.originalname, path.extname(file.originalname))}.${Date.now()}.${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });


router.get('/', foodItemsController.getAllFoodItems);
router.post('/search', foodItemsController.searchFoodItems);
router.get('/:food_item_id', foodItemsController.getFoodItemById);
router.post('/',
  upload.single('image'),
  validateFoodItem.create,
  authenticate.user,
  authenticate.admin,
  foodItemsController.createFoodItem);
router.put('/:food_item_id', validateFoodItem.update, authenticate.user, authenticate.admin, foodItemsController.updateFoodItem);
router.delete('/:food_item_id', authenticate.user, authenticate.admin, foodItemsController.deleteFoodItem);

export default router;
