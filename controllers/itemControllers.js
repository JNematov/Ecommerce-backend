const Item = require('../models/itemModel')

const getItems = async (req, res) => {
    const items = await Item.find()
    res.status(200).json(items)
}

const createItem = async (req, res) => {
    const { name, price } = req.body
    const newItem = await Item.create({ name, price })
    res.status(200).json(newItem)
}

const updateItem = async (req, res) => {
    const { name, price } = req.body
    const item = await Item.findByIdAndUpdate(req.params.id, { name, price })
    res.status(200).json(item)

}

const deleteItem = async (req, res) => {
    const target = await Item.findByIdAndDelete(req.params.id)
    res.status(200).json({ mssg: 'target item has been deleted' })
}

module.exports = { getItems, createItem, updateItem, deleteItem }