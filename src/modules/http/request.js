if (process.env.TNS_ENV !== undefined) {
  const http = require('tns-core-modules/http');

  module.exports.get = async (URL) => {
    try {
      console.log(`HTTP request sent: ${URL}`);
      const response = await http.request({
        url: URL,
        method: 'GET',
        timeout: 7000,
      });
      console.log(`HTTP response received: ${response.content.toString()}`);
      return response.content.toJSON();
    } catch (err) {
      console.log(`Error: ${err.message}`);
      throw err;
    }
  };
} else {
  const http = require('http');

  module.exports.get = (URL) => {
    try {
      console.log(`HTTP request sent: ${URL}`);
      return new Promise((resolve, reject) => {
        http.get(URL, (response) => {
          let data = '';

          // A chunk of data has been recieved.
          response.on('data', (chunk) => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          response.on('end', () => {
            console.log(`HTTP response received: ${data}`);
            resolve(JSON.parse(data));
          });
        }).on('error', (err) => {
          reject(err);
        });
      });
    } catch (err) {
      console.log(`Error: ${err.message}`);
      throw err;
    }
  };
}
