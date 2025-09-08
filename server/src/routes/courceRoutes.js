const express = require('express')
const {getCource} = require('../controllers/courceController')
const courceRouter = express.Router()

courceRouter.get('/getCource',getCource);

module.exports = courceRouter;