export const firstUser = {
  role: 'user',
  username: 'John First',
  email: 'john.first@example.com',
  password: 'john',
  passwordConf: 'john',
};

export const secondUser = {
  role: 'user',
  username: 'Smith Second',
  email: 'smith.second@example.com',
  password: 'smith',
  passwordConf: 'smith',
};

export const thirdUser = {
  username: 'Jane Third',
  email: 'jane.third@example.com',
  password: 'jane',
  passwordConf: 'jane',
};


export const correctCredentials = {
  email: 'john.first@example.com',
  password: 'john',
};

export const wrongCredentials = {
  email: 'wrong.email@example.com',
  password: 'john',
};

export const modifiedSecondUser = {
  role: 'user',
  username: 'Smith Second II',
  email: 'smith.second@example.com',
  password: 'smith',
  passwordOld: 'smith',
  passwordConf: 'smith',
};

export const failPassOldUser = { ...modifiedSecondUser, passwordOld: `${modifiedSecondUser.passwordOld}mutilate` };

export const failConfPassUser = { ...modifiedSecondUser, passwordConf: `${modifiedSecondUser.passwordConf}mutilate` };

export const invalidUser = {
  name: 'Snowball',
};

export const created_at = '03-09-2018';

export const firstUserId = 1;

export const secondUserId = 2;

export const invalidUserId = 'a';

export const notFoundUserId = 8888;


export const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBd2EiLCJlbWFpbCI6Im1lbHZpbmVhd2FAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJleHAiOjE1Mzg2Mjg3ODAsImlhdCI6MTUzODU0MjM4MH0.W6OL_pOki6yLegoN7-ksOWYQ36oc9T4iNrT8Z_LtZZo';
export const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJBd2FNZWx2aW5lIiwiZW1haWwiOiJtZWx2aW5lYXdhMUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJleHAiOjE1Mzg2MjkxMDYsImlhdCI6MTUzODU0MjcwNn0.iF5lCsXpGCto6oQjAawnsLhAxhqFh3A3KMeLsUgw-NU';
export const inValidToken = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBd2EiLCJlbWFpbCI6ImF3YW1lbHZpbkBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImV4cCI6MTUzODI0OTg1OSwiaWF0IjoxNTM4MTYzNDU5fQ.V3tFfAq8AhdgJ3K4BXKRVrNunmQmRgLIg2EZa0NDf5c';
