const express = require("express");
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  getAllItems,
} = require("../controllers/itemControllers");

const itemRouter = express.Router();

itemRouter.route("/").get(getAllItems).post(createItem);

//protects routes from unauthenticated users
// itemRouter.use(requireAuth);
// itemRouter.route("/cart").get(getItems).post(createItem);
// itemRouter.route("/cart/:id").delete(deleteItem).put(updateItem);

module.exports = itemRouter;
