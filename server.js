const express = require('express')

const app = express();

app.use('/', express.static(__dirname));

module.exports = function run(port) {
  app.listen(port, err => {
    /*eslint-disable no-console*/
    if(err) {
      console.log('error occurred on app startup', err);
      return;
    }

    console.log(`app started at port: ${port}`);
    /*eslint-disable no-console*/
  })
}