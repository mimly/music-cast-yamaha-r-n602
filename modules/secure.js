const request = require('./request');

module.exports = class Secure {

    constructor(URL) {
        this.URL = URL + '/secure/v1';
    }

    /**
     * Returns application/octet-stream binary data.
     *
     * @returns {Promise<*>}
     */
    async getAccountStatus() {
        return await request.get(this.URL + `/netusb/getAccountStatus`);
    }

    /**
     * Returns application/octet-stream binary data.
     *
     * @returns {Promise<*>}
     */
    async getNetworkStatus() {
        return await request.get(this.URL + `/system/getNetworkStatus`);
    }

    /**
     * Returns application/octet-stream binary data.
     *
     * @returns {Promise<*>}
     */
    async getStatus() {
        return await request.get(this.URL + `/ccs/getStatus`);
    }

};