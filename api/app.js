import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// routes
import orders from './v1/routes/orders';
import users from './v1/routes/users';
import auth from './v1/routes/auth';
import categories from './v1/routes/categories';
import foodItems from './v1/routes/foodItems';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/v1/auth', auth);

app.use('/api/v1/orders', orders);
app.use('/api/v1/users', users);
app.use('/api/v1/categories', categories);
app.use('/api/v1/menu', foodItems);

app.use('/*', (req, res) => {
  res.status(404).json({ message: 'Page Not Found. Please go to /api/v1/orders to use our api' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 5000, () => console.log('Server started at localhost:5000'));
}


export default app;
