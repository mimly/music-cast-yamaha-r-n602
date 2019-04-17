const host = '192.168.1.2';
const root = '/YamahaExtendedControl/v1';
const URL = `http://${host}${root}`;

// **************************************
const Secure = require('../modules/secure');
const secure = new Secure(`http://${host}/YamahaExtendedControl`);
// **************************************

const Dist = require('../modules/dist');
const dist = new Dist(URL);

const Main = require('../modules/main');
const main = new Main(URL);

const Netusb = require('../modules/netusb');
const netusb = new Netusb(URL);

const System = require('../modules/system');
const system = new System(URL);




module.exports.powerON = async function () {
    let response = await main.setPower('on');
    return response['response_code'] === 0;
};

module.exports.powerOFF = async function () {
    let response = await main.setPower('standby');
    return response['response_code'] === 0;
};

module.exports.checkAudioQuality = async function () {
    let response = await main.getStatus();
    return response['response_code'] === 0 && response['link_control'] === 'standard' && response['link_audio_quality'] === 'uncompressed';
};

module.exports.changeInput = async function (input='server') {
    let response = await main.prepareInputChange(input);
    if (response['response_code'] === 0) {
        response = await main.setInput(input, 'autoplay_disabled');
    }
    return response['response_code'] === 0;
};

module.exports.changeRoot = async function () {
    let response = await netusb.getListInfo('server', 0, 8);
    console.log(response);

    // NAVIGATE TO Music FLAC VINYL
    let index = 0;
    // cd RT-N66U-E708 ; cd Browse Folders ; cd X
    for (let i = 0; i < 5; ++i) {
        if (i == 3) index = 3; // cd Main
        if (i == 4) index = 6; // cd Music FLAC VINYL
        if (response['response_code'] === 0) {
            let response = await netusb.getListInfo('server', 0, 8);
            console.log(response);
            response = await netusb.setListControl('select', index);
        }
        console.log(response);
    }

    response = await netusb.getListInfo('server', 0, 8);
    console.log(response);


};

module.exports.playFile = async function (index) {
    let response = await netusb.setListControl('play', index);
    return response['response_code'] === 0;
};

module.exports.$ = module.exports.playFile;

module.exports.changeDirectory = async function (index) {
    let response = await netusb.setListControl('select', index);
    return response['response_code'] === 0;
};

module.exports.cd = module.exports.changeDirectory;

module.exports.changeDirectoryBack = async function () {
    let response = await netusb.setListControl('return');
    return response['response_code'] === 0;
};

module.exports.cd$$ = module.exports.changeDirectoryBack;

module.exports.listFiles = async function () {
    let response = await netusb.getListInfo('server', 0, 8);
    if (response['response_code'] !== 0) {
        return response['response_code'];
    }

    let fileList = response['list_info'];
    for (let i=8; i < response['max_line']; i += 8) {
        response = await netusb.getListInfo('server', i, 8);
        if (response['response_code'] !== 0) {
            return response['response_code'];
        }

        fileList = fileList.concat(response['list_info']);
    }

    console.log(fileList);
    return response['response_code'] === 0 && fileList;
};

module.exports.ls = module.exports.listFiles;

module.exports.currentDirectory = async function () {
    let response = await netusb.getListInfo('server', 0, 8);
    console.log(response['menu_name']);
    return response['response_code'] === 0 && response['menu_name'];
};

module.exports.pwd = module.exports.currentDirectory;







module.exports.getVolume = async function () {
    let response = await main.getStatus();
    if (response['response_code'] === 0)
        return response.volume;
    return 79;
};

module.exports.increaseVolume = async function () {
    let volume = getVolume() + 1;
    let response = await main.setVolume(volume);
    return response['response_code'] === 0;
};

module.exports.decreaseVolume = async function () {
    let volume = getVolume() - 1;
    let response = await main.setVolume(volume);
    return response['response_code'] === 0;
};

module.exports.muteON = async function () {
    let response = await main.setMute(true);
    return response['response_code'] === 0;
};

module.exports.muteOFF = async function () {
    let response = await main.setMute(false);
    return response['response_code'] === 0;
};

module.exports.play = async function () {
    let response = await netusb.setPlayback('play');
    return response['response_code'] === 0;
};

module.exports.pause = async function () {
    let response = await netusb.setPlayback('pause');
    return response['response_code'] === 0;
};

module.exports.next = async function () {
    let response = await netusb.setPlayback('next');
    return response['response_code'] === 0;
};

module.exports.previous = async function () {
    let response = await netusb.setPlayback('previous');
    return response['response_code'] === 0;
};

