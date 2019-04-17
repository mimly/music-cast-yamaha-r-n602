const request = require('./request');

module.exports = class Dist {

    constructor(URL) {
        this.URL = URL + '/dist';
    }

    /**
     * Returns JSON object like this:
     * {
     *  response_code: 0,
     *  group_id: '00000000000000000000000000000000',
     *  group_name: '(Linked) Room1',
     *  role: 'none',
     *  server_zone: 'main',
     *  client_list: []
     * }
     *
     * @returns {Promise<*>}
     */
    async getDistributionInfo() {
        return await request.get(this.URL + `/getDistributionInfo`);
    }

};