const http = require('./http/request');

module.exports = class Secure {
  constructor(URL) {
    this.nURL = `${URL}/netusb`;
    this.sURL = `${URL}/system`;
    this.cURL = `${URL}/ccs`;
  }

  /**
     * Returns application/octet-stream binary data.
     *
     * @returns {Promise<*>}
     */
  getAccountStatus() {
    return http.get(`${this.nURL}/getAccountStatus`);
  }

  /**
     * Returns application/octet-stream binary data.
     *
     * @returns {Promise<*>}
     */
  getNetworkStatus() {
    return http.get(`${this.sURL}/getNetworkStatus`);
  }

  /**
     * Returns application/octet-stream binary data.
     *
     * @returns {Promise<*>}
     */
  getStatus() {
    return http.get(`${this.cURL}/getStatus`);
  }
};
