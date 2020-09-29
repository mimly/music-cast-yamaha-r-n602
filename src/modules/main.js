const http = require('./http/request');

module.exports = class Main {
  constructor(URL) {
    this.URL = `${URL}/main`;
  }

  /**
     * Returns JSON object like this:
     * {
     *  response_code: 0,
     *  audio: { error: 0, format: 'PCM', fs: '48 kHz' }
     * }
     *
     * @returns {Promise<*>}
     */
  getSignalInfo() {
    return http.get(`${this.URL}/getSignalInfo`);
  }

  /**
     * Returns JSON object like this:
     * {
     *  response_code: 0,
     *  power: 'on',
     *  sleep: 0,
     *  volume: 79,
     *  mute: false,
     *  max_volume: 161,
     *  input: 'optical1',
     *  distribution_enable: true,
     *  link_control: 'standard',
     *  link_audio_quality: 'uncompressed',
     *  disable_flags: 0
     * }
     *
     * @returns {Promise<*>}
     */
  getStatus() {
    return http.get(`${this.URL}/getStatus`);
  }

  /**
     * Returns JSON object like this:
     * {
     *  response_code: 0
     * }
     *
     * @param input ( optical1 | net_radio | server | ... )
     * @returns {Promise<*>}
     */
  prepareInputChange(input = 'server') {
    return http.get(`${this.URL}/prepareInputChange?input=${input}`);
  }

  /**
     * Returns JSON object like this:
     * {
     *  response_code: 0
     * }
     *
     * @param input ( optical1 | net_radio | server | ... )
     * @param mode (autoplay_disabled | ??? )
     * @returns {Promise<*>}
     */
  setInput(input = 'server', mode = 'autoplay_disabled') {
    return http.get(`${this.URL}/setInput?input=${input}&mode=${mode}`);
  }

  /**
     * Returns JSON object like this:
     * {
     *  response_code: 0
     * }
     *
     * @param mode ( compressed | uncompressed )
     * @returns {Promise<*>}
     */
  setLinkAudioQuality(mode = 'uncompressed') {
    return http.get(`${this.URL}/setLinkAudioQuality?mode=${mode}`);
  }

  /**
     * Returns JSON object like this:
     * {
     *  response_code: 0
     * }
     *
     * @param control ( speed | standard | stability )
     * @returns {Promise<*>}
     */
  setLinkControl(control = 'standard') {
    return http.get(`${this.URL}/setLinkControl?control=${control}`);
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
  setMute(bool = 'true') {
    return http.get(`${this.URL}/setMute?enable=${bool}`);
  }

  /**
     * Returns JSON object like this:
     * {
     *  response_code: 0
     * }
     *
     * @param power ( on | standby )
     * @returns {Promise<*>}
     */
  setPower(power = 'standby') {
    return http.get(`${this.URL}/setPower?power=${power}`);
  }

  /**
     * Returns JSON object like this:
     * {
     *  response_code: 0
     * }
     *
     * @param volume
     * @returns {Promise<*>}
     */
  setVolume(volume = '79') {
    return http.get(`${this.URL}/setVolume?volume=${volume}`);
  }
};
