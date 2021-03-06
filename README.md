# Jamstik+

WebBluetooth client for the Jamstik+

## Installation

`npm install --save jamstik`

## Usage

``` js
import Jamstik from 'jamstik';

const jamstik = new Jamstik();
await jamstik.connect();

jamstik.midi.subscribe(sample => {
    console.log('sample', sample);
});
```

A sample consists of:

``` js
{
  header: number,
  timestamp: number,
  status: number,
  note: number,
  velocity: number
};
```

> For security reasons, WebBLE must be started from user interaction. Add a connect button that would start the BLE connection. See ./examples/basic/index.js

## Demo

* Clone this repo
* `npm install`
* `npm start`
* Go to http://localhost:900/examples/basic

### License

MIT