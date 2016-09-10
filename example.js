const notams = require('./')

notams(['PADK', 'PADU'], { format: 'DOMESTIC' }).then(results => {
  console.log(results)
})
