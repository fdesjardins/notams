/* global describe, it */

const notams = require('./index')

describe('notams', () => {
  it('should fetch NOTAMs for a single ICAO', done => {
    notams('KFDC').then(() => done())
  })

  it('should fetch NOTAMs for a comma separated list of ICAOs', done => {
    notams([ 'KFDC,KZBW' ]).then(() => done())
  })

  it('should fetch NOTAMs for an array of ICAOs', done => {
    notams([ 'KFDC', 'KZBW' ]).then(() => done())
  })

  it('should expose the fetch method', done => {
    notams.fetch('KFDC').then(() => done())
  })

  it('should fetch TFRs', done => {
    notams.fetchAllTFR().then(() => done())
  })

  it('should fetch GPS NOTAMs', done => {
    notams.fetchAllGPS().then(() => done())
  })

  it('should fetch CARF NOTAMs', done => {
    notams.fetchAllCARF().then(() => done())
  })

  it('should fetch Special Notices', done => {
    notams.fetchAllSpecialNotices().then(() => done())
  })

  it('should fetch all NOTAMs', done => {
    notams.fetchAll().then(() => done())
  })
})
