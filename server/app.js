import express from 'express';
import bodyParser from 'body-parser';

import orders from './api/v1/routes/orders';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api/v1/orders', orders);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server started at localhost:5000');
});

export default app;
