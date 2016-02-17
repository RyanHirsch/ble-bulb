var noble = require('noble');

var knownId = '00:21:4D:00:26:66';

noble.on('stateChange', function(state) {
  console.log('new state', state);
  switch(state) {
    case 'poweredOn':
      noble.startScanning();
      break;
  }
});

noble.on('scanStart', function() {
  console.log('scan started', arguments);
});

noble.on('scanStop', function() {
  console.log('scan stopped', arguments);
});

noble.on('discover', function(peripheral) {
  // console.log('discovered', peripheral);
  // console.log('UUID:', peripheral.uuid);
  if(peripheral.advertisement.localName === 'Smart Light') {
    console.log('uuid', peripheral.uuid);
    console.log('address', peripheral.address);
    peripheral.discoverAllServicesAndCharacteristics(function(err, svcs, chars) {
      console.log('services', svcs);
      console.log('characteristics', chars);
    });
    peripheral.once('connect', function() {
      console.log('connected', arguments);
    });
  }
});
