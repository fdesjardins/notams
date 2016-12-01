const notams = require('./')

notams.fetch('KRAP').then(results => {
  console.log(JSON.stringify(results, null, 2))
})
