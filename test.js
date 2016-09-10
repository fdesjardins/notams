/* global describe, it */

const notams = require('./index')

describe('notams', () => {
  it('should accept a single ICAO', (done) => {
    notams('KFDC').then(() => done())
  })

  it('should accept a comma separated list of ICAOs', (done) => {
    notams(['KFDC,KZBW']).then(() => done())
  })

  it('should accept an array of ICAOs', (done) => {
    notams(['KFDC', 'KZBW']).then(() => done())
  })

  it('should fetch TFRs', (done) => {
    notams.fetchAllTFR().then(() => done())
  })

  it('should fetch GPS NOTAMs', (done) => {
    notams.fetchAllGPS().then(() => done())
  })

  it('should fetch CARF NOTAMs', (done) => {
    notams.fetchAllCARF().then(() => done())
  })

  it('should fetch Special Notices', (done) => {
    notams.fetchAllSpecialNotices().then(() => done())
  })
})
