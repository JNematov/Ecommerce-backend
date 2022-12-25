const Item = require("../models/itemModel");

const getAllItems = async (req, res) => {
  var items = await Item.find();
  items = items.filter((item) => item.user_id == undefined);
  console.log(items);
  res.status(200).json(items);
};

const getItems = async (req, res) => {
  const items = await Item.find({ user_id: req.user._id }); //filters by user id
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
  res.status(200).json(newItem);
};

const updateItem = async (req, res) => {
  const { name, price, image, count } = req.body;
  const item = await Item.findByIdAndUpdate(req.params.id, {
    name,
    price,
    image,
    count,
  });
  res.status(200).json(item);
};

const deleteItem = async (req, res) => {
  const target = await Item.findByIdAndDelete(req.params.id);
  if (!target) {
    console.log(target);
  }
  res.status(200).json({ mssg: "target item has been deleted" });
};

module.exports = { getItems, createItem, updateItem, deleteItem, getAllItems };
