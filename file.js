const fs = require('fs');

const appendFile = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.appendFile(path, data, error => {
      if (!error) {
        resolve();
      }
      else {
        reject(error);
      }
    });
  });
};

const readFile = (path, encoding) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (error, data) => {
      if (!error) {
        resolve(data);
      }
      else {
        reject(error);
      }
    });
  });
};

module.exports = {
  appendFile,
  readFile
}