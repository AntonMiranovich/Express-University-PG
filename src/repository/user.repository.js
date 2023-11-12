const pool = require('../db');

async function getAllDataDB() {
  const client = await pool.connect();
  const sql = `select * from users_info
    join users
    on users_info.id = users.info_id`;

  const result = (await client.query(sql)).rows;
  return result;
}

async function getDataByIdDB(id) {
  const client = await pool.connect();
  const sql = `select * from users_info
      join users
      on users_info.id = users.info_id
      where users.id=$1`;

  const result = (await client.query(sql, [id])).rows;
  return result;
}

async function postDataDB(birth, city, age, name, surname) {
  const client = await pool.connect();
  const sql1 = `insert into users_info(birth,city,age) 
    values ($1,$2,$3) returning *`;
  const data1 = (await client.query(sql1, [birth, city, age])).rows;

  const sql2 = `insert into users(name, surname, info_id) 
    values ($1,$2,$3) returning *`;
  const data2 = (await client.query(sql2, [name, surname, data1[0].id])).rows;

  return { ...data1[0], ...data2[0] };
}

async function updateDataDB(id, birth, city, age, name, surname) {
  const client = await pool.connect();
  const sql1 = 'update users_info set birth=$1,city=$2,age=$3 where users_info.id=$4 returning *';
  const data1 = (await client.query(sql1, [birth, city, age, id])).rows;

  const sql2 = 'update users set name=$1,surname=$2 where info_id=$3 returning *';
  const data2 = (await client.query(sql2, [name, surname, id])).rows;

  return { ...data1[0], ...data2[0] };
}

async function deleteDataDB(id) {
  const client = await pool.connect();
  const sql2 = 'delete from users where id=$1 returning *';
  const data2 = (await client.query(sql2, [id])).rows;

  const sql1 = 'delete from users_info where id=$1 returning *';
  const data1 = (await client.query(sql1, [id])).rows;

  return { ...data1[0], ...data2[0] };
}

async function patchDataDB(id, clientObj) {
  const client = await pool.connect();
  const sql = `select * from users_info
      join users
      on users_info.id = users.info_id
      where users.id=$1`;
  const oldObj = (await client.query(sql, [id])).rows;

  const newObj = { ...oldObj[0], ...clientObj };

  const sql1 = 'update users_info set birth=$1,city=$2,age=$3 where users_info.id=$4 returning *';
  const data1 = (await client.query(sql1, [newObj.birth, newObj.city, newObj.age, id])).rows;

  const sql2 = 'update users set name=$1,surname=$2 where info_id=$3 returning *';
  const data2 = (await client.query(sql2, [newObj.name, newObj.surname, id])).rows;

  return { ...data1[0], ...data2[0] };
}

module.exports = {
  getAllDataDB,
  getDataByIdDB,
  postDataDB,
  updateDataDB,
  deleteDataDB,
  patchDataDB,
};
