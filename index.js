const Promise = require('bluebird')
const request = Promise.promisify(require('request'))
const cheerio = require('cheerio')

// Provide a shortcut to the fetch method
const notams = module.exports = (icaos, options = {}) => {
  return notams.fetch(icaos, options)
}

// Main fetching method; accepts one or more ICAO codes
notams.fetch = (icaos, options) => {
  const formatType = options.format || 'ICAO'

  if (Array.isArray(icaos)) {
    icaos = icaos.join(',')
  }

  return request(`https://pilotweb.nas.faa.gov/PilotWeb/notamRetrievalByICAOAction.do?method=displayByICAOs&reportType=RAW&formatType=${formatType}&retrieveLocId=${icaos}&actionType=notamRetrievalByICAOs`)
    .then(res => parse(res.body))
}

// Fetch all TFRs (Temporary Flight Restrictions)
notams.fetchAllTFR = (options = {}) => {
  const formatType = options.format || 'ICAO'
  return fetchAll('ALLTFR', formatType)
}
// Fetch all GPS (Global Position System) NOTAMs
notams.fetchAllGPS = (options = {}) => {
  const formatType = options.format || 'ICAO'
  return fetchAll('ALLGPS', formatType)
}
// Fetch all CARF (Central Altitude Reservation Function) NOTAMs
notams.fetchAllCARF = (options = {}) => {
  const formatType = options.format || 'ICAO'
  return fetchAll('ALLCARF', formatType)
}
// Fetch all Special Notice NOTAMs
notams.fetchAllSpecialNotices = (options = {}) => {
  const formatType = options.format || 'ICAO'
  return fetchAll('ALLSPECIALNOTICES', formatType)
}

// Helper method for the above fetchAll methods
const fetchAll = (queryType, formatType) => {
  return request(`https://pilotweb.nas.faa.gov/PilotWeb/noticesAction.do?queryType=${queryType}&reportType=RAW&formatType=${formatType}`)
    .then(res => parse(res.body))
    .then(results => results.map(r => {
      return {
        icao: r.icao,
        notams: r.notams.map(n => {
          return {
            text: n,
            type: {
              'ALLTFR': 'TFR',
              'ALLGPS': 'GPS',
              'ALLCARF': 'CARF',
              'ALLSPECIALNOTICES': 'Special Notice'
            }[queryType]
          }
        })
      }
    }))
}

// Parse the response HTML from https://pilotweb.nas.faa.gov
const parse = (html) => {
  const $ = cheerio.load(html)
  return $('div[id="resultsHomeLeft"]')
    .find('#resultsTitleLeft')
    .toArray()
    .map(el => {
      const title = $(el).find('a').attr('name')
      const notams = []

      let $next = $(el).parent().next()
      while (true) {
        // stop if we hit the next ICAO section
        const titleText = $next.find('#resultsTitleLeft').html()
        if (titleText !== null) {
          break
        }
        // stop at the end of the reports
        const summaryText = $next.find('#alertFont').html()
        if (summaryText !== null) {
          break
        }
        // extract the current NOTAM text
        const notamText = $next.find('pre').text()
        if (notamText !== '') {
          notams.push(notamText)
        }
        $next = $next.next()
      }
      return {
        icao: title,
        notams: notams
      }
    })
}
