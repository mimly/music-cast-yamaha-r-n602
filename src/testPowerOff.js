const controller = require('./controllers/controller');

(async function () {
  await controller.setPowerOff();
  let result = await controller.isNetworkOn();
  console.log(`1 isNetworkOn: ${result}`);
  result = await controller.isPowerOn();
  console.log(`2 isPowerOn: ${result}`);
  result = await controller.isPowerOn();
  console.log(`3 isPowerOn: ${result}`);
}());
