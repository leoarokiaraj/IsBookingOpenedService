const express = require('express')
const { GetBMSDetailsController } = require('../controllers/get-bms-details.controller')
const { TriggerController } = require('../controllers/triggers.controller')


const router = express.Router()

router.get('/movies', GetBMSDetailsController.getMoviesList)

router.get('/bms-search', GetBMSDetailsController.getBMSSearch)

router.get('/bms-movie-type', GetBMSDetailsController.getMovieTypes)

router.get('/show-opened', GetBMSDetailsController.getCheckShowOpened)

router.post('/postdata', TriggerController.addUpdateTriggerController)

router.get('/get-triggers', TriggerController.getAllTriggersController)

router.delete('/delete-triggers/:triggerId', TriggerController.deleteTriggerController)


module.exports = router