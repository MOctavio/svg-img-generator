const fs = require('pn/fs'); // https://www.npmjs.com/package/pn 
const svg2png = require('svg2png');

module.exports = (data) => {
  return svg2png(data)
    .then((buffer) => {
      fs.writeFile('./public/img.png', buffer);
      return ('/img.png')
    })
    .catch(e => console.error);
};