const { GetMBSDetailsService } = require('../services/get-bms-details.service')

const { getMoviesService, getBMSSearchService, getMovieTypeService, getCheckShowOpenedService } = GetMBSDetailsService

/*
 * call other imported services, or same service but different functions here if you need to
*/
const getMoviesList = async (req, res, next) => {
  try {
    var resp = null;
    await getMoviesService().then((movieResp) => {
      resp = movieResp;
    }).catch((err) => {
      resp = err;
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
        res.sendStatus(500)
        break;
    }
    next()
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}


const getBMSSearch = async (req, res, next) => {
  try {
    var resp = null;
    if (req.query?.typeID !== null &&
      req.query?.searchText !== null &&
      (req.query.typeID == 1 || req.query.typeID == 2)) {
      await getBMSSearchService(req.query.typeID, req.query.searchText).then((movieResp) => {
        resp = movieResp;
      }).catch((err) => {
        resp = err;
      })
    }
    else {
      resp = ({
        StatusCode: 200,
        rest: 'Invalid query string'
      })
    }

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
        res.sendStatus(500)
        break;
    }
    next()
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}


const getMovieTypes = async (req, res, next) => {
  try {
    var resp = null;
    if (req?.query?.movieID != null) {
      await getMovieTypeService(req.query.movieID).then((movieTypeResp) => {
        resp = movieTypeResp;
      }).catch((err) => {
        resp = err;
      })
    }
    else {
      resp = ({
        StatusCode: 200,
        rest: 'Invalid query string'
      })
    }

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
        res.sendStatus(500)
        break;
    }
    next()
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}

const getCheckShowOpened = async (req, res, next) => {
  try {
    var resp = null;
    if (req?.query?.pagePath != null) {
      await getCheckShowOpenedService(req.query.pagePath).then((movieTypeResp) => {
        resp = movieTypeResp;
      }).catch((err) => {
        resp = err;
      })
    }
    else {
      resp = ({
        StatusCode: 200,
        rest: 'Invalid query string'
      })
    }

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
        res.sendStatus(500)
        break;
    }
    next()
  } catch (e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}

GetBMSDetailsController = {
  getMoviesList,
  getBMSSearch,
  getMovieTypes,
  getCheckShowOpened
}

module.exports = {
  GetBMSDetailsController
}