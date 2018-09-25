import express from 'express';
import bodyParser from 'body-parser';

import orders from './v1/routes/orders';
import categories from './v1/routes/categories';
import foodItems from './v1/routes/foodItems';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api/v1/orders', orders);
app.use('/api/v1/categories', categories);
app.use('/api/v1/foodItems', foodItems);

app.use('/*', (req, res) => {
  res.status(404).json({ message: 'Page Not Found. Please go to /api/v1/orders to use our api' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 5000, () => console.log('Server started at localhost:5000'));
}


export default app;
