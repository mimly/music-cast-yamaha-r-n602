const http = require('http');

function request(URL) {
    try {
        return new Promise((resolve, reject) => {
            http.get(URL, (response) => {
                let data = '';

                // A chunk of data has been recieved.
                response.on('data', (chunk) => {
                    data += chunk;
                });

                // The whole response has been received. Print out the result.
                response.on('end', () => {
                    // console.log(JSON.parse(data));
                    resolve(JSON.parse(data));
                });

            }).on("error", (err) => {
                // console.log("Error: " + err.message);
                reject(err);
            });
        });
    } catch (err) {
        console.log("Error: " + err.message);
        return err;
    }
}

module.exports.get = function (URL) {
    return request(URL);
};