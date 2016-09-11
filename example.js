const notams = require('./')

notams.fetchAll().then(results => {
  console.log(JSON.stringify(results, null, 2))
})
