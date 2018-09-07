import express from 'express';
import bodyParser from 'body-parser';

import orders from './api/v1/routes/orders';
import foodItems from './api/v1/routes/foodItems';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api/v1/orders', orders);
app.use('/api/v1/foodItems', foodItems);

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 5000, () => {
    console.log('Server started at localhost:5000');
  });
}


export default app;
