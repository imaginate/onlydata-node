# OnlyData Node Parser [![npm version](https://img.shields.io/badge/npm-0.0.1--beta-red.svg?style=flat)](https://www.npmjs.com/package/onlydata)

The official [node.js](https://nodejs.org) parser for [OnlyData](http://onlydata.tech), a human-readable data serialization language.

## Install
```bash
npm install onlydata
```

## API
```javascript

var od = require('onlydata');

// values
var str = 'an string of OnlyData syntax';
var buff = new Buffer();
var file = 'path/to/file.onlydata';
// or      'path/to/file.only';
// or      'path/to/file.od';

// parse string
obj = od(str);
obj = od.parse(str);
obj = od.parseString(str);

// parse buffer
obj = od(buff);
obj = od.parse(buff);
obj = od.parseBuffer(buff);

// parse file
obj = od(file);
obj = od.parse(file);
obj = od.parseFile(file);

// set config
od.setConfig(key, val);
od.setConfig({
  key: val,
  key: val
});

// reset config
od.resetConfig(...prop);
od.resetConfig(); // resets all props

// make new instance
od = od.construct();
od = od.constructor();
```

## Other Details
**contributing:** [see contributing guide](https://github.com/imaginate/onlydata-node/blob/master/CONTRIBUTING.md)<br>
**bugs/improvements:** [open an issue](https://github.com/imaginate/onlydata-node/issues)<br>
**questions:** adam@imaginate.life
