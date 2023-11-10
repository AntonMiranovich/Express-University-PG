const express = require("express");
const {
  getAllData,
  getDataById,
  postData,
  updateData,
  deleteData,
} = require("../service/user.service");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await getAllData();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getDataById(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { birth, city, age, name, surname } = req.body;
    const data = await postData(birth, city, age, name, surname);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { birth, city, age, name, surname } = req.body;
    const data = await updateData(id, birth, city, age, name, surname);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteData(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
