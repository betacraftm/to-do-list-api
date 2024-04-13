const Item = require('../models/item')
const StatusCodes = require('http-status-codes')

const getAllItems = async (req, res) => {
  const items = await Item.find()
  if (!items) return res.status(StatusCodes.NO_CONTENT)
  res.json(items)
}

const createItem = async (req, res) => {
  if (!req?.body?.content) return res.status(400)

  try {
    const result = await Item.create({
      body: req.body.content,
    })
    res.status(201).json(result)
  } catch (err) {
    console.error(err)
  }
}

const updateItem = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'ID are required' })
  }

  const item = await Item.findOne({ _id: req.body.id }).exec()
  if (!item) return res.status(204)
  if (req?.body?.content) item.body = req.body.content

  const result = await item.save()
  res.json(result)
}

const deletetItem = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: 'ID are required' })
  }
  const item = await Item.findOne({ _id: req.body.id }).exec()
  if (!item) return res.status(204)
  const result = await item.deleteOne({ _id: req.body.id }).exec()
  res.json(result)
}

const deleteAllItem = async (req, res) => {
  const result = await Item.deleteMany().exec()
  res.json(result)
}

module.exports = {
  getAllItems,
  createItem,
  updateItem,
  deletetItem,
  deleteAllItem,
}
