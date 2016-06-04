# OnlyData [![npm version](https://img.shields.io/badge/npm-1.0.0--alpha-yellow.svg?style=flat)](https://www.npmjs.com/package/onlydata)

_OnlyData_ is a simple, flexible, and human-readable data serialization language that is easily converted into JavaScript objects.

## Example
```
# Comment
bool1 = true
str2  = a string
obj3  = {
  num1: 5
  emp2: null
}
list4 = [ 0, 1, 3, magic string ]
str6 = how could you # Comment all you like I won't hear
str7 = 'listen here # We are all ears'
str8 = " keep your space bro "
<< str9
# Still can't here you
<div>
  <p>Lorem ipsum madness!</p>
</div>
>>
<<< str10
<ol>
  <li>I am keeping your comment!</li>
  <li># Why?</li>
  <li>Because I want too.</li>
</ol>
>>>
```

## Install
```bash
npm install onlydata
```

## JS API
```javascript

var od = require('onlydata');

// values
var obj = { an: 'object', aka: 'hash map' };
var str = 'a string of OnlyData syntax';
var file = 'path/to/file.onlydata';
// or      'path/to/file.only';
// or      'path/to/file.od';

// parse string
obj = od(str);
obj = od.parse(str);
obj = od.parseString(str);

// parse file
obj = od(file);
obj = od.parse(file);
obj = od.parseFile(file);

// make string
str = od(obj);
str = od.make(obj);
str = od.makeString(obj);

// make file
str = od(obj, file);
str = od.make(obj, file);
str = od.makeFile(obj, file);
```

## Syntax
- [Files](#files)
- [Keys](#keys)
- [Values](#values)
- [Data Types](#data-types)

### Files

### Keys

### Values

### Data Types

## Other Details
**contributing:** [see contributing guide](https://github.com/imaginate/onlydata/blob/master/CONTRIBUTING.md)<br>
**bugs/improvements:** [open an issue](https://github.com/imaginate/onlydata/issues)<br>
**questions:** adam@imaginate.life
