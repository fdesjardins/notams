# notams

[![Build Status][travis-image]][travis-url]
[![NPM Version][npm-image]][npm-url]
[![Coverage][coveralls-image]][coveralls-url]

Fetch NOTAMs (Notices to Airmen) using Node.js

## Installation

```
$ npm install --save notams
```

## Usage

```js
notams(['PADK', 'PADU'], { format: 'DOMESTIC' }).then(results => {
  console.log(results)
})
```

## API

### `notams(icaos, options)`
### `notams.fetch(icaos, options)`
### `notams.fetchAllTFR(icaos, options)`
### `notams.fetchAllGPS(icaos, options)`
### `notams.fetchAllCARF(icaos, options)`
### `notams.fetchAllSpecialNotices(icaos, options)`

#### `icaos`

Type: `string` or `array`

One of the following:
- a single ICAO code
- a comma-separated list of ICAO codes
- an array of ICAO codes

#### `options`

Type: `object`

##### `format`

Type: `string`

Valid values:
- `DOMESTIC`
- `ICAO`

## License

MIT © [Forrest Desjardins](https://github.com/fdesjardins)

[npm-url]: https://www.npmjs.com/package/notams
[npm-image]: https://img.shields.io/npm/v/notams.svg?style=flat
[travis-url]: https://travis-ci.org/fdesjardins/notams
[travis-image]: https://img.shields.io/travis/fdesjardins/notams.svg?style=flat
[coveralls-url]: https://coveralls.io/r/fdesjardins/notams
[coveralls-image]: https://img.shields.io/coveralls/fdesjardins/notams.svg?style=flat
