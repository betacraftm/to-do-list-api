const express = require('express')
const router = express.Router()
const itemController = require('../controllers/itemController')

router
  .route('/')
  .get(itemController.getAllItems)
  .post(itemController.createItem)
  .put(itemController.updateItem)
  .delete(itemController.deletetItem)

router.route('/delete-all').delete(itemController.deleteAllItem)

module.exports = router
