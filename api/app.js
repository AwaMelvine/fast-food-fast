import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import router from './v1/routes';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  const body = {};
  Object.keys(req.body).forEach((key) => {
    const element = req.body[key];
    if (typeof element === 'string') {
      body[key] = element.trim();
    } else {
      body[key] = element;
    }
  });
  req.body = body;
  return next();
});

app.use('/', router);

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 5000, () => console.log('Server started at localhost:5000'));
}

export default app;
