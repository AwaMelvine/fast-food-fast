import express from 'express';

const router = express.Router();

const allOrders = [];

router.get('/', (req, res) => {
  res.status(200).json(allOrders);
});
