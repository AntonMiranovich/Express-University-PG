const { getAllDataDB, getDataByIdDB, postDataDB, updateDataDB, deleteDataDB,patchDataDB } = require('../repository/user.repository');

async function getAllData() {
  const data = await getAllDataDB();
  return data;
}

async function getDataById(id) {
  const data = await getDataByIdDB(id);
  return data;
}

async function postData(birth, city, age, name, surname) {
  const data = await postDataDB(birth, city, age, name, surname);
  return data;
}

async function updateData(id, birth, city, age, name, surname) {
  const data = await updateDataDB(id, birth, city, age, name, surname);
  return data;
}

async function deleteData(id) {
  const data = deleteDataDB(id);
  return data;
}

async function patchData(id, clientObj) {
  const data = await patchDataDB(id, clientObj);
  return data;
}

module.exports = { getAllData, getDataById, postData, updateData, deleteData, patchData };
