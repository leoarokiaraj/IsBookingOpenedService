const http = require('http')
const https = require('https')
const url = require('url')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require("axios");

const getMoviesService = async () => {
  try {

    return new Promise((resp, rejp) => {
      axios({
        url: 'https://in.bookmyshow.com/api/explore/v1/discover/movies-chennai?region=CHEN',
        method: 'GET',
        headers: {
          "x-app-code": "WEB",
          "x-bms-id": "1.214180451.1679248115970",
          "x-platform-code": "DESKTOP-WEB",
          "user-agent": 'null'
        },
      }).then(function (res) {
        console.log(res.data)
          console.log(` getMoviesService statusCode: ${res.status}`)
          let moviesData = [];
          let movieJson = res.data
          for (i = 0; i < movieJson.listings.length; i++) {
            if (movieJson.listings[i] != null &&
              moviesData != null && moviesData.length < 10) {
              var cards = movieJson.listings[i].cards
              if (cards != null) {
                for (j = 0; j < cards.length; j++) {
                  var movieObj = new Object()
                  movieObj.title = cards[j]?.analytics?.title
                  movieObj.event_code = cards[j]?.analytics?.event_code
                  movieObj.imageURL = cards[j]?.image?.url

                  moviesData.push(movieObj)
                }
              }
            }
          }
          resp({
            StatusCode: res.status,
            Status: res.statusText,
            data: moviesData
          })
        })
        .catch(function (error) {
          console.log(error);
          rejp({ error })
        });
        

    });

  } catch (e) {
    throw new Error(e.message)
  }
}

const getBMSSearchService = async (typeID, searchText) => {
  try {

    return new Promise((resp, rejp) => {

      axios({
        url: 'https://in.bookmyshow.com/quickbook-search.bms?r=CHEN&sz=15&f=json&t=rzPkrsC0lV&iss=N&q='+searchText,
        method: 'GET',
        headers: {
          "x-app-code": "WEB",
          "x-bms-id": "1.214180451.1679248115970",
          "x-platform-code": "DESKTOP-WEB",
          "user-agent": 'null'
        },
      }).then((res)=>{
        var serachJSON = res.data
        let searchData = []
        for (i = 0; i < serachJSON?.hits?.length; i++) {
          try {
            if (serachJSON?.hits[i] != null) {
              if (typeID == 1 && serachJSON.hits[i]?.TYPE_NAME.toLowerCase() === "movies") {
                var serachObj = new Object()
                serachObj.title = serachJSON.hits[i]?.TITLE
                serachObj.id = serachJSON.hits[i]?.ID
                serachObj.type = serachJSON.hits[i]?.TYPE_NAME
                searchData.push(serachObj)
              }
              else if (typeID == 2 && serachJSON.hits[i]?.TYPE_NAME.toLowerCase() === "venues") {
                var serachObj = new Object()
                serachObj.title = serachJSON.hits[i]?.TITLE
                serachObj.id = serachJSON.hits[i]?.ID
                serachObj.type = serachJSON.hits[i]?.TYPE_NAME
                searchData.push(serachObj)
              }
            }
          } catch (error) {
           console.log(error) 
          }
          
        }
        resp({
          StatusCode: res.status,
          Status: res.statusText,
          searchData
        })

      }).catch((error) => {
        console.error(error)
        rejp({ error })
      });

    });

  } catch (e) {
    throw new Error(e.message)
  }
}

const getMovieTypeService = async (movieID) => {
  try {

    return new Promise((resp, rejp) => {
      var getURL = url.parse(process.env.ENDPOINTURL + "chennai/movies/MovieName/" + movieID, true);
      var protocol = (getURL.protocol == "http") ? http : https;

      const options = {
        path: getURL.pathname,
        host: getURL.hostname,
        port: getURL.port,
        method: 'GET',
        headers: {
          "x-app-code": "WEB",
          "x-bms-id": "1.214180451.1679248115970",
          "x-platform-code": "DESKTOP-WEB",
          "user-agent": 'null'
        },
      }

      const req = protocol.request(options, res => {
        console.log(`getMovieTypeService statusCode: ${res.statusCode}`)

        let data = '';
        var retMovRespData = []

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('close', async () => {

          const virtualConsole = new jsdom.VirtualConsole();
          const dom = new JSDOM(data, { virtualConsole });
          var moviePathTag = dom?.window?.document?.getElementsByTagName('a')
          if (moviePathTag != null && res.statusCode === 302) {
            var moviePath = moviePathTag[0]?.innerHTML
            if (moviePath.charAt(0) === '/')
              moviePath = moviePath.slice(1)
            await getMovieTypes(moviePath).then((movieTypeResp) => {
              retMovRespData = movieTypeResp;
              retMovRespData.moviePath = moviePath
            }).catch((err) => {
              resp = err;
            })
          }
          resp({
            StatusCode: retMovRespData.StatusCode,
            Status: retMovRespData.Status,
            retMovRespData
          })
        });

      })

      req.on('error', error => {
        console.error(error)
        rejp({ error })
      })

      req.end()

    });

  } catch (e) {
    throw new Error(e.message)
  }
}

const getMovieTypes = async (urlPath) => {
  try {

    return new Promise((resp, rejp) => {

      var getURL = url.parse(process.env.ENDPOINTURL + urlPath, true);
      var protocol = (getURL.protocol == "http") ? http : https;

      const options = {
        path: getURL.pathname,
        host: getURL.hostname,
        port: getURL.port,
        method: 'GET',
        headers: {
          "x-app-code": "WEB",
          "x-bms-id": "1.214180451.1679248115970",
          "x-platform-code": "DESKTOP-WEB",
          "user-agent": 'null'
        },
      }

      const req = protocol.request(options, res => {
        console.log(`getMovieTypes statusCode: ${res.statusCode}`)

        let data = ''
        let movieTypeResp = []

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('close', () => {

          const virtualConsole = new jsdom.VirtualConsole();
          const dom = new JSDOM(data, { virtualConsole });

          var html = dom.window.document.getElementsByTagName('html')
          if (html != null) {
            var body = html[0]?.getElementsByTagName('body')
            if (body != null) {
              var scriptTags = body[0]?.getElementsByTagName('script')
              var script = null
              if (scriptTags != null) {

                for (let index = 0; index < scriptTags.length; index++) {
                  const element = scriptTags[index]?.innerHTML;
                  if(element != null && 
                      element.indexOf("window.__INITIAL_STATE__") !== -1)
                  {
                    script = element
                    break;
                  }
                }               
              }
              if (script != null) {
                var jsonScript = script?.replace("window.__INITIAL_STATE__ = ", "");
                if (script != null && IsJsonString(jsonScript) === true) {
                  var jsonData = JSON.parse(jsonScript)
                  pageCta = jsonData?.synopsisStore?.synopsisRender?.bannerWidget?.pageCta
                  if (pageCta != null) {
                    var movieMeta = pageCta[0]?.meta
                    if (movieMeta != null) {
                      if (movieMeta?.options != null) {
                        for (i = 0; i < movieMeta?.options?.length; i++) {
                          var formats = movieMeta.options[i].formats
                          if (formats != null) {
                            for (j = 0; j < formats.length; j++) {
                              var movieTypObj = new Object()
                              movieTypObj.lang = movieMeta.options[i].language
                              movieTypObj.dimension = formats[j]?.dimension
                              movieTypObj.eventCode = formats[j]?.eventCode
                              movieTypeResp.push(movieTypObj)
                            }
                          }
                        }
                      }
                    }
                  }

                }
                resp({
                  StatusCode: res.statusCode,
                  Status: res.statusMessage,
                  movieTypeResp
                })
              }
            }
          }

        });

      })

      req.on('error', error => {
        console.error(error)
        rejp({ error })
      })

      req.end()

    });

  } catch (e) {
    throw new Error(e.message)
  }
}


const getCheckShowOpenedService = async (pagePath) => {
  try {

    var getURL = url.parse(process.env.ENDPOINTURL + "buytickets/" + pagePath, true);
    var protocol = (getURL.protocol == "http") ? http : https;

    const options = {
      path: getURL.pathname,
      host: getURL.hostname,
      port: getURL.port,
      method: 'GET'
    }

    return new Promise((resp, rejp) => {

      const req = protocol.request(options, res => {
        console.log(`getCheckShowOpenedService statusCode: ${res.statusCode}`)

        let data = '';
        let showDetails = []


        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('close', () => {

          if (res.statusCode == 200)
          {
            const virtualConsole = new jsdom.VirtualConsole();
            const dom = new JSDOM(data, { virtualConsole });
  
            var venueList = dom.window.document.getElementById('venuelist')
            for (let index = 0; index < venueList?.childElementCount; index++) {
              var venue = venueList?.children[index];
              var data_id = venue?.getAttribute('data-id');
  
              if (data_id != null && data_id != "") {
                let showDetailObj = Object()
                showDetailObj.data_id = data_id
                showDetailObj.data_date_time = []
  
                var showTimes = venue?.getElementsByClassName('showtime-pill-wrapper')[0]
  
                for (let j = 0; j < showTimes?.childElementCount; j++) {
                  showDetailObj.data_date_time.push(showTimes?.children[j]?.getElementsByTagName("a")[0]?.getAttribute("data-date-time"))
                }
  
                showDetails.push(showDetailObj)
  
              }
  
            }
          }
          resp({
            StatusCode: res.statusCode,
            Status: res.statusMessage,
            showDetails
          })
        });

      })

      req.on('error', error => {
        console.error(error)
        rejp({ error })
      })

      req.end()

    });

  } catch (e) {
    throw new Error(e.message)
  }
}



function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}


GetMBSDetailsService = {
  getMoviesService,
  getBMSSearchService,
  getMovieTypeService,
  getCheckShowOpenedService
}

module.exports = {
  GetMBSDetailsService
}