const express = require('express')
const { getItems, createItem, updateItem, deleteItem } = require('../controllers/itemControllers')

const itemRouter = express.Router()

itemRouter.route('').get(getItems).post(createItem)
itemRouter.route('/:id').put(updateItem).delete(deleteItem)

module.exports = itemRouter