const express = require("express");
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemControllers");
const requireAuth = require("../middleware/requireAuth");

const cartRouter = express.Router();
cartRouter.use(requireAuth);
cartRouter.route("/").get(getItems).post(createItem);

//protects routes from unauthenticated users
cartRouter.route("/:id").delete(deleteItem).put(updateItem);

module.exports = cartRouter;
