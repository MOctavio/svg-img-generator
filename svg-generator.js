var fs = require('fs');
var d3 = require('d3');
// https://github.com/tmpvar/jsdom/issues/1820
var jsdom;
try {
    jsdom = require("jsdom/lib/old-api.js"); // jsdom >= 10.x
} catch (e) {
    jsdom = require("jsdom"); // jsdom <= 9.x
}


const chart = require('./chart');

var chartWidth = 500,
    chartHeight = 500;

var arc = d3.svg.arc()
    .outerRadius(chartWidth / 2 - 10)
    .innerRadius(0);

var colours = ['#F00', '#000', '#000', '#000', '#000', '#000', '#000', '#000', '#000'];

module.exports = function (data, config) {
    return new Promise(function (resolve, reject) {
        jsdom.env({
            html: '',
            features: {
                QuerySelector: true
            }, //you need query selector for D3 to work
            done: function (err, window) {
                if (err) return reject(err);

                window.d3 = d3.select(window.document);                

                // An SVG element with a bottom-right origin.
                var svg = window.d3.select('body')
                    .append('div')
                    .attr('class', 'container')
                    .append("svg")
                    .attr({
                        xmlns: 'http://www.w3.org/2000/svg',
                        width: config.width,
                        height: config.height
                    })
                    .append("g")
                    .attr("transform", "translate(" + config.margin.left + "," + config.margin.top + ")");
                // Call the char generation js file
                chart(data, config, svg);
                
                resolve(window.d3.select('.container').html()); 
            }
        });
    });
}

if (require.main === module) {
    module.exports();
}