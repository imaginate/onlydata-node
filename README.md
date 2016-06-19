# OnlyData Node Parser [![npm version](https://img.shields.io/badge/npm-1.0.0--alpha-brightgreen.svg?style=flat)](https://www.npmjs.com/package/onlydata)

The official [node.js](https://nodejs.org) parser for [OnlyData](http://onlydata.tech), a human-readable data serialization language.

## Install
```bash
npm install onlydata
```

## API
```javascript

var onlydata = require('onlydata');

// values
var str = 'a string of OnlyData syntax';
var buff = new Buffer('OnlyData stuff');
var file = 'path/to/file.onlydata';
// or      'path/to/file.only';
// or      'path/to/file.od';

// parse string
obj = onlydata(str);
obj = onlydata.parse(str);
obj = onlydata.parseString(str);

// parse buffer
obj = onlydata(buff);
obj = onlydata.parse(buff);
obj = onlydata.parseBuffer(buff);

// parse file
obj = onlydata(file);
obj = onlydata.parse(file);
obj = onlydata.parseFile(file);

// get config
onlydata.getConfig([ ...prop ]); // prop array
onlydata.getConfig(...prop);     // prop arguments
onlydata.getConfig();            // all props

// set config
onlydata.setConfig(propKey, newVal);
onlydata.setConfig({
  propKey: newVal,
  propKey: newVal
});

// reset config
onlydata.resetConfig([ ...prop ]); // prop array
onlydata.resetConfig(...prop);     // prop arguments
onlydata.resetConfig();            // all props

// make new instance
onlydata = onlydata.construct();
onlydata = onlydata.constructor();
```

## Other Details
**contributing:** [see contributing guide](https://github.com/imaginate/onlydata-node/blob/master/CONTRIBUTING.md)<br>
**bugs/improvements:** [open an issue](https://github.com/imaginate/onlydata-node/issues)<br>
**questions:** adam@imaginate.life
