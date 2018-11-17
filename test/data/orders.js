export const firstOrder = {
  customer_id: 1,
  item_id: 1,
  quantity: 2,
  total_price: 4000,
  date_to_deliver: '04-09-2018',
  status: 'PROCESSING',
};

export const secondOrder = {
  customer_id: 1,
  total_price: 8000,
  status: 'PROCESSING',
};

export const firstOrderId = 1;

export const secondOrderId = 2;

export const modifiedStatus = 'DECLINED';

export const invalidStatus = null;

export const created_at = '03-09-2018';

export const invalidOrderId = 'a';

export const cart = [
  {
    item: {
      id: 1,
      name: 'Vegetable',
      image: 'http://via.placeholder.com/170x170',
      description: 'Good',
      quantity: 4,
      unit_price: 500,
      created_at: '2018-11-13T06:42:35.954Z',
      updated_at: null,
    },
    quantity: 1,
  },
];
