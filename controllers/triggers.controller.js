const { TriggerService } = require('../services/triggers.service')
const { getAllTriggersService, addUpdateTriggersService, deleteTriggersService } = TriggerService


const getAllTriggersController = async (req, res, next) => {
    try {
      var resp = null;
      await getAllTriggersService().then((triggerResp) => {
        resp = triggerResp;
      }).catch((err) => {
        console.log(err)
        resp = err.error.message;
      })

      switch (true) {
        case (resp.StatusCode === 200):
          res.status(200).send(resp)
          break;
        case (300 <= resp.StatusCode && 399 >= resp.StatusCode):
          res.status(resp.StatusCode).send(resp)
          break;
        case (resp.StatusCode === 503):
          res.status(503).send(resp)
          break;
        default:
          res.status(500).send(resp)
          break;
      }
      
      next()
    } catch (e) {
      console.log(e.message)
      res.sendStatus(500) && next(error)
    }
}


const addUpdateTriggerController = async (req, res, next) => {
  try {
    var resp = null;
      await addUpdateTriggersService(req.body).then((triggerResp) => {
        resp = triggerResp;
      }).catch((err) => {
        console.log(err)
        resp = err.error.message;
      })

    switch (true) {
      case (resp.StatusCode === 200):
        res.status(200).send(resp)
        break;
      case (300 <= resp.StatusCode && 399 >= resp.StatusCode):
        res.status(resp.StatusCode).send(resp)
        break;
      case (resp.StatusCode === 503):
        res.status(503).send(resp)
        break;
      default:
        res.status(500).send(resp)
        break;
    }
    next()
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}


const deleteTriggerController = async (req, res, next) => {
  try {
    var resp = null;
      await deleteTriggersService(req.params.triggerId).then((triggerResp) => {
        resp = triggerResp;
      }).catch((err) => {
        console.log(err)
        resp = err.error.message;
      })

    switch (true) {
      case (resp.StatusCode === 200):
        res.status(200).send(resp)
        break;
      case (300 <= resp.StatusCode && 399 >= resp.StatusCode):
        res.status(resp.StatusCode).send(resp)
        break;
      case (resp.StatusCode === 503):
        res.status(503).send(resp)
        break;
      default:
        res.status(500).send(resp)
        break;
    }
    next()
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}

TriggerController= {
    getAllTriggersController,
    addUpdateTriggerController,
    deleteTriggerController
}

module.exports = {
    TriggerController
  }