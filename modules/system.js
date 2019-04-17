const request = require('./request');

module.exports = class System {

    constructor(URL) {
        this.URL = URL + '/system';
    }

    /**
     * Returns JSON object like this:
     * {
     *  response_code: 0,
     *  model_name: 'R-N602',
     *  destination: 'BG',
     *  device_id: '00A0DEDB788B',
     *  system_id: '094E7443',
     *  system_version: 1.32,
     *  api_version: 2.04,
     *  netmodule_generation: 1,
     *  netmodule_version: '1812    ',
     *  netmodule_checksum: 'B121D019',
     *  operation_mode: 'normal',
     *  update_error_code: '00000000'
     *  }
     *
     * @returns {Promise<*>}
     */
    async getDeviceInfo() {
        return await request.get(this.URL + `/getDeviceInfo`);
    }

    /**
     * Returns JSON object like this:
     * {
     *  response_code: 0,
     *  system: {
     *      func_list: [
     *          'wired_lan',
     *          'wireless_lan',
     *          'wireless_direct',
     *          'network_standby',
     *          'network_standby_auto',
     *          'bluetooth_standby',
     *          'auto_power_standby',
     *          'bluetooth_tx_setting',
     *          'speaker_a',
     *          'speaker_b',
     *          'headphone',
     *          'airplay',
     *          'network_reboot'
     *      ],
     *      zone_num: 1,
     *      input_list: [ [Object] ... ]
     *  },
     *  zone: [ {
     *      id: 'main',
     *      func_list: [Array],
     *      input_list: [Array],
     *      link_control_list: [Array],
     *      link_audio_quality_list: [Array],
     *      range_step: [Array]
     *  } ],
     *  tuner: {
     *      func_list: [ 'am', 'fm', 'rds' ],
     *      range_step: [ [Object], [Object] ],
     *      preset: { type: 'common', num: 40 }
     *  },
     *  netusb: {
     *      func_list: [
     *          'recent_info',
     *          'play_queue',
     *          'mc_playlist',
     *          'streaming_service_use'
     *      ],
     *      preset: { num: 40 },
     *      recent_info: { num: 40 },
     *      play_queue: { size: 200 },
     *      mc_playlist: { size: 200, num: 5 },
     *      net_radio_type: 'airable',
     *      pandora: { sort_option_list: [Array] }
     *  },
     *  distribution: {
     *      version: 2,
     *      compatible_client: [ 2 ],
     *      client_max: 9,
     *      server_zone_list: [ 'main' ]
     *  },
     *  ccs: { supported: true },
     *  privacy: { gdpr_supported: true }
     * }
     *
     * @returns {Promise<*>}
     */
    async getFeatures() {
        return await request.get(this.URL + `/getFeatures`);
    }

    /**
     * Returns JSON object like this:
     * {
     *  response_code: 0,
     *  auto_power_standby: true,
     *  speaker_a: true,
     *  speaker_b: true,
     *  headphone: false
     * }
     *
     * @returns {Promise<*>}
     */
    async getFuncStatus() {
        return await request.get(this.URL + `/getFuncStatus`);
    }

    /**
     * Returns JSON object like this:
     * {
     *  response_code: 0,
     *  id: '2fd4f6bae47c4279b2f90b64be6625b4',
     *  name: 'Home1',
     *  zone_list: { main: true }
     * }
     *
     * @returns {Promise<*>}
     */
    async getLocationInfo() {
        return await request.get(this.URL + `/getLocationInfo`);
    }

    /**
     * Returns JSON object like this:
     * {
     *  response_code: 0,
     *  zone_list: [ { id: 'main', text: 'Room1' } ],
     *  input_list: [
     *      { id: 'tuner', text: 'Tuner' },
     *      { id: 'phono', text: 'Phono' },
     *      { id: 'optical1', text: 'Optical1' },
     *      { id: 'optical2', text: 'Optical2' },
     *      { id: 'coaxial1', text: 'Coaxial1' },
     *      { id: 'coaxial2', text: 'Coaxial2' },
     *      { id: 'line1', text: 'Line1' },
     *      { id: 'line2', text: 'Line2' },
     *      { id: 'line3', text: 'Line3' },
     *      { id: 'line_cd', text: 'CD' },
     *      { id: 'usb', text: 'USB' },
     *      { id: 'bluetooth', text: 'Bluetooth' },
     *      { id: 'server', text: 'Server' },
     *      { id: 'net_radio', text: 'Net Radio' },
     *      { id: 'napster', text: 'Napster' },
     *      { id: 'spotify', text: 'Spotify' },
     *      { id: 'juke', text: 'JUKE' },
     *      { id: 'airplay', text: 'AirPlay' },
     *      { id: 'qobuz', text: 'Qobuz' },
     *      { id: 'mc_link', text: 'MC Link' },
     *      { id: 'tidal', text: 'TIDAL' },
     *      { id: 'deezer', text: 'Deezer' }
     *  ],
     *  sound_program_list: []
     * }
     *
     * @returns {Promise<*>}
     */
    async getNameText() {
        return await request.get(this.URL + `/getNameText`);
    }

    /**
     * Returns JSON object like this:
     * {
     *  response_code: 0,
     *  network_standby: 'on'
     * }
     *
     * @returns {Promise<*>}
     */
    async getNetworkStandby() {
        return await request.get(this.URL + `/getNetworkStandby`);
    }

    /**
     * Returns JSON object like this:
     * {
     *  response_code: 0,
     *  zone_list: [ { id: 'main', tag: 27 } ],
     *  input_list: [
     *      { id: 'tuner', tag: 0 },
     *      { id: 'phono', tag: 0 },
     *      { id: 'optical1', tag: 0 },
     *      { id: 'optical2', tag: 0 },
     *      { id: 'coaxial1', tag: 0 },
     *      { id: 'coaxial2', tag: 0 },
     *      { id: 'line1', tag: 0 },
     *      { id: 'line2', tag: 0 },
     *      { id: 'line3', tag: 0 },
     *      { id: 'line_cd', tag: 0 },
     *      { id: 'usb', tag: 0 },
     *      { id: 'bluetooth', tag: 0 },
     *      { id: 'server', tag: 3 },
     *      { id: 'net_radio', tag: 0 },
     *      { id: 'napster', tag: 0 },
     *      { id: 'spotify', tag: 0 },
     *      { id: 'juke', tag: 0 },
     *      { id: 'airplay', tag: 0 },
     *      { id: 'qobuz', tag: 0 },
     *      { id: 'mc_link', tag: 0 },
     *      { id: 'tidal', tag: 0 },
     *      { id: 'deezer', tag: 0 }
     *  ]
     * }
     * @returns {Promise<*>}
     */
    async getTag() {
        return await request.get(this.URL + `/getTag`);
    }

    /**
     * Returns JSON object like this:
     * {
     *  response_code: 0,
     *  available: false
     * }
     *
     * @returns {Promise<*>}
     */
    async isNewFirmwareAvailable() {
        return await request.get(this.URL + `/isNewFirmwareAvailable?type=network`);
    }

    /**
     * Returns JSON object like this:
     * {
     *  response_code: 0
     * }
     *
     * @param bool
     * @returns {Promise<*>}
     */
    async setAutoPowerStandby(bool) {
        return await request.get(this.URL + `/setAutoPowerStandby?enable=${bool}`);
    }

};