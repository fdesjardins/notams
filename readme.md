# notams

Fetch NOTAMs (Notices to Airmen) from https://pilotweb.nas.faa.gov using Node.js

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage][coveralls-image]][coveralls-url]
[![Maintainability][code-climate-image]][code-climate-url]

## Installation

```
$ npm install --save notams
```

## Usage

```js
notams.fetch([ 'PADK', 'PADU' ], { format: 'DOMESTIC' }).then(results => {
  console.log(JSON.stringify(results, null, 2))
})
```

### Output

```json
[
  {
    "icao": "PADK",
    "notams": [
      "!ADK 04/008 ADK NAV DME NOT MNT 1904170731-1905081400EST\n",
      "!ADK 04/007 ADK NAV NDB NOT MNT 1904130039-1905101500EST\n",
      "!FDC 9/2641 ADK SPECIAL ADAK, Adak Island, AK.\nILS OR LOC/DME RWY 23, AMDT 2...\nS-ILS DA NA.\n1901091550-2101091548EST\n"
    ]
  },
  {
    "icao": "PADU",
    "notams": [
      "!DUT 05/018 DUT TWY ALL FICON WET OBS AT 1905051946. 1905051946-1905061946\n",
      "!DUT 05/017 DUT APRON ALL FICON WET OBS AT 1905051946. 1905051946-1905061946\n",
      "!DUT 05/016 DUT RWY 31 FICON 5/5/5 100 PCT WET OBS AT 1905051945. 1905051945-1905061945\n",
      "!DUT 05/015 DUT RWY 13 FICON 5/5/5 100 PCT WET OBS AT 1905051945. 1905051945-1905061945\n",
      "!DUT 04/123 DUT SVC AUTOMATED WX BCST SYSTEM OUT OF SERVICE 1904251718-1905111500EST\n"
    ]
  }
]
```

## API

### `notams(icaos, options)`

### `notams.fetch(icaos, options)`

#### `icaos`

Type: `string` or `array`

Valid values:

- a single ICAO code
- a comma-separated list of ICAO codes
- an array of ICAO codes

#### `options`

Type: `object`

```js
{ format: 'ICAO' }
```

##### `options.format`

Type: `string`

Valid values:

- `DOMESTIC`
- `ICAO`

### `notams.fetchAllByType(type, format)`

#### `type`

Type: `string`

Valid values:

- `ALLTFR`
- `ALLGPS`
- `ALLCARF`
- `ALLSPECIALNOTICES`


#### `format`

Type: `string`

Valid values:

- `DOMESTIC`
- `ICAO`

## Contributing

Contributions welcome!

## License

MIT © [Forrest Desjardins](https://github.com/fdesjardins)

[npm-url]: https://www.npmjs.com/package/notams
[npm-image]: https://img.shields.io/npm/v/notams.svg?style=flat
[travis-url]: https://travis-ci.org/fdesjardins/notams
[travis-image]: https://img.shields.io/travis/fdesjardins/notams.svg?style=flat
[coveralls-url]: https://coveralls.io/r/fdesjardins/notams
[coveralls-image]: https://img.shields.io/coveralls/fdesjardins/notams.svg?style=flat
[code-climate-url]: https://codeclimate.com/github/fdesjardins/notams/maintainability
[code-climate-image]: https://api.codeclimate.com/v1/badges/b20811df22b96f9dbdb1/maintainability
