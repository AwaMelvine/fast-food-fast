export const firstUser = {
  role: 'admin',
  username: 'JohnFirst',
  email: 'john.first@example.com',
  password: 'john123',
  passwordConf: 'john123',
};

export const secondUser = {
  username: 'SmithSecond',
  email: 'smith.second@example.com',
  password: 'smith123',
  passwordConf: 'smith123',
};

export const thirdUser = {
  username: 'JaneThird',
  email: 'jane.third@example.com',
  password: 'jane123',
  passwordConf: 'jane123',
};


export const correctCredentials = {
  email: 'john.first@example.com',
  password: 'john123',
};

export const wrongCredentials = {
  email: 'wrong.email@example.com',
  password: 'john123',
};

export const modifiedSecondUser = {
  role: 'user',
  username: 'SmithSecondII',
  email: 'smith.second@example.com',
  password: 'smith123',
  passwordOld: 'smith123',
  passwordConf: 'smith123',
};

export const failPassOldUser = { ...modifiedSecondUser, passwordOld: `${modifiedSecondUser.passwordOld}mutilate` };

export const failConfPassUser = { ...modifiedSecondUser, passwordConf: `${modifiedSecondUser.passwordConf}mutilate` };

export const invalidUser = {
  username: 'Snowball',
  email: 'test',
  password: 'mypass1',
  passwordConf: 'mypass1',
};

export const created_at = '03-09-2018';

export const firstUserId = 1;

export const secondUserId = 2;

export const invalidUserId = 'a';

export const notFoundUserId = 8888;


export const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZXhwIjoxNTQxMjU1MjE0LCJpYXQiOjE1Mzg2NjMyMTR9.8hEyI6RqQkY6KkSFJjmYQBvvtV-T6U8kIc9pcn6YI_A';
export const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNTQyNjQ1MzA2LCJpYXQiOjE1NDAwNTMzMDZ9.vZ8Z_DVXDyOBhKWMuoL7HMHwLmdMBY5_pVQiZYKNlhk';
export const inValidToken = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNTQxMjUxOTM1LCJpYXQiOjE1Mzg2NTk5MzV9.MVOHv_qFPuS9lbt4gxK4t5DU6j71vGdAloo85TAHNj4';
