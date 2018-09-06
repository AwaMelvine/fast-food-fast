const allOrders = [];

export const getAllOrders = (req, res) => {
  res.status(200).json(allOrders);
};
