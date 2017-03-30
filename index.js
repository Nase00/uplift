const Raspi = require('raspi-io');
const five = require('johnny-five');
const board = new five.Board({
  io: new Raspi(),
  repl: true
});

board.on('ready', () => {
  console.log('Boardy ready!');

  const pinPreset = new five.Pin({
    pin: 'P1-12', // GPIO18/PWM0
    mode: 3
  });
  const pinUp = new five.Pin({
    pin: 'P1-15', // GPIO21
    mode: 1
  });
  const pinDown = new five.Pin({
    pin: 'P1-13', // GPIO27
    mode: 1
  });

  // const setPreset = (height) => {
  //   console.log('Attempting preset');
  //   pinPreset.high();

  //   const initHeight = '010000000101000000010100';
  //   const heightBits = `${initHeight}${height}${initHeight}${height}`;
  //   console.log(heightBits)
  //   const altHeight = 2573625736;

  //   setTimeout(() => {
  //     heightBits.split('').forEach((bit) => {
  //       // console.log(`Writing ${bit}`);
  //       pinPreset.write(parseInt(bit, 10));
  //     });
  //   }, 20);
  // };

  // pinPreset.read((error, value) => console.log(value));

  // setPreset('0100101010'); // 29.8
  // setPreset('0101001001'); // 32.9
  // setPreset('0101001101'); // ???

  const setPreset = () => {
    console.log('Setting GPIO18 low');
    pinPreset.low();
    setTimeout(() => pinPreset.high(), 10000);
  };

  const higher = () => {
    console.log(`Setting ${pinUp.pin} to HIGH`);
    pinUp.high();
    setTimeout(() => pinUp.low(), 3000);
  };

  const lower = () => {
    console.log(`Setting ${pinDown.pin} to HIGH`);
    pinDown.high();
    setTimeout(() => pinDown.low(), 3000);
  };

  // pinPreset.low(); // if set to low, forces 46.5 height??
  pinPreset.high();
  pinUp.low();
  pinDown.low();

  // console.log('Setting pin low');
  // pinUp.high();

  // setTimeout(() => {
  //   console.log('Setting pin high');

  //   pinUp.low();
  // }, 3000);

  board.repl.inject({
    pinPreset, pinUp, pinDown, setPreset, lower, higher
  });
});
