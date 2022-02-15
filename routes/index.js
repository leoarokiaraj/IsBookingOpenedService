const express = require('express')
const { GetBMSDetailsController } = require('../controllers/get-bms-details.controller')

const router = express.Router()

router.get('/movies', GetBMSDetailsController.getMoviesList)

router.get('/bms-search', GetBMSDetailsController.getBMSSearch)

router.get('/bms-movie-type', GetBMSDetailsController.getMovieTypes)

router.get('/show-opened', GetBMSDetailsController.getCheckShowOpened)


module.exports = router