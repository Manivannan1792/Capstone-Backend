import express from "express";
import {
  getAllDress,
  getDressById,
  createDress,
  deleteDressById,
  updateDressById,
} from "./helper.js";

const router = express.Router();

router.get("/",async function (req, res) {
  await getAllDress(res);
});

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  await getDressById(id, res);
});

router.post("/", async function (req, res) {
  const data = req.body;
  await createDress(data, res);
});

router.delete("/:id", async function (req, res) {
  const { id } = req.params;

  await deleteDressById(id, res);
});

router.put("/:id", async function (req, res) {
  const data = req.body;
  const { id } = req.params;
  await updateDressById(id, data, res);
});

export const dressRouter = router;
