const controller = require('./controllers/controller');

(async function () {
  // await controller.increaseVolume();

  await controller.setPowerOn();

  // await controller.ls();
  // await controller.pause();
  // if (await controller.setPowerOn()) {
  //     await controller.changeInput('server');
  //     await controller.changeRoot();
  // }
  // await controller.cd$$();
  await controller.cd(1);
  await controller.ls();
  await controller.cd(1);
  await controller.ls();
  await controller.cd(1);
  await controller.ls();
  await controller.cd(1);
  await controller.ls();
  await controller.cd(4);
  await controller.ls();
  // await controller.pwd();

  // await controller.playFile(37); // ciao

  await controller.setPowerOff();
}());
