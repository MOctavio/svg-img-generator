const fs = require('fs');
const d3 = require('d3');

let jsdom; // https://github.com/tmpconst/jsdom/issues/1820
try {
    jsdom = require("jsdom/lib/old-api.js"); // jsdom >= 10.x
} catch (e) {
    jsdom = require("jsdom"); // jsdom <= 9.x
}

const chart = require('./chart');

module.exports = (data, config) => {
    return new Promise((resolve, reject) => {
        jsdom.env({
            html: '',
            features: {
                QuerySelector: true
            }, //you need query selector for D3 to work
            done: (err, window) => {
                if (err) return reject(err);
                
                window.d3 = d3.select(window.document);
                // An SVG element with a bottom-right origin.
                const svg = window.d3.select('body')
                    .append('div')
                    .attr('class', 'container')
                    .append("svg")
                    .attr({
                        xmlns: 'http://www.w3.org/2000/svg',
                        width: config.width + config.margin.left + config.margin.right,
                        height: config.height + config.margin.top + config.margin.bottom
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