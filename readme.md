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

### Output

```json
[
  {
    "icao": "PADK",
    "notams": [
      "!ADK 04/002 ADK NAV DME OUT OF SERVICE 1704032100-1704032359\n",
      "!ADK 04/001 ADK SVC AUTOMATED WX BCST SYSTEM OUT OF SERVICE 1704031600-1704032000\n",
      "!ADK 03/004 ADK NAV ILS RWY 23 LOC OUT OF SERVICE 1703170944-1704212359EST\n",
      "!ADK 03/001 ADK NAV NDB OUT OF SERVICE 1503030545-PERM\n",
      "!FDC 6/2510 ADK SPECIAL ADAK, ADAK ISLAND, AK.\nILS OR LOC/DME RWY 23, AMDT 2...\nS-ILS 23 NA. S-LOC 23 MDA 480/HAT 463 ALL CATS.\n1611031724-1706151724EST\n"
    ]
  },
  {
    "icao": "PADU",
    "notams": [
      "!FDC 7/9121 DUT SPECIAL UNALASKA, UNALASKA, AK.\nNDB/DME OR GPS - D, ORIG ...\nNDB/DME OR GPS - C, AMDT 2 ...\nADD FIVE DEGREES TO ALL PUBLISHED HEADINGS, COURSES AND BEARINGS.\n1701301906-1709111905EST\n"
    ]
  }
]
```

## API

### `notams(icaos, options)`
### `notams.fetch(icaos, options)`
### `notams.fetchAllTFR(options)`
### `notams.fetchAllGPS(options)`
### `notams.fetchAllCARF(options)`
### `notams.fetchAllSpecialNotices(options)`

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
