const host = '192.168.1.2';
const root = '/YamahaExtendedControl/v1';
const sroot = '/YamahaExtendedControl/secure/v1';
const URL = `http://${host}${root}`;
const sURL = `http://${host}${sroot}`;

// ***********************************************
// ****** M O D U L E   M A N A G E M E N T ******
// ***********************************************

const Dist = require('../modules/dist');
const Main = require('../modules/main');
const Netusb = require('../modules/netusb');
const Secure = require('../modules/secure');
const System = require('../modules/system');

const dist = new Dist(URL);
const main = new Main(URL);
const netusb = new Netusb(URL);
const secure = new Secure(sURL);
const system = new System(URL);

// *******************************************
// ****** F I L E   M A N A G E M E N T ******
// *******************************************

module.exports.isDirectory = (file) => file.attribute === 125829122
    || file.attribute === 125829138
    || file.attribute === 2;

module.exports.isFile = (file) => file.attribute === 125829124
    || file.attribute === 0;

module.exports.isSoundFile = (file) => file.attribute === 125829124
    || file.attribute === 125829140;

module.exports.changeDirectory = async (index) => {
  if (index === 0) {
    return module.exports.changeDirectoryBack();
  }

  const response = await netusb.setListControl('select', index - 1);
  return response.response_code === 0;
};

module.exports.cd = (index) => module.exports.changeDirectory(index);

module.exports.changeDirectoryBack = async () => {
  const response = await netusb.setListControl('return');
  return response.response_code === 0;
};

module.exports.cd$$ = () => module.exports.changeDirectoryBack();

module.exports.listFiles = async () => {
  let i = 0;
  let files = [];
  let response = {};
  do {
    response = await netusb.getListInfo('server', i, 8);
    if (response.response_code !== 0) {
      return files;
    }

    files = files.concat(response.list_info);

    i += 8;
  } while (i < response.max_line);

  // id 0 means parent directory
  if (response.menu_layer !== 0) {
    files.unshift({ id: 0, text: '../', attribute: 2 });
  }

  files.map((file, index) => {
    file.id = (response.menu_layer === 0)
      ? index + 1
      : index;
  });

  return { menu_layer: response.menu_layer, menu_name: response.menu_name, list_info: files };
};

module.exports.ls = () => module.exports.listFiles();

module.exports.currentDirectory = async () => {
  const response = await netusb.getListInfo('server', 0, 8);
  return { menu_layer: response.menu_layer, menu_name: response.menu_name };
};

module.exports.pwd = () => module.exports.currentDirectory();

module.exports.playFile = async (index) => {
  const response = await netusb.setListControl('play', index - 1);
  return response.response_code === 0;
};

// *********************************************************************
// ****** N E T W O R K   A N D   P O W E R   M A N A G E M E N T ******
// *********************************************************************

module.exports.isNetworkOn = async () => {
  const response = await system.getNetworkStandby();
  return response.response_code === 0 && response.network_standby === 'on';
};

module.exports.isPowerOn = async () => {
  const response = await main.getStatus();
  return response.response_code === 0 && response.power === 'on';
};

module.exports.setPowerOn = async () => {
  const response = await main.setPower('on');
  return response.response_code === 0;
};

module.exports.setPowerOff = async () => {
  const response = await main.setPower('standby');
  return response.response_code === 0;
};

module.exports.togglePower = async () => {
  const response = await module.exports.isPowerOn()
    ? await module.exports.setPowerOff()
    : await module.exports.setPowerOn();
  return response.response_code === 0;
};

// *************************************************************
// ****** E N T E R T A I N M E N T   M A N A G E M E N T ******
// *************************************************************

module.exports.checkAudioQuality = async () => {
  const response = await main.getStatus();
  return response.response_code === 0 && response.link_control === 'standard' && response.link_audio_quality === 'uncompressed';
};

module.exports.changeInput = async (input = 'server') => {
  let response = await main.prepareInputChange(input);
  if (response.response_code === 0) {
    response = await main.setInput(input, 'autoplay_disabled');
  }
  return response.response_code === 0;
};

module.exports.getVolume = async () => {
  const response = await main.getStatus();
  if (response.response_code === 0) {
    return response.volume;
  }
  return 79;
};

module.exports.increaseVolume = async () => {
  const volume = await module.exports.getVolume() + 1;
  const response = await main.setVolume(volume);
  return response.response_code === 0;
};

module.exports.decreaseVolume = async () => {
  const volume = await module.exports.getVolume() - 1;
  const response = await main.setVolume(volume);
  return response.response_code === 0;
};

module.exports.isMuted = async () => {
  const response = await main.getStatus();
  return response.response_code === 0 && response.mute;
};

module.exports.muteOn = async () => {
  const response = await main.setMute(true);
  return response.response_code === 0;
};

module.exports.muteOff = async () => {
  const response = await main.setMute(false);
  return response.response_code === 0;
};

module.exports.toggleMute = async () => {
  const response = await module.exports.isMuted()
    ? await module.exports.muteOff()
    : await module.exports.muteOn();
  return response;
};

module.exports.play = async () => {
  const response = await netusb.setPlayback('play');
  return response.response_code === 0;
};

module.exports.pause = async () => {
  const response = await netusb.setPlayback('pause');
  return response.response_code === 0;
};

module.exports.stop = async () => {
  const response = await netusb.setPlayback('stop');
  return response.response_code === 0;
};

module.exports.next = async () => {
  const response = await netusb.setPlayback('next');
  return response.response_code === 0;
};

module.exports.previous = async () => {
  const response = await netusb.setPlayback('previous');
  return response.response_code === 0;
};
