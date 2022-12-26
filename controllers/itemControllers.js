const Item = require("../models/itemModel");

const getAllItems = async (req, res) => {
  var items = await Item.find();
  items = items.filter((item) => item.user_id == undefined);
  res.status(200).json(items);
};

const getItems = async (req, res) => {
  const user_id = req.user._id;
  const items = await Item.find({ user_id }); //filters by user id
  console.log("getItems");
  if (!items) {
    console.log("error finding user's items");
  }
  res.status(200).json(items);
};

const createItem = async (req, res) => {
  const { name, price, image, count } = req.body;
  var newItem;
  if (req.user) {
    newItem = await Item.create({
      name,
      price,
      user_id: req.user._id,
      image,
      count,
    });
  } else {
    newItem = await Item.create({ name, price, image });
  }
  console.log(newItem);
  res.status(200).json(newItem);
};

const updateItem = async (req, res) => {
  const user_id = req.user._id;
  const { name, price, image, count } = req.body;
  const usersItems = await Item.find({ user_id });
  const target = usersItems.filter(
    (item) => item._id.toString() === req.params.id
  )[0];
  const item = await Item.findByIdAndUpdate(target._id, {
    name,
    price,
    image,
    count,
  });
  console.log(item);
  res.status(200).json(item);
};

//todo create updateCartItem

const deleteItem = async (req, res) => {
  const target = await Item.findByIdAndDelete(req.params.id);
  if (!target) {
    console.log(target);
  }
  res.status(200).json({ mssg: "target item has been deleted" });
};

module.exports = { getItems, createItem, updateItem, deleteItem, getAllItems };
