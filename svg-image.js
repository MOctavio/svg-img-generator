const svgToImage = require('svg-to-image');
const getContext = require('get-canvas-context');
 
// set up a new Canvas2D 
const context = getContext('2d', {
  width: 200, height: 200
});

var data = [
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="200px" height="200px">',
    '<circle stroke-width="12" r="43" cx="50" cy="50" fill="none" stroke="#3A5"/>',
    '<circle r="6" cx="59" cy="23" fill="#000"/>',
    '<g stroke-linejoin="round" stroke-linecap="round" stroke-width="1" stroke="#000" fill="none">',
      '<path d="M36,36c5,0,3,2,8-1c1,2,1,3,3,2c3,0-6,7-3,8c-4-2-9,2-14-2c4-3,4-4,5-7c5,0,8,2,12,1"/>',
      '<path fill="#000" d="M34,29h31c2,5,7,10,7,16l-8,1l8,1l-3,31l-5,-18l-11,18l5-34l-3-8z"/>',
      '<path stroke-width="2" d="M27,48h23M28,49h21l-3,28h-14l-4,-28h5l3,28h3v-28h5l-2,28m3-4h-13m-1-5h16m0-5h-16m-1-5h18m0-5h-19"/>',
    '</g>',
    '<path stroke="#F00" stroke-width="1"/>',
  '</svg>'
].join('\n');
 
svgToImage(data, function (err, image) {
  if (err) throw err
 
  // draw image to canvas 
  context.drawImage(image, 0, 0)
 
  // append to DOM 
  var canvas = context.canvas
  document.body.appendChild(context.canvas)
 
  // open a PNG image the user can Right Click -> Save As 
  window.open(context.canvas.toDataURL('image/png'))
})