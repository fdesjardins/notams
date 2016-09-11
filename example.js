const notams = require('./')

notams.fetchAllTFR({ format: 'ICAO' }).then(results => {
  console.log(JSON.stringify(results, null, 2))
})
