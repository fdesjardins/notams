/* global describe, it */

const assert = require('assert')
const notams = require('./index')

describe('notams', () => {
  it('should fetch NOTAMs for a single ICAO', async () => {
    const res = await notams('KFDC')
    assert(res.length === 1)
  })

  it('should fetch NOTAMs for a comma separated list of ICAOs', async () => {
    const res = await notams([ 'KFDC,KZBW' ])
    assert(res.length === 2)
  })

  it('should fetch NOTAMs for an array of ICAOs', async () => {
    const res = await notams([ 'KFDC', 'KZBW' ])
    assert(res.length === 2)
  })

  it('should expose the fetch method', async () => {
    const res = await notams.fetch('KFDC')
    assert(res.length === 1)
  })

  it('should fetch NOTAMs by type', async () => {
    const res = await notams.fetchAllByType('ALLTFR')
    assert(res.length > 0)
  })

  it('should fetch all NOTAMs', async () => {
    const res = await notams.fetchAll('KFDC')
    assert(res.length > 2)
  })
})
