const cheerio = require('cheerio')
const superagent = require('superagent')

const PILOTWEB_BASE_URL = 'https://pilotweb.nas.faa.gov/PilotWeb'

/**
 *  A shortcut to the fetch() method
 */
const notams = (module.exports = (icaos, options = {}) => {
  return notams.fetch(icaos, options)
})

/**
 * Main fetching method; accepts one or more ICAO codes
 */
notams.fetch = async (icaos, options = {}) => {
  const formatType = options.format || 'ICAO'

  if (Array.isArray(icaos)) {
    icaos = icaos.join(',')
  }

  const response = await superagent
    .get(`${PILOTWEB_BASE_URL}/notamRetrievalByICAOAction.do`)
    .query({
      reportType: 'RAW',
      method: 'displayByICAOs',
      actionType: 'notamRetrievalByICAOs',
      retrieveLocId: icaos,
      formatType
    })
  return parse(response.text)
}

/**
 * Fetch all NOTAMs of a specific type. Type can be one of:
 *   - ALLTFR
 *   - ALLGPS
 *   - ALLCARF
 *   - ALLSPECIALNOTICES
 */
notams.fetchAllByType = (type, format = 'ICAO') => fetchAll(type, format)

/**
 *  Fetch all NOTAMs
 */
notams.fetchAll = async (options = {}) => {
  const [ tfrs, gps, carfs, specialNotices ] = [
    await notams.fetchAllByType('ALLTFR', options.format),
    await notams.fetchAllByType('ALLGPS', options.format),
    await notams.fetchAllByType('ALLCARF', options.format),
    await notams.fetchAllByType('ALLSPECIALNOTICES', options.format)
  ]
  // Reconstruct/flatten the entire listing
  const index = {}
  ;[ tfrs, gps, carfs, specialNotices ].map(notams => {
    notams.map(notam => {
      if (index[notam.icao] === undefined) {
        index[notam.icao] = []
      }
      index[notam.icao].push(...notam.notams)
    })
  })
  // Reformat the output
  return Object.keys(index).map(icao => {
    return {
      icao: icao,
      notams: index[icao]
    }
  })
}

/**
 * Helper method for the above fetchAll method
 */
const fetchAll = async (queryType, formatType) => {
  const response = await superagent
    .get(`${PILOTWEB_BASE_URL}/noticesAction.do`)
    .query({
      reportType: 'RAW',
      queryType,
      formatType
    })

  const parsed = parse(response.text)

  return parsed.map(r => ({
    icao: r.icao,
    notams: r.notams.map(n => {
      return {
        text: n,
        type: {
          ALLTFR: 'TFR',
          ALLGPS: 'GPS',
          ALLCARF: 'CARF',
          ALLSPECIALNOTICES: 'Special Notice'
        }[queryType]
      }
    })
  }))
}

/**
 * Extract the NOTAM text from the given page element
 */
const extractNotams = $el => {
  const icao = $el.find('a').attr('name')
  let $next = $el.parent().next()

  const notams = []
  while (true) {
    const titleText = $next.find('#resultsTitleLeft').html()
    const summaryText = $next.find('#alertFont').html()
    // 1. Stop if we hit the next ICAO section
    // 2. Stop at the end of the reports
    if (titleText !== null || summaryText !== null) {
      break
    }
    // Extract the current NOTAM text
    const notamText = $next.find('pre').text()
    if (notamText !== '') {
      notams.push(notamText)
    }
    $next = $next.next()
  }
  return {
    icao,
    notams: notams
  }
}

/**
 *  Parse the response HTML into JSON
 */
const parse = html => {
  const $ = cheerio.load(html)
  const $resultsElements = $('div[id="resultsHomeLeft"]').find(
    '#resultsTitleLeft'
  )

  if (!$resultsElements) {
    console.error('Unable to parse the #resultsTitleLeft page element')
    return null
  }

  const results = $resultsElements.toArray().map(el => extractNotams($(el)))

  if (results.length > 0) {
    return results
  }
}
